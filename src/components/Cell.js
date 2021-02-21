import { ALIVE_CELL, DEAD_CELL } from "../cellEntities.js";
import { ALIVE, DEAD } from "../status";
import React from "react";

const Cell = ({ status, children }) => {
  return status === ALIVE ? (
    <React.Fragment>
      <div className="cell alive" dangerouslySetInnerHTML={ALIVE_CELL()} />
      <div className="text-description">{children}</div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="cell dead" dangerouslySetInnerHTML={DEAD_CELL()} />
      <div className="text-description">{children}</div>
    </React.Fragment>
  );
};

export default Cell;
