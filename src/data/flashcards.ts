import { FlashcardItem } from '../types/game';

/**
 * Resumen didáctico oficial para la capacitación de Ventas por WhatsApp
 * Exclusivamente basado en Diapositivas 3 a 10:
 * (Diapositivas 1, 2, 11, 12, 13 y 14 omitidas según requerimiento)
 */

export const FLASHCARDS: FlashcardItem[] = [
  {
    id: 'slide-3',
    slideNumber: 3,
    title: 'La Evolución de la Comunicación',
    subtitle: 'Del correo formal a la inmediatez transaccional móvil',
    badge: 'Canales Comerciales',
    color: 'amber',
    bullets: [
      'Correo Electrónico: Formal pero asíncrono. Alta fricción y ciclos lentos.',
      'Mensaje SMS: Inmediatez total sin contexto. Fuerte limitación multimedia.',
      'Chat Escritorio: Comunicación sincrónica pero anclada forzosamente a una PC.',
      'WhatsApp Business: Transaccional, multimedia y móvil. Fricción comercial cero.'
    ],
    keyTakeaway: 'WhatsApp Business elimina las barreras de compra al combinar movilidad, soporte multimedia y transaccionalidad sin fricción.'
  },
  {
    id: 'slide-4',
    slideNumber: 4,
    title: 'El Ecosistema',
    subtitle: 'De red social personal a máquina de conversión comercial',
    badge: 'Impacto Comercial',
    color: 'teal',
    bullets: [
      'Evolución: De red social personal a la principal herramienta de cierre de ventas B2B y B2C.',
      '90% de Tasa de Apertura constante frente a canales tradicionales.',
      'Canal directo a la mano y bolsillo del tomador de decisiones.'
    ],
    keyTakeaway: 'Con un 90% de tasa de apertura, ningún otro medio logra la atención inmediata que ofrece WhatsApp en B2B y B2C.'
  },
  {
    id: 'slide-5',
    slideNumber: 5,
    title: 'Políticas de Meta',
    subtitle: 'Normas indispensables para operar sin riesgo de bloqueo',
    badge: 'Normativa & Compliance',
    color: 'red',
    bullets: [
      'Regla de 24 Horas: Ventana estricta de atención al cliente sin requerir plantillas.',
      'Consentimiento (Opt-in): Requisito indispensable para cualquier envío promocional saliente.',
      'Filtros de Comercio: Prohibición estricta de promesas falsas o spam masivo.'
    ],
    keyTakeaway: 'Atender dentro de las 24 horas y contar con Opt-in explícito protege la línea comercial y genera confianza en el prospecto.'
  },
  {
    id: 'slide-6',
    slideNumber: 6,
    title: 'Tiempos de Respuesta (SLA) & Etiquetado',
    subtitle: 'La era de la inmediatez y el orden comercial',
    badge: 'Operación & SLAs',
    color: 'cyan',
    bullets: [
      'Tiempo de Contacto: Inferior a 5 minutos (estándar de oro).',
      'Etiquetado Obligatorio: Todos los contactos deben estar clasificados con etiquetas:',
      'Las 6 etiquetas oficiales: Clínica, Hospital, Revendedor, Mayorista, Consumidor final, Especialidad.'
    ],
    keyTakeaway: 'Contactar en menos de 5 minutos y etiquetar correctamente el perfil del comprador es el factor #1 de conversión.'
  },
  {
    id: 'slide-7',
    slideNumber: 7,
    title: 'Capacitación Práctica Leadsales',
    subtitle: 'CRM multiagente con IA integrada para WhatsApp',
    badge: 'Tecnología CRM',
    color: 'purple',
    bullets: [
      'Embudo visual de prospectos (Columnas: Contacto inicial, A sus pies, Servicios profesionales, etc.).',
      'Resumen de Conversación con IA: Estado actual, Puntos clave y Próximos pasos.',
      'Atributos de contacto, Notas internas (solo visibles para agentes) y Mensajes programados.'
    ],
    keyTakeaway: 'Leadsales organiza el flujo de trabajo en equipo, documenta antecedentes con IA y evita que se pierda ningún prospecto.'
  },
  {
    id: 'slide-8',
    slideNumber: 8,
    title: 'El Funnel Conversacional',
    subtitle: 'Las 4 etapas ordenadas para cerrar ventas',
    badge: 'Embudo de Ventas',
    color: 'indigo',
    bullets: [
      '1. Atracción: Mensaje de bienvenida y perfilamiento inicial.',
      '2. Consideración: Envío de fichas técnicas y nutrición del lead.',
      '3. Decisión: Cotización formal y enlace directo de pago.',
      '4. Retención: Seguimiento programado mediante sistema de etiquetas.'
    ],
    keyTakeaway: 'Respeta el orden del embudo: no intentes cerrar o cobrar en el saludo sin haber perfilado y nutrido al cliente.'
  },
  {
    id: 'slide-9',
    slideNumber: 9,
    title: 'Matriz de Temperatura (Triage)',
    subtitle: 'Priorización quirúrgica de prospectos según intención',
    badge: 'Triage de Leads',
    color: 'amber',
    bullets: [
      'Lead Frío ❄️: Solo solicita "info" general. Intención de compra baja o nula.',
      'Lead Tibio ☕: Pregunta por especificaciones de un modelo en particular.',
      'Lead Caliente 🔥: Solicita cotización formal, tiempo de entrega, disponibilidad o enlace de pago.'
    ],
    keyTakeaway: 'Da prioridad inmediata y cierre al Lead Caliente, y nutre al Lead Tibio con fichas técnicas para elevar su temperatura.'
  },
  {
    id: 'slide-10',
    slideNumber: 10,
    title: 'Calificación BANT en Chat',
    subtitle: 'Las 4 preguntas clave para validar la oportunidad',
    badge: 'Metodología BANT',
    color: 'emerald',
    bullets: [
      'B - Presupuesto (Budget): ¿La capacidad de inversión está alineada?',
      'A - Autoridad (Authority): ¿Interactuamos con el tomador de decisión?',
      'N - Necesidad (Need): ¿Existe un problema real a resolver hoy?',
      'T - Tiempo (Time): ¿Cuál es la urgencia real de la compra?'
    ],
    keyTakeaway: 'BANT te permite saber en minutos si vale la pena invertir tiempo en una cotización o si debes reorientar la conversación.'
  }
];
