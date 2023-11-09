// const calculateInnerPages = (element: HTMLElement, side: number) => {
//   // Equation: `entireWidth = columnWidth * innerPages + columnGap * (innerPages - 1) - (left + right) * innerPages`
//   const entireWidth = element.scrollWidth;
//   const styles = window.getComputedStyle(element);
//   const columnWidth = parseFloat(styles.columnWidth);
//   const columnGap = parseFloat(styles.columnGap) || 0;

//   const innerPages =
//     (entireWidth + columnGap) / (columnWidth + columnGap - side * 2);

//   console.log(
//     `innerPage calculation error: ${Math.round(innerPages) - innerPages}`
//   );

//   return Math.round(innerPages);
// };

// export default calculateInnerPages;
let cachedColumnWidth: number | null = null;
let cachedColumnGap: number | null = null;

const calculateInnerPages = (element: HTMLElement, side: number) => {
  const entireWidth = element.scrollWidth;
  const styles = window.getComputedStyle(element);

  if (cachedColumnWidth === null || cachedColumnGap === null) {
    cachedColumnWidth = +styles.columnWidth.replace('px', '');
    cachedColumnGap = +styles.columnGap.replace('px', '') || 0;
  }

  const innerPages =
    (entireWidth + cachedColumnGap) / (cachedColumnWidth + cachedColumnGap - side * 2);

  const roundedInnerPages = Math.round(innerPages);
  return roundedInnerPages;
};

export default calculateInnerPages;
