export const isPositiveInteger= (str:string) => {
  
  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}