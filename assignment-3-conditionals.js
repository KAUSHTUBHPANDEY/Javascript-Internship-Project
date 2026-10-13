// Assignment 3: Conditional Logic Implementation
const USE_PROMPT = false;
const enteredScore = USE_PROMPT ? prompt("Enter a test score from 0 to 100:", "85") : "85";
const score = Number(enteredScore);

if (enteredScore === null || String(enteredScore).trim() === "" || !Number.isFinite(score) || score < 0 || score > 100) {
  console.log("Invalid score. Enter a number from 0 to 100.");
} else {
  // if...else evaluates the numerical score
  let performance;
  if (score >= 90) {
    performance = "Excellent";
  } else if (score >= 80) {
    performance = "Good";
  } else if (score >= 70) {
    performance = "Satisfactory";
  } else {
    performance = "Needs Improvement";
  }

  // switch determines the letter grade
  let grade;
  switch (true) {
    case score >= 90: grade = "A"; break;
    case score >= 80: grade = "B"; break;
    case score >= 70: grade = "C"; break;
    case score >= 60: grade = "D"; break;
    default: grade = "F";
  }

  const status = score >= 40 ? "Passed" : "Failed"; // ternary operator
  console.log(`Score: ${score}`);
  console.log(`Grade: ${grade}`);
  console.log(`Status: ${status}`);
  console.log(`Performance: ${performance}`);
}
