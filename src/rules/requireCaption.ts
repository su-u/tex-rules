export const requireCaption = (ast: any, report: any): number => {
  return ast.some((node: any) => {
    switch (node.kind) {
      case 'env': {
        return requireCaption(node.content, report);
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
