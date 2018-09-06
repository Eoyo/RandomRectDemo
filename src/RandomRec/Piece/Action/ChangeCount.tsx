/**
 * 调整数量的
 */
import * as React from "react";
import "./ChangeCount.scss";
export type ChangeCountProps = {
  count: number;
  onchange(count: number): void;
};
export const ChangeCount: React.SFC<ChangeCountProps> = p => {
  return (
    <div className="change-count">
      <div
        className="ope-div"
        onClick={() => {
          p.onchange(p.count - 1);
        }}
      >
        -
      </div>
      <span className="count-description">count: {p.count}</span>
      <div
        className="ope-div"
        onClick={() => {
          p.onchange(p.count + 1);
        }}
      >
        +
      </div>
    </div>
  );
};
