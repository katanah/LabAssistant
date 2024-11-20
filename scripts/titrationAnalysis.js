// Calculation Functions --------------------------------------------------------------------------------
function sodiumHydroxideSTD(gramsKHP, mLSodiumHydroxide) {
  const molarMassKHP = 204.23;
  const molaritySodiumHydroxide = (
    ((gramsKHP / molarMassKHP) * 1000) /
    mLSodiumHydroxide
  ).toFixed(4);

  return molaritySodiumHydroxide;
}

function hydrochloricAcidSTD(
  mLSodiumHydroxide,
  molaritySodiumHydroxide,
  mLHydrochloricAcid
) {
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
  const grams = parseFloat(gramsKHP.value).toFixed(3);
  const vol = parseFloat(mlNaOH.value).toFixed(2);
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

function updateHClEquation() {
  // Retrieve and parse inputs
  const mLSodiumHydroxide = parseFloat(mlNaOHTitrant.value);
  const molaritySodiumHydroxide = parseFloat(molarityNaOH.value);
  const mLHydrochloricAcid = parseFloat(mlHCl.value);

  let newEquation = "";
  let molarityHydrochloricAcid = "";

  // Validate inputs incrementally
  if (!isNaN(mLSodiumHydroxide)) {
    newEquation += `${mLSodiumHydroxide} \\, \\text{mL NaOH}`;
  } else {
    newEquation += `\\text{mL NaOH}`;
  }

  newEquation += ` * `;

  if (!isNaN(molaritySodiumHydroxide)) {
    newEquation += `\\frac{${molaritySodiumHydroxide} \\, \\text{mol NaOH}}{1000 \\, \\text{mL NaOH}}`;
  } else {
    newEquation += `\\frac{\\text{mol NaOH}}{\\text{mL NaOH}}`;
  }

  newEquation += ` * \\frac{1 \\, \\text{mol HCl}}{1 \\, \\text{mol NaOH}} * `;

  if (!isNaN(mLHydrochloricAcid)) {
    newEquation += `\\frac{1000 \\, \\text{mL HCl}}{${mLHydrochloricAcid} \\, \\text{mL HCl}}`;
  } else {
    newEquation += `\\frac{\\text{mL HCl}}{\\text{mL HCl}}`;
  }

  // Calculate molarity if all inputs are valid
  if (
    !isNaN(mLSodiumHydroxide) &&
    !isNaN(molaritySodiumHydroxide) &&
    !isNaN(mLHydrochloricAcid)
  ) {
    molarityHydrochloricAcid = (
      (mLSodiumHydroxide * molaritySodiumHydroxide) /
      mLHydrochloricAcid
    ).toFixed(4);

    newEquation += ` = ${molarityHydrochloricAcid} \\, \\text{M HCl}`;
  } else {
    newEquation += ` = \\text{Incomplete inputs}`;
  }

  // Update the equation container
  const equationContainer = document.getElementById("equationHA");
  equationContainer.innerHTML = `$$ ${newEquation} $$`;

  // Re-render MathJax
  MathJax.typesetPromise([equationContainer]).catch((err) => {
    console.error("MathJax rendering failed:", err);
  });
}

function updateNa2S2O3Equation() {}

// function move

// tabs
const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
// const tab3 = document.getElementById("tab3");
const tabHeader1 = document.getElementById("tabHeader1");
const tabHeader2 = document.getElementById("tabHeader2");
// const tabHeader3 = document.getElementById("tabHeader3");

tabHeader1.addEventListener("click", () => switchTabs(tab1, tabHeader1));
tabHeader2.addEventListener("click", () => switchTabs(tab2, tabHeader2));
// tabHeader3.addEventListener("click", () => switchTabs(tab3, tabHeader3));

// input fields
const gramsKHP = document.getElementById("gramsKHP");
const mlNaOH = document.getElementById("mLSodiumHydroxideAnalyte");
const mlNaOHTitrant = document.getElementById("mLSodiumHydroxideTitrant");
const molarityNaOH = document.getElementById("molarityNaOH");
const mlHCl = document.getElementById("mLHCl");

gramsKHP.addEventListener("input", updateNaOHEquation);
mlNaOH.addEventListener("input", updateNaOHEquation);
mlNaOHTitrant.addEventListener("input", updateHClEquation);
molarityNaOH.addEventListener("input", updateHClEquation);
mlHCl.addEventListener("input", updateHClEquation);
