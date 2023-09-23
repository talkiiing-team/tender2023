import { Dialog } from '@libs/shared/dialog'
import { NLP } from '@apps/nlp/types'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { searchPositionsScript } from '@libs/scripts/search-positions'
import { extractAnswer } from '@libs/nlp/scenarios/extractAnswer'
import { scenariosAnswer } from '@libs/nlp/scenarios/list'

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
  console.log(classes)
  const intent = { selected: '' }
  for (let i = 0; i < classes.length; i++) {
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
      await dialog.answer('ЩАс позырим в нлп')
  }
}
