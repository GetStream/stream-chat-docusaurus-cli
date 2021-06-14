const algoliasearch = require('algoliasearch/lite');

const json = require('./algolia-objects.json');

const STREAM_SDK_DOCUSAURUS_PATH = '../docusaurus';

require('dotenv').config({
  path: __dirname + `/${STREAM_SDK_DOCUSAURUS_PATH}/.env`,
});

const { DOCUSAURUS_INDEX } = './constants';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_WRITE_KEY
);

const index = client.initIndex(DOCUSAURUS_INDEX);

index
  .replaceAllObjects(json)
  .then(({ objectIDs }) => {
    console.log('Updated Algolia index for: ', objectIDs);
  })
  .catch((e) => console.log('ERROR: ', e));
