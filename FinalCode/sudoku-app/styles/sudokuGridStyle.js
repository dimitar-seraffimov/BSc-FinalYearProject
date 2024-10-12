import styles from "./styles";
// this file calculates and returns the cell style based on the (id)

export const getCellStyle = (id) => {
  // edge detection
  const isRightEdgeOfGrid = id % 9 === 8; // if the cell is on the right edge
  const isBottomEdgeOfGrid = Math.floor(id / 9) === 8; // if the cell is on the bottom edge
  const isRightEdge = id % 9 === 2 || id % 9 === 5; //  if the cell is on the right edge of a 3x3 region
  const isBottomEdge = Math.floor(id / 9) % 3 === 2 && Math.floor(id / 9) < 8; // if the cell is on the bottom edge of a 3x3 region

  // combine the base cell style with conditional styles for the right and bottom edges
  const cellStyle = {
    ...styles.cell,
    borderRightWidth: isRightEdgeOfGrid ? 0 : isRightEdge ? 1 : 1,
    borderBottomWidth: isBottomEdgeOfGrid ? 0 : isBottomEdge ? 1 : 1,
    borderRightColor: isRightEdge ? "white" : "green",
    borderBottomColor: isBottomEdge ? "white" : "green",
  };

  return cellStyle;
};
