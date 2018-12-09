'use strict';

var WIZARDS_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QUANTITY = 4;

var getRamdomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

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
var similarWizards = setupWindow.querySelector('.setup-similar');

// Создание массива волшебников и фрагмента для вставки в DOM
var wizardsList = createWizardsList(WIZARDS_QUANTITY);
var wizardsFragment = createWizardsFragment(wizardsList);
similarWizards.querySelector('.setup-similar-list').appendChild(wizardsFragment);

// Показ окон
setupWindow.classList.remove('hidden');
similarWizards.classList.remove('hidden');
