console.log("Script loadet!");

let filter = "";
let path = "";
let filename = "";


/*************** MENU ***************/


/********** File Menu **********/

/*--- Load file ---*/
$("#file").on("change", function(e) {
	closeBoxes();
	let file = e.target.files[0];
	console.log(file);
	let reader = new FileReader();
	reader.onload = function(e2) {
		console.dir(e2);
		$("#loaded-image").attr("src", e2.target.result)
		path = e2.target.result;
	};
	reader.readAsDataURL(file);
	filename = file.name;
	$("#filename").text(filename);
	
	$("img").css("filter", "none");
	filter = "";
});

/*--- Save file ---*/
$("#savefile").click(function() {
	closeBoxes();
	download();
});

function download() {   
   let saveImg = document.getElementById("loaded-image").src;
   let downloadFile = document.createElement('a');
	downloadFile.href = saveImg;
	downloadFile.download = filename;
	downloadFile.click();
};

/*--- Close file ---*/
$("#closefile").click(function() {
	closeBoxes();
	console.log("Close file pressed.");
});


/********* Filters **********/

/*--- Blur ---*/
const blurValue = $('#blurValue');
const blurRegex = /blur(.*?)(\s|(?="))/;
const blurUnit = ["blur", "px", "/", "5"];

$("#blur").click(function() {
	closeBoxes();
	$("#blur-dialog").css("display", "block");
	slider("#blur-slider", blurValue, blurRegex, blurUnit);
});

$("#blur-ok").click(function() {
	$("#blur-dialog").css("display", "none");
});

$("#blur-dialog").draggable();
/*-------------------------------------*/
 
 
/*--- Black and white ---*/
const bwValue = $('#bwValue');
const bwRegex = /saturate(.*?)(\s|(?="))/;
const bwUnit = ["saturate", "%", "-", "100"]

$("#blackwhite").click(function() {
	closeBoxes();
	$("#bw-dialog").css("display", "block");
	slider("#bw-slider", bwValue, bwRegex, bwUnit);
});

$("#bw-ok").click(function() {
	$("#bw-dialog").css("display", "none");
});

$("#bw-dialog").draggable();
/*-------------------------------------*/


/*--- Sepia ---*/
const sepiaValue = $('#sepiaValue');
const sepiaRegex = /sepia(.*?)(\s|(?="))/;
const sepiaUnit = ["sepia", "%"]

$("#sepia").click(function() {
	closeBoxes();
	$("#sepia-dialog").css("display", "block");
	slider("#sepia-slider", sepiaValue, sepiaRegex, sepiaUnit);
});

$("#sepia-ok").click(function() {
	$("#sepia-dialog").css("display", "none");
});

$("#bw-dialog").draggable();
/*-------------------------------------*/





/********** SLIDER FUNCTION **********/
function slider(element, value, regex, unit) {
	$(element).slider({ 
		min: 0,
		max: 100,
		slide: function(event, ui) {
			toggle(event, value, ui, regex, unit);
		}
	});
}

function toggle (event, value, ui, regex, unit) {
	if (filter.search(regex) == -1) {filter += unit[0] + "(" + unit[1] + ") ";}
	value.html(ui.value);
	filter = filter.replace(regex, unit[0] + "(" + useValue(ui.value, unit[2], unit[3]) + unit[1] + ") ");
	$("img").css("filter", filter);
}

function useValue(value, operator, number) {
	if (operator == "/") {return value / number;} 
	else if (operator == "-") {return number - value}
	else {return value}
	}
/*-------------------------------------------------------------------*/


/***** Closes all dialog boxes *****/
function closeBoxes() {
	$(".dialog").css("display", "none");
}