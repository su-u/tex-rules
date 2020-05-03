// セクションにはテキストが必須
import { contextType } from '@/index';

export const sections: ReadonlyArray<string> = [
  'section',
  'subsection',
  'subsubsection',
  'subsubsubsection',
];
const possibleNodes: ReadonlyArray<string> = ['label', 'parbreak'];

export const sectionIsRequiredText = (
  context: contextType,
  node: any,
  array: any[],
) => {
  const firstTextNodeIndex = array.findIndex(
    (node: any) => node.kind === 'text.string',
  );
  if (firstTextNodeIndex === -1) {
    context.report('テキスト要素がありません。', 'error', node);
    return;
  }
  if (!isPossibleNodes(array.slice(1, firstTextNodeIndex)))
    context.report('セクション直下にテキストがありません。', 'error', node);
};

// テキスト要素の間の要素は利用可能な要素かどうか
const isPossibleNodes = (array: any[]) => {
  return array.every((node: any) => possibleNodes.includes(node.kind));
};
