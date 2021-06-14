// sdks here are flagged as not ready and wont be deployed in prod.

const NOT_READY_SDKS =
  process.env.DEPLOYMENT_ENV === 'production'
    ? ['android', 'flutter', 'ios', 'reactnative']
    : [];

module.exports = {
  NOT_READY_SDKS,
};
