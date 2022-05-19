const TREE_LINT = 'treelint';

const helperText = `
  Usage
    $treelint [options]

  Options
    --all, -a \t\t checks all files
    --changed, -c \t checks changed files
    --help, -h \t\t displays help information
    --project, -p \t the path of the configuration file
    --version, -v \t displays version information

  Example
    $treelint --all
`;

const flags = {
  all: {
    type: 'boolean',
    alias: 'a',
  },
  changed: {
    type: 'boolean',
    alias: 'c',
  },
  help: {
    type: 'boolean',
    alias: 'h',
  },
  version: {
    type: 'boolean',
    alias: 'v',
  },
  project: {
    type: 'string',
    alias: 'p',
  },
};

module.exports = {
  TREE_LINT,
  helperText,
  flags,
};

export {};
