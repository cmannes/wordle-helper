import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Links from "./Links";

import {Wordle} from "./Wordle";
import {Reading} from "./Reading";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Links/>}/>
          <Route path="/Wordle" element={<Wordle/>}/>
          <Route path="/Reading" element={<Reading/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;