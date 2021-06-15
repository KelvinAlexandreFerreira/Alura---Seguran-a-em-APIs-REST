const passport = require('passport');
const LocalEstrategy = require('passport-local').Strategy;
const BearerEstrategy = require('passport-http-bearer').Strategy;

const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');

const bcrypt = require('bcrypt');

const tokens = require('./tokens');

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com este email');
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('E-mail ou senha inválidos');
    }
}

passport.use(
    new LocalEstrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senhaHash);
            done(null, usuario);
        } catch (erro) {
            done(erro);
        }
    })
)

passport.use(
    new BearerEstrategy(
        async (token, done) => {
            try {
                const id = await tokens.access.verifica(token);
                const usuario = await Usuario.buscaPorId(id);
                done(null, usuario, { token });
            } catch (erro) {
                done(erro);
            }
        }
    )
)