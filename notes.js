var mode = 0;
var inputMode = false;
//TODO config file?
var todoPath = "lists/wo";
var dailyPath = "lists/daily";
var donePath = "lists/done";
var progressPath = "lists/progress";
var scorePath = "lists/score";

let todoDivID = new Array("td0", "td1", "td2", "td3", "td4", "td5", "td6", "td7", "td8", "td9");
let dailyDivID = new Array("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9");

var score = 0;
var progress = 0;

let notes = [];
let daily = [];

var color = "#9AC3E3"; //TODO CSS it
var ding = new Audio('res/ding.ogg');

function initPage() {
  getTime();
  getDate();
  readAll();
  }

function readAll() {
  readFile(todoPath, true);
  readFile(dailyPath, true);
  readFile(donePath, true);
  readFile(scorePath, true);
  readFile(progressPath, true);
}

function clean() { //This fixes visual glitches. I dont know why.
  for (var i = 0; i < 10; i++) {
    document.getElementById(todoDivID[i]).innerHTML = null;
  }
}

//READ AND PARSE
async function readFile(file, parse = false) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', file, true);
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Pragma", "no-cache");
  xhr.onload = async function () {
    if (this.status == 200) {
      if (parse) { //TODO switch in a parse function? 
        switch (file) {
          case todoPath:
            parseTodo(this.responseText);
            break;
            case dailyPath:
              parseDaily(this.responseText);
              break;
              case donePath:
                parseDone(this.responseText);
                break;
                case progressPath:
                  parseProgress(this.responseText);
                  break;
                  case scorePath:
                    parseScore(this.responseText);
                  } 
                }  
    return this.responseText;
      }
    }
    xhr.send();
  }

function parseTodo(r) {
  clean();
  var lines = r.split('\n');
  for (var i = 0; i < lines.length; i++) { 
    if (lines[i] != null) {
      notes[i] = lines[i];
      document.getElementById(todoDivID[i]).innerHTML = lines[i];
    }
  }
}

function parseDaily(r) {
  var complete = 0;
  var lines = r.split('\n'); // creates one extra abundant entry
  for (var i = 0; i < lines.length; i++) {
    if (lines[i] != null && lines[i] != "") {
      let obj = JSON.parse(lines[i]);
      daily[i] = new Array(obj.name, obj.today, obj.streak);
      document.getElementById(dailyDivID[i]).innerHTML = "\<div class=\"dailyName\"\>" + daily[i][0] + "\<\/div>"; //TODO BAD 
      document.getElementById(dailyDivID[i]).innerHTML += "\<div class=\"dailyStreak\"\>" + daily[i][2] + "\<\/div>";
      if (daily[i][1]) { document.getElementById(dailyDivID[i]).style.color = color; complete++; }
      if (daily[i][2]<0) {document.getElementById(dailyDivID[i]).style.color = '#ff0000';}
      if (complete == lines.length - 1) { document.getElementById("daily").style.color = color; }
    }
  }
}

function parseDone(r) {
  var lines = r.split('\n');
  for (var i = lines.length; i >= 0; i--) {
    if (lines[i] != null && lines[i] != "") {
      document.getElementById('done').innerHTML += lines[i] + "<br>";
    }
  }
}

 function parseScore(r) { //TODO idk why r wont work with this
  console.log(r);
  var elem = document.getElementById("score");
  score = r;
  elem.style.color = color;
  elem.innerHTML = score + " tasks completed";
}

function parseProgress(r) {
  console.log(r);
  var num = Math.round(r / 2042 * 100) + "%";
  var elem = document.getElementById("myBar");
  elem.style.backgroundColor = color;
  
  elem.style.width = num;
  elem.innerHTML = num;
}
//WRITE
function writeFile(params) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'process.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  xhr.onload = function () {
    //console.log(this.responseText);
    //readAll();
  }
  xhr.send(params);
}
function addNote(e) {
  e.preventDefault();
  var newNote = document.getElementById('newNote').value;
  if (mode == 0) var params = "woNote=" + newNote;
  if (mode == 1) var params = "muNote=" + newNote;
  if (mode == 2) var params = "jaNote=" + newNote;
  if (mode == 3) var params = "todoNote=" + newNote;
  writeFile(params)  
}

function saveFile() { //TODO rename
  var todo = "";
  for (var i = 0; i < 10; i++) {
    if (document.getElementById(todoDivID[i]).textContent == "" || document.getElementById(todoDivID[i]).textContent == null) {
      //console.log(i, notes[i]);
    } else {
      notes[i] = document.getElementById(todoDivID[i]).textContent;
      //console.log(i, notes[i]);
      if (notes[i] == null || notes[i] == "") {
      } else {
        todo += notes[i];
        todo += "\n";
      }
    }
  }
  var tmp = "todo" + mode + "=";
  var params = tmp + todo;
  writeFile(params);
}


function saveFileDaily() {
  var dailyTXT = "";
  //e.preventDefault();
  //console.log(daily[0][0])
  for (var i = 0; i < daily.length; i++) {
    let obj = { name: "name", today: "false", streak: 0 }
    obj.name = daily[i][0];
    obj.today = daily[i][1];
    obj.streak = daily[i][2];
    dailyTXT += JSON.stringify(obj);
    dailyTXT += "\n";
  }

  var params = "daily=" + dailyTXT;
  writeFile(params);
}

function checkItem(i) {
  var checked = document.getElementById(todoDivID[i]).textContent;
  document.getElementById(todoDivID[i]).innerHTML = "";
  notes[i] = null;

  var params = "checked=" + checked;
  writeFile(params);
  saveFile(mode);
  addScore(1);
}

function checkItemDaily(n) {
  if (daily[n][1]) return;
  ding.play();
  daily[n][1] = true;
  if (daily[n][2] < 0) daily[n][2] = 1;
  else daily[n][2]++;
  document.getElementById(dailyDivID[n]).style.color = color;
  saveFileDaily();
  addScore(1);
}

function updateProgress(i) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', progressPath, true);
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Pragma", "no-cache");
  xhr.onload = async function () {
    if (this.status == 200) {
      progress = parseInt(this.response) + i;
      writeFile("progress="+progress);
      readFile(progressPath, true);
      }
    }
    xhr.send();

}

async function addScore(i) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', scorePath, true);
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Pragma", "no-cache");
  xhr.onload = async function () {
    if (this.status == 200) {
      score = parseInt(this.response) + i;
      writeFile("score="+score);
      readFile(scorePath, true);
      }
    }
    xhr.send();
}
//OTHER
function modeCycle() {
  //0 wo
  //1 mu
  //2 ja
  //3 else (org)
  mode++;
  if (mode == 4) mode = 0;
  
  //TODO SWITCH 
  if (mode == 0) {
    document.getElementById("modeTitle").innerHTML = "Work";
    todoPath = "lists/wo";
  }
  if (mode == 1) {
    document.getElementById("modeTitle").innerHTML = "Music";
    todoPath = "lists/mu";
  }
  if (mode == 2) {
    document.getElementById("modeTitle").innerHTML = "日本語";
    todoPath = "lists/ja";
  }
  if (mode == 3) {
    document.getElementById("modeTitle").innerHTML = "Misc";
    todoPath = "lists/todo";
  }
  readFile(todoPath, true);
}

function getTime() {
  var date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString('sv-SE').slice(0, -3);
  setTimeout(getTime, 30000);
}

function getDate() {
  const dateDiv = document.getElementById("date");
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  dateDiv.innerHTML = date.toLocaleDateString('ja-JP', options);
  //colorToday = colors[date.getDay()];
  dateDiv.style.color = color;
}

