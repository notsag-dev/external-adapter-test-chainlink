import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig } from '@chainlink/types'

export const NAME = 'highestlowest'

const customError = (data: any) => data.Response === 'Error'

const customParams = {
  filter: true,
}

export const execute: ExecuteWithConfig<Config> = async (request, config) => {
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const response = await Requester.request({ ...config.api }, customError)

  const filter = validator.validated.data.filter
  let address: string | undefined
  switch (filter) {
    case 'highest': {
      address = getHighestBalanceAddress(response.data)
      break
    }
    case 'lowest': {
      address = getLowestBalanceAddress(response.data)
      break
    }
    default:
      throw new Error(`Incorrect value parameter for parameter "filter": ${filter}.`)
  }
  return Requester.success(jobRunID, { data: { result: address } }, config.verbose)
}

export const getHighestBalanceAddress = (balancesData: any): string | undefined => {
  if (balancesData === undefined || balancesData[0] === undefined) {
    return undefined
  }
  let maxBalance: number = balancesData[0].balance
  let maxAddress: string = balancesData[0].address
  for (const index in balancesData) {
    const item: BalanceItem = balancesData[index]
    if (item.balance > maxBalance) {
      maxBalance = item.balance
      maxAddress = item.address
    }
  }
  return maxAddress
}

type BalanceItem = {
  balance: number
  address: string
}

export const getLowestBalanceAddress = (
  balancesData: Record<number, BalanceItem>,
): string | undefined => {
  if (balancesData === undefined || balancesData[0] === undefined) {
    return undefined
  }
  let minBalance: number = balancesData[0].balance
  let minAddress: string = balancesData[0].address
  for (const index in balancesData) {
    const item: BalanceItem = balancesData[index]
    if (item.balance < minBalance) {
      minBalance = item.balance
      minAddress = item.address
    }
  }
  return minAddress
}
