import { euro, percentage } from '@/plugins/filters/filters'

describe('Filter euro', () => {
  it('1550.04', () => {
    const t = euro(1550.04)
    expect(t).toBe('1 550,04 €')
  })
  it('1550.049', () => {
    const t = euro(1550.049)
    expect(t).toBe('1 550,05 €')
  })
})

describe('Filter percentage', () => {
  it('50.04', () => {
    const t = percentage(50.04)
    expect(t).toBe('50,04 %')
  })
})
