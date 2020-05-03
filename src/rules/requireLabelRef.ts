// ラベル参照を必須にするルール
import { reportKey } from '@/report';

type labelType = {
  labelName: string;
  node: any;
  count: number;
};

type refType = {
  refName: string;
  node: any;
};

export class LabelRefClass {
  labelsList: Array<labelType>;
  refsList: Array<refType>;

  constructor() {
    this.labelsList = [];
    this.refsList = [];
  }

  addLabel = (node: any) => {
    this.labelsList.push({
      labelName: node.args[0].content[0].content,
      node,
      count: 0,
    });
  };

  addRef = (node: any) => {
    this.refsList.push({
      refName: node.args[0].content[0].content,
      node,
    });
  };

  labelAggregate = (
    report: (errorText: string, reportType: reportKey, node: any) => void,
  ) => {
    this.labelsList.forEach((label: labelType, index, array) => {
      array[index] = {
        ...label,
        count: this.refsList.filter(ref => ref.refName === label.labelName)
          .length,
      };
      if (array[index].count === 0) {
        report(
          `ラベル「${label.labelName}」は参照されていません。`,
          'error',
          label.node,
        );
      }
    });
  };
}
