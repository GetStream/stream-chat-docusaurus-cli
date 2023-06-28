// Always use the same key as the env vars in order to have
// it exposed with the define-env-vars-plugin

module.exports = {
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  WEBSITE_BASE_URL: process.env.WEBSITE_BASE_URL,
  PRODUCT: process.env.PRODUCT,
}
