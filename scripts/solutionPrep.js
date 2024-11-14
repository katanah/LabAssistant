function calcSolution() {
  const solid = document.getElementById("solidSolute");
  const isSolid = solid.classList.contains("active");
  const vol = parseFloat(document.getElementById("volume").value);
  const molarity = parseFloat(document.getElementById("molr").value);

  if (isNaN(molarity) || isNaN(vol)) return null;

  return isSolid ? calcSolid(vol, molarity) : calcLiquid(vol, molarity);
}

function calcSolid(vol, molarity) {
  const molrMass = parseFloat(document.getElementById("molrMass").value);
  if (isNaN(molrMass)) return null;
  const result = vol * molarity * molrMass;
  return `${vol} L * ${molarity} mol/L * ${molrMass} g/mol = ${result.toFixed(
    2
  )} g`;
}

function calcLiquid(vol, molarity) {
  const concMolr = parseFloat(document.getElementById("concMolr").value);
  if (isNaN(concMolr)) return null;
  const result = (molarity * vol) / concMolr;
  return `(${molarity} M * ${vol} L) /( ${concMolr} M) = ${result.toFixed(
    2
  )} L | ${(1000 * result).toFixed(2)} mL`;
}

function stringToLatex(input) {
  // Handle fractions, e.g., (a * b) / c => \frac{a \cdot b}{c}
  input = input.replace(/\(([^)]+)\)\s*\/\s*\(([^)]+)\)/g, "\\frac{$1}{$2}");

  // Replace multiplication symbol with \cdot for LaTeX formatting
  input = input.replace(/\*/g, " \\cdot ");

  // Format mol/L consistently as a single unit using \mathrm{}
  input = input.replace(/\bmol\/L\b/g, "\\mathrm{\\frac{mol}{L}}");
  input = input.replace(/\bg\/mol\b/g, "\\mathrm{\\frac{g}{mol}}");

  // Format other units like L and mL as regular text
  input = input.replace(/\bL\b/g, "\\,\\mathrm{L}");
  input = input.replace(/\bmL\b/g, "\\,\\mathrm{mL}");
  input = input.replace(/\bM\b/g, "\\,\\mathrm{M}");

  // Handle "|" symbol as "or" text in LaTeX
  input = input.replace(/\|/g, "\\text{ or }");

  // Add thin spaces around equals signs for readability
  input = input.replace(/=/g, "\\, = \\, ");

  return input;
}

function calcAns() {
  const ans = calcSolution();
  if (ans === null) return;
  latexAns = stringToLatex(ans);
  document.getElementById("ans").innerHTML = `\\[ ${latexAns} \\]`;
  MathJax.typeset();
}

function addInfo() {
  const solutionName = document.getElementById("name");
  const solutionFormula = document.getElementById("formula");
  const volume = document.getElementById("volume");
  const molr = document.getElementById("molr");
  const concMolr = document.getElementById("concMolr");
  const molrMass = document.getElementById("molrMass");
  const notes = document.getElementById("notes");
  const latexAnsElement = document.getElementById("ans");

  let solutionInfo = {
    solutionName: solutionName.value,
    solutionFormula: solutionFormula.value,
    volume: parseFloat(volume.value),
    molr: molr.value,
    concMolr: concMolr.value,
    molrMass: molrMass.value,
    notes: notes.value || "",
    latexAns: latexAnsElement.innerHTML.trim(), // Save the actual LaTeX HTML
  };

  console.log("Adding solution with LaTeX:", solutionInfo.latexAns); // Debug log

  solutions.push(solutionInfo);

  const htmlElements = [
    solutionName,
    solutionFormula,
    volume,
    molr,
    concMolr,
    molrMass,
    notes,
  ];
  htmlElements.forEach((element) => (element.value = ""));
  latexAnsElement.innerHTML = ""; // Clear the answer display after saving
}

function generateSolutionSheets() {
  const itemsPerPage = 3;
  const iframe = document.getElementById("printFrame");

  // Set the iframe source to load the solution-sheet.html template
  iframe.src = "../pages/solution-sheet.html";

  iframe.onload = function () {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const ol = iframeDoc.querySelector("ol");
    ol.innerHTML = ""; // Clear any existing content

    for (let i = 0; i < solutions.length; i += itemsPerPage) {
      const pageItems = solutions.slice(i, i + itemsPerPage);

      const pageDiv = iframeDoc.createElement("div");
      if (i > 0) {
        pageDiv.classList.add("page-break");
      }

      pageItems.forEach((item) => {
        const li = iframeDoc.createElement("li");
        li.innerHTML = `<div class="preparedSolution">
                            <ul>
                              <li>Solution Name: ${item.solutionName}</li>
                              <li>Solution Formula: ${item.solutionFormula}</li>
                              <li>Concentration (M): ${item.molr}</li>
                              <li>Volume: ${item.volume}</li>
                              <li>Notes: ${item.notes}</li>
                            </ul>
                            <div class="calculations">
                              <p>Calculations:</p>
                              <div class="latex-calculation">${item.latexAns}</div>
                            </div>
                          </div>`;
        pageDiv.appendChild(li);
      });

      ol.appendChild(pageDiv);
    }

    // Render MathJax within the iframe after setting innerHTML
    iframe.contentWindow.MathJax.typesetPromise([iframeDoc.body])
      .then(() => {
        // Print the iframe content after MathJax rendering is complete
        iframe.contentWindow.print();
      })
      .catch((error) => {
        console.error("MathJax rendering error in iframe:", error);
      });
  };
}

function printSolutionSheets() {
  if (solutions.length === 0) {
    alert("No Solutions Added");
    return;
  }
  generateSolutionSheets();
}

function acitvateSolute(active, inactive){
  active.classList.add("active");
  active.classList.remove("inactive");
  inactive.classList.remove("active");
  inactive.classList.add("inactive");

}

function initListeners() {
  const volume = document.getElementById("volume");
  const molr = document.getElementById("molr");
  const molrMass = document.getElementById("molrMass");
  const concMolr = document.getElementById("concMolr");
  const addInfoButton = document.getElementById("addInfoButton");
  const printButton = document.getElementById("printButton");
  const solidSolute = document.getElementById("solidSolute");
  const liquidSolute = document.getElementById("liquidSolute");

  volume.addEventListener("input", calcAns);
  molr.addEventListener("input", calcAns);
  molrMass.addEventListener("input", calcAns);
  concMolr.addEventListener("input", calcAns);
  addInfoButton.addEventListener("click", addInfo);
  printButton.addEventListener("click", printSolutionSheets);
  solidSolute.addEventListener("click", () => acitvateSolute(solidSolute, liquidSolute));
  liquidSolute.addEventListener("click", () => acitvateSolute(liquidSolute, solidSolute));
}

document.addEventListener("DOMContentLoaded", initListeners);

let solutions = [];
