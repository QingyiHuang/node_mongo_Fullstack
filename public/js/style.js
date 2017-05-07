$(document).ready(function(){
    $('#signupName').blur(function(){
    val=this.value;
    if(val.length<6){
        $(this).parent().next().find("span").show();
        $(this).data({'s':0});
    }else{
        $(this).data({'s':1});
        $(this).parent().next().find("span").hide();
    }
	})
    $('#signupPassword').blur(function(){
		val=this.value;
		if(val.length<8){
			$(this).parent().next().find("span").show();
			$(this).data({'s':0});
		}else{
			$(this).data({'s':1});
			$(this).parent().next().find("span").hide();
		}
	})
	$('input[name=repaw]').blur(function(){
		val1=$('input[name=repaw').val();
		val2=this.value;
		if(val1!=val2){
			$(this).parent().next().find("span").show();
			$(this).data({'s':0});
		}else{
			$(this).data({'s':1});
			$(this).parent().next().find("span").hide();
		}
	})
	$('form').submit(function(){
		tot=0;
		$('.auth').blur();
		$('.auth').each(function(){
			tot+=$(this).data('s');
		});
		if(tot!=3){
			return false;
		}

	})
	$('input[name=reset]').click(function(){
		$('.auth').parent().next().find("span").hide();
	})	
})



