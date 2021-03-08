import React, {useState} from "react";
import {FormControl, MenuItem, Select} from "@material-ui/core"

import './App.css';

function App() {

  const [countries, setCountries] = useState(['USA','Uk','Spain']);
  /*https://disease.sh/v3/covid-19/countries*/

  return (
    <div className="app">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant = "outlined"value = "abc">

          {countries.map(country =>(
            <MenuItem value={country}>{country}</MenuItem>
          ))}

          {/* <MenuItem value = "worldwide">Option1</MenuItem> */}
          {/* <MenuItem value = "worldwide">Option2</MenuItem> */}
          {/* <MenuItem value = "worldwide">Option3</MenuItem> */}
          {/* <MenuItem value = "worldwide">Option4</MenuItem> */}
        </Select>
      </FormControl>
      </div>


      {/*Header */}
      {/*Title + select input dropdown field*/}
      {/*InfoBox*/}
      {/*InfoBox*/}
      {/*InfoBox*/}
      {/*Table*/}
      {/*Graph*/}
      {/*Map*/}

    </div>
  );
}

export default App;
