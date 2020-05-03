export type reportType = {
  errorText: string;
  nodeName: string;
  line: number;
  column: number;
};

export const reportList: reportType[] = [];

export const report = (
  errorText: string,
  nodeName: string,
  line: number,
  column: number,
) => {
  reportList.push({ errorText, nodeName, line, column });
};

export const reportOutput = () => {
  reportList.forEach(report => {
    // eslint-disable-next-line no-console
    console.log(report);
  });
};
