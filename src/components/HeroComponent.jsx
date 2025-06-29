import { useEffect, useRef, useState } from "preact/hooks";
import { HeroItem } from "./HeroItem";
import { HeroIndicator } from "./HeroIndicator";

export function HeroComponent({ slides, autoplayInterval }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(autoplayInterval || 5000);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const startTouchPosition = useRef(null);
    const slidesCount = slides.length;

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
    if (!startTouchPosition) return;
    const endTouchPosition = event.changedTouches[0].clientX;
    const touchDifference = startTouchPosition.current - endTouchPosition;
    if (touchDifference > 50) {
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
        }
    else if (touchDifference < -50) {
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    }
    handlePauseChange(false);
    startTouchPosition.current = null;
  }

  useEffect(() => {
    if (!isVisible) return;
    if (isPaused) return;

    const handleAutoplay = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
    };
    const interval = setInterval(handleAutoplay, autoplay);
    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  
  useEffect(() => {
    if (!isVisible) return;
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
    }
  }, [isVisible]);
  
  useEffect (() => {
    const handleScroll = () => {
        
      if (window.scrollY >= window.innerHeight) {
        console.log("Setting to false");
        
        setIsVisible(false);
      } else {
        console.log("Setting to true");
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[])

  return (
    <section
      id="hero-slider"
      class="relative h-dvh xl:h-[calc(100vh-150px)] overflow-hidden xl:mt-[150px] transition-all duration-300"
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
