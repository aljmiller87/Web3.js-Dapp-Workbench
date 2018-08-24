import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";

ReactDOM.render(<App />, document.getElementById("root"));

class Component2 extends React.Component {
  render() {
    return (
      <div>Hello React from Component 2</div>
    );
  }
}

ReactDOM.render(<Component2 />, document.getElementById("other"));
