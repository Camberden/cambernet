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

