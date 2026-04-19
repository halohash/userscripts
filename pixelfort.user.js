// ==UserScript==
// @name         PixelFort
// @namespace    http://tampermonkey.net/
// @version      2026-03-19.1
// @description  Useful tools for OWOT.
// @author       HaloHash
// @match        https://ourworldoftext.com/*
// @match        https://*.ourworldoftext.com/*
// @match        http://ourworldoftext.com/*
// @match        http://*.ourworldoftext.com/*
// @icon         https://ourworldoftext.com/static/favicon.png
// @grant        none
// @license GNU GPLv3
// @downloadURL https://halohash.github.io/userscripts/pixelfort.user.js
// @updateURL https://halohash.github.io/userscripts/pixelfort.user.js
// ==/UserScript==


let protectedTextRunner = undefined;
function writeText(text, posList, colorList) {
    if (typeof text !== 'string') {
        console.error("writeText expects a string, but got: ", text);
        return;
    }
    let OGXpos = posList[0];
    for (let char of text) {
        writeCharToXY(char, colorList, posList[0], posList[1]);
        if (char === "\n") {
            posList[1] += 1;
            posList[0] = OGXpos;
        } else {
            posList[0] += 1;
        }
    }
}
window["writeText"] = function(text, posList, colorList) {
    if (typeof text !== 'string') {
        console.error("writeText expects a string, but got: ", text);
        return;
    }
    let OGXpos = posList[0];
    for (let char of text) {
        writeCharToXY(char, colorList, posList[0], posList[1]);
        if (char === "\n") {
            posList[1] += 1;
            posList[0] = OGXpos;
        } else {
            posList[0] += 1;
        }
    }
}
function getFormattedUTCTime() {
    const now = new Date();

    const options = {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);

    const get = type => parts.find(p => p.type === type).value;

    return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')} ${get('dayPeriod')}`;
}
function stylize(text) {
    text = text.toString().replaceAll("0", "🯰");
    text = text.toString().replaceAll("1", "🯱");
    text = text.toString().replaceAll("2", "🯲");
    text = text.toString().replaceAll("3", "🯳");
    text = text.toString().replaceAll("4", "🯴");
    text = text.toString().replaceAll("5", "🯵");
    text = text.toString().replaceAll("6", "🯶");
    text = text.toString().replaceAll("7", "🯷");
    text = text.toString().replaceAll("8", "🯸");
    text = text.toString().replaceAll("9", "🯹");
    text = text.toString().replaceAll("-", "—");
    return text;
}
let refreshCounter = 0;

// Random Unicode block character generator
function randomBlockChar() {
  const start = 0x10000;
  const end = 0x1F67F;
  return String.fromCharCode(
    Math.floor(Math.random() * (end - start + 1)) + start
  );
}


let tmsx = null;

menu.addCheckboxOption(
  "Rammer",
  function () {
    const size = 5;

    // 🛑 prevent duplicate intervals
    if (tmsx !== null) return;

    tmsx = setInterval(() => {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          writeCharToXY(
            randomBlockChar(),
            0,
            tileC * currentPosition[0] + currentPosition[2] + x,
            tileR * currentPosition[1] + currentPosition[3] + y
          );
        }
      }
    }, 0x19);
  },
  function () {
    if (tmsx !== null) {
      clearInterval(tmsx);
      tmsx = null; // 🔥 important
    }
  },
  false
);
    /*
    if(state.worldModel.color_text>0){alert("WARNING\n========================\nColors are disabled on this world")}
/*    // Chars per second detection
    if(state.worldModel.char_rate[1]<513){
        if(state.worldModel.char_rate[1]<100){
        alert("WARNING\n========================\nThis world has a very low characters per second value.\nThis heavily affects all scripts.")
        } else {
        alert("!!!WARNING!!!\n========================\nThis world has a low characters per second value.\nThis affects all scripts.")
        }
    }
/*
    if(state.worldModel.char_rate[1]>2000){
        alert("WARNING\n========================\nThis world has a high rate-limit ("+ state.worldModel.char_rate[0].toString() + " chars per " + state.worldModel.char_rate[1].toString() + "ms" + "). \nScripts will be slow.")
    }
*/
// Automatic paste permission bypass.
if(state.worldModel.feature_paste>0){
(function(){Permissions.can_paste = function() {return true;};})();
console.log("No pasting detected - Bypassed");
}
menu.addEntry(`<span>Rate limit: <b>${state.worldModel.char_rate[0].toString()} chars per ${state.worldModel.char_rate[1].toString()} ms</b></span>`);
/* Instant Write (previously InstaPaste) v1.1
Supports linebreaks.
*/
function instapaste(str,col,loc) {
    var scriptloc = loc;
    var originalloc = loc;
    for(let i=0;i<str.length;i++){
        var char = str.charAt(i)
        var charsintostring = "-" + i+1
        if(char !== "#") {
        writeCharTo(char,0x000000,...scriptloc);
        scriptloc = coordinateAdd(...scriptloc,0,0,1,0);
        } else {
        originalloc = coordinateAdd(...originalloc,0,0,0,1)
        scriptloc = originalloc;
        }
    }
}
function aa(){
    var kk=prompt("what text to write?\nUse # for linebreaks :)");
    instapaste(kk,0x000000,cursorCoords);
}
menu.addOption("Instant Write",aa)

// Fill Script
var fillselection = new RegionSelection();
fillselection.color = 'rgba(255,0,0,0.1)';
fillselection.charColor = '#FF4848';
var fillchar = " ";
var fillcolor = 0x000000;
var fillbcolor = null;
var fillbold = false;
var fillunder = false;
var fillstrike = false;
var fillitalic = false;
var fillbcolorenabled = false;
var filltargetenabled = false;
var filltarget = 0x000000;
// Fill settings modal
// i = input
var modalColorUnchanged = true;
var fillmodal = new Modal();
fillmodal.createForm();
fillmodal.setFormTitle("Fill settings");
// input values are accessed by [variable].input.value
var ifillchar = fillmodal.addEntry("Fill char (leave empty to use it as a wiper)","text");
var ifillcolor = fillmodal.addEntry("Color","color");
var ifillbcolor = fillmodal.addEntry("Background color (if enabled below)","color");
var ifilltarget = fillmodal.addEntry("Fill target (if enabled below)","color");
fillmodal.createCheckboxField();
// checkbox values are accessed by [variable].elm.firstChild.checked
var ifillbold = fillmodal.addCheckbox("Bold text");
var ifillitalic = fillmodal.addCheckbox("Italic text");
var ifillunder = fillmodal.addCheckbox("Underline text");
var ifillstrike = fillmodal.addCheckbox("Strikethrough text");
var ifillbcolorenabled = fillmodal.addCheckbox("Enable background color");
var ifilltargetenabled = fillmodal.addCheckbox("Enable fill target. If enabled, you can set the fill target to a color and only the chars with that color will get filled. Useful for erasing spam while keeping everything else intact.");

fillmodal.onOpen(function(){
if(modalColorUnchanged) {
    ifillcolor.input.value = "000000";
}
});
fillmodal.onSubmit(function(){
    if(ifillcolor.input.value !== "000000"){
         modalColorUnchanged = false;
    }
	fillchar = ifillchar.input.value
        if(fillchar == ""){
        fillchar = " ";
        };
    filltargetenabled = ifilltargetenabled.elm.firstChild.checked;

	if(filltargetenabled == true){
		filltarget = parseInt(ifilltarget.input.value,16);
	};
	// 0x must be added so it is treated as a hex value because for some fucking reason the value from the input doesn't have that at the start
	if(ifillbcolorenabled.elm.firstChild.checked == true){
		fillbcolor = "0x" + ifillbcolor.input.value;
    } else {
        fillbcolor = null;
    };
	fillcolor = "0x" + ifillcolor.input.value;
	fillbold = ifillbold.elm.firstChild.checked;
	fillunder = ifillunder.elm.firstChild.checked;
 	fillstrike = ifillstrike.elm.firstChild.checked;
	fillitalic = ifillitalic.elm.firstChild.checked;
});
// Main fill function
fillselection.tiled = false;
fillselection.onselection(function(coordA, coordB, regWidth, regHeight) {
    var charCoord = coordA;
		for(let yy = 0; yy < regHeight; yy++) {
			for(let xx = 0; xx < regWidth; xx++) {
            var charCol = getCharInfo(...charCoord).color;
            if(filltargetenabled == true){ // Target mode
            if(charCol == parseInt(filltarget,10)){
			writeCharTo(fillchar,fillcolor,...charCoord,true,true,fillbcolor,fillbold,fillitalic,fillunder,fillstrike);
            }
            } else if(fillchar == " " && fillbcolor === null) { // Wiping
                var charSymbol = getCharInfo(...charCoord).char
                var charBcol = getCharInfo(...charCoord).bgColor
                if(charSymbol !== " " || charBcol !== -1) { // Ignore empty chars to optimize wiping
                    writeCharTo(fillchar,fillcolor,...charCoord,true,true,fillbcolor,fillbold,fillitalic,fillunder,fillstrike);
                }
            } else { // Filling
            writeCharTo(fillchar,fillcolor,...charCoord,true,true,fillbcolor,fillbold,fillitalic,fillunder,fillstrike);
            }
			charCoord = coordinateAdd(...charCoord,0,0,1,0);
		}
		charCoord = coordinateAdd(...charCoord,0,0,-regWidth,1);
	}
});
w.on("keyDown", function(e) {
	if(checkKeyPress(e, "ALT+F")) {
		fillselection.startSelection();
	}
});
// Menu buttons
menu.addOption("Fill Area\n(ALT+F)",function(){fillselection.startSelection();});
menu.addCheckboxOption("Fill Tiles",function(){fillselection.tiled = true;},function(){fillselection.tiled = false;},false);
menu.addOption("Fill Settings",function(){fillmodal.open();});

// Stickman Script
// Variable setup
var col = 0x000000;
var col_h = col;
var col_la = col;
var col_ra = col;
var col_ll = col;
var col_rl = col;
var col_body = col;
var loc = [];
// Modals setup
// Limb colors modal
const colormodal2 = new Modal()
colormodal2.createForm()
colormodal2.setFormTitle("Stickman limb colors")
var head = colormodal2.addEntry("Head color","color");
var leftarm = colormodal2.addEntry("Left arm color","color");
var rightarm = colormodal2.addEntry("Right arm color","color");
var body = colormodal2.addEntry("Body color","color");
var leftleg = colormodal2.addEntry("Left leg color","color");
var rightleg = colormodal2.addEntry("Right leg color","color");
colormodal2.onSubmit(function setColors() {
col_h = parseInt(head.input.value,16);
col_la = parseInt(leftarm.input.value,16)
col_ra = parseInt(rightarm.input.value,16)
col_ll = parseInt(leftleg.input.value,16)
col_rl = parseInt(rightleg.input.value,16)
col_body = parseInt(body.input.value,16)
});
// Single color modal
const colormodal = new Modal();
colormodal.createForm();
var stickcolor = colormodal.addEntry("Stickman color","color");
colormodal.setFormTitle("Stickman color. This will override any previously set limb colors.");
colormodal.onSubmit(function setStickCol() {
col = parseInt(stickcolor.input.value,16);
col_h = col;
col_la = col;
col_ra = col;
col_ll = col;
col_rl = col;
col_body = col;
});
col_h = col;
col_la = col;
col_ra = col;
col_ll = col;
col_rl = col;
col_body = col;
// Stickman paster function
function stickman(){
loc = cursorCoords;
writeCharTo("O",col_h,...loc)// Head
loc = coordinateAdd(...loc,0,0,-1,1)
writeCharTo("/",col_la,...loc)// Left arm
loc = coordinateAdd(...loc,0,0,1,0)
writeCharTo("|",col_body,...loc)// Body
loc = coordinateAdd(...loc,0,0,1,0)
writeCharTo('\\',col_ra,...loc)//Right arm
loc = coordinateAdd(...loc,0,0,-2,1)
writeCharTo("/",col_ll,...loc)//Left leg
loc = coordinateAdd(...loc,0,0,2,0)
writeCharTo('\\',col_rl,...loc)//Right leg
}
// Menu options to access the modals
menu.addOption("Add Stickman",()=>{stickman()});
menu.addOption("Set Stickman Color",()=>{
    colormodal.open()
});
menu.addOption("Set Limb Colors",()=>{
    colormodal2.open()
});
let clockX = 0;


menu.addOption("Set Clock X", () => {
  const value = prompt("Clock X");
  const num = parseInt(value, 10);

  if (!isNaN(num)) {
    clockX = num;
    console.log("Clock X set to:", clockX);
  } else {
    console.log("Invalid number");
  }
});
    let clockY = 0;

menu.addOption("Set Clock Y", () => {
  const value = prompt("Clock Y");
  const num = parseInt(value, 10);

  if (!isNaN(num)) {
    clockY = num;
    console.log("Clock Y set to:", clockY);
  } else {
    console.log("Invalid number");
  }
});
let clocker = null;
menu.addCheckboxOption(
  "Clocker",
  function () {
    if (clocker) return; // prevent multiple intervals

    clocker = setInterval(function () {
      writeText("Gay Cock Of Our World Of Text", [clockX, clockY + 0], [255, 0, 0]);
      writeText(stylize(getFormattedUTCTime()), [clockX, clockY + 1], [0, 128, 0]);
      writeText("Status: Online", [clockX, clockY + 2], [128, 0, 0]);
      writeText("Last Raided By: some random idiot", [clockX, clockY + 3], [0, 0, 0]);
      writeText("Refresh Count: " + refreshCounter, [clockX, clockY + 4], [0, 0, 0]);
      writeText("Clock Engine Version: 2.3", [clockX, clockY + 5], [0, 0, 0]);

      refreshCounter += 1;
    }, 1000);
  },
  function () {
    if (clocker) {
      try {
        clearInterval(clocker);
        clocker = null;
        return true;
      } catch (e) {
        w.doAnnounce("Failed to stop clock: " + e + " - Disconnecting... Please Reload.");
        w.socket.close();
        return false;
      }
    }
  }
);
var sahur = function() {
  var str = "1234567890╱◥█◣╲🮞🮐🮜▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃ";
  var index = Math.floor(Math.random() * str.length);
  var char = str[index];

  return char;
};
menu.addCheckboxOption(
  "The Squiddy",
  function () {
    const size = 15;

    // 🛑 prevent duplicate intervals
    abqq = setInterval(() => {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          writeCharToXY(
            sahur(),
            0,
            tileC * currentPosition[0] + currentPosition[2] + x,
            tileR * currentPosition[1] + currentPosition[3] + y
          );
        }
      }
    }, 0x19);if (abqq !== null) return;
  },
  function () {
    if (abqq !== null) {
      clearInterval(abqq);
      abqq = null; // 🔥 important
    }
  },
  false
);
menu.addOption("Gnomeify", (function(){
    setInterval(writeText("IM A GNOME AND YOU HAVE BEEN GNOMED!",[-16,-9]),2000);setInterval(writeText("https://halohash.github.io/worldofhash",[-16,-10]),1000);
}))
menu.addOption(
    "Enable Perms",
    (function() {alert("every permission activated!");Permissions.can_admin = function(){return true}; Permissions.can_chat = function(){return true}; Permissions.can_color_cell = function(){return true}; Permissions.can_color_text = function(){return true}; Permissions.can_coordlink = function(){return true}; Permissions.can_edit_tile = function(){return true}; Permissions.can_go_to_coord = function(){return true}; Permissions.can_paste = function(){return true}; Permissions.can_protect_tiles = function(){return true}; Permissions.can_read = function(){return true}; Permissions.can_show_cursor = function(){return true}; Permissions.can_urllink = function(){return true}; Permissions.can_write = function(){return true};})
)
menu.addOption('Image Paster', async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        await new Promise(resolve => img.onload = resolve);

        const x = parseInt(prompt('Enter starting X coordinate:', 20));
        const y = parseInt(prompt('Enter starting Y coordinate:', 15));

        if (isNaN(x) || isNaN(y)) {
            alert('Invalid coordinates!');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 300;
        const maxHeight = 300;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height).data;

        const delay = 1;
        let position = 0;

        for (let py = 0; py < height; py += 2) {
            for (let px = 0; px < width; px++) {

                const i1 = (py * width + px) * 4;
                const r1 = imageData[i1];
                const g1 = imageData[i1 + 1];
                const b1 = imageData[i1 + 2];
                const a1 = imageData[i1 + 3];

                let r2 = 0, g2 = 0, b2 = 0, a2 = 0;
                if (py + 1 < height) {
                    const i2 = ((py + 1) * width + px) * 4;
                    r2 = imageData[i2];
                    g2 = imageData[i2 + 1];
                    b2 = imageData[i2 + 2];
                    a2 = imageData[i2 + 3];
                }

                if (a1 < 128 && a2 < 128) continue;

                const color1 = rgbToOwotColor(r1, g1, b1);

                setTimeout(() => {
                    writeCharToXY('█', color1, x + px, y + Math.floor(py / 2));
                }, position * delay);

                position++;
            }
        }

        alert(`Image will be pasted over ${Math.ceil((position * delay)/1000)} seconds`);
    };

    fileInput.click();

    function rgbToOwotColor(r, g, b) {
        if (typeof resolveColorValue === "function") {
            return resolveColorValue(`rgb(${r},${g},${b})`);
        }
        // fallback if OWOT function missing
        return `rgb(${r},${g},${b})`;
    }
});
menu.addOption("engine 1", (function(){const targetChars = ["▲", "▼", "◀", "▶"]; wil=[-4,0,3,1]; spedrate = 55; keyConfig.cursorUp = ""; keyConfig.cursorDown = ""; keyConfig.cursorLeft = ""; keyConfig.cursorRight = ""; var attempts=0; var backpressureX = 0; var backpressureY = 0; var velocityX = 0; var velocityY = 0; var keyUp = false; var motionSickness=false; var spaceshipMode = false;cursorCoords=wil; onmousedown=_=>{keyUp=true;}; onmouseup=_=>{keyUp=false;cursorCoords=cc}; document.addEventListener("keydown", function(e) { if (checkKeyPress(e, "UP")){ keyUp = true; } }); document.addEventListener("keyup", function(e) { if (checkKeyPress(e, "UP")) { keyUp = false;} }); function tick() {cc=cursorCoords;if(motionSickness==true){ w.doGoToCoord(curY/100,curX/100)} backpressureY += velocityY + 0.7; velocityY /= 1.2; if (keyUp) { moveCursor("down"); var char = getChar(); moveCursor("up"); if(spaceshipMode==true){velocityY-=0.2} else{ if (char != " ") { velocityY -= 0.5; } } } if (backpressureY >= 1) { backpressureY %= 1; moveCursor("down"); if (getChar() != " ") { moveCursor("up"); velocityY = 0; } } else if (backpressureY <= -1) { backpressureY %= 1; moveCursor("up"); if (getChar() != " ") { moveCursor("down"); velocityY = 0; } } if (backpressureX >= 1) { backpressureX %= 1; moveCursor("right"); if (getChar() != " ") { velocityX = 0; moveCursor("left"); } } else if (backpressureX <= -1) { backpressureX %= 1; moveCursor("left"); if (getChar() != " ") { velocityX = 0; moveCursor("right"); } } } setInterval(tick, 1000 / 70); setInterval(() => { curX = cursorCoords[0] * 16 + cursorCoords[2]; curY = cursorCoords[1] * 8 + cursorCoords[3]; faz = getCharInfoXY(curX, curY); moveCursor("right", 0, 1); if (targetChars.includes(faz.char) || targetChars.includes(getCharInfoXY(curX, curY + 1).char) ) { attempts+=1; cursorCoords = wil; spaceshipMode = false; } if (faz.char == "O") { velocityY -= 5; } if (faz.char == ">") { moveCursor("right",0,2); } if (faz.char == "Δ") { spaceshipMode=true; } if (faz.char == "δ") { spaceshipMode=false; } if (faz.char == "🎁"){ createSandwich(); } }, spedrate); menu.addCheckboxOption("camera follow test",_=>{motionSickness=true},_=>{motionSickness=false},0); /*my present*/ createSandwich=_=>{let ye = "bread"; const me = [ "tomato", "ham", "cheese", "lettuce", "onion", "pickles", "avocado", "mustard", "mayonnaise", "turkey", "bacon", "cucumber", "egg", "spinach", "olive", "hot sauce", "mayo", "chicken", "roast beef", "coleslaw", "salami", "prosciutto", "mozzarella", "feta", "pesto", "roasted pepper", "artichoke", "hummus", "tuna", "eggplant", "coriander", "sriracha", "guacamole", "cream cheese", "brie", "parmesan", "mushrooms", "peanut butter", "jalapeno", "caramelized onion", "zucchini", "radish", "balsamic vinegar", "chili flakes", "capers", "cilantro", "poppy seeds", "oregano", "rosemary", "sun-dried tomato", "spinach", "green pepper", "banana pepper", "pickled ginger" ]; let ie = Math.floor(Math.random() * 10); for (let i = 0; i < ie; i++) { ye += " " + me[Math.floor(Math.random() * me.length)]; } ye += " bread";w.doAnnonce(ye)};}))
menu.addOption("engine 2", (function(){const targetChars = ["▲", "▼", "◀", "▶"]; wil=[-4,0,3,1]; spedrate = 1000/16; keyConfig.cursorUp = ""; keyConfig.cursorDown = ""; keyConfig.cursorLeft = ""; keyConfig.cursorRight = ""; var attempts=0; var backpressureX = 0; var backpressureY = 0; var velocityX = 0; var velocityY = 0; var keyUp = false; var motionSickness=true;cursorCoords=wil; onmousedown=_=>{keyUp=true;}; onmouseup=_=>{keyUp=false;cursorCoords=cc}; var spaceshipMode = false; document.addEventListener("keydown", function(e) { if (checkKeyPress(e, "UP")) { keyUp = true; } }); document.addEventListener("keyup", function(e) { if (checkKeyPress(e, "UP")) { keyUp = false; } }); function tick() {cc=cursorCoords;if(motionSickness==true){ w.doGoToCoord(-curY / tileR / 4, curX / tileC / 4)} backpressureY += velocityY + 0.7; velocityY /= 1.2; if (keyUp) { moveCursor("down"); var char = getChar(); moveCursor("up"); if(spaceshipMode==true){velocityY-=0.2} else{ if (char != " ") { velocityY -= 0.5; } } } if (backpressureY >= 1) { backpressureY %= 1; moveCursor("down"); if (getChar() != " ") { moveCursor("up"); velocityY = 0; } } else if (backpressureY <= -1) { backpressureY %= 1; moveCursor("up"); if (getChar() != " ") { moveCursor("down"); velocityY = 0; } } if (backpressureX >= 1) { backpressureX %= 1; moveCursor("right"); if (getChar() != " ") { velocityX = 0; moveCursor("left"); } } else if (backpressureX <= -1) { backpressureX %= 1; moveCursor("left"); if (getChar() != " ") { velocityX = 0; moveCursor("right"); } } } setInterval(tick, 1000 / 60); setInterval(() => { curX = cursorCoords[0] * 16 + cursorCoords[2]; curY = cursorCoords[1] * 8 + cursorCoords[3]; faz = getCharInfoXY(curX, curY); moveCursor("right", 0, 1); if (targetChars.includes(faz.char) || targetChars.includes(getCharInfoXY(curX, curY + 1).char) ) { attempts+=1;w.doAnnounce("Attempts: "+attempts);cursorCoords = wil; spaceshipMode = false; } if (faz.char == "O") { velocityY -= 5; } if (faz.char == ">") { moveCursor("right",0,2); } if (faz.char == "Δ") { spaceshipMode=true; } if (faz.char == "δ") { spaceshipMode=false; } if (faz.char == "🎁"){ createSandwich(); } }, spedrate); Permissions.can_edit_tile = _ => true;menu.addCheckboxOption("camera follow (iac1 enhanced)",_=>{motionSickness=true},_=>{motionSickness=false}); /*my present*/ createSandwich=_=>{let ye = "bread"; const me = [ "tomato", "ham", "cheese", "lettuce", "onion", "pickles", "avocado", "mustard", "mayonnaise", "turkey", "bacon", "cucumber", "egg", "spinach", "olive", "hot sauce", "mayo", "chicken", "roast beef", "coleslaw", "salami", "prosciutto", "mozzarella", "feta", "pesto", "roasted pepper", "artichoke", "hummus", "tuna", "eggplant", "coriander", "sriracha", "guacamole", "cream cheese", "brie", "parmesan", "mushrooms", "peanut butter", "jalapeno", "caramelized onion", "zucchini", "radish", "balsamic vinegar", "chili flakes", "capers", "cilantro", "poppy seeds", "oregano", "rosemary", "sun-dried tomato", "spinach", "green pepper", "banana pepper", "pickled ginger" ]; let ie = Math.floor(Math.random() * 10); for (let i = 0; i < ie; i++) { ye += " " + me[Math.floor(Math.random() * me.length)]; } ye += " bread";console.log(ye)};}))
let prostickInterval = null;

menu.addOption("Prostick", () => {
  let customStartDate = "2006-04-01";
  let customEndDate = "2036-08-12";
  let customTitle = "Progress Bar";

  function customProgressBar(startDate, endDate, title) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const total = end - start;
    const progress = Math.max(0, Math.min((now - start) / total, 1));

    const filled = Math.floor(30 * progress);
    const bar = '='.repeat(filled) + '-'.repeat(30 - filled);

    return `${title || 'Progress'}:\n${(progress * 100).toFixed(2)}%\n[${bar}]`;
  }

  menu.addOption("Set Custom Date Range", () => {
    customStartDate = prompt("Start date (YYYY-MM-DD):", customStartDate) || customStartDate;
    customEndDate = prompt("End date (YYYY-MM-DD):", customEndDate) || customEndDate;
    customTitle = prompt("Title:", customTitle) || customTitle;

    // stop previous interval if it exists
    if (prostickInterval) clearInterval(prostickInterval);

    prostickInterval = setInterval(() => {
      const progressBar = customProgressBar(customStartDate, customEndDate, customTitle);
      writeText(progressBar, [0, 9]);
    }, 500);
  });
});
ee = "█"; function p(e){ event_mouseup(e); if (e.buttons === 1) { writeChar(ee, true) } } w.menu.addCheckboxOption("Paint mode", ()=>{ owot.addEventListener("mousemove", p) }, ()=>{ owot.removeEventListener("mousemove", p) } )

tc = "🌮"; function x(e){ event_mouseup(e); if (e.buttons === 1) { writeChar(tc, true) } } w.menu.addCheckboxOption("Taco Paint", ()=>{ owot.addEventListener("mousemove", x) }, ()=>{ owot.removeEventListener("mousemove", x) } )

gc = "🦜"; function px(e){ event_mouseup(e); if (e.buttons === 1) { writeChar(gc, true) } } w.menu.addCheckboxOption("Parrot Paint", ()=>{ owot.addEventListener("mousemove", px) }, ()=>{ owot.removeEventListener("mousemove", px) } )

menu.addCheckboxOption("camera follow (iac1 enhanced)",_=>{dee=setInterval(_ => { curX = cursorCoords[0] * tileC + cursorCoords[2]; curY = cursorCoords[1] * tileR + cursorCoords[3]; w.doGoToCoord(-curY / tileR / 4, curX / tileC / 4) }, 10)},_=>{clearInterval(dee)},0);

swas = "卍"; function sex(e){ event_mouseup(e); if (e.buttons === 1) { writeChar(swas, true) } } w.menu.addCheckboxOption("SwasPaint", ()=>{ owot.addEventListener("mousemove", sex) }, ()=>{ owot.removeEventListener("mousemove", sex) } )

menu.addOption("Socket2YWOT",
    function () {
    w.changeSocket("wss://www.yourworldoftext.com/ws/");}
)

menu.addOption("Socket2OWOTHOME",
    function () {
    w.changeSocket("wss://ourworldoftext.com/ws/");}
);



(function() {

    var selection = new RegionSelection();

    selection.charColor = "#00AA00";
    selection.color = "rgba(0, 0, 255, 0.1)";
    selection.tiled = false;
filltargetenabled = false
    const LOCK_CHAR = "█";
fillchar = LOCK_CHAR;
    const colorJSON = '[0,1,128,255,20608,32768,32896,33023,43775,52416,55552,65280,65442,65535,1194684,3227993,4210752,4469691,6758128,7248330,8388352,8388608,8388736,8388863,8404992,8421376,8421504,8421631,8900331,9449273,12246302,12632256,12648430,13631488,16405279,16436888,16711680,16711808,16711935,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]';
    const colors = JSON.parse(colorJSON);

const myColors = JSON.parse(colorJSON);

function getRandomColor() {
    return myColors[Math.floor(Math.random() * myColors.length)];
}

    selection.onselection(function(coordA, coordB, regWidth, regHeight) {
        let charCoord = [...coordA];

        for (let yy = 0; yy < regHeight; yy++) {
            for (let xx = 0; xx < regWidth; xx++) {

                let info = getCharInfo(...charCoord);
                let charCol = info.color;
                let charSymbol = info.char;
                let charBcol = info.bgColor;

                let randomColor = getRandomColor();

                if (filltargetenabled === true) {
                    if (charCol == parseInt(filltarget, 10)) {
                        writeCharTo(LOCK_CHAR, randomColor, ...charCoord, true, true, null);
                    }

                } else if (fillchar === " " && fillbcolor === null) {
                    if (charSymbol !== " " || charBcol !== -1) {
                        writeCharTo(LOCK_CHAR, randomColor, ...charCoord, true, true, null);
                    }

                } else {
                    writeCharTo(LOCK_CHAR, randomColor, ...charCoord, true, true, null);
                }

                charCoord = coordinateAdd(...charCoord, 0, 0, 1, 0);
            }
            charCoord = coordinateAdd(...charCoord, 0, 0, -regWidth, 1);
        }
    });
console.log(colors)
    console.log(Math.random());
    console.log("colors:", colors);
console.log("length:", colors.length);
console.log("randomColor:", colors[Math.floor(Math.random() * colors.length)]);
    w.on("keyDown", function(e) {
        if (checkKeyPress(e, "ALT+I")) {
            selection.startSelection();
        }
    });

})();
menu.addCheckboxOption(
    "Protected Text",

    // checkedAction
    function () {
        protectedTextRunner = (function () {
            var protected_text = {};

            var get_key = function (tx, ty, cx, cy) {
                return tx + "," + ty + "," + cx + "," + cy;
            };

            w.on("write", function (e) {
                protected_text[get_key(e.tileX, e.tileY, e.charX, e.charY)] = {
                    char: e.char,
                    color: e.color,
                    bgColor: e.bgColor,
                    deco: [e.bold, e.italic, e.underline, e.strikethrough]
                };
            });

            var interval = setInterval(function () {
                if (!protectedTextRunner) {
                    clearInterval(interval);
                    return;
                }

                for (var key in protected_text) {
                    var coords = key.split(",");
                    var tx = parseInt(coords[0]);
                    var ty = parseInt(coords[1]);
                    var cx = parseInt(coords[2]);
                    var cy = parseInt(coords[3]);

                    var val = protected_text[key];

                    var curChar = getChar(tx, ty, cx, cy);
                    var curColor = getCharColor(tx, ty, cx, cy);

                    if (curChar !== val.char || curColor !== val.color) {
                        writeCharToXY(
                            val.char,
                            val.color,
                            tx * tileC + cx,
                            ty * tileR + cy,
                            val.bgColor,
                            val.deco[0],
                            val.deco[1],
                            val.deco[2],
                            val.deco[3]
                        );
                    }
                }
            }, 200);

            return true;
        })();
    },

    // uncheckedAction
    function () {
        protectedTextRunner = undefined;
    },

    // default checked state
    false
);
(function() {

    var selection = new RegionSelection();

    selection.charColor = "#00AA00";
    selection.color = "rgba(0, 0, 255, 0.1)";
    selection.tiled = false;

    let filltargetenabled = false;

    const colorJSON = '[0,1,128,255,20608,32768,32896,33023,43775,52416,55552,65280,65442,65535,1194684,3227993,4210752,4469691,6758128,7248330,8388352,8388608,8388736,8388863,8404992,8421376,8421504,8421631,8900331,9449273,12246302,12632256,12648430,13631488,16405279,16436888,16711680,16711808,16711935,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]';

    const colors = JSON.parse(colorJSON);

    // 🔹 Character set (edit this to change style)
    const charSet = "̶qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomChar() {
        return charSet[Math.floor(Math.random() * charSet.length)];
    }

    selection.onselection(function(coordA, coordB, regWidth, regHeight) {
        let charCoord = [...coordA];

        for (let yy = 0; yy < regHeight; yy++) {
            for (let xx = 0; xx < regWidth; xx++) {

                let info = getCharInfo(...charCoord);
                let charCol = info.color;
                let charSymbol = info.char;
                let charBcol = info.bgColor;

                let randomColor = getRandomColor();
                let randomChar = getRandomChar();

                if (filltargetenabled === true) {
                    if (charCol == parseInt(filltarget, 10)) {
                        writeCharTo(randomChar, randomColor, ...charCoord, true, true, null);
                    }

                } else if (fillchar === " " && fillbcolor === null) {
                    if (charSymbol !== " " || charBcol !== -1) {
                        writeCharTo(randomChar, randomColor, ...charCoord, true, true, null);
                    }

                } else {
                    writeCharTo(randomChar, randomColor, ...charCoord, true, true, null);
                }

                charCoord = coordinateAdd(...charCoord, 0, 0, 1, 0);
            }
            charCoord = coordinateAdd(...charCoord, 0, 0, -regWidth, 1);
        }
    });

    // 🔹 Debug logs
    console.log("colors:", colors);
    console.log("length:", colors.length);
    console.log("randomColor:", getRandomColor());
    console.log("randomChar:", getRandomChar());

    w.on("keyDown", function(e) {
        if (checkKeyPress(e, "ALT+J")) {
            selection.startSelection();
        }
    });

})();
menu.addCornerButton("ALT+I For the PibbyBox")

menu.addCornerButton("Agent",(function(){
    writeText(navigator.userAgent,[-16,-9])
}))
