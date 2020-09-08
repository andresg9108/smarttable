"use strict";

var oSmartTableAg = {};

$(function(){
});

/*
*/
oSmartTableAg.setEventsFromTable = function(sTag){
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
			if(sInput == 'ignorefield'){
				sRow += '<td data-ignorefield="true">' + $(v).html() + '</td>';
			}else{
				sRow += '<td data-input="' + sInput + '">' + $(v).html() + '</td>';
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
			var iIdData = $(v).attr("data-id");
			var oObject = oSmartTableAg.getObjectFromTable(sTag);
			var aResponse = [];

			$.each($(v).find("td"), function(i2, v2){
				if($(v2).attr('data-ignorefield') != 'true'){
					if($(v2).attr('data-input') == 'text'){
						aResponse.push($(v2).find('input').val());
					}else if($(v2).attr('data-input') == 'select'){
						aResponse.push($(v2).find('select').val());
					}else if($(v2).attr('data-input') == 'checkbox' || $(v2).attr('data-input') == 'radio'){
						aResponse.push($(v2).find('input').is(':checked'));
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
			oObject.data_id = (typeof iIdData !== "undefined") ? iIdData : "";

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