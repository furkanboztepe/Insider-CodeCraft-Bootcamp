const collatzSequence = (number) => {
  while (number !== 1) {
      console.log(number);
      if (number % 2 === 0) {
          number = number / 2;
      } else {
          number = number * 3 + 1;
      }
  }
  console.log(number);
}

let userInput = parseInt(prompt("Bir sayı girin:"));
if (!isNaN(userInput)) {
  collatzSequence(userInput);
} else {
  console.log("Geçersiz giriş! Lütfen bir sayı girin.");
}