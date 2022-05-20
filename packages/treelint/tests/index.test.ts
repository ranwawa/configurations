const { getExpectedAndCommonPattern } = require('../src/linter.js');

const mockConfig = {
  src: {
    'app.vue': 'file',
    assets: 'directory',
    '^(index|main).js$': 'regexp',
  },
  'package.json': 'file',
};

describe('getExpectedAndCommonPattern', () => {
  it('如果没有配置文件时,应当返回空的目录及通配模式', () => {
    expect(getExpectedAndCommonPattern()).toEqual({
      expected: [],
      commonPattern: null,
    });
  });

  it('如果只有显示的文件声明,则通配模式应该是null', () => {
    expect(getExpectedAndCommonPattern(mockConfig)).toEqual({
      expected: ['src', 'package.json'],
      commonPattern: null,
    });
  });

  it('如果显示的文件声明和通配模式都有,则需要返回对应值', () => {
    expect(getExpectedAndCommonPattern(mockConfig.src)).toEqual({
      expected: ['app.vue', 'assets'],
      commonPattern: /^(index|main).js$/,
    });
  });
});

describe('lint', () => {});
