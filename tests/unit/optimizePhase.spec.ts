import { TauxObject } from '@/types.ts'
import { round } from '@/utils.ts'
import { optimizeByPrice } from '@/services/optimizePhase.ts'

const taux = new TauxObject()

// these functions are only duplicates of the instructions in optimizePhase.ts, they are not here to test data
function computeUrssafJe (nbJeh:number, pay:number) {
  return round(nbJeh * taux.urssafBase * taux.jeContrib + pay * taux.jepay)
}
function computeMarginJe (price:number, pay:number, nbJeh:number) {
  return round((price - pay - computeUrssafJe(nbJeh, pay)) / price * 100)
}
function computeUrssafConsultant (nbJeh:number, pay:number) {
  return round(nbJeh * taux.urssafBase * taux.consultantContrib + pay * taux.consultantPay)
}
function computeNetConsultant (nbJeh:number, pay:number) {
  return round(pay - computeUrssafConsultant(nbJeh, pay))
}
function computeNetByConsultant (nbConsultant: number, nbJeh:number, pay:number) {
  return round(computeNetConsultant(nbJeh, pay) / nbConsultant)
}
function computePcConsultant (nbConsultant: number, nbJeh:number, pay:number, price:number) {
  return round(computeNetByConsultant(nbConsultant, nbJeh, pay) / price * 100)
}

const testSetByPrice = [
  {
    phase: {
      id: 1,
      title: '',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 1,
      title: '',
      price: 800,
      jeh: 400,
      nbConsultant: 1,
      margin: 55,
      nbJeh: 2,
      pay: 360,
      urssafJE: computeUrssafJe(2, 360),
      marginJE: computeMarginJe(800, 360, 2),
      urssafConsultant: computeUrssafConsultant(2, 360),
      netConsultant: computeNetConsultant(2, 360),
      netByConsultant: computeNetByConsultant(1, 2, 360),
      pcConsultant: computePcConsultant(1, 2, 360, 800)
    }
  },
  {
    phase: {
      id: 2,
      title: '',
      price: 400,
      jeh: 400,
      nbConsultant: 2,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 2,
      title: '',
      price: 400,
      jeh: 200,
      nbConsultant: 2,
      margin: 55,
      nbJeh: 2,
      pay: 180,
      urssafJE: computeUrssafJe(2, 180),
      marginJE: computeMarginJe(400, 180, 2),
      urssafConsultant: computeUrssafConsultant(2, 180),
      netConsultant: computeNetConsultant(2, 180),
      netByConsultant: computeNetByConsultant(2, 2, 180),
      pcConsultant: computePcConsultant(2, 2, 180, 400)
    }
  },
  {
    phase: {
      id: 3,
      title: '',
      price: 240,
      jeh: 400,
      nbConsultant: 3,
      margin: 55,
      nbJeh: 0,
      pay: 0,
      urssafJE: 0,
      marginJE: 0,
      urssafConsultant: 0,
      netConsultant: 0,
      netByConsultant: 0,
      pcConsultant: 0
    },
    result: {
      id: 3,
      title: '',
      price: 240,
      jeh: 80,
      nbConsultant: 3,
      margin: 55,
      nbJeh: 3,
      pay: 108,
      urssafJE: computeUrssafJe(3, 108),
      marginJE: computeMarginJe(240, 108, 3),
      urssafConsultant: computeUrssafConsultant(3, 108),
      netConsultant: computeNetConsultant(3, 108),
      netByConsultant: computeNetByConsultant(3, 3, 108),
      pcConsultant: computePcConsultant(3, 3, 108, 240)
    }
  }
]

describe('optimizePhase', () => {
  it('optimise by price (no urssaf testing)', () => {
    testSetByPrice.forEach(testObj => {
      expect(optimizeByPrice(testObj.phase, taux)).toEqual(testObj.result)
    })
  })
})
