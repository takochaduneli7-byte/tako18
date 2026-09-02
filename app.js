document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }  
        setInterval(nextSlide, 5000);
    }
    const aboutSection = document.querySelector('#about');
    const skillSliders = document.querySelectorAll('.skill-slider');
    let hasAnimated = false;
    function animateSliders() {
        skillSliders.forEach(slider => {
            const targetValue = parseInt(slider.getAttribute('data-target')) || 0;
            let currentValue = 0;
            const interval = setInterval(() => {
                if (currentValue >= targetValue) {
                    clearInterval(interval);
                } else {
                    currentValue++;
                    slider.value = currentValue;
                    slider.style.setProperty('--value', `${currentValue}%`);
                }
            }, 12);
        });
    }
    skillSliders.forEach(slider => {
        slider.addEventListener('input', () => {
            slider.style.setProperty('--value', `${slider.value}%`);
        });
    });
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateSliders();
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(aboutSection);
    }
});