import { getRandomIntegerFromRange, getRandomArrayElement } from './util.js';

const CARDS_COUNT = 25;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_AUTHORS = [
  'Виктор',
  'Валентина',
  'Григорий',
  'Елена',
  'Саша',
  'Алёна',
  'Наталья',
  'Дима',
  'Артём',
  'Денис'
];

const PHOTO_DESCRIPTION_MAP = new Map([
  [1, 'Санаторий. Пляж. Шезлонги'],
  [2, 'Указатель в стиле лофт'],
  [3, 'Здравствуй, лазурный берег!'],
  [4, 'Остановись, мгновенье, -- ты прекрасно!'],
  [5, 'Хороши, супчики!'],
  [6, 'Супертачка с дверями "вот так"'],
  [7, 'А нет чего-нибудь посущественнее?'],
  [8, 'С сегодняшего дня -- ЗОЖ!'],
  [9, 'Улетел, но обещал вернуться'],
  [10, 'Обувь на отдыхе'],
  [11, 'Море не за горами'],
  [12, 'Себе такую же хочу'],
  [13, 'Просто красивая тарелка'],
  [14, 'Кошачья сушисность'],
  [15, 'Подарок на день космонавтики'],
  [16, 'Пролетая над гнездом кукушки'],
  [17, 'Какая-то фералмония случилась'],
  [18, 'Купил по случаю'],
  [19, 'Бабушка регулярно выходит в астрал'],
  [20, 'Здесь мы останавливались в прошлый раз. Или я путаю?..'],
  [21, 'Заказал сегодня во ВкусВилл'],
  [22, 'Вечер перед отъездом'],
  [23, 'Крупным планом краб'],
  [24, 'Не Стас Михайлов, но тоже ничего'],
  [25, 'Встретились два одиночества..']
]);

function createSequentialIdGenerator(startNumber) {
  let currentId = startNumber - 1;

  return function () {
    currentId++;
    return currentId;
  };
}

const generateCardId = createSequentialIdGenerator(1);

function createRandomIdFromRangeGenerator(startNumber, endNumber) {
  const usedValues = [];

  return function () {
    let currentValue = getRandomIntegerFromRange(startNumber, endNumber);
    while (usedValues.includes(currentValue)) {
      currentValue = getRandomIntegerFromRange(startNumber, endNumber);
    }
    usedValues.push(currentValue);
    return currentValue;
  };
}

const generateCommentId = createRandomIdFromRangeGenerator(100, 1000);

function createMessageGenerator(numberOfSentences) {
  const usedMessages = [];

  return function () {
    let currentMessage = getRandomArrayElement(COMMENT_MESSAGES);

    if (usedMessages.length >= numberOfSentences) {
      usedMessages.length = 0;
    }

    while (usedMessages.includes(currentMessage)) {
      currentMessage = getRandomArrayElement(COMMENT_MESSAGES);
    }
    usedMessages.push(currentMessage);
    return currentMessage;
  };
}

function createComment() {
  const numberOfSentences = getRandomIntegerFromRange(1, 2);
  const generateMessage = createMessageGenerator(numberOfSentences);

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomIntegerFromRange(1, 6)}.svg`,
    message: Array.from({ length: numberOfSentences }, generateMessage).join(' '),
    name: getRandomArrayElement(COMMENT_AUTHORS),
  };
}

function createDescriptionCard() {
  const cardId = generateCardId();

  return {
    id: cardId,
    url: `photos/${cardId}.jpg`,
    decsription: PHOTO_DESCRIPTION_MAP.get(cardId),
    likes: getRandomIntegerFromRange(15, 200),
    comments: Array.from({ length: getRandomIntegerFromRange(0, 30) }, createComment),
  };
}

function createSetOfDescriptionCards() {
  return Array.from({ length: CARDS_COUNT }, createDescriptionCard);
}

export { createSetOfDescriptionCards };
