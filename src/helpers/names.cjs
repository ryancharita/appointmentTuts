export const makePossessive = (word) => {
  if (typeof word !== 'string') {
    return '';
  }

  const lastCharacter = word[word.length - 1];
  const possessiveSuffix = lastCharacter === 's' ? "'" : "'s";

  return word + possessiveSuffix;
};
