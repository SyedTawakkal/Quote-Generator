const submitBtn = document.querySelector(".button");
const inputName = document.querySelector(".input-name");
const inputPassword = document.querySelector(".input");
const response = document.querySelector(".response");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
const page3 = document.querySelector(".page-3");
const animeContainer = document.querySelector(".anime-container");
const quoteContainer = document.querySelector(".quote-container");
const characterContainer = document.querySelector(".character-container");
const nextButton = document.querySelector(".page-2-button");
let anime, character, quote;
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputName.value === "" && inputPassword.value === "") {
    response.innerHTML = "Invalid Inputs";
    setTimeout(() => {
      response.innerHTML = "";
    }, 3000);
  } else {
    page3.style.display = "block";
  }
  const data = {
    name: inputName.value,
    password: inputPassword.value,
  };
  //   console.log(data);
  fetch("/authenticate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    res.json().then(async (data) => {
      console.log(data.status + " " + "statusfromscript");
      if (data.status === "Failed1" || data.status === "Failed") {
        response.innerHTML = "Invalid Inputs";
        setTimeout(() => {
          response.innerHTML = "";
        }, 3000);
        page3.style.display = "none";
      }
      if (
        data.status === "success1" ||
        data.status === "success2" ||
        data.status === "success3" ||
        data.status === "success4"
      ) {
        page1.style.display = "none";
        const quoteObj = await fetch("https://animechan.vercel.app/api/random");
        quoteObj.json().then((data) => {
          anime = data.anime;
          character = data.character;
          quote = data.quote;
          console.log(quote);
          animeContainer.innerHTML = anime;
          quoteContainer.innerHTML = quote;
          characterContainer.innerHTML = character;
          page3.style.display = "none";
          page2.style.display = "block";
        });
        // console.log(deets);
        // anime = deets.anime;
        // console.log(anime);
      }
    });
  });
});
nextButton.addEventListener("click", async () => {
  page2.style.display = "none";
  page3.style.display = "block";
  const quoteObj = await fetch("https://animechan.vercel.app/api/random");
  quoteObj.json().then((data) => {
    anime = data.anime;
    character = data.character;
    quote = data.quote;
    console.log(quote);
    animeContainer.innerHTML = anime;
    quoteContainer.innerHTML = quote;
    characterContainer.innerHTML = character;
    page3.style.display = "none";
    page2.style.display = "block";
  });
});
