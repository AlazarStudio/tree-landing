// Объявляем переменную slideIndex в глобальной области видимости
let slideIndex = 1;

function openModal(imgMass) {
  document.getElementById("myModal").style.display = "block";
  document.body.style.overflow = "hidden";  
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  console.log(n)
  let i;
  const slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "flex";
}

window.onclick = function (event) {
  if (event.target.tagName !== "IMG") {
    closeModal();
  }
};

function stopPropagation(event) {
  event.stopPropagation();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    plusSlides(-1);
  } else if (event.key === "ArrowRight") {
    plusSlides(1);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
