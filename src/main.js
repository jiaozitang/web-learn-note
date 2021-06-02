// src/main.js
import foo from './foo.js';
export default async function () {
  console.log(foo);

  const a = () => {
    console.log('a')
  }
  a()

  alert(123)
}