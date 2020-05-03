import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { requireLabel, requireLabelsList } from '@/rules/requireLabel';
import { contextType } from '@/index';
import { refCommands } from '@/rules/requireLabelRef';
import { sections, sectionIsRequiredText } from '@/rules/sectionIsRequiredText';

// type execItems = {
//   names: ReadonlyArray<string>;
//   func: any;
// };
//
// type kindKeys = 'env' | 'command';

export const interpreter = (context: contextType, node: any[]) => {
  // const execList: { [key in kindKeys]: execItems[] } = {
  //   env: [
  //       names: requireCaptionsList,
  //       func: requireCaption,
  //     },
  //       names: requireLabelsList,
  //       func: requireLabel,
  //     },
  //   ],
  //   command: [
  //     {
  //       names: ['label'],
  //       func: context.labelRef.addLabel,
  //     },
  //     {
  //       names: refCommands,
  //       func: context.labelRef.addRef,
  //     },
  //     {
  //       names: sections,
  //       func: sectionIsRequiredText,
  //     },
  //   ],
  // };

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
