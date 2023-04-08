<?php
//TODO poor implementation, bad variable names. woNote123?  
echo 'Processing...';

if(isset($_POST['checked'])){
	echo 'POST: Your checked is ', $_POST['checked'];
	if (!empty($_POST['checked'])) {
		file_put_contents("lists/done", $_POST['checked'], FILE_APPEND | LOCK_EX);
		file_put_contents("lists/done", "\n", FILE_APPEND | LOCK_EX);
	}
}

if(isset($_POST['progress'])){
	echo 'POST: Your progress is ', $_POST['progress'];
	if (!empty($_POST['progress'])) {
		file_put_contents("lists/progress", $_POST['progress']);
	}
}

if(isset($_POST['score'])){
	echo 'POST: Your score is ', $_POST['score'];
	if (!empty($_POST['score'])) {
		file_put_contents("lists/score", $_POST['score']);
	}
}

if(isset($_POST['todo3'])){
	echo 'POST: Your todo is ', $_POST['todo3'];	
		file_put_contents("lists/todo", $_POST['todo3']);
}

if(isset($_POST['todo0'])){
	echo 'POST: Your todo0 is ', $_POST['todo0'];	
		file_put_contents("lists/wo", $_POST['todo0']);
}

if(isset($_POST['todo1'])){
	echo 'POST: Your todo1 is ', $_POST['todo1'];	
		file_put_contents("lists/mu", $_POST['todo1']);
}

if(isset($_POST['todo2'])){
	echo 'POST: Your todo2 is ', $_POST['todo2'];	
		file_put_contents("lists/ja", $_POST['todo2']);
}

if(isset($_POST['daily'])){
	echo 'POST: Your daily is ', $_POST['daily'];	
		file_put_contents("lists/daily", $_POST['daily']);
}

if(isset($_POST['todoNote'])){
	echo 'POST: Your todoNote is ', $_POST['todoNote'];	
	if (!empty($_POST['todoNote'])) { //TODO check if duplicate
		file_put_contents("lists/todo", $_POST['todoNote'], FILE_APPEND | LOCK_EX);
		file_put_contents("lists/todo", "\n", FILE_APPEND | LOCK_EX);
	}
}

if(isset($_POST['woNote'])){
	echo 'POST: Your woNote is ', $_POST['woNote'];	
	if (!empty($_POST['woNote'])) { //TODO check if duplicate
		file_put_contents("lists/wo", $_POST['woNote'], FILE_APPEND | LOCK_EX);
		file_put_contents("lists/wo", "\n", FILE_APPEND | LOCK_EX);
	}
}

if(isset($_POST['muNote'])){
	echo 'POST: Your muNote is ', $_POST['muNote'];	
	if (!empty($_POST['muNote'])) { //TODO check if duplicate
		file_put_contents("lists/mu", $_POST['muNote'], FILE_APPEND | LOCK_EX);
		file_put_contents("lists/mu", "\n", FILE_APPEND | LOCK_EX);
	}
}

if(isset($_POST['jaNote'])){
	echo 'POST: Your jaNote is ', $_POST['jaNote'];	
	if (!empty($_POST['jaNote'])) { //TODO check if duplicate
		file_put_contents("lists/ja", $_POST['jaNote'], FILE_APPEND | LOCK_EX);
		file_put_contents("lists/ja", "\n", FILE_APPEND | LOCK_EX);
	}
}

