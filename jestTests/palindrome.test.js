const { palindrome } = require("../utils/for_testing");

test("palindrome validation", () => {
  const result = palindrome("Andy");
  expect(result).toBe("ydnA");
});

test("palyndrome of empty string", ()=>{
    const result = palindrome("");
    expect(result).toBe("");
})

test("palyndrome of undefined", ()=>{
    const result = palindrome();
    expect(result).toBeUndefined();
})
