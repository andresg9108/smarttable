"use strict";

var oSmartTableAg = {};

/*
*/
oSmartTableAg.add = (sTag, sTagFields) => {
	let oElement = document.querySelector(sTag);
	let oFields = document.querySelector(sTagFields).querySelector('tbody');

	oElement.querySelector('tbody').insertAdjacentHTML('beforeend', `${oFields.innerHTML}`);
	oSmartTableAg.loadTableEvents({
			smarttable: [sTag]
		});
}

/*
*/
oSmartTableAg.loadTableEvents = (oData) => {
	let aSmartTable = oData.smarttable;

	for(let i=0; i<aSmartTable.length; i++){
		let sTag = aSmartTable[i];
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

					if(oTBodyParent !== null && oTrParent !== null){
						oTBodyParent.removeChild(oTrParent);
					}
				});
				// Event delete.
			}

			oTr = oTr.nextElementSibling;
		}while(oTr !== null);
	}
}

/*
*/
oSmartTableAg.getArrayFromTable = (sTag) => {
	let oElement = document.querySelector(sTag);
	let aArray = [];

	let oTr = oElement.querySelector('tr');

	do{
		let sDataType = oTr.getAttribute('data-type');

		if(sDataType !== null && sDataType === 'data'){
			let iIdData = oTr.getAttribute('data-id');
			let oObject = oSmartTableAg.getObjectFromTable(sTag);
			let aResponse = [];

			let oTd = oTr.querySelector('td');

			do{
				let sDataIgnorefield = oTd.getAttribute('data-ignorefield');

				if(sDataIgnorefield !== 'true'){
					let sDataInput = oTd.getAttribute('data-input');

					if(sDataInput === 'text'){
						aResponse.push(oTd.querySelector('input').value);
					}else if(sDataInput === 'select'){
						aResponse.push(oTd.querySelector('select').value);
					}else if(sDataInput === 'checkbox' || sDataInput === 'radio'){
						aResponse.push((oTd.querySelector('input').checked) ? 1 : 0);
					}else{
						aResponse.push(oTd.innerHTML);
					}
				}

				oTd = oTd.nextElementSibling;
			}while(oTd !== null);

			let i2 = 0;
			for(let i in oObject){
				oObject[i] = aResponse[i2];
				i2++;
			}
			oObject.id = (iIdData !== null) ? iIdData : "";

			aArray.push(oObject);
		}

		oTr = oTr.nextElementSibling;
	}while(oTr !== null);
	
	return aArray;
}

/*
*/
oSmartTableAg.getObjectFromTable = (sTag) => {
	let oElement = document.querySelector(sTag);
	let oObject = {};

	let oTr = oElement.querySelector('tr');
	let bTittle = false;

	do{
		let sDataType = oTr.getAttribute('data-type');

		if(sDataType == 'title'){
			let oTh = oTr.querySelector('th');

			do{
				let sDataId = oTh.getAttribute('data-id');

				if(sDataId !== null){
					oObject[sDataId] = '';
				}

				oTh = oTh.nextElementSibling;
			}while(oTh !== null);

			bTittle = true;
		}

		oTr = oTr.nextElementSibling;
	}while(oTr !== null && !bTittle);

	return oObject;
}