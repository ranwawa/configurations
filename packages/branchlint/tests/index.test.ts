import { jest } from '@jest/globals';
import cosmiconfig from 'cosmiconfig';
import { Config, DEFAULT_CONFIG } from '../src/config';
import { Linter } from '../src/linter';

describe('Config', () => {
  const spy = jest.spyOn(cosmiconfig, 'cosmiconfigSync');

  it('如果传了配置对象,则不去搜索默认配置', () => {
    const conf = new Config();
    conf.initConfig(DEFAULT_CONFIG);

    expect(spy).toBeCalledTimes(0);
  });

  it('如果没传配置对象,则要搜索默认配置', () => {
    const conf = new Config();
    conf.initConfig();

    expect(spy).toBeCalledTimes(1);
  });
});

describe('Linter', () => {
  const config = new Config();
  config.initConfig(DEFAULT_CONFIG);

  it('第1部分[分支特性]不是feat或fix则会抛出索引0', () => {
    expect(Linter.lint('master', config.processedConfig).index).toBe(0);

    expect(Linter.lint('fix', config.processedConfig).index).toBe(1);
    expect(Linter.lint('feat', config.processedConfig).index).toBe(1);
  });

  it('第2部分[分隔符]不是/则会抛出1', () => {
    expect(Linter.lint('feat-', config.processedConfig).index).toBe(1);

    expect(Linter.lint('feat/', config.processedConfig).index).toBe(2);
  });

  it('第3部分[用户名]不是/则会抛出2', () => {
    expect(Linter.lint('feat/12', config.processedConfig).index).toBe(2);

    expect(Linter.lint('feat/ranwawa', config.processedConfig).index).toBe(3);
  });

  it('第4部分[分隔符]不是/则会抛出3', () => {
    expect(Linter.lint('feat/ranwawa', config.processedConfig).index).toBe(3);

    expect(Linter.lint('feat/ranwawa/', config.processedConfig).index).toBe(4);
  });

  it('第5部分[内容]不是英文和中划线则会抛出4', () => {
    expect(
      Linter.lint('feat/ranwawa2/add new user', config.processedConfig).index
    ).toBe(4);

    expect(
      Linter.lint('feat/ranwawa/add-new-user', config.processedConfig)
    ).toBeNull();
  });
});
