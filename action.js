/** ===> Camberden.net UI & API Project UPDATE ===>
 * @description Rebooting the camberden.net hosted site.
 * - Migrating from a Laravel template with problematic htaccess.
 * - Will demonstrate API access and dataparsing through:
 * - Anki, Obsidian, Minecraft, FileSystem, Cloud 
 * @constant latestUpdate
 * - Date is changed for any first update completed on a new day.
 * @author Camberden (Chrispy | Kippi)
 */
const latestUpdate = "Wednesday, February 11th, 2026";
document.querySelector("#latest-update").innerHTML = latestUpdate;
const camberden = document.querySelector("#camberden");
const monickers = ["camberden", "観葉伝", "カンバデン"];
let pageInfo = (
	`API Console Log Appears here.`
);

/**
 * 
 * @param {string} month
 * @param {string} calendarDay
 * @param {string} year 
 * @returns date Object
 * @description Converts my chosen date format for update display into a date Object
 */
const convertDate = (month, calendarDay, year) => {
	const convertedMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const convertedCalendarDay = calendarDay.replace(/[^0-9]/g, ' ');
	const convertedYear = parseInt(year);
	const date = new Date(convertedYear, convertedMonth.indexOf(month), parseInt(convertedCalendarDay));
	return date;
}
/**
 * 
 * @param {String} update 
 * @returns {Date} Formatted Date
 */
const formatter = (update) => { x = update.split(" "); return convertDate(x[1], x[2], x[3]); }
/**
 * @param {Date} date
 * @description Converts date object to a Japanese date.
 */
const convertToJapaneseDate = (date) => {
	let japaneseDate = "最近アップデート令和";
	const kanjiNumbers = ["一", "二","三","四","五","六","七","八","九","十",];
		
	// ----- YEARS ----- //
	japaneseDate += (kanjiNumbers[date.getFullYear() - 2019] + "年");
	// ----- MONTHS ----- //
	if ((date.getMonth() + 1) > 10) {
		japaneseDate += kanjiNumbers[9] + (kanjiNumbers[date.getMonth() - 10] + "月");
	} else {
		japaneseDate += (kanjiNumbers[date.getMonth()] + "月");
	}
	// ----- DAYS ----- //
	if (date.getDate() > 30) {
		japaneseDate += kanjiNumbers[2] + kanjiNumbers[9] + (kanjiNumbers[(date.getDate() % 30) - 1] + "日");
	} else if (date.getDate() == 30) {
		japaneseDate += (kanjiNumbers[2] + kanjiNumbers[9] + "日");	
	} else if (date.getDate() > 20) {
		japaneseDate += kanjiNumbers[1] + kanjiNumbers[9] + (kanjiNumbers[(date.getDate() % 20) - 1] + "日");
	} else if (date.getDate() == 20) {
		japaneseDate += (kanjiNumbers[1] + kanjiNumbers[9] + "日");
	} else if (date.getDate() > 10) {
		japaneseDate += kanjiNumbers[9] + (kanjiNumbers[(date.getDate() % 10) - 1] + "日");
	} else if (date.getDate() == 10) {
		japaneseDate += (kanjiNumbers[9] + "日");
	} else {
		japaneseDate += (kanjiNumbers[date.getDate() - 1] + "日");
	}
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const japaneseDaysOfWeek = ["月","火","水","木","金","土","日"];
	for (let i = 0; i < daysOfWeek.length; i++) {
		if (date[0] === daysOfWeek[i]) {
			japaneseDate += "(" + japaneseDaysOfWeek[i] + ")";
		}
	}
	document.querySelector("#japanese-date").textContent = japaneseDate;
}
const randomizeMonicker = () => {
	const m = Math.random();
	if (m <= 0.2) {
		camberden.lang = "jp";
		camberden.setAttribute("style", "font-family: Yusei Magic;");
		camberden.innerHTML = monickers[1];
	} else if (m <= 0.4) {
		camberden.lang = "jp";
		camberden.setAttribute("style", "font-family: Yusei Magic;");
		camberden.innerHTML = monickers[2];
	} else if (m <= 0.6) {
		camberden.removeAttribute("font-family");
		camberden.lang = "la-fonipa";
		camberden.innerHTML = monickers[0].replace("c", "k");
		camberden.classList.add("eremoran-kiptascript");
		camberden.setAttribute("style", "font-family: eremoran-kiptascript;");
	} else {
		camberden.innerHTML = monickers[0];
	}
}
const randomizePhotos = () => {
	const infoDivBackground = document.getElementById("info-div-background");
	infoDivBackground.style.animationPlayState = "paused";
	const m = Math.random();
	infoDivBackground.style.animationPlayState = "running";
	let photoIndex = Math.round(m.toFixed(1) * 10);
	photoIndex < 1 ? randomizePhotos : infoDivBackground.style.backgroundImage = `url(assets/travel-photos/photo-nc-us-${photoIndex}.jpeg)`;
}
const jsonInvokation = async() => {

	function invoke(action, version, params={}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (Object.getOwnPropertyNames(response).length != 2) {
                    throw 'response has an unexpected number of fields';
                }
                if (!response.hasOwnProperty('error')) {
                    throw 'response is missing required error field';
                }
                if (!response.hasOwnProperty('result')) {
                    throw 'response is missing required result field';
                }
                if (response.error) {
                    throw response.error;
                }
                resolve(response.result);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
    });
}

await invoke('createDeck', 6, {deck: 'another'});
const anotherResult = await invoke('deckNames', 6);
console.log(`got list of decks: ${anotherResult}`);
information.textContent = anotherResult;

invoke('findNotes', 6, {params: {notes: [0]}});
const yetAnotherResult = invoke({
    action: "findNotes",
    version: 6,
	query: "deck:current"
});

const outbound = yetAnotherResult.textContent;
sout(outbound);
}
const buttonMapper = () => {

	document.querySelectorAll("button").forEach(button => {
			button.onmouseenter = function() {
				CMBRutil.buttonOnMouseEnter(button);
			}
			button.onmouseleave = function() {
				CMBRutil.buttonOnMouseLeave(button);
			}
			button.onclick = function() {
				CMBRutil.buttonOnClick(button);
			}
		});
}
/**
 * 
 * @param {HTMLCollection} classNames 
 */
const classMapper = (classNames) => {
	document.querySelectorAll("." + classNames).forEach(className => {
		className.onclick = function() {
			document.location = className.value;
		}
	})
}
const initAlpine = () => { 
	Alpine.data('dropdown', () => ({
    open: false,
 
    toggle() {
        this.open = ! this.open
    }
}))
}

/** @local @function Main */
(async (/*===*| RUN |===*/) => {

	// CMBRutil.actionsProvided("sections");
	CMBRutil.displayPageInfo(pageInfo);
	randomizeMonicker();
	convertToJapaneseDate(formatter(latestUpdate));
	buttonMapper();
	classMapper("linkage-box");

	
})(/*===*===*===| END |===*===*===*/);