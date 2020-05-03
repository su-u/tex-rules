import { requireCaption } from '@/rules/requireCaption';

describe('requireCaption', (): void => {
  test('has caption', (): void => {
    const ast = require('./testAstJson/figure_has_caption.json');
    const hasCaption = requireCaption([ast]);
    expect(hasCaption).toBeTruthy();
  });

  test('has not caption', (): void => {
    const ast = require('./testAstJson/figure_has_not_caption.json');
    const hasCaption = requireCaption([ast]);
    expect(hasCaption).toBeFalsy();
  });
});
