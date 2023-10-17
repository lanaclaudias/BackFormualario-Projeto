const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const ejs = require('ejs'); // Importe o módulo EJS
const { insertContato, getContatos } = require('../models/contatoModel'); // Certifique-se de importar as funções corretamente

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sensortechcontato@gmail.com', // Substitua pelo seu email
    pass: 'hoflzumnygixrnii', // Substitua pela senha do seu email
  },
});

const contatoController = {
  criarContato: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, cargo, logemail, nom_empresa, cidade, descricao } = req.body;

      const mailOptions = {
        from: 'sensortechcontato@gmail.com',
        to: logemail,
        subject: 'Contato',
        // Use EJS para criar um e-mail HTML personalizado
        html: await ejs.renderFile('template.ejs', {
          nome, cargo, nom_empresa, cidade, descricao,
        }),
      };

      await transporter.sendMail(mailOptions);

      // Chame a função para inserir os dados no banco de dados
      insertContato({ nome, cargo, nom_empresa, cidade, logemail, descricao });

      res.json({ message: 'Contato criado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o contato' });
    }
  },

  listarContatos: async (req, res) => {
    try {
      const contatos = await getContatos(); // Chame a função para obter a lista de contatos do banco de dados
      res.json(contatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar contatos' });
    }
  },
};

module.exports = contatoController;
