import React, {useState, useEffect} from "react";
import {FormControl, MenuItem, Select, Card, CardContent} from "@material-ui/core"
import Table from "./Table"
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';
import {sortData, prettyPrintStat} from "./util"
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]= useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  },[]);

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
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData()
  },[]);

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url= countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  

    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountry(countryCode);
      setCountryInfo(data);
      setLoading(false);
      countryCode === "worldwide"
        ? setMapCenter([34.80746, -40.4796])
        : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setZoom(4);
    })

  };

  return (
    <div className="app">
      <div className="app__left">
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
        
          <div className="app__stats">
            <InfoBox onClick={e => setCasesType ('cases')} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
            <InfoBox onClick={e => setCasesType ('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
            <InfoBox onClick={e => setCasesType ('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
          </div>

          <Map casesType = {casesType} countries= {mapCountries} center={mapCenter} zoom={zoom}/>
        </div>
        <Card className = "app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
            <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType = {casesType}/>
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
