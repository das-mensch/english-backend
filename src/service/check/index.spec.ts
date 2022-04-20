import axios from 'axios';
import { checkSentence, init } from '.';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('sentence checker', () => {
  beforeEach(async () => {
    const wordList = [
      'Do',
      'You',
      'Like',
      'Cats',
      'And',
      'Dogs',
      'This',
      'Is',
      'A-Ok',
      'Will',
      'Not',
      'I',
      'Am',
      'Let',
      'Us',
      'Have',
      'Had',
      'Are',
      'Alive',
    ];
    mockedAxios.get.mockResolvedValue({ data: wordList.join(`\n`) });
    await init();
  });

  test('short forms', async () => {
    expect(checkSentence(`aren't`)).toHaveLength(0);
    expect(checkSentence(`I'm`)).toHaveLength(0);
    expect(checkSentence(`I'll`)).toHaveLength(0);
    expect(checkSentence(`I'd`)).toHaveLength(0);
    expect(checkSentence(`You're`)).toHaveLength(0);
    expect(checkSentence(`I've`)).toHaveLength(0);
    expect(checkSentence(`Let's`)).toHaveLength(0);
  });

  test('should replace all occurrences of short forms', async () => {
    expect(checkSentence(`I'll aren't aren't I'll`)).toHaveLength(0);
  });

  test('punctuation should not interfere the replacement of short forms', async () => {
    expect(checkSentence(`I'll, aren't, aren't, I'll`)).toHaveLength(0);
  });

  test('should find non existent words in string', async () => {
    expect(checkSentence('Do you likee cats adn dogs?')).toEqual(expect.arrayContaining(['likee', 'adn']));
  });

  test('should find non existent words in multiline sentences', async () => {
    expect(checkSentence(`Do you likee cats adn dogs?\nThis is a-ok!`)).toEqual(
      expect.arrayContaining(['likee', 'adn']),
    );
  });
});
