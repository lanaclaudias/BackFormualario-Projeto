const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { insertContato, getContatos } = require('../models/contatoModel');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sensortechcontato@gmail.com',
    pass: 'hoflzumnygixrnii',
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
console.log(req.body)
      const mailOptions = {
        from: 'sensortechcontato@gmail.com',
        to: logemail,
        subject: 'Contato',
        html: await ejs.renderFile('template.ejs', {
          nome,
          cargo,
          nom_empresa,
          cidade,
          descricao,
        }),
      };

      await transporter.sendMail(mailOptions);

      // Call the function to insert data into the database
       insertContato( nome, cargo, nom_empresa, cidade, logemail, descricao );

      res.json({ message: 'Contato criado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o contato' });
    }
  },

  listarContatos: async (req, res) => {
    try {
      const contatos = await getContatos();
      res.json(contatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar contatos' });
    }
  },
};

module.exports = contatoController;
