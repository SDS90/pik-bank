//Форма заявки


$(function(){

	//Кнопки - выбор юридического статуса

	//$("#status").val($(".check-status button.active").data("status"));
	$(".check-status button.active").each(function(){
		$(this).closest(".check-status").find(".status").val($(this).data("status"));

		$(this).closest(".about-founder").find(".founder-data").removeClass("show-block").hide();
		if ($(this).data("show") == "founder-fiz"){
			$(this).closest(".about-founder").find(".founder-fiz").addClass("show-block").show();
		} else {
			$(this).closest(".about-founder").find(".founder-ooo").addClass("show-block").show();
		}
	});

	$("body").on("click",".check-status button",function(){
		$(this).closest(".check-status").find("button.active").removeClass("active");
		$(this).addClass("active");
		$(this).closest(".check-status").find(".status").val($(this).data("status"));

		$(this).closest(".about-founder").find(".founder-data").removeClass("show-block").hide();
		//$(this).closest(".about-founder").find("." + $(this).data("show")).show();

		if ($(this).data("show") == "founder-fiz"){
			$(this).closest(".about-founder").find(".founder-fiz").addClass("show-block").show();
		} else {
			$(this).closest(".about-founder").find(".founder-ooo").addClass("show-block").show();
		}

		if ($(this).hasClass("ip-button")){
			$(".kpp").hide();
			$(".inn-field").attr("maxlength",12);
		} else {
			$(".kpp").show();
			$(".inn-field").attr("maxlength",10);
		}
		return false;
	});

	//Учредители
	$("body").on("click",".open-founder-block",function(){
		$(this).closest(".founder-block").find(".about-founder").slideToggle();
		$(this).toggleClass("opened");
		return false;
	});

	//Тот же, что и диркетор
	$("body").on("change",".founder-director",function(){
		var founder = $(this).closest(".founder-data").find(".founder");
		if ($(this).prop("checked")){
			founder.hide();
		} else {
			founder.show();
		}
	});

	//Я уже обращался к вам!
	$("#repeatvisit").change(function(){
		if ($(this).prop("checked")){
			$(".cabinet-form").fadeIn();
			$(".cabinet-form input").eq(0).focus();
			return false;
		}
	});

	//Календари

	//Подключаем руссификацию календаря
	$.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    //подключаем руссификацию
	$.datepicker.setDefaults(
        $.extend($.datepicker.regional["ru"])
  	);

	$( "#order-company-date, #director-birthdate, #director-passport, #founder-1-burthdate, #founder-1-passport-date, #founder-1-company-date" ).datepicker({
		showOn:"focus", 
	    buttonImageOnly:true,
	    changeMonth: true,
	    changeYear: true,
	    dateFormat: 'd MM, yy'
	});


	//Добавить учредителя
	var foundersCount = 2;
	$("body").on("click",".update-founders",function(){
		var founderHTML = $("#founderHTML").html();
		$(".founders-wrapper").append(founderHTML);

		var lastFounder = $(".founders-wrapper .founder-block:last");

		lastFounder.find(".founder-number").text(foundersCount);
		lastFounder.find(".status").attr("id","founder-" + foundersCount + "-status");

		lastFounder.find(".founder-director").attr("id","founder-director-" + foundersCount);
		lastFounder.find(".founder-director-label").attr("for","founder-director-" + foundersCount);

		lastFounder.find(".founder-burthdate").attr("id","founder-" + foundersCount + "-burthdate");
		lastFounder.find(".founder-passport-date").attr("id","founder-" + foundersCount + "-passport-date");
		lastFounder.find(".founder-company-date").attr("id","founder-" + foundersCount + "-company-date");

		$(".phone").inputmask("+7(999)999-99-99");

		$( "#founder-" + foundersCount + "-burthdate, #founder-" + foundersCount + "-passport-date, #founder-" + foundersCount + "-company-date" ).datepicker({
			showOn:"focus", 
		    buttonImageOnly:true,
		    changeMonth: true,
		    changeYear: true,
		    dateFormat: 'd MM, yy'
		});

		foundersCount++;
		return false;
	});

	//Удалить учредителя
	$("body").on("click",".delete-founder",function(){
		var fieldset = $(this).closest("fieldset");
		$(this).closest(".founder-block").remove();

		foundersCount = 1;

		fieldset.find(".founder-block").each(function(){
			$(this).find(".founder-number").text(foundersCount);
			$(this).find(".status").attr("id","founder-" + foundersCount + "-status");

			$(this).find(".founder-director").attr("id","founder-director-" + foundersCount);
			$(this).find(".founder-director-label").attr("for","founder-director-" + foundersCount);

			$(this).find(".founder-burthdate").attr("id","founder-" + foundersCount + "-burthdate");
			$(this).find(".founder-passport-date").attr("id","founder-" + foundersCount + "-passport-date");
			$(this).find(".founder-company-date").attr("id","founder-" + foundersCount + "-company-date");

			$(".phone").inputmask("+7(999)999-99-99");

			$( "#founder-" + foundersCount + "-burthdate, #founder-" + foundersCount + "-passport-date, #founder-" + foundersCount + "-company-date" ).datepicker({
				showOn:"focus", 
			    buttonImageOnly:true,
			    changeMonth: true,
			    changeYear: true,
			    dateFormat: 'd MM, yy'
			});

			foundersCount++;
		});
		return false;
	});

	//Переключаем страницы
	$("body").on("click",".order-form-wrapper .next-button, .order-form-wrapper .submit-button",function(){

		var fieldset = $(this).closest("fieldset");
		var capital = 0;
		var error = false;


		fieldset.find(".show-block").each(function(){

			if (!$(this).closest("#founderHTML").length){

				var showBlock = $(this);

				if ($(this).find(".founder-director").prop("checked")){

					showBlock.find(".two-columns .required-field").each(function(){
						if (!$(this).val()){
							$(this).closest(".textfield-wrapper, .column").addClass("error-textfield");
							fieldset.find(".error-text").text("Не все обязательные поля заполнены.");
							error = true;
						}
					});
				} else {
					//Проверяем обязательные поля
					showBlock.find(".required-field").each(function(){
						if (!$(this).val()){
							$(this).closest(".textfield-wrapper, .column").addClass("error-textfield");
							fieldset.find(".error-text").text("Не все обязательные поля заполнены.");
							error = true;
						}
					});

					//Проверяем почту
					if (!error){
						showBlock.find(".email-field").each(function(){
							if (!$(this).val().match( /^([A-Za-z0-9_\.-]+)@([A-Za-z0-9_\.-]+)\.([a-z\.]{2,6})$/)){
								$(this).closest(".textfield-wrapper").addClass("error-textfield");
								fieldset.find(".error-text").text("Проверьте адрес электронной почты.");
								error = true;
							}
						});
					}

					//Проверяем телефон
					if (!error){
						showBlock.find(".phone").each(function(){
							if ($(this).val().replace(/\D/g, '').length < 11){
								$(this).closest(".textfield-wrapper").addClass("error-textfield");
								fieldset.find(".error-text").text("Проверьте номер телефона.");
								error = true;
							}
						});
					}
				}
			}

		});

		if ($(this).closest("#orderThirdStage").length){
			//Подсчитаем доли уставного капитала
			fieldset.find(".two-columns .column .textfield").each(function(){
				if ($(this).val()){
					capital = parseInt(capital) + parseInt($(this).val());
				}
			});

			if (!error){
				if (capital < 51){
					fieldset.find(".two-columns .column").addClass("error-textfield");
					fieldset.find(".error-text").text("Недостаточно учредителей. Совокупная доля в уставном капитале должна быть больше 51%.");
					error = true;
				}
			}
		}	
		

		if (!error){
			$(".order-form-wrapper fieldset").hide();
			$(this).closest("fieldset").next().show();
			
			if ($(this).hasClass("next-button")){
				return false;
			}
		} else {
			return false;
		}

	});

	$("body").on("click",".order-form-wrapper .prev-button",function(){
		$(".order-form-wrapper fieldset").hide();
		$(this).closest("fieldset").prev().show();
		return false;
	});

	$("body").on("click",".order-steps .num.active",function(){
		$(".order-form-wrapper fieldset").hide();
		$($(this).data("step")).show();
		return false;
	});

	//Валидация формы
	$("body").on("keyup change input",".numbers-only",function(){
		if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	    }
	});

	$("body").on("keyup change input",".textfield",function(){
		$(this).closest(".textfield-wrapper, .column").removeClass("error-textfield");
	});

});

$(window).load(function () {

    
});
