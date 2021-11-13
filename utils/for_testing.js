const palindrome = (string) => {
  return typeof string === "undefined"
    ? undefined
    : string.split("").reverse().join("");
};

const average = (array) => {
  if (array.length === 0) {
    return 0;
  } else {
    let sum = 0;
    array.forEach((num) => {
      sum = sum + num;
    });
    return sum / array.length;
  }
};

module.exports = { palindrome, average };
