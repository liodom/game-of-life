import "./App.css";
import { useState } from "react";
import Cell from "./Cell";
import { ALIVE, DEAD } from "./status";
import { initialLife } from "./initialLife.js";

function App() {
  // const initialLife = {
  //   generation: 3,
  //   grid: [
  //     [".", ".", ".", ".", ".", ".", ".", "."],
  //     [".", ".", ".", ".", "*", ".", ".", "."],
  //     [".", ".", ".", "*", "*", ".", ".", "."],
  //     [".", ".", ".", ".", ".", ".", ".", "."],
  //   ],
  // };
  const seed = { ...initialLife };
  const [life, setLife] = useState(seed);

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
  };
  const resetLife = () => {
    console.log("seed => ", seed);
    setLife(seed);
    console.log("RESET WAS CLICKED!!");
  };

  const checkStatus = (grid, pos) => {
    const newGrid = [...grid];
    const [i, j] = pos;
    const rowLength = grid.length;
    const columnLength = grid[0].length;

    let liveCellNeighbours = 0;
    let deadCellNeighbours = 0;

    if (i === rowLength) {
      return;
    }
    // check live cell
    if (newGrid[i][j] === ALIVE) {
      if (i - 1 >= 0 && j - 1 >= 0 && newGrid[i - 1][j - 1] === ALIVE) {
        liveCellNeighbours++;
      }
      if (j - 1 >= 0 && newGrid[i][j - 1] === ALIVE) {
        liveCellNeighbours++;
      }
      if (i + 1 < rowLength && j - 1 >= 0 && newGrid[i + 1][j - 1] === ALIVE) {
        liveCellNeighbours++;
      }
      if (i + 1 < rowLength && newGrid[i + 1][j] === ALIVE) {
        liveCellNeighbours++;
      }
      if (
        i + 1 < rowLength &&
        j + 1 < columnLength &&
        newGrid[i + 1][j + 1] === ALIVE
      ) {
        liveCellNeighbours++;
      }
      if (j + 1 < columnLength && newGrid[i][j + 1] === ALIVE) {
        liveCellNeighbours++;
      }
      if (
        i - 1 >= 0 &&
        j + 1 < columnLength &&
        newGrid[i - 1][j + 1] === ALIVE
      ) {
        liveCellNeighbours++;
      }
      if (i - 1 >= 0 && newGrid[i - 1][j] === ALIVE) {
        liveCellNeighbours++;
      }

      // if (liveCellNeighbours > 0 && liveCellNeighbours < 2) {
      if (liveCellNeighbours < 2) {
        newGrid[i][j] = DEAD;

        //   newGrid[i][j] = DEAD;
      }
      if (liveCellNeighbours === 2 || liveCellNeighbours === 3) {
        newGrid[i][j] = ALIVE;
      }
      if (liveCellNeighbours > 3) {
        newGrid[i][j] = DEAD;
      }

      // set the new Life into the state
      const newLife = {
        ...life,
        grid: newGrid,
        generation: life.generation + 1,
      };
      setLife(newLife);
    }

    // check dead cell
    if (newGrid[i][j] === DEAD) {
      if (i - 1 >= 0 && j - 1 >= 0 && newGrid[i - 1][j - 1] === ALIVE) {
        deadCellNeighbours++;
      }
      if (j - 1 >= 0 && newGrid[i][j - 1] === ALIVE) {
        deadCellNeighbours++;
      }
      if (i + 1 < rowLength && j - 1 >= 0 && newGrid[i + 1][j - 1] === ALIVE) {
        deadCellNeighbours++;
      }
      if (i + 1 < rowLength && newGrid[i + 1][j] === ALIVE) {
        deadCellNeighbours++;
      }
      if (
        i + 1 < rowLength &&
        j + 1 < columnLength &&
        newGrid[i + 1][j + 1] === ALIVE
      ) {
        deadCellNeighbours++;
      }
      if (j + 1 < columnLength && newGrid[i][j + 1] === ALIVE) {
        deadCellNeighbours++;
      }
      if (
        i - 1 >= 0 &&
        j + 1 < columnLength &&
        newGrid[i - 1][j + 1] === ALIVE
      ) {
        deadCellNeighbours++;
      }
      if (i - 1 >= 0 && newGrid[i - 1][j] === ALIVE) {
        deadCellNeighbours++;
      }

      if (deadCellNeighbours === 3) {
        newGrid[i][j] = ALIVE;
      }

      // set the new Grid in the state
      const newLife = {
        ...life,
        grid: newGrid,
        generation: life.generation + 1,
      };
      setLife(newLife);
    }
  };

  const renderGrid = () => {
    const { grid } = life;
    const testGrid = [...grid];
    const rowLength = testGrid.length;
    const columnLength = testGrid[0].length;

    for (let i = 0; i < rowLength; i++) {
      for (let j = 0; j < columnLength; j++) {
        checkStatus(testGrid, [i, j], rowLength, columnLength);
      }
    }
    return;
  };

  console.log("THIS IS THE NEW GRID => ", life.grid);

  return (
    <div className="App ">
      <div className="fluid">
        <div>
          Generation: <code>{life.generation}</code>
        </div>
        <span>{life.grid.length} &nbsp; &nbsp;</span>
        <span>{life.grid[0].length}</span>
        {displayGrid()}
        <button onClick={() => startLife()}>Start</button>
        <button onClick={() => resetLife()}>Reset</button>
      </div>
    </div>
  );
}

export default App;
