'use strict';

var WIZARDS_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR_LIST = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;
var KEYS_CODES = {
  enter: 13,
  esc: 27
};

// Функция, возвращающая случайное число из диапазона
var getRamdomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция, возвращающая случайный элемент из массива
var getRamdomValueFromArray = function (array) {
  return getRamdomValue(0, array.length - 1);
};

// Функция создания массива с волшебниками
var createWizardsList = function (quantity) {
  var array = [];

  for (var i = 0; i < quantity; i++) {
    array[i] = {
      name: WIZARDS_NAMES_LIST[getRamdomValueFromArray(WIZARDS_NAMES_LIST)] + ' ' + WIZARDS_SURNAMES_LIST[getRamdomValueFromArray(WIZARDS_SURNAMES_LIST)],
      coatColor: COATS_COLORS_LIST[getRamdomValueFromArray(COATS_COLORS_LIST)],
      eyesColor: EYES_COLORS_LIST[getRamdomValueFromArray(EYES_COLORS_LIST)]
    };
  }

  return array;
};

// Функция создания и наполнения фрагмента с волшебниками
var createWizardsFragment = function (array) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < array.length; i++) {
    var newElement = template.cloneNode(true);
    newElement.querySelector('.setup-similar-label').textContent = array[i].name;
    newElement.querySelector('.wizard-coat').style.fill = array[i].coatColor;
    newElement.querySelector('.wizard-eyes').style.fill = array[i].eyesColor;
    fragment.appendChild(newElement);
  }

  return fragment;
};

// Поиск окон
var setupWindow = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupWindow.querySelector('.setup-close');
var setupNameInput = setupWindow.querySelector('.setup-user-name');
var similarWizards = setupWindow.querySelector('.setup-similar');

// Создание массива волшебников и фрагмента для вставки в DOM
var wizardsList = createWizardsList(WIZARDS_QUANTITY);
var wizardsFragment = createWizardsFragment(wizardsList);
similarWizards.querySelector('.setup-similar-list').appendChild(wizardsFragment);

// Показ окна с похожими волшебниками
similarWizards.classList.remove('hidden');

// Функции открытия и закрытия окна настроек персонажа
var setupOpenHandler = function () {
  setupWindow.classList.remove('hidden');
};

var setupCloseHandler = function () {
  setupWindow.classList.add('hidden');
};

// Обработка событий, открывающих окно настроек персонажа
setupOpenButton.addEventListener('click', setupOpenHandler);

setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYS_CODES.enter) {
    setupOpenHandler();
  }
});

// Обработка событий, закрывающих окно настроек персонажа
setupCloseButton.addEventListener('click', setupCloseHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYS_CODES.esc && evt.target !== setupNameInput) {
    setupCloseHandler();
  }
});

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYS_CODES.enter) {
    setupCloseHandler();
  }
});

// Настройка внешнего вида персонажа
var playerSetup = setupWindow.querySelector('.setup-player');
var playerEyesColor = playerSetup.querySelector('.wizard-eyes');
var playerCoatColor = playerSetup.querySelector('.wizard-coat');
var playerFireballColor = playerSetup.querySelector('.setup-fireball');

// Обработа кликов на волшебнике пользователя и изменение цвета глаз, цвета плаща и цвета фаербола
playerEyesColor.addEventListener('click', function () {
  var color = EYES_COLORS_LIST[getRamdomValueFromArray(EYES_COLORS_LIST)];
  playerEyesColor.style.fill = color;
  playerSetup.querySelector('input[name=eyes-color]').value = color;
});

playerCoatColor.addEventListener('click', function () {
  var color = COATS_COLORS_LIST[getRamdomValueFromArray(COATS_COLORS_LIST)];
  playerCoatColor.style.fill = color;
  playerSetup.querySelector('input[name=coat-color]').value = color;
});

playerFireballColor.addEventListener('click', function () {
  var color = FIREBALL_COLOR_LIST[getRamdomValueFromArray(FIREBALL_COLOR_LIST)];
  playerFireballColor.style.backgroundColor = color;
  playerSetup.querySelector('input[name=fireball-color]').value = color;
});
