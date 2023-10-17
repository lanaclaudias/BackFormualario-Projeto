const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const contatoController = require('../controllers/contatoControllers');

router.post(
  '/enviar',
  [
    check('nome').notEmpty().withMessage('O campo Nome é obrigatório'),
    check('cargo').notEmpty().withMessage('O campo Cargo é obrigatório'),
    check('logemail').isEmail().withMessage('Insira um email válido'),
    check('descricao').notEmpty().withMessage('Faça uma descrição do que deseja da nossa empresa'),
    check('cidade').notEmpty().withMessage('Digite sua cidade'),
    check('nom_empresa').notEmpty().withMessage('Nome da Empresa é obrigatório'),
  ],
  contatoController.criarContato
);
router.get('/contatos', contatoController.listarContatos);



module.exports = router;
