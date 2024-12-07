// App.js
import React from "react";
import FormPenerimaanBarang from "./FormPenerimaanBarang";
import FormPengeluaranBarang from "./FormPengeluaranBarang";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Manajemen Gudang</h1>
      <FormPenerimaanBarang />
      <FormPengeluaranBarang />
    </div>
  );
};

export default App;
