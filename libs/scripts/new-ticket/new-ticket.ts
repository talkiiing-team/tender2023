import { Dialog } from '@libs/shared/dialog'
import {
  Address,
  extractAddress,
  extractIfNull,
  extractPhoneNumber,
  formatAddress,
  tryExtractAll,
} from '@libs/shared/extractors'

export type Ticket = {
  address: Address
  phoneNumber: string
}

export async function newTicketScript(dialog: Dialog) {
  const state = {
    address: null as Address | null,
    phoneNumber: null as string | null,
  }

  const extractedTicket = await tryExtractAll(dialog.message, {
    address: extractAddress,
    phoneNumber: extractPhoneNumber,
  })

  state.address = await extractIfNull(
    extractedTicket.address,
    extractAddress,
    () =>
      dialog.prompt('Пожалуйста, укажите адрес доставки').then(d => d.message),
  )

  if (!state.address) {
    await dialog.answer('Не удалось распознать адрес')
    return
  }

  state.phoneNumber = await extractIfNull(
    extractedTicket.phoneNumber,
    extractPhoneNumber,
    () =>
      dialog.prompt('Пожалуйста, укажите номер телефона').then(d => d.message),
  )

  if (!state.phoneNumber) {
    await dialog.answer('Не удалось распознать номер телефона')
    return
  }

  const confirmation = await dialog
    .prompt(
      `
    Please confirm your ticket:
    Address: ${formatAddress(state.address)}
    Phone number: ${state.phoneNumber}
  `,
    )
    .then(d => d.message)

  if (confirmation.toLowerCase() === 'yes') {
    await dialog.answer('Тикет создан')
  } else {
    await dialog.answer('Тикет отменен')
  }
}
