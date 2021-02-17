import "./App.css";
import { useState } from "react";
import Cell from "./Cell";
import { ALIVE, DEAD } from "./status";

const initialLife = {
  generation: 3,
  grid: [
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "*", ".", ".", "."],
    [".", ".", ".", "*", "*", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
  ],
};

function App() {
  const [life, setLife] = useState(initialLife);

  const renderInitialGrid = () => {
    return life.grid.map((el) => (
      <div key={Math.random(9) * 123}>
        {/* row */}
        {el.map((el) => {
          if (el === ".") {
            return <Cell status={ALIVE} key={Math.random(9) * 123} />;
          }
          return <Cell status={DEAD} key={Math.random(9) * 123} />;
        })}
        <br />
      </div>
    ));
  };

  //  const renderInitialGrid = () => InitialGrid;

  // const renderGrid = grid.map();
  const startLife = () => {
    console.log("START LIFE");
    setLife({ ...life, generation: life.generation + 1 });

    renderGrid(); // to delete
  };
  const resetLife = () => {
    setLife({ ...life, generation: initialLife.generation });
  };

  const checkStatus = (grid, pos) => {
    const newGrid = { ...grid };
    // console.log("grid => ", grid);
    // console.log("pos.i => ", pos[0]);
    // console.log("pos.j => ", pos[1]);
    console.log("newGrid => ", newGrid);

    // check for live cell

    // check for dead cell
  };

  const renderGrid = () => {
    const { grid } = life;
    console.log("grid => ", grid[-1]);

    for (let i = 0; i < grid.length; ++i) {
      for (let j = 0; j < 8; j++) {
        checkStatus(grid, [i, j]);
      }
    }
  };

  return (
    <div className="App">
      <div>
        Generation: <code>{life.generation}</code>
      </div>
      <div>
        {life.generation === initialLife.generation
          ? renderInitialGrid()
          : renderGrid()}
      </div>
      <button onClick={() => startLife()}>Start</button>
      <button onClick={() => resetLife()}>Reset</button>
    </div>
  );
}

export default App;
