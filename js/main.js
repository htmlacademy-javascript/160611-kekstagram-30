// 'use strict';

const NUMBER_OF_CARDS = 25;

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
  [3, 'Ну, здравствуй, лазурный берег!'],
  [4, 'Остановись, мгновенье, -- ты прекрасно!'],
  [5, 'Хороши, супчики!'],
  [6, 'Супертачка с дверями "вот так"'],
  [7, 'А нет чего-нибудь посущественнее?'],
  [8, 'С сегодняшего дня -- ЗОЖ!'],
  [9, 'Он улетел, но обещал вернуться'],
  [10, 'Обувь тоже должна отдыхать'],
  [11, 'Море не за горами'],
  [12, 'Себе такую же хочу'],
  [13, 'Просто красивая тарелка'],
  [14, 'Котосуши'],
  [15, 'Подарок на день космонавтики'],
  [16, 'Пролетая над гнездом кукушки'],
  [17, 'Репетиция оркестра'],
  [18, 'Купил по случаю'],
  [19, 'Бабушка выходит в астрал'],
  [20, 'Здесь мы останавливались прошлым летом.'],
  [21, 'Заказал сегодня во ВкусВилл'],
  [22, 'Вечер перед отъездом'],
  [23, 'Краб крупным планом'],
  [24, 'Концерт был офигенный!'],
  [25, 'Встретились два одиночества']
]);

function getRandomIntegerFromRange(startNumber, endNumber) {
  const lower = Math.ceil(Math.min(Math.abs(startNumber), Math.abs(endNumber)));
  const upper = Math.floor(Math.max(Math.abs(startNumber), Math.abs(endNumber)));
  const random = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(random);
}

function getRandomArrayElement(arr) {
  return arr[getRandomIntegerFromRange(0, arr.length - 1)];
}

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
    name: getRandomArrayElement(COMMENT_AUTHORS)
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

function getSetOfDescriptionCards() {
  return Array.from({ length: NUMBER_OF_CARDS }, createDescriptionCard);
}

getSetOfDescriptionCards();
