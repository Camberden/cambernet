// viewStep: function() {
// 	const stepIds = [
// 		'co1-0', 'co1-1', 'co1-2', 'co1-3', 'co1-4', 'co1-5', 'co1-6',
// 		'co2-0', 'co2-1', 'co2-2', 'co2-3', 'co2-4', 'co2-5', 'co2-6',
// 		'co3-0', 'co3-1', 'co3-2', 'co3-3', 'co3-4', 'co3-5', 'co3-6',
// 	];
// 	stepIds.forEach(stepId => {
// 		let stepEl = document.getElementById(stepId);
// 		stepEl.onclick = function () {
// 			this.custodyLevel = stepId[2];
// 			this.yearsExperience = stepId[4];
// 		};
// 	});
// },
// populateSalaryTable: function(schedule) {
// 	for (let i = 0; i < 8; i++) {
// 		for (let j = 0; j < schedule[i].length; j++) {
// 			document.getElementById(`co${i + 1}-${j}`).innerHTML = schedule[i][j];
// 		}
// 	}
// },
// nextFiscalYear: function() {
// 	if ((this.fiscalYear - 2020) < this.salarySchedules.length) {
// 		this.fiscalYear++;
// 		this.currentSchedule = this.salarySchedules[this.fiscalYear - 2020];
// 		populateSalaryTable(this.currentSchedule);
// 		viewStep();
// 	};
// },
// previousFiscalYear: function() {
// 	if (!this.fiscalYear - 2020 <= 0) {
// 		this.fiscalYear--;
// 		this.currentSchedule = this.salarySchedules[this.fiscalYear - 2020];
// 		populateSalaryTable(this.currentSchedule);
// 		viewStep();
// 	};
// },




// ============


// Dummy auto-suggest list
const allSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

app.get('/suggest', (req, res) => {
	const query = req.query.query?.toLowerCase() || '';

	const filtered = allSuggestions.filter(item => item.toLowerCase().includes(query));
	const html = filtered.map(item => `<div class="suggestion">${item}</div>`).join('');

	res.send(html || '<div class="suggestion">No results found</div>');
});



`
<div class="tabs">
       <button hx-get="/tab1" hx-target="#tab-content" hx-swap="innerHTML">Tab 1</button>
       <button hx-get="/tab2" hx-target="#tab-content" hx-swap="innerHTML">Tab 2</button>
       <button hx-get="/tab3" hx-target="#tab-content" hx-swap="innerHTML">Tab 3</button>
   </div>

   <div id="tab-content" class="tab-content">
       <p>Select a tab to load content.</p>
   </div>
   `
app.get('/tab1', (req, res) => {
	res.send('<p>This is content for Tab 1. Welcome to the first tab!</p>');
});

app.get('/tab2', (req, res) => {
	res.send('<p>This is content for Tab 2. Here is something different!</p>');
});

app.get('/tab3', (req, res) => {
	res.send('<p>This is content for Tab 3. You\'ve reached the final tab.</p>');
});