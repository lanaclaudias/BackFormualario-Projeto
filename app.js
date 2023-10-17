const express = require('express');

const contatoRoutes = require('./routes/contatoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conectar ao banco de dados PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'back',
  password: '123456',
  port: 5432, // Porta padrão do PostgreSQL
});

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  } else {
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');

    app.use('/contato', contatoRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
});
module.exports = {
  pool,
};
