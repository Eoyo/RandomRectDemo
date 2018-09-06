import * as React from "react";
import "./RandomRecList.scss";
import { OneRect } from "../Actor/RandomRecActor";

export type RandomRecListProps = {
  rectList: OneRect[];
};
export const RandomRecList: React.SFC<RandomRecListProps> = p => {
  const lastOneOrder = Math.max(...p.rectList.map(rect => rect.order)) + 1;
  return (
    <div
      className="random-rect"
      style={{
        width: lastOneOrder * 110 + "px"
      }}
    >
      {p.rectList.map((rect, i) => {
        return (
          <div
            style={{
              height: rect.height + "px",
              transform: `translate(${rect.order * 110 + "px"}, 0px)`
            }}
            className="random-rect-block"
            key={i}
          />
        );
      })}
    </div>
  );
};
