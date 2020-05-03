// キャプションを必須にするルール
// eslint-disable-next-line no-undef
export const requireCaptionsList: ReadonlyArray<string> = ['figure', 'table'];

export const requireCaption = (ast: any): boolean => {
  return ast.some((node: any) => {
    switch (node.kind) {
      case 'env': {
        return requireCaption(node.content);
      }
      case 'command': {
        return node.name === 'caption';
      }
      default:
        return false;
    }
  });
};
