const folderMapping = {
  android: 'Android',
  flutter: 'Flutter',
  ios: 'iOS',
  react: 'React',
  reactnative: 'React Native',
  angular: 'Angular',
  api: 'API',
};

const platformMapping = {
  android: 'android',
  flutter: 'flutter-dart',
  ios: 'ios-swift',
  react: 'react',
  reactnative: 'react-native',
  angular: 'angular',
  api: 'api',
};

const languageMapping = {
  android: 'kotlin',
  flutter: 'dart',
  ios: 'swift',
  react: 'javascript',
  reactnative: 'javascript',
  angular: 'javascript',
  api: 'javascript',
};

const PRODUCT = process.env.PRODUCT;
let DOCUSAURUS_INDEX =
  process.env.DEPLOYMENT_ENV === 'production'
    ? `DOCUSAURUS${PRODUCT === 'video' ? '_VIDEO' : ''}`
    : `DOCUSAURUS${PRODUCT === 'video' ? '_VIDEO' : ''}_STG`;
const CMS_INDEX = 'DOCS';

const IGNORED_DIRECTORIES = ['common-content'];

const SDK_ORDER = [
  'react',
  'ios',
  'android',
  'reactnative',
  'flutter',
  'angular',
  'api',
];

module.exports = {
  IGNORED_DIRECTORIES,
  DOCUSAURUS_INDEX,
  CMS_INDEX,
  folderMapping,
  platformMapping,
  languageMapping,
  SDK_ORDER,
};
