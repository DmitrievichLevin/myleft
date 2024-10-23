export const entrySortCallback = (
  a: IntersectionObserverEntry,
  b: IntersectionObserverEntry
) => {
  const { target: a_t } = a;
  const { target: b_t } = b;

  var a_x = (a_t as HTMLElement).offsetLeft;
  var b_x = (b_t as HTMLElement).offsetLeft;

  return a_x - b_x;
};
