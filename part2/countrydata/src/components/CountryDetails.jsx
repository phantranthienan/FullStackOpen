import React from 'react'

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital[0]} <br/>   
                area {country.area}
            </p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} />
        </div>
    )
}

export default CountryDetails