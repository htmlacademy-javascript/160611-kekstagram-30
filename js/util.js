// Функция для получения случайного целого числа в заданном диапазоне.
function getRandomIntegerFromRange(startNumber, endNumber) {
  const lower = Math.ceil(Math.min(Math.abs(startNumber), Math.abs(endNumber)));
  const upper = Math.floor(Math.max(Math.abs(startNumber), Math.abs(endNumber)));
  const random = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(random);
}

// Функция для получения случайного элемента массива.
function getRandomArrayElement(arr) {
  return arr[getRandomIntegerFromRange(0, arr.length - 1)];
}

// Функция для проверки длины строки на меньше или равно заданному значению.
function isShorterOrEquals(string, requiredLength) {
  return string.length <= requiredLength;
}

// Функция для проверки, является ли строка палиндромом.
function isPalindromeString(string) {

  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
}

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
function extractNumbersFromString(string) {

  let stringOfNumbers = '';

  if (typeof string === 'string') {
    const normalizedString = string.replaceAll(' ', '');

    for (let i = 0; i < normalizedString.length; i++) {
      if (!Number.isNaN(parseInt(normalizedString[i], 10))) {
        stringOfNumbers += normalizedString[i];
      }
    }
  } else if (typeof string === 'number') {
    stringOfNumbers = string.toString();
    stringOfNumbers = stringOfNumbers.replace('-', '').replace('.', '');
  }

  return parseInt(stringOfNumbers, 10);
}

export {
  isShorterOrEquals,
  isPalindromeString,
  extractNumbersFromString,
  getRandomIntegerFromRange,
  getRandomArrayElement,
};
