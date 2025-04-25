export const formatDate = (date) => {
  let d = date instanceof Date ? date : new Date(date || Date.now());
  if (isNaN(d.getTime())) {
    console.warn("Invalid date passed to formatDate");
    d = new Date();
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
