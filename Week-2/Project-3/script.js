let countdown;
let timeLeft;

document.getElementById("startButton").addEventListener("click", function () {
  const timeInput = document.getElementById("timeInput").value;
  timeLeft = parseInt(timeInput);

  if (isNaN(timeLeft) || timeLeft <= 0) {
    alert("Lütfen geçerli bir süre girin!");
    return;
  }

  document.getElementById("countdown").textContent = timeLeft;

  clearInterval(countdown);
  countdown = setInterval(updateCountdown, 1000);
});

document.getElementById("resetButton").addEventListener("click", function () {
  clearInterval(countdown);
  document.getElementById("countdown").textContent = "0";
});

const updateCountdown = () => {
  timeLeft--;

  if (timeLeft >= 0) {
    document.getElementById("countdown").textContent = timeLeft;
  } else {
    clearInterval(countdown);
    document.getElementById("countdown").textContent = "Süre doldu!";
  }
};
