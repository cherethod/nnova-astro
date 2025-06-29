import { useEffect, useRef, useState } from 'preact/hooks';
import { ServiceItem } from './ServiceItem';

const ServicesComponent = ({ services }) => {
  const serviceRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState({});

  // Configurar Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = entry.target.dataset.serviceIndex;
        if (entry.isIntersecting) {
          setVisibleItems(prev => ({ ...prev, [index]: true }));
        }
      });
    }, {
      root: null,
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0.1
    });

    serviceRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section class="services-parallax py-20 lg:py-32 bg-gray-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 lg:mb-24">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Nuestros Servicios
          </h2>
          <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Soluciones integrales para transformar tus espacios con la más alta calidad y profesionalismo
          </p>
        </div>

        <div class="space-y-32 lg:space-y-48">
          {services.map((service, index) => (
            <ServiceItem 
              key={index}
              service={service}
              index={index}
              isVisible={!!visibleItems[index]}
              ref={el => serviceRefs.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;