## Sistema de Agendamento G20

Este projeto é uma interface web para gerenciar autoridades e agendar apresentações com países do G20.

### Instalação

1. Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.
2. Clone este repositório ou baixe o código fonte.
3. Abra o terminal no diretório do projeto.
4. Execute o comando `npm install` (ou `yarn install`) para instalar as dependências necessárias.

### Uso

1. Inicie o servidor de desenvolvimento com o comando `npm start` (ou `yarn start`).
2. Acesse o endereço `http://localhost:3000` no seu navegador.

### Funcionalidades

* **Barra lateral (Sidebar):**
    * Permite filtrar países por região.
    * Oferece busca por nome do país.
    * Exibe a lista de países do G20.
* **Página de detalhes do país:**
    * Mostra informações básicas do país selecionado (nome, capital, região, idioma, domínio de topo).
    * Possui botões para registrar autoridades e agendar apresentações.
* **Cadastro de autoridade:**
    * Permite registrar autoridades de um determinado país.
    * É necessário informar nome completo, cargo/função e email (que deve terminar com o domínio do país selecionado).
* **Agendamento de apresentação:**
    * Permite agendar uma apresentação com uma autoridade específica do país selecionado.
    * É necessário selecionar a autoridade, data e hora da apresentação.
    * O sistema valida a data e hora (apenas permite datas de 18 e 19 de novembro de 2025) e evita conflitos de horário com outros agendamentos.

### Observações

* Os dados dos países do G20 são obtidos da API `https://restcountries.com/v3.1/all` e armazenados localmente no localStorage do navegador.
* Os dados de autoridades e agendamentos de apresentações também são armazenados localmente no localStorage para fins demonstrativos. Em uma aplicação real, esses dados deveriam ser persistidos em um banco de dados.

### Documentação do código

A documentação do código fonte está disponível como comentários JSDoc nos arquivos do projeto. Você pode utilizar ferramentas como o JSDoc para gerar documentação HTML a partir desses comentários.
