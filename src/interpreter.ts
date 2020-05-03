import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { requireLabel, requireLabelsList } from '@/rules/requireLabel';

export const interpreter = (context: any, node: any, report: any) => {
  switch (node.kind) {
    case 'env': {
      if (requireCaptionsList.includes(node.name)) {
        if (!requireCaption(node.content)) {
          report(`${node.name}にキャプションがありません`, 'error', node);
        }
      }
      if (requireLabelsList.includes(node.name)) {
        if (!requireLabel(node.content)) {
          report(`${node.name}にラベルがありません`, 'error', node);
        }
      }
      node.content.forEach((node: any) => interpreter(context, node, report));
      break;
    }
    case 'command': {
      if (node.name === 'label') context.labelRef.addLabel(node);
      if (node.name === 'ref') context.labelRef.addRef(node);
      break;
    }
    default: {
      break;
    }
  }
};
