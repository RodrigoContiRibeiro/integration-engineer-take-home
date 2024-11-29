export const capitalize = (str: string) => {
  const firstChar = str.charAt(0).toUpperCase();
  const remainingChars = str.slice(1);

  return `${firstChar}${remainingChars}`;
};
