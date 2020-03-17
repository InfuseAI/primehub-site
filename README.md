## PrimeHub Doc

The primehub docs is located at https://docs.primehub.io/

The site is hosted on the [github pages](https://pages.github.com/) of the [primehub-site](https://github.com/InfuseAI/primehub-site/tree/gh-pages) repository

## Prepare the Development Environment

1. Clone the repo

   ```
   git clone git@github.com:InfuseAI/primehub-site.git
   ```
1. Checkout the master

   ```
   git checkout master
   ```   

1. Install the dependency

   ```
   cd websites
   npm install
   ```

1. Run the site locally

   ```
   npm start
   ```
   
## Start Editing

1. This site is based on [docusaurus](https://docusaurus.io/)
1. Edit the content in `docs/`
1. Add document entries in `website/sidebars.json`
1. For more information, please see docusaurus documentation


## Publish

Single command to publish

```
GIT_USER=USERNAME CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

Please see [publish the site](https://docusaurus.io/docs/en/tutorial-publish-site) document in docusaurus for detail