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
	
	let backgroundimage = ("url(" + path + ")");
	$("#image-box").css("background-image", backgroundimage);
});

/*--- Save file ---*/
$("#savefile").click(function() {
	closeBoxes();
	download();
});

/*--- Close file ---*/
$("#closefile").click(function() {
	closeBoxes();
	console.log("Close file pressed.");
});


/********* Adjustments **********/

/*--- Brightness ---*/
const brightnessValue = $('#brightnessValue');
const brightnessRegex = /brightness(.*?)(\s|(?="))/;
const brightnessUnit = ["brightness", "%", 0, 0, 0, 500, 100]; //filtername, units, operator, factor, min, max, present

$("#brightness").click(function() {
	closeBoxes();
	$("#brightness-dialog").css("display", "block");
	slider("#brightness-slider", brightnessValue, brightnessRegex, brightnessUnit);
});

$("#brightness-ok").click(function() {
	$("#brightness-dialog").css("display", "none");
});

$("#brightness-dialog").draggable();
/*-------------------------------------*/

/*--- Contrast ---*/
const contrastValue = $('#contrastValue');
const contrastRegex = /contrast(.*?)(\s|(?="))/;
const contrastUnit = ["contrast", "%", 0, 0, 0, 250, 100]; //filtername, units, operator, factor, min, max, present

$("#contrast").click(function() {
	closeBoxes();
	$("#contrast-dialog").css("display", "block");
	slider("#contrast-slider", contrastValue, contrastRegex, contrastUnit);
});

$("#contrast-ok").click(function() {
	$("#contrast-dialog").css("display", "none");
});

$("#contrast-dialog").draggable();
/*-------------------------------------*/

/*--- Saturation ---*/
const saturateValue = $('#saturateValue');
const saturateRegex = /saturate(.*?)(\s|(?="))/;
const saturateUnit = ["saturate", "%", "+", 100, -100, 250, 0]; //filtername, units, operator, factor, min, max, present

$("#saturate").click(function() {
	closeBoxes();
	$("#saturate-dialog").css("display", "block");
	slider("#saturate-slider", saturateValue, saturateRegex, saturateUnit);
});

$("#saturate-ok").click(function() {
	$("#saturate-dialog").css("display", "none");
});

$("#saturate-dialog").draggable();
/*-------------------------------------*/

/*--- Hue ---*/
const hueValue = $('#hueValue');
const hueRegex = /hue-rotate(.*?)(\s|(?="))/;
const hueUnit = ["hue-rotate", "deg", 0, 0, 0, 360, 0]; //filtername, units, operator, factor, min, max, present

$("#hue").click(function() {
	closeBoxes();
	$("#hue-dialog").css("display", "block");
	slider("#hue-slider", hueValue, hueRegex, hueUnit);
});

$("#hue-ok").click(function() {
	$("#hue-dialog").css("display", "none");
});

$("#hue-dialog").draggable();
/*-------------------------------------*/

/********* Filters **********/

/*--- Blur ---*/
const blurValue = $('#blurValue');
const blurRegex = /blur(.*?)(\s|(?="))/;
const blurUnit = ["blur", "px", "/", 5, 0, 100, 0]; //filtername, units, operator, factor, min, max, present

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
const bwRegex = /grayscale(.*?)(\s|(?="))/;
const bwUnit = ["grayscale", "%", 0, 0, 0, 100, 0]; //filtername, units, operator, factor, min, max, present

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
const sepiaUnit = ["sepia", "%", 0, 0, 0, 100, 0]; //filtername, units, operator, factor, min, max, present

$("#sepia").click(function() {
	closeBoxes();
	$("#sepia-dialog").css("display", "block");
	slider("#sepia-slider", sepiaValue, sepiaRegex, sepiaUnit);
});

$("#sepia-ok").click(function() {
	$("#sepia-dialog").css("display", "none");
});

$("#sepia-dialog").draggable();
/*-------------------------------------*/

/*--- Invert ---*/
const invertCheck = $('#invert-check');
const invertRegex = /invert(.*?)(\s|(?="))/;
const invertUnit = ["invert", "%", 0, 0, 0, 100, 0]; //filtername, units, operator, factor, min, max, present

$("#invert").click(function() {
	closeBoxes();
	$("#invert-dialog").css("display", "block");
});

$("#invert-check").change(function() {
	console.log("Checkbox activated");
	checkbox(invertCheck, invertRegex, invertUnit);
});

$("#invert-ok").click(function() {
	$("#invert-dialog").css("display", "none");
});

$("#invert-dialog").draggable();
/*-------------------------------------*/



/********* Help **********/
/*--- About file ---*/
$("#about").click(function() {
	closeBoxes();
	$("#about-dialog").css("display", "block");
});

$("#about-close").click(function() {
	$("#about-dialog").css("display", "none");
});

$("#about-dialog").draggable();
/*-------------------------------------*/

/********** CHECKBOX FUNCTION **********/
function checkbox(check, regex, unit) {
	if (document.getElementById("invert-check").checked) {
		if (filter.search(regex) == -1) {filter += unit[0] + "(" + unit[1] + ") ";}
		filter = filter.replace(regex, unit[0] + "(100" + unit[1] + ") ");
		$("img").css("filter", filter);
	} else {
		filter = filter.replace(regex, unit[0] + "(0" + unit[1] + ") ");
		$("img").css("filter", filter);
	}
}

/********** SLIDER FUNCTION **********/
function slider(element, value, regex, unit) {
	$(element).slider({ 
		min: unit[4],
		max: unit[5],
		value: unit[6],
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
	else if (operator == "*") {return value * number}
	else if (operator == "+") {return number + value}
	else {return value}
	}
/*-------------------------------------------------------------------*/


/***** Closes all dialog boxes *****/
function closeBoxes() {
	$(".dialog").css("display", "none");
}


function download() {
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	let canImage = new Image();
	
	canImage.src = path;
	canvas.width = canImage.width;
	canvas.height = canImage.height;
	ctx.filter = filter;
	ctx.drawImage(canImage, 0, 0);
	/*----------*/

	canvas.toBlob((image) => {
		let file = new File([image], "Bilde.png")
		let imageUrl = URL.createObjectURL(image);
		let downloadFile = document.createElement('a');
		downloadFile.href = imageUrl;
		let fileType = filename.match(/.*\.(.*?)$/)[1];
		downloadFile.download = (filename.replace(fileType, "png"));
		downloadFile.click();
	})	
}

let zoom = 1;
/********* Hot Keys ********/
$("body").keydown(function(e) {
  if (e.key == "+") {
	  if (zoom < 7) {zoom += 0.25};
	  $("#image-box").css("zoom", zoom);
  } else if (e.key == "-") {
	  if (zoom > 0.25) {zoom -= 0.25}
	  $("#image-box").css("zoom", zoom);
  }
});

