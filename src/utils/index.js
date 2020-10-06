export const textDescriptor = (txt) => {
  const descriptor = [];
  const rx = /((\d*)?d(\d+)([+-/*]\d+)?){1}/gi;
  let match = rx.exec(txt);
  let index = 0;
  while (!!match) {
    descriptor.push({
      text: txt.substring(index, match.index),
      type: 'regular',
    });
    descriptor.push({
      text: match[0],
      type: 'dice',
      number: match[2],
      dice: match[3],
      plus: match[4],
    });
    index = match.index + match[0].length;
    match = rx.exec(txt);
  }
  descriptor.push({
    text: txt.substring(index),
    type: 'regular',
  });

  return descriptor;
};

export const roll = (number, dice) => {
  const rolls = [];
  let sum = 0;
  for (let i = 0; i < number; i++) {
    const roll = Math.ceil(Math.random() * dice);
    rolls.push(roll);
    sum += roll;
  }
  return { rolls, sum };
};

export const rollToText = (number, dice, plus) => {
  const { rolls, sum } = roll(number, dice);
  const total = !!plus ? sum + parseInt(plus) : sum;
  if (!!plus) {
    return `[${rolls.join(', ')}]${plus}=${total}`;
  }
  return `[${rolls.join(', ')}]=${total}`;
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
const colorMap = {};
export const assignColor = (uid) => {
  const arrColor = [
    '#0055ff',
    '#d64d0d',
    '#cc0cb6',
    '#0bad09',
    '#f5e507',
  ];
  shuffleArray(arrColor);
  if (!colorMap[uid]) {
    colorMap[uid] =
      arrColor[Object.entries(colorMap).length % arrColor.length];
  }
  return colorMap[uid];
};
