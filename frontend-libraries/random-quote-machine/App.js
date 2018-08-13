import React, { Component } from "react";
import AppHeader from "./components/AppHeader";
import QuoteBox from "./components/QuoteBox";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <AppHeader />
        <QuoteBox />
      </main>
    );
  }
}
