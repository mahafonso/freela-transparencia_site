/// <reference path="jquery-1.11.3.min.js" />

var FrontEnd = {
    Init: function () {
        this.Browser();
        this.CustomForms.Init();
        this.Events();
    },
    Events: function () {
        //BX_SLIDER
        if ($(document).find('.bxslider').length !== 0) {
            $('.bxslider').bxSlider({
                video: true,
                useCSS: true,
                adaptiveHeight: true,
                mode: 'horizontal',
                slideWidth: 1280,
                onSlideNext : function(slideElement, oldIndex, newIndex){ registrarEvento('destaque_principal_setas', 'clique', 'para_frente') }, /* $(slideElement).find('img').attr('title'))*/ 
                onSlidePrev : function(slideElement, oldIndex, newIndex){ registrarEvento('destaque_principal_setas', 'clique', 'para_tras') }
            });
        }

        //SCROLL EVENTS - MENU
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            var header = $('.wr-header');
            var headerH = $('.wr-header').height();

            //console.log(scroll);            
            //console.log(headerH);
            scroll >= headerH * 1.5 ? header.addClass('fixed') : header.removeClass('fixed');

            if ($(document).find('.pg-home .ct-carousel').length !== 0) {
                var carouselH = $('.ct-carousel').height();
                scroll >= headerH & scroll <= carouselH - headerH * 6 ? header.addClass('hidden') : header.removeClass('hidden');
            } else {
                scroll >= headerH & scroll <= headerH * 1.5 ? header.addClass('hidden') : header.removeClass('hidden');
            };
        });
        
        //MENU       
        /*$(function () {
            var url = window.location.pathname,
                urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");
            $('.wr-header .ct-mn .mn ul li a').each(function () {
                if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
                    $(this).addClass('ativo');
                }
            });
        });*/

        //QUEM SOMOS - TÍTULO DINAMICO
        $('.tab-wr .tab-mn .btn').each(function () {
            var Title = $(this).html();
            var idTitle = $(this).attr('data-index');

            $('.tab-wr .tab-content .bx').each(function () {

                if ($(this).attr('id') == idTitle) {
                    $(this).children('h4').html(Title);
                }
            });
        });

        //TABS
        $('.tab-wr .tab-mn .btn').on("click", function (e) {
            e.preventDefault();
            $('.tab-wr .tab-mn .btn').removeClass('ativo');
            $(this).addClass('ativo');

            var id = $(this).attr('data-index');

            $('.tab-wr .tab-content .bx').each(function () {
                $(this).hide();
                if ($(this).attr('id') == id) {
                    $(this).stop().show();
                }
            });
        });

        //LIGHTBOX
        $('.btn-abrir-modal').on('click', function () {
            $('.overlay').fadeIn(400, function () {
                $('.bx-modal').fadeIn(400);
            });
        })
        $('.bx-modal .header .btn-fechar, .overlay').on('click', function () {
            $('.bx-modal').fadeOut(400, function () {
                $('.overlay').eq(0).fadeOut(400);
            });
        });

        //CHARACTER LIMIT
        $('.char-limit-3').each(function () {
            var limit = $(this).children('p');

            if (limit.text().length > 300) {
                limit.text(limit.text().substring(0, 300));
                limit.append('[...]');
            }
        });
        $('.char-limit-2').each(function () {
            var limit = $(this).children('p');

            if (limit.text().length > 200) {
                limit.text(limit.text().substring(0, 200));
                limit.append('[...]');
            }
        });
        $('.char-limit-1').each(function () {
            var limit = $(this).children('p');

            if (limit.text().length > 100) {
                limit.text(limit.text().substring(0, 100));
                limit.append('[...]');
            }
        });


        //NAVIGATION FILTER
        if ($(document).find('.bx-lista-filtro').length !== 0) {
            $('.bx-lista-filtro ul').listnav();
        }

        //CUSTOM SCROLL
        if ($(document).find('.bx-scrollpane').length !== 0) {
            $('.bx-scrollpane').jScrollPane();
        }

        //GO BACK
        $('.btn.voltar').on('click', function () {
            window.history.back();
        });

    },

    CustomForms: {
        Init: function () {
            $('select,input').each(function (i, obj) {
                if (obj.tagName == 'SELECT' && obj.type != 'select-multiple') {
                    var text = $('option:selected', obj).text();
                    var count = $(this).siblings('.select').size();
                    if (count == 0) {
                        $(obj).before('<span id="select_' + obj.id + '" class="select">' + text + '</span>');
                    }
                }
                else if (obj.tagName == 'INPUT') {
                    switch (obj.type) {
                        case 'radio':
                            var status = obj.checked ? ' ativo' : '';
                            $(obj).siblings('label').attr('class', 'radio' + status);
                            break;
                        case 'checkbox':
                            var status = obj.checked ? ' ativo' : '';
                            $(obj).siblings('label').attr('class', 'checkbox' + status);
                            break;
                        case 'file':
                            $(obj).before('<span id="file_' + obj.id + '" class="file"></span>');
                            break;
                    }
                }
            });
            $(document).on('change', 'select', function () {
                var text = $('option:selected', this).text();
                $(this).siblings('.select').html(text);
            });

            $(':radio').on('change', function () {
                //console.log('ID: ' + $(this).attr('id'));
                //console.log('Radio: ' + $(this).is(':checked'));

                var nameGroup = $(this).attr('name');
                $(':radio').each(function (i, obj) {
                    if ($(obj).attr('name') == nameGroup) {
                        $(obj).siblings('label.radio').removeClass('ativo');
                    }
                });

                if ($(this).is(':checked')) {
                    var id = $(this).attr('id');
                    $('label.radio[for=' + id + ']').addClass('ativo');
                }
            });

            $(':checkbox').on('change', function () {
                //console.log('ID: ' + $(this).attr('id'));
                //console.log('Check: ' + $(this).is(':checked'));

                if ($(this).is(':checked')) {
                    $(this).siblings('label.checkbox').addClass('ativo');
                }
                else {
                    $(this).siblings('label.checkbox').removeClass('ativo');
                }
            });
        },
        Reload: function () {
            this.Destroy();
            this.Init();
        },
        Destroy: function () {
            $(document).find('span.select, span.radio, span.checkbox').remove();
        }
    },
    getSizes: function () {
        var docW = $(document).width();
        var docH = $(document).height();
        var winW = $(window).width();
        var winH = $(window).height();
        return { docWidth: docW, docHeight: docH, winWidth: winW, winHeight: winH };
    },
    getRandomInt: function () {
        var min = 1000;
        var max = 9999;
        return Math.floor(Math.random() * (max - min)) + min;
    },

    Browser: function () {
        var browser = (function () {
            if (window.ActiveXObject === undefined) {
                if (!!window.chrome) return 'chrome';
                if (!!window.sidebar) return 'firefox';
                if (!!window.opera || /opera|opr/i.test(navigator.userAgent)) return 'opera';
                if (/constructor/i.test(window.HTMLElement)) return 'safari';
            }
            else {
                if (document.all && !document.compatMode) return 'ie ie-older ie5';
                if (document.all && !window.XMLHttpRequest) return 'ie ie-older ie6';
                if (!document.querySelector) return 'ie ie-older ie7';
                if (!document.addEventListener) return 'ie ie-older ie8';
                if (!window.atob) return 'ie ie-newer ie9';
                if (!document.__proto__) return 'ie ie-newer ie10';
                if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) return 'ie ie-newer ie11';
            }
        })();
        var mobile = (function () {
            if (navigator.userAgent.match(/Android/i) != null) return 'android';
            if (navigator.userAgent.match(/iPhone/i) != null) return 'iphone';
            if (navigator.userAgent.match(/iPad/i) != null) return 'ipad';
            if (navigator.userAgent.match(/iPod/i) != null) return 'ipod';
            if (navigator.userAgent.match(/IEMobile/i) != null) return 'iemobile';
            if (navigator.userAgent.match(/Opera Mini/i) != null) return 'opera-mini';
            if (navigator.userAgent.match(/BlackBerry/i) != null) return 'blackberry';
            else { return 'desktop' }
        })();
        var os = (function () {
            if (navigator.userAgent.match(/Macintosh/i) != null) return 'macintosh';
            if (navigator.userAgent.match(/Windows/i) != null) return 'windows';
            if (navigator.userAgent.match(/Linux/i) != null) return 'linux';
        })();
        $('.wr-site').addClass(os).addClass(browser).addClass(mobile);
    },
    Scroll: {
        toValue: function (scrollValue) {
            $('html, body').animate({ scrollTop: scrollValue - 60 }, 600, 'easeOutSine');
        },
        toElement: function (selector) {
            var pos = $(selector).offset();
            $('html, body').animate({ scrollTop: pos.top - 60 }, 600, 'easeOutSine');
        },
        getValue: function () {
            return $(window).scrollTop();
        }
    },
};

$(document).ready(function () {
    FrontEnd.Init();
});

function abrirModal(titulo, texto, nomeLink, link){
    $('#modal-texto').text('');
    $('#modal-conteudo').text('');

    if(titulo.length == 0 )
        $('#modal-titulo').hide();
    else{
        $('#modal-titulo').show();
        $('#modal-titulo').text(titulo);
    }
    
    $('#modal-texto').text(texto);
    if(nomeLink != null && link != null)
        $('#modal-conteudo').append('<a href="' + link +'">' + nomeLink + '</a>');
    // abre o modal
    $('.overlay').fadeIn(400, function () {
        $('.bx-modal').fadeIn(400);
    });
}

function abrirDoacao(){
    var url = 'https://pagseguro.uol.com.br'; // https://pagseguro.uol.com.br
    var form = '<form action="' + url + '/checkout/v2/donation.html" id="formDoacaoPost" target="_blank" style="display:none" method="post"><input type="hidden" name="currency" value="BRL" /><input type="hidden" name="receiverEmail" value="doacoes@transparencia.org.br" /></form>';

    $("body").append(form);
    $("#formDoacaoPost").submit();

}