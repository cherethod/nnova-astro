import { useEffect, useRef, useState } from "preact/hooks";

export const FaqsComponent = () => {
  const faqs = [
    {
      question: "¿Es el Durlock (cartón yeso) un material resistente?",
      answer:
        "El Durlock (cartón yeso) es un material resistente, sin embargo, su grado de resistencia depende de los requerimientos específicos. En casos donde se necesite una mayor resistencia, es recomendable utilizar un montaje más compacto y un tipo de placa de yeso específica. Por ejemplo, el Durlock ER (color amarillo) ofrece resistencia a golpes y arañazos, el Durlock AQ (color azul) brinda aislamiento acústico, y el Durlock RF (color rosa) es especialmente resistente al fuego. Estas opciones permiten adaptar el Durlock a las necesidades de cada proyecto, asegurando la durabilidad y protección adecuadas.",
    },
    {
      question: "¿Cuánto peso podría llegar a soportar?",
      answer:
        "Este producto es ideal para la fijación de objetos no muy pesados, ya que la capacidad de carga (por placa de yeso laminado) es de hasta 10 kg en placas de 12.5 mm y 8 kg en placas de 9.5 mm. Sin embargo, si se requiere colgar un objeto más pesado, es posible reforzar la estructura previamente en función del peso a colocar. De esta manera, se garantiza una instalación segura y resistente que cumple con los requerimientos específicos de cada proyecto. Nuestra prioridad es asegurar la estabilidad y durabilidad de las instalaciones, brindando soluciones adaptadas a las necesidades de nuestros clientes.",
    },
    {
      question: "¿Es resistente a la humedad y el fuego?",
      answer:
        "La resistencia del Durlock a la humedad y al fuego depende de su composición. En entornos húmedos, se recomienda utilizar un montaje que evite el contacto directo con superficies húmedas y una placa de yeso laminado específica contra la humedad (RH). Además, existen productos aislantes en el mercado, como pinturas y sprays, que ofrecen una protección adicional contra el agua y la humedad, los cuales pueden aplicarse una vez finalizado el montaje del Durlock.",
    },
    {
      question: "¿Qué tipo de mantenimiento requiere?",
      answer:
        "El Durlock no requiere un mantenimiento específico, ya que es un material duradero y resistente. Sin embargo, es importante realizar una limpieza regular para mantener su apariencia y funcionalidad. En caso de daños menores, como pequeñas abolladuras o rasguños, se pueden reparar fácilmente con masilla o pintura. Para garantizar la longevidad del Durlock, se recomienda evitar el contacto directo con superficies húmedas y utilizar productos aislantes en entornos propensos a la humedad.",
    },
    {
      question: "¿Se puede reparar o pintar?",
      answer:
        "El Durlock ofrece la ventaja de poder ser pintado, empapelado o alicatado. Si se produce algún desperfecto en el tabique revestido, el proceso de reparación es similar al realizado en otros tipos de superficies. Es común que los desperfectos afecten también al revestimiento existente, ya sea pintura o azulejos. Por tanto, para solucionar estos problemas, se seguirá el mismo procedimiento que se aplicaría en cualquier otro tipo de soporte. Sin embargo, en caso de que el desperfecto en la placa de yeso laminado sea demasiado grave, puede ser necesario reemplazar la placa completa. Aunque esta reparación pueda parecer extrema, no resulta costosa y se puede realizar en poco tiempo, garantizando así un acabado óptimo y duradero.",
    },
  ];

  const [activeFaq, setActiveFaq] = useState(null);
  const faqRefs = useRef([]);

  useEffect(() => {
    if (activeFaq !== null && faqRefs.current[activeFaq]) {
      // Scroll suave al FAQ activo con margen superior
      faqRefs.current[activeFaq].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeFaq]);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <>
      <h3 class="text-5xl font-bold text-center my-8">
        Preguntas Frequentes
      </h3>
      <div class="faqs-container w-2/3 mx-auto flex flex-col gap-4 mb-8">
        {faqs.map((faq, index) => (
          <article
            ref={(el) => (faqRefs.current[index] = el)}
            class={`faq-item border rounded-lg overflow-hidden bg-white cursor-pointer
                    transition-all duration-300
                    ${
                      activeFaq === index 
                        ? "faq-active shadow-md" 
                        : ""
                    }`}
            onClick={() => toggleFaq(index)}
            key={index}
          >
            <div class="flex justify-between items-center p-4">
              <h3 class="text-xl font-semibold pr-4">{faq.question}</h3>
              <span class={`rotate-0 transition-transform duration-300 ${
                activeFaq === index ? "rotate-90" : ""
              }`}>
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="question__icon--svg"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                </svg>
              </span>
            </div>
            <p class={`px-4 overflow-hidden transition-all duration-300 ${
              activeFaq === index
                ? "max-h-96 opacity-100 pb-4 pt-1"
                : "max-h-0 opacity-0"
            }`}>
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </>
  );
};