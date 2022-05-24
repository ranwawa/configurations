const base = require('./configs/base');
const baseTs = require('./configs/base-ts');
const vue = require('./configs/vue');
const vueTs = require('./configs/vue-ts');
const react = require('./configs/react');
const reactTs = require('./configs/react-ts');
const node = require('./configs/node');

module.exports = {
  configs: {
    base,
    'base-ts': baseTs,
    vue,
    'vue-ts': vueTs,
    react,
    'react-ts': reactTs,
    node,
  },
};
