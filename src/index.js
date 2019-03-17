module.exports = function solveSudoku(matrix) {

  // replace 0 in matrix by [1, 2, 3, 4, 5, 6, 7, 8, 9]
  //  Numbers in array mean the possible number that can be
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  // test №3 hasn't solution, so (while (true)) replace with (while(e > 1))
  let e = 50
  while (e > 1) {
    e --;
    let amountOfUnknowns = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {

        if (typeof (matrix[i][j]) === 'object') {
          amountOfUnknowns++;

          // Exclude numbers from the array which are in the string, column and box3x3
          deleteСoincidences(matrix[i][j], matrix[i]);
          deleteСoincidences(matrix[i][j], getMatrixColumn(matrix, j));
          deleteСoincidences(matrix[i][j], getMatrixBox(matrix, i, j));
          

          // If only one unknown has potential value, then leave only this value
          checkPotentials(matrix[i][j], matrix[i]);
          checkPotentials(matrix[i][j], getMatrixColumn(matrix, j));
          checkPotentials(matrix[i][j], getMatrixBox(matrix, i, j));
          
          if (matrix[i][j].length === 1) {
            matrix[i][j] = matrix[i][j][0];
          }
        }
      }
    }

    if (amountOfUnknowns === 0) break;
  }

  return matrix;

  // functions
  function getMatrixColumn(matrix, column) {
    return matrix.map((item) => item[column])
  }

  function getMatrixBox(matrix, i, j) {
    let x = Math.floor(i / 3) * 3;
    let y = Math.floor(j / 3) * 3;
    let box = [];

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        box.push(matrix[i][j]);
      }
    }

    return box;
  }

  function deleteСoincidences(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) !== -1) {
        arr1.splice(i, 1);
        i--;
      }
    }
  }

  function checkPotentials(arr1, arr2) {
    let allPotentials = [];

    arr2.forEach((item) => {
      if (typeof (item) === 'object') {
        allPotentials = allPotentials.concat(item);
      }
    });

    for (let k = 0; k < arr1.length; k++)
      if (getAmountOfNumber(allPotentials, arr1[k]) === 1) {
        arr1[0] = arr1[k];
        arr1.length = 1;
        return;
      }

    function getAmountOfNumber(arr, number) {
      return arr.filter((item) => number === item).length
    }
  }
}
