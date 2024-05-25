// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import Card from "react-bootstrap/Card";

// const CountrySearch = () => {
//   const [country, setCountry] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//     const [suggestions, setSuggestions] = useState([]);

    

//   const axiosFetch = async () => {
//     try {
//       const response = await axios.get(
//         `https://restcountries.com/v3.1/name/${country}`
//       );
//       setCountries(response.data);
//       console.log(response.data);
//       setCountry("");
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   const handleChange = async(event) => {
//     setCountry(event.target.value);
//     const value = event.target.value;
//     setSearchTerm(value);

//     if (value.length > 0) {
//         const List =  await axios.get(
//             `https://restcountries.com/v3.1/all`
//           );
//           console.log(List.data)
//           const suggestionList   =await List.data?.filter(product => product.name.common.toLowerCase().includes(value.toLowerCase()))
//             .map(product => product.name.common);
//             console.log(suggestionList)
//         setSuggestions(suggestionList);
//     } else {
//         setSuggestions([]);
//     }
// };

// //   const handleSearch = (e) => {
// //     setCountry(e.target.value);
// //   };

//   const handleCountry = () => {
//     axiosFetch();
//   };
//   return (
//     <div className="main-container">
//       <h2>Country Search</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter country name"
//           value={searchTerm}
//           onChange={handleChange}
//         />
//         <button onClick={handleCountry}>Search</button>
//       </div>
//       <datalist id="product-suggestions">
//                 {suggestions.map((suggestion, index) => 
//                   {
//                     if(index <10){
//                         return  <option key={index} value={suggestion} />
//                        }
//                   }
//                 )}
//             </datalist>

//       <div>
//         {countries.map((country) => {
//           return (
//             <div className="container">
//               <Card style={{ display:"flex" ,padding:"20px", justifyContent:"space-evenly"}}>
//                 <div>
//                   <Card.Img variant="top" src={country.flags.png} />
//                 </div>
//                 <div>
//                   <Card.Img
//                     variant="top"
//                     src={country.coatOfArms.png}
//                     width={300}
//                     height={300}
//                   />
//                 </div>
//                 <div>
//                   <Card.Body className="subContainer">
//                     <Card.Title className="header">
//                       {country.name.common}
//                     </Card.Title>
//                     <Card.Text>
//                       Capital: {country.capital}
//                       <br />
//                       Population: {country.population}
//                       <br />
//                       Region: {country.region}
//                       <br />
//                       Subregion: {country.subregion}
//                       <br />
//                       Timezones: {country.timezones[0]}
//                       <br />
//                     </Card.Text>
//                   </Card.Body>
//                 </div>
//               </Card>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CountrySearch;


import React, { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const CountrySearch = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const axiosFetch = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );
      setCountries(response.data);
      console.log(response.data);
      setCountry("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCountry(value);

    if (value.length > 0) {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const suggestionList = response.data
          .filter((country) => 
            country.name.common.toLowerCase().includes(value.toLowerCase())
          )
          .map((country) => country.name.common);
        setSuggestions(suggestionList);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleCountry = () => {
    axiosFetch();
  };

  return (
    <div className="main-container">
      <h2>Country Search</h2>
      <div>
        <input
          type="text"
          placeholder="Enter country name"
          value={searchTerm}
          onChange={handleChange}
          list="country-suggestions"
        />
        <datalist id="country-suggestions">
          {suggestions.slice(0, 10).map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
        <button onClick={handleCountry}>Search</button>
      </div>
      <div>
        {countries.map((country) => (
          <div className="container" key={country.cca3}>
            <Card style={{ display: "flex", padding: "20px", justifyContent: "space-evenly" }}>
              <div>
                <Card.Img variant="top" src={country.flags.png} />
              </div>
              <div>
                <Card.Img
                  variant="top"
                  src={country.coatOfArms?.png}
                  width={300}
                  height={300}
                />
              </div>
              <div>
                <Card.Body className="subContainer">
                  <Card.Title className="header">
                    {country.name.common}
                  </Card.Title>
                  <Card.Text>
                    Capital: {country.capital}
                    <br />
                    Population: {country.population}
                    <br />
                    Region: {country.region}
                    <br />
                    Subregion: {country.subregion}
                    <br />
                    Timezones: {country.timezones[0]}
                    <br />
                  </Card.Text>
                </Card.Body>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountrySearch;

