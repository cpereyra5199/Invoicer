var categorieslist = [];
var taxrate = new Number(0.00);

$(document).ready(function() {

	GetCategories();
	GetSettings();
	GetSentInvoices();
	GetMonthData();
    GetMonthDataTransaction();
	GetCustomerList();
	initializeDatePickers();
	
 
 
 $(document).on("mouseover","h4[data-ajax-target='createinvoiceexpenses']",function(){	 
	  
 $(".itemrow").each(function() {
 
		if($(this).find(".hiddenexpense").val() == 1){
			
			$(this).addClass("expensehue");
		}
 });
 
 });
 
  $(document).on("mouseout","h4[data-ajax-target='createinvoiceexpenses']",function(){	 
	  
 $(".itemrow").each(function() {
			
		$(this).removeClass("expensehue");
		
 });
 
 });
 
 
 

 
 $(document).on('click',"a[data-ajax-target='getreports']",function(){
	 
	 var startdatetextbox = $("#startdate");
	 var enddatetextbox = $("#enddate");
	 
	 if(validateReportDates(startdatetextbox,enddatetextbox)){
		 
		 $(this).attr("href","Data/profitreport/"+btoa("startdate=" + startdatetextbox.val()+"&enddate="+enddatetextbox.val()));
		 
	 }
	 
 });

 
 $(document).on('click','#newcustomerinvoice',function(){
	 
	 var customerid = $(this).attr("data-customer-id");
	 clearForm();
	 LoadCustomer(customerid);
	 LoadSection("invoice");
	 
	 
 });
 
 $(document).on("click",".deleteimage",function(){
	 
	 var imageid = $(this).attr("data-image-id");
	 var remove = $(this).parent();
	 var invoiceid = $(this).attr('data-invoice-id');
	 $("#customloader").show();
	 $.ajax({

		type : "GET",
		cache : false,
		url : "Data/Delete.php",
		data : {
			ImageID : imageid,
			ImageName: $(this).parent().find(".itemimage").attr('src')
		}
	}).done(function(data) {
		LoadInvoiceImages(invoiceid,false);
	  $("#customloader").hide();
	});
	 
	 
 });
 
	$(document).on("click",".addviewimages",function(){
		
		var invoiceid= $(this).attr("data-invoice-id");//imagessection
		
		if($("#invoiceimagecontainer > ul").children().length == 0){
			
			
			//load images
			LoadInvoiceImages(invoiceid,true);
			
			//alert('no pics');
			
		}else{
			
			$(".imagessection[data-invoice-id='"+invoiceid+"']").slideToggle();
			//alert('some pics');
			
		}
		
		
	});
 
    $(document).on("click",".customerrowheader .rowitem",function(){
        
		if (typeof $(this).attr("data-sort") == "undefined"){
			
			return false;
			
		}
		
        var parent = $(this).parent().parent().attr("class");

        var classes = $(this).attr("class").split(" ");
        var columntosort = classes[1];
        
        var sort = $(this).attr("data-sort");
        sortCustomers(columntosort,sort,parent);
        
        
        if(sort == "asc"){
            
            $(this).attr("data-sort","desc");
            
        }else{
            
            $(this).attr("data-sort","asc");
            
        }
        
    });
    
    $(document).on("change",".monthdropdowntransactions",function(){
        
        $(".searchbox").val("");
        
        
    })
    
    $(document).on("click",".deleteinvoice",function(){
        
        
        var invoiceid = $(this).attr("data-invoice-id");
        
        
        $('.delete_estimate_modal').paulund_modal_box_confirm({

		title : 'Delete Invoice '+invoiceid+'?',
		description : 'Are you sure you would like to delete invoice '+invoiceid+'?',
		yescallback:DeleteInvoice,
		invoiceid:invoiceid

		});
		
		$('.delete_estimate_modal').click();
        
        
        
    });
	
    $(document).on("click",".customerselect",function(){
        
        
        var parentdiv = $(this).parent();
        
        var row = $(this);
        
        var items = row.find(".rowitem");
        
        var id = row.find(".custerlistcustomerid").val();
        var name = items[0].innerHTML;
        var email = items[1].innerHTML;
        var address = items[2].innerHTML;
        var citystate = items[3].innerHTML;
        var zipcode = items[4].innerHTML;
       
        parentdiv.empty();
        
        var html = "<div style='text-align:center'><input type='hidden' value='"+id+"' /><input type='text' value='"+name+"' /><input type='text' value='"+email+"' /><input type='text' value='"+address+"' />"+
        "<input type='text' value='"+citystate+"' /><input type='text' value='"+zipcode+"' />&nbsp;<div><span class='link postbuttons updatecustomerinfo'>Save</span></div></div>";
        
        parentdiv.append(html);
        
        GetCustomerInvoicesByID(id);
        
    });
    
    $(document).on("click",".updatecustomerinfo",function(){
        
		$("#customloader").show();
		
        var row = $(this).parent().parent();
        
        var items = row.find("input[type='text']");
        var id = row.find("input[type='hidden']").val()
        var name = items[0].value;
        var email = items[1].value;
        var address = items[2].value;
        var citystate = items[3].value;
        var zipcode = items[4].value;

        
        UpdateCustomerInfo(id,name,email,address,citystate,zipcode);
        
    });
	
	$(document).on("click","html",function(){
		
		
		$(".customers").hide();
		
	});
	
	$(document).on("click",".client",function(){
		
		var id = $(this).attr("data-id");
		//set customer here
		LoadCustomer(id);
		
	});
	
	$(document).on("dblclick",".wrapper-dropdown",function(){

        
		if($(this).find('input:disabled').length==0){
		if(!$(this).is(":disabled") && $(".customerlist li").length>0){
		$(".customers").slideDown();}
}
	});
	
	
	$(document).on("click",".MobileMenu div",function(){
		
		$(".MobileMenu").hide();
		$(".BackShadow").hide();
		
		
	});
	
	$(".NavImage, .BackShadow").click(function(e){

$(".MobileMenu").height($(document).height());
$(".BackShadow").toggle("fast");
$(".MobileMenu").toggle("fast");
e.preventDefault();
});
	
	$(document).on("keyup",".customerinvoicesearch",function(e) {

		var search = $(this).find("input").val();
        var currentrow = 1;

		$(".customerinvoices > .customerrow").each(function() {
            
            
            var id = $(this).attr("data-invoice-id");
			
			if (id.indexOf(search) > -1) {
			
				if(currentrow%2!=0){
				    
                    $(this).css('background-color','lightgray');
                    
				}else{
				    
                    $(this).css('background-color','rgba(239, 239, 239, 0)');
				    
				}
                
                $(this).show();
                
                currentrow++;
			

			} else {

				$(this).hide();
			}

		});


	});

	$(document).on("keyup",".searchbox",function(e) {

		var search = $(this).val();

		$(".innerrow").each(function() {

			var invoiceid = $(this).find(".rowinvoiceid").html().toLowerCase();
			var name = $(this).find(".invoicerowname").html().toLowerCase();
			var email = $(this).find(".invoicerowemail").html().toLowerCase();

			if (invoiceid.indexOf(search) == 0 || name.indexOf(search) > -1 || email.indexOf(search) > -1) {

				$(this).show();
				$(".invoicessent").show();
				$(".invoicesaved").show();
				$(".invoiceexpired").show();
				$(".invoicepaid").show();

			} else {

				$(this).hide();
			}

		});
		if (search == "") {

			setTimeout(function() {
							calculateTotalsAll();
			}, 300);

			$(".invoicessent").hide();
			$(".invoicesaved").hide();
			$(".invoiceexpired").hide();
			$(".invoicepaid").hide();
			
		} else {
			setTimeout(function() {
				calculateTotals();
				if ($(window).width() > 400) {
					$("html, body").animate({
						scrollTop : $(document).height()
					});
				}
			}, 300);
		}

	});
    
  


	$(document).on("change",".monthdropdown",function(){
		
		var date = $(this).val();
		LoadHomePageData(date);
		
	});
    
    $(document).on("change",".monthdropdowntransactions",function(){
		
		var date = $(this).val();
       
		GetSentInvoices(date);
		
	});

	$(document).on("change",".itemlist",function(){
		
		
		var category = $(this).val();
		
		var parent = $(this).parent();
		
		GetCategorySettings(category,parent);
		
		
		
		
	});

	$(document).on("click","div[data-ajax-target='loadcustomerinvoice']",function(){
	
	$invoiceid = $(this).attr("data-invoice-id");

		LoadInvoice($invoiceid);
	
	});

	$(document).on("click", ".loadinvoice", function() {

		$invoiceid = $(this).attr("data-invoice-id");

		LoadInvoice($invoiceid);
		
		

	});

	$(document).on("click", ".resendinvoice", function() {

		$("#customloader").show();
		$invoiceid = $(this).attr("data-invoice-id");

		ResendInvoice($invoiceid);

	});
	
	$(document).on("click", ".payinvoice", function() {

		$("html, body").animate({
				scrollTop : 0
			}, "slow");
		
	
		var invoiceid = $(this).attr("data-invoice-id");
		var totalamount = $(this).attr("data-ajax-total-amount");
		
		$('.payInvoice_modal').paulund_modal_box_confirm({

		title : 'Enter Payment',
		description : 'Please enter payment amount',
		yescallback:PayInvoice,
		invoiceid:invoiceid,
		totalamount:totalamount

		});
		
		$('.payInvoice_modal').click();

	

	});
	

	$(document).on("click", ".sendsavedinvoice", function() {

		$("#customloader").show();

		var invoiceid = $(this).attr("data-invoice-id");
		if (invoiceid == $("input[name='invoiceid']").val()) {

			clearForm();

		}

		SendSavedInvoice(invoiceid);

	});

	$(document).on("click", ".invoiceshowhide", function() {

		if($(this).next().find(".invoicerow").length>0 || $(this).next().find("span").length>0){
		$(this).next().slideToggle();
		}
	});

	$(document).on("change", ".taxrate", function() {

		$(this).val(new Number($(this).val()).toFixed(2));

		calculateTotal();

	});

	$(document).on("focusout", ".invoice input", function() {

		if ($(this).hasClass("inputerror")) {

			ValidateForm();

		}

	});

	$(document).on("change", ".sendclientautodummy", function() {

		if (this.checked) {

			$(this).next().val("1");

		} else {

			$(this).next().val("0");

		}

	});

	$(document).on("change", "select", function() {

		$(this).next().val($(this).val());

	});

	$(document).on("change", ".tax", function() {

		if (this.checked) {

			$(this).next().val("1");

		} else {

			$(this).next().val("0");

		}

	});
	$(document).on("change", ".expense", function() {

		if (this.checked) {

			$(this).next().val("1");

		} else {

			$(this).next().val("0");

		}

	});

	$(document).on("click", ".removerow", function() {

		var currentrows = $(this).parent().parent().parent().find(".itemrow").length;

		if (currentrows == 1) {

		} else {

			$(this).parent().parent().remove();

		}

		calculateTotal();

	});

	$(document).on("change", ".price, .tax,.quantity", function() {

		if ($(this).attr("class") == "quantity") {
		} else {

			var number = new Number($(this).val()).toFixed(2);
			$(this).val(number);
		}
		calculateTotal();

	});

	$(document).on("click", ".removeitem", function() {

		RemoveCategory($(this).next().html());

	});

	$(document).on("click", ".savelink", function() {

		var taxable = $(this).parent().find(".taxableproduct").is(":checked");
		var expense = $(this).parent().find(".expenseproduct").is(":checked");
		var totalamount = $(this).parent().find(".itemamount").val();



		AddCategory($(this).parent().find(".producttoadd").val(),taxable,expense,totalamount);
		$(this).parent().find(".producttoadd").val("");
		$(this).parent().find(".itemamount").val("");
		$(this).parent().hide();
		
		$(this).parent().find(".taxableproduct").prop('checked',false);
		$(this).parent().find(".expenseproduct").prop('checked',false);
	});

	$(document).on("click", ".additem", function() {

		var rows = $(".itemrow").length;

		var elements = $(".itemrow");
		var num = rows - 1;

		var element = "";
		
		var length = 0;
		$(".itemrow").find(".description").each(function(){
			
			length+=$(this).val().length;
			
			
		});

		if (rows == 1) {

			element = $(".itemrow").clone();
			element.find(".description").val("");
			element.find(".quantity").val("1");
			element.find(".price").val("");
			element.find(".itemname").val("");
			element.find(".hiddentax").val("0");
			element.find(".hiddenexpense").val("0");
			element.find(".tax").prop('checked', false);
			element.find(".expense").prop('checked', false);
			element.find(".itemid").val("");

			element.insertAfter($(".itemrow"));

		} else if (length <= 1400) {

			var elementname = ".itemrow:eq(" + num + ")";

			element = $(elementname).clone();
			element.find(".description").val("");
			element.find(".quantity").val("1");
			element.find(".price").val("");
			element.find(".tax").prop('checked', false);
			element.find(".expense").prop('checked', false);
			element.find(".itemname").val("");
			element.find(".itemid").val("");
			element.find(".hiddentax").val("0");
			element.find(".hiddenexpense").val("0");

			element.insertAfter($(elementname));

		}

		calculateTotal();

		return false;
	});

	$(document).on("change", ".sendcustomcheck", function() {

		if (this.checked) {

			$(".sendcompanyauto").slideDown("fast");

		} else {

			$(".sendcompanyauto").slideUp("fast");
			$(".sendcompanyauto").val("");

		}

	});

	$(document).on("click", ".addinvoiceitem", function() {

		$(".invoiceitemadd").slideDown();

	});

	$(document).on("click", ".closeadditem", function() {

		$(".invoiceitemadd").slideUp();

	});

	$(document).on("click", ".generateinvoicebtn", function() {


		if (ValidateForm() == true) {

			$("#customloader").show();
            enableCustomerFields();
			SaveInvoice($('form[name="invoiceform"]').serialize(), false, $("input[name='invoiceid']").val());

		} else {

			generateModals();
			$('.inputerror_modal').click();
			$("html, body").animate({
				scrollTop : 0
			}, "slow");

		}

	});

	$(document).on("click", ".saveinvoicebtn", function() {

		if (ValidateForm() == true) {

			$("#customloader").show();
			
			if ($(".createinvoicecopy").is(":checked")){
				
				
				$("input[name='invoiceid']").val("");
				$(".createinvoicecopy").prop('checked',false);
			}
			enableCustomerFields();
			SaveInvoice($('form[name="invoiceform"]').serialize(), true, $("input[name='invoiceid']").val());

		} else {

			generateModals();
			$('.inputerror_modal').click();
			$("html, body").animate({
				scrollTop : 0
			}, "slow");

		}

	});




$(document).on("click", ".homebtn", function() {

        $(".paulund_block_page").remove();
		if(!$(".homepage").is(":visible")){
		
		LoadSection("homepage");
}

	});


	$(document).on("click", ".settingsbtn", function() {

        $(".paulund_block_page").remove();
		if(!$(".settings").is(":visible")){
		LoadSection("settings");
}
	});

	$(document).on("click", ".categoriesbtn", function() {
		
		$(".paulund_block_page").remove();
		if(!$(".categories").is(":visible")){
		LoadSection("categories");
}
	});
	
		$(document).on("click", ".transactionsbtn", function() {
		
		$(".paulund_block_page").remove();
		if(!$(".Search").is(":visible")){
		LoadSection("Search");
}
	});
	
		$(document).on("click", ".createbtn", function() {
		
		$(".paulund_block_page").remove();
		if(!$(".invoice").is(":visible")){
		LoadSection("invoice");
}
	});
    
    		$(document).on("click", ".customersbtn", function() {
		
		$(".paulund_block_page").remove();
        GetCustomerDetails();
		LoadSection("customerspage");

	});
	
	    	$(document).on("click", ".reportsbtn", function() {
		
		$(".paulund_block_page").remove();
        GetCustomerDetails();
		LoadSection("reports");

	});
	
	
	

	$(document).on("click", ".savesettings", function() {

		SaveSettings($('form[name="settingsform"]').serialize());
	});
    
    $(document).on("keyup",".customersearchbox",function(e) {

		var search = $(this).val().toLowerCase();
		
        var currentrow = 1;

		$(".customerrow").each(function() {
            
            
            var items = $(this).find(".rowitem");
       
            var name = items[0].innerHTML.toLowerCase();
            var email = items[1].innerHTML.toLowerCase();
			
			if (name.indexOf(search) > -1 || email.indexOf(search) > -1) {
			
				if(currentrow%2!=0){
				    
                    $(this).css('background-color','lightgray');
                    
				}else{
				    
                    $(this).css('background-color','rgba(239, 239, 239, 0)');
				    
				}
                
                $(this).show();
                
                currentrow++;
			

			} else {

				$(this).hide();
			}

		});


	});

});

function calculateTotal() {

	var sum = new Number(0.00);
	var expensesum = new Number(0.00);
	tax = new Number(($(".taxrate").val()) / 100);

	var totaltax = new Number(0.00);
	var subtotal = new Number(0.00);
	
	var expensetotal = new Number(0.00);

	$(".itemrow").each(function() {

	
		if(!$(this).find(".expense").is(':checked')){
	
		var number = new Number($(this).find(".price").val()).toFixed(2) * $(this).find(".quantity").val();
		subtotal += Number(number);

		if (!$(this).find(".tax").is(':checked')) {

			tax = new Number(0.00);

		} else {

			tax = new Number(($(".taxrate").val()) / 100);

		}

		itemtax = (Number(number) * tax);

		totaltax += itemtax;

		sum = Number(sum) + Number(number) + itemtax;
		
	}else{
		
		var number = new Number($(this).find(".price").val()).toFixed(2) * $(this).find(".quantity").val();

		if (!$(this).find(".tax").is(':checked')) {

			tax = new Number(0.00);

		} else {

			tax = new Number(($(".taxrate").val()) / 100);

		}

		itemtax = (Number(number) * tax);

		totaltax += itemtax;

		expensesum = Number(expensesum) + Number(number) + itemtax;	
		
		
	}
	});

	$(".totalsum").html("$" + sum.toFixed(2));
	$(".totaltaxes").html("$" + totaltax.toFixed(2));
	$(".subtotalsum").html("$" + subtotal.toFixed(2));
	$(".expensestotal").html("$" + expensesum.toFixed(2));
	$("span[data-ajax-target='createinvoicenet']").html("$"+ Number(subtotal-expensesum).toFixed(2));
	
}

function GetCategories() {
	

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetCategories : "true"
		}
	}).done(function(data) {


		var categoriesarray = JSON.parse(data);

		categorieslist = categoriesarray;
		$(".items-containerinner").html("");

		jQuery.each(categoriesarray, function() {

			$(".items-containerinner").append("<span class='link removeitem'>X</span><span>" + this + "</span><div class='clear-both' style='margin-bottom:10px;'></div>");

		});

		RefreshDropDowns();

	});

}

function GetSentInvoices(date) {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetInvoices : "true",
			Command : "sent",
            Date:date
		}
	}).done(function(data) {

		$(".invoicescontainer").empty();
		$(".invoicescontainer").append("<div class='link invoiceshowhide estimatesheader'><h3 style='width:100%;display:inline-block'>ESTIMATES<span class='savedinvoicetotal'></span></h3></div><div class='invoicesaved'></div><div class='link invoiceshowhide deliveredheader'><h3 style='width:100%;display:inline-block'>DELIVERED<span class='deliveredtotal'></span></h3></div><div class='invoicessent'></div><div class='link invoiceshowhide expiredheader'><h3 style='width:100%;display:inline-block'>EXPIRED<span class='expiredinvoicetotal'></span></h3></div><div class='invoiceexpired'></div><div class='link invoiceshowhide paidheader'><h3 style='width:100%;display:inline-block'>Paid<span class='paidinvoicetotal'></span></h3></div><div class='invoicepaid'></div>");

		var invoices = JSON.parse(data);

		var senttotals = 0.00;
		if (invoices != "") {

			jQuery.each(invoices, function() {
			 
			 var title = '';
			 
				if(this.title!=''){title = "&nbsp;-&nbsp;"+this.title;}
	   
				$(".invoicessent").append('<div class="invoicerow"><div class="innerrow"><div style="text-align:center;width:100%!important" class="innercolumn"><span class="invoiceheader">Invoice ID - #&nbsp;</span><span class="rowinvoiceid" style="font-weight:bold">' + this.invoiceID + '</span>'+title+'</div>' + '<div class="innercolumn"><span class="invoiceheader">Name</span>&nbsp;<span class="invoicerowname" style="font-weight:bold">' + this.clientname + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Address</span>&nbsp;' + this.clientstreetaddress + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Location</span>&nbsp;' + this.clientcitystatezip + '</div>' + '<div  class="innercolumn"><span class="invoiceheader">Invoice Total</span>&nbsp;<span class="invoicerowtotal" data-val="' + this.invoicetotal + '" style="color:green;font-weight:bold">$&nbsp;' + this.invoicetotal + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Email</span>&nbsp;<span class="invoicerowemail">' + this.clientemail + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Create Date</span>&nbsp;' + this.createddate + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Expires</span>&nbsp;' + this.expirationdate + '</div>' + '<div  class="innercolumn"><a target="_blank" href="Data/generatepdf/' + btoa("invoiceID=" + this.invoiceID) + '">View</a> | <span data-invoice-id="' + this.invoiceID + '" class ="link loadinvoice">Load</span> | <span data-invoice-id="' + this.invoiceID + '" class="link resendinvoice">Re-send | </span><span data-ajax-total-amount="'+this.balance+'" data-invoice-id="' + this.invoiceID + '" class="link payinvoice">Pay</span></div>' + '</div></div>');

				senttotals += Number(this.invoicetotal);

			});

			$(".deliveredtotal").html(senttotals.toFixed(2));

		} else {

			$(".deliveredtotal").html("0.00");
			$(".invoicessent").append("<span>No invoices were found.</span>");

		}

		GetSavedInvoices(date);
		GetExpiredInvoices(date);
		GetPaidInvoices(date);
		LoadHomePageData();
		

	});

}

function GetSavedInvoices(date) {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetInvoices : "true",
			Command : "saved",
            Date:date
		}
	}).done(function(data) {

		$(".invoicesaved").empty();

		var invoices = JSON.parse(data);
		var savedtotals = 0.00;
		if (invoices != "") {
		
			jQuery.each(invoices, function() {
			
				var title = '';
			 
				if(this.title!=''){title = "&nbsp;-&nbsp;"+this.title;}
			
				$(".invoicesaved").append('<div class="invoicerow"><div class="innerrow"><div style="text-align:center;width:100%!important" class="innercolumn"><span class="invoiceheader">Estimate ID - #&nbsp;</span><span class="rowinvoiceid" style="font-weight:bold">' + this.invoiceID + '</span>'+title+'</div><div class="innercolumn"><span class="invoiceheader">Name</span>&nbsp;<span class="invoicerowname"  style="font-weight:bold">' + this.clientname + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Address</span>&nbsp;' + this.clientstreetaddress + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Location</span>&nbsp;' + this.clientcitystatezip + '</div>' + '<div  class="innercolumn"><span class="invoiceheader">Invoice Total</span>&nbsp;<span class="invoicerowtotal" data-val="' + this.invoicetotal + '" style="color:green;font-weight:bold">$&nbsp;' + this.invoicetotal + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Email</span>&nbsp;<span class="invoicerowemail">' + this.clientemail + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Create Date</span>&nbsp;' + this.createddate + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Expires</span>&nbsp;' + this.expirationdate + '</div>' + '<div  class="innercolumn"><a target="_blank" href="Data/generatepdf/' + btoa("invoiceID=" + this.invoiceID) + '">View</a> | <span data-invoice-id="' + this.invoiceID + '" class ="link loadinvoice">Load</span> | <span data-invoice-id="'+this.invoiceID+'" class="link addviewimages blue">Add/View Images</span> | <span data-invoice-id="' + this.invoiceID + '" class="link sendsavedinvoice">Send</span> | <span data-invoice-id="' + this.invoiceID + '" class="link deleteinvoice">Delete</span></div>'
				+ '<div style="clear:both"></div>'
				 
				+ '<div class="imagessection" data-invoice-id='+this.invoiceID+'>'
			
				+ '<div id="fileuploader'+this.invoiceID+'">Upload</div>'
				
				+ '<div id="invoiceimagecontainer"><ul class="row"></ul></div>'
				
				+ '</div>'
				
				+ '</div></div>');
				savedtotals += Number(this.invoicetotal);
				
				
	$("#fileuploader"+this.invoiceID).uploadFile({
	url:"Data/UploadImageMobile.php",
	fileName:"myfile",
	multiple:true,
	formData:{InvoiceID: this.invoiceID},
	onSuccess:function(files,data,xhr)
	{
	
	LoadInvoiceImages(data);
	$(".ajax-file-upload-statusbar").hide();
	}
	});
	
				
			});

			$(".savedinvoicetotal").html(savedtotals.toFixed(2));
			


		} else {

			$(".savedinvoicetotal").html("0.00");

			$(".invoicesaved").append("<span>No invoices were found.</span>");

		}

	});

}

function GetExpiredInvoices(date) {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetInvoices : "true",
			Command : "expired",
            Date:date
		}
	}).done(function(data) {


		$(".invoiceexpired").empty();

		var invoices = JSON.parse(data);
		var expiredtotals = 0.00;
		if (invoices != "") {

			jQuery.each(invoices, function() {

			var title = '';
			 
				if(this.title!=''){title = "&nbsp;-&nbsp;"+this.title;}
			
				$(".invoiceexpired").append('<div class="invoicerow"><div class="innerrow"><div style="text-align:center;width:100%!important" class="innercolumn"><span class="invoiceheader">Estimate ID - #&nbsp;</span><span class="rowinvoiceid" style="font-weight:bold">' + this.invoiceID + '</span>'+title+'</div><div class="innercolumn"><span class="invoiceheader">Name</span>&nbsp;<span class="invoicerowname"  style="font-weight:bold">' + this.clientname + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Address</span>&nbsp;' + this.clientstreetaddress + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Location</span>&nbsp;' + this.clientcitystatezip + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Invoice Total</span>&nbsp;<span class="invoicerowtotal" data-val="' + this.invoicetotal + '" style="color:green;font-weight:bold">$&nbsp;' + this.invoicetotal + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Email</span>&nbsp;<span class="invoicerowemail">' + this.clientemail + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Create Date</span>&nbsp;' + this.createddate + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Expired</span>&nbsp;<span style="color:red;font-weight:bold">' + this.expirationdate + '</span></div>' + '<div class="innercolumn"><a target="_blank" href="Data/generatepdf/' + btoa("invoiceID=" + this.invoiceID) + '">View</a> | <span data-invoice-id="' + this.invoiceID + '" class ="link loadinvoice">Load</span> | <span data-invoice-id="' + this.invoiceID + '" class="link resendinvoice">Re-send</span> | <span data-ajax-total-amount="'+this.balance+'" data-invoice-id="' + this.invoiceID + '" class="link payinvoice">Pay</span></div>' + '</div></div>');
				expiredtotals += Number(this.invoicetotal);
			});

			$(".expiredinvoicetotal").html(expiredtotals.toFixed(2));

		} else {

			$(".expiredinvoicetotal").html("0.00");

			$(".invoiceexpired").append("<span>No invoices were found.</span>");

		}

	});

}

function GetPaidInvoices(date) {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetInvoices : "true",
			Command : "paid",
            Date:date
		}
	}).done(function(data) {

		$(".invoicepaid").empty();

		var invoices = JSON.parse(data);
		var paidtotals = 0.00;
		if (invoices != "") {

			jQuery.each(invoices, function() {

			
			var title = '';
			 
				if(this.title!=''){title = "&nbsp;-&nbsp;"+this.title;}
			
				$(".invoicepaid").append('<div class="invoicerow"><div class="innerrow"><div style="text-align:center;width:100%!important" class="innercolumn"><span class="invoiceheader">Estimate ID - #&nbsp;</span><span class="rowinvoiceid" style="font-weight:bold">' + this.invoiceID + '</span>'+title+'</div><div class="innercolumn"><span class="invoiceheader">Name</span>&nbsp;<span class="invoicerowname"  style="font-weight:bold">' + this.clientname + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Address</span>&nbsp;' + this.clientstreetaddress + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Location</span>&nbsp;' + this.clientcitystatezip + '</div>' + '<div  class="innercolumn"><span class="invoiceheader">Invoice Total</span>&nbsp;<span class="invoicerowtotal" data-val="' + this.invoicetotal + '" style="color:green;font-weight:bold">$&nbsp;' + this.invoicetotal + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Email</span>&nbsp;<span class="invoicerowemail">' + this.clientemail + '</span></div>' + '<div class="innercolumn"><span class="invoiceheader">Created Date</span>&nbsp;' + this.createddate + '</div>' + '<div class="innercolumn"><span class="invoiceheader">Paid</span>&nbsp;<span style="color:green;font-weight:bold">' + this.paiddate + '</span></div>' + '<div  class="innercolumn"><a target="_blank" href="Data/generatepdf/' + btoa("invoiceID=" + this.invoiceID) + '">View</a> | <span data-invoice-id="' + this.invoiceID + '" class ="link loadinvoice">Load</span> | <span data-invoice-id="' + this.invoiceID + '" class="link sendsavedinvoice">Send</span></div>' + '</div></div>');
				paidtotals += Number(this.invoicetotal);
			});

			$(".paidinvoicetotal").html(paidtotals.toFixed(2));

		} else {

			$(".paidinvoicetotal").html("0.00");

			$(".invoicepaid").append("<span>No invoices were found.</span>");

		}

	});

}



function GetSettings() {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetSettings : "true"
		}
	}).done(function(data) {
	
		var settings = JSON.parse(data);

		$(".companyname").val(settings.companyname);
		$(".streetaddress").val(settings.streetaddress);
		$(".citystate").val(settings.citystate);
		$(".zipcode").val(settings.zipcode);
		$(".taxrate").val(settings.taxrate);


		if (settings.sendclientauto == "1") {

			$(".sendclientauto").prev().prop('checked', true);
            $("input[name='sendclientauto']").val("1");

		} else {

			$(".sendclientauto").prev().prop('checked', false);
            $("input[name='sendclientauto']").val("0");

		}

		if (settings.sendcompanyemailauto == "1") {

			$(".sendcompanyauto").show();

			$(".sendcompanyauto").val(settings.forwardemail);

			$(".sendcompanyauto").parent().find(":checkbox").prop('checked', true);

		} else {

			$(".sendcompanyauto").val("");
			$(".sendcompanyauto").hide();
			$(".sendcompanyauto").parent().find(":checkbox").prop('checked', false);

		}

	});

}

function GetCustomerDetails(){
    
    $(".customerdivcontainer").remove();
    $(".customerinvoices").remove();
    
    var html = "<div class='customerdivcontainer'><div style='text-align:center'><input class='customersearchbox' type='text' placeholder='Search' /></div>";
    html+= "<div class='customerrowheader'><div data-sort='asc' class='rowitem name'>Name</div><div data-sort='asc' class='rowitem email'>Email</div><div data-sort='asc' class='rowitem address'>Address</div><div data-sort='asc' class='rowitem citystate'>City, State</div><div data-sort='asc' class='rowitem zipcode'>Zip Code</div></div>";
    
    $.ajax({
		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetCustomersFull:true
		}
	}).done(function(data) {
	   
       var output = JSON.parse(data);
		
        jQuery.each(output,function(){
            
            
        html+= "<div class='customerrow customerselect'><input class='custerlistcustomerid' type='hidden' value='"+this.id+"' /><div class='rowitem name'>"
        +this.name+"</div><div class='rowitem email'>"
        +this.email+"</div><div class='rowitem address'>"
        +this.StreetAddress+"</div><div class='rowitem citystate'>"
        +this.citystate+"</div><div class='rowitem zipcode'>"+this.zipcode+"</div></div>";

        });
        
        html+="</div>";
        
        $(".customerspage").append(html);

	});
    
}

function RefreshDropDowns() {

	$(".itemlist").empty();

	$(".itemlist").append("<option value=''></option>");

	$.each(categorieslist, function(index, item) {
		$(".itemlist").append("<option value='" + item + "'>" + item + "</option>");
	});

}

function AddCategory(category,tax,expense,totalamount) {

	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			AddItem : category, Tax: tax,Expense:expense,Total:totalamount
		}
	}).done(function(data) {
		GetCategories();

		generateModals();
		$('.save_modal_category').click();

	});

}

function GetCategorySettings(category,parent) {


	$.ajax({
		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetItemSettings:category
		}
	}).done(function(data) {
		
		var output = JSON.parse(data);
		
		
		if(output.taxable == "1"){
			parent.find(".tax").prop("checked",true);
			parent.find(".hiddentax").val(1);
			
		}else{
			
			parent.find(".tax").prop("checked",false);
			parent.find(".hiddentax").val(0);
			
		}
		
		if(output.expense == "1"){
			parent.find(".expense").prop("checked",true);
			parent.find(".hiddenexpense").val(1);
			
		}else{
			
			parent.find(".expense").prop("checked",false);
			parent.find(".hiddenexpense").val(0);
			
		}
		

		parent.find(".price").val(output.total);
		
		calculateTotal();

	});


}

function RemoveCategory(category) {

	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			DeleteItem : category
		}
	}).done(function(data) {

		GetCategories();

	});

}

function ValidateForm() {

	var returned = true;

	$("input[name='taxrate']").val($(".taxrate").val());

	$(".invoice input").each(function() {

		if (String($(this).attr("name")).indexOf("clientcitystate") > -1) {

			if ($(this).val().indexOf(",") == -1) {
				$(this).removeClass("inputvalid");
				$(this).addClass("inputerror");

				returned = false;
			} else {

				$(this).removeClass("inputerror");
				$(this).addClass("inputvalid");

			}
		} else if ($(this).val() == "") {

			if (String($(this).attr("class")).indexOf("description") > -1 || String($(this).attr("name")).indexOf("invoiceid") > -1 || String($(this).attr("class")).indexOf("itemid") > -1 || String($(this).attr("class")).indexOf("clientid") > -1) {

			} else if (String($(this).attr("class")).indexOf("itemname") > -1) {

				$(this).prev().removeClass("inputvalid");
				$(this).prev().addClass("inputerror");

				returned = false;
			} else {

				returned = false;
				$(this).removeClass("inputvalid");
				$(this).addClass("inputerror");
			}

		} else {

			if (String($(this).attr("class")).indexOf("itemname") > -1) {

				$(this).prev().removeClass("inputerror");
				$(this).prev().addClass("inputvalid");
			}

			$(this).removeClass("inputerror");
			$(this).addClass("inputvalid");

		}

	});

	return returned;

}

function SaveSettings(formvalues) {


	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			SettingsFormValues : formvalues
		}
	}).done(function(data) {

		generateModals();
		$('.saved_modal_settings').click();

	});

}

function ResendInvoice(invoiceid) {

	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			ResendInvoice : true,
			InvoiceID : invoiceid
		}
	}).done(function(data) {

		GetSentInvoices();
		generateModals();
		$("#customloader").hide();
		$('.invoice_resent_modal').click();

		$("html, body").animate({
			scrollTop : 0
		}, "slow");

	});

}

function PayInvoice(invoiceid,amount) {


if (isValidNumber(amount)){

$("#customloader").show();

	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			InvoiceID : invoiceid,
			Amount: amount,
			PayInvoice : "true"
		}
	}).done(function(data) {

		LoadInvoice(invoiceid);
		GetSentInvoices();
        GetMonthData();
		generateModals();
		$("#customloader").hide();
		$('.invoice_paid_modal').click();

		$("html, body").animate({
			scrollTop : 0
		}, "slow");

	});
}
}

function DeleteInvoice(invoiceid){
    
    
    $.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			DeleteInvoice : true,
			InvoiceID : invoiceid
		}
	}).done(function(data) {

        clearForm();
		GetSentInvoices();
        generateModals();
        
        $(".delete_complete").click();
        
        $("html, body").animate({
			scrollTop : 0
		}, "slow");

	});
    
}

function SendSavedInvoice(invoiceid) {

	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			ResendInvoice : true,
			InvoiceID : invoiceid
		}
	}).done(function(data) {

	alert(data);
	
		GetSentInvoices();
		generateModals();
		$("#customloader").hide();
		$('.sent_saved_modal').click();

		$("html, body").animate({
			scrollTop : 0
		}, "slow");

	});

}

function SaveInvoice(formvalues, saveonly, invoiceid) {

    


	$.ajax({
		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			FormValues : formvalues,
			SaveOnly : saveonly,
			InvoiceID : invoiceid
		}
	}).done(function(data) {

        GetCustomerList();
        GetMonthData();
        GetMonthDataTransaction();
		GetSentInvoices();
        LoadHomePageData();
		generateModals();


		clearForm();

		$("#customloader").hide();
		$('.saved_modal').click();
		$("html, body").animate({
			scrollTop : 0
		}, "slow");
		$(".searchbox").val("");
	});

}

function UpdateCustomerInfo(customerid,name,email,address,citystate,zip){
    
    $.ajax({

		type : "POST",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			UpdateCustomer:true,
            CustomerName: name,
            CustomerEmail:email,
            CustomerAddress:address,
            CustomerCityState:citystate,
            CustomerZip:zip,
            CustomerID:customerid
            
		}
	}).done(function(data) {

        generateModals();
        GetCustomerList();
		GetSentInvoices();
        
        
        if($("input[name='customerid']").val() !=""){
            
            LoadCustomer($("input[name='customerid']").val());
            
        }
        
        
        $(".customer_saved_modal").click();
		
		$("#customloader").hide();
        
        
        
	});

    
    
}

function LoadInvoice(invoiceid) {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetInvoice : "true",
			InvoiceID : invoiceid
		}
	}).done(function(data) {

		var invoice = JSON.parse(data);
		$("input[name='clientname']").val(invoice.clientname);
		$("input[name='clientemail']").val(invoice.clientemail);
		$("input[name='clientstreetaddress']").val(invoice.clientstreetaddress);
		$("input[name='clientcitystate']").val(invoice.clientcitystate);
		$("input[name='clientzipcode']").val(invoice.clientzip);
		$("input[name='customerid']").val(invoice.customerid);
		$("input[name='clienttitle']").val(invoice.invoicetitle);
		
		disableCustomerFields();
		
		$("input[name='expirationdays']").val(invoice.expirationdatecount);
		$("input[name='invoiceid']").val(invoice.invoiceID);
		
		$("span[data-ajax-target='invoicebalance']").html("$"+invoice.balance);
		$("span[data-ajax-target='paymentamount']").html("$"+invoice.paymentamount);
		
		
		var html = "<span>"+invoice.invoiceID+"</span>&nbsp;&nbsp;<a target='_blank' href='Data/generatepdf/"+btoa("invoiceID=" + invoice.invoiceID) + "'>View</a>";
		
		$(".invoideIDlabelval").html(html);
		$(".invoiceidlabel").show();
		$(".createcopydiv").css('display','inline-block');
		
		LoadInvoiceItems(invoiceid);
		
		$("div[data-ajax-target='invoicebuttons'] > .payinvoice").remove();
		
		if(invoice.EmailSent==1 && invoice.paid == 0){
			
		$("div[data-ajax-target='invoicebuttons'] > .payinvoice").remove();
		$("div[data-ajax-target='invoicebuttons']").append("<span style='margin-right:10px' class='link payinvoice postbuttons' data-ajax-total-amount='"+invoice.balance+"' data-invoice-id='"+invoice.invoiceID+"'>Make Payment</span>");
		
		}

	});

}

function LoadInvoiceItems(invoiceid) {

	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetInvoiceItems : "true",
			InvoiceID : invoiceid
		}
	}).done(function(data) {

		var element = $(".itemrow").last().clone();

		$(".itemscontainer").empty();

		var items = JSON.parse(data);

		jQuery.each(items, function() {

			if ($(".itemrow").length == 0) {
				element.find(".price").val(this.itemtotal);
				element.find(".quantity").val(this.itemquantity);
				element.find(".description").val(this.itemdescription);
				element.find(".itemname").val(this.itemname);
				element.find(".itemlist").val(this.itemname);
				element.find(".itemid").val(this.itemid);



				
				if (this.itemtaxable == "1") {

					element.find(".hiddentax").val(1);
					element.find(".hiddentax").prev().prop('checked', true);

				} else {

					element.find(".hiddentax").val(0);
					element.find(".hiddentax").prev().prop('checked', false);

				}
				
				
				if (this.itemexpense == "1") {

					element.find(".hiddenexpense").val(1);
					element.find(".hiddenexpense").prev().prop('checked', true);

				} else {

					element.find(".hiddenexpense").val(0);
					element.find(".hiddenexpense").prev().prop('checked', false);

				}
				

				$(".itemscontainer").append(element);

			} else {

				var newelement = $(".itemrow:last").clone();
				newelement.find(".price").val(this.itemtotal);
				newelement.find(".quantity").val(this.itemquantity);
				newelement.find(".description").val(this.itemdescription);
				newelement.find(".itemname").val(this.itemname);
				newelement.find(".itemlist").val(this.itemname);
				newelement.find(".itemid").val(this.itemid);

				if (this.itemtaxable == "1") {

					newelement.find(".hiddentax").val(1);
					newelement.find(".hiddentax").prev().prop('checked', true);

				} else {
					
					newelement.find(".hiddentax").val(0);
					newelement.find(".hiddentax").prev().prop('checked', false);

				}
		
	
				if (this.itemexpense == "1") {
					
					newelement.find(".hiddenexpense").val(1);
					newelement.find(".hiddenexpense").prev().prop('checked', true);

				} else {

					newelement.find(".hiddenexpense").val(0);
					newelement.find(".hiddenexpense").prev().prop('checked', false);

				}

				$(".itemscontainer").append(newelement);
				
			
			}

		});

		LoadSection("invoice");
	});

}

function LoadSection(section){
	
		if(section == "invoice"){
			
		hideAll();
		$("."+section).toggle("slow");

		calculateTotal();
		$("html, body").animate({
			scrollTop : 0
		}, "slow");
			
			
		}else{
			
		hideAll();
		$("."+section).toggle("slow");
			
			
		}
	
		
	
	
}

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function isDecimal(evt) {
	
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;

	var keypressed = String.fromCharCode(charCode);

	var patt = new RegExp(/^-?[0-9]*\.?[0-9]*$/);

	if (patt.test(keypressed)) {

		return true;

	} else {

		return false;

	}

}

function isValidNumber(number){
	

	return Number(number) > 0;
	
}

function GetCustomerInvoicesByID(customerid){
   
    var html = "<div class='customerinvoices'>";
	html = html + "<h2><table id='customerinfotable' class='pure-table pure-table-horizontal headerlighterblue width-100'><tbody><tr><td>Income</td><td class='text-right' id='totalcustomerincome'></td></tr><tr><td>Expenses</td><td class='text-right' id='totalcustomerexpense'></td></tr><tr><td>Net</td><td class='text-right' id='totalcustomernet'></td></tr></tbody></table></h2>";
	html = html + "<h2><table class='pure-table pure-table-horizontal headerexpired width-100'><tbody><tr><td>Outstanding</td><td id='outstandingtotal' class='text-right'></td></tr></tbody></table></h2><br/><br/>";
	html = html + "<button class='pure-button pure-button-primary' data-customer-id='"+customerid+"' id='newcustomerinvoice'>New Invoice</button></br></br>";
	html = html + "<div class='customerinvoicesearch'><input type='text' placeholder='Invoice ID' /></div>";
	var incometotal = Number(0);
	var expense = Number(0);
	var outstandingtotal = Number(0);
	
	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			
			GetCustomerInvoicesByID: true,
            CustomerID:customerid
		}
	}).done(function(data) {
		var customerinvoices = JSON.parse(data);
        
        html+= "<div class='customerrowheader'><div data-sort='asc' class='rowitem invoiceid'>Invoice ID</div><div data-sort='asc' class='rowitem title'>"
		+"Title"+"</div><div data-sort='asc' class='rowitem totalamount'>"
        +"Total Amount"+"</div><div data-sort='asc' class='rowitem expensetotalamount'>"
		+"Expense Total"+"</div><div data-sort='asc' class='rowitem net'>"
		+"Net"+"</div><div data-sort='asc' class='rowitem createddate'>"
        +"Created Date"+"</div><div data-sort='asc' class='rowitem expirationdate'>"
        +"Expiration Date"+"</div><div data-sort='asc' class='rowitem status'>"+"Status"+"</div><div data-sort='asc' class='rowitem paid'>"+"Paid"+"</div></div>";
	
		jQuery.each(customerinvoices,function(){
		
        var color = this.net >= 0 ? "positivenet":"negativenet";
		
		var statuscolor;
		
		switch(this.status){
			case "Expired":
			statuscolor="expiredhue";
			break;
			
			case "Paid":
			statuscolor="paidhue";
			break;
			
			case "Invoice Sent":
			statuscolor="invoiceshue";
			break;
			
			case "Estimate Created": case "OK":
			statuscolor="estimateshue";
			break;
			
			default:
			break;
		}
		
        html+= "<div class='customerrow' data-ajax-target='loadcustomerinvoice' data-invoice-id='"+this.invoiceID+"'><input class='custerlistcustomerid' type='hidden' value='"+this.invoiceID+"' /><div class='rowitem invoiceid'><span class='mobilecustomerheader'>Invoice ID: </span><span>"
		+this.invoiceID+"</span></div><div class='rowitem title'><span class='mobilecustomerheader'>Title: </span><span>"
        +this.title+"</span></div><div class='rowitem totalamount'><span class='mobilecustomerheader'>Total Amount: </span><span>"
        +this.totalamount+"</span></div><div class='rowitem expensetotalamount'><span class='mobilecustomerheader'>Expense Total: </span><span>"
		+this.expensetotalamount+"</span></div><div class='rowitem net "+color+"'><span class='mobilecustomerheader'>Net: </span><b><span>"
		+this.net+"</span></b></div><div class='rowitem createddate'><span class='mobilecustomerheader'>Created Date: </span><span>"
        +this.createddate+"</span></div><div class='rowitem expirationdate'><span class='mobilecustomerheader'>Expiration Date: </span><span>"
        +this.expirationdate+"</span></div><div class='rowitem status "+statuscolor+"'><span class='mobilecustomerheader'>Status: </span><span>"+this.status+"</span></div><div class='rowitem paid'><span class='mobilecustomerheader'>Paid Date: </span><span>"+this.paiddate+"</span></div></div>";
		
		if(this.status=="Paid"){
		incometotal = Number(incometotal) + Number(this.totalamount);
		expense = Number(expense) + Number(this.expensetotalamount);
		}
		
		if(this.status == "Expired"){
			
		outstandingtotal = Number(outstandingtotal)+Number(incometotal-expense);
			
		}
		
        });
        
        html+="</div>";
		
        $(".customerspage").append(html);

		$("#totalcustomerincome").html("$"+incometotal);
		$("#totalcustomerexpense").html("$"+expense);
		$("#totalcustomernet").html("$"+(incometotal-expense));
		$("#outstandingtotal").html("$"+outstandingtotal);
        
		});	
    
}

function GetCustomerList(){
	
	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			
			GetCustomerList: true
		}
	}).done(function(data) {

		
		var customer = JSON.parse(data);

		$(".customerlist").empty();
	
		jQuery.each(customer,function(){
		
			
			$(".customerlist").append("<li class='link client' data-id='"+this.id+"'>"+this.name+"</li>");
			
			
			
		});
	
	
	
	});	
	
	
}

function LoadCustomer(id){
	
$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			
			GetCustomer: id
		}
	}).done(function(data) {

		var customer = JSON.parse(data);
	
		$("input[name='clientname']").val(customer.clientname);
		$("input[name='clientemail']").val(customer.clientemail);
		$("input[name='clientstreetaddress']").val(customer.clientstreetaddress);
		$("input[name='clientcitystate']").val(customer.clientcitystate);
		$("input[name='clientzipcode']").val(customer.clientzipcode);
		$("input[name='customerid']").val(customer.id);
	       
           disableCustomerFields();
    
	});	
	
	
}

function generateModals() {

	$('.inputerror_modal').paulund_modal_box({

		title : 'Input Error',
		description : 'Please enter all required fields in order to generate an invoice.'

	});
	

	$('.sent_saved_modal').paulund_modal_box({

		title : 'Document Sent',
		description : 'Document has been sent to customer.'

	});

	$('.invoice_resent_modal').paulund_modal_box({

		title : 'Document Re-sent',
		description : 'Document has been re-sent to customer.'

	});

	$('.saved_modal').paulund_modal_box({

		title : 'Document Saved',
		description : 'Your document has been successfully saved.'

	});

	$('.saved_modal_settings').paulund_modal_box({

		title : 'Settings Saved',
		description : 'Your settings have been successfully saved.'

	});

	$('.save_modal_category').paulund_modal_box({

		title : 'Item Added',
		description : 'Your new item has been successfully added.'

	});
	
	$('.invoice_paid_modal').paulund_modal_box({

		title : 'Payment Received!',
		description : 'Payment for this invoice has been received.  It will be marked as paid if the invoice has been paid in full'

	});
    
    $('.customer_saved_modal').paulund_modal_box({

		title : 'Customer Information Updated!',
		description : 'Customer information has been successfully saved.'

	});
    
    $('.delete_complete').paulund_modal_box({
        
        title:"Invoice Deleted",
        description:"Invoice was successfully deleted"
        
    });
    


}

function clearForm() {


	$(".searchbox").val("");
	$("input[name='invoiceid']").val("");
	$("input[name='clientname']").val("");
	$("input[name='clientemail']").val("");
	$("input[name='clienttitle']").val("");
	$("input[name='clientstreetaddress']").val("");
	$("input[name='clientcitystate']").val("");
	$("input[name='clientzipcode']").val("");
	$("input[name='expirationdays']").val("");
	$("input[name='invoiceid']").val("");
	$(".invoiceidlabel").hide();
	$(".invoideIDlabelval").val("");
	$(".clientid").val("");
	$("input[name='clientname']").prop("disabled",false);
	$("input[name='clientemail']").prop("disabled",false);
	$("input[name='clienttitle']").prop("disabled",false);
	$("input[name='clientstreetaddress']").prop("disabled",false);
	$("input[name='clientcitystate']").prop("disabled",false);
	$("input[name='clientzipcode']").prop("disabled",false);
	$(".createinvoicecopy").prop('checked',false);
	$(".subtotalsum").html("$0.00");
	$(".totaltaxes").html("$0.00");
	$(".totalsum").html("$0.00");
	$(".expensestotal").html("$0.00");
	
	$("span[data-ajax-target='createinvoicenet']").html("$0.00");
	
    $(".createcopydiv").hide();

	var element = $(".itemrow").last().clone();

	$(".itemscontainer").empty();

	element.find(".description").val("");
	element.find(".itemid").val("");
	element.find(".quantity").val("1");
	element.find(".price").val("");
	element.find(".itemname").val("");
	element.find(".hiddentax").val("0");
	element.find(".tax").prop('checked', false);
	element.find(".hiddenexpense").val("0");
	element.find(".expense").prop('checked', false);

	$(".itemscontainer").append(element);

}

function calculateTotals() {


	var savedtotal = Number(0);
	var senttotal = Number(0);
	var expiredtotal = Number(0);
	var paidtotal = Number(0);


	var element = $(".invoicessent").find('.innerrow:visible');
	$(element).each(function() {

		senttotal = Number(senttotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));
	});

	var element2 = $(".invoicesaved").find(".innerrow:visible");
	$(element2).each(function() {

		savedtotal = Number(savedtotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));

	});
	
	var element3 = $(".invoiceexpired").find(".innerrow:visible");
	$(element3).each(function() {

		expiredtotal = Number(expiredtotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));

	});
	
	var element3 = $(".invoicepaid").find(".innerrow:visible");
	$(element3).each(function() {

		paidtotal = Number(paidtotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));

	});

	$(".deliveredtotal").html(senttotal.toFixed(2));
	$(".savedinvoicetotal").html(savedtotal.toFixed(2));
	$(".expiredinvoicetotal").html(expiredtotal.toFixed(2));
	$(".paidinvoicetotal").html(paidtotal.toFixed(2));

}

function calculateTotalsAll() {

	var savedtotal = Number(0);
	var senttotal = Number(0);
	var expiredtotal = Number(0);
	var paidtotal = Number(0);

	var element = $(".invoicessent").find('.innerrow');
	$(element).each(function() {

		senttotal = Number(senttotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));
	});

	var element = $(".invoicesaved").find(".innerrow");
	$(element).each(function() {

		savedtotal = Number(savedtotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));

	});
	
	var element3 = $(".invoiceexpired").find(".innerrow");
	$(element3).each(function() {

		expiredtotal = Number(expiredtotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));

	});
	
	var element3 = $(".invoicepaid").find(".innerrow");
	$(element3).each(function() {

		paidtotal = Number(paidtotal) + Number($(this).find(".invoicerowtotal").attr("data-val"));

	});
	
	

	$(".deliveredtotal").html(senttotal.toFixed(2));
	$(".savedinvoicetotal").html(savedtotal.toFixed(2));
	$(".expiredinvoicetotal").html(expiredtotal.toFixed(2));
	$(".paidinvoicetotal").html(paidtotal.toFixed(2));
}


function hideAll(){
	
	
	$(".settings").hide();
	$(".categories").hide();
	$(".Search").hide();
	$(".homepage").hide();
	$(".invoice").hide();
    $(".customerspage").hide();
	$(".reports").hide();
	
}

function ResizeText(){
	
	var span = $(".invoicetotal");
	
	var width = span.css("width");
	
	var parentwidth = span.parent().css("width");

	if(width>parentwidth){
		
		
		span.parent().css("clear","both");
		span.parent().css("width",span);
		
		
	}else{
		
		span.parent().css("clear","none");
		span.parent().css("width",parentwidth);
		
	}

	
}

function LoadHomePageData($date){



	
	
	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			GetHomPageData : "true",Date:$date
		}
	}).done(function(data) {
	
		
		var data = JSON.parse(data);


		//"totalunpaid" => $totalunpaid,
		//"totalpaid" => $totalpaid,
		//"totalestimates" => $totalestimates, 
		//"invoicetotal" => $totalinvoice, 
		//"totalexpired" => $totalexpired

		var totalpending = data.totalunpaid;
		
		var estimatetotalwidth = data.totalestimates/totalpending;
		
		var invoicestotalwidth = data.invoicetotal/totalpending;
		
		var expiredtotalwidth = data.totalexpired/totalpending;
		
		var widths = [];
		
		widths["invoicewidth"]=invoicestotalwidth;
		widths["estimatewidth"]=estimatetotalwidth;
		widths["expirewidth"]=expiredtotalwidth;
		
		var largest=0;
		var index="";
		
		for (var arrayIndex in widths){
			
			
			if (widths[arrayIndex]>largest){
				
				largest = widths[arrayIndex];
				index=arrayIndex;
				
			}
			
		}
		

   		var difference = 0;
   		
		if(estimatetotalwidth!=0){
			
			if (estimatetotalwidth<.10){
				
				difference = difference + .10-estimatetotalwidth;
				estimatetotalwidth = .10;
				
				
			}
			
			$(".homepage .estimatetotal").parent().css('min-width',estimatetotalwidth*100+"%");
			
		}else{
			
			
			$(".homepage .estimatetotal").parent().hide();
		}
		
		if(invoicestotalwidth!=0){
			
			if (invoicestotalwidth <.10){
				
				difference = difference + .10-invoicestotalwidth;
				invoicestotalwidth = .10;
				
			}
			
			$(".homepage .invoicetotal").parent().css('min-width',invoicestotalwidth*100+"%");
			
		}else{
			
			$(".homepage .invoicetotal").parent().hide();
			
		}
		
		if(expiredtotalwidth!=0){
			
			if(expiredtotalwidth<.10){
				
				difference = difference + .10-expiredtotalwidth;
				expiredtotalwidth = .10;
				
			}
			
			$(".homepage .expiredtotal").parent().css('min-width',expiredtotalwidth*100+"%");
			
		}else{
			
			$(".homepage .expiredtotal").parent().hide();
			
		}	
		
		if(index=="invoicewidth"){
			
			$(".homepage .invoicetotal").parent().css('min-width',(invoicestotalwidth-difference)*100+"%");
				
		}
		if(index=="estimatewidth"){

			$(".homepage .estimatetotal").parent().css('min-width',(estimatetotalwidth-difference)*100+"%");
		   
		}
		if(index=="expirewidth"){
			
			$(".homepage .expiredtotal").parent().css('min-width',(expiredtotalwidth-difference)*100+"%");
				
		}
		
		
		$(".homepage .estimatetotal").html("$"+data.totalestimates);
		$(".homepage .invoicetotal").html("$"+data.invoicetotal);
		$(".homepage .expiredtotal").html("$"+data.totalexpired);
		$(".homepage .pendingincometotal").html("$"+data.totalunpaid);
		$(".homepage .receivedincometotal").html("$"+data.totalpaid);
		$(".homepage .receivedincome").html("$"+data.totalpaid);
		$(".homepage .totalexpenses").html("$"+data.totalexpense);
		$(".homepage .netincome").html("$"+(data.totalpaid-data.totalexpense).toFixed(2));
		$(".homepage .estimatecount").html(data.estimatecount);
		$(".homepage .expiredcount").html(data.expiredcount);
		$(".homepage .invoicecount").html(data.invoicecount);

		if (data.totalpaid-data.totalexpense < 0){
			
			$(".homepage .netincome").css("color","red");
			
		}else{
			
			$(".homepage .netincome").css("color","#53BC44");
			
		}
		
		

	});
	
}

function GetMonthData(){
	
	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			
			GetMonthsData:true
		}
	}).done(function(data) {


		var jsondata = JSON.parse(data);

		$(".monthdropdown").empty();

		
		var date = new Date();
		var contains = false;

		jQuery.each(jsondata,function(){
			
			if(date.getMonth()+1==this.monthvalue && date.getFullYear() == this.year){
				
				contains = true;
				
			$(".monthdropdown").append("<option selected value='" + this.monthvalue+","+this.year + "'>" + this.monthname+" "+this.year + "</option>");

		}else{
		
		$(".monthdropdown").append("<option value='" + this.monthvalue+","+this.year + "'>" + this.monthname+" "+this.year + "</option>");
	
		}
			
		});
		
		if (contains == false){
			
			
			var months = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
			
			$(".monthdropdown").append("<option selected value='" + date.getMonth()+1+","+date.getFullYear() + "'>" + months[date.getMonth()] +" "+date.getFullYear() + "</option>");
			
		}


	});
	
}

function GetMonthDataTransaction(){
	
	$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			
			GetMonthsDataTransactions:true
		}
	}).done(function(data) {


		var jsondata = JSON.parse(data);

        $(".monthdropdowntransactions").empty();
		
		var date = new Date();

		var contains = false;

		jQuery.each(jsondata,function(){
			
			
			if(date.getMonth()+1==this.monthvalue && date.getFullYear() == this.year){
			
			contains = true;
			
            $(".monthdropdowntransactions").append("<option selected value='" + this.monthvalue+","+this.year + "'>" + this.monthname+" "+this.year + "</option>");
		}else{
	
		$(".monthdropdowntransactions").append("<option value='" + this.monthvalue+","+this.year + "'>" + this.monthname+" "+this.year + "</option>");
		}
			
		});
		
		if (contains == false){
			
			
			var months = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
			
			$(".monthdropdowntransactions").append("<option selected value='" + date.getMonth()+1+","+date.getFullYear() + "'>" + months[date.getMonth()] +" "+date.getFullYear() + "</option>");
			
		}


	});
	
}

function disableCustomerFields(){
    
    //disable so name can't be changed
		$("input[name='clientname']").prop("disabled",true);
		$("input[name='clientemail']").prop("disabled",true);
		$("input[name='clientstreetaddress']").prop("disabled",true);
		$("input[name='clientcitystate']").prop("disabled",true);
		$("input[name='clientzipcode']").prop("disabled",true);
		//$("input[name='clienttitle']").prop("disabled",true);
		
    
}

function enableCustomerFields(){
    
    //disable so name can't be changed
		$("input[name='clientname']").prop("disabled",false);
		$("input[name='clientemail']").prop("disabled",false);
		$("input[name='clientstreetaddress']").prop("disabled",false);
		$("input[name='clientcitystate']").prop("disabled",false);
		$("input[name='clientzipcode']").prop("disabled",false);
		//$("input[name='clienttitle']").prop("disabled",false);
    
}

function LoadInvoiceImages(invoiceID,slide){
	
	
//load invoice pics
$.ajax({

		type : "GET",
		cache : false,
		url : "Data/DataModel.php",
		data : {
			
			GetInvoiceImages:true,
			InvoiceID:invoiceID
		}
	}).done(function(data) {

		var jsondata = JSON.parse(data);
        
		$("#invoiceimagecontainer .row").empty();

		jQuery.each(jsondata,function(){
			
			$("#invoiceimagecontainer .row").append("<li class='col-lg-2 col-md-3 col-sm-6 col-xs-12'><div class='ProjectsImageHolder' data-ajax-id='"+this.ID+"'><img class='itemimage' src='"+this.link+"'/><a href='#' onclick='return false;' class='deleteimage' data-invoice-id='"+invoiceID+"' id='deleteimage' data-image-id='"+this.ID+"'>Delete</a><br/><a class='directionarrows' id='verticalflip' data-direction='Vertical' href='#' onclick='return false;' data-image-id='"+this.ID+"'>↕</a>&nbsp;&nbsp;<a class='directionarrows' id='horizontalflip' data-direction='Horizontal' href='#' onclick='return false;' data-imageid='"+this.ID+"'>↔</a></div></li>");
			
			
		});

		if(slide){
		$(".imagessection[data-invoice-id='"+invoiceID+"']").slideToggle();
		}
		
	});
	
}

function initializeDatePickers(){
	
	//initialize date pickers
	$( ".datepicker" ).datepicker({showButtonPanel: true});
	
}


function sortCustomers(order,ascdes,parent) {



  // Get the list items and setup an array for sorting
  var list = $(".customerrow ."+order);

  var vals = [];

  // Populate the array
  for(var i = 0, l = list.length; i < l; i++){
	  
	
	if(parent == "customerinvoices"){
		

		var num = list[i].getElementsByTagName("span")[1].innerHTML;
		vals.push(num);
		
		
	}else{
		
    vals.push(list[i].innerHTML);
	
	}
  }

  // Sort it
  if(order == "totalamount" || order == "expensetotalamount" || order == "net"){
	  
	  vals.sort(function(a,b) { return a - b; });
	  
  }else{
	  
	  vals.sort();
	  
  }
 
  if(ascdes== "asc"){
  vals.reverse();
}

var rows = $(".customerrow");

var removerows = "."+parent+" .customerrow";

$(removerows).remove();
  // Change the list on the page
  for(var i = 0, l = list.length; i < l; i++)
  {
	  
  jQuery.each(rows,function(){

  
  if(parent == "customerinvoices"){
		
		var currentval = $(this).find("."+order).find("span")[1];
		currentval = currentval.innerHTML;
		
	}else {
		
		currentval = $(this).find("."+order).html();
	
	}
    
    if(currentval == vals[i]){
        
       $("."+parent).append($(this));
        
    }
    
  });
  }
}

 function validateReportDates(startdatetextbox,enddatetextbox){
	 
	 if (startdatetextbox.val() == ""){
		 
		startdatetextbox.addClass("inputerror");
		return false;
	
	}else{
		
		startdatetextbox.removeClass("inputerror"); 
		
	 }
	 
	 if (enddatetextbox.val() == ""){
		 
		 enddatetextbox.addClass("inputerror");
		 return false;
		 
	 }else{
		 
		 enddatetextbox.removeClass("inputerror");
	 
	 }	 
	 
	 var startdate = new Date(startdatetextbox.val());
	 var enddate = new Date(enddatetextbox.val());
	 
	 if(enddate<startdate){
		 
		 startdatetextbox.addClass("inputerror");
		 enddatetextbox.addClass("inputerror");
		 
		 return false;
		 
	 }else{
		 
		 startdatetextbox.removeClass("inputerror"); 
		 enddatetextbox.removeClass("inputerror");
	 }
	 
	 return true;
	 
 }