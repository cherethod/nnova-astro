export function HeroItem({ slide, index, currentSlide }) {
 
  return (
    <div
      class={`absolute inset-0 flex items-center justify-center text-white transition-opacity duration-1000 ${
        currentSlide === index ? "opacity-100 bg-white" : "opacity-0 bg-transparent"
      } ${slide.backgroundColor || "bg-gray-900"} ${
        slide.backgroundImage ? "bg-cover bg-left md:bg-center" : ""
      }`}
      data-slide={index}
      style={
        slide.backgroundImage
          ? `background-image: url(${slide.backgroundImage});`
          : ""
      }
    >
      {slide.backgroundImage && (
        <div class="absolute inset-0 bg-black/30"></div>
      )}

      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up text-pretty">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p class="text-xl md:text-2xl lg:text-3xl opacity-90 animate-fade-in-up-delay">
            {slide.subtitle}
          </p>
        )}
        {slide.linkURL && slide.linkText && (
          <div class="mt-6">
            <a
              href="{slide.linkURL}"
              class="inline-block px-6 py-3 bg-fuchsia-800 text-white font-semibold rounded-lg shadow-lg hover:bg-fuchsia-950 transition-colors duration-300"
            >
              {slide.linkText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
