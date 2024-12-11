import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Agendas = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const countries = JSON.parse(localStorage.getItem("g20Countries") || "[]");
  const selectedCountry = countries.find((c) => c.cca3 === countryId);
  const authorities = JSON.parse(
    localStorage.getItem(`${countryId}-authorities`) || "[]"
  );
  const agendas = JSON.parse(
    localStorage.getItem(`${countryId}-agendas`) || "[]"
  );

  const [agenda, setAgenda] = useState({ autoridade: "", dataHora: "" });
  const [horaError, setHoraError] = useState("");

  useEffect(() => {
    if (!selectedCountry) {
      navigate("/countries");
    } else {
      document.title = `Agendar Apresentação - ${selectedCountry.name.common}`;
    }
  }, [selectedCountry, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgenda({
      ...agenda,
      [name]: value,
    });
  };

  const validateHora = (dataHora) => {
    const horarioSelecionado = new Date(dataHora);
    const dataPermitida = ["2025-11-18", "2025-11-19"].includes(
      dataHora.split("T")[0]
    );
    if (!dataPermitida) {
      setHoraError("Data inválida. Selecione 18 ou 19 de novembro de 2025.");
      return false;
    }

    for (const agendamento of agendas) {
      const horarioAgendamento = new Date(agendamento.dataHora);
      const diffMinutos =
        Math.abs(horarioSelecionado - horarioAgendamento) / 1000 / 60;
      if (diffMinutos < 15) {
        setHoraError("Este horário é muito próximo de outro agendamento.");
        return false;
      }
    }

    setHoraError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agenda.autoridade || !agenda.dataHora) {
      alert("Preencha todos os campos.");
      return;
    }
    const isHoraValida = validateHora(agenda.dataHora);
    if (!isHoraValida) {
      return;
    }
    if (!validateHora(agenda.dataHora)) {
      alert(horaError);
      return;
    }
    localStorage.setItem(
      `${countryId}-agendas`,
      JSON.stringify([...agendas, agenda])
    );
    navigate(`/countries/${countryId}`);
  };

  const formatDateTime = (dateTime) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTime).toLocaleString("pt-BR", options);
  };

  return (
    <div>
      <h2>Agendar Apresentação para {selectedCountry?.name.common}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Autoridade:</label>
          <select
            name="autoridade"
            value={agenda.autoridade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a autoridade</option>
            {authorities.map((authority, index) => (
              <option key={index} value={authority.nome}>
                {`${selectedCountry?.name.common} / ${authority.nome} / ${authority.cargo}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            name="dataHora"
            value={agenda.dataHora}
            onChange={handleChange}
            required
          />
          {horaError && <span style={{ color: "red" }}>{horaError}</span>}
        </div>
        <button type="submit">Agendar</button>
      </form>

      <h3>Apresentações Agendadas:</h3>
      <ul>
        {agendas
          .sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora))
          .map((agendamento, index) => (
            <li key={index}>
              {formatDateTime(agendamento.dataHora)} - {agendamento.autoridade}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Agendas;
