import { BLACK, WHITE, RESET, RED } from '@/util/console';

export const reportList: reportType[] = [];

export type reportKey = 'error' | 'info';

export const reportTypeObject: { [key in reportKey]: string } = {
  error: RED,
  info: WHITE,
};

export type reportType = {
  errorText: string;
  reportType: reportKey;
  nodeName: string;
  line: number;
  column: number;
};

export const report = (
  errorText: string,
  reportType: reportKey,
  nodeName: string,
  line: number,
  column: number,
) => {
  reportList.push({ errorText, reportType, nodeName, line, column });
};

export const reportOutput = () => {
  reportList.forEach(report => {
    // eslint-disable-next-line no-console
    console.log(
      `${WHITE}${('  ' + report.line).substr(-3)}:${report.column} ${
        reportTypeObject[report.reportType]
      }${report.reportType}${BLACK} ${report.errorText}\t${WHITE}${
        report.nodeName
      }${RESET}`,
    );
  });
};
