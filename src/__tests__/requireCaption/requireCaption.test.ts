import { requireCaption } from '../../rules/requireCaption';
import { texToDocumentAst } from '../../util/test';

describe('requireCaption', (): void => {
  describe('figure', (): void => {
    test('has caption', (): void => {
      const ast = texToDocumentAst('./src/__tests__/requireCaption/tex/figure_has_caption.tex');
      const hasCaption = requireCaption([ast]);
      expect(hasCaption).toBeTruthy();
    });

    test('has not caption', (): void => {
      const ast = texToDocumentAst('./src/__tests__/requireCaption/tex/figure_has_not_caption.tex');
      const hasCaption = requireCaption([ast]);
      expect(hasCaption).toBeFalsy();
    });
  })

  describe('table', (): void => {
    test('has table', (): void => {
      const ast = texToDocumentAst('./src/__tests__/requireCaption/tex/table_has_caption.tex');
      const hasCaption = requireCaption([ast]);
      expect(hasCaption).toBeTruthy();
    });

    test('has not table', (): void => {
      const ast = texToDocumentAst('./src/__tests__/requireCaption/tex/table_has_not_caption.tex');
      const hasCaption = requireCaption([ast]);
      expect(hasCaption).toBeFalsy();
    });
  })
});
