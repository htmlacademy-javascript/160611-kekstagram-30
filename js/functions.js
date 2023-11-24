// Функция для проверки длины строки.
function isShorterOrEquals(string, requiredLength) {
  return string.length <= requiredLength;
}

isShorterOrEquals('Кекстаграм', 20);

// Функция для проверки, является ли строка палиндромом.
function isPalindrome(string) {

  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
}

isPalindrome('Лёша на полке клопа нашёл');

// Функция которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
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

extractNumbersFromString(-0.5);
