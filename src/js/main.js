"use strict";

var oSmartTableAg = {};

$(function(){
});

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
					aResponse.push($(v2).text());
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