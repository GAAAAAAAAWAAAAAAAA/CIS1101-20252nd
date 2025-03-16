var gradelist : readonly [number, string][] = Object.freeze([
  [98, "Outstanding"],
  [95, "Very Satisfactory"],
  [92, "Satisfactory"],
  [89, "Very Good"],
  [86, "Good"],
  [83, "Above Average"],
  [80, "Average"],
  [77, "Below Average"],
  [75, "Passable"],
])

addEventListener("load", async (ev) => {
  const mytable = document.createElement("table");
  mytable.id = "studentinfo_table";
  document.body.insertAdjacentElement("beforeend", mytable);
  
  const sname = prompt("Enter your name: ");
  if (!sname) {alert("You have entered a bad name (either empty or otherwise unusable). Please refresh the page."); return;}
  const namerow = document.createElement("tr"); namerow.id = "studentinfo_namerow"; 
  const namelabel = document.createElement("td"); namelabel.textContent = "Name"; namelabel.classList.add("labelcell"); namelabel.colSpan = 2;
  const namecell = document.createElement("td"); namecell.textContent = sname; namecell.colSpan = 2;
  mytable.insertAdjacentElement("beforeend", namerow);
  namerow.insertAdjacentElement("beforeend", namelabel);
  namerow.insertAdjacentElement("beforeend", namecell);
  
  const raw_pAge = prompt("Enter your age in years.");
  const pAge = Number(raw_pAge);
  if (Number.isNaN(pAge)) {
    alert(`ERROR: Entered age value (${raw_pAge}) is not a valid number! Refresh the page and try again.`);
    return;
  }
  const agerow = document.createElement("tr"); agerow.id = "studentinfo_agerow";
  const agelabel = document.createElement("td"); agelabel.textContent = "Age"; agelabel.colSpan = 2; agelabel.classList.add("labelcell");
  const agecell = document.createElement("td"); agecell.textContent = (~~pAge).toString(); agecell.colSpan = 2;
  mytable.insertAdjacentElement("beforeend", agerow);
  agerow.insertAdjacentElement("beforeend", agelabel);
  agerow.insertAdjacentElement("beforeend", agecell);

  const rawgQ = Number(prompt("Enter your sub-grade: Quiz.") ?? "0");
  const rawgME = Number(prompt("Enter your sub-grade: Major Exams.") ?? "0");
  const rawgCS = Number(prompt("Enter your sub-grade: Class Standing.") ?? "0");
  const rawgA = Number(prompt("Enter your sub-grade: Attendance.") ?? "0");
  if (Number.isNaN(rawgQ)) { alert(`ERROR: inputted Quiz grade did not report as a valid number. Refresh the page and try again. If problem persists, contact a technician.`); return; }
  if (Number.isNaN(rawgME)) { alert(`ERROR: inputted Major Exams grade did not report as a valid number. Refresh the page and try again. If problem persists, contact a technician.`); return; }
  if (Number.isNaN(rawgCS)) { alert(`ERROR: inputted Class Standing grade did not report as a valid number. Refresh the page and try again. If problem persists, contact a technician.`); return; }
  if (Number.isNaN(rawgA)) { alert(`ERROR: inputted Attendance grade did not report as a valid number. Refresh the page and try again. If problem persists, contact a technician.`); return; }

  const gTotal = (rawgQ * 0.3) + (rawgME * 0.5) + (rawgCS  * 0.1) + (rawgA * 0.1);

  const subscoresrow = document.createElement("tr");
  const scorerow = document.createElement("tr");
  const sgcell_Q = document.createElement("td"); sgcell_Q.textContent = `Quizzes = ${rawgQ} >> ${rawgQ * 0.3}%`;
  const sgcell_ME = document.createElement("td"); sgcell_ME.textContent = `Major Exams = ${rawgME} >> ${rawgME * 0.5}%`;
  const sgcell_CS = document.createElement("td"); sgcell_CS.textContent = `Class Standing = ${rawgCS} >> ${rawgCS * 0.1}%`;
  const sgcell_A = document.createElement("td"); sgcell_A.textContent = `Attendance = ${rawgA} >> ${rawgA * 0.1}%`;
  const sgcell_T = document.createElement("td"); sgcell_T.textContent = `Total = ${gTotal}%`; sgcell_T.colSpan = 4;
 
  mytable.insertAdjacentElement("beforeend", subscoresrow);
  subscoresrow.insertAdjacentElement("beforeend", sgcell_Q);
  subscoresrow.insertAdjacentElement("beforeend", sgcell_ME);
  subscoresrow.insertAdjacentElement("beforeend", sgcell_CS);
  subscoresrow.insertAdjacentElement("beforeend", sgcell_A);
  mytable.insertAdjacentElement("beforeend", scorerow); scorerow.insertAdjacentElement("beforeend", sgcell_T);

  let isPass = false;
  const resultrow = document.createElement("tr"); const resultcell = document.createElement("td"); resultcell.colSpan = 4; resultrow.insertAdjacentElement("beforeend", resultcell);
  for (let i = 0; i < gradelist.length; i++) {
    const gIndex = gradelist[i];
    if (gIndex[0] <= gTotal) {
      isPass = true;
      resultcell.textContent = gIndex[1];
      break;
    }
  } 
  if (!isPass) resultcell.textContent = "FAILED";
  mytable.insertAdjacentElement("beforeend", resultcell);
})