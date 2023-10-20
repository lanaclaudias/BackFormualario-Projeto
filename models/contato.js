const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'back',
  password: '123456',
  port: 5432,
});
/*
const createContatoTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS contatos (
      id SERIAL PRIMARY KEY,
      nome STRING,
      cargo STRING,
      nom_empresa STRING,
      cidade STRING,
      logemail STRING,
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
*/
const insertContato = async (contato) => {
  const { nome, cargo, nom_empresa, cidade, logemail, descricao } = contato;
  const query = `
    INSERT INTO contatos (nome, cargo, nom_empresa, cidade, logemail, descricao)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  try {
    const result = await pool.query(query, [nome, cargo, nom_empresa, cidade, logemail, descricao]);
    console.log('Contato inserido com sucesso.');
    return result;
  } catch (error) {
    console.error('Erro ao inserir um contato:', error);
    throw error;
  }
};

module.exports = {
  insertContato,
  createTable: createContatoTable,
  pool,
};
