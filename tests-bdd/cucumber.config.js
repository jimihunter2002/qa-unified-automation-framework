module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'json:../reports/bdd/bdd-results.json'],
  },
};
