import axios from 'axios';

export const wordSet = new Set<string>();

/**
 * checks the given sentence against the wordlist provided and returns an array of invalid words if any
 *
 * @param sentence string the sentence to be checked
 * @returns string[] an array of invalid words in the given sentence
 */
export const checkSentence = (sentence: string): string[] => {
  return (
    sentence
      // as our wordlist is in lowercase, we have to convert the sentence to check into lowercase also.
      .toLowerCase()
      // replace short forms (e.g. I'll) and remove any non valid character (allowed are a-z, - and whitespaces)
      .replace(/(n't|'m|'s|'ll|'ve|'d|'re|[^a-z-\s])/gm, '')
      // split sentence on whitespaces to extract each word
      .split(/\s/)
      // find all words not contained in our wordlist
      .filter((word) => !wordSet.has(word))
  );
};

/**
 * initialise the wordset with the content of the wordlist available at
 * https://raw.githubusercontent.com/jeremy-rifkin/Wordlist/master/master.txt
 */
export const init = async () => {
  const wordlistResponse = await axios.get<string>(
    'https://raw.githubusercontent.com/jeremy-rifkin/Wordlist/master/master.txt',
  );
  wordlistResponse.data
    .split(`\n`)
    .map((word) => word.trim().toLowerCase())
    .forEach((word) => wordSet.add(word));
};
