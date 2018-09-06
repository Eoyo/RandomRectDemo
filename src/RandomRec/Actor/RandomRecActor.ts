import { Actor } from "react-redux-actor";

// 使用类定义接口
class RandomRecState {
  orderType: "random" | "order" | "static" = "static";
  rect: OneRect[] = [];
  count: number = 9;
}

export class OneRect {
  height: number = 1;
  order: number = 0;
}

export const RandomRec = Actor(new RandomRecState())(
  // actions init
  {
    setRandomRec: {},
    setOrderRec: {},
    resetCount: {
      count: 0
    },
    playing: {}
  }
)(
  // reducers
  {
    setRandomRec: (s, a) => {
      const newRect = lockCountToNewRect(s);
      newRect.forEach(rect => setRandomHeight(rect));
      return {
        rect: newRect,
        orderType: "random"
      };
    },
    setOrderRec: (s, a) => {
      // 乱序了才排序
      if (s.orderType === "random") {
        // 同步数量
        const newRect = lockCountToNewRect(s);

        // 为了不影响newRect的顺序进行排序.
        const newOrderRect = [...newRect].sort((a, b) => a.height - b.height);

        // 将排序的结果写入order属性中, 防止dom重新生成, 而丢失动画.
        for (const rect of newRect) {
          rect.order = newOrderRect.indexOf(rect);
        }

        return {
          rect: newRect,
          orderType: "order"
        };
      } else {
        return {};
      }
    },
    resetCount: (s, a) => {
      const max = 10;

      // 设置上下限
      if (a.count > max) {
        a.count = max;
      }
      if (a.count < 1) {
        a.count = 1;
      }

      const newRect = lockCountToNewRect(s, a.count);
      // 去除空位
      if (a.count < s.count) {
        // 从新排序order 用于 压缩排序
        const newOrderRect = [...newRect].sort((a, b) => a.order - b.order);
        newRect.forEach(rect => {
          rect.order = newOrderRect.indexOf(rect);
        });
      }
      return {
        count: a.count,
        rect: newRect
      };
    },
    playing: function*() {
      while (true) {
        const s = RandomRec.grab();
        if (s.orderType === "random") {
          RandomRec.setOrderRec({});
        } else if (s.orderType === "order" || s.orderType === "static") {
          RandomRec.setRandomRec({});
        }

        // 延时
        yield new Promise(res => {
          setTimeout(res, 1000);
        });
      }
    }
  }
);

function lockCountToNewRect(s: RandomRecState, newCount?: number) {
  let count = newCount || s.count;
  let newRect: OneRect[] = [];
  for (let i = 0; i < count; i += 1) {
    newRect[i] = s.rect[i];

    if (newRect[i] === undefined) {
      newRect[i] = new OneRect();
      newRect[i].order = i;
      setRandomHeight(newRect[i]);
    }
  }
  return newRect;
}

function setRandomHeight(rect: OneRect) {
  rect.height = Math.random() * 300;
}
