import * as React from "react";
import { RandomRec } from "./RandomRec/Actor/RandomRecActor";
import { C } from "./RandomRec/Connect/Page/page";

class App extends React.Component {
  componentDidMount() {
    RandomRec.playing({});
  }
  public render() {
    return (
      <div className="App">
        <h2>Actor控制矩柱排序演示demo</h2>
        <div className="content">
          <div className="blcok">
            <C.RandomCountChange />
            <C.RandomRecPage />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
