const GITHUB_ROOT = "https://github.com/GetStream"

module.exports = {
  "activity-feeds": {
    productTitle: "Activity Feeds",
    // Algolia stuff
    algolia: {
      parentSection: {
        name: "Activity Feeds API Docs",
        slug: "activity_feeds_docs",
        id: "activity_feeds_docs",
      },
    },
    // GitHub stuff
    github: {
      android: null,
      flutter: `${GITHUB_ROOT}/stream-feed-flutter/`,
      ios: `${GITHUB_ROOT}/swift-activity-feed/`,
      react: `${GITHUB_ROOT}/react-activity-feed/`,
      reactnative: `${GITHUB_ROOT}/react-native-activity-feed/`,
    },
    // Docusaurus (config) stuff
    docusaurus: {
      title: "Activity Feeds",
    },
  },
  chat: {
    productTitle: "Chat",
    algolia: {
      parentSection: {
        name: "Chat API Docs",
        slug: "chat_docs",
        id: "chat_docs",
      },
    },
    github: {
      android: `${GITHUB_ROOT}/stream-chat-android/`,
      flutter: `${GITHUB_ROOT}/stream-chat-flutter/`,
      ios: `${GITHUB_ROOT}/stream-chat-swift/`,
      react: `${GITHUB_ROOT}/stream-chat-react/`,
      reactnative: `${GITHUB_ROOT}/stream-chat-react-native/`,
      angular: `${GITHUB_ROOT}/stream-chat-angular/`,
    },
    docusaurus: {
      title: "Chat Messaging",
    },
  },
  video: {
    productTitle: "Video",
    algolia: {
      parentSection: {
        name: "Video API Docs",
        slug: "video_docs",
        id: "video_docs",
      },
    },
    github: {
      android: `${GITHUB_ROOT}/stream-video-android/`,
      flutter: `${GITHUB_ROOT}/stream-video-flutter/`,
      ios: `${GITHUB_ROOT}/stream-video-swift/`,
      react: `${GITHUB_ROOT}/stream-video-js/`,
      // Disable only on production for now. Beware when merging. reactnative: `${GITHUB_ROOT}/stream-video-js/`,
      // angular: `${GITHUB_ROOT}/stream-video-js/`,
    },
    docusaurus: {
      title: "Voice & Video",
    },
  },
}
