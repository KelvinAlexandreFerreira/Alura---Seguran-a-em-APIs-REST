# Blog do código
> Um blog simples em Node.js

Projeto usado nos cursos:
1. Node.js e JWT: autenticação com tokens
2. Node.js: Refresh Tokens e confirmação de cadastro

Anotações Kelvin:

Para gerar a senha pseudo aleatória para usar como senha do servidor, execute no terminal:
node -e "console.log( require('crypto').randomBytes(256).toString('base64'))"