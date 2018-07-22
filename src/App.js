import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "normalize.css";
import "./App.css";
import armyKnife from "./swiss-army-knife.svg";
import About from "./Components/Workbench/About.js";
import Accounts from "./Components/Workbench/Accounts.js";
import CompileDeployContract from "./Components/Workbench/CompileDeployContract.js";
import ExecuteContractFunction from "./Components/Workbench/ExecuteContractFunction.js";
import Events from "./Components/Workbench/Events.js";
import FilterOptionsWatch from "./Components/Workbench/FilterOptionsWatch.js";
import LockUnlock from "./Components/Workbench/LockUnlock.js";
import SendTransaction from "./Components/Workbench/SendTransaction.js";
import SetupAndVersion from "./Components/Workbench/SetupAndVersion.js";

class App extends Component {
  render() {
    return (
      <article>
        <About />
        <SetupAndVersion />
        <Accounts />
        <LockUnlock />
        <SendTransaction />
        <CompileDeployContract />
        <ExecuteContractFunction />
        <FilterOptionsWatch />
        <Events />
    </article>
    );
  }
}

export default hot(module)(App);
