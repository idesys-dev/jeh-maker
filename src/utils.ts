export default function round (n:number): number {
  let strN: string = n.toString() + 'e+2'
  let floatN: number = Math.round(parseFloat(strN))
  return +(floatN.toString() + 'e-2')
}
