import React, { useState, useEffect } from "react";

import countriesServices from "./services/countriesServices";
import SearchField from "./components/SearchField";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesServices.getAll().then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCountries(results);
  }, [searchText, countries]);

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <SearchField
        searchText={searchText}
        handleSearchText={handleSearchText}
      />
      {searchText !== "" && (
          filteredCountries.length > 10
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length === 1
          ? <CountryDetails country={filteredCountries[0]} />
          : filteredCountries.map(country => 
              <p key={country.name.common}>
                  {country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button>
              </p>)
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
