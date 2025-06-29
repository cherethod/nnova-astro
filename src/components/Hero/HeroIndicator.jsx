export function HeroIndicator({
  handleCurrentSlideChange,
  handlePauseChange,
  currentSlide,
  index,
}) {
  return (
    <button
      class={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 hover:scale-110 cursor-pointer ${
        currentSlide === index ? "bg-white" : "bg-transparent"
      }`}
      data-indicator={index}
      aria-label={`Ir al slide ${index + 1}`}
      onClick={() => handleCurrentSlideChange(index)}
      onHover={() => handlePauseChange(true)}
      onMouseLeave={() => handlePauseChange(false)}
    ></button>
  );
}
