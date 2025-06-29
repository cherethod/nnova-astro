import { forwardRef } from 'preact/compat';

export const ServiceItem = forwardRef(({ service, index, isVisible }, ref) => {
  return (
    <div 
      ref={ref}
      class={`service-item flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      } ${isVisible ? 'animate-in' : ''}`}
      data-service-index={index}
    >
      <div class="w-full lg:w-1/2 relative">
        <div 
          class="service-image-container relative overflow-hidden rounded-2xl shadow-2xl"
        >
          <img 
            src={service.image} 
            alt={service.title}
            class="service-image w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      <div class="w-full lg:w-1/2 service-content">
        <div class="max-w-xl">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {service.title}
          </h3>
          <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {service.description}
          </p>
          <a 
            href={service.buttonLink || '#'} 
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-primary-700 hover:to-primary-800"
          >
            {service.buttonText || 'Ver Más'}
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
});