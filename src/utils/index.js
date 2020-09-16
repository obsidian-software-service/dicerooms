export const textDescriptor = (txt) => {
  const descriptor = [];
  const rx = /((\d*)?d(\d+)([+-/*]\d+)?){1}/g;
  let match = rx.exec(txt);
  let index = 0;
  while (!!match) {
    descriptor.push({
      text: txt.substring(index, match.index),
      type: "regular",
    });
    descriptor.push({
      text: match[0],
      type: "dice",
    });
    index = match.index + match[0].length;
    match = rx.exec(txt);
  }
  descriptor.push({
    text: txt.substring(index),
    type: "regular",
  });

  return descriptor;
};
