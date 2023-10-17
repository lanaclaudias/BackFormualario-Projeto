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
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  } else {
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');

     // Configurar rota para lidar com solicitações POST do formulário
     app.post('/contato/enviar', (req, res) => {
      const { nome, cargo, nom_empresa, cidade, logemail, descricao } = req.body;

      // Inserir os dados no banco de dados
      const query = 'INSERT INTO contatos (nome, cargo, nom_empresa, cidade, logemail, descricao) VALUES ($1, $2, $3, $4, $5, $6)';
pool.query(query, [nome, cargo, nom_empresa, cidade, logemail, descricao], (error, result) => {
  // Resto do código

        if (error) {
          console.error('Erro ao inserir dados no banco de dados:', error);
          res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
        } else {
          console.log('Dados inseridos com sucesso.');
          res.status(200).json({ message: 'Dados inseridos com sucesso' });
        }
      });
    });
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
});

module.exports = {
  pool,
};
