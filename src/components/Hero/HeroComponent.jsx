import { useEffect, useRef, useState } from "preact/hooks";
import { HeroItem } from "./HeroItem";
import { HeroIndicator } from "./HeroIndicator";

export function HeroComponent({ slides, autoplayInterval }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const sliderRef = useRef(null);
  const startTouchPosition = useRef(null);
  const autoplay = autoplayInterval || 5000;
  const slidesCount = slides.length;
  const minSwipeDistance = 50;
  
  function handleCurrentSlideChange(index) {
    setCurrentSlide(index);
  }

  function handlePauseChange(pause) {
    setIsPaused(pause);
  }

  function handleTouchStart(event) {
    handlePauseChange(true);
    startTouchPosition.current = event.touches[0].clientX;
  }
  function handleTouchEnd(event) {
    if (!startTouchPosition.current) return;

    const endTouchPosition = event.changedTouches[0].clientX;
    const touchDifference = startTouchPosition.current - endTouchPosition;

    if (touchDifference > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    } else if (touchDifference < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    }

    handlePauseChange(false);
    startTouchPosition.current = null;
  }

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const handleAutoplay = () => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    };

    const interval = setInterval(handleAutoplay, autoplay);

    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!isVisible || !slider) return;

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }
    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sliderRef}
      id="hero-slider"
      class="relative h-dvh xl:h-[calc(100vh-150px)] overflow-hidden xl:mt-[150px] transition-all duration-300"
      style={{ touchAction: 'pan-y' }} 
    >
      <div class="relative h-full w-full">
        {slides.map((slide, index) => (
          <HeroItem slide={slide} index={index} currentSlide={currentSlide} />
        ))}
      </div>

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <HeroIndicator
            handleCurrentSlideChange={handleCurrentSlideChange}
            handlePauseChange={handlePauseChange}
            currentSlide={currentSlide}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
