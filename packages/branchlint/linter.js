export class Linter {
  static lint(branchName, config) {
    let unPassedBranchComponent = branchName;
    let passedBranchComponent = '';
    const { length } = config;

    for (let i = 0; i < length; i += 1) {
      const { regStr, reg } = config[i];
      const nextIndex = i + 1;
      const isLastItem = nextIndex === length;

      const failedResult = {
        branchName,
        config,
        passedBranchComponent,
        unPassedBranchComponent,
        index: i,
      };

      const unionReg = isLastItem
        ? new RegExp(`^${regStr}$`)
        : new RegExp(`^${regStr}(?=${config[nextIndex].regStr})`);

      const unionPattern = unPassedBranchComponent.match(unionReg);

      if (!unionPattern) {
        if (isLastItem) {
          return failedResult;
        }
        const alonePattern = unPassedBranchComponent.match(reg);

        if (!alonePattern) {
          return failedResult;
        }

        passedBranchComponent += alonePattern[0];
        unPassedBranchComponent = unPassedBranchComponent.replace(reg, '');
      } else {
        passedBranchComponent += unionPattern[0];
        unPassedBranchComponent = unPassedBranchComponent.replace(unionReg, '');
      }
    }

    return null;
  }
}

export default Linter;
