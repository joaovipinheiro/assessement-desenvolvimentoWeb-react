import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const g20Countries = [
  "South Africa",
  "Germany",
  "Saudi Arabia",
  "Argentina",
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "South Korea",
  "United States",
  "France",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Mexico",
  "United Kingdom",
  "Russia",
  "Turkey",
];

const regions = ["África", "Ásia", "Europa", "Oceania", "Américas"];

const Sidebar = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      const cachedCountries = localStorage.getItem("g20Countries");
      if (cachedCountries) {
        const countriesData = JSON.parse(cachedCountries);
        setCountries(countriesData);
        setFilteredCountries(countriesData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const g20Data = data
          .filter((country) => g20Countries.includes(country.name.common))
          .sort((a, b) => a.name.common.localeCompare(b.name.common));
        localStorage.setItem("g20Countries", JSON.stringify(g20Data));
        setCountries(g20Data);
        setFilteredCountries(g20Data);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegions((prev) => {
      const updatedRegions = prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region];
      return updatedRegions;
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = countries
      .filter((country) => {
        const regionMatches = selectedRegions.length
          ? selectedRegions.includes(
              country.region === "Americas" ? "Américas" : country.region
            )
          : true;
        const nameMatches = country.name.common
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return regionMatches && nameMatches;
      })
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
    setFilteredCountries(filtered);
  }, [selectedRegions, searchTerm, countries]);

  if (loading) {
    return <div className="loading">Carregando países...</div>;
  }

  return (
    <div className="sidebar">
      <div className="region-selector">
        <h3>Filtrar por Região</h3>
        {regions.map((region) => (
          <div key={region}>
            <input
              type="checkbox"
              id={region}
              checked={selectedRegions.includes(region)}
              onChange={() => handleRegionChange(region)}
            />
            <label htmlFor={region}>{region}</label>
          </div>
        ))}
      </div>
      <div className="country-search">
        <input
          type="text"
          placeholder="Buscar países"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            <Link to={`/countries/${country.cca3}`} className="country-item">
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
