/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Taiwan AI Academy',
    image: 'img/clients/aia-512.png',
    infoLink: 'https://aiacademy.tw',
    pinned: true
  },
  {
    caption: 'AS GPU Cloud',
    image: 'img/clients/client-asds.png',
    infoLink: 'https://ds.sinica.edu.tw/',
    pinned: true
  },
  {
    caption: 'E.SUN Bank',
    image: 'img/clients/client-esun.png',
    infoLink: 'https://www.esunbank.com.tw/bank/bank-en',
    pinned: true
  }
];

const siteConfig = {
  title: 'PrimeHub', // Title for your website.
  tagline: 'Effortless Infrastructure for Machine Learning',
  url: 'https://docs.primehub.io', // Your website URL
  baseUrl: '/', // Base URL */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://infuseai.github.io',
  //   baseUrl: '/primehub-site/',

  // Used for publishing and more
  projectName: 'primehub-site',
  organizationName: 'InfuseAI',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // The domain of PrimeHub-site
  cname: "docs.primehub.io",

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    //{ doc: 'documentation', label: 'Documentation'},
    //{ doc: 'getting-started-admin', label: 'Administrator'},
    //{ doc: 'getting-started-user', label: 'Scientist'},
    { doc: 'introduction', label: 'Documentation'},
    //{ doc: 'dev-introduction', label: 'Technical Reference'},
    { doc: 'index-zh', label: '繁中文件'},
    //{ blog: true, label: 'Blog'},
    //{ page: 'help', label: 'Community'},
    //{ search: true }, //algolia
    { href: "https://docs-v4.primehub.io/", label: "🌟 Doc v4 \u21D7", external: true},
    { href: "https://cse.google.com/cse?cx=a1b608e4a3908f544", label: "Search \u21D7", external: true }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/PrimeHub_icon_64.png',
  footerIcon: 'img/PrimeHub_icon_128.png',
  favicon: 'img/PrimeHub_icon_32.png',

  /* Colors for website */
  colors: {
    primaryColor: '#23356B',
    secondaryColor: '#365ABD',
  },

  /*algolia: {
    apiKey: 'f482b898949e00de71a14ed19cc167ce',
    indexName: 'infuseai_primehub',
    algoliaOptions: {
      hitsPerPage: 10
    } // Optional, if provided by Algolia
  },*/

  gaTrackingId: 'UA-123266454-3',
  gaGtag: true,

  /* Custom fonts for website */
  
  fonts: {
    HFont: [
      "Oswald",
      "-apple-system"
    ],
    OFont: [
      "Objektiv Mk3",
      "-apple-system"
    ],
    PFont: [
      "Lato",
      "-apple-system"
    ]
  },
  

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} InfuseAI`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'railscasts',
  },
  usePrism: ['bash'],

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
  ],
  stylesheets: [
    '/css/code-block-buttons.css',
    'https://fonts.googleapis.com/css?family=Oswald|Lato:400,400i,700'
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Collapsible Categories
  docsSideNavCollapsible: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/primehub_icon.svg',
  twitterImage: 'img/primehub_icon.svg',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  // Deprecate certain docs from certain versions
  deletedDocs: {
    "3.0": [
      "install_helper",
      "getting_started/install_keycloak",
      "migrate-v2",
      "dotenv",
      "envs",
      "airgap",
      "benchmark",
      "build",
      "cluster_shutdown",
      "csi-rclone-installation-guide",
      "dockerhub-registry",
      "kubeflow-installation-guide",
      "secret-pull-image-gcr",
      "UPGRADE-K8s-from-1.10-and-1.10-to-1.12"
    ]
  }
};

module.exports = siteConfig;
