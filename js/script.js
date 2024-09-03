let radioContainer = document.querySelectorAll(".radio_container");
let radioInput = document.querySelectorAll("input[type=radio]");
let inputContainer = document.querySelectorAll(".input_container");
let inputs = document.querySelectorAll("input");
let rightContainer = document.querySelector(".rightContainer");
let btn = document.querySelector(".btn");
let form = document.querySelector("form");
let errorMsg = document.querySelectorAll(".error");
let topResult = document.querySelector(".topResultSpan");
let bottomResult = document.querySelector(".bottomResultSpan");
let firstResult = document.querySelector(".firstResult");
let secondResult = document.querySelector(".secondResult");

radioInput.forEach((input) => {
  input.addEventListener("click", () => {
    radioContainer.forEach((radio) => {
      if (radio.classList.contains("checked")) {
        radio.classList.remove("checked");
      }
      input.parentElement.classList.add("checked");
    });
  });
});

inputContainer.forEach((input) => {
  input.addEventListener("click", () => {
    inputContainer.forEach((input) => {
      if (input.classList.contains("clicked")) {
        input.classList.remove("clicked");
      }
    });
    input.classList.add("clicked");
  });
});

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    input.parentElement.parentElement
      .querySelector(".error")
      .classList.remove("active");
    if ((input.value === "") | undefined) {
      input.parentElement.classList.remove("activeSpan");
    }
  });
});

function clearForm() {
  form.reset();
  secondResult.classList.remove("activeResult");
  firstResult.classList.add("activeResult");
  inputs.forEach((input) => {
    input.parentElement.classList.remove("activeSpan");
  });
  errorMsg.forEach((error) => {
    error.classList.remove("active");
  });
}

function calculateMortage(amount, term, rate, type) {
  // Convert annual rate to monthly and term to months
  let monthlyRate = rate / 100 / 12;
  let n = term * 12;

  let monthlyPayment;
  let totalPayment;

  // Handle edge case where monthlyRate is zero
  if (monthlyRate === 0) {
    // For a zero interest rate, the calculation is simpler
    monthlyPayment = amount / n;
    totalPayment = monthlyPayment * n;
  } else {
    // For non-zero interest rate, use the standard formula
    monthlyPayment =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
      (Math.pow(1 + monthlyRate, n) - 1);
    totalPayment = monthlyPayment * n;
  }

  // Return results as an object
  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
  };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());

  let isValid = true;

  if (data.amount === "") {
    isValid = false;
    errorMsg[0].classList.add("active");
    errorMsg[0].previousElementSibling.classList.add("activeSpan");
  } else {
    errorMsg[0].classList.remove("active");
    errorMsg[0].previousElementSibling.classList.remove("activeSpan");
  }
  if (data.term === "") {
    isValid = false;
    errorMsg[1].classList.add("active");
    errorMsg[1].previousElementSibling.classList.add("activeSpan");
  } else {
    errorMsg[1].classList.remove("active");
    errorMsg[1].previousElementSibling.classList.remove("activeSpan");
  }
  if (data.rate === "") {
    isValid = false;
    errorMsg[2].classList.add("active");
    errorMsg[2].previousElementSibling.classList.add("activeSpan");
  } else {
    errorMsg[2].classList.remove("active");
    errorMsg[2].previousElementSibling.classList.remove("activeSpan");
  }
  if (data.type === undefined) {
    isValid = false;
    errorMsg[3].classList.add("active");
  } else {
    errorMsg[3].classList.remove("active");
  }

  if (isValid) {
    let firstResult = document.querySelector(".firstResult");
    let secondResult = document.querySelector(".secondResult");

    if (firstResult.classList.contains("activeResult")) {
      firstResult.classList.remove("activeResult");
      secondResult.classList.add("activeResult");
    }

    let { monthlyPayment, totalPayment } = calculateMortage(
      data.amount,
      data.term,
      data.rate,
      data.type
    );

    if (monthlyPayment && totalPayment) {
      topResult.innerHTML = monthlyPayment;

      bottomResult.innerHTML = totalPayment;
    }
  }
});
