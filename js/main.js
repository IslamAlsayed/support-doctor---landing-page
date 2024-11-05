let navLinks = document.querySelectorAll(".listLink a");
let menuToggle = document.getElementById("menuBars");
let listLink = document.getElementById("listLink");
let links = document.querySelectorAll(".listLink .link");
let colorsLi = document.querySelectorAll(".listColor li");
let reset = document.getElementById("reset");
let titleHeader = document.getElementById("titleHeader");
let cardsSection = document.getElementById("cards");
let progress = document.querySelectorAll("#cards .progress");
let cardBlock = document.querySelectorAll(".banner .block");
let up = document.getElementById("up");
let cardProgress = false,
  cardBlockStarted = false;

// Functions Will Word With Scroll Window
window.onscroll = () => {
  if (cardProgress == false) {
    if (window.scrollY + 450 >= cardsSection.offsetTop) {
      progress.forEach((prog) => CardsProgress(prog));
    }

    cardProgress = true;
  }

  if (!cardBlockStarted) {
    let allBlocksShown = true;

    cardBlock.forEach((block) => {
      if (window.scrollY + window.innerHeight >= block.offsetTop + 250) {
        block.classList.add("show");
      } else {
        allBlocksShown = false;
      }
    });

    if (allBlocksShown) {
      cardBlockStarted = true;
    }
  }

  scrollGoTop();

  listLink.classList.remove("m-show");
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});

menuToggle.addEventListener("click", () => listLink.classList.toggle("m-show"));

// Close Menu Bars By Onclick AnyWay
document.addEventListener("click", (e) => {
  if (e.target !== menuToggle) listLink.classList.remove("m-show");
});

links.forEach((l) => {
  l.addEventListener("click", () => listLink.classList.remove("m-show"));
});

// Check For Color In LocalStorage
let newColor = localStorage.getItem("mainColor");
if (newColor != null) {
  document.documentElement.style.setProperty("--main-color", newColor);

  colorsLi.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color == newColor) li.classList.add("active");
  });
}

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    colorsLi.forEach((li) => li.classList.remove("active"));
    li.classList.add("active");
    dataColor = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", dataColor);

    // Set Color In LocalStorage
    localStorage.setItem("mainColor", dataColor);
  });
});

reset.addEventListener("click", () => {
  localStorage.removeItem("mainColor");
  window.location.reload();
});

titleHeader.addEventListener("click", () => {
  document.documentElement.scrollTop = "0";
});

function CardsProgress(Prog) {
  let progress = Prog.dataset.progress;
  let count = setInterval(() => {
    Prog.textContent++;
    if (Prog.textContent == progress) clearInterval(count);
  }, 500 / progress);
}

let scrollGoTop = () => {
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.body.clientHeight - document.documentElement.clientHeight;
  let scrollProgress = Math.round((Math.floor(pos) * 100) / calcHeight);

  if (pos > 450) {
    up.classList.add("active");
  } else {
    up.classList.remove("active");
  }

  up.style.background = `conic-gradient(#0f0 ${scrollProgress}% , #00000030 ${scrollProgress}%) `;
  up.addEventListener("click", () => {
    document.documentElement.scrollTop = "0";
  });
};
