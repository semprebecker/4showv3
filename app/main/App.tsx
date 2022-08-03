import React from "react";
import { ChooserProvider } from "../providers/ChooserProvider";
import { WSProvider } from "../providers/WSProvider";

const App = (): JSX.Element => (
  <ChooserProvider>
    <WSProvider>
      <header>
        <h1>4Show V2</h1>
      </header>
    </WSProvider>
  </ChooserProvider>
);

export default App;
