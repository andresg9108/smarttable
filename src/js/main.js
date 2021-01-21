"use strict";

var oSmartTableAg = {};

$(function(){
});

/*
*/
oSmartTableAg.add = function(sTag, sTagFields){
	$(sTag).append($(sTagFields).find('tbody').html());
	oSmartTableAg.setEventsFromTable(sTag);
}

/*
*/
oSmartTableAg.setEventsFromTable = function(sTag){
	var sNameTable = $(sTag).attr('id');
	var iRow = 0;
	var iColumn = 0;
	$.each($(sTag).find('tr'), function(i, v){
		if($(v).attr('data-type') == 'data'){
			// Loading field names.
			iColumn = 0;
			iRow = iRow + 1;
			$.each($(v).find('td'), function(i2, v2){
				if($(v2).attr('data-input') == 'text'){
					iColumn = iColumn + 1;
					$(v2).find('input').attr('name', sNameTable + iRow + iColumn);
				}
				if($(v2).attr('data-input') == 'radio'){
					iColumn = iColumn + 1;
					$(v2).find('input').attr('name', sNameTable + 'Radio' + iColumn);
				}
			});
			// Loading field names.

			// Event delete.
			$(v).find('.smarttable-ag-delete').on('click', function(){
				$(v).remove();
			});
			// Event delete.
		}
	});
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
						aResponse.push($(v2).find('input').is(':checked') ? 1 : 0);
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