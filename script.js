"use strict";
const Player = (mark) => {
  return mark;
};

const gameController = (() => {
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const playerX = Player("X");
  const playerO = Player("O");
  let currentTurn = playerX;

  const changeTurn = () => {
    if (currentTurn === playerX) {
      currentTurn = playerO;
    } else {
      currentTurn = playerX;
    }
    return currentTurn;
  };
  const endGame = () => {
    document.querySelector(".end-game").style.display = "flex";
    document
      .querySelector(".end-game button")
      .addEventListener("click", startGame);
  };
  const declareResult = (result) => {
    document.querySelector(".end-game .text").innerText = result;
  };

  const startGame = () => {
    document.querySelector(".end-game").style.display = "none";
    displayController.cellElements.forEach((cell) => {
      cell.innerText = "";
      cell.removeEventListener("click", displayController.handleClick);
      cell.addEventListener("click", displayController.handleClick, false);
    });
  };

  const checkWin = (currentPlayer) => {
    return WINNING_COMBOS.some((combination) => {
      return combination.every(
        (index) =>
          displayController.cellElements[index].innerText === currentPlayer
      );
    });
  };

  const checkDraw = () => {
    return (
      // return [] if every cell is filled
      Array.from(displayController.cellElements).filter(
        (cell) => cell.innerText === ""
      ).length < 1
    );
  };
  return { startGame, checkWin, checkDraw, changeTurn, endGame, declareResult };
})();

const displayController = (() => {
  const cellElements = document.querySelectorAll(".cell");
  const { checkWin, checkDraw, endGame, declareResult, changeTurn } =
    gameController;
  cellElements.forEach((cell) =>
    cell.addEventListener("click", handleClick, false)
  );

  function handleClick(e) {
    //changeTurn() return new current turn
    const currentTurn = changeTurn();
    e.target.innerText = currentTurn;
    if (checkWin(currentTurn)) {
      endGame();
      declareResult(`player ${currentTurn} wins!`);
    } else if (checkDraw()) {
      endGame();
      declareResult("Game Draw");
    }
  }
  return { cellElements, handleClick };
})();
