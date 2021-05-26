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

module.exports = {
  BASE_URL,
  CMS_DOCS_ENDPOINT,
  folderMapping,
  platformMapping,
  languageMapping,
};
