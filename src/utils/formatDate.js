export const formatDate = (date) => {
  let d = date instanceof Date ? date : new Date(date || Date.now());
  if (isNaN(d.getTime())) {
    console.warn("Invalid date passed to formatDate");
    d = new Date();
  }
  return d.toISOString().split("T")[0];
};
