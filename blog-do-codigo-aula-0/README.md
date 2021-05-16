# Blog do código
> Um blog simples em Node.js

Anotações Kelvin:

Para gerar a senha pseudo aleatória para usar como senha do servidor, execute no terminal:
node -e "console.log( require('crypto').randomBytes(256).toString('base64'))"