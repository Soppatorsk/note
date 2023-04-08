<?php
$cookie_name = "secert";
$cookie_value = "very sellrcret!!!!!";
setcookie($cookie_name, $cookie_value, time()+(86400 * 3000), "/"); //uncomment and recomment this file when cookie runs out
if (!isset($_COOKIE[$cookie_name])) {
	header('Location: http://www.torsk.net/');
	//TODO this is stupid but functional. Make a login page?
}

$lines = file('lists/today', FILE_IGNORE_NEW_LINES);

$song	= $lines[0];
$kanji 	 = $lines[1];
$reading = $lines[2];

$nn = $lines[3];
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
<meta http-equiv="PRAGMA" content="NO-CACHE">
	<link rel="stylesheet" type="text/css" href="notes.css">
	<script src="notes.js"></script>
	<script src="keys.js"></script>
	<title>Notes</title>
</head>
<div style="background-color:red;" id="debug">
</div>
<body onload="initPage()">
	<div class="separator" id="left">	
		<div id="todayKanji">
			<div id="k">
				<a id="kLink" href="https://www.kanshudo.com/kanji/<?php echo $kanji?>" target="_blank"><?php echo $kanji ?></a>
			</div>
			<?php echo $reading ?>
		</div>
		<div id="date">	
		</div>

		<div id="time"></div>
			<div id="modeTitle">
		Work	
		</div>

		<button id="getTodoBtn" onclick="boo(todoPath, true)">get</button>
		<form id="postForm">
			<input type="text" name="name" id="newNote">
			<input type="submit" value="Submit" id="inputSubmit">
		</form> 

<script>
document.getElementById('postForm').addEventListener('submit', addNote);
</script>
		<br>
		<div class=sectionTitle>行う</div><hr>
		<div class="section" id="todo">
			1 <div class="selector" id="td0"></div>
			<br>
			2 <div class="selector" id="td1"></div>
			<br>
			3 <div class="selector" id="td2"></div>
			<br>
			4 <div class="selector" id="td3"></div>
			<br>
			5 <div class="selector" id="td4"></div>
			<br>
			6 <div class="selector" id="td5"></div>
			<br>
			7 <div class="selector" id="td6"></div>
			<br>
			8 <div class="selector" id="td7"></div>
			<br>
			9 <div class="selector" id="td8"></div>
			<br>
			0 <div class="selector" id="td9"></div>
			<br>
		</div>
		<br>
		<div class="section" id="daily">
			<div class=sectionTitle>毎日</div><hr>
			Q <div class="selector" id="d0"></div>
			<br>
			W <div class="selector" id="d1"></div>
			<br>
			E <div class="selector" id="d2"></div>
			<br>
			R <div class="selector" id="d3"></div>
			<br>
			T <div class="selector" id="d4"></div>
			<br>
			Y <div class="selector" id="d5"></div>
			<br>
		</div>
		<br>
		<div class="sectionTitle">完了</div><hr>
		<div class="section" id="done">	
		</div><br><hr>
<div id="score"> </div>
	</div>
	<div class="separator" id="right">
		<div id="imgbox">
			<img src="img/calendar.jpg">
		</div>
		<div id="misc">
			Kanji
			<div id="progressBar">
				<div id="myBar"></div>
			</div>
			<br>
			<!-- <iframe src="<?php echo $song?>" width="90%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> -->
<div id="numbers">
</div>
			<div id="achievements">
				<img class="ach" src="img/LostEPCover.png" title="The Lost EP">
				<img class="achLocked" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/269210/043b8db1a5477c2a26279f3928e3f82bb847c6c7.jpg" title="1,000,000 SEK">
				<img class="achLocked" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Map_railroad_japan_ibusukimakurazaki_rough.png" title="Visit Japan">
			</div>
		</div>
	</div>
</div>
</body>
</html>
