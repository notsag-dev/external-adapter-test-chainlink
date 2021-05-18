import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'CHALLENGE'

export const DEFAULT_ENDPOINT = 'sum' // ????????
export const DEFAULT_BASE_URL = 'https://gist.githubusercontent.com'
export const DEFAULT_URL =
  '/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_BASE_URL
  config.api.url = config.api.URL || DEFAULT_URL
  return config
}
