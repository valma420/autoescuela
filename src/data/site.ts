/**
 * Datos centralizados del sitio AKDemia autoescuela.
 *
 * Editá este archivo para cambiar TODOS los textos, contacto, servicios,
 * zonas, testimonios y preguntas frecuentes. Los componentes no tienen
 * contenido hardcodeado: leen siempre desde acá.
 */

// ---------------------------------------------------------------------------
// Negocio y contacto
// ---------------------------------------------------------------------------

/** Teléfono tal como se muestra al usuario (formato local argentino). */
const phoneDisplay = '11 5314-5859';

/** Teléfono en formato internacional E.164 legible (para `telephone` de schema.org). */
const phoneInternational = '+54 9 11 5314-5859';

/** Número para enlaces wa.me: solo dígitos, con código de país (Argentina = 54 9). */
const whatsappNumber = '5491153145859';

/** Mensaje pre-cargado al abrir WhatsApp. */
const whatsappMessage =
  'Hola! Quiero info sobre las clases de manejo en Villa Urquiza.';

export const site = {
  name: 'AKDemia autoescuela',
  shortName: 'AKDemia',
  tagline: 'Escuela de manejo en Villa Urquiza',
  // Texto descriptivo corto, usado en hero y metadata.
  description:
    'Clases de manejo para principiantes en Villa Urquiza, CABA. Aprendé a manejar con un profesor paciente, clases prácticas a tu ritmo y autos con doble comando.',
  url: 'https://akdemiaautoescuela.vercel.app',
  locale: 'es_AR',

  contact: {
    /** Teléfono visible en la web. */
    phoneDisplay,
    /** Teléfono internacional (schema.org / clic-para-llamar). */
    phoneInternational,
    /** Número crudo para wa.me. */
    whatsappNumber,
    whatsappMessage,
    /** Enlace listo para usar en botones de WhatsApp. */
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`,
    schedule: 'Lunes a viernes, de 9 a 19 h',
    instagram: {
      handle: '@akdemia.autoescuela',
      url: 'https://www.instagram.com/akdemia.autoescuela',
    },
  },

  assets: {
    logo: '/images/logo-akdemia-autoescuela.png',
    heroImage: '/images/driving-practice-cones.jpg',
    ctaImage: '/images/steering-wheel.jpg',
  },

  location: {
    // Localidad / zona del barrio.
    area: 'Villa Urquiza',
    // Región: toda la cobertura está dentro de CABA (no Provincia de Buenos Aires).
    region: 'Ciudad Autónoma de Buenos Aires',
    regionShort: 'CABA',
    country: 'Argentina',
    countryCode: 'AR',
    coverageNote: 'Villa Urquiza y alrededores',
    // Coordenadas aproximadas del barrio de Villa Urquiza (para JSON-LD y mapa).
    geo: { lat: -34.5739, lng: -58.4889 },
  },
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: 'CABA',
  title: 'Aprendé a manejar',
  subtitle:
    'Clases prácticas con método y auto de doble comando. Seguridad real al volante, a tu ritmo.',
  primaryCta: 'Agendá tu clase',
  secondaryCta: 'Ver servicios',
  // Puntos de confianza que aparecen bajo el CTA y en el bloque de servicios.
  highlights: [
    '45 min por clase',
    'Caja manual',
    'Clases dobles',
    'A domicilio',
  ],
  mobileHighlights: [
    '45 min por clase',
    'Caja manual',
    'Auto doble comando',
    'A domicilio',
  ],
  stats: [
    { value: '+10', label: 'años de experiencia' },
    { value: '1:1', label: 'clases personalizadas' },
    { value: 'CABA', label: 'zona de práctica' },
  ],
} as const;

// ---------------------------------------------------------------------------
// Sobre el profesor
// ---------------------------------------------------------------------------

export const teacher = {
  name: 'Facundo Massó',
  role: 'Instructor matriculado por el GCBA',
  photo: '/images/driver-profile.jpg',
  bio: [
    'Doy clases particulares en Villa Urquiza y alrededores con un método ordenado: cada clase tiene un objetivo concreto y sabés qué vas a practicar. Así llegás al examen sabiendo exactamente qué hacer.',
  ],
  // Datos rápidos que refuerzan confianza.
  credentials: [
    'Clases 100% personalizadas',
    'Un plan por alumno, clase a clase',
    'Título GCBA en técnicas de conducción',
  ],
  mobileCredentials: [
    'Clases 100% personalizadas',
    'Enfoque en seguridad vial',
    'Título GCBA en técnicas de conducción',
  ],
} as const;

// ---------------------------------------------------------------------------
// Servicios / clases
// ---------------------------------------------------------------------------

export interface Service {
  title: string;
  description: string;
  /** Dato decorativo heredado; los componentes actuales usan numeración visual. */
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    icon: '01',
    image: '/images/practice-driving.jpg',
    title: 'Para principiantes',
    description:
      'Para quienes nunca manejaron. Arrancás de cero, a tu ritmo.',
  },
  {
    icon: '02',
    image: '/images/hero-driving.jpg',
    title: 'Circuito real',
    description:
      'Practicás en el circuito real de la comuna donde vas a rendir.',
  },
  {
    icon: '03',
    image: '/images/driver-profile.jpg',
    title: 'Perder el miedo',
    description:
      'Para quienes ya tienen la licencia pero no se animan a manejar.',
  },
];

// ---------------------------------------------------------------------------
// Beneficios
// ---------------------------------------------------------------------------

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export const benefits: Benefit[] = [
  {
    icon: '01',
    title: 'Método, no improvisación',
    description: 'Un plan por alumno: sabés qué vas a practicar en cada clase.',
  },
  {
    icon: '02',
    title: 'Auto doble comando',
    description: 'Freno de apoyo desde la primera clase. Manejás seguro siempre.',
  },
  {
    icon: '03',
    title: 'Horarios flexibles',
    description: 'Coordinás los días y las horas que mejor te queden.',
  },
  {
    icon: '04',
    title: 'Puerta a puerta',
    description: 'La clase empieza y termina en la puerta de tu casa.',
  },
];

// ---------------------------------------------------------------------------
// Zonas de cobertura
// ---------------------------------------------------------------------------

export const coverage = {
  title: 'Dónde doy clases',
  description:
    'Practicás en las calles donde vas a rendir. Cubrimos Villa Urquiza y alrededores.',
  areas: [
    'Villa Urquiza',
    'Belgrano',
    'Parque Chas',
    'Villa Pueyrredón',
    'Agronomía',
    'Saavedra',
    'Núñez',
  ],
} as const;

// ---------------------------------------------------------------------------
// Licencia de conducir en CABA
// ---------------------------------------------------------------------------

export const licenseInfo = {
  title: 'Tu licencia en CABA',
  description:
    'Lo que tenés que saber para rendir. Te acompañamos con el trámite.',
  items: [
    {
      title: 'Charla de educación vial',
      description:
        'Es obligatoria para tramitar la licencia. Te decimos cómo y dónde hacerla.',
    },
    {
      title: 'Dónde rendís',
      description:
        'Elegís la comuna. Recomendamos la 11 (Devoto), 12 (Villa Urquiza) o 15 (Palermo).',
    },
    {
      title: 'Examen práctico',
      description:
        'Es en calle y únicamente con el vehículo del GCBA.',
    },
    {
      title: 'Requisito',
      description: 'Tener domicilio en CABA en el DNI.',
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Testimonios
// ---------------------------------------------------------------------------

export interface Testimonial {
  name: string;
  text: string;
  /** Contexto corto (ej. barrio o tipo de alumno). */
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sofía R.',
    context: 'Villa Urquiza',
    text: 'Nunca había manejado y en pocas clases ya andaba sola por el barrio. Muchísima paciencia.',
  },
  {
    name: 'Martín G.',
    context: 'Saavedra',
    text: 'Le tenía mucho miedo al volante. Me ayudó a soltarme y hoy manejo tranquilo por la ciudad.',
  },
  {
    name: 'Carla M.',
    context: 'Belgrano',
    text: 'Me preparó para el examen y lo aprobé a la primera. Clases súper claras y prácticas.',
  },
];

// ---------------------------------------------------------------------------
// Preguntas frecuentes
// ---------------------------------------------------------------------------

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: '¿Necesito saber algo previo para empezar?',
    answer:
      'No. Las clases para principiantes arrancan desde cero, aunque nunca hayas tocado un volante.',
  },
  {
    question: '¿El auto tiene doble comando?',
    answer:
      'Sí. Manejás siempre con un auto con doble comando, así estás seguro desde la primera clase.',
  },
  {
    question: '¿En qué zonas dan clases?',
    answer:
      'En Villa Urquiza y los barrios cercanos de la zona norte de CABA. Consultanos por tu zona.',
  },
  {
    question: '¿Me preparan para el examen de la licencia?',
    answer:
      'Sí. Tenemos clases enfocadas en el examen práctico de la licencia de conducir de CABA.',
  },
  {
    question: '¿Cómo coordino una clase?',
    answer:
      'Escribinos por WhatsApp y coordinamos día, horario y punto de encuentro según tu disponibilidad.',
  },
];

// ---------------------------------------------------------------------------
// Llamado a la acción final
// ---------------------------------------------------------------------------

export const contactCta = {
  title: '¿Listo para empezar a manejar?',
  description: 'Escribinos por WhatsApp y coordinamos tu primera clase.',
  cta: 'Agendá tu clase',
  desktopCta: 'Agendá tu clase',
} as const;
