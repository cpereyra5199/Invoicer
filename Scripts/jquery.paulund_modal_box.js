/**
 * JQuery Plugin for a modal box
 * Will create a simple modal box with all HTML and styling
 * 
 * Author: Paul Underwood
 * URL: http://www.paulund.co.uk
 * 
 * Available for free download from http://www.paulund.co.uk
 */

(function($){

	// Defining our jQuery plugin

	$.fn.paulund_modal_box = function(prop){

		// Default parameters

		var options = $.extend({
			height : "250",
			width : "500",
			title:"JQuery Modal Box Demo",
			description: "Example of how to create a modal box.",
			top: "50%",
			left: "50%"
		},prop);
				
		//Click event on element
		return this.click(function(e){
			
			
			$('.paulund_block_page').remove();
			add_block_page();
			add_popup_box();
			add_styles();
			
			$('.paulund_modal_box').fadeIn();
		});
		
		/**
		 * Add styles to the html markup
		 */
		 function add_styles(){

		if($('#wrapper')[0].scrollHeight>$( window ).height()){
				
				var popupheight = $('.page-content-wrapper').scrollHeight;
				
			}else{
				
				var popupheight = $( window ).height();
				
			}
		 
			$('.paulund_modal_box').css({ 
				'position':'absolute', 
				'left':0,
				'top':'10%',
				'left':0,
				'margin-left':'auto',
				'margin-right':'auto',
				'margin':'auto',
				'right':0,
				'text-align':'center',
				'display':'none',
				'height': options.height + 'px',
				'width': options.width + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px',
				'background': '#f2f2f2', 
				'z-index':'105',
			});
			$('.paulund_modal_close').css({
				'position':'relative',
				'top':'-25px',
				'left':'20px',
				'float':'right',
				'display':'block',
				'height':'50px',
				'width':'50px',
				'background': 'url(images/close.png) no-repeat',
			});
			
			if($('#wrapper')[0].scrollHeight>$( window ).height()){
				
				var popupheight = $('#wrapper')[0].scrollHeight;
				
			}else{
				
				var popupheight = $( window ).height();
				
			}
			

			$('.paulund_block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':popupheight,
				'width':'100%',
				'z-index':'10'
			});
			$('.paulund_inner_modal_box').css({
				'background-color':'#fff',
				'height':(options.height - 50) + 'px',
				'width':(options.width - 50) + 'px',
				'padding':'10px',
				'margin':'15px',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px'
			});
		}
		
		 /**
		  * Create the block page div
		  */
		 function add_block_page(){
			var block_page = $('<div class="paulund_block_page"></div>');
						
			$(block_page).appendTo('body');
		}
		 	
		 /**
		  * Creates the modal box
		  */
		 function add_popup_box(){
			 
			 var pop_up = $('<div class="paulund_modal_box"><a href="" onclick="return false" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><h2>' + options.title + '</h2><p>' + options.description + '</p></div></div>');
			 $(pop_up).appendTo('.paulund_block_page');
			 			 
			 $('.paulund_modal_close').click(function(){
				$(this).parent().fadeOut().remove();
				$('.paulund_block_page').fadeOut().remove();				 
			 });
		}

		return this;
	};
	
	//confirmation button payment
	
	$.fn.paulund_modal_box_confirmPayment = function(prop){

		// Default parameters

		var options = $.extend({
			height : "300",
			width : "500",
			title:"JQuery Modal Box Demo",
			description: "Example of how to create a modal box.",
			top: "50%",
			left: "50%",
			yescallback:"",
			nocallback:"",
			YesText:"Pay",
			NoText:"Cancel",
			invoiceid:"",
			totalamount:0.00
		},prop);

				
		//Click event on element
		return this.click(function(e){
			
			
			$('.paulund_block_page').remove();
			add_block_page();
			add_popup_box();
			add_styles();
			
			$('.paulund_modal_box').fadeIn();
		});
		
		/**
		 * Add styles to the html markup
		 */
		 function add_styles(){


		$(".yesclick").click(function(){
			
			var paymentamount = $("#paymentamount").val();
			var checknumber = $("#checknumber").val();
			
			if(isValidNumber(paymentamount) && Number(paymentamount)<=Number(options.totalamount)){
				
			options.yescallback(options.invoiceid,paymentamount,checknumber);
			
			}else{
				
				$("#paymentamount").addClass("inputerror");
				
			}
			
		});
		
		$(".noclick").click(function(){
			
			$(this).parent().fadeOut().remove();
				$('.paulund_block_page').fadeOut().remove();	
			
		});


		if($('#wrapper')[0].scrollHeight>$( window ).height()){
				
				var popupheight = $('.page-content-wrapper').scrollHeight;
				
			}else{
				
				var popupheight = $( window ).height();
				
			}
			
			$('.confirmationbuttons span').css({
				
				
				'margin':'20px',
				'font-size':'20px',
				'cursor':'pointer'
				
			});
		 
			$('.paulund_modal_box').css({ 
				'position':'absolute', 
				'left':0,
				'top':'10%',
				'left':0,
				'margin-left':'auto',
				'margin-right':'auto',
				'margin':'auto',
				'right':0,
				'text-align':'center',
				'display':'none',
				'height': options.height + 'px',
				'width': options.width + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px',
				'background': '#f2f2f2', 
				'z-index':'105',
			});
			$('.paulund_modal_close').css({
				'position':'relative',
				'top':'-25px',
				'left':'20px',
				'float':'right',
				'display':'block',
				'height':'50px',
				'width':'50px',
				'background': 'url(images/close.png) no-repeat',
			});
			
			if($('#wrapper')[0].scrollHeight>$( window ).height()){
				
				var popupheight = $('#wrapper')[0].scrollHeight;
				
			}else{
				
				var popupheight = $( window ).height();
				
			}
			

			$('.paulund_block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':popupheight,
				'width':'100%',
				'z-index':'10'
			});
			$('.paulund_inner_modal_box').css({
				'background-color':'#fff',
				'padding':'10px',
				'margin':'15px',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px'
			});
		}
		
		 /**
		  * Create the block page div
		  */
		 function add_block_page(){
			var block_page = $('<div class="paulund_block_page"></div>');
						
			$(block_page).appendTo('body');
		}
		 	
		 /**
		  * Creates the modal box
		  */
		 function add_popup_box(){
			 
			 var pop_up = $('<div class="paulund_modal_box"><a href="" onclick="return false" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><h2>' + options.title + '</h2><div><h4>Balance: '+options.totalamount+'</h4></div><p>' + options.description + '</p><div><input type="text" onkeypress="return isDecimal(event)" class="text-right" id="paymentamount"/></div><div><input type="text" id="checknumber" placeholder="Check #"/></div><div class="confirmationbuttons"><span class="yesclick">'+options.YesText+'</span>&nbsp;<span class="noclick">'+options.NoText+'</span></div></div></div>');
			 $(pop_up).appendTo('.paulund_block_page');
			 			 
			 $('.paulund_modal_close').click(function(){
				$(this).parent().fadeOut().remove();
				$('.paulund_block_page').fadeOut().remove();				 
			 });
		}

		return this;
	};
	
	$.fn.paulund_modal_box_confirm = function(prop){

		// Default parameters

		var options = $.extend({
			height : "auto",
			width : "500",
			title:"JQuery Modal Box Demo",
			description: "Example of how to create a modal box.",
			top: "50%",
			left: "50%",
			yescallback:"",
			nocallback:"",
			YesText:"Yes",
			NoText:"No",
			paymentid:"",
			ispaidoff:"",
			invoiceid:""
		},prop);

				
		//Click event on element
		return this.click(function(e){
			
			
			$('.paulund_block_page').remove();
			add_block_page();
			add_popup_box();
			add_styles();
			
			$('.paulund_modal_box').fadeIn();
		});
		
		/**
		 * Add styles to the html markup
		 */
		 function add_styles(){


		$(".yesclick").click(function(){
				
			options.yescallback(options.paymentid,options.ispaidoff,options.invoiceid);

			
		});
		
		$(".noclick").click(function(){
			
			$(this).parent().fadeOut().remove();
				$('.paulund_block_page').fadeOut().remove();	
			
		});


		if($('#wrapper')[0].scrollHeight>$( window ).height()){
				
				var popupheight = $('.page-content-wrapper').scrollHeight;
				
			}else{
				
				var popupheight = $( window ).height();
				
			}
			
			$('.confirmationbuttons span').css({
				
				
				'margin':'20px',
				'font-size':'20px',
				'cursor':'pointer'
				
			});
		 
			$('.paulund_modal_box').css({ 
				'position':'absolute', 
				'left':0,
				'top':'10%',
				'left':0,
				'margin-left':'auto',
				'margin-right':'auto',
				'margin':'auto',
				'right':0,
				'text-align':'center',
				'display':'none',
				'height': options.height + 'px',
				'width': options.width + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px',
				'background': '#f2f2f2', 
				'z-index':'105',
			});
			$('.paulund_modal_close').css({
				'position':'relative',
				'top':'-25px',
				'left':'20px',
				'float':'right',
				'display':'block',
				'height':'50px',
				'width':'50px',
				'background': 'url(images/close.png) no-repeat',
			});
			
			if($('#wrapper')[0].scrollHeight>$( window ).height()){
				
				var popupheight = $('#wrapper')[0].scrollHeight;
				
			}else{
				
				var popupheight = $( window ).height();
				
			}
			

			$('.paulund_block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':popupheight,
				'width':'100%',
				'z-index':'10'
			});
			$('.paulund_inner_modal_box').css({
				'background-color':'#fff',
				'padding':'10px',
				'margin':'15px',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px'
			});
		}
		
		 /**
		  * Create the block page div
		  */
		 function add_block_page(){
			var block_page = $('<div class="paulund_block_page"></div>');
						
			$(block_page).appendTo('body');
		}
		 	
		 /**
		  * Creates the modal box
		  */
		 function add_popup_box(){
			 
			 var pop_up = $('<div class="paulund_modal_box"><a href="" onclick="return false" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><h2>' + options.title + '</h2><p>' + options.description + '</p><div class="confirmationbuttons"><span class="yesclick">'+options.YesText+'</span>&nbsp;<span class="noclick">'+options.NoText+'</span></div></div></div>');
			 $(pop_up).appendTo('.paulund_block_page');
			 			 
			 $('.paulund_modal_close').click(function(){
				$(this).parent().fadeOut().remove();
				$('.paulund_block_page').fadeOut().remove();				 
			 });
		}

		return this;
	};
	
})(jQuery);
