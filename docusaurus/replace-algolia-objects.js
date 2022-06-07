require('dotenv');

const algoliasearch = require('algoliasearch/lite');

const json = require('./algolia-objects.json');

const DOCUSAURUS_INDEX =
  process.env.DEPLOYMENT_ENV === 'production' ? 'DOCUSAURUS' : 'DOCUSAURUS_STG';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_WRITE_KEY
);

const index = client.initIndex(DOCUSAURUS_INDEX);

index
  .replaceAllObjects(json)
  .then(({ objectIDs }) => {
    console.log(`Updated ${DOCUSAURUS_INDEX} Algolia index for: `, objectIDs);
  })
  .catch((error) => {
    console.error(`Error while replacing object with Algolia: ${ error }`);
    process.exit(1);
  });
