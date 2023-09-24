import { Dialog } from '@libs/shared/dialog'
import {
  getFullSearchLink,
  getImageSrc,
  requester,
} from '@libs/scripts/search-positions/requester'
import { pluralize } from '@libs/shared/pluralize/pluralize'
import axios from 'axios'
import { InputFile } from 'grammy'

export type SearchPositions = {
  query: string
}

export async function searchPositionsScript(dialog: Dialog, next) {
  const state = {
    query: null as string | null,
  }

  state.query = await dialog
    .prompt(
      `
    Пожалуйста, отправьте наименование искомой позиции
  `,
    )
    .then(d => d.message)

  if (!state.query) {
    await dialog.answer('Произошла ошибка при обработке вашего запроса.')
    return
  }

  const data = await requester({ query: state.query })

  await dialog.answer(
    `
Вот некоторые из найденных позиций:
${data.data.items
  .map(
    (item, i) => `
<b>${i + 1}. ${item.name}:</b>
за единицу (${item.okeiName?.toLowerCase()}) - ${
      item.referencePrice ? `${item.referencePrice} руб.` : 'нет в наличии'
    }
`,
  )
  .join('')}
`,
    {
      keyboard: [
        {
          [getFullSearchLink(state.query)]: `Просмотреть все (${
            data.data?.count
              ? `${data.data.count} ${pluralize(data.data.count, [
                  'позиция',
                  'позиции',
                  'позиций',
                ])}`
              : 'позиции'
          })`,
        },
      ],
      media: await Promise.all(
        data.data.items
          .map((item: any) => getImageSrc(item.imageId as number))
          .map(
            async url =>
              new InputFile(
                (
                  await axios.get(url, {
                    responseType: 'arraybuffer',
                  })
                ).data,
              ),
          ),
      ),
    },
  )
}
