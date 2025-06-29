import { useEffect, useRef, useState } from 'preact/hooks';
import { ServiceItem } from './ServiceItem';

const ServicesComponent = ({ services }) => {
  const serviceItemsRef = useRef([]);
  const imageContainersRef = useRef([]);
  const [visibleItems, setVisibleItems] = useState(services.map(() => false));
  const lastScrollY = useRef(0);
  const animationFrameId = useRef(null);

  // Configurar Intersection Observer para animaciones de entrada
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = serviceItemsRef.current.indexOf(entry.target);
          if (index !== -1) {
            setVisibleItems(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        }
      });
    }, observerOptions);

    serviceItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Configurar efecto parallax con throttling
  useEffect(() => {
    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      
      // Solo actualizar si el scroll ha cambiado significativamente
      if (Math.abs(scrollY - lastScrollY.current) < 5) {
        animationFrameId.current = null;
        return;
      }
      
      lastScrollY.current = scrollY;
      
      imageContainersRef.current.forEach((container, index) => {
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const containerTop = rect.top + scrollY;
          const containerHeight = rect.height;
          const scrollProgress = (scrollY + windowHeight - containerTop) / (windowHeight + containerHeight);
          const parallaxOffset = (scrollProgress - 0.5) * 30; // Reducido para efecto más sutil
          
          container.style.transform = `translateY(${parallaxOffset}px)`;
        }
      });
      
      animationFrameId.current = null;
    };

    const handleScroll = () => {
      if (animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Ejecutar una vez al montar
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
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
              service={service}
              index={index}
              visibleItems={visibleItems}
              ref={el => serviceItemsRef.current[index] = el}
              key={index}
              />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;