// Assignment 5: Function Architecture and Scope
function rectangleArea(length = 5, width = 4) {
  const functionScopedMessage = "This variable is local to rectangleArea.";
  return length * width;
}

const rectangleAreaArrow = (length = 5, width = 4) => length * width;

console.log(`Standard Function Area (Default 5x4): ${rectangleArea()}`);
console.log(`Arrow Function Area (Custom 10x3): ${rectangleAreaArrow(10, 3)}`);

function demonstrateScope() {
  const functionVar = "inside function";
  console.log(`Function scope test: ${functionVar}`);
  {
    let blockVar = "inside block";
    console.log(`Block scope inside block: ${blockVar}`);
  }
  try {
    // Deliberately access a block-scoped variable from outside its block.
    console.log(blockVar);
  } catch (error) {
    console.log(`Scope Test Error: ${error.name}: ${error.message}`);
  }
}
demonstrateScope();
