// eslint-disable-next-line no-undef
export const requireCaptionsList: ReadonlyArray<string> = ['figure', 'table'];

export const requireCaption = (ast: any): boolean => {
  return ast.some((node: any) => {
    switch (node.kind) {
      case 'env': {
        return requireCaption(node.content);
      }
      case 'command': {
        if (node.name === 'caption') {
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  });
};
