function predictSodiumHydroxide(gramsKHP, expectedMolarityNaOH) {
  const LITERS_TO_ML = 1000;
  const MOLAR_MASS_KHP = 204.23;
  const mlSodiumHydroxide =
    (LITERS_TO_ML * gramsKHP) / (MOLAR_MASS_KHP * expectedMolarityNaOH);
  return mlSodiumHydroxide.toFixed(2);
}

function predictHydrocholoricAcid(molarityHCl, mlHCl, molarityNaOH) {
  const mlSodiumHydroxide = (molarityHCl * mlHCl) / molarityNaOH;
  return mlSodiumHydroxide.toFixed(2);
}

function updateNaOHPrediction() {
  const grams = parseFloat(gramsKHP.value).toFixed(3);
  const molarity = parseFloat(expectedNaOH.value).toFixed(4);
  let mL;
  let newEquation;

  if (!isNaN(molarity) && !isNaN(grams)) {
    mL = predictSodiumHydroxide(grams, molarity);
    newEquation = `\\frac{1000 \\times ${grams} \\text{ g KHP}}{204.23 \\frac{\\text{g KHP}}{\\text{mol KHP}} \\times ${molarity} \\text{ M NaOH}} 
    = ${mL} \\text{ mL NaOH}`;
  } else if (!isNaN(grams)) {
    newEquation = `\\frac{1000 \\times ${grams} \\text{ g KHP}}{204.23 \\frac{\\text{g KHP}}{\\text{mol KHP}} \\times \\text{M NaOH}} = \\text{ mL NaOH}`;
  } else if (!isNaN(molarity)) {
    newEquation = `\\frac{1000 \\times \\text{g KHP}}{204.23 \\frac{\\text{g KHP}}{\\text{mol KHP}} \\times ${molarity} \\text{ M NaOH}} = \\text{ mL NaOH}`;
  } else {
    newEquation =
      "Invalid inputs. Please provide valid values for grams of KHP and molarity.";
    console.error("Invalid inputs");
  }

  const equationContainer = document.getElementById("equationSH");
  equationContainer.innerHTML = `$$ ${newEquation} $$`;

  MathJax.typesetPromise([equationContainer]).catch((err) => {
    console.error("MathJax rendering failed:", err);
  });
}

function updateHClPrediction() {
  const molarityNaOH = parseFloat(molNaOH.value).toFixed(4);
  const hclVol = parseFloat(mLHCl.value).toFixed(2);
  const expectedMolarity = parseFloat(expectedHCl.value).toFixed(4);
  let mL;
  let newEquation;

  if (!isNaN(molarityNaOH) && !isNaN(hclVol) && !isNaN(expectedMolarity)) {
    mL = predictHydrocholoricAcid(expectedMolarity, hclVol, molarityNaOH);
    newEquation = `\\frac{${hclVol} 
    \\text{ mL HCl} \\times ${expectedMolarity} 
    \\text{ M HCl}}{${molarityNaOH} 
    \\text{ M NaOH}} 
    = ${mL} \\text{ mL NaOH}`;

    const equationContainer = document.getElementById("equationHA");
    equationContainer.innerHTML = `$$ ${newEquation} $$`;

    MathJax.typesetPromise([equationContainer]).catch((err) => {
      console.error("MathJax rendering failed:", err);
    });
  }
}

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

const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
// const tab3 = document.getElementById("tab3");
const tabHeader1 = document.getElementById("tabHeader1");
const tabHeader2 = document.getElementById("tabHeader2");
// const tabHeader3 = document.getElementById("tabHeader3");

tabHeader1.addEventListener("click", () => switchTabs(tab1, tabHeader1));
tabHeader2.addEventListener("click", () => switchTabs(tab2, tabHeader2));
// tabHeader3.addEventListener("click", () => switchTabs(tab3, tabHeader3));

// for naoh
const gramsKHP = document.getElementById("gramsKHP");
const expectedNaOH = document.getElementById("expectedMolarityNaOH");

gramsKHP.addEventListener("input", updateNaOHPrediction);
expectedNaOH.addEventListener("input", updateNaOHPrediction);

// for hcl
const molNaOH = document.getElementById("molNaOH");
const mlHCl = document.getElementById("mLHCl");
const expectedHCl = document.getElementById("expectedMolarityHCl");

molNaOH.addEventListener("input", updateHClPrediction);
mlHCl.addEventListener("input", updateHClPrediction);
expectedHCl.addEventListener("input", updateHClPrediction);

// for na2s2o3
