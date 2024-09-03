/*
    Яндекс карты
*/
window.onload = function() {
    ymaps.ready(initFirstScreenMap);
}

        
function initFirstScreenMap(){
    
    var firstScreenMap = new ymaps.Map("map1", {
        center: [56.828640, 60.594645],
        zoom: 18,
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([56.828640, 60.594645], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/point-icon.svg',
        iconImageSize: [53.56, 64],
    });

    firstScreenMap.geoObjects.add(myPlacemark); 


}

function chooseSalonMap(){
    var chooseSalonMap = new ymaps.Map("map2", {
        center: [56.828640, 60.594645],
        zoom: 15,
        controls: []
    });

    chooseSalonMap.behaviors.disable('scrollZoom');
}

function chooseSalonMapInModal(){
    var chooseSalonMapInModal = new ymaps.Map("map3", {
        center: [56.828640, 60.594645],
        zoom: 15,
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([56.828640, 60.594645], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/point-icon.svg',
        iconImageSize: [53.56, 64],
        balloonContentHeader: "Балун метки",
        balloonContentBody: "Содержимое <em>балуна</em> метки",
        balloonContentFooter: "Подвал",
        hintContent: "Хинт метки"
    });

    chooseSalonMapInModal.geoObjects.add(myPlacemark);

    chooseSalonMapInModal.geoObjects.events.add('click', function (e) {
        console.log(e)
    })
}





$(document).ready(function(){
    /*
        Анимация с появлением блоком
    */
    ;(function($){
        $.fn.fadeInDelay = function(){
            var init = function(){
                $(this).hide().delay($(this).data('delay')).fadeIn();
                $(this).addClass('delayTrue');
            };
            return this.each(init);
        };
    }(jQuery));

    $(".burger").click(function () {
        $(this).toggleClass('active');
        $(".menu").toggleClass('active');
    });

    $(document).scroll(function () {
        s_top = $("html").scrollTop();
        
        subscribeBlock = $("#subscribe-block").offset().top;
        advantegesMoreBlock = $(".advanteges-more").offset().top;
        reviewsBlock = $('#reviews').offset().top;
        chooseSalon = $('#choose-salon').offset().top;

        if(s_top > subscribeBlock - 850){
            $(".subscribe-form").addClass('scale');
        }else{
            $(".subscribe-form").removeClass('scale');
        }

        if(s_top > advantegesMoreBlock - 700 && !$('.advanteges-more>.item').hasClass('delayTrue')){
            $('.advanteges-more>.item').fadeInDelay();
        }

        if(s_top > chooseSalon - 500){
            if(!$('#map2').hasClass('active')){
                chooseSalonMap();
                $('#map2').addClass('active');
            }
        }

        if(s_top > reviewsBlock - 1000){
            $('#reviews iframe').each(function( index ) {
                srcAttr = $(this).attr('src');
                if(srcAttr == undefined){
                    var src = $(this).data('src');
                    $(this).attr('src', src);
                }
            });
        }
    });

    

    $('.slider-about-company').slick({
        centerMode: true,
        centerPadding: '0px',
        variableWidth: true,
        slidesToShow: 3,
        prevArrow: $('.about-company-prev'),
        nextArrow: $('.about-company-slider-next'),
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      });

      $('.slider-how-to-get').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrow: true,
        lazyLoad: 'ondemand',
        prevArrow: '<button class="slick-prev how-to-get-slider-prev slick-arrow" aria-label="Next" type="button" style="display: flex;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6001 11.9996L15.2001 5.59961M21.6001 11.9996L15.2001 18.3996M21.6001 11.9996H1.6001" stroke="#8D919D"></path></svg></button>',
        nextArrow: '<button class="slick-next how-to-get-slider-next slick-arrow" aria-label="Next" type="button" style="display: flex;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6001 11.9996L15.2001 5.59961M21.6001 11.9996L15.2001 18.3996M21.6001 11.9996H1.6001" stroke="#8D919D"></path></svg></button>',
      });
        
      $('.tabs-block>.item').click(function(){
          var type = $(this).data('type');
          $('.tabs-block>.item').removeClass('active');
          $(this).addClass('active');
          $('.slider-wrap').removeClass('active');
          $('#' + type).addClass('active');
          $('.slider-how-to-get').slick('reinit');
      })

      $("input[name=date]").datepicker();
      $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

      

    var wow = new WOW(
    {
        boxClass:     'animate-block-fadeInDown',      
        animateClass: 'visible animated fadeInDown full-visible', 
        offset:       150,          
        mobile:       true,       
        live:         true,       
        callback:     function(box) {},
        scrollContainer: null 
    }
    );
    wow.init();


    $('.close,.modal-back-layer').click(function(){
        $('.modal').removeClass('active');
        $('.modal-back-layer').fadeOut(0);
    })

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('.modal').removeClass('active');
            $('.modal-back-layer').fadeOut(0);
       }
   });

    $('[data-modal]').click(function(){
        var modal = $(this).data('modal');
        if(modal == 'modal-choose-salon'){
            console.log(modal);
            $('#' + modal).addClass('active');
            $('#modal-make-appointment').removeClass('active');
            if(!$('#map3').hasClass('mapInit')){
                chooseSalonMapInModal();
            }
            $('#map3').addClass('mapInit');
        }else{
            $('#' + modal).addClass('active');
            $('.modal-back-layer').fadeIn(0);
        }
        
        return false;
    })

    $('#backModalMakeAppointment').click(function(){
        $('#modal-choose-salon').removeClass('active');
        $('#modal-make-appointment').addClass('active');
    })
    

});



//Якоря
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}


function selectInit(){

    $(".select-ui").each(function( index ) {
        
        var arr = [];

        var values = '<div class="values">';

        $(this).find('select').find('option').each(function( index2 ){
            var text = $(this).text();
            var val = $(this).val();
            
            if($(this).prop('selected')){
                $(this).parent().parent().find('.value>span').text(text)
            }

            values += '<div data-val="' + val + '" class="item">' + text + '</div>';
        });
        values += '</div>';
        $(this).append(values);
    });


    $('.select-ui>.values>.item').click(function(){
        var text = $(this).text();
        var val = $(this).data('val');
        var value = $(this).parent().parent().find('.value');
        var select = $(this).parent().parent().find('select');

        value.find('span').text(text);
        select.val(val);
        $(this).parent().toggleClass('active');
        $(this).parent().parent().find('.value').toggleClass('active');
    })

    $('.select-ui>.value').click(function(){
        var parent = $(this).parent();

        $(this).toggleClass('active');
        parent.find('.values').toggleClass('active');
    })
}

selectInit();


$(".input-ui.phone>input").mask("+7 (999) 999-99-99");


