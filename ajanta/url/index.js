class URL {
  constructor({ path, name, view, children }) {
    this.$path = path;
    this.$name = name;
    this.$view = view;
    this.$children = children;
    this.pathArray = path.split("/").filter(el => el);
  }
  /* match(pathArray) {
    if (pathArray[0] !== this.$path) return false;
    if (pathArray.length === 1) return true;
    if (pathArray.length > 1 && this.$children && this.$children.length) {
      const chieldPath = pathArray.filter((el, i) => i);
      return !!this.$children.find(url => url.match(chieldPath));
    }
    return false;
  }*/
  isDynamic(str) {
    return str.startsWith("<") && str.endsWith(">");
  }
  compare(sString, dString, object) {
    if (sString && this.isDynamic(sString)) {
      const regx = new RegExp("<(int|str):(.*?)>");
      const [str, type, veriable] = regx.exec(sString);
      object[veriable] = dString;
      return type === "int" ? !isNaN(Number(dString)) : true;
    }
    return dString === sString;
  }
  match(pathArray, obj) {
    let rObj = obj;
    const equal = this.pathArray.reduce((bool, str, index) => {
      return this.compare(str, pathArray[index], rObj) && bool;
    }, true);
    if (!equal) return false;
    if (pathArray.length === this.pathArray.length) return this.$view;
    if (
      pathArray.length > this.pathArray.length &&
      this.$children &&
      this.$children.length
    ) {
      const newPathArray = pathArray.filter(
        (el, i) => i > this.pathArray.length - 1
      );
      return this.$children.reduce(
        (view, url) => view || url.match(newPathArray, rObj),
        false
      );
    }
    return false;
  }

  //   getView(pathArray) {
  //     if (pathArray.length === this.pathArray.length) return this.$view;
  //     const newPathArray = pathArray.filter(
  //       (el, i) => i > this.pathArray.length - 1
  //     );
  //     return this.$children
  //       .find(url => url.match(newPathArray))
  //       .getView(newPathArray);
  //   }
}

module.exports = URL;
