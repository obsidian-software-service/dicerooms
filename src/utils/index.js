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
  return `[${rolls.join(',')}]${plus}=${total}`;
};
