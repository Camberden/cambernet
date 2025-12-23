/** ===> CAMBERDEN.NET UPDATE ===>
 * @description First VPS Hosted Website:
 * - November 14, 2025 to Present
 * - Testing ground for alternatively hosted website.
 * @constant latestUpdate
 * - Date is changed for any first update completed on a new day.
 * @author Camberden (Chrispy | Kippi)
 */
const latestUpdate = "Tuesday, December 23rd 2025";
document.querySelector("#latest-update").innerHTML = latestUpdate;
const splitDate = latestUpdate.split(" ");
/**
 * 
 * @param {string} month
 * @param {string} calendarDay
 * @param {string} year 
 * @returns date Object
 * @description Converts my chosen date format for update display into a date Object
 */
function convertDate(month, calendarDay, year){
	const convertedMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const convertedCalendarDay = calendarDay.replace(/[^0-9]/g, ' ');
	const convertedYear = parseInt(year);
	const date = new Date(convertedYear, convertedMonth.indexOf(month), parseInt(convertedCalendarDay));
	
	return date;
}
const formattedDate = convertDate(splitDate[1], splitDate[2], splitDate[3]);
/**
 * @param {Date} date
 * @description Converts date object to a Japanese date.
 */
function convertToJapaneseDate(date) {
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
	} else {
		japaneseDate += (kanjiNumbers[date.getDate() - 1] + "日");
	}
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const japaneseDaysOfWeek = ["月","火","水","木","金","土","日"];
	for (let i = 0; i < daysOfWeek.length; i++) {
		if (splitDate[0] === daysOfWeek[i]) {
			japaneseDate += "(" + japaneseDaysOfWeek[i] + ")";
		}
	}
	document.querySelector("#japanese-date").textContent = japaneseDate;

}
convertToJapaneseDate(formattedDate);

const camberden = document.querySelector("#camberden");
const monickers = ["camberden.net", "観葉伝ネット", "カンバデンネット"];

function randomizeMonicker(){
	const m = Math.random();
	// console.log(m);
	if (m <= 0.1) {
		camberden.lang = "jp";
		camberden.innerHTML = monickers[1];
	} else if (m >= 0.9) {
		camberden.lang = "jp";
		camberden.innerHTML = monickers[2];
	} else if (m < 0.9 && m >= 0.8) {
		camberden.removeAttribute("font-family");
		camberden.lang = "la-fonipa";
		camberden.innerHTML = monickers[0].replace("c", "k");
		camberden.classList.add("eremoran-kiptascript");
		camberden.setAttribute("style", "font-family: eremoran-kiptascript;");
	} 
	else {
		camberden.innerHTML = monickers[0];
	}
}
randomizeMonicker();

camberden.onclick = function(){
	alert("Hi! :D");
}
function generateSiteInfo() {
	const siteInfo = document.getElementById("site-info");
	siteInfo.innerHTML = `
	<p>	
		Welcome to camberden's alternatively hosted page.<br>
		Here you will find an assortment of software tidbits.
	</p>
`
}
generateSiteInfo();