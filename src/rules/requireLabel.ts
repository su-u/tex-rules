// eslint-disable-next-line no-undef
export const requireLabelsList: ReadonlyArray<string> = ['figure', 'table'];

export const requireLabel = (ast: any): number => {
  return ast.some((node: any) => {
    switch (node.kind) {
      case 'env': {
        return requireLabel(node.content);
      }
      case 'command': {
        if (node.name === 'caption') {
          return 0;
        }
        return 1;
      }
      default:
        return 1;
    }
  });
};
