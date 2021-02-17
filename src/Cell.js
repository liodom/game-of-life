import { ALIVE, DEAD } from "./status";

const Cell = ({ status }) => {
  if (status === ALIVE) {
    return <div className="cell alive">.</div>;
  } else if (status === DEAD) {
    return <div className="cell dead">*</div>;
  }
};

export default Cell;
