// Функция для проверки длины строки.
const isShorterOrEquals = (string, requiredLength) => string.length <= requiredLength;

// console.log(isShorterOrEquals('Кекстаграм', 20));


// Функция для проверки, является ли строка палиндромом.
function isPalindrome(string) {

  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
}

// console.log(isPalindrome('Лёша на полке клопа нашёл'));


// Функция которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
function getIntegerFromString(string) {

  let numberString = '';

  if (typeof string === 'number') {
    numberString = string.toString();

    // Убираем знак минус и точку, если в качестве параметра передана дробь.
    numberString = numberString.replace('-', '').replace('.', '');

  } else if (typeof string === 'string') {
    const normalizedString = string.replaceAll(' ', '');

    for (let i = 0; i < normalizedString.length; i++) {
      if (!Number.isNaN(parseInt(normalizedString[i], 10))) {
        numberString += normalizedString[i];
      }
    }

  } // В остальных случаях numberString так и останется пустой строкой, что в итоге даст NaN.

  return parseInt(numberString, 10);
}

// console.log(getIntegerFromString(-0.5));
