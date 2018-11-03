
const add = (a, b) => a + b
const generateGreeting = (name = 'NoName') => `Hello ${name}` 

test('should add two numbers', () => {
  const result = add(1, 5)
  expect(result).toBe(6)
})

test('should be greeting with a name', () => {
  const result = generateGreeting('Alan')
  expect(result).toBe('Hello Alan')
})