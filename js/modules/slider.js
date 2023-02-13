function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;
  const prev = document.querySelector(prevArrow);

  const next = document.querySelector(nextArrow);
  const currentSlide = document.querySelector(currentCounter);
  const total = document.querySelector(totalCounter);
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = "0" + slides.length;
    currentSlide.textContent = "0" + slideIndex;
  } else {
    total.textContent = slides.length;
    currentSlide.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i += 1) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    changeCounter(slideIndex);
    sliderDots(slideIndex);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    changeCounter(slideIndex);
    sliderDots(slideIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;
      changeCounter(slideIndex);
      sliderDots(slideIndex);
    });
  });

  function changeCounter(index) {
    if (index < 10) {
      currentSlide.textContent = "0" + index;
    } else {
      currentSlide.textContent = index;
    }
  }

  function sliderDots(index) {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[index - 1].style.opacity = 1;
  }
}

export default slider;
