var _importLazy = require('import-lazy');
var importLazy = _importLazy(require);
module.exports = [
  importLazy('./rules//border-color'),
  importLazy('./rules/border-radius'),
  importLazy('./rules/border'),
  importLazy('./rules/box-shadow'),
  importLazy('./rules/color'),
  importLazy('./rules/font-size'),
  importLazy('./rules/spacing'),
  importLazy('./rules/z-index'),
];
