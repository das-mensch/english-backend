# english-backend

It's a small backend service providing one endpoint to check whether a sentence contains valid english words based on a wordlist provided by https://raw.githubusercontent.com/jeremy-rifkin/Wordlist/master/master.txt

## Endpoint

### /v1/check
**Method**: `POST`\
**Content-Type**: `text/plain`\
**Payload**: The sentence to check\
**Returns**: An array containing the words that do not exist on the list as JSON or an empty array in case all words are valid.
