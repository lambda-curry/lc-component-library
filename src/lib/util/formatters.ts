export const stripTags = (value: string): string => value.replace(/(<([^>]+)>)/gi, '');

export const arrayToListString = (arr: string[], finalSeparator: string): string =>
  arr.reduce((acc, curr, index) => {
    const primarySeparator = ', ';
    if (index !== 0 && index === arr.length - 1) return `${acc}${finalSeparator || primarySeparator}${curr}`;
    if (index > 0) return `${acc}${primarySeparator}${curr}`;
    return curr;
  }, '');
