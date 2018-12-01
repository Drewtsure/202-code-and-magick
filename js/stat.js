'use strict';

// Параметры гистограммы
var HYST_HEIGHT = 150;
var HYST_X_START = 200;
var HYST_Y_START = 65;
var TITLE_X_OFFSET = 250;
var TITLE_Y_OFFSET = 60;
var LINES_HEIGHT = 20;
var TIMES_OFFSET = 40;
var NAMES_OFFSET = 35;
var COL_OFFSET = 45;
var COL_WIDTH = 40;
var COL_GAP = 50;
var TITLE_TEXT = ['Ура вы победили!', 'Список результатов:'];
var USER_NAME = 'Вы';
var USER_COLOR = 'rgba(255, 0, 0, 1)';

var createStatisticCloud = function (ctx, cloudFill, startX, startY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(startX - 40, startY - 40, startX, startY - 100);
  ctx.quadraticCurveTo(startX - 20, startY - 200, startX + 100, startY - 200);
  ctx.quadraticCurveTo(startX + 200, startY - 280, startX + 280, startY - 190);
  ctx.quadraticCurveTo(startX + 400, startY - 220, startX + 380, startY - 120);
  ctx.quadraticCurveTo(startX + 440, startY + 10, startX + 340, startY + 20);
  ctx.quadraticCurveTo(startX + 75, startY + 50, startX, startY);
  ctx.fillStyle = cloudFill;
  ctx.fill();
};

var createLinesForStatisticCloud = function (ctx, strokesColor, startX, startY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(startX - 40, startY - 40, startX, startY - 100);
  ctx.lineTo(startX + 20, startY - 130);
  ctx.lineTo(startX, startY - 100);
  ctx.quadraticCurveTo(startX - 20, startY - 200, startX + 100, startY - 200);
  ctx.lineTo(startX + 140, startY - 200);
  ctx.lineTo(startX + 100, startY - 200);
  ctx.quadraticCurveTo(startX + 200, startY - 280, startX + 280, startY - 190);
  ctx.lineTo(startX + 310, startY - 160);
  ctx.lineTo(startX + 280, startY - 190);
  ctx.quadraticCurveTo(startX + 400, startY - 220, startX + 380, startY - 120);
  ctx.lineTo(startX + 370, startY - 90);
  ctx.lineTo(startX + 380, startY - 120);
  ctx.quadraticCurveTo(startX + 440, startY + 10, startX + 340, startY + 20);
  ctx.quadraticCurveTo(startX + 75, startY + 50, startX, startY);
  ctx.fillStyle = strokesColor;
  ctx.stroke();
};

var getMaxValueFromArray = function (array) {
  var maxValue = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

var getRamdomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getColumnColor = function (name) {
  return name === USER_NAME ? USER_COLOR : 'rgba(0, 0, 255,' + getRamdomValue(10, 100) / 100 + ')';
};

window.renderStatistics = function (ctx, names, times) {
  // Отрисовка облачка
  createStatisticCloud(ctx, 'rgba(0, 0, 0, 0.7)', 160, 250);
  createStatisticCloud(ctx, '#fff', 150, 240);
  createLinesForStatisticCloud(ctx, '#fff', 150, 240);

  // Заголовок над облаком
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  for (var j = 0; j < TITLE_TEXT.length; j++) {
    ctx.fillText(TITLE_TEXT[j], TITLE_X_OFFSET, TITLE_Y_OFFSET + j * LINES_HEIGHT);
  }

  // Результаты игры
  var maxResult = getMaxValueFromArray(times);
  for (var i = 0; i < times.length; i++) {

    var proportionalHeight = times[i] / maxResult * HYST_HEIGHT;

    // Координаты начала колонки гистограммы
    var colXStart = HYST_X_START + (COL_GAP + COL_WIDTH) * i;
    var colYStart = HYST_Y_START + (HYST_HEIGHT - proportionalHeight);

    // Отрисовка колонки
    ctx.fillStyle = getColumnColor(names[i]);
    ctx.fillRect(colXStart, colYStart + COL_OFFSET, COL_WIDTH, HYST_Y_START + proportionalHeight - 2 * COL_OFFSET);

    // Подписи к колонке
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i] / 100) / 10 + ' c', colXStart, colYStart + TIMES_OFFSET);
    ctx.fillText(names[i], colXStart, HYST_Y_START + HYST_HEIGHT + NAMES_OFFSET);
  }

};
