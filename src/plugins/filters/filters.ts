export function euro (val: number) {
  // if(val === undefined) return '';
  let strVal = val.toString();
  let int, dec;
  if (strVal.includes('.')) {
    int = strVal.split('.')[0];
    dec = '.' + strVal.split('.')[1];
  }
  else {
    int = strVal;
    dec = '';
  }
  let n = int.length;
  if (n > 3) {
    int = int.slice(0, n-3) + ' ' + int.slice(n-3, n);
  }
  return int + dec + ' €';
}

export function percentage (val: number) {
  return val.toString() + ' %';
}
