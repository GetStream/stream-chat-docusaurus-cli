const ROOT = 'https://getstream.io';
const GITHUB_ROOT = 'https://github.com/GetStream';

const productVariables = require('./src/product-variables');

const PRODUCT = process.env.PRODUCT;
const { github } = productVariables[PRODUCT];

module.exports = {
  docs: {
    root: `/${PRODUCT}/docs/sdk/`,
  },
  website: {
    root: `${ROOT}`,
    cms_docs: `${ROOT}/${PRODUCT}/docs/`,
    signup: `${ROOT}/accounts/signup/`,
    // Not needed anymore but will keep it commented in case these values return in another place
    // main: [
    //   {
    //     returnLink: true,
    //     label: 'Return to Stream',
    //     href: ROOT,
    //   },
    //   {
    //     label: 'Chat Overview',
    //     href: `${ROOT}/chat/`,
    //   },
    //   {
    //     label: 'Chat Pricing',
    //     href: `${ROOT}/chat/pricing/`,
    //   },
    //   {
    //     label: 'Chat Demos',
    //     href: `${ROOT}/chat/demos/messaging/`,
    //     items: [
    //       {
    //         label: 'Social Messenger',
    //         href: `${ROOT}/chat/demos/messaging/`,
    //       },
    //       {
    //         label: 'Team Collaboration',
    //         href: `${ROOT}/chat/demos/team/`,
    //       },
    //       {
    //         label: 'Customer Support',
    //         href: `${ROOT}/chat/demos/customers/`,
    //       },
    //       {
    //         label: 'Livestream Gaming',
    //         href: `${ROOT}/chat/demos/gaming/`,
    //       },
    //       {
    //         label: 'Virtual Event',
    //         href: `${ROOT}/chat/demos/livestream/`,
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Chat UI Kits',
    //     href: `${ROOT}/chat/ui-kit/`,
    //     items: [
    //       {
    //         label: 'UI Design Kits',
    //         href: `${ROOT}/chat/ui-kit/`,
    //       },
    //       {
    //         label: 'Mobile Chat Kit',
    //         href: `${ROOT}/chat/ux-kit/`,
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Solutions',
    //     href: `${ROOT}/chat/solutions/`,
    //     items: [
    //       {
    //         label: 'Social & team',
    //         href: `${ROOT}/chat/solutions/social/`,
    //       },
    //       {
    //         label: 'Virtual Events',
    //         href: `${ROOT}/chat/solutions/virtual-events/`,
    //       },
    //       {
    //         label: 'Social & team',
    //         href: `${ROOT}/chat/solutions/`,
    //       },
    //       {
    //         label: 'Education',
    //         href: `${ROOT}/chat/solutions/ed-tech/`,
    //       },
    //       {
    //         label: 'Telehealth',
    //         href: `${ROOT}/chat/solutions/telemedicine/`,
    //       },
    //       {
    //         label: 'Customer Support',
    //         href: `${ROOT}/chat/solutions/customer-support/`,
    //       },
    //       {
    //         label: 'Marketplaces',
    //         href: `${ROOT}/chat/solutions/marketplaces/`,
    //       },
    //     ],
    //   },
    // ],
    secondary: [
      {
        contact: true,
        label: 'Contact Sales',
        href: `${ROOT}/contact/`,
      },
      {
        contact: true,
        label: 'Contact Support',
        href: `${ROOT}/contact/support/`,
      },
    ],
  },
  github_root: GITHUB_ROOT,
  github,
};
