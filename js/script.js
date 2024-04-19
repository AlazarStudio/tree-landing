// script.js
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.gallery img');
    const totalSlides = slides.length;
  
    document.querySelector('#prevSlide').addEventListener('click', function() {
      slides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      slides[currentSlide].style.display = 'block';
    });
  
    document.querySelector('#nextSlide').addEventListener('click', function() {
      slides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].style.display = 'block';
    });
  });
  