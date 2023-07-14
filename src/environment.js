// Always use the same key as the env vars in order to have
// it exposed with the define-env-vars-plugin

module.exports = {
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
  GOOGLE_TAG_TRACKING_ID: process.env.DEPLOYMENT_ENV,
  PRODUCT: process.env.PRODUCT,
  WEBSITE_BASE_URL: process.env.WEBSITE_BASE_URL,
}
