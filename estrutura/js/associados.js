
var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 9 ? '00000-0000' : '0000-00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};

$(document).ready(function(){

    $("#CodigoValorDoacao").trigger('change');

    outroValor = $("#OutroValor").val();
    if(outroValor != null && outroValor != undefined && outroValor != ''){
        $("#dd-outroValor").show();
    }

    $("#CodigoValorDoacao").change(function(){
        valor = parseInt($(this).val(), 10);
        if(valor == 6)
            $("#dd-outroValor").show();
        else
            $("#dd-outroValor").hide();
    });

    $('.ddd').mask('99');
    $('.tel').mask(SPMaskBehavior, spOptions);
    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.numero').mask('###.##0,00', {reverse: true});


    $("input[name='tipoDocumento']").click(function(){
        $("#cpf-box").hide();
        $("#cnpj-box").hide();
        if($(this).val() == '1'){
            $("#cpf-box").show();
        }else{
            $("#cnpj-box").show();
        }
    });

    msgsGenericas = {
        campoObrigatorio : "Este campo é obrigatório"
    }

    $("#frmAssociado").validate({
        rules : {
            nome: { required:true, maxlength: 100},
            cpf: { required:true, maxlength: 15},
            cnpj: { required:true, maxlength: 18},
            email: { required:true, email: true, maxlength:50},
            celular : { required:true, maxlength:2, minlength:2},
            celular : { required:true, maxlength:10, minlength:9},
            uf: { required:true},
            cidade: { required:true},
            aceiteObjetivos : { required:true},
            aceiteNormas : {required: true},
            aceiteJustica : {required: true},
            escolaridade : {required: true}
        },
        messages : {
            nome : {
                required: msgsGenericas.campoObrigatorio,
                maxlength : "O nome digitaido não pode ser maior que 100 caracteres."
            },
            cpf : {
                required: msgsGenericas.campoObrigatorio,
                maxlength : "O cpf digitado deve ter 11 caracteres.",
                maxlength : "O cpf digitado não pode ser maior que 11 caracteres."
            },
            cnpj : {
                required: msgsGenericas.campoObrigatorio,
                maxlength : "O cnpj digitado deve ter 14 caracteres.",
                maxlength : "O cpf digitado não pode ser maior que 18 caracteres."
            },
            email : {
                required: msgsGenericas.campoObrigatorio,
                email : "Digite um endereço de e-mail válido.",
                maxlength : "O email digitado não pode ser maior que 50 caracteres."
            },
            celular : {
                required: msgsGenericas.campoObrigatorio,
                minlength : "O número celular digitado deve ter pelo menos 8 dígitos.",
                maxlength : "O número de celular digitado não pode ser maior que 9 caracteres."
            },
            celularddd : {
                required: msgsGenericas.campoObrigatorio,
                minlength : "O DDD do celular deve ter 2 dígitos.",
                maxlength : "O DDD do celular deve ter 2 dígitos."
            },
            uf : {
                required : "Selecione um estado."
            },
            cidade: {
                required : "Digite o nome da sua cidade"
            },
            aceiteObjetivos : {
                required: msgsGenericas.campoObrigatorio
            },
            aceiteNormas : {
                required: msgsGenericas.campoObrigatorio
            },
            aceiteJustica : {
                required: msgsGenericas.campoObrigatorio
            },
            escolaridade : {
              required: msgsGenericas.campoObrigatorio  
            }
        }
    });
});

