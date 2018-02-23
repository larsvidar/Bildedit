console.log("Script loadet!");

let filter = "blur(0px) ";
let path = "";
let filename = "";
let blurValue = $('#blurValue');
let blurRegex = /blur(.*?)(\s|(?="))/;


/*************** MENU ***************/


/********** File Menu **********/

/*--- Load file ---*/
$("#file").on("change", function(e) {
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


/********* Filters **********/

/*--- Blur ---*/
$("#blur").click(function() {
	$("#blur-dialog").css("display", "block");
	slider("#blur-slider");
});

$("#blur-ok").click(function() {
	$("#blur-dialog").css("display", "none");
});

$("#blur-dialog").draggable();

function slider(element) {
	$(element).slider({ 
		max: 100,
		min: 0,
		slide: function(event, ui) {
			blurToggle(event, ui);
		}
	});
}

function blurToggle (event, ui) {
	if (filter.search(blurRegex) == -1) {filter += "blur(0px) ";}
	blurValue.html(ui.value);
	filter = filter.replace(blurRegex, "blur(" + ui.value/5 +"px) ");
	$("img").css("filter", filter);
}
 

/*--- Black and white ---*/
$("#blackwhite").click(function() {
	filter += "saturate(0%) ";
	$("img").css("filter", filter);
});


/*--- Sepia ---*/
$("#sepia").click(function() {
	filter += "sepia(100%) ";
	$("img").css("filter", filter);
});