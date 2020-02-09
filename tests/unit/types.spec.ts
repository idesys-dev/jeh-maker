import { TauxObject } from '@/types.ts'

describe('TauxObject', () => {
  it('create TauxObject', () => {
    const t = new TauxObject()
    expect(t.urssafBase).toEqual(40.6)
  })
})
