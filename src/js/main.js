"use strict";

var oSmartTableAg = {};

$(function(){
	var aArray = oSmartTableAg.getArrayFromTable('#table1');

	console.log(aArray);
});

oSmartTableAg.getArrayFromTable = function(sTag){
	var aArray = [];
	
	$.each($(sTag).find("tr"), function(i, v){
		if($(v).attr("data-type") == "data"){
			var iIndex = 0;
			var oObject = oSmartTableAg.getObjectFromTable(sTag);
			
			$.each(oObject, function(i2, v2){
				if($($(v).find("td")[iIndex]).attr('data-ignorefield') != 'true'){
					var sValue = $($(v).find("td")[iIndex]).text();
					oObject[i2] = sValue;
				}
				iIndex++;
			});

			aArray.push(oObject);
		}
	});

	return aArray;
}

oSmartTableAg.getObjectFromTable = function(sTag){
	var oObject = {};
	var iIndex = -1;

	do{
		iIndex++;
		var sType = $($(sTag).find("tr")[iIndex]).attr('data-type');

		if(sType == 'title'){
			$.each($($(sTag).find("tr")[iIndex]).find("th"), function(i, v){
				var sId = $(v).attr("data-id");
				oObject[sId] = '';
			});
		}
	}while(sType != 'title' && iIndex < $(sTag).find("tr").length);

	return oObject;
}