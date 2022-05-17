import _ from 'lodash';
import cosmiconfig from 'cosmiconfig';

type IPattern = string[] | string | RegExp;

interface IConfigItem {
  pattern: IPattern;
  message: string | (() => string);
}

export type IConfig = {
  config: IConfigItem[];
  examples: string[];
  docUrl: string;
};

export interface IProcessedConfigItem extends IConfigItem {
  reg: RegExp;
  regStr: string;
}

export interface IProcessedConfig extends IConfig {
  config: IProcessedConfigItem[];
}

export const BRANCHLINT = 'branchlint';

export const DEFAULT_CONFIG: IConfig = {
  examples: ['feat/ranwawa-todo-list', 'fix/ranwawa-todo-list'],
  docUrl: 'https://github.com/',
  config: [
    {
      pattern: ['feat', 'fix'],
      message: '分支名只能以feat和fix开头',
    },
    {
      pattern: '/',
      message: '分隔符只能是/',
    },
    {
      pattern: /[a-zA-Z]+/,
      message: '名称只能是英文',
    },
    {
      pattern: '/',
      message: '分隔符只能是/',
    },
    {
      pattern: /[a-z-]+/,
      message: '内容只能是英文加中划线',
    },
  ],
};

export class Config {
  originalConfig: IConfig;

  processedConfig: IProcessedConfig;

  initConfig(config?: IConfig) {
    if (config) {
      this.originalConfig = config;
    } else {
      const explorer = cosmiconfig.cosmiconfigSync(BRANCHLINT);
      const res = explorer.search();

      this.originalConfig = res ? res.config : DEFAULT_CONFIG;
    }
    this.processConfig();
  }

  static parsePatternToRegex(pattern: IPattern) {
    let regStr = '';

    if (_.isArray(pattern)) {
      regStr = `(${pattern.join('|')})`;
    } else if (_.isString(pattern)) {
      regStr = `(${pattern})`;
    } else if (_.isRegExp(pattern)) {
      const str = pattern.toString();
      regStr = `(${str.substring(1, str.length - 1)})`;
    }

    return regStr;
  }

  processConfig() {
    this.processedConfig = {
      ...this.originalConfig,
      config: this.originalConfig.config.map((item) => {
        const regStr = Config.parsePatternToRegex(item.pattern);
        const reg = new RegExp(regStr);

        return {
          ...item,
          regStr,
          reg,
        };
      }),
    };
  }
}

export default Config;
