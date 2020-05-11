// citeの前にピリオドがあってはいけない
import { contextType } from '@/index';

export const noPeriodBeforeTheCiteList: ReadonlyArray<string> = ['cite'];

const periodList: ReadonlyArray<string> = ['\\.', '．', '。'];

export const noPeriodBeforeTheCite = (
  context: contextType,
  node: any,
  array: any[],
  index: number,
) => {
  if (!array[index - 1]) {
    context.report('citeの前の要素がありません。', 'error', node);
    return;
  }
  if (array[index - 1].kind !== 'text.string') {
    context.report('citeの前の要素がテキストではありません。', 'error', node);
    return;
  }
  const regex = RegExp(`(${periodList.join('|')})$`);
  if (array[index - 1].content.match(regex)) {
    context.report(
      `citeの直前に${periodList
        .map(value => `「${value}」`)
        .join('')}があります。`,
      'error',
      node,
    );
    return;
  }
};
