const nodemailer = require('nodemailer');

class Email{
    async enviaEmail() {
        const contaTeste = await nodemailer.createTestAccount();
        const transportador = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: contaTeste,
        });
        const info = await transportador.sendMail(this);
    
        console.log(nodemailer.getTestMessageUrl(info));
    }
}

class EmailVerificacao extends Email{
    constructor(usuario, endereco){
        super();
        this.from = '"Blog do código" <noreply@blogdocodigo.com.br>';
        this.to = usuario.email;
        this.subject = 'Verificação de e-mail';
        this.text = `Olá! Verifique Seu e-mail aqui: ${endereco}`;
        this.html = `<h1>Olá!</h1> Verifique Seu e-mail aqui: <a href="${endereco}">${endereco}</a>`;
    }
}

module.exports = { EmailVerificacao };