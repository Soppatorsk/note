window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented || inputMode) {
    return; // Do nothing if the event was already processed
  }
  
  switch (event.key) {
    case "k": //TODO go to kanji how?
      document.getElementById('kLink').click();
      break;
    case "j":
      modeCycle();
      break;
    case "x":
      break;
    case "0":
      checkItem(-1);
      break;
    case "1":
      checkItem(0);
      break;
    case "2":
      checkItem(1);
      break;
    case "3":
      checkItem(2);
      break;
    case "4":
      checkItem(3);
      break;
    case "5":
      checkItem(4);
      break;
    case "6":
      checkItem(5);
      break;
    case "7":
      checkItem(6);
      break;
    case "8":
      checkItem(7);
      break;
    case "q":
      checkItemDaily(0);
      updateProgress();
      break;
    case "w":
      checkItemDaily(1);
      break;
    case "e":
      checkItemDaily(2);
      break;
    case "r":
      checkItemDaily(3);
      break;
    case "t":
      checkItemDaily(4);
      break;
    case "y":
      checkItemDaily(5);
      break;
    case "i":
      inputMode = true;
      document.getElementById('newNote').style.display = "inline-block";
      document.getElementById('newNote').focus();
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  event.preventDefault();
}, true);


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case "Enter":
      document.getElementById('inputSubmit').click(); //double post requests lol
      document.getElementById('postForm').reset();
      document.getElementById('newNote').style.display = "none";
      inputMode = false;
      break;
    case "Escape":
      document.getElementById('postForm').reset();
      document.getElementById('newNote').style.display = "none";
      inputMode = false;
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  event.preventDefault();
}, true);
