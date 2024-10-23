export default (item: { [key: string]: any }, obj: any, path: string) => {
  let pointer = item;
  let paths = path.split('.');
  // Update resource property by traversing path
  paths.forEach((p, idx) => {
    if (idx === paths.length - 1) {
      pointer = { ...pointer, [p]: obj };
    } else {
      pointer = pointer[p];
    }
  });
};
