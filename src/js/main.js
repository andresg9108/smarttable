"use strict";

var oSmartTableAg = {};

$(function(){
});

/*
*/
oSmartTableAg.setEventsFromTable = function(sTag){
	$.each($(sTag).find('#tableinputs').find('table').find('td'), function(i, v){
		$(v).find('input').keypress(function(e) {
			if(e.which == 13) {
				oSmartTableAg.add(sTag);
			}
		});
	});

	$.each($(sTag).find('tr'), function(i, v){
		if($(v).attr('data-type') == 'data'){
			$(v).find('#delete').on('click', function(){
				$(v).remove();
			});
		}
	});
}

/*
*/
oSmartTableAg.add = function(sTag){
	var sRow = '<tr data-type="data">';

	$.each($(sTag).find('#tableinputs').find('table').find('td'), function(i, v){
		var sInput = $(v).attr('data-input');

		if(typeof sInput !== "undefined"){
			if(sInput == 'text'){
				sRow += '<td data-input="text"><input type="text" value="' + $(v).find('input').val() + '" placeholder="' + $(v).find('input').attr('placeholder') + '" class="' + $(v).find('input').attr('data-class') + '" /></td>';
			}else if(sInput == 'select'){
				sRow += '<td data-input="select"><select class="' + $(v).find('select').attr('data-class') + '">';

				$.each($(v).find('option'), function(i2, v2){
					if($(v).find('select').val() == $(v2).val()){
						sRow += '<option value="' + $(v2).val() + '" selected>' + $(v2).text() + '</option>';
					}else{
						sRow += '<option value="' + $(v2).val() + '">' + $(v2).text() + '</option>';
					}
				});

				sRow += '</select></td>';
			}else if(sInput == 'ignorefield'){
				sRow += '<td data-ignorefield="true">' + $(v).html() + '</td>'
			}
		}
	});

	sRow += '</tr>';
	var oTableInputs = $(sTag).find('#tableinputs');
	$(sTag).find('#tableinputs').remove();
	$(sTag).append(sRow);
	$(sTag).append(oTableInputs);
	oSmartTableAg.setEventsFromTable(sTag);
}

/*
*/
oSmartTableAg.getArrayFromTable = function(sTag){
	var aArray = [];
	
	$.each($(sTag).find("tr"), function(i, v){
		if($(v).attr("data-type") == "data"){
			var oObject = oSmartTableAg.getObjectFromTable(sTag);
			var aResponse = [];

			$.each($(v).find("td"), function(i2, v2){
				if($(v2).attr('data-ignorefield') != 'true'){
					if($(v2).attr('data-input') == 'text'){
						aResponse.push($(v2).find('input').val());
					}else if($(v2).attr('data-input') == 'select'){
						aResponse.push($(v2).find('select').val());
					}else{
						aResponse.push($(v2).text());
					}
				}
			});

			var iIndex = 0;
			$.each(oObject, function(i2, v2){
				oObject[i2] = aResponse[iIndex];
				iIndex++;
			});

			aArray.push(oObject);
		}
	});

	return aArray;
}

/*
*/
oSmartTableAg.getObjectFromTable = function(sTag){
	var oObject = {};
	var iIndex = -1;

	do{
		iIndex++;
		var sType = $($(sTag).find("tr")[iIndex]).attr('data-type');

		if(sType == 'title'){
			$.each($($(sTag).find("tr")[iIndex]).find("th"), function(i, v){
				var sId = $(v).attr("data-id");
				if(typeof sId !== 'undefined'){
					oObject[sId] = '';
				}
			});
		}
	}while(sType != 'title' && iIndex < $(sTag).find("tr").length);

	return oObject;
}