export const filteredData = (rows: Array<any>, headers: Array<any>, filter: string) => {
  return rows.filter((row) => headers.some((column) => row[column].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1));
};

export const groupedData = (rows: Array<any>, key: string) => {
  return rows.reduce((item, index) => {
    (item[index[key]] = item[index[key]] || []).push(index);
    return item;
  }, {});
};
