export function round (n:number): number {
  let strN: string = n.toString() + 'e+2'
  let floatN: number = Math.round(parseFloat(strN))
  return +(floatN.toString() + 'e-2')
}

export function utf8ToB64 (str:string): string {
  return window.btoa(unescape(encodeURIComponent(str)))
}

export function b64ToUtf8 (str:string): string {
  return decodeURIComponent(escape(window.atob(str)))
}
