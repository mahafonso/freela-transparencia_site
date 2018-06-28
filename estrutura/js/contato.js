
msgsGenericas = {
    campoObrigatorio : "Este campo é obrigatório"
}

$("#frmContato").validate({
    rules : {
        nome: { required:true, maxlength: 100},
        email: { required:true, email: true, maxlength:50},
        assunto: { required:true},
        mensagem: { required:true, maxlength : 500}
    },
    messages : {
        nome : {
            required: msgsGenericas.campoObrigatorio,
            maxlength : "O nome digitado não pode ser maior que 100 caracteres."
        },
        email : {
            required: msgsGenericas.campoObrigatorio,
            email : "Digite um endereço de e-mail válido.",
            maxlength : "O email digitado não pode ser maior que 50 caracteres."
        },
        assunto : {
            required : "Selecione um assunto."
        },
        mensagem: {
            required : "O campo mensagem é obrigatório.",
            maxlength : "A mensagem não pode ser maior que 500 caracteres."
        }
    }
});