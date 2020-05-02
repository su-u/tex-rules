// eslint-disable-next-line no-undef
export const requireCaptionsList: ReadonlyArray<string> = ['figure', 'table'];

export const requireCaption = (ast: any): number => {
  return ast.some((node: any) => {
    switch (node.kind) {
      case 'env': {
        return requireCaption(node.content);
      }
      case 'command': {
        if (node.name === 'caption') {
          return 1;
        }
        return 0;
      }
      default:
        return 0;
    }
  });
};
