//node script server side, resets dailies and zero streak if broken
const fs = require('fs')
var overWrite = "";

fs.readFile('/var/www/note/lists/daily', 'utf-8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	var lines = data.split('\n');
	for (var i=0; i<lines.length; i++) {
		if (lines[i] != null && lines[i] != "") {
			let obj = JSON.parse(lines[i]);
			if (!obj.today) {
				if (obj.streak <=0) obj.streak--;
				else obj.streak = 0;	
			} 
			obj.today = false;
			overWrite += JSON.stringify(obj) + "\n"; //TODO do I really need txt?
		}
	}

	fs.writeFile('/var/www/note/lists/daily', overWrite, err => {
		if (err) {
			console.error(err)
			return
		}
		//console.log(overWrite);
	})
})


