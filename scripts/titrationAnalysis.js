// Calculation Functions --------------------------------------------------------------------------------
function sodiumHydroxideSTD(gramsKHP, mLSodiumHydroxide) {
  const molarMassKHP = 204.23;
  const molaritySodiumHydroxide = (
    ((gramsKHP / molarMassKHP) * 1000) /
    mLSodiumHydroxide
  ).toFixed(4);

  return molaritySodiumHydroxide;
}

function hydrochloricAcidSTD() {
  const mLSodiumHydroxide = parseFloat(
    document.getElementById("mLSodiumHydroxideTitrant").value
  ).toFixed(2);
  const molaritySodiumHydroxide = parseFloat(
    document.getElementById("molaritySodiumHydroxide").value
  ).toFixed(4);
  const mLHydrochloricAcid = parseFloat(
    document.getElementById("mLHydrochloricAcid").value
  ).toFixed(2);
  const molarityHydrochloricAcid = (
    (mLSodiumHydroxide * molaritySodiumHydroxide) /
    mLHydrochloricAcid
  ).toFixed(4);

  return molarityHydrochloricAcid;
}

function sodiumThiosulfateSTD() {}

// Design Functions --------------------------------------------------------------------------------

function switchTabs(tab, tabHeader) {
  const currentActive = document.querySelectorAll(".active");
  if ([...currentActive].includes(tab)) {
    return;
  }
  currentActive.forEach((item) => {
    item.classList.remove("active");
  });

  tab.classList.add("active");
  tabHeader.classList.add("active");
}

function updateNaOHEquation() {
  // Retrieve and parse inputs
  const grams = parseFloat(gramsKHP.value);
  const vol = parseFloat(mlNaOH.value);
  let molarity;
  let newEquation;

  // Validate inputs and calculate molarity
  if (!isNaN(grams) && !isNaN(vol)) {
    molarity = sodiumHydroxideSTD(grams, vol);
    newEquation = `
      ${grams} \\, \\text{g KHP} * 
      \\frac{1 \\, \\text{mol KHP}}{204.23 \\, \\text{g KHP}} * 
      \\frac{1 \\, \\text{mol NaOH}}{1 \\, \\text{mol KHP}} * 
      \\frac{1000 \\, \\text{mL}}{${vol} \\, \\text{mL NaOH}} = ${molarity} \\, \\text{M NaOH}
    `;
  } else if (!isNaN(grams)) {
    newEquation = `
      ${grams} \\, \\text{g KHP} * 
      \\frac{1 \\, \\text{mol KHP}}{204.23 \\, \\text{g KHP}} * 
      \\frac{1 \\, \\text{mol NaOH}}{1 \\, \\text{mol KHP}} * 
      \\frac{1000 \\, \\text{mL}}{\\, \\text{mL NaOH}} = \\, \\text{M NaOH}
    `;
  } else if (!isNaN(vol)) {
    newEquation = `
      \\text{g KHP} * 
      \\frac{1 \\, \\text{mol KHP}}{204.23 \\, \\text{g KHP}} * 
      \\frac{1 \\, \\text{mol NaOH}}{1 \\, \\text{mol KHP}} * 
      \\frac{1000 \\, \\text{mL}}{${vol} \\, \\text{mL NaOH}} = \\, \\text{M NaOH}
    `;
  } else {
    console.error("Invalid inputs for grams or volume.");
    return; // Exit if no valid inputs are provided
  }

  // Update the equation container
  const equationContainer = document.getElementById("equationSH");
  equationContainer.innerHTML = `$$ ${newEquation} $$`;

  // Re-render MathJax
  MathJax.typesetPromise([equationContainer]).catch((err) => {
    console.error("MathJax rendering failed:", err);
  });
}
// function move

// tabs
const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const tab3 = document.getElementById("tab3");
const tabHeader1 = document.getElementById("tabHeader1");
const tabHeader2 = document.getElementById("tabHeader2");
const tabHeader3 = document.getElementById("tabHeader3");

tabHeader1.addEventListener("click", () => switchTabs(tab1, tabHeader1));
tabHeader2.addEventListener("click", () => switchTabs(tab2, tabHeader2));
tabHeader3.addEventListener("click", () => switchTabs(tab3, tabHeader3));

// input fields
const gramsKHP = document.getElementById("gramsKHP");
const mlNaOH = document.getElementById("mLSodiumHydroxideAnalyte");

gramsKHP.addEventListener("input", updateNaOHEquation);
mlNaOH.addEventListener("input", updateNaOHEquation);
updateEquation();
