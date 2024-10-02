

const getRandomNumber = (start, end) => {
  let random = Math.floor(Math.random() * end + start);
  while (random > end) {
    random = Math.floor(Math.random() * end + start);
  }
  return random;
};

export {
  getRandomNumber,
};
