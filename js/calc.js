
	//функция: делаем слайдер со шкалой
	function makeASlider(slider,min,step,max,start){

		//устанавливаем слайдер
		slider.slider({
			min: min,
			max: max,
			step: step,
			value: start,
			//range: 'min',
			stop: function(event, ui) {
				checkValue(slider.slider("value"),slider);
	    	},
	    	slide: function(event, ui) {
				checkValue(slider.slider("value"),slider);
	    	},
		});

		//поправка на случай округлений - чтобы блоки не разъезжались
		var scale = slider.closest(".calc-slider-wrapper").find(".scale");
		//slider.closest(".calc-slider-wrapper").find(".scale").css('width', scale.width()+1);
		//поправка - отступ от края (если задана толстая рамка)
		//slider.closest(".calc-slider-wrapper").find(".scale").css('margin-left', slider.css('border-width'));
	}

	//Меняем значение
	function checkValue(val,slider){
		var sliderHandle = slider.find(".ui-slider-handle");
		var months ="";

		if (slider.closest(".slider-bg").hasClass("credit")){
			sliderHandle.html('<span>' + String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '</span> P');
		}
		if (slider.closest(".slider-bg").hasClass("time")){
			sliderHandle.html('<span>' + val + ' недели</span>');
		}
		if (slider.closest(".slider-bg").hasClass("leasing")){

			switch (val){
				case 1: {
					months = 'месяц';
					break;
				}
				case 2:
				case 3:
				case 4: {
					months = 'месяца';
					break;
				}
				default:{
					months = "месяцев";
					break;
				}

			}
			sliderHandle.html('<span>' + val + '</span> ' + months);
		}

		checkSum();
	}

	//Расчёты значений
	function checkSum(){
		var tab = $("#" + $(".horizontal-tags .active a").attr("href"));

		//Процентные ставки
		var annPercent = 25; //Равные платежи
		var diffPercent = 20; //Спадающие платежи

		var prepaid = parseInt(tab.find(".prepaid .ui-slider-handle span").text());
		var estatePrice = parseInt(tab.find(".estate-price .ui-slider-handle span").text().replace(/\s+/g, ''));
		var leasing = parseInt(tab.find(".leasing .ui-slider-handle span").text());

		//Аванс
		var advance = Math.ceil(estatePrice*prepaid/100);
		$("#advance").val(String(advance).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

		estatePrice = estatePrice - advance;

		//Равные платежи
		if (tab.find(".onoffswitch-checkbox").prop("checked")){
			var monthPercent = annPercent/12/100;
			var annCoff = (monthPercent*Math.pow((1 + monthPercent),leasing))/(Math.pow((1 + monthPercent),leasing) - 1);

			//Ежемесячные платежи
			var monthPaid = Math.ceil(annCoff * estatePrice);
			$("#months").val(String(monthPaid).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

			//Проходим по месяцам
			for (var i = 0; i < leasing; i++){
				$(".calc-graph-mounth").eq(i).find(".price").text(String(Math.ceil(monthPaid)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
				$(".calc-graph-mounth").eq(i).find(".rouble").show();
			}

			//Общая сумма сделки
			$("#sum").val(String(Math.ceil(leasing*monthPaid + advance)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		} else {
			//Дифференцированные платежи

			//Очистим графи
			$(".calc-graph-mounth .price").text("");
			$(".calc-graph-mounth .rouble").hide();

			//Ежемесячные платежи
			var monthSum = Math.ceil(estatePrice/leasing);
			$("#months").val(String(monthSum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

			var monthPaid, allSum = 0;

			//Проходим по месяцам
			for (var i = 0; i < leasing; i++){
				monthPaid = monthSum + (estatePrice - (monthSum*i))*diffPercent*0.01/12;
				allSum = allSum + monthPaid;

				$(".calc-graph-mounth").eq(i).find(".price").text(String(Math.ceil(monthPaid)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
				$(".calc-graph-mounth").eq(i).find(".rouble").show();
			}

			//Общая сумма сделки
			$("#sum").val(String(Math.ceil(allSum + advance)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		}
	}


$(document).ready(function(){

	//Считаем положение шкалы
    

    $(".calc-slider-wrapper").each(function(){
    	slider = $(this).find(".slider");
    	makeASlider(slider,parseInt($(this).data("min")),parseInt($(this).data("step")),parseInt($(this).data("max")),parseInt($(this).data("start")));
    	checkValue(parseInt($(this).data("start")),slider);
    });

    //Калькулятор
    $(".calculator-page .horizontal-tags a").click(function(){
    	checkSum();
    });

    //Сбросить калькулятор
    $("#calcReset").click(function(){
    	$(".calc-results .textfield").val("");
    	$(".calc-graph-mounth .price").text("");
    	$(".calc-graph-mounth .rouble").hide();
    	return false;
    });

});