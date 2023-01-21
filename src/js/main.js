"use strict";

var oSmartTableAg = {};

/*
*/
oSmartTableAg.add = (sTag, sTagFields) => {
	let oElement = document.querySelector(sTag);
	let oFields = document.querySelector(sTagFields);
	let oTBody = oFields.querySelector('tbody');

	console.log(typeof oTBody.innerHTML);

	// $(sTag).append($(sTagFields).find('tbody').html());
	// oSmartTableAg.setEventsFromTable(sTag);
}

/*
*/
oSmartTableAg.setEventsFromTable = (sTag) => {
	let oElement = document.querySelector(sTag);
	let sNameTable = oElement.getAttribute('id');
	let iRow = 0;
	let iColumn = 0;

	let oTr = oElement.querySelector('tr');

	do{
		let sDataType = oTr.getAttribute('data-type');

		if(sDataType !== null && sDataType === 'data'){
			// Loading field names.
			iColumn = 0;
			iRow = iRow + 1;

			let oTd = oTr.querySelector('td');

			do{
				let oInput = oTd.querySelector('input');
				let sDataInput = oTd.getAttribute('data-input');

				if(sDataInput == 'text'){
					oInput.setAttribute('name', `${sNameTable}${iRow}${iColumn}`);
					iColumn++;
				}
				if(sDataInput == 'radio'){
					oInput.setAttribute('name', `${sNameTable}Radio${iColumn}`);
					iColumn++;
				}

				oTd = oTd.nextElementSibling;
			}while(oTd !== null);
			// Loading field names.

			// Event delete.
			let oButton = oTr.querySelector('.smarttable-ag-delete');
			oButton.addEventListener('click', () => {
				let oTrParent = oButton.parentElement.parentElement;
				let oTBodyParent = oTrParent.parentElement;

				oTBodyParent.removeChild(oTrParent);
			});
			// Event delete.
		}

		oTr = oTr.nextElementSibling;
	}while(oTr !== null);
}

/*
*/
oSmartTableAg.getArrayFromTable = (sTag) => {
	var aArray = [];
	
	/*$.each($(sTag).find("tr"), function(i, v){
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
			oObject.id = (typeof iIdData !== "undefined") ? iIdData : "";

			aArray.push(oObject);
		}
	});*/

	return aArray;
}

/*
*/
oSmartTableAg.getObjectFromTable = (sTag) => {
	var oObject = {};
	var iIndex = -1;

	/*do{
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
	}while(sType != 'title' && iIndex < $(sTag).find("tr").length);*/

	return oObject;
}