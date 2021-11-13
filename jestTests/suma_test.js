const suma = (a, b) => {
  return a + b;
};

const checks = [
  { a: 0, b: 0, expected: 0 },
  { a: 1, b: 3, expected: 4 },
  { a: -3, b: 3, expected: 0 },
];

checks.forEach(({ a, b, expected }) => {
  console.assert(
    suma(a, b) == expected,
    `Suma de ${a} y ${b} debería ser ${expected}`
  );
});

console.log(`${checks.length} checks performed`)
