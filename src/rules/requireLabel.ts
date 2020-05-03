// ラベルを必須にするルール
// eslint-disable-next-line no-undef
export const requireLabelsList: ReadonlyArray<string> = ['figure', 'table'];

export const requireLabel = (ast: any): boolean => {
  return ast.some((node: any) => {
    switch (node.kind) {
      case 'env': {
        return requireLabel(node.content);
      }
      case 'command': {
        return node.name === 'label';
      }
      default:
        return false;
    }
  });
};
