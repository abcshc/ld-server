function names(e: any /* enum */) {
  const names: string[] = [];
  for (const n in e) {
    if (typeof e[n] === "number") names.push(n);
  }
  return names;
}

export { names };
