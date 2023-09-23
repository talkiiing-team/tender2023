import { Dialog } from '@libs/shared/dialog'
import {
  Address,
  extractAddress,
  extractIfNull,
  extractPhoneNumber,
  formatAddress,
  tryExtractAll,
} from '@libs/shared/extractors'
import axios from 'axios'
import { requester } from '@libs/scripts/search-positions/requester'

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

  await dialog.answer(JSON.stringify(data.data))

  //
  //
  // const confirmation = await dialog
  //   .prompt(
  //     `
  //   Please confirm your ticket:
  //   Address: ${formatAddress(state.address)}
  //   Phone number: ${state.phoneNumber}
  // `,
  //   )
  //   .then(d => d.message)
  //
  // if (confirmation.toLowerCase() === 'yes') {
  //   await dialog.answer('Тикет создан')
  // } else {
  //   await dialog.answer('Тикет отменен')
  // }
}
