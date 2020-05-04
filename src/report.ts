import Enumerable from 'linq';
// @ts-ignore
import ListIt from 'list-it';
import { WHITE, RESET, RED } from '@/util/console';
import colors from 'colors/safe';

export type reportKey = 'error' | 'info';

export type reportType = {
  errorText: string;
  reportType: reportKey;
  nodeName: string;
  line: number;
  column: number;
};

export const reportOutputTextColor: { [key in reportKey]: string } = {
  error: RED,
  info: WHITE,
};

export class ReportClass {
  reportList: reportType[];

  constructor() {
    this.reportList = [];
  }

  report = (errorText: string, reportType: reportKey, node: any): void => {
    this.reportList.push({
      errorText,
      reportType,
      nodeName: node.name,
      line: node.location.start.line,
      column: node.location.start.column,
    });
  };

  reportOutput = (fileName: string): void => {
    const lines = Enumerable.from(this.reportList)
      .orderBy(line => line.line)
      .toArray()
      .map(report => {
        return [
          `${colors.gray(
            `${('   ' + report.line).substr(-4)}:${report.column}`,
          )}`,
          `${reportOutputTextColor[report.reportType]}${
            report.reportType
          }${RESET}`,
          `${report.errorText}`,
          `${colors.gray(`${report.nodeName}`)}${RESET}`,
        ];
      });
    const listit = new ListIt();

    if (lines.length > 0) {
      console.log(colors.underline(fileName));
      console.log(listit.d(lines).toString());
      console.log();
    }
  };
}
