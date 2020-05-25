function names(e: any /* enum */) {
  var names: string[] = [];
  for (var n in e) {
    if (typeof e[n] === "number") names.push(n);
  }
  return names;
}

export { names };
