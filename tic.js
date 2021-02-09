//declaring js constant of dom
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn;
const WINNING_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];


//chapter of functions and conditions

//start game on load
//click handler
//checking

startGame();

//restart button also begin the startGame() function
restartButton.addEventListener('click',startGame);

//declaring functions
function startGame(){
  circleTurn = false;
  cellElements.forEach(cell =>{
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once: true});
  });
  winningMessageElement.classList.remove('show');
}

//onclick handler function declaration
function handleClick(e){
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //placing x or o in a single cell
  placeMark(cell, currentClass);
  //swapTurn on condition after checking win or not
  if(checkWin(currentClass)){
    endGame(false);
  }
  else if(drawCheck()){
    endGame(true);
  }
  else{
    swapTurns();
  }
}

//initialization of placemark() function
function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

//initialization of swapTurns() function
function swapTurns(){
  circleTurn = !circleTurn;
}

//initialization of checkWin() function
function checkWin(currentClass){
  return WINNING_COMBINATIONS.some(combination=>{
    return combination.every(index=>{
      return cellElements[index].classList.contains(currentClass);
    })
  })
}

//initialization of endGame() class
function endGame(draw){
if(draw){
  winningMessageTextElement.innerHTML = 'Draw';
} else{
  winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} wins`;
}
winningMessageElement.classList.add('show');
}


//initialization of drawCheck() function
function drawCheck(){
  return [...cellElements].every(cell=>{
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}