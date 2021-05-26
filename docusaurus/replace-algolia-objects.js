const algoliasearch = require('algoliasearch/lite');

const json = require('./algolia-objects.json');

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_WRITE_KEY
);
const index = client.initIndex('DOCUSAURUS');

index
  .replaceAllObjects(json)
  .then(({ objectIDs }) => {
    console.log('Updated Algolia index for: ', objectIDs);
  })
  .catch((e) => console.log('ERROR: ', e));
