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
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const selectedCategory = button.getAttribute('data-category');
    projectItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (selectedCategory === 'all' || selectedCategory === itemCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
const testimonials = [
  {
    name: "John Doe",
    role: "CEO",
    image: "https://i.pravatar.cc/300?img=12",
    text: "Lorem ipsum dolor sit amet consectetur. In enim cursus odio accumsan. Id leo urna velit neque mattis id tellus arcu condimentum. Augue dictum dolor elementum convallis dignissim malesuada commodo ultrices."
  },
  {
    name: "Anna Smith",
    role: "Senior QA Engineer",
    image: "https://i.pravatar.cc/300?img=47",
    text: "Great experience working together! The attention to detail in web and app testing was top-notch. Highly recommended for any automation project."
  },
  {
    name: "Michael Brown",
    role: "Product Manager",
    image: "https://i.pravatar.cc/300?img=33",
    text: "Outstanding work on API integration testing. All bugs were found and resolved before product release. Exceptional professionalism."
  },
  {
    name: "Sophia Davis",
    role: "UX Designer",
    image: "https://i.pravatar.cc/300?img=5",
    text: "Seamless collaboration and amazing communication. The tests delivered were clean, efficient, and well-documented."
  }
];
const imgElement = document.getElementById('testimonial-img');
const textElement = document.getElementById('testimonial-text');
const nameElement = document.getElementById('testimonial-name');
const roleElement = document.getElementById('testimonial-role');
const dots = document.querySelectorAll('.dot');
function updateSlide(index) {
  imgElement.src = testimonials[index].image;
  textElement.textContent = testimonials[index].text;
  nameElement.textContent = testimonials[index].name;
  roleElement.textContent = testimonials[index].role;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideIndex = e.target.getAttribute('data-index');
    updateSlide(slideIndex);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");
  const modalOkBtn = document.getElementById("modalOkBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        website: document.getElementById("website").value.trim(),
        message: document.getElementById("message").value.trim(),
      };
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          contactForm.reset();
          if (successModal) {
            successModal.style.display = "flex";
          }
        } else {
          alert("შეცდომა! მონაცემები ვერ გაიგზავნა.");
        }
      } catch (error) {
        console.error("Error sending data:", error);
        alert("დაფიქსირდა შეცდომა ქსელში.");
      }
    });
  }
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      successModal.style.display = "none";
    });
  }
  if (modalOkBtn) {
    modalOkBtn.addEventListener("click", () => {
      successModal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.style.display = "none";
    }
  });
});