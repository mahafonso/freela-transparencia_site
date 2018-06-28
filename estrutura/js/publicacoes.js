$(document).ready(function(){
	$("#Categoria").change(function(){
		pesquisarPublicacoes(1);
	});

	$("#Ano").change(function(){
		pesquisarPublicacoes(1);
	});

	$("#Busca").bind('keydown keyup',function(e){
		if(e.keyCode == 13)
			$('#btnPesquisar').click();
	});

	$('#btnPesquisar').click(function(){
		pesquisarPublicacoes(2);
	});

	if(window.location.hash == '#relatorios'){
		$("#Ano option:contains(2015)").attr('selected', true);
		$("#Categoria option:contains('Relatórios')").attr('selected', true);

		$("#Categoria").trigger('change');
	}

});

function pesquisarPublicacoes(tipo)
{
	url = "";
	if(tipo == 1){
		url = base_url + 'publicacoes/pesquisarPublicacoes/';
		categoria = $("#Categoria").val();
		ano = $("#Ano").val();
		if((ano <= 0 || isNaN(ano))){
			return;
		}
		data = {ano : ano, categoria : categoria};
	}else{
		busca = $("#Busca").val().toString();
		if(busca.length < 3){
			alert('Digite pelo menos três letras para a busca.');
			return;
		}

		registrarEvento('busca', 'clique', busca);
		url = base_url + 'publicacoes/pesquisarPublicacoesPorBusca/';
		data = {busca : busca};
	}



	$.ajax({
			url : url,
			method : 'POST',
			data : data,
			dataType : 'json',
			success : function(data){

				if(data.erro != null){
					alert(data.msg);
				}else{
					var template = '<li class="bx-highlight"><div class="bx-txt"><a href="{URL}" onclick="registrarEvento(\'publicacao\', \'clique\', \'{NOME}\');" target="_blank"><h4>{NOME}</h4><p>{DESCRICAO}</p><div class="mask"></div></a></div></li>';
					var elementos = "";
					$('.itensPublicacoes').html('');

					if(Object.keys(data).length > 0){
						$.each(data, function(j, i){
							urlDownload = i.Arquivo == null || i.Arquivo.length == 0 ? i.Link == null || i.Link.length == 0 ? "javascript:void(0);" : i.Link : base_url + 'downloads/publicacoes/' + i.Arquivo;
							descricao = i.Descricao.length > 180 ? i.Descricao.substr(0, 177) + "..." : i.Descricao;							
							elementos += template.replace(/{NOME}/g, i.Nome).replace(/{URL}/g, urlDownload).replace(/{DESCRICAO}/g,descricao);;
						});

						$('.itensPublicacoes').html(elementos);
					}else{
						$('.itensPublicacoes').html('<li>Nenhum artigo encontrado para a busca ou para o ano / categoria selecionados.</li>');
					}
				}
			},
			error : function(erro, erro1, erro2)
			{
				$('#itensPublicacoes').html('<li>Erro ao buscar informações das publicações.</li>');
			}
		});
}