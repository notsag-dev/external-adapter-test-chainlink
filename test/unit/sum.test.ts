import { getBalanceSum } from '../../src/endpoint/sum'

describe('getBalanceSum()', () => {
  describe('given that the endpoint returned an empty array', () => {
    it('returns sum = 0', () => {
      expect(getBalanceSum([])).toBe(0)
    })
  })

  describe('given that the endpoint returned an non-empty array', () => {
    it('returns the correct sum', () => {
      const balanceData = {
        0: { address: 'addr1', balance: 100 },
        1: { address: 'addr2', balance: 200 },
      }
      expect(getBalanceSum(balanceData)).toBe(300)
    })
  })
})
