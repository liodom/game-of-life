import "./App.css";
import { useState } from "react";
import Cell from "./Cell";
import { ALIVE, DEAD } from "./status";
// import { initialLife as lifeSeed } from "./initialLife.js";
import raw from "raw.macro";

function App() {
  // const initialLife = { ...lifeSeed };
  // const initialLife = {
  //   generation: 3,
  //   grid: [
  //     [".", ".", ".", ".", ".", ".", ".", "."],
  //     [".", ".", ".", ".", "*", ".", ".", "."],
  //     [".", ".", ".", "*", "*", ".", ".", "."],
  //     [".", ".", ".", ".", ".", ".", ".", "."],
  //   ],
  // };
  const initialLife = {
    generation: 3,
    grid: [
      [".", "*", ".", ".", ".", ".", ".", "."],
      ["*", "*", "*", ".", "*", "*", "*", "*"],
      [".", "*", ".", "*", ".", ".", "*", "*"],
      [".", "*", ".", "*", ".", ".", "*", "."],
    ],
  };

  const [life, setLife] = useState(initialLife);

  const printRawData = () => {
    const content = raw("./gameOfLifeConfig.txt");
    // console.log("raw content => ", content);
  };

  const displayGrid = () => {
    return life.grid.map((row) => (
      // row
      <div key={Math.random(9) * 123} className="row">
        {row.map((singleCell) => {
          if (singleCell === ALIVE) {
            return <Cell status={ALIVE} key={Math.random(9) * 123} />;
          }
          return <Cell status={DEAD} key={Math.random(9) * 123} />;
        })}
        <br />
      </div>
    ));
  };

  const startLife = () => {
    printRawData();
    const { grid } = life;
    const newGrid = [...grid];
    const rowLength = grid.length;
    const columnLength = grid[0].length;

    let tempStatus = undefined;

    let output = [];

    for (let i = 0; i < rowLength; i++) {
      let tempRow = [];
      for (let j = 0; j < columnLength; j++) {
        console.log("\n\n[i, j] => ", i, j);

        tempStatus = matrixProcessor(newGrid, i, j);
        console.log("[i, j] UPDATED => ", matrixProcessor(newGrid, i, j));
        tempRow.push(tempStatus);
      }
      output.push(tempRow);
    }

    console.log("newGrid UPDATED => ", output);

    const newLife = {
      ...life,
      grid: output,
      generation: life.generation + 1,
    };
    setLife(newLife);
  };

  const resetLife = () => {
    setLife(initialLife);
  };

  // --------------- liveCellChecker Function ----------------
  const liveCellChecker = (matrix, rowLength, columnLength, cellX, cellY) => {
    const newMatrix = [...matrix];
    const newMatrixRowLength = rowLength;
    const newMatrixColumnLength = columnLength;

    const v = cellX;
    const w = cellY;

    let counter = 0;

    for (let k = 0; k < newMatrixRowLength; k++) {
      for (let l = 0; l < newMatrixColumnLength; l++) {
        if (k === v && l === w) {
          // skip the cell
          continue;
        }
        if (newMatrix[k][l] === ALIVE) {
          counter++;
        }
      }
    }

    return counter;
  };

  // ------------------ matrixProcessor Function -----------------
  const matrixProcessor = (matrix, posX, posY) => {
    // const [i, j] = cellPosition;
    const i = posX;
    const j = posY;
    const testMatrix = [...matrix];
    let dummyMatrix = [
      ["$", "$", "$"],
      ["$", "$", "$"],
      ["$", "$", "$"],
    ];
    let newMatrix = [];
    let testCellPosition = [];

    for (let x = 0; x <= 2; x++) {
      for (let z = 0; z <= 2; z++) {
        if (
          i - 1 + x >= 0 &&
          i - 1 + x < testMatrix.length &&
          j - 1 + z >= 0 &&
          j - 1 + z < testMatrix[0].length
        ) {
          dummyMatrix[x][z] = testMatrix[i - 1 + x][j - 1 + z];
        }
      }
    }

    // Dummy index constants
    const firstDummyRowIndex = 0;
    const lastDummyRowIndex = dummyMatrix.length - 1;
    const firstDummyColumnIndex = 0;
    const lastDummyColumnIndex = dummyMatrix[0].length - 1;

    // find newMatrix column and row Lengths
    // A [[ $, $, $ ],[ *, *, * ],[ *, *, * ]]
    if (
      dummyMatrix[firstDummyRowIndex][firstDummyColumnIndex] === "$" &&
      dummyMatrix[firstDummyRowIndex][lastDummyColumnIndex] === "$"
    ) {
      // B [[ *, *, $ ],[ *, *, $ ],[ *, *, $ ]]
      if (
        dummyMatrix[firstDummyRowIndex][lastDummyColumnIndex] === "$" &&
        dummyMatrix[lastDummyRowIndex][lastDummyColumnIndex] === "$"
      ) {
        newMatrix.push([dummyMatrix[1][0], dummyMatrix[1][1]]);
        newMatrix.push([dummyMatrix[2][0], dummyMatrix[2][1]]);
        testCellPosition = [0, 1];
      }
      // D [[ $, *, * ],[ $, *, * ],[ $, *, * ]]
      else if (
        dummyMatrix[firstDummyRowIndex][firstDummyColumnIndex] === "$" &&
        dummyMatrix[lastDummyRowIndex][firstDummyColumnIndex] === "$"
      ) {
        newMatrix.push([dummyMatrix[1][1], dummyMatrix[1][2]]);
        newMatrix.push([dummyMatrix[2][1], dummyMatrix[2][2]]);
        testCellPosition = [0, 0];
      }
      // A [[ $, $, $ ],[ *, *, * ],[ *, *, * ]]
      else {
        newMatrix.push([...dummyMatrix[1]]);
        newMatrix.push([...dummyMatrix[2]]);
        testCellPosition = [0, 1];
      }
    }

    // C [[ *, *, * ],[ *, *, * ],[ $, $, $ ]]
    else if (
      dummyMatrix[lastDummyRowIndex][firstDummyColumnIndex] === "$" &&
      dummyMatrix[lastDummyRowIndex][lastDummyColumnIndex] === "$"
    ) {
      // D [[ $, *, * ],[ $, *, * ],[ $, *, * ]]
      if (
        dummyMatrix[firstDummyRowIndex][firstDummyColumnIndex] === "$" &&
        dummyMatrix[lastDummyRowIndex][firstDummyColumnIndex] === "$"
      ) {
        newMatrix.push([dummyMatrix[0][1], dummyMatrix[0][2]]);
        newMatrix.push([dummyMatrix[1][1], dummyMatrix[1][2]]);
        testCellPosition = [1, 0];
      }
      // B [[ *, *, $ ],[ *, *, $ ],[ *, *, $ ]]
      else if (
        dummyMatrix[firstDummyRowIndex][lastDummyColumnIndex] === "$" &&
        dummyMatrix[lastDummyRowIndex][lastDummyColumnIndex] === "$"
      ) {
        newMatrix.push([dummyMatrix[0][0], dummyMatrix[0][1]]);
        newMatrix.push([dummyMatrix[1][0], dummyMatrix[1][1]]);
        testCellPosition = [1, 1];
      }

      // C [[ *, *, * ],[ *, *, * ],[ $, $, $ ]]
      else {
        newMatrix.push([...dummyMatrix[0]]);
        newMatrix.push([...dummyMatrix[1]]);
        testCellPosition = [1, 1];
      }
    }

    // D [[ $, *, * ],[ $, *, * ],[ $, *, * ]]
    else if (
      dummyMatrix[firstDummyRowIndex][firstDummyColumnIndex] === "$" &&
      dummyMatrix[lastDummyRowIndex][firstDummyColumnIndex] === "$"
    ) {
      newMatrix.push([dummyMatrix[0][1], dummyMatrix[0][2]]);
      newMatrix.push([dummyMatrix[1][1], dummyMatrix[1][2]]);
      newMatrix.push([dummyMatrix[2][1], dummyMatrix[2][2]]);
      testCellPosition = [1, 0];
    }

    // B [[ *, *, $ ],[ *, *, $ ],[ *, *, $ ]]
    else if (
      dummyMatrix[firstDummyRowIndex][lastDummyColumnIndex] === "$" &&
      dummyMatrix[lastDummyRowIndex][lastDummyColumnIndex] === "$"
    ) {
      newMatrix.push([dummyMatrix[0][0], dummyMatrix[0][1]]);
      newMatrix.push([dummyMatrix[1][0], dummyMatrix[1][1]]);
      newMatrix.push([dummyMatrix[2][0], dummyMatrix[2][1]]);
      testCellPosition = [1, 1];
    } // [[ *, *, * ], [ *, *, * ], [ *, *, * ]]
    else {
      newMatrix = dummyMatrix;
      testCellPosition = [1, 1];
    }

    // check Cell Status
    let cellStatus = undefined;
    const [v, w] = testCellPosition;
    const newMatrixRowLength = newMatrix.length;
    const newMatrixColumnLength = newMatrix[0].length;

    if (newMatrix[v][w] === DEAD) {
      if (newMatrixRowLength < 3) {
        if (newMatrixColumnLength < 3) {
          let aliveCounter = liveCellChecker(
            newMatrix,
            newMatrixRowLength,
            newMatrixColumnLength,
            v,
            w
          );

          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        } else if (newMatrixColumnLength === 3) {
          let aliveCounter = liveCellChecker(
            newMatrix,
            newMatrixRowLength,
            newMatrixColumnLength,
            v,
            w
          );

          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        }
      } else if (newMatrixRowLength === 3) {
        if (newMatrixColumnLength < 3) {
          let aliveCounter = liveCellChecker(
            newMatrix,
            newMatrixRowLength,
            newMatrixColumnLength,
            v,
            w
          );

          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        } else if (newMatrixColumnLength === 3) {
          let aliveCounter = liveCellChecker(
            newMatrix,
            newMatrixRowLength,
            newMatrixColumnLength,
            v,
            w
          );

          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        }
      }

      // setLife(newLife)
    } else if (newMatrix[v][w] === ALIVE) {
      if (newMatrixRowLength < 3) {
        if (newMatrixColumnLength < 3) {
          let aliveCounter = liveCellChecker(
            newMatrix,
            newMatrixRowLength,
            newMatrixColumnLength,
            v,
            w
          );
          if (aliveCounter < 2) {
            cellStatus = DEAD;
          } else if (aliveCounter === 2 || aliveCounter === 3) {
            cellStatus = ALIVE;
          } else if (aliveCounter > 3) {
            cellStatus = DEAD;
          }
        } else if (newMatrixColumnLength === 3) {
          let aliveCounter = liveCellChecker(
            newMatrix,
            newMatrixRowLength,
            newMatrixColumnLength,
            v,
            w
          );
          if (aliveCounter < 2) {
            cellStatus = DEAD;
          } else if (aliveCounter === 2 || aliveCounter === 3) {
            cellStatus = ALIVE;
          } else if (aliveCounter > 3) {
            cellStatus = DEAD;
          }
        }
      } else if (newMatrixRowLength === 3 && newMatrixRowLength === 3) {
        let aliveCounter = liveCellChecker(
          newMatrix,
          newMatrixRowLength,
          newMatrixColumnLength,
          v,
          w
        );
        if (aliveCounter < 2) {
          cellStatus = DEAD;
        } else if (aliveCounter === 2 || aliveCounter === 3) {
          cellStatus = ALIVE;
        } else if (aliveCounter > 3) {
          cellStatus = DEAD;
        }
      }
    }
    return cellStatus;
  };

  console.log("life newMatrix => ", life.grid);

  return (
    <div className="App ">
      <div className="fluid">
        <div className="game-container">
          {" "}
          <div>
            Generation: <code>{life.generation}</code>
          </div>
          <span>{life.grid.length} &nbsp; &nbsp;</span>
          <span>{life.grid[0].length}</span>
          {displayGrid()}
          <br />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <button onClick={() => startLife()}>Start</button>
          <button onClick={() => resetLife()}>Reset</button>
        </div>
      </div>
      {/* <div className="legend">
        <div className="cell-legend left">
          <Cell status={ALIVE}>LIVE CELL</Cell>
        </div>
        <br />
        <div className="cell-legend right">
          <Cell status={DEAD}>DEAD CELL </Cell>
        </div>
      </div> */}
    </div>
  );
}

export default App;
