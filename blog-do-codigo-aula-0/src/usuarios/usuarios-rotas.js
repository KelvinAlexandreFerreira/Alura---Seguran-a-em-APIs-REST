const usuariosControlador = require('./usuarios-controlador');
const middlewaresAutenticacao = require('./middlewaresAutenticacao');
const Usuario = require('./usuarios-modelo');

module.exports = app => {

  app
    .route('/usuario/atualiza_token')
    .post(middlewaresAutenticacao.refresh, usuariosControlador.login);

  app
    .route('/usuario/login')
    .post(middlewaresAutenticacao.local, usuariosControlador.login);

  app
    .route('/usuario/logout')
    .post(
      [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer], 
      usuariosControlador.logout
    );

  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app
    .route('/usuario/verifica_email/:id')
    .get(
      middlewaresAutenticacao.verificaoEmail,
      usuariosControlador.verificaEmail
      );

  app.route('/usuario/:id')
    .delete(
      middlewaresAutenticacao.bearer,
      usuariosControlador.deleta
    );
};
