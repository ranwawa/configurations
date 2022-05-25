const base = require('./configs/base');
const baseTs = require('./configs/base-ts');
const vue2x = require('./configs/vue2x');
const vue3x = require('./configs/vue3x');
const vueTs = require('./configs/vue-ts');
const react = require('./configs/react');
const reactTs = require('./configs/react-ts');
const node = require('./configs/node');

module.exports = {
  configs: {
    base,
    'base-ts': baseTs,
    vue2x,
    vue3x,
    'vue-ts': vueTs,
    react,
    'react-ts': reactTs,
    node,
  },
};
