import "./App.css";
import { useState } from "react";
import Cell from "./Cell";
import { ALIVE, DEAD } from "./status";
// import { initialLife as lifeSeed } from "./initialLife.js";
import raw from "raw.macro";
import styled from "styled-components";
import __ from "lodash";

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
    isStartButtonActive: true,
    isResultReady: false,
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

    let outputGrid = [];

    console.log("isButtonActive => ", life.isStartButtonActive);
    // is Button active ?
    if (life.isStartButtonActive) {
      for (let i = 0; i < rowLength; i++) {
        let tempRow = [];
        for (let j = 0; j < columnLength; j++) {
          console.log("\n\n[i, j] => ", i, j);

          tempStatus = matrixProcessor(newGrid, i, j);

          console.log("tempStatus => ", tempStatus);

          console.log("[i, j] UPDATED => ", matrixProcessor(newGrid, i, j));

          tempRow.push(tempStatus);
        }
        outputGrid.push(tempRow);
      }

      console.log("newGrid UPDATED => ", outputGrid);

      const newLife = {
        ...life,
        grid: outputGrid,
        generation: life.generation + 1,
      };
      setLife(newLife);

      // if no cellStatus, disactivate Start Button
      let comparisonCounter = 0;
      for (let n = 0; n < rowLength; n++) {
        let rowCompareCounter = 0;
        for (let m = 0; m < columnLength; m++) {
          if (grid[n][m] === outputGrid[n][m]) {
            rowCompareCounter++;
          }
        }
        if (rowCompareCounter === columnLength) {
          comparisonCounter++;
        }
      }

      if (comparisonCounter === rowLength) {
        setLife({
          ...life,
          isStartButtonActive: false,
          isResultReady: true,
        });
      }
    }
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

  // -------------------- Classes -----------------
  const result = life.isResultReady ? "result" : "";
  const faded = life.isResultReady ? "faded" : "";

  // ----------- Styled Components ------------------
  const ButtonStyled = styled.button`
    background-color: rgb(248, 255, 206);
    box-shadow: 2px 10px 10px 0px grey;
    padding: 10px 40px;
    margin: 30px 20px;
    font-size: 20px;
    border:none;
    border-radius: 15px;
    outline: none;
    cursor: ${(props) => (props.pointer ? "pointer" : "")}
    color: ${(props) => (props.start ? "green" : "red")};
    ${(props) =>
      props.shouldHover
        ? "&:hover {background-color: #0071c5; color: white }"
        : "white"}
    }
    ${(props) =>
      props.cliccable
        ? "&:active {box-shadow: 1px 1px 10px 0px grey; transform: translateY(4px); transition-duration: 200; color: white}"
        : ""}
    ${(props) => (props.resetColor ? "{background: orange; color: white}" : "")}
    ${(props) => (props.show ? "{background: gray; }" : "")}
  `;
  const DisplayStyled = styled.section`
    margin-bottom: 30px;
  `;

  return (
    <div className="App ">
      <div className="fluid">
        <div className="game-container">
          <div className={`generation ${result}`}>
            Generation: <code>{life.generation}</code>
          </div>
          <div className="grid-size">
            <div className="row-length">{life.grid.length}</div>
            <div className="column-length">{life.grid[0].length}</div>
          </div>
          <DisplayStyled>{displayGrid()}</DisplayStyled>
          <div className="buttons-container">
            <ButtonStyled
              onClick={() => startLife()}
              start
              shouldHover
              cliccable
              pointer
            >
              Start Life
            </ButtonStyled>
            <ButtonStyled
              onClick={() => resetLife()}
              cliccable
              reset
              resetColor
            >
              Reset Life
            </ButtonStyled>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
