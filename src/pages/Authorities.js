import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Authorities = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();

  const countries = JSON.parse(localStorage.getItem("g20Countries") || "[]");
  const selectedCountry = countries.find((c) => c.cca3 === countryId);

  const [authority, setAuthority] = useState({
    nome: "",
    cargo: "",
    email: "",
    country: selectedCountry ? selectedCountry.name.common : "",
  });

  const [emailError, setEmailError] = useState("");
  const [nomeError, setNomeError] = useState("");

  useEffect(() => {
    if (!selectedCountry) {
      navigate("/countries");
    }
  }, [selectedCountry, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthority({
      ...authority,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const domain = selectedCountry?.tld?.[0] || "";
    if (email && !email.endsWith(domain)) {
      setEmailError(
        `O e-mail deve terminar com ${domain || "o domínio correto"}`
      );
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingAuthorities = JSON.parse(
      localStorage.getItem(`${selectedCountry?.cca3}-authorities`) || "[]"
    );
    const isDuplicate = existingAuthorities.some(
      (auth) => auth.cargo === authority.cargo
    );

    if (isDuplicate) {
      alert("Já existe uma autoridade registrada com esse cargo.");
      return;
    }

    if (emailError) {
      alert("Por favor, corrija os erros antes de enviar.");
      return;
    }

    localStorage.setItem(
      `${selectedCountry?.cca3}-authorities`,
      JSON.stringify([...existingAuthorities, authority])
    );

    navigate(`/countries/${countryId}`);
  };

  return (
    <div>
      <h2>Registrar Autoridade para {selectedCountry?.name.common}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo:</label>
          <input
            type="text"
            name="nome"
            value={authority.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>País:</label>
          <input
            type="text"
            name="country"
            value={authority.country}
            disabled
          />
        </div>
        <div>
          <label>Cargo/Função:</label>
          <select
            name="cargo"
            value={authority.cargo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o cargo</option>
            <option value="Chefe de Estado">Chefe de Estado</option>
            <option value="Ministro de Finanças">Ministro de Finanças</option>
            <option value="Presidente de Banco Central">
              Presidente de Banco Central
            </option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={authority.email}
            onChange={(e) => {
              handleChange(e);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && <span style={{ color: "red" }}>{emailError}</span>}
        </div>
        <button type="submit">Cadastrar Autoridade</button>
      </form>
    </div>
  );
};

export default Authorities;
