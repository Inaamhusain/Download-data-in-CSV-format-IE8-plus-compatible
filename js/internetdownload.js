$(document).ready(function(){
    $('.download').click(function(){
        var data = $('#txt').val();
        if(data == '')
            return;
        
        JSONToCSVConvertor(data, true);
    });
		
});

/* function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "My_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    var checkIE = msieversion();
		if(checkIE){
				//Generate a file name
			var fileName = "My_";
			//this will remove the blank-spaces from the title and replace it with an underscore
			fileName += ReportTitle.replace(/ /g,"_");   
						var oWin = window.open();
            oWin.document.write('sep=,\r\n' + CSV);
            oWin.document.close();
            oWin.document.execCommand('SaveAs', true, fileName+".csv")
            oWin.close();
		}else{
		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    
			//Initialize file format you want csv or xls
			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
			
			// Now the little tricky part.
			// you can use either>> window.open(uri);
			// but this will not work in some browsers
			// or you will not get the correct file extension    
			
			//this trick will generate a temp <a /> tag
			var link = document.createElement("a");    
			link.href = uri;
			
			//set the visibility hidden so it will not effect on your web-layout
			link.style = "visibility:hidden";
			link.download = fileName + ".csv";
			
			//this part will append the anchor tag and remove it after automatic click
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
} */
 function JSONToCSVConvertor(JSONData,ShowLabel) {    
   var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;   
   var CSV = '';     
   if (ShowLabel) {
       var row = "";
       for (var index in arrData[0]) {
           row += index + ',';
       }
       row = row.slice(0, -1);
       CSV += row + '\r\n';
   }
   for (var i = 0; i < arrData.length; i++) {
       var row = "";
       for (var index in arrData[i]) {
          var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
          row += arrValue + ',';
       }
       row.slice(0, row.length - 1);
       CSV += row + '\r\n';
   }
   if (CSV == '') {        
       growl.error("Invalid data");
       return;
   }   
   var fileName = "Result";
	if(msieversion()){
		var oWin = window.open();
		oWin.document.write('sep=,\r\n' + CSV);
		oWin.document.close();
		oWin.document.execCommand('SaveAs', true, fileName + ".csv");
		oWin.close();
	} else {
	   var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
	   var link = document.createElement("a");    
	   link.href = uri;
	   link.style = "visibility:hidden";
	   link.download = fileName + ".csv";
	   document.body.appendChild(link);
	   link.click();
	   document.body.removeChild(link);
	}
}
function msieversion() {
	var ua = window.navigator.userAgent; 
	var msie = ua.indexOf("MSIE "); 
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number 
	{
		return true;
	} else { // If another browser, 
		return false;
	}
		return false; 
}
