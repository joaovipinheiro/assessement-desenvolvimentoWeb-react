import React from "react";
import { useParams, Link } from "react-router-dom";

const Countries = () => {
  const { countryId } = useParams();
  const countries = JSON.parse(localStorage.getItem("g20Countries") || "[]");

  const selectedCountry = countries.find((c) => c.cca3 === countryId);

  const authorities = JSON.parse(
    localStorage.getItem(`${countryId}-authorities`) || "[]"
  );

  if (!selectedCountry) {
    return (
      <div>
        <h1>Selecione um país para visualizar as informações dele na tela</h1>
        <p>Nenhum país selecionado por enquanto...</p>
        <Link to="https://www.youtube.com/watch?v=rvKGN0cKie4">
          Saiba mais sobre o G20!
        </Link>
      </div>
    );
  }

  return (
    <div className="country-details">
      <h1>Detalhes do País</h1>
      <form className="country-form">
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={selectedCountry.name.common}
            disabled
          />
        </div>
        <div>
          <label htmlFor="capital">Capital:</label>
          <input
            id="capital"
            type="text"
            value={selectedCountry.capital?.[0] || "N/A"}
            disabled
          />
        </div>
        <div>
          <label htmlFor="region">Região:</label>
          <input
            id="region"
            type="text"
            value={selectedCountry.region}
            disabled
          />
        </div>
        <div>
          <label htmlFor="language">Língua:</label>
          <input
            id="language"
            type="text"
            value={Object.values(selectedCountry.languages || {})[0] || "N/A"}
            disabled
          />
        </div>
        <div>
          <label htmlFor="tld">Domínio de Topo:</label>
          <input
            id="tld"
            type="text"
            value={selectedCountry.tld?.[0] || "N/A"}
            disabled
          />
        </div>
      </form>

      <div className="country-actions">
        <Link to={`/authorities/${countryId}`} className="btn-registrar">
          Registrar Autoridade
        </Link>
        <Link to={`/agendas/${countryId}`} className="btn-registrar">
          Agendar Apresentação
        </Link>
        <Link to="/countries">Voltar para o início</Link>
      </div>
      <div className="authorities-list">
        <h2>Autoridades Registradas</h2>
        {authorities.length > 0 ? (
          <ul>
            {authorities.map((authority, index) => (
              <li key={index} className="authority-card">
                <p>
                  <strong>Nome:</strong> {authority.nome}
                </p>
                <p>
                  <strong>Cargo:</strong> {authority.cargo}
                </p>
                <p>
                  <strong>País:</strong> {selectedCountry?.name.common}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma autoridade registrada.</p>
        )}
      </div>
    </div>
  );
};

export default Countries;
