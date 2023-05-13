export const isObjectEmpty = (obj) => {
  const hasKeys = Object.keys(obj);
  return hasKeys.length > 0;
};
