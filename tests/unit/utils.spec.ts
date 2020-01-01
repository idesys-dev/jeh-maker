import { round, utf8ToB64, b64ToUtf8} from '@/utils.ts'

describe('utils', () => {
  it('string to b64 equals string', () => {
    const m:string = "Ceci est une variable de type string"
    expect(b64ToUtf8(utf8ToB64(m))).toEqual(m)
  })
  it('round sup', () => {
    expect(round(39.9999)).toEqual(40)
  })
  it('round inf', () => {
    expect(round(39.00001)).toEqual(39)
  })
})

  