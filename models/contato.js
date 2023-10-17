const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'back',
  password: '123456',
  port: 5432, 
});

const createContatoTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS contatos (
      id SERIAL PRIMARY KEY,
      nome TEXT,
      cargo TEXT,
      nom_empresa TEXT,
      cidade TEXT,
      logemail TEXT,
      descricao TEXT
    )
  `;
  pool.query(query, (err, res) => {
    if (err) {
      console.error('Erro ao criar a tabela de contatos:', err);
    } else {
      console.log('Tabela de contatos criada com sucesso.');
    }
  });
};

createContatoTable();

const insertContato = (contato) => {
  const { nome, cargo, nom_empresa, cidade, logemail, descricao } = contato;
  const query = `
    INSERT INTO contatos (nome, cargo, nom_empresa, cidade, logemail, descricao)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  pool.query(query, [nome, cargo, nom_empresa, cidade, logemail, descricao], (err, res) => {
    if (err) {
      console.error('Erro ao inserir um contato:', err);
    } else {
      console.log('Contato inserido com sucesso.');
    }
  });
};

module.exports = {
  insertContato,
};
