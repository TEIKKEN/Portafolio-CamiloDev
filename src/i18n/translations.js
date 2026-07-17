export const translations = {
  es: {
    nav: {
      links: { hero: 'Inicio', about: 'Sobre mí', projects: 'Proyectos', timeline: 'Trayectoria', contact: 'Contacto' },
      availableForWork: 'Disponible para trabajar',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      toggleLanguage: 'Switch to English',
    },
    hero: {
      titleLine1: 'Creative',
      titleLine2: 'Developer',
      subtitle: 'Diseñando software accesible, de alto rendimiento y con una arquitectura pensada para crecer.',
      viewProjects: 'Ver proyectos',
      contact: 'Contacto',
      scrollCue: 'Bajar a la siguiente sección',
    },
    about: {
      eyebrow: 'About',
      headingPre: 'Quién está ',
      headingAccent: 'detrás',
      bio: 'Hola, soy Camilo Botero, tengo 21 años y actualmente estudio Ingeniería de Software. Me apasiona el desarrollo frontend y disfruto creando experiencias digitales modernas donde la accesibilidad, el rendimiento y una arquitectura bien pensada forman parte del producto desde el primer día. Cada proyecto representa una oportunidad para aprender, resolver problemas reales y construir software de calidad que pueda ser utilizado por cualquier persona.',
      status: 'Open to Work',
      meta: {
        age: { label: 'Edad', value: '21 años' },
        role: { label: 'Rol', value: 'Frontend Developer' },
        study: { label: 'Formación', value: 'Ingeniería de Software' },
        location: { label: 'Ubicación', value: 'Colombia' },
      },
      aiTitle: 'AI-Assisted Development',
      aiText: 'La Inteligencia Artificial forma parte del flujo de desarrollo del proyecto como herramienta de apoyo para planificación, documentación, revisión de código, depuración y optimización. Todas las decisiones de arquitectura, implementación y calidad son evaluadas y validadas por el desarrollador.',
    },
    projects: {
      eyebrow: 'Selected Work',
      headingPre: 'Proyectos que ',
      headingAccent: 'cuentan',
      headingPost: ' una historia',
      viewDemo: 'Ver demo',
      code: 'Código',
      status: { live: 'En producción', wip: 'En desarrollo' },
      items: {
        inclusia: {
          tagline: 'Landing page institucional — 100% accesible',
          description:
            'Sitio para una organización que trabaja por la inclusión y la accesibilidad de personas con discapacidad física en Colombia. Convierte experiencias reales en evidencia, campañas y alianzas para impulsar entornos más dignos.',
          highlight: 'Accesibilidad total',
        },
        brutalcalc: {
          tagline: 'Beautiful by design. Accessible by default.',
          description:
            'Calculadora con estética Neo Brutalist que integra accesibilidad desde el diseño: modos de contraste, tipografía amigable para dislexia, soporte para lectores de pantalla, navegación completa por teclado y un simulador de barreras.',
          highlight: 'Mejor accesibilidad',
        },
        'fallo-del-sistema': {
          tagline: 'Narrativa inmersiva sobre accesibilidad',
          description:
            'Experiencia web interactiva que expone los desafíos de accesibilidad e inclusión en América Latina mediante una narrativa inmersiva inspirada en interfaces de auditoría digital y visualización de sistemas.',
        },
        ajtrucks: {
          tagline: 'Fleet Management',
          description:
            'Aplicación web para la gestión de ingresos, gastos y operaciones de una flota de camiones. Permite registrar movimientos financieros, organizar categorías y obtener una visión clara del estado económico del negocio.',
        },
      },
    },
    timeline: {
      eyebrow: 'Journey',
      headingPre: 'Cómo llegué ',
      headingAccent: 'hasta aquí',
      typeLabel: { experience: 'Experiencia', education: 'Educación', certification: 'Certificación' },
      items: {
        'edu-sena': {
          role: 'Técnico en Programación de Software',
          period: '2020 — 2022',
          description:
            'Formación orientada a fundamentos de programación, desarrollo de aplicaciones, bases de datos, lógica computacional y construcción de software.',
        },
        'exp-freelance': {
          role: 'Frontend Developer',
          period: '2026 — Presente',
          description:
            'Desarrollo aplicaciones web modernas enfocadas en arquitectura frontend, accesibilidad, rendimiento y experiencias interactivas. Cada proyecto es diseñado y construido desde cero con un enfoque en calidad, mantenibilidad y buenas prácticas.',
        },
        'edu-iudigital': {
          role: 'Ingeniería de Software',
          period: '2026 — Presente',
          description:
            'Actualmente cursando Ingeniería de Software, profundizando en arquitectura de software, desarrollo frontend, estructuras de datos, ingeniería de requisitos y construcción de aplicaciones escalables.',
        },
      },
    },
    skills: {
      eyebrow: 'Toolkit',
      headingPre: 'Arquitectura ',
      headingAccent: 'Tecnológica',
      subheading:
        'Las tecnologías que utilizo para construir experiencias accesibles, escalables y orientadas al rendimiento.',
      categories: {
        frontend: {
          description: 'Tecnologías con las que construyo interfaces modernas, mantenibles y escalables.',
        },
        '3d-motion': { description: 'Herramientas para dar profundidad, movimiento y vida a la interfaz.' },
        accessibility: {
          description: 'Principios y técnicas para que cada experiencia sea usable por cualquier persona.',
          secondary: ['Navegación por teclado', 'Lectores de pantalla'],
        },
        workflow: {
          description: 'Flujo de trabajo, control de versiones y herramientas de diseño.',
          groups: {
            desarrollo: 'Desarrollo',
            calidad: 'Calidad',
            diseño: 'Diseño',
            basicas: 'Habilidades básicas',
          },
        },
        'ai-workflow': {
          description:
            'Desarrollo asistido por IA integrado en la planificación, documentación, depuración y revisión de código, manteniendo siempre las buenas prácticas de ingeniería.',
        },
      },
    },
    contact: {
      eyebrow: 'Get in touch',
      headingPre: 'Hablemos de tu ',
      headingAccent: 'próximo proyecto',
      subheading: 'Cuéntame qué estás construyendo — respondo todos los mensajes personalmente.',
      fields: {
        name: { label: 'Nombre', placeholder: 'Tu nombre' },
        email: { label: 'Correo', placeholder: 'tu@correo.com' },
        subject: { label: 'Asunto', placeholder: '¿De qué se trata?' },
        message: { label: 'Mensaje', placeholder: 'Cuéntame los detalles de tu proyecto...' },
      },
      validation: {
        nameMin: 'Tu nombre debe tener al menos 2 caracteres',
        nameMax: 'Máximo 80 caracteres',
        emailRequired: 'El correo es obligatorio',
        emailInvalid: 'Ingresa un correo válido',
        subjectMin: 'Cuéntame brevemente el motivo',
        subjectMax: 'Máximo 120 caracteres',
        messageMin: 'El mensaje debe tener al menos 10 caracteres',
        messageMax: 'Máximo 2000 caracteres',
      },
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      successTitle: 'Mensaje enviado',
      successText: 'Gracias por escribir — te responderé lo antes posible a tu correo.',
      sendAnother: 'Enviar otro mensaje',
      genericError: 'No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.',
      networkError: 'Hubo un problema de conexión. Revisa tu internet e intenta de nuevo.',
      rateLimited: (seconds) => `Demasiados intentos. Intenta de nuevo en ${seconds} segundos.`,
    },
    footer: {
      tagline: 'Diseño y construyo sistemas digitales — no solo interfaces.',
      navTitle: 'Navegación',
      contactTitle: 'Contacto',
      rights: 'Todos los derechos reservados.',
      builtWith: 'Built with React, Three.js & Accessibility First',
    },
  },
  en: {
    nav: {
      links: { hero: 'Home', about: 'About', projects: 'Projects', timeline: 'Timeline', contact: 'Contact' },
      availableForWork: 'Available for work',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      toggleLanguage: 'Cambiar a Español',
    },
    hero: {
      titleLine1: 'Creative',
      titleLine2: 'Developer',
      subtitle: 'Designing accessible, high-performance software with an architecture built to scale.',
      viewProjects: 'View Projects',
      contact: 'Contact',
      scrollCue: 'Scroll to next section',
    },
    about: {
      eyebrow: 'About',
      headingPre: "Who's ",
      headingAccent: 'behind it',
      bio: "Hi, I'm Camilo Botero, I'm 21 years old and currently studying Software Engineering. I'm passionate about frontend development, and I enjoy building modern digital experiences where accessibility, performance, and thoughtful architecture are part of the product from day one. Every project is a chance to learn, solve real problems, and build quality software that anyone can use.",
      status: 'Open to Work',
      meta: {
        age: { label: 'Age', value: '21 years old' },
        role: { label: 'Role', value: 'Frontend Developer' },
        study: { label: 'Studying', value: 'Software Engineering' },
        location: { label: 'Location', value: 'Colombia' },
      },
      aiTitle: 'AI-Assisted Development',
      aiText: "Artificial intelligence is part of this project's development flow as a support tool for planning, documentation, code review, debugging, and optimization. Every architecture, implementation, and quality decision is evaluated and validated by the developer.",
    },
    projects: {
      eyebrow: 'Selected Work',
      headingPre: 'Projects that ',
      headingAccent: 'tell',
      headingPost: ' a story',
      viewDemo: 'View demo',
      code: 'Code',
      status: { live: 'Live', wip: 'In progress' },
      items: {
        inclusia: {
          tagline: 'Institutional landing page — fully accessible',
          description:
            'Site for a nonprofit working toward inclusion and accessibility for people with physical disabilities in Colombia. Turns real experiences into evidence, campaigns, and partnerships that push for more dignified environments.',
          highlight: 'Full accessibility',
        },
        brutalcalc: {
          tagline: 'Beautiful by design. Accessible by default.',
          description:
            'A Neo Brutalist calculator with accessibility built into the design: contrast modes, dyslexia-friendly typography, screen reader support, full keyboard navigation, and a barrier simulator.',
          highlight: 'Best-in-class accessibility',
        },
        'fallo-del-sistema': {
          tagline: 'An immersive narrative on accessibility',
          description:
            'An interactive web experience exposing accessibility and inclusion challenges across Latin America through an immersive narrative inspired by digital audit interfaces and system visualization.',
        },
        ajtrucks: {
          tagline: 'Fleet Management',
          description:
            "A web app for managing income, expenses, and operations for a truck fleet. Lets users log financial movements, organize categories, and get a clear view of the business's financial health.",
        },
      },
    },
    timeline: {
      eyebrow: 'Journey',
      headingPre: 'How I got ',
      headingAccent: 'here',
      typeLabel: { experience: 'Experience', education: 'Education', certification: 'Certification' },
      items: {
        'edu-sena': {
          role: 'Software Programming Technician',
          period: '2020 — 2022',
          description:
            'Training focused on programming fundamentals, application development, databases, computational logic, and software construction.',
        },
        'exp-freelance': {
          role: 'Frontend Developer',
          period: '2026 — Present',
          description:
            'I build modern web applications focused on frontend architecture, accessibility, performance, and interactive experiences. Every project is designed and built from scratch with a focus on quality, maintainability, and best practices.',
        },
        'edu-iudigital': {
          role: 'Software Engineering',
          period: '2026 — Present',
          description:
            'Currently studying Software Engineering, going deeper into software architecture, frontend development, data structures, requirements engineering, and building scalable applications.',
        },
      },
    },
    skills: {
      eyebrow: 'Toolkit',
      headingPre: 'Technical ',
      headingAccent: 'Architecture',
      subheading: 'The technologies I use to build accessible, scalable, and performance-oriented experiences.',
      categories: {
        frontend: { description: 'Technologies I use to build modern, maintainable, scalable interfaces.' },
        '3d-motion': { description: 'Tools that give the interface depth, motion, and life.' },
        accessibility: {
          description: 'Principles and techniques that make every experience usable by anyone.',
          secondary: ['Keyboard navigation', 'Screen readers'],
        },
        workflow: {
          description: 'Workflow, version control, and design tooling.',
          groups: { desarrollo: 'Development', calidad: 'Quality', diseño: 'Design', basicas: 'Core Skills' },
        },
        'ai-workflow': {
          description:
            'AI-assisted development integrated into planning, documentation, debugging and code review while maintaining engineering best practices.',
        },
      },
    },
    contact: {
      eyebrow: 'Get in touch',
      headingPre: "Let's talk about your ",
      headingAccent: 'next project',
      subheading: "Tell me what you're building — I reply to every message personally.",
      fields: {
        name: { label: 'Name', placeholder: 'Your name' },
        email: { label: 'Email', placeholder: 'you@email.com' },
        subject: { label: 'Subject', placeholder: "What's this about?" },
        message: { label: 'Message', placeholder: 'Tell me the details of your project...' },
      },
      validation: {
        nameMin: 'Your name must be at least 2 characters',
        nameMax: 'Maximum 80 characters',
        emailRequired: 'Email is required',
        emailInvalid: 'Enter a valid email',
        subjectMin: 'Give me a brief idea of what this is about',
        subjectMax: 'Maximum 120 characters',
        messageMin: 'Your message must be at least 10 characters',
        messageMax: 'Maximum 2000 characters',
      },
      submit: 'Send message',
      submitting: 'Sending...',
      successTitle: 'Message sent',
      successText: "Thanks for writing — I'll get back to you at your email as soon as possible.",
      sendAnother: 'Send another message',
      genericError: 'Could not send the message. Please try again in a few minutes.',
      networkError: 'There was a connection problem. Check your internet and try again.',
      rateLimited: (seconds) => `Too many attempts. Try again in ${seconds} seconds.`,
    },
    footer: {
      tagline: 'I design and build digital systems — not just interfaces.',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      builtWith: 'Built with React, Three.js & Accessibility First',
    },
  },
};