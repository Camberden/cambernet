function initNoveltiesButtons() { 
	document.querySelectorAll(".novelties-button").forEach(button => {
		button.onmouseenter = function () {
			ButtonInterface.buttonOnMouseEnter(button);
		}
		button.onmouseleave = function () {
			ButtonInterface.buttonOnMouseLeave(button);
		}
		button.onclick = function () {
			ButtonInterface.buttonOnClick(button);
			switch (button.id) {
				case "exit":
					document.location = "/index.html";
				break;
				default:
					console.log("Default!");
				break;
			}
		}

	});
}
initNoveltiesButtons();