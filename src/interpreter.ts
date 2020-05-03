import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { requireLabel, requireLabelsList } from '@/rules/requireLabel';
import { contextType } from '@/index';
import { refCommands } from '@/rules/requireLabelRef';
import { sections, sectionIsRequiredText } from '@/rules/sectionIsRequiredText';

export const interpreter = (context: contextType, node: any[]) => {
  node.forEach((node, index, array) => {
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
        if (sections.includes(node.name)) {
          sectionIsRequiredText(
            context,
            node,
            index,
            array.slice(index, array.length),
          );
        }
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
