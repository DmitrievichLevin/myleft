declare global {
  interface Array<T> {
    rotate(count: number): void;
  }
}

Array.prototype.rotate = (function () {
  var unshift = Array.prototype.unshift,
    splice = Array.prototype.splice;

  return function (this: any[], count: number) {
    var len = this.length >>> 0,
      count = count >> 0;

    unshift.apply(this, splice.call(this, count % len, len));

    return this;
  };
})();

export {};
