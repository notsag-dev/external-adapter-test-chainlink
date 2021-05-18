import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig } from '@chainlink/types'

export const NAME = 'sum'

const customError = (data: any) => data.Response === 'Error'

export const execute: ExecuteWithConfig<Config> = async (request, config) => {
  const validator = new Validator(request)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const response = await Requester.request({ ...config.api }, customError)

  let sum = getBalanceSum(response.data)
  return Requester.success(jobRunID, { data: { result: sum } }, config.verbose)
}

type BalanceItem = {
  balance: number
  address: string
}

export const getBalanceSum = (balanceData: Record<number, BalanceItem>) => {
  let sum = 0
  for (const index in balanceData) {
    sum += balanceData[index].balance
  }
  return sum
}
