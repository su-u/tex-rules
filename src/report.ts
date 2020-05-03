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

  reportOutput = (): void => {
    this.reportList.forEach(report => {
      // eslint-disable-next-line no-console
      console.log(
        `${colors.gray(`${('   ' + report.line).substr(-4)}:${report.column}`)}  ${
          reportOutputTextColor[report.reportType]
        }${report.reportType}${RESET}  ${report.errorText}\t${colors.gray(`${
          report.nodeName
        }`)}${RESET}`,
      );
    });
  };
}
