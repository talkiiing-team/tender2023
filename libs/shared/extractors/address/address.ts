import { runPython } from '@libs/shared/pyshell'
import { resolve } from 'path'

export type AddressEntry = {
  type: string
  value: string
}

export type Address = AddressEntry[]

export async function extractAddress(message: string): Promise<Address | null> {
  return await runPython(resolve(__dirname, 'address.py'), message)
}

export function formatAddress(address: Address): string {
  return address
    .map(entry => (entry.type ? `${entry.type} ${entry.value}` : entry.value))
    .join(', ')
}
