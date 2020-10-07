const grid = document.querySelector('.ttt-grid tbody');
let gridSquares;
let gridRows;
const width = 3;
const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
let turns = width * width;

const nextTurn = () => {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

const createGrid = (width) => {
  for(let i = 0; i < width; i +=1) {
      grid.insertAdjacentHTML('beforeend', `<tr class="border" id=${i}></tr>`);
      gridRows = document.querySelectorAll('tr');
    for(let j = 0; j < width; j +=1) {
      gridRows[i].insertAdjacentHTML('beforeend', `<td id=${i}${j} class="border available text-center"></td>`);
    }
  }
  gridSquares = document.querySelectorAll('td');
}

createGrid(width);

const checkWin = (currentSquare) => {
  const id = Number.parseInt(currentSquare.parentElement.id, 10);
  gridRows[id].querySelectorAll('td').forEach((square) => {
    console.log(square.innerText);
  });
  if (id + 1 < width)
    gridRows[id + 1].querySelectorAll('td').forEach((square) => {
    console.log(square.innerText);
  });
  if (id + 2 < width)
    gridRows[id + 1].querySelectorAll('td').forEach((square) => {
    console.log(square.innerText);
  });
  if (id - 1 >= 0)
    gridRows[id - 1].querySelectorAll('td').forEach((square) => {
    console.log(square.innerText);
  });
  if (id - 2 >= 0)
    gridRows[id - 2].querySelectorAll('td').forEach((square) => {
    console.log(square.innerText);
  });

  // checkRow(a, b, c)
};

gridSquares.forEach((square) => {
  square.addEventListener('click', (event) => {
    if (turns > 0 && square.classList.contains('available')) {
      event.currentTarget.innerHTML = currentPlayer;
      event.currentTarget.classList.remove('available');
      nextTurn();
      turns -= 1;
      checkWin(event.currentTarget);
    } else {
      return;
    }

  });
});

// console.log(gridRows[0].querySelectorAll('td').innerText === 'X');
