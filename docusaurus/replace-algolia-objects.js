const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const algoliasearch = require('algoliasearch/lite');
const json = require('./algolia-objects.json');

const contentEnvPath = path.join(__dirname, '/.env');
if (fs.existsSync(contentEnvPath)) {
  dotenv.config({ path: contentEnvPath });
}

const DOCUSAURUS_INDEX =
  process.env.PRODUCT === 'chat'
    ? process.env.DEPLOYMENT_ENV === 'production'
      ? 'DOCUSAURUS'
      : 'DOCUSAURUS_STG'
    : process.env.PRODUCT === 'video'
    ? process.env.DEPLOYMENT_ENV === 'production'
      ? 'DOCUSAURUS_VIDEO'
      : 'DOCUSAURUS_VIDEO_STG'
    : 'NEVER';

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
    console.error(`Error while replacing object with Algolia: ${error}`);
    process.exit(1);
  });
