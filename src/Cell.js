import { ALIVE_CELL, DEAD_CELL } from "./cellEntities.js";
import { ALIVE, DEAD } from "./status";

const Cell = ({ status }) => {
  return status === ALIVE ? (
    <div className="cell alive">{ALIVE_CELL}</div>
  ) : (
    // <div className="cell dead">{DEAD}</div>
    // <div className="cell dead">&#8226;</div>
    <div className="cell dead" dangerouslySetInnerHTML={DEAD_CELL()} />
  );
};

export default Cell;
