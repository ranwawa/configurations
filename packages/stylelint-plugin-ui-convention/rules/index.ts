const _importLazy = require('import-lazy');
const importLazy = _importLazy(require);

module.exports = [
  importLazy('./border-color'),
  importLazy('./border-radius'),
  importLazy('./border'),
  importLazy('./box-shadow'),
  importLazy('./color'),
  importLazy('./font-size'),
  importLazy('./spacing'),
  importLazy('./z-index'),
];
