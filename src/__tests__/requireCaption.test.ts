import { requireCaption } from '../rules/requireCaption';
import ast from './testAstJson/figure_has_caption.json';

describe('requireCaption', (): void => {
  test('', (): void => {
    const hasCaption = !requireCaption([ast]);
    expect(hasCaption).toBeTruthy();
  });
});
