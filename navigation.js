let currentSlide = 0;

// Function to change slides
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Update the current slide index based on the direction
    currentSlide += direction;

    // Loop around the slides if reaching the beginning or end
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    // Move the slider container to show the current slide
    const slider = document.querySelector('.slider');
    const offset = -currentSlide * 100; // Each slide takes 100% of the container width
    slider.style.transform = `translateX(${offset}%)`;
}
