// chuyen string thanh so
export const convert = (price) => {
  return (price =
    typeof price === "string"
      ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : price);
};
