// ラベル参照を必須にするルール

export const labelsList: Array<{
  labelName: string,
  node: any,
}> = [];

export const addLabel = (labelName: string, node: any) => {
  labelsList.push({
    labelName,
    node,
  });
};