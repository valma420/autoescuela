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
    schedule: 'Lunes a viernes, de 9 a 18 h',
    instagram: {
      handle: '@akdemia.autoescuela',
      url: 'https://www.instagram.com/akdemia.autoescuela',
    },
  },

  assets: {
    logo: '/images/logo-akdemia-autoescuela.png',
    heroImage: '/images/hero-driving.jpg',
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
  eyebrow: 'Villa Urquiza · CABA',
  title: 'Aprendé a manejar en Villa Urquiza',
  subtitle:
    'Clases de manejo para principiantes, a tu ritmo y con paciencia. Sacá la confianza que necesitás al volante con clases prácticas adaptadas a vos.',
  primaryCta: 'Reservar por WhatsApp',
  secondaryCta: 'Ver servicios',
  // Puntos de confianza que aparecen bajo el CTA.
  highlights: [
    'Auto con doble comando',
    'Profesor paciente',
    'Horarios flexibles',
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
  role: 'Instructor de manejo matriculado',
  photo: '/images/driver-profile.jpg',
  bio: [
    'Más de 10 años enseñando a manejar en Villa Urquiza y la zona norte de CABA. Mi prioridad es que manejes seguro y tranquilo, sin apuro y sin presiones.',
    'Trabajo con principiantes que nunca tocaron un volante y también con quienes quieren perder el miedo o prepararse para el examen de licencia.',
  ],
  // Datos rápidos que refuerzan confianza.
  credentials: [
    '+10 años de experiencia',
    'Clases 100% personalizadas',
    'Enfoque en seguridad vial',
  ],
} as const;

// ---------------------------------------------------------------------------
// Servicios / clases
// ---------------------------------------------------------------------------

export interface Service {
  title: string;
  description: string;
  /** Emoji o símbolo simple usado como ícono liviano (sin librerías). */
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    icon: '🚗',
    image: '/images/practice-driving.jpg',
    title: 'Clases para principiantes',
    description:
      'Desde cero y a tu ritmo. Arrancamos con lo básico hasta que manejes con confianza por la ciudad.',
  },
  {
    icon: '🛣️',
    image: '/images/hero-driving.jpg',
    title: 'Clases prácticas',
    description:
      'Práctica real en calle: estacionamiento, avenidas, rotondas y situaciones del tránsito porteño.',
  },
  {
    icon: '📘',
    image: '/images/steering-wheel.jpg',
    title: 'Preparación para el examen',
    description:
      'Te preparamos para el examen práctico de la licencia de conducir de CABA con todo lo que se evalúa.',
  },
  {
    icon: '😌',
    image: '/images/driver-profile.jpg',
    title: 'Clases para perder el miedo',
    description:
      'Si ya sabés algo pero te falta seguridad, retomamos con paciencia hasta que manejes tranquilo.',
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
    icon: '🤝',
    title: 'Trato paciente y cercano',
    description: 'Sin retos ni apuros. Aprendés cómodo y a tu tiempo.',
  },
  {
    icon: '🧰',
    title: 'Auto con doble comando',
    description: 'Manejás seguro desde la primera clase, con freno de apoyo.',
  },
  {
    icon: '🗓️',
    title: 'Horarios flexibles',
    description: 'Coordinamos los días y horarios que mejor te queden.',
  },
  {
    icon: '📍',
    title: 'Te pasamos a buscar',
    description: 'Empezamos la clase desde tu casa en Villa Urquiza y alrededores.',
  },
];

// ---------------------------------------------------------------------------
// Zonas de cobertura
// ---------------------------------------------------------------------------

export const coverage = {
  title: 'Zonas donde damos clases',
  description:
    'Damos clases de manejo en Villa Urquiza y los barrios cercanos de la zona norte de la Ciudad de Buenos Aires.',
  areas: [
    'Villa Urquiza',
    'Villa Pueyrredón',
    'Coghlan',
    'Saavedra',
    'Belgrano',
    'Villa Ortúzar',
    'Parque Chas',
    'Agronomía',
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
  description:
    'Escribinos por WhatsApp y coordinamos tu primera clase de manejo en Villa Urquiza. Sin compromiso.',
  cta: 'Escribir por WhatsApp',
} as const;
