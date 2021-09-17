const folderMapping = {
  android: 'Android',
  flutter: 'Flutter',
  ios: 'iOS',
  react: 'React',
  reactnative: 'React Native',
  angular: 'Angular',
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
  angular: 'javascript',
};

const DOCUSAURUS_INDEX =
  process.env.DEPLOYMENT_ENV === 'production' ? 'DOCUSAURUS' : 'DOCUSAURUS_STG';
const CMS_INDEX = 'DOCS';

const IGNORED_DIRECTORIES = ['common-content'];

module.exports = {
  IGNORED_DIRECTORIES,
  DOCUSAURUS_INDEX,
  CMS_INDEX,
  folderMapping,
  platformMapping,
  languageMapping,
};
