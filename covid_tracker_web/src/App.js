import React, {useState, useEffect} from "react";
import {FormControl, MenuItem, Select} from "@material-ui/core"
import InfoBox from "./InfoBox"

import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() =>{
    const getCountriesData = async () =>{
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value: country.countryInfo.iso2, 
          }));
        setCountries(countries);
      });
    };
    getCountriesData()
  },[]);

  const onCountryChange = (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant = "outlined" onChange={onCountryChange} value = {country}>
          <MenuItem value="worldwide">worldwide</MenuItem>
          {countries.map(country =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}

          {/* <MenuItem value = "worldwide">Option1</MenuItem> */}
          {/* <MenuItem value = "worldwide">Option2</MenuItem> */}
          {/* <MenuItem value = "worldwide">Option3</MenuItem> */}
          {/* <MenuItem value = "worldwide">Option4</MenuItem> */}
        </Select>
      </FormControl>
      </div>
      
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
        <InfoBox title="Recovered" cases={1234} total={3000}/>
        <InfoBox title="Deaths" cases={12345} total={4000}/>
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
