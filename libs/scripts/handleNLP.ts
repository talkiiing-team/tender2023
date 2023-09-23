import { Dialog } from '@libs/shared/dialog'
import { IntentOption, NLP } from '@apps/nlp/types'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { searchPositionsScript } from '@libs/scripts/search-positions'
import { extractAnswer } from '@libs/nlp/scenarios/extractAnswer'
import { scenariosAnswer } from '@libs/nlp/scenarios/list'

const ALPHA = 1

const extractAnswerLabel = (intent: string) =>
  extractAnswer(intent, scenariosAnswer)

export const handleNLPScript = async (
  dialog: Dialog,
  next,
  {
    result,
    classes,
  }: {
    result: NLP.Result
    classes: NLP.Result['classifications']
    nlp: NLP.Instance
  },
) => {
  console.log('classes', classes)
  const intent = { selected: '' }
  const closed = { questions: false, actions: false }
  const groupedIntents = classes.reduce(
    (acc, v) => {
      if (v.intent.startsWith('pretrain')) {
        acc.questions.push(v)
      } else {
        acc.actions.push(v)
      }
      return acc
    },
    {
      actions: [] as IntentOption[],
      questions: [] as IntentOption[],
    },
  )

  const highestRating = groupedIntents.questions?.[0].score
  if (highestRating) {
    groupedIntents.questions = groupedIntents.questions.filter(
      v => v.score >= highestRating - ALPHA,
    )
  }

  console.log(JSON.stringify(groupedIntents))

  for (let i = 0; i < groupedIntents.questions.length; i++) {
    const answer = extractAnswerLabel(classes[i].intent)
    //if (!answer) continue
    const confirmation = await dialog
      .prompt(
        `
${
  i > 0
    ? 'Извините, возможно Вам поможет следующий ответ:'
    : 'Надеюсь, Вам поможет следующий ответ:'
}

<i>${answer?.length ? answer : classes[i].intent}</i>
  `,
        {
          yes: 'Спасибо, ответ помог',
          ...(groupedIntents.actions.length > i + 1
            ? { no: 'Другой ответ' }
            : { no: 'Ответ не помог' }),
          ...(groupedIntents.actions.length
            ? { actions: 'Просмотреть связанные задачи 👀' }
            : {}),
        },
      )
      .then(d => d.message)

    console.log(JSON.stringify(confirmation))

    if (confirmation === 'keyboard:yes') {
      await dialog.answer('Рад, что получилось помочь')
      closed.questions = true
      next()
      break
    } else if (confirmation === 'keyboard:no') {
      continue
    } else if (confirmation === 'keyboard:actions') {
      break
    } else if (!confirmation.startsWith('keyboard')) {
      return
    }
  }

  if (!closed.questions) {
    for (let i = 0; i < groupedIntents.actions.length; i++) {
      const label = extractAnswerLabel(classes[i].intent)
      if (!label) continue
      const confirmation = await dialog
        .prompt(
          `
    ${i > 0 ? 'Извините, возможно Вы имели ввиду что-то другое...' : ''}
        
    Вы хотите <b>${label}</b>?
  `,
          {
            yes: 'Да',
            no: 'Нет',
            cancel: 'Отменить',
          },
        )
        .then(d => d.message)

      console.log(JSON.stringify(confirmation))

      if (confirmation.toLowerCase() === 'keyboard:yes') {
        await dialog.answer('Отлично')
        intent.selected = classes[i].intent
        break
      }
    }

    switch (intent.selected) {
      case 'new':
        await presentScriptToMiddleware(searchPositionsScript)(
          dialog.context,
          next,
        )
        break
      default:
        await dialog.answer(
          `
К сожалению, я не смог Вам помочь, попробуйте еще раз.
Возможно, Вы могли бы переформулировать вопрос?
        `,
        )
    }
  }
}
