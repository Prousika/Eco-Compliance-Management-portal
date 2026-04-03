export const generateReportNumber = (count = 0) => {
  const newIndex = count + 1;
  return `RPT-${String(10000 + newIndex).slice(-5)}`;
};
