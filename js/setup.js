'use strict';

var WIZARDS_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR_LIST = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;
var keyCodes = {
  ENTER: 13,
  ESC: 27
};

// Функция, возвращающая случайное число из диапазона
var getRamdomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция, возвращающая случайный элемент из массива
var getRamdomValueFromArray = function (array) {
  return array[getRamdomValue(0, array.length - 1)];
};

// Функция создания массива с волшебниками
var createWizardsList = function (quantity) {
  var array = [];

  for (var i = 0; i < quantity; i++) {
    array[i] = {
      name: getRamdomValueFromArray(WIZARDS_NAMES_LIST) + ' ' + getRamdomValueFromArray(WIZARDS_SURNAMES_LIST),
      coatColor: getRamdomValueFromArray(COATS_COLORS_LIST),
      eyesColor: getRamdomValueFromArray(EYES_COLORS_LIST)
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

// Начальные координаты окна при открытии страницы
var setupWindowCoords = {
  x: getComputedStyle(setupWindow).top,
  y: getComputedStyle(setupWindow).left
};

// Создание массива волшебников и фрагмента для вставки в DOM
var wizardsList = createWizardsList(WIZARDS_QUANTITY);
var wizardsFragment = createWizardsFragment(wizardsList);
similarWizards.querySelector('.setup-similar-list').appendChild(wizardsFragment);

// Показ окна с похожими волшебниками
similarWizards.classList.remove('hidden');

// Функция открытия окна настроек персонажа
var onSetupOpen = function () {
  setupWindow.classList.remove('hidden');

  // Добавление обработки событий, закрывающих окно настроек персонажа
  setupCloseButton.addEventListener('click', onSetupClose);
  setupCloseButton.addEventListener('keydown', onSetupCloseEnterPress);
  document.addEventListener('keydown', onDocumentEscPress);
};

// Функция закрытия окна настроек персонажа
var onSetupClose = function () {
  setupWindow.classList.add('hidden');

  // Удаление обработки событий, закрывающих окно настроек персонажа
  setupCloseButton.removeEventListener('click', onSetupClose);
  document.removeEventListener('keydown', onDocumentEscPress);
  setupCloseButton.removeEventListener('keydown', onSetupCloseEnterPress);

  // Возвращение окна на его первоначальное место
  setupWindow.style.top = setupWindowCoords.x;
  setupWindow.style.left = setupWindowCoords.y;
};


// Функции обработки нажатий на клавиатуру
var onSetupOpenEnterPress = function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    onSetupOpen();
  }
};

var onDocumentEscPress = function (evt) {
  if (evt.keyCode === keyCodes.ESC && evt.target !== setupNameInput) {
    onSetupClose();
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    onSetupClose();
  }
};

// Добавление обработки событий, открывающих окно настроек персонажа
setupOpenButton.addEventListener('click', onSetupOpen);
setupOpenButton.addEventListener('keydown', onSetupOpenEnterPress);

// Настройка внешнего вида персонажа
var playerSetup = setupWindow.querySelector('.setup-player');
var playerEyesColor = playerSetup.querySelector('.wizard-eyes');
var playerCoatColor = playerSetup.querySelector('.wizard-coat');
var playerFireballColor = playerSetup.querySelector('.setup-fireball');

var changeWizardsPartColor = function (evt, colorsArray, property, name) {
  var color = getRamdomValueFromArray(colorsArray);
  evt.currentTarget.setAttribute('style', property + ':' + color + ';');
  playerSetup.querySelector('input[name=' + name + ']').value = color;
};

// Обработа кликов на волшебнике пользователя и изменение цвета глаз, цвета плаща и цвета фаербола
playerEyesColor.addEventListener('click', function (evt) {
  changeWizardsPartColor(evt, EYES_COLORS_LIST, 'fill', 'eyes-color');
});

playerCoatColor.addEventListener('click', function (evt) {
  changeWizardsPartColor(evt, COATS_COLORS_LIST, 'fill', 'coat-color');
});

playerFireballColor.addEventListener('click', function (evt) {
  changeWizardsPartColor(evt, FIREBALL_COLOR_LIST, 'background-color', 'fireball-color');
});

// Перетаскивание окна персонажа

var setupAvatar = setupWindow.querySelector('.upload');

var dragElement = function (evt, element) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    element.style.top = (element.offsetTop - shift.y) + 'px';
    element.style.left = (element.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (preventEvt) {
        preventEvt.preventDefault();
        setupAvatar.removeEventListener('click', onClickPreventDefault);
      };
      setupAvatar.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

};

setupAvatar.addEventListener('mousedown', function (evt) {
  dragElement(evt, setupWindow);
});
