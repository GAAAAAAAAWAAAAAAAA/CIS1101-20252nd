const enum_NumToMonth = Object.freeze({
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
})

var clockElem = document.getElementById("clock");
var clockElemHText = document.getElementById("clockheader");
var clockElemMText = document.getElementById("clocktime");
var clockElemDText = document.getElementById("clockdate");

function tickClock() {
  const globalDateTimeObj = new Date();
  clockElemMText.textContent = `${globalDateTimeObj.getHours().toString().padStart(2, '0')}:${globalDateTimeObj.getMinutes().toString().padStart(2, '0')}.${globalDateTimeObj.getSeconds().toString().padStart(2, '0')}.${globalDateTimeObj.getMilliseconds().toString().padStart(3, '0')}`;
  clockElemDText.textContent = `${enum_NumToMonth[globalDateTimeObj.getMonth()].slice(0, 3)}-${(globalDateTimeObj.getDate()).toString().padStart(2, '0')}`;
}

tickClock();

var clockIntervalID = setInterval(tickClock, 16);