import { Question } from '../types/game';

/**
 * Banco oficial de preguntas para la capacitación comercial
 * Exclusivamente basado en Diapositivas 3 a 10:
 * - Diapositiva 3: La evolución de la comunicación
 * - Diapositiva 4: El ecosistema (90% apertura, B2B/B2C)
 * - Diapositiva 5: Políticas de Meta (24h, Opt-in, Filtros de Comercio)
 * - Diapositiva 6: Tiempos respuesta (SLA < 5 min y 6 etiquetas obligatorias)
 * - Diapositiva 7: Capacitación práctica Leadsales (CRM, IA, notas, funnel)
 * - Diapositiva 8: El Funnel Conversacional (Atracción, Consideración, Decisión, Retención)
 * - Diapositiva 9: Matriz de temperatura / Triage (Lead Frío, Tibio, Caliente)
 * - Diapositiva 10: Calificación BANT en Chat (Budget, Authority, Need, Time)
 *
 * (Omitidas: Diapositivas 1, 2, 11, 12, 13 y 14)
 */

export const ALL_QUESTIONS: Question[] = [
  // ==========================================
  // DIAPOSITIVA 3: LA EVOLUCIÓN DE LA COMUNICACIÓN
  // ==========================================
  {
    id: 'evo-1',
    slideSource: 'Diapositiva 3: La evolución de la comunicación',
    category: 'evolucion',
    categoryLabel: 'Evolución del Canal',
    question: 'Según la capacitación, ¿cuál es la gran ventaja de WhatsApp Business frente a los canales anteriores?',
    options: [
      { id: 'opt1', text: 'Transaccional, multimedia y móvil con fricción comercial cero', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Es un canal formal asíncrono con ciclos lentos de cierre', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Brinda inmediatez pero sin contexto ni soporte multimedia', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Requiere estar forzosamente anclado a una computadora de escritorio', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'WhatsApp Business revoluciona las ventas al ser transaccional, multimedia, 100% móvil y con fricción comercial cero.',
    timeLimitSeconds: 20,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'evo-2',
    slideSource: 'Diapositiva 3: La evolución de la comunicación',
    category: 'evolucion',
    categoryLabel: 'Evolución del Canal',
    question: '¿Qué limitación crítica tiene el Correo Electrónico identificada en la presentación?',
    options: [
      { id: 'opt1', text: 'Alta fricción y ciclos lentos por ser asíncrono', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'No permite cotizar productos de más de $10,000', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Exige responder en menos de 5 minutos por normativa', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'No permite adjuntar archivos PDF ni imágenes', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El correo electrónico es formal pero asíncrono, lo que genera fricción elevada y alarga innecesariamente los ciclos de venta.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'evo-3',
    slideSource: 'Diapositiva 3: La evolución de la comunicación',
    category: 'evolucion',
    categoryLabel: 'Evolución del Canal',
    question: '¿Cuál es la desventaja del Mensaje SMS comparado con WhatsApp Business?',
    options: [
      { id: 'opt1', text: 'Inmediatez total sin contexto y fuerte limitación multimedia', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Obliga a estar conectado a una PC de oficina', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Tiene ciclos de respuesta de más de 48 horas', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'No permite clasificar con etiquetas de cliente', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El SMS ofrece inmediatez pero carece de contexto conversacional y tiene una fuerte limitación multimedia.',
    timeLimitSeconds: 15,
    difficulty: 'medio',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 4: EL ECOSISTEMA
  // ==========================================
  {
    id: 'eco-1',
    slideSource: 'Diapositiva 4: El ecosistema',
    category: 'evolucion',
    categoryLabel: 'Ecosistema WhatsApp',
    question: '¿Qué porcentaje constante de tasa de apertura registra WhatsApp frente a canales tradicionales?',
    options: [
      { id: 'opt1', text: '90%', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: '45%', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: '60%', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: '75%', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'WhatsApp mantiene una impresionante tasa de apertura del 90%, superando por mucho al correo o canales tradicionales.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'eco-2',
    slideSource: 'Diapositiva 4: El ecosistema',
    category: 'evolucion',
    categoryLabel: 'Ecosistema WhatsApp',
    question: '¿Cómo define la capacitación el cambio de paradigma de WhatsApp en el ecosistema digital?',
    options: [
      { id: 'opt1', text: 'De red social personal a principal herramienta de cierre de ventas B2B y B2C', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'De canal corporativo formal a red exclusiva para quejas y reclamos', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'De aplicación móvil a software exclusivo para computadoras de escritorio', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'De herramienta de venta directa a plataforma pasiva de folletos', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'WhatsApp pasó de ser una red social personal para convertirse en la principal herramienta de cierre comercial B2B y B2C.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 5: POLÍTICAS DE META
  // ==========================================
  {
    id: 'meta-1',
    slideSource: 'Diapositiva 5: Políticas de Meta',
    category: 'politicas_meta',
    categoryLabel: 'Políticas de Meta',
    question: '¿En qué consiste exactamente la "Regla de 24 Horas" de Meta en WhatsApp?',
    options: [
      { id: 'opt1', text: 'Ventana estricta de atención al cliente sin requerir plantillas', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Plazo límite que tiene el comprador para realizar su transferencia', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Tiempo que dura la validez de una cotización en Leadsales', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Límite de 24 mensajes que un asesor comercial puede enviar al día', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'La Regla de 24 Horas otorga una ventana estricta de atención directa al cliente donde el asesor puede responder sin necesidad de usar plantillas oficiales.',
    timeLimitSeconds: 20,
    difficulty: 'medio',
    points: 1000
  },
  {
    id: 'meta-2',
    slideSource: 'Diapositiva 5: Políticas de Meta',
    category: 'politicas_meta',
    categoryLabel: 'Políticas de Meta',
    question: '¿Cuál es el requisito indispensable exigido por Meta para realizar envíos promocionales salientes?',
    options: [
      { id: 'opt1', text: 'Consentimiento explícito del usuario (Opt-in)', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Que el cliente pertenezca a la etiqueta Mayorista u Hospital', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Haber realizado una llamada telefónica previa de abordaje', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Contar con una cuenta bancaria empresarial verificada', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El consentimiento previo (Opt-in) es el requisito obligatorio que exige Meta para poder enviar comunicaciones comerciales salientes.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'meta-3',
    slideSource: 'Diapositiva 5: Políticas de Meta',
    category: 'politicas_meta',
    categoryLabel: 'Políticas de Meta',
    question: '¿Qué conducta comercial está terminantemente prohibida por los "Filtros de Comercio" de Meta?',
    options: [
      { id: 'opt1', text: 'Promesas falsas, prácticas engañosas o spam masivo', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Enviar cotizaciones formales con enlace de pago', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Responder a prospectos en menos de 5 minutos', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Utilizar el CRM Leadsales para gestionar prospectos', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'Los Filtros de Comercio prohíben de forma tajante el envío de spam masivo y cualquier promesa falsa o engañosa.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 6: TIEMPOS DE RESPUESTA (SLA) & ETIQUETADO
  // ==========================================
  {
    id: 'sla-1',
    slideSource: 'Diapositiva 6: Tiempos respuesta (SLA)',
    category: 'sla_etiquetado',
    categoryLabel: 'SLA de Respuesta',
    question: 'En la era de la inmediatez, ¿cuál es el SLA máximo fijado para el "Tiempo de contacto"?',
    options: [
      { id: 'opt1', text: 'Inferior a 5 minutos', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Inferior a 1 hora', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Dentro del mismo día hábil (24h)', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Inferior a 30 minutos', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El estándar de oro en WhatsApp es atender al prospecto en menos de 5 minutos: la velocidad de respuesta dispara la tasa de conversión.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'sla-2',
    slideSource: 'Diapositiva 6: Tiempos respuesta (SLA)',
    category: 'sla_etiquetado',
    categoryLabel: 'Etiquetado Obligatorio',
    question: 'Según la diapositiva 6, ¿cuáles son las etiquetas exactas con las que deben clasificarse TODOS los contactos?',
    options: [
      { id: 'opt1', text: 'Clínica, Hospital, Revendedor, Mayorista, Consumidor final, Especialidad', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Urgente, Normal, Dudoso, Descartado, Sin interés, Bloqueado', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'B2B, B2C, Gobierno, ONG, Particular, VIP', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Contestado, No contesta, Pendiente de llamada, Pagado', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'Las etiquetas oficiales de segmentación son 6: Clínica, Hospital, Revendedor, Mayorista, Consumidor final y Especialidad.',
    timeLimitSeconds: 20,
    difficulty: 'medio',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 7: CAPACITACIÓN PRÁCTICA LEADSALES
  // ==========================================
  {
    id: 'crm-1',
    slideSource: 'Diapositiva 7: Capacitación práctica Leadsales',
    category: 'crm_leadsales',
    categoryLabel: 'CRM Leadsales',
    question: 'En Leadsales, ¿qué módulos compone el resumen inteligente generado por IA para cada conversación?',
    options: [
      { id: 'opt1', text: 'Estado actual, Puntos clave y Próximos pasos', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Número de cuenta, RFC y saldo bancario del cliente', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'IP de conexión, modelo de smartphone y operador celular', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Plantillas rechazadas por Meta y tiempo de desconexión', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'Leadsales AI genera un resumen ejecutivo con: 1) Estado actual, 2) Puntos clave de la charla y 3) Próximos pasos comerciales.',
    timeLimitSeconds: 20,
    difficulty: 'medio',
    points: 1000
  },
  {
    id: 'crm-2',
    slideSource: 'Diapositiva 7: Capacitación práctica Leadsales',
    category: 'crm_leadsales',
    categoryLabel: 'CRM Leadsales',
    question: '¿Para qué sirve la sección de "Notas" en el panel lateral de Leadsales?',
    options: [
      { id: 'opt1', text: 'Para registrar anotaciones internas del cliente sólo visibles para agentes', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Para publicar historias promocionales públicas en WhatsApp Web', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Para enviar quejas automáticas al soporte de Meta', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Para sustituir el uso de enlaces de pago bancarios', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'Las notas internas permiten al equipo comercial compartir antecedentes y detalles clave del prospecto sin que este los vea.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'crm-3',
    slideSource: 'Diapositiva 7: Capacitación práctica Leadsales',
    category: 'crm_leadsales',
    categoryLabel: 'CRM Leadsales',
    question: '¿Qué columnas o etapas iniciales de prospección se observan en la vista de Leadsales de la capacitación?',
    options: [
      { id: 'opt1', text: 'Contacto inicial, A sus pies, Servicios profesionales, etc.', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Bandeja de entrada personal, Spam, Basura y Archivo', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Cotización vencida, Clientes morosos y Prospectos bloqueados', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Venta cerrada únicamente sin etapas intermedias', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'En Leadsales, los prospectos se organizan en columnas tipo embudo Kanban (Contacto inicial, A sus pies, Servicios profesionales, etc.).',
    timeLimitSeconds: 15,
    difficulty: 'medio',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 8: EL FUNNEL CONVERSACIONAL
  // ==========================================
  {
    id: 'funnel-1',
    slideSource: 'Diapositiva 8: El Funnel Conversacional',
    category: 'funnel_conversacional',
    categoryLabel: 'Funnel Conversacional',
    question: '¿Cuáles son las 4 etapas consecutivas del Funnel Conversacional?',
    options: [
      { id: 'opt1', text: '1. Atracción -> 2. Consideración -> 3. Decisión -> 4. Retención', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: '1. Decisión -> 2. Consideración -> 3. Atracción -> 4. Retención', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: '1. Consideración -> 2. Atracción -> 3. Retención -> 4. Decisión', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: '1. Retención -> 2. Atracción -> 3. Consideración -> 4. Decisión', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El embudo conversacional se estructura rigurosamente en: 1. Atracción, 2. Consideración, 3. Decisión y 4. Retención.',
    timeLimitSeconds: 20,
    difficulty: 'medio',
    points: 1000
  },
  {
    id: 'funnel-2',
    slideSource: 'Diapositiva 8: El Funnel Conversacional',
    category: 'funnel_conversacional',
    categoryLabel: 'Funnel Conversacional',
    question: '¿Qué acciones específicas corresponden a la etapa de "1. Atracción"?',
    options: [
      { id: 'opt1', text: 'Mensaje de bienvenida y perfilamiento inicial', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Envío de cotización formal y enlace directo de pago', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Envío de fichas técnicas y nutrición intensiva del lead', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Seguimiento programado recurrente con etiquetas', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'La etapa de Atracción se enfoca en dar la bienvenida al cliente y realizar el perfilamiento inicial para conocer su necesidad.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'funnel-3',
    slideSource: 'Diapositiva 8: El Funnel Conversacional',
    category: 'funnel_conversacional',
    categoryLabel: 'Funnel Conversacional',
    question: 'En la etapa de "2. Consideración", ¿cuál es el objetivo central?',
    options: [
      { id: 'opt1', text: 'Envío de fichas técnicas y nutrición del lead', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Cobro inmediato por adelantado mediante enlace bancario', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Descartar al prospecto si no compra en menos de 5 minutos', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Pedirle al cliente que nos envíe un correo formal', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'En Consideración se nutre al prospecto y se le proporcionan fichas técnicas y especificaciones de producto para resolver dudas.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'funnel-4',
    slideSource: 'Diapositiva 8: El Funnel Conversacional',
    category: 'funnel_conversacional',
    categoryLabel: 'Funnel Conversacional',
    question: '¿Qué dos elementos clave componen la etapa de "3. Decisión"?',
    options: [
      { id: 'opt1', text: 'Cotización formal y enlace directo de pago', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Mensaje de saludo genérico y preguntas de BANT', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Envío de encuestas de satisfacción de compra', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Etiquetado del cliente como hospital o clínica', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'En la etapa de Decisión se formaliza la propuesta mediante una cotización formal y se facilita el cierre con el enlace directo de pago.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 9: MATRIZ DE TEMPERATURA (TRIAGE)
  // ==========================================
  {
    id: 'temp-1',
    slideSource: 'Diapositiva 9: Matriz de temperatura (Triage)',
    category: 'triage_temperatura',
    categoryLabel: 'Triage de Leads',
    question: 'Un prospecto pregunta: "¿Tienen entrega de 5 sillas de ruedas para mañana en Guadalajara y aceptan tarjeta?". ¿Qué temperatura tiene?',
    options: [
      { id: 'opt1', text: 'Lead Caliente 🔥 (Pide cotización, disponibilidad o enlace de pago)', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Lead Frío ❄️ (Intención baja o nula)', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Lead Tibio ☕ (Solo pregunta especificaciones técnicas generales)', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Lead Descartado por Meta', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El Lead Caliente solicita cotización formal, tiempos de entrega, disponibilidad inmediata o enlace de pago directo.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'temp-2',
    slideSource: 'Diapositiva 9: Matriz de temperatura (Triage)',
    category: 'triage_temperatura',
    categoryLabel: 'Triage de Leads',
    question: '¿Qué caracteriza exactamente a un "Lead Frío ❄️" en el triage conversacional?',
    options: [
      { id: 'opt1', text: 'Solo solicita "info" general y su intención de compra es baja o nula', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Pregunta detalladamente por las especificaciones de un modelo en particular', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Exige el enlace de pago con entrega en menos de 24 horas', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Pide factura antes de conocer el precio', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El Lead Frío solo escribe un "info" genérico y presenta intención de compra baja o nula.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'temp-3',
    slideSource: 'Diapositiva 9: Matriz de temperatura (Triage)',
    category: 'triage_temperatura',
    categoryLabel: 'Triage de Leads',
    question: 'Un cliente escribe: "¿Qué dimensiones y peso soporta la camilla modelo Eco-Pro?". ¿Cómo lo clasificas?',
    options: [
      { id: 'opt1', text: 'Lead Tibio ☕ (Pregunta por especificaciones de un modelo en particular)', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'Lead Caliente 🔥 (Listo para realizar el depósito ya)', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Lead Frío ❄️ (Sin ninguna intención de compra)', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'Contacto de spam masivo', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'El Lead Tibio muestra interés concreto al preguntar por especificaciones y características de un modelo en particular.',
    timeLimitSeconds: 15,
    difficulty: 'medio',
    points: 1000
  },

  // ==========================================
  // DIAPOSITIVA 10: CALIFICACIÓN BANT EN CHAT
  // ==========================================
  {
    id: 'bant-1',
    slideSource: 'Diapositiva 10: Calificación BANT en Chat',
    category: 'metodo_bant',
    categoryLabel: 'Metodología BANT',
    question: 'En BANT, ¿qué valida la letra "B" (Budget / Presupuesto)?',
    options: [
      { id: 'opt1', text: '¿La capacidad de inversión está alineada?', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: '¿Interactuamos con el tomador de decisión?', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: '¿Existe un problema real a resolver hoy?', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: '¿Cuál es la urgencia real de la compra?', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'B corresponde a Budget (Presupuesto) y valida si la capacidad de inversión económica del prospecto está alineada con nuestra oferta.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'bant-2',
    slideSource: 'Diapositiva 10: Calificación BANT en Chat',
    category: 'metodo_bant',
    categoryLabel: 'Metodología BANT',
    question: 'Cuando preguntamos al contacto: "¿Usted toma directamente la decisión de compra o evalúa el comité médico?", estamos validando:',
    options: [
      { id: 'opt1', text: 'A - Autoridad (Authority)', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'N - Necesidad (Need)', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'B - Presupuesto (Budget)', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'T - Tiempo (Time)', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'La Autoridad (A) corrobora si estamos interactuando directamente con la persona que tiene el poder de decisión.',
    timeLimitSeconds: 15,
    difficulty: 'medio',
    points: 1000
  },
  {
    id: 'bant-3',
    slideSource: 'Diapositiva 10: Calificación BANT en Chat',
    category: 'metodo_bant',
    categoryLabel: 'Metodología BANT',
    question: '¿Qué pregunta clave define la "N" (Need / Necesidad) en la metodología BANT?',
    options: [
      { id: 'opt1', text: '¿Existe un problema real a resolver hoy?', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: '¿Cuántos agentes de Leadsales tiene el cliente?', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: '¿Cuál es la ventana de 24 horas de Meta?', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: '¿Requiere factura con entrega a domicilio?', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'Need (Necesidad) corrobora si el cliente experimenta un dolor o problema concreto y tangible que nuestro producto pueda solucionar.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  },
  {
    id: 'bant-4',
    slideSource: 'Diapositiva 10: Calificación BANT en Chat',
    category: 'metodo_bant',
    categoryLabel: 'Metodología BANT',
    question: '¿Qué dimensión evalúa la letra "T" (Time / Tiempo) en la cualificación conversacional?',
    options: [
      { id: 'opt1', text: '¿Cuál es la urgencia real de la compra?', isCorrect: true, shape: 'triangle', color: 'red' },
      { id: 'opt2', text: 'El tiempo que tarda el camión de reparto en llegar', isCorrect: false, shape: 'diamond', color: 'blue' },
      { id: 'opt3', text: 'Los minutos que el asesor pasa redactando notas en Leadsales', isCorrect: false, shape: 'circle', color: 'yellow' },
      { id: 'opt4', text: 'La caducidad de la sesión de WhatsApp Web', isCorrect: false, shape: 'square', color: 'green' }
    ],
    explanation: 'Time (Tiempo) evalúa el horizonte temporal y la urgencia de adquisición del prospecto para priorizar su atención.',
    timeLimitSeconds: 15,
    difficulty: 'fácil',
    points: 1000
  }
];

export const GAME_PRESETS = [
  {
    id: 'full_tournament',
    title: '🏆 Gran Torneo de Ventas WhatsApp',
    subtitle: '18 preguntas de las Diapositivas 3 a 10 (Evolución, Políticas, SLA, Funnel, Triage y BANT)',
    badge: 'Completo',
    duration: '~6 min',
    questionCount: 18,
    filter: () => true
  },
  {
    id: 'speed_meta_sla',
    title: '⚡ SLA de Respuesta & Políticas de Meta',
    subtitle: 'Regla 24h, tiempos < 5 min, Opt-in, filtros y las 6 etiquetas obligatorias (Diapos 5 y 6)',
    badge: 'Normativa',
    duration: '~3 min',
    questionCount: 5,
    filter: (q: Question) => q.category === 'politicas_meta' || q.category === 'sla_etiquetado'
  },
  {
    id: 'triage_bant',
    title: '🎯 Simulador: Triage y Calificación BANT',
    subtitle: 'Identifica leads fríos, tibios, calientes y valida Budget, Authority, Need, Time (Diapos 9 y 10)',
    badge: 'Práctico',
    duration: '~4 min',
    questionCount: 7,
    filter: (q: Question) => q.category === 'triage_temperatura' || q.category === 'metodo_bant'
  },
  {
    id: 'funnel_leadsales',
    title: '📊 Funnel Conversacional & CRM Leadsales',
    subtitle: 'Las 4 fases del embudo (Atracción a Retención) y herramientas de Leadsales AI (Diapos 7 y 8)',
    badge: 'Procesos',
    duration: '~3 min',
    questionCount: 7,
    filter: (q: Question) => q.category === 'funnel_conversacional' || q.category === 'crm_leadsales'
  }
];

export const VIRTUAL_BOTS = [
  { name: 'Ximena E.', avatar: '👩‍💼', speedBias: 0.85, accuracyBias: 0.9 },
  { name: 'Paola C.', avatar: '🧑‍💻', speedBias: 0.75, accuracyBias: 0.85 },
  { name: 'Daniel V.', avatar: '👨‍💼', speedBias: 0.65, accuracyBias: 0.75 },
  { name: 'Fabiola M.', avatar: '👩‍⚕️', speedBias: 0.7, accuracyBias: 0.8 },
  { name: 'Ana Sandoval', avatar: '🌟', speedBias: 0.6, accuracyBias: 0.7 }
];
