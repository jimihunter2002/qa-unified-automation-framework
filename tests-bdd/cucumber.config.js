export default {
  default: {
    paths: ['features/**/*.feature'],
    import: ['step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'json:../reports/bdd/bdd-results.json'],
  },
};
