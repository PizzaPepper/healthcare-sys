export const isPositiveInteger = (str: string) => {
  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
};

// format a Date to string
export const getNiceTime = (time: Date): string => {
  const date = new Date(time);

  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return year + '-' + month + '-' + day;
};
