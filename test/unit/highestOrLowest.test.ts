import {
  getHighestBalanceAddress,
  getLowestBalanceAddress,
} from '../../src/endpoint/highestOrLowest'

const balanceData = [
  { address: 'addr1', balance: 100 },
  { address: 'addr2', balance: 200 },
]

describe('getHighestBalanceAddress()', () => {
  describe('given that the endpoint returned 0 results', () => {
    it('returns undefined', () => {
      expect(getHighestBalanceAddress([])).toBeUndefined()
    })
  })
  describe('given that the endpoint returned more than 0 results', () => {
    it('returns the correct address', () => {
      expect(getHighestBalanceAddress(balanceData)).toBe('addr2')
    })
  })
})

describe('getLowestBalanceAddress()', () => {
  describe('given that the endpoint returned 0 results', () => {
    it('returns undefined', () => {
      expect(getLowestBalanceAddress([])).toBeUndefined()
    })
  })
  describe('given that the endpoint returned more than 0 results', () => {
    it('returns the correct address', () => {
      expect(getLowestBalanceAddress(balanceData)).toBe('addr1')
    })
  })
})
