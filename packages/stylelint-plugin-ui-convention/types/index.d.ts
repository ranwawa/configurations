export type TOption = Record<string, string>;

export interface IPluginFactory {
  /**
   * 规则名称
   * @example font-size-allowed-list,color-allowed-list
   */
  ruleName: string;
  /**
   * 配置变量名规则
   * @example /^fz-[a-z]+$/,/^c-[a-z]+$/
   */
  variableReg: RegExp;
  /**
   * 默认配置
   * @example { fz-sm: 12px, fz-md: 14px }
   */
  defaultOption: TOption | true;
  /**
   * 待验证的css属性
   * @example font-size,color
   */
  ruleProperty: string;
}
