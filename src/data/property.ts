export type PropertyScene = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "right" | "center";
  hero?: boolean;
};

export const property = {
  title: "Ático Castellana",
  location: "Paseo de la Castellana · Madrid",
  brand: "ATELIER RESIDENCES",
  descriptor: "UN CONCEPTO DE VIVIENDA EXTRAORDINARIA",
  intro: "Dos plantas. Terraza con piscina privada.\nUna nueva perspectiva sobre Madrid.",
  facts: [
    { value: "2", label: "Plantas" },
    { value: "2", label: "Dormitorios" },
    { value: "3", label: "Baños" },
    { value: "1", label: "Piscina privada" },
  ],
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  disclaimer: "Proyecto demostrativo · Imágenes generadas con IA · Planos ilustrativos",
  floorPlans: [
    {
      title: "Planta 1 · Zona de día y noche",
      details: [
        "Salón y comedor abiertos a la luz natural",
        "Sala de estar independiente",
        "Cocina con office",
        "Dormitorio principal con vestidor y baño en suite",
        "Segundo dormitorio con armarios",
        "Recibidor y escalera escultórica",
      ],
    },
    {
      title: "Planta 2 · Terraza y piscina",
      details: [
        "Piscina privada sobre la ciudad",
        "Terraza panorámica",
        "Cocina-comedor con despensa",
        "Salón abierto al exterior",
        "Sunroom acristalado",
        "Baño de invitados",
      ],
    },
  ],
  gallery: [
    { image: "/images/hero.webp", title: "LA CIUDAD, DESDE EL SALÓN", alt: "Salón panorámico en un ático de ejemplo" },
    { image: "/images/salon.webp", title: "ESPACIOS QUE RESPIRAN", alt: "Comedor de diseño y escalera escultórica" },
    { image: "/images/cocina.webp", title: "LA LUZ DE LA PLANTA ALTA", alt: "Cocina y sunroom acristalado" },
    { image: "/images/piscina.webp", title: "UN PRIVILEGIO A CIELO ABIERTO", alt: "Piscina privada en terraza de ejemplo" },
    { image: "/images/suite.webp", title: "SUITE Y VESTIDOR", alt: "Dormitorio principal con vestidor" },
    { image: "/images/bano.webp", title: "MATERIALES DE AUTOR", alt: "Baño revestido de piedra oscura" },
    { image: "/images/hero.webp", title: "MADRID AL ATARDECER", alt: "Atardecer desde salón panorámico" },
  ],
};

export function whatsappHref(privateVisit = false) {
  const text = privateVisit
    ? `Hola, me gustaría solicitar una visita privada para ${property.title}.`
    : `Hola, quisiera recibir más información sobre ${property.title}.`;
  const number = property.whatsappNumber;
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export const firstFloorScenes: PropertyScene[] = [
  { image: "/images/hero.webp", eyebrow: property.descriptor, title: "Ático\nCastellana", description: property.intro, align: "center", hero: true },
  { image: "/images/salon.webp", eyebrow: "PLANTA 1 · 01", title: "Salón y comedor\nde doble amplitud", description: "Estancias abiertas, materiales naturales y vistas que acompañan cada momento.", align: "left" },
  { image: "/images/hero.webp", eyebrow: "PLANTA 1 · 02", title: "Sala de estar\nindependiente", description: "Varios ambientes que dialogan entre sí, con una arquitectura serena y contemporánea.", align: "right" },
  { image: "/images/suite.webp", eyebrow: "PLANTA 1 · 03", title: "Dos dormitorios,\ntres baños", description: "Una zona íntima pensada para descansar, con vestidor y detalles cuidadosamente elegidos.", align: "left" },
];

export const secondFloorScenes: PropertyScene[] = [
  { image: "/images/cocina.webp", eyebrow: "PLANTA 2 · 01", title: "Cocina-comedor\ncon vistas", description: "Un espacio abierto para compartir la vida interior y exterior durante todo el año.", align: "left" },
  { image: "/images/piscina.webp", eyebrow: "PLANTA 2 · 02", title: "Terraza\npanorámica", description: "El skyline de Madrid se convierte en una extensión natural de la vivienda.", align: "right" },
  { image: "/images/piscina.webp", eyebrow: "PLANTA 2 · 03", title: "Piscina\nprivada", description: "Un oasis elevado para mirar la ciudad desde otro lugar.", align: "left" },
];

export const detailScenes: PropertyScene[] = [
  { image: "/images/suite.webp", eyebrow: "DORMITORIO PRINCIPAL", title: "Una suite\ncon vestidor", description: "Texturas suaves, amplitud y una atmósfera de máxima tranquilidad.", align: "left" },
  { image: "/images/bano.webp", eyebrow: "BAÑO EN SUITE", title: "Piedra natural\ny luz tenue", description: "El diseño convierte las rutinas cotidianas en pequeños rituales de bienestar.", align: "right" },
  { image: "/images/salon.webp", eyebrow: "EL DETALLE", title: "Materiales\nde alta gama", description: "Una selección de acabados concebida para envejecer con belleza.", align: "left" },
];
