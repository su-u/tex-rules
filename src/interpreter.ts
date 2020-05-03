import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { requireLabel, requireLabelsList } from '@/rules/requireLabel';
import { contextType } from '@/index';
import { refCommands } from '@/rules/requireLabelRef';

export const interpreter = (context: contextType, node: any[]) => {
  node.forEach((node: any) => {
    switch (node.kind) {
      case 'env': {
        if (requireCaptionsList.includes(node.name)) {
          if (!requireCaption(node.content)) {
            context.report(
              `${node.name}にキャプションがありません`,
              'error',
              node,
            );
          }
        }
        if (requireLabelsList.includes(node.name)) {
          if (!requireLabel(node.content)) {
            context.report(`${node.name}にラベルがありません`, 'error', node);
          }
        }
        interpreter(context, node.content);
        break;
      }
      case 'command': {
        if (node.name === 'label') context.labelRef.addLabel(node);
        if (refCommands.includes(node.name)) context.labelRef.addRef(node);
        break;
      }
      default: {
        break;
      }
    }
  });
};
