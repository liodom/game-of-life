import "./App.css";
import { useState } from "react";
import Cell from "./Cell";
import { ALIVE, DEAD } from "./status";
// import { initialLife } from "./initialLife.js";
import raw from "raw.macro";

function App() {
  // const initialLife = {
  //   generation: 3,
  //   grid: [
  //     [".", ".", ".", ".", ".", ".", ".", "."],
  //     [".", ".", "*", ".", "*", ".", ".", "."],
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
    renderGrid(); // to delete ???
    printRawData();
  };
  const resetLife = () => {
    setLife(initialLife);
  };

  // const checkCellNeighbours = (cellPosition, grid) => {
  //   const [i, j] = cellPosition;
  //   const testGrid = [...grid];
  //   const rowLength = testGrid.length;
  //   const columnLength = testGrid[0].length;
  //   let cellFutureStatus = DEAD;

  //   let liveCellNeighbours = 0;

  //   for (let x = i - 1; x <= i + 1; x++) {
  //     if (x >= 0 && x < rowLength) {
  //       for (let z = j - 1; z <= j + 1; z++) {
  //         if (z >= 0 && z < columnLength) {
  //           if (x === i && z === j) {
  //             continue;
  //           } else {
  //             console.log("[x, z] => ", x, z);
  //             if (testGrid[x][z] === ALIVE) {
  //               liveCellNeighbours++;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   if (testGrid[i][j] === ALIVE) {
  //     if (liveCellNeighbours < 2) {
  //       cellFutureStatus = DEAD;
  //     } else if (liveCellNeighbours > 3) {
  //       cellFutureStatus = DEAD;
  //     } else if (liveCellNeighbours === 2 || liveCellNeighbours === 3) {
  //       cellFutureStatus = ALIVE;
  //     }
  //   } else if (testGrid[i][j] === DEAD) {
  //     if (liveCellNeighbours === 3) {
  //       cellFutureStatus = ALIVE;
  //     }
  //   }

  //   return cellFutureStatus;
  // };

  const renderGrid = () => {
    const { grid } = life;
    const newGrid = [...grid];
    const rowLength = grid.length;
    const columnLength = grid[0].length;

    // let content;

    for (let i = 0; i < rowLength; i++) {
      for (let j = 0; j < columnLength; j++) {
        console.log("\n\n[i, j] => ", i, j);

        newGrid[i][j] = testFunction(newGrid, [`${i}`, `${j}`]);
        //  content = newGrid[i][j];
        //  console.log("content => ", i, j, content);
      }
    }

    console.log("newGrid => ", newGrid);

    // const newLife = {
    //   ...life,
    //   grid: newGrid,
    //   generation: life.generation + 1,
    // };
    // console.log("grid => ", grid);
    // console.log("newGrid => ", newLife.grid);
    // console.log("newLife => ", newLife);
    // setLife(newLife);
  };

  // console.log("THIS IS THE NEW GRID => ", life.grid);

  // ----------------------- TEST FUNCTION ---------------
  const testFunction = (matrix, cellPosition) => {
    const [i, j] = cellPosition;
    const testMatrix = [...matrix];
    let dummyMatrix = [
      ["$", "$", "$"],
      ["$", "$", "$"],
      ["$", "$", "$"],
    ];
    // let newMatrixRowLength = 3;
    // let newMatrixColumnLength = 3;
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
        // newMatrixRowLength = 2
        // newMatrixColumnLength = 2
        newMatrix.push([dummyMatrix[1][0], dummyMatrix[1][1]]);
        newMatrix.push([dummyMatrix[2][0], dummyMatrix[2][1]]);
        testCellPosition = [0, 1];
      }
      // D [[ $, *, * ],[ $, *, * ],[ $, *, * ]]
      else if (
        dummyMatrix[firstDummyRowIndex][firstDummyColumnIndex] === "$" &&
        dummyMatrix[lastDummyRowIndex][firstDummyColumnIndex] === "$"
      ) {
        // newMatrixRowLength = 2
        // newMatrixColumnLength = 2
        newMatrix.push([dummyMatrix[1][1], dummyMatrix[1][2]]);
        newMatrix.push([dummyMatrix[2][1], dummyMatrix[2][2]]);
        testCellPosition = [0, 0];
      }
      // A [[ $, $, $ ],[ *, *, * ],[ *, *, * ]]
      else {
        // newMatrixRowLength = 2;
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
        // newMatrixRowLength = 2;
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

    // console.log("newMatrixRowLength => ", newMatrixRowLength);
    // console.log("newMatrixColumnLength => ", newMatrixColumnLength);

    if (newMatrix[v][w] === DEAD) {
      if (newMatrixRowLength < 3) {
        if (newMatrixColumnLength < 3) {
          // newMatrixRowLength = 2
          // newMatrixColumnLength = 2
          let aliveCounter = 0;
          console.log("aliveCounter ??? => ", aliveCounter);

          for (let i = 0; i < newMatrixRowLength; i++) {
            for (let j = 0; j < newMatrixColumnLength; j++) {
              if (i === v && j === w) {
                // skip the cell
                continue;
              }
              if (newMatrix[i][j] === ALIVE) {
                aliveCounter++;
              }
            }
          }
          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        } else if (newMatrixColumnLength === 3) {
          let aliveCounter = 0;

          for (let i = 0; i < newMatrixRowLength; i++) {
            for (let j = 0; j < newMatrixColumnLength; j++) {
              if (i === v && j === w) {
                // skip the cell
                continue;
              }
              if (newMatrix[i][j] === ALIVE) {
                aliveCounter++;
              }
            }
          }
          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        }
      } else if (newMatrixRowLength === 3) {
        if (newMatrixColumnLength < 3) {
          let aliveCounter = 0;
          // let miniMatrix = [];

          for (let i = 0; i < newMatrixRowLength; i++) {
            for (let j = 0; j < newMatrixColumnLength; j++) {
              if (i === v && j === w) {
                // skip the cell
                continue;
              }
              if (newMatrix[i][j] === ALIVE) {
                aliveCounter++;
              }
            }
          }

          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        } else if (newMatrixColumnLength === 3) {
          let aliveCounter = 0;
          // let miniMatrix = [];

          for (let i = 0; i < newMatrixRowLength; i++) {
            for (let j = 0; j < newMatrixColumnLength; j++) {
              if (i === v && j === w) {
                // skip the cell
                continue;
              }
              if (newMatrix[i][j] === ALIVE) {
                aliveCounter++;
              }
            }
          }

          if (aliveCounter === 3) {
            cellStatus = ALIVE;
          } else {
            cellStatus = DEAD;
          }
        }
      }
      // const newLife = {
      //   ...life,
      //   grid: testMatrix,
      //   generation: life.generation + 1
      // }

      // setLife(newLife)
    } else if (newMatrix[v][w] === ALIVE) {
      if (newMatrixRowLength < 3) {
        if (newMatrixColumnLength < 3) {
          let aliveCounter = 0;

          for (let i = 0; i < newMatrixRowLength; i++) {
            for (let j = 0; j < newMatrixColumnLength; j++) {
              if (i === v && j === w) {
                // skip the cell
                continue;
              }
              if (newMatrix[i][j] === ALIVE) {
                aliveCounter++;
              }
            }
            if (aliveCounter < 2) {
              cellStatus = DEAD;
            } else if (aliveCounter === 2 || aliveCounter === 3) {
              cellStatus = ALIVE;
            } else if (aliveCounter > 3) {
              cellStatus = DEAD;
            }
          }
        } else if (newMatrixColumnLength === 3) {
          let aliveCounter = 0;

          for (let i = 0; i < newMatrixRowLength; i++) {
            for (let j = 0; j < newMatrixColumnLength; j++) {
              if (i === v && j === w) {
                // skip the cell
                continue;
              }
              if (newMatrix[i][j] === ALIVE) {
                aliveCounter++;
              }
            }
            if (aliveCounter < 2) {
              cellStatus = DEAD;
            } else if (aliveCounter === 2 || aliveCounter === 3) {
              cellStatus = ALIVE;
            } else if (aliveCounter > 3) {
              cellStatus = DEAD;
            }
          }
        }
      } else if (newMatrixRowLength === 3 && newMatrixRowLength === 3) {
        let aliveCounter = 0;

        for (let i = 0; i < newMatrixRowLength; i++) {
          for (let j = 0; j < newMatrixColumnLength; j++) {
            if (i === v && j === w) {
              // skip the cell
              continue;
            }
            if (newMatrix[i][j] === ALIVE) {
              aliveCounter++;
            }
          }
          if (aliveCounter < 2) {
            cellStatus = DEAD;
          } else if (aliveCounter === 2 || aliveCounter === 3) {
            cellStatus = ALIVE;
          } else if (aliveCounter > 3) {
            cellStatus = DEAD;
          }
        }
      }
    }

    console.log("\n\n[i, j] => ", i, j, testMatrix[i][j]);
    console.log("dummyMatrix => ", dummyMatrix);
    console.log("newMatrix => ", newMatrix);
    console.log("testCellPosition => ", testCellPosition);
    console.log("CELL STATUS => ", cellStatus);
    console.log("the new matrix is => ", life.grid);

    // return cellStatus;
  };

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
          {testFunction(life.grid, [1, 0])}
          {testFunction(life.grid, [1, 1])}
          {testFunction(life.grid, [1, 2])}
          {testFunction(life.grid, [1, 3])}
          {testFunction(life.grid, [1, 4])}
          {testFunction(life.grid, [1, 5])}
          {testFunction(life.grid, [1, 6])}
          {testFunction(life.grid, [1, 7])}
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
