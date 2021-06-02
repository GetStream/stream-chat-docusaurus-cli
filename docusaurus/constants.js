const folderMapping = {
  android: 'Android',
  flutter: 'Flutter',
  ios: 'iOS',
  react: 'React',
  reactnative: 'React Native',
};

const platformMapping = {
  android: 'android',
  flutter: 'flutter-dart',
  ios: 'ios-swift',
  react: 'react',
  reactnative: 'react-native',
};

const languageMapping = {
  android: 'kotlin',
  flutter: 'dart',
  ios: 'swift',
  react: 'javascript',
  reactnative: 'javascript',
};

const BASE_URL = '/chat/docs/sdk/'
const CMS_DOCS_ENDPOINT = 'https://getstream.io/chat/docs';
const WEBSITE_URL = 'https://getstream.io/';

const DOCUSAURUS_INDEX = 'DOCUSAURUS';
const CMS_INDEX = 'DOCS';

module.exports = {
  BASE_URL,
  CMS_DOCS_ENDPOINT,
  WEBSITE_URL,
  DOCUSAURUS_INDEX,
  CMS_INDEX,
  folderMapping,
  platformMapping,
  languageMapping,
};
