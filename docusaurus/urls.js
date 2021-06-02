const ROOT = 'https://getstream.io';
const GITHUB_ROOT = 'https://github.com/GetStream';

module.exports = {
  WEBSITE: {
    root: `${ROOT}/`,
    main: [
      {
        returnLink: true,
        label: "Return to Stream",
        href: `${ROOT}/chat/docs/`,
      },
      {
        label: "Chat Overview",
        href: `${ROOT}/chat/`,
      },
      {
        label: "Chat Pricing",
        href: `${ROOT}/chat/pricing/`,
      },
      {
        label: "Chat Demos",
        href: `${ROOT}/chat/demos/messaging/`,
        items: [
          {
            label: "Social Messenger",
            href: `${ROOT}/chat/demos/messaging/`,
          },
          {
            label: "Team Collaboration",
            href: `${ROOT}/chat/demos/team/`,
          },
          {
            label: "Customer Support",
            href: `${ROOT}/chat/demos/customers/`,
          },
          {
            label: "Livestream Gaming",
            href: `${ROOT}/chat/demos/gaming/`,
          },
          {
            label: "Virtual Event",
            href: `${ROOT}/chat/demos/livestream/`,
          }
        ]
      },
      {
        label: "Chat UI Kits",
        href: `${ROOT}/chat/ui-kit/`,
        items: [
          {
            label: "UI Design Kits",
            href: `${ROOT}/chat/ui-kit/`,
          },
          {
            label: "Mobile Chat Kit",
            href: `${ROOT}/chat/ux-kit/`,
          }
        ]
      },
      {
        label: "Solutions",
        href: `${ROOT}/chat/solutions/`,
        items: [
          {
            label: "Social & team",
            href: `${ROOT}/chat/solutions/social/`,
          },
          {
            label: "Virtual Events",
            href: `${ROOT}/chat/solutions/virtual-events/`,
          },
          {
            label: "Social & team",
            href: `${ROOT}/chat/solutions/`,
          },
          {
            label: "Education",
            href: `${ROOT}/chat/solutions/ed-tech/`,
          },
          {
            label: "Telehealth",
            href: `${ROOT}/chat/solutions/telemedicine/`,
          },
          {
            label: "Customer Support",
            href: `${ROOT}/chat/solutions/customer-support/`,
          },
          {
            label: "Marketplaces",
            href: `${ROOT}/chat/solutions/marketplaces/`,
          }
        ]
      }
    ],
    secondary: [
      {
        contact: true,
        label: "Contact Sales",
        href: `${ROOT}/contact/`,
      }
    ],
  },
  GITHUB: {
    android: `${GITHUB_ROOT}/stream-chat-android/`,
    flutter: `${GITHUB_ROOT}/stream-chat-flutter/`,
    ios: `${GITHUB_ROOT}/stream-chat-swift/`,
    react: `${GITHUB_ROOT}/stream-chat-react/`,
    reactnative: `${GITHUB_ROOT}/stream-chat-react-native/`,
  },
};
