const isHasJavaScriptString = (stringToCheck = 'javascript') => {
  const jsRegex = /javascript/i;
  return jsRegex.test(stringToCheck);
}

module.exports = isHasJavaScriptString;
