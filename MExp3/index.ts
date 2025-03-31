const dict_posts_payrate : {[i: string]: number} = {
  "Manager": 500,
  "Supervisor": 400,
  "Employee": 300,
}
const dict_gross_bonus : {[i: number]: number} = {
  0 : 0,
  0.15 : 3000,
  0.20 : 5000,
  0.25 : 10000,
  0.30 : 15000,
}
const dict_gross_taxage : {[i: number]: number} = {
  0: 0,
  0.18: 2000,
  0.23: 4000,
  0.25: 8000,
  0.32: 15000,
}

var updateTimer : number = -1;

function checkvalidity_HTMLSelectElement(elem: HTMLElement | null) : elem is HTMLSelectElement {
  if (!elem) return false;
  return elem instanceof HTMLSelectElement;
}
function checkvalidity_HTMLInputElement(elem: HTMLElement | null, type?: string) : elem is HTMLInputElement {
  if (!elem) return false;
  if (!(elem instanceof HTMLInputElement)) return false;
  return elem.type == (type || elem.type);
}

function calcGrossBase (rate: number, hours: number) {return rate * hours;}

function dupdFormContents() : void {
  const rawempposselector = document.getElementById("inpEmpPosition");
  if (!rawempposselector) {
    alert("WARNING! Employee Position Select Element is missing!")
    return;
  }
  if (!checkvalidity_HTMLSelectElement(rawempposselector)) {
    alert("WARNING! Employee Position Select Element is not a HTMLSelectElement!")
    return;
  }
  const empposselector: HTMLSelectElement = rawempposselector;
  empposselector.textContent = null;
  for (const key in dict_posts_payrate) {
    const dfasdjfa = document.createElement("input");
    const newchoice = document.createElement("option");
    newchoice.value = key;
    newchoice.textContent = key;
    empposselector.insertAdjacentElement("beforeend", newchoice);
  }
}

function refreshtimer_dupdEmpDisplay (force : boolean = false) : void {
  if (updateTimer > -1) {
    console.log(`Updater already running! refreshing timer.`)
    clearTimeout(updateTimer);
  }
  updateTimer = setTimeout(dupdEmpDisplay, !force ? 1000 : 10);
  console.log(`updater timer id changed to ${updateTimer}`);
}

function dupdEmpDisplay() : void {
  console.log(`updater id ${updateTimer} running now.`)
  const rawempposselector = document.getElementById("inpEmpPosition");
  if (!checkvalidity_HTMLSelectElement(rawempposselector)) {
    console.error("inpEmpPosition is not a valid HTMLSelectElement!");
    return;
  }
  const rawemphours = document.getElementById("inpEmpWorkhours");
  if (!checkvalidity_HTMLInputElement(rawemphours)) {
    console.error("inpEmpWorkhours is not valid HTMLInputElement");
    return;
  }
  const hours : number = Number(rawemphours.value);
  if (isNaN(hours)) {
    console.error("Hours inputted is NaN!");
    return;
  }

  const initialRate : number = dict_posts_payrate[rawempposselector.value];
  console.log(`initRate: ${initialRate}`);

  const gross : number = initialRate * hours;
  console.log(`gross: ${gross}`);

  const bRates = Object.keys(dict_gross_bonus).sort((a, b) => Number(a) - Number(b));
  console.log(bRates);
  var brateindex = 0;
  for (let i = bRates.length - 1; i >= 0; i--) {
    console.log(`${dict_gross_bonus[Number(bRates[i])]} vs gross ${gross}`)
    if (dict_gross_bonus[Number(bRates[i])] >= gross) continue;
    brateindex = i; break;
  }
  const brate : number = Number(bRates[brateindex]) || 0;
  console.log(`bonusRate: ${brate}`);
  const bonus = gross * brate;
  console.log(`bonus: ${bonus}`);

  const tRates = Object.keys(dict_gross_taxage).sort((a, b) => Number(a) - Number(b));
  console.log(tRates);
  var taxageindex = 0;
  for (let i = tRates.length - 1; i >= 0; i--) {
    console.log(`${dict_gross_taxage[Number(tRates[i])]} vs gross ${gross}`)
    if (dict_gross_taxage[Number(tRates[i])] >= gross) continue;
    taxageindex = i; break;
  }
  const taxrate : number = Number(tRates[taxageindex]);
  console.log(`taxRate: ${taxrate}`);
  const taxes : number = taxrate * gross;
  console.log(`tax: ${taxes}`);

  const SSSPay = gross * 0.03;
  const PagibigPay = gross * 0.10;
  const totalLoss = SSSPay + taxes + PagibigPay;

  const netPay = gross + bonus - totalLoss;

  (document.getElementById("outEmpRate") as HTMLInputElement).value = initialRate.toString();
  (document.getElementById("outEmpGross") as HTMLInputElement).value = gross.toString();
  (document.getElementById("outEmpBonus") as HTMLInputElement).value = bonus.toString();
  (document.getElementById("outEmpTax") as HTMLInputElement).value = taxes.toString();
  (document.getElementById("outEmpSSS") as HTMLInputElement).value = SSSPay.toString();
  (document.getElementById("outEmpPagibig") as HTMLInputElement).value = PagibigPay.toString();
  (document.getElementById("outEmpTotalLoss") as HTMLInputElement).value = totalLoss.toString();
  (document.getElementById("outEmpFinalPay") as HTMLInputElement).value = netPay.toString();

  
  updateTimer = -1;
  console.log(`updater id cleared.`)
}

document.addEventListener("DOMContentLoaded", (ev) => {
  dupdFormContents();
  document.getElementById("inpEmpnum")?.addEventListener('input', () => {refreshtimer_dupdEmpDisplay()});
  document.getElementById("inpEmpNameFirst")?.addEventListener('input', () => {refreshtimer_dupdEmpDisplay()});
  document.getElementById("inpEmpNameLast")?.addEventListener('input', () => {refreshtimer_dupdEmpDisplay()});
  document.getElementById("inpEmpPosition")?.addEventListener('input', () => {refreshtimer_dupdEmpDisplay()});
  document.getElementById("inpEmpWorkhours")?.addEventListener('input', () => {refreshtimer_dupdEmpDisplay()});
  document.getElementById("inpComp")?.addEventListener('click', () => {refreshtimer_dupdEmpDisplay(true)});
});
