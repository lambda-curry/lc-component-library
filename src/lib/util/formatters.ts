export const stripTags = (value: string) => value.replace(/(<([^>]+)>)/gi, '');

export const arrayToList = (arr: string[], finalSeparator: string) => {
  return arr.reduce((acc, curr, index) => {
    if (index !== 0 && index === arr.length - 1) return `${acc} ${finalSeparator} ${curr}`;

    if (index > 0) return `${acc}, ${curr}`;

    return curr;
  }, '');
};
