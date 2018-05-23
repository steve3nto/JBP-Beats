var alt = false, currentbg = 0, altPressed = false, effects = false, loop = true;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor), isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1; isSafari = navigator.vendor.indexOf("Apple")==0 && /\sSafari\//.test(navigator.userAgent), isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

var bgmusic = [
	{file: "39-Hold_People-consolidated"},
	{file: "33-Applause-consolidated"}
];

var combos = [
	{key: 32, file: "32-Thats_That-consolidated", desc: "And That's That!"}, //spacebar
	{key: 81, file: "16-Quit_All_This_Nonsense-consolidated", desc: "Quit all this nonsense!", alt_file: "31-Language-consolidated", alt_desc: "Language that I detest!"}, //Q
	{key: 87, file: "34-Hello-consolidated", desc: "Hello", alt_file: "32-Thats_That-consolidated", alt_desc: "That's that!"}, //W
	{key: 69, file: "14-Lets_Assume-consolidated", desc: "Let's Assume...", alt_file: "28-Made_Up_Pronouns-consolidated", alt_desc: "Made-up Pronouns"}, //E
	{key: 82, file: "18-Mean_Mad_White_Man-consolidated", desc: "Mean Mad White Man!"}, //R
	{key: 88, file: "35-Fuck_PC-consolidated", desc: "Fuck Political Correctness!"}, //X
	{key: 65, file: "21-Be_A_Better_Person-consolidated", desc: "Be a better person", alt_file: "22-Its_A_Miracle-consolidated", alt_desc: "It's a Miracle!"}, //A
	{key: 83, file: "25-Mother_Grizzly-consolidated", desc: "Mother Grizzly Bears...", alt_file: "23-College_Students-consolidated", alt_desc: "College students..."}, //S
	{key: 68, file: "24-UFF-consolidated", desc: "UFF"}, //D
	{key: 79, file:"19-MMMMM-consolidated", desc: "MMMMMMM"}, //O
	{key: 90, file: "31-Language-consolidated", desc: "Language that I detest!", alt_file: "30-I_Know_The_Literature-consolidated", alt_desc: "I know the literature..."}, //Z
	{key: 67, file: "37-Well_Google_It-consolidated", desc: "Well, Google it!"}, //C
	{key: 85, file: "15-You_Would_Say-consolidated", desc: "You would say that."}, //U
	{key: 73, file: "17-Why_The_Rage-consolidated", desc: "Why the rage, BRAH!"}, //I
	{key: 66, file: "40-Please_Google_It-consolidated", desc: "Please Google it!"}, //B
	{key: 76, file: "29-Radical_PC-consolidated", desc: "Radical"}, //L
	{key: 74, file: "26-And_Its_Wrong-consolidated", desc: "And it's wrong!"}, //J
	{key: 75, file: "27-Back_To_Equity-consolidated", desc: "Back to equity..."}, //K
	{key: 80, file: "20-Get_Yourself_Together-consolidated", desc: "Get Yourself Together!"}, //P
	{key: 77, file: "19-MMMMM-consolidated", desc:"MMMMMMM"}, //M
	{key: 78, file: "24-UFF-consolidated", desc:"UFF"}, //N
	{key: 86, file: "38-Passion_and_Wit-consolidated", desc:"Passion and Wit..."}, //V
	{key: 71, file: bgmusic[currentbg].file, desc:String.fromCharCode(9835)}
];

$(document).ready(function(){
	if(isAndroid) window.alert("Please rotate your device to landscape (horizontal) mode.");
	updateZoom();
	//create audio elements in HTML file
	for(i=0;i<combos.length-1;i++){
		var audio = document.createElement("audio");
		audio.setAttribute('id', combos[i].file);
		audio.setAttribute('src', "audio/"+combos[i].file+".ogg");
		document.body.appendChild(audio);
	}
	for(i=0;i<combos.length-1;i++){
		if(combos[i].alt_file!=undefined){
			var audio = document.createElement("audio");
			audio.setAttribute('id', combos[i].alt_file);
			audio.setAttribute('src', "audio/"+combos[i].alt_file+".ogg");
			document.body.appendChild(audio);
		}
	}
	for(i=0;i<bgmusic.length;i++){
		var audio = document.createElement("audio");
		audio.setAttribute('id', bgmusic[i].file);
		audio.setAttribute('src', "audio/"+bgmusic[i].file+".ogg");
		document.body.appendChild(audio);
	}
	if(isChrome) process(71);
	if(!isChrome && !isSafari){
		$(".letter").css({
			'font-family': 'Verdana'
		})
	}
});

$(window).resize(function(){
	updateZoom();
})

$(document).keydown(function(e){
	$("div").removeClass("clicked");
	e.preventDefault();
	process(e.which);
});

$(document).keyup(function(e){

	if(e.which==18 && alt && altPressed){
		e.preventDefault();
		altKeys();
		$("#recplay").addClass("hidden");
		altPressed = false;
	}
});

$(".key").click(function(){
	var cont = true;
	letter = $(this).find(".letter").html();

	switch(letter){
		case "unwomo":
			keycode = 32;
			break;

		case "ALT":
			if(altPressed){
				altKeys();
				altPressed=false;
				cont = false;
			}
			keycode = 18;
			break;

		default:
			keycode = letter.charCodeAt();
			break;
	}
	if(cont) process(keycode);
});

function altKeys(){
	$(".alt").toggleClass("special_toggle");
	$(".message").toggleClass("hidden");
	$(".message2").toggleClass("hidden");

	if(!alt){
		$(".key:not(:has(.alt_message))").find(".letter").addClass("out");
		$(".letter").not(".out").not(".option").addClass("red");

		$("#loop").removeClass("option").addClass("out");
		$("#effects").removeClass("option").addClass("out");

		$("#prev").html("F").removeClass("special").removeClass("red");

		$("#playbutt").html("G").removeClass("special").removeClass("red").parent().removeClass("special_toggle");

		$("#next").html("H").removeClass("special").removeClass("red");

		$(".alt").find(".letter").addClass("red");

		alt = true;
	} else {
		$(".key:not(:has(.alt_message))").find(".letter").removeClass("out");
		$(".letter").not(".out").not(".option").not("#effects").removeClass("red");

		$("#prev").html("&#8678;").addClass("special").addClass("red");

		if(document.getElementById(bgmusic[currentbg].file).currentTime!=0){
			$("#playbutt").html("&#9632;").addClass("special").addClass("red").parent().addClass("special_toggle");
		} else $("#playbutt").html("&#9654;").addClass("special").addClass("red");

		$("#next").html("&#8680;").addClass("special").addClass("red");

		if(effects) $("#effects").addClass("option");
		else $("#effects").addClass("out");

		if(loop) $("#loop").addClass("option");
		else $("#loop").addClass("out");

		$(".alt").find(".letter").removeClass("red");

		alt = false;
	}
}

function changeMusic(key){
	if(key==70 && !altPressed){
		if(currentbg==0) currentbg=bgmusic.length-1;
		else currentbg--;
	}
	if(key==72 && !altPressed){
		if(currentbg==bgmusic.length-1) currentbg=0;
		else currentbg++;
	}
	combos[combos.length-1].file=bgmusic[currentbg].file;
}

function glow(keypr){
	if(keypr == 32) key = $("#spacebar");
	else{
		keychar = String.fromCharCode(keypr);
		key = $('.letter').filter(function(){
			return $(this).text() === keychar;
		}).parent()
	};
	key.toggleClass("clicked");
	setTimeout(function(){
		key.removeClass("clicked");
	}, 100);
}

function play(id){
	document.getElementById(id).currentTime=0;
	$("#"+id).trigger("play");
}

function playToggle(){
	playbutt=$("#playbutt");
	playbutt.parent().toggleClass("special_toggle");
	if(playbutt.html().charCodeAt()==9654){
		playbutt.html("&#9632;"); //9632 = stop
		var curr = document.getElementById(bgmusic[currentbg].file);
		curr.volume=0.5;
		play(bgmusic[currentbg].file);
		curr.addEventListener('ended', function(){
			if(loop){
				play(bgmusic[currentbg].file)
			} else {
				stop(bgmusic[currentbg].file);
	    		playbutt.html("&#9654;");
	    		playbutt.parent().removeClass("special_toggle");
			}
		});
	}
	else{
		(playbutt.html("&#9654;"));
		stop(bgmusic[currentbg].file);
	}
}

function process(key){
	if(!altPressed){
		switch(key){
			case 8678:
			case 70: //prev-recplay
				stop(bgmusic[currentbg].file);
				if($("#playbutt").parent().hasClass("special_toggle")){
					$("#playbutt").parent().removeClass("special_toggle");
					playbutt.html("&#9654;");
				}
				changeMusic(70);
				playToggle();

				key = $("#prev").parent();
					key.toggleClass("special_toggle");
					setTimeout(function(){
						key.removeClass("special_toggle");
					}, 100);

				break;

			case 8680:
			case 72: //next
				stop(bgmusic[currentbg].file);
				if($("#playbutt").parent().hasClass("special_toggle")){
					$("#playbutt").parent().removeClass("special_toggle");
					playbutt.html("&#9654;");
				}
				changeMusic(72);
				playToggle();

				key=$("#next").parent();
				key.toggleClass("special_toggle");
				setTimeout(function(){
					key.removeClass("special_toggle");
				}, 100);

				break;

			case 9654: //play
			case 9632: //stop
			case 71: //play-stop
				playToggle();
				break;

			case 84: //T (loop)
				glow(key);
				loop = toggleOption(loop, "#loop");
				break;

			case 89: //Y (effects)
				glow(key);
				effects = toggleOption(effects, "#effects");
				break;

			case 18: //ALT
				altKeys();
				altPressed = true;
				break;

			default:
				for(i=0;i<combos.length;i++){
					if(key == combos[i].key){
						glow(key);
						play(combos[i].file);
						scritte(combos[i].desc);
						break;
					}
				}
		}
	} else {
		switch(key){
			case 8678:
			case 70: //prev-recplay
			case 8680:
			case 72: //next
			case 9654: //play
			case 9632: //stop
			case 71: //play-stop
			case 84:
			case 89:
				break;

			default:
				for(i=0;i<combos.length;i++){
					if(key == combos[i].key && combos[i].alt_file!=undefined){
						glow(key);
						play(combos[i].alt_file);
						scritte(combos[i].alt_desc);
					}
				}
		}
	}
}

function scritte(desc){
	if(effects){
		words = desc.split(" ");
		for(i=0;i<words.length;i++){
			var scritta = document.createElement("p");
			numero=(Math.random()*100 + 150).toFixed();
			scritta.setAttribute('class', 'scritta'+numero);
			var t = document.createTextNode(words[i]);
			scritta.appendChild(t);
			document.body.appendChild(scritta);

			size = ((Math.random()*100+50)).toFixed();
			posx = (Math.random() * ($(window).width()).toFixed());
			posy = (Math.random() * ($(window).height()).toFixed());


	    	$(".scritta"+numero).css({
	    		'position': 'absolute',
	            'font-size': size+'px'
	        });


			width = $(".scritta"+numero).outerWidth();
			height = $(".scritta"+numero).outerHeight();

			while(posx+width>=$(window).width() || posy+height>=$(window).height()){
				posx -= 10;
				posy -= 10;
			}

			$(".scritta"+numero).css({
				'position': 'absolute',
	            'left':posx+'px',
	            'top':posy+'px',
	            'font-size': size+'px',
	            'color': '#D83712',
	            'margin': '0',
	            'padding': '0',
	        });

	    	$(".scritta"+numero).fadeIn(Math.floor(Math.random()*1000)).delay(2000).fadeOut(500, function(){

				$(this).remove()

			});
		}
	}
}

function stop(id){
	audio = document.getElementById(id);
	audio.pause();
	audio.currentTime=0;
}

function toggleOption(value, id){
	if(value){
		$(id).removeClass("option").addClass("out");
		return false
	}
	else {
		$(id).addClass("option");
		return true;
	}
}

function updateZoom(){
	//ugly css hacks here, will improve the keyboard code
	$(".keyboard").css({
	'zoom': window.screen.width/1920
	});
	$(".header").css({
	'zoom': window.screen.width/1920
	});
}
