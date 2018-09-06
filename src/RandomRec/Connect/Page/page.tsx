import { M } from "../tool";
import { RandomRecListProps, RandomRecList } from "../../Piece/RandomRecList";
import * as React from "react";
import { ChangeCountProps, ChangeCount } from "../../Piece/Action/ChangeCount";
import { RandomRec } from "../../Actor/RandomRecActor";

export const C = {
  RandomRecPage: M<RandomRecListProps>(s => {
    return {
      rectList: s.rect
    };
  })(p => <RandomRecList {...p} />),
  RandomCountChange: M<ChangeCountProps>(s => {
    return {
      count: s.count,
      onchange(count) {
        RandomRec.resetCount({
          count
        });
      }
    };
  })(p => <ChangeCount {...p} />)
};
