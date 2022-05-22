//Скрипты


$(function(){

	setInnerSizes();
	$(window).resize(function(){
		setInnerSizes();
	});


	$(window).scroll(function(){
		var scrollLeft = $(this).scrollLeft();
		$(".main-page .background, .screen-wrapper, .main-page").css("left",-scrollLeft);
	})

	//Слайдер на первом экране
	if ($('.first-slider .slide-wrapper').length > 1){
		$('.first-slider .slide-wrapper').each(function(){
			$(this).hide();
		});
		$('.first-slider .slide-wrapper').eq(0).addClass("visible").show();
	} else {
		$(".first-slider .prev-next-buttons").hide();
	}

	$(".first-slider .next").click(function(){
		var visibleSlide = $('.first-slider .slide-wrapper.visible');
		visibleSlide.fadeOut().removeClass("visible");	

		if (visibleSlide.index() + 1 == $('.first-slider .slide-wrapper').length){
			$('.first-slider .slide-wrapper').eq(0).fadeIn().addClass("visible");
		} else {
			visibleSlide.next().fadeIn().addClass("visible");
		}	
		return false;
	});

	$(".first-slider .prev").click(function(){
		var visibleSlide = $('.first-slider .slide-wrapper.visible');
		visibleSlide.fadeOut().removeClass("visible");

		if (visibleSlide.index() == 0){
			$('.first-slider .slide-wrapper').eq($('.first-slider .slide-wrapper').length - 1).fadeIn().addClass("visible");
		} else {
			visibleSlide.prev().fadeIn().addClass("visible");
		}
		return false;
	});

	//Слайдер на третьем экране
	if ($('.third-slider .slide').length > 1){
		$('.third-slider .slide, .about-order .about-order-table').each(function(){
			$(this).hide();
		});
		$('.third-slider .slide').eq(0).addClass("visible").show();
		$('.about-order .about-order-table').eq(0).addClass("visible").show();
	} else {
		$('#thirdSliderPrev, #thirdSliderNext').hide();
	}

	$("#thirdSliderNext").click(function(){
		var visibleSlide = $('.third-slider .slide.visible');
		var visibleText = $(".about-order .about-order-table.visible");
		visibleSlide.fadeOut().removeClass("visible");
		visibleText.fadeOut().removeClass("visible");

		if (visibleSlide.index() + 1 == $('.third-slider .slide').length){
			$('.third-slider .slide').eq(0).fadeIn().addClass("visible");
			$('.about-order .about-order-table').eq(0).fadeIn().addClass("visible");
		} else {
			visibleSlide.next().fadeIn().addClass("visible");
			visibleText.next().fadeIn().addClass("visible");
		}	
		return false;
	});

	$("#thirdSliderPrev").click(function(){
		var visibleSlide = $('.third-slider .slide.visible');
		var visibleText = $(".about-order .about-order-table.visible");
		visibleSlide.fadeOut().removeClass("visible");
		visibleText.fadeOut().removeClass("visible");

		if (visibleSlide.index()  == 0){
			$('.third-slider .slide').eq($('.third-slider .slide').length - 1).fadeIn().addClass("visible");
			$('.about-order .about-order-table').eq($('.about-order .about-order-table').length - 1).fadeIn().addClass("visible");
		} else {
			visibleSlide.prev().fadeIn().addClass("visible");
			visibleText.prev().fadeIn().addClass("visible");
		}	
		return false;
	});

	//Вход в личный кабинет
	$(".open-cabinet-form").click(function(){
		$(this).closest(".cabinet").find(".cabinet-form").fadeToggle();
		return false;
	});

	$(".open-city-form").click(function(){
		$(this).closest(".change-city").toggleClass("opened").find(".change-city-form").fadeToggle();
		return false;
	});

	$(document.body).click(function(event){
		if ($(event.target).closest(".cabinet-form, .cabinet, .change-password-form, .open-password-form, .change-city-form, .open-city-form").length) return;
		$(".cabinet-form, .change-password-form, .change-city-form").fadeOut();
		$(".change-city").removeClass("opened");
		event.stopPropagation();
	});

	//Выровняем высоту займов
	$(".loans-row").each(function(){
		var loanHeight = 0;
		$(this).find(".loan-block").each(function(){
			if ($(this).outerHeight() > loanHeight){
				loanHeight = $(this).outerHeight();
			}
		});
		$(this).find(".loan-block").css("height",loanHeight);
	});

	//Смена пароля
	$(".open-password-form").click(function(){
		$(this).closest(".change-password").find(".change-password-form").fadeToggle();
		return false;
	});
	$(".change-password-form").submit(function(){
		var error = false;
		var form = $(this);

		$(this).find("input").each(function(){
			if (!$(this).val()){
				form.find(".error-text").text("Не все обязательные поля заполнены.");
				error = true;
			}
		});

		if (!error){
			if ($("#newPass").val() != $("#repeatNewPass").val()){
				form.find(".error-text").text("Пароли не совпадают.");
				error = true;
			}
		}

		if (error){
			return false;
		} else {
			return true;
		}
	});

	//Кредитные вкладки
	$(".about-header a.active").trigger("click");
	$(".about-header a").click(function(){
		$(".about-header a.active").removeClass("active");
		$(this).addClass("active");
		$(".credit-tab").hide();
		$($(this).attr("href")).show();
		$(window).trigger("scroll");
		return false;
	});

	//Маска на телефон
	$(".phone").inputmask("+7(999)999-99-99");

	//Форма консультации
	$(".first-block-inner").append('<div id="popupBackground" class="popup-background"></div>');
	$(".open-cons-form").click(function(){
		$(".cons-form").fadeIn();
		$("#popupBackground").fadeIn();
		$(".cons-form .error").text("");
		$(".cons-form .error-field").removeClass("error-field");
		return false;
	});

	$("body").on("click",".popup-background",function(){
		$(".cons-form").fadeOut();
		$("#popupBackground").fadeOut();
	});

	$(".cons-form").on("keyup input change",".textfield", function(){
		$(this).removeClass("error-field");
	})

	$(".cons-form").submit(function(){
		var error = false;

		$(this).find(".textfield").each(function(){
			if (!$(this).val()){
				error = true;
				$(this).addClass("error-field");
			}
		});

		if (error){
			$(this).find(".error").text("Не все поля заполнены.");
			return false;
		}
	});


});

$(window).load(function () {
    $(window).trigger("resize");

    /*if (window.location.hash != ""){
        var scrollTopFirst = $(window).scrollTop();
        var scrollTopSecond = $(window).scrollTop();

        $('html, body').stop().animate({
                'scrollTop': 0
            }, 0, 'swing');

        $('html, body').stop().animate({
            'scrollTop': $(window.location.hash).offset().top
        }, 1000, 'swing', function () {});
    }*/
    
});

function setInnerSizes(){
	$("#withoutFooter").css("min-height",$(window).height() - $(".footer").outerHeight());

	var headerHeight = 470;
	$(".action-header-wrapper.picture-header>div").css("min-height",0);
	$(".action-header-wrapper.picture-header>div").each(function(){
		if ($(this).outerHeight() > headerHeight){
			headerHeight = $(this).outerHeight();
		}
	});
	$(".action-header-wrapper.picture-header>div").css("min-height",headerHeight)
}

//Redirect by script
function RedirectToPage(hrefUrl) {
    location.href = hrefUrl;
}