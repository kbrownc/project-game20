const getRandomNumber = (start, end) => {
  let random = Math.floor(Math.random() * end + start);
  while (random > end) {
    random = Math.floor(Math.random() * end + start);
  }
  return random;
};

export { getRandomNumber };

function hasRepeatingdigits(N) {
  return /([0-9]).*?\1/.test(N);
}

export {hasRepeatingdigits};

function isAscening(N) {
  const asc = /^0*1*2*3*4*5*6*7*8*9*$/;
  if (asc.test(N)) {
    return true;
  } else {
    return false;
  }
}

export {isAscening};

function isExactSquareRoot(N) {
  let x = Math.sqrt(N);
  if (x - Math.trunc(x) === 0) {
    return true;
  } else {
    return false;
  }
}

export {isExactSquareRoot};

function isEvenOrOddDigits(N) {
  let NArray = N.toString().split('');
  let evenOdd = '';
  let evenOrOdd = false;
  if (NArray.length === 1) {
    evenOrOdd = true;
    return evenOrOdd;
  }
  for (let k = 0; k < NArray.length; k++) {
    if (k === 0) {
      if (NArray[k] % 2 === 0) {
        evenOdd = 'even';
      } else {
        evenOdd = 'odd';
      }
    } else {
      if (NArray[k] % 2 === 0 && evenOdd === 'even') {
        evenOrOdd = true;
      } else {
        if (NArray[k] % 2 !== 0 && evenOdd === 'odd') {
          evenOrOdd = true;
        } else {
          evenOrOdd = false;
        }
      }
    }
  }
  return evenOrOdd;
}

export {isEvenOrOddDigits};
