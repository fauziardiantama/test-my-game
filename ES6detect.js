var supportsES6 = function() {
    try {
      new Function("(a = 0) => a");
      return true;
    }
    catch (err) {
      return false;
    }
}();

if (supportsES6) {
    console.log("Good, ES6 is supported");
} else {
    alert("Upgrade your browser, ES6 is not supported.\nIt's 2023! You're basically using an ancient browser!");
}