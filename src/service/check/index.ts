import axios from 'axios';

export const wordSet = new Set<string>();

/**
 * checks the given sentence against the wordlist provided and returns an array of invalid words if any
 *
 * @param sentence string the sentence to be checked
 * @returns string[] an array of invalid words in the given sentence
 */
export const checkSentence = (sentence: string): string[] => {
  return sentence
    .toLowerCase()
    .replace(`n't`, ' not')
    .replace(`'m`, ' am')
    .replace(`'s`, ' us')
    .replace(`'ll`, ' will')
    .replace(`'ve`, ' have')
    .replace(`'d`, ' had')
    .replace(`'re`, ' are')
    .replace(/[^a-z-\s]/gm, '')
    .split(/\s/)
    .filter((word) => !wordSet.has(word));
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
