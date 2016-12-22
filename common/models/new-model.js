function isBalanced(str) {
  var i, ch;

  var checkBrackets = new Map();
  checkBrackets.set(']', '[');
  checkBrackets.set('}', '{');
  checkBrackets.set(')', '(');

  // Use the spread operator to transform a map into a 2D key-value Array.
  var closingBrackets = [...checkBrackets.keys()];
  var openingBrackets = [...checkBrackets.values()];

  var temp = [];
  var len = str.length;

  for (i = 0; i < len; i++) {
    ch = str[i];

    if (openingBrackets.indexOf(ch) > -1) {
      temp.push(ch);
    } else if (closingBrackets.indexOf(ch) > -1) {

      var expectedBracket = checkBrackets.get(ch);
      if (temp.length === 0 || (temp.pop() !== expectedBracket)) {
        return false;
      }

    } else {
      // Ignore the characters which do not match valid Brackets symbol
      continue;
    }
  }

  return (temp.length === 0);
}
