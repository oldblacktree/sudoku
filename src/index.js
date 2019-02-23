// функции
//  удаляет из arr1 совпадения с arr2
function deleteСoincidences(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) !== -1) {
      arr1.splice(i, 1);
      i--;
    }
  }
}

// проверяет массив массивов на количесво нахождений в них потенциального числа, если число одно, возвразает true
function checkPotentials(arr, number) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (typeof (arr[i]) === 'object') {
      newArr = newArr.concat(arr[i]);
    }
  }
  let valueOfNumbers = newArr.filter(function (item) {
    return item === number;
  })
  if (valueOfNumbers.length === 1) {
    return true;
  }
}


module.exports = function solveSudoku(matrix) {
  //вместо 0 записали в матрицу массивы с возможными значениями(1-9)
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  //запускаем цикл который будет обходить матрицу
  while ( true) {
    let numberUnknown = 0
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        //тело цикла

        // выбирает unknowns
        if (typeof (matrix[i][j]) === 'object') {
          numberUnknown++;

          //eсли в строке матрицы есть число совпадающее с вероятностным числом, то вычеркиваем его из таковых
          deleteСoincidences(matrix[i][j], matrix[i]);

          //ecли в столбце матрицы есть число совпадающее с вероятностным числом, то вычеркиваем его из таковых
          //преобразуем столюец в строку
          let column = [
            matrix[0][j],
            matrix[1][j],
            matrix[2][j],
            matrix[3][j],
            matrix[4][j],
            matrix[5][j],
            matrix[6][j],
            matrix[7][j],
            matrix[8][j]
          ];
          deleteСoincidences(matrix[i][j], column);

          //ecли в боксе3х3 матрицы есть число совпадающее с вероятностным числом, то вычеркиваем его из таковых
          // x,y - координаты верхнего левого угла бокса3х3 к которрому относится неизвестная
          // box - 
          let x = Math.floor(i / 3) * 3;
          let y = Math.floor(j / 3) * 3;
          let box = [
            matrix[x][y], matrix[x][y + 1], matrix[x][y + 2],
            matrix[x + 1][y], matrix[x + 1][y + 1], matrix[x + 1][y + 2],
            matrix[x + 2][y], matrix[x + 2][y + 1], matrix[x + 2][y + 2]
          ];
          deleteСoincidences(matrix[i][j], box);

          //если среди потенциальных значений неизвестных всего ряда есть только 1 совпадение, то записываем его в матрицу
          for (let h = 0; h < matrix[i][j].length; h++) {
            if (checkPotentials(matrix[i], matrix[i][j][h])) {
              matrix[i][j] = matrix[i][j][h];
            }
          }

          // если среди  потенциальных значений неизвестных всей колонки есть только 1 совпадение, то записываем его в матрицу
          for (let h = 0; h < matrix[i][j].length; h++) {
            if (checkPotentials(column, matrix[i][j][h])) {
              matrix[i][j] = matrix[i][j][h];
            }
          }

          // если среди потенциальных значений неизвестных бокса3х3 есть только 1 совпадение, то записываем его в матрицу
          for (let h = 0; h < matrix[i].length; h++) {
            if (checkPotentials(box, matrix[i][j][h])) {
              matrix[i][j] = matrix[i][j][h];
            }
          }

        };

        // конец тела цикла
      }
    }
    if (numberUnknown === 0) {
      break;
    }
  }




  
  return matrix;
};
