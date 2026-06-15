// =======================
// MENÚ HAMBURGUESA
// =======================
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  document.querySelectorAll('#menu a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

// =======================
// SLIDER AUTOMÁTICO
// =======================
document.querySelectorAll('.slider').forEach((slider) => {
  const slides = slider.querySelectorAll('.slide');
  if (slides.length === 0) {
    return;
  }

  let index = 0;
  slides[index].classList.add('active');

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 3000);
});

// =======================
// BOTÓN "VER MÁS"
// =======================
document.querySelectorAll('.ver-mas').forEach((button) => {
  button.addEventListener('click', function () {
    const card = this.closest('.card');
    if (!card) {
      return;
    }

    card.classList.toggle('active');
    this.textContent = card.classList.contains('active') ? 'Ver menos' : 'Ver más';
  });
});

console.log('Queen Studio Website Loaded ✅');

// =========================
// CARRUSEL AUTOMÁTICO DE SERVICIOS
// =========================
function crearCarrusel(idSlider, carpeta, total) {
  const slider = document.getElementById(idSlider);
  if (!slider) {
    return;
  }

  slider.innerHTML = '';

  for (let imageIndex = 1; imageIndex <= total; imageIndex += 1) {
    const image = document.createElement('img');
    image.src = `${carpeta}${imageIndex}.jpeg`;
    image.classList.add('slide');
    image.alt = `Imagen ${imageIndex}`;
    image.onerror = () => image.remove();
    slider.appendChild(image);
  }

  window.addEventListener('load', () => {
    const slides = slider.querySelectorAll('.slide');
    if (slides.length === 0) {
      return;
    }

    let current = 0;
    slides[current].classList.add('active');

    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3000);
  });
}

crearCarrusel('slider-unas', 'imagenes/1. Uñas/', 38);
crearCarrusel('slider-pestanas', 'imagenes/6. Pestañas Cejas/', 27);
crearCarrusel('slider-disenocolor', 'imagenes/3. Mechas/', 20);
crearCarrusel('slider-alisado', 'imagenes/2. Alaciados/', 32);
crearCarrusel('slider-permanente', 'imagenes/4. Permanentes/', 6);
crearCarrusel('slider-maquillaje', 'imagenes/5. maquillaje y peinado/', 19);

// =========================
// CONFIGURACIÓN DE AGENDA
// =========================
const STORAGE_KEY = 'citas';
const SLOT_STEP_MINUTES = 30;
const DAYS_TO_RENDER = 30;
const CALENDAR_MONTHS_AHEAD = 12;

let calendarMonthOffset = 0;

const WORKING_HOURS = {
  1: { start: '08:30', end: '17:00' },
  2: { start: '08:30', end: '17:00' },
  3: { start: '08:30', end: '17:00' },
  4: { start: '08:30', end: '17:00' },
  5: { start: '08:30', end: '17:00' },
  6: { start: '10:00', end: '17:00' },
};

const SERVICE_DEFINITIONS = {
  pestanas_cejas: {
    label: 'Pestañas y Cejas',
    note: 'Selecciona uno o varios servicios. La duración final se calcula automáticamente.',
    requiresSelection: true,
    groups: [
      {
        title: 'Pestañas',
        type: 'checkbox',
        items: [
          {
            key: 'pestanas',
            label: 'Pestañas',
            duration: 210,
            description: 'Tiempo requerido de 3:30 horas.',
          },
        ],
      },
      {
        title: 'Cejas',
        type: 'checkbox',
        items: [
          {
            key: 'cejas_paquete',
            label: 'Paquete vidajismo depilación lámina y HD ceja 4K',
            duration: 120,
            description: 'Dura 2 horas.',
          },
          {
            key: 'cejas_laminado',
            label: 'Cejas laminado',
            duration: 60,
            description: 'Dura 1 hora.',
          },
          {
            key: 'cejas_depilacion',
            label: 'Depilación de ceja',
            duration: 30,
            description: 'Dura 30 minutos.',
          },
          {
            key: 'cejas_hd',
            label: 'Pigmento HD ceja',
            duration: 60,
            description: 'Dura 1 hora.',
          },
        ],
      },
    ],
  },
  diseno_color: {
    label: 'Diseño de Color',
    fixedDuration: 480,
    durationText: '8 a 12 horas',
    note:
      'Se necesita disponibilidad de tiempo ya que el cabello puede o no decolorar rápido. Está en un rango de 8 horas a 12 horas y para mejor atención es mejor contactarnos por WhatsApp.',
    requireAcceptance: true,
    busyDayOnly: true,
  },
  alisados_tratamientos: {
    label: 'Alisados, Alaciados y Tratamientos',
    note: 'Selecciona uno o varios servicios. La duración final se calcula automáticamente.',
    requiresSelection: true,
    groups: [
      {
        title: 'Alisados',
        type: 'checkbox',
        items: [
          {
            key: 'ultra_gold',
            label: 'Alisado Ultra Gold',
            duration: 240,
            description: 'Duración estimada de 4 horas.',
          },
          {
            key: 'japones',
            label: 'Alisado japonés',
            duration: 240,
            description: 'Duración estimada de 4 horas.',
          },
          {
            key: 'extreme',
            label: 'Alisado Extreme',
            duration: 240,
            description: 'Duración estimada de 4 horas.',
          },
          {
            key: 'keratina_alisado',
            label: 'Alaciado Keratina',
            duration: 240,
            description: 'Duración estimada de 4 horas.',
          },
          {
            key: 'keratina_brasilena',
            label: 'Alaciado Keratina Brasileña',
            duration: 240,
            description: 'Duración estimada de 4 horas.',
          },
        ],
      },
      {
        title: 'Tratamiento capilar',
        type: 'checkbox',
        items: [
          {
            key: 'botox_premium',
            label: 'Tratamiento Botox Premium',
            duration: 240,
            description: 'Duración estimada de 4 horas. Quita frizz y restaura fibra procesada.',
          },
          {
            key: 'botox_puro',
            label: 'Tratamiento Botox Puro',
            duration: 240,
            description: 'Duración estimada de 4 horas. Restaura fibra dañada por decoloración y tintes.',
          },
        ],
      },
    ],
  },
  base_permanente: {
    label: 'Bases Permanentes',
    fixedDuration: 240,
    note: 'Duración estimada de 4 horas.',
  },
  unas_acrilicas_gelish: {
    label: 'Uñas',
    requiresSelection: true,
    note: 'Considere que en uñas de tip acrilicas o escultural se necesita elegir el tamaño para calcular la duración total, si el tamaño es mayor a 4 se agregará 1 hora adicional al servicio.',
    groups: [
      {
        title: 'Tipo de servicio',
        type: 'radio',
        name: 'unas_tipo_servicio',
        items: [
          {
            key: 'poligel',
            label: 'Poligel',
            duration: 120,
            description: 'Dura 2 horas.',
          },
          {
            key: 'rubber',
            label: 'Rubber',
            duration: 120,
            description: 'Dura 2 horas.',
          },
          {
            key: 'gelish',
            label: 'Gelish',
            duration: 90,
            description: 'Dura 1:30 horas.',
          },
          {
            key: 'softgel',
            label: 'Softgel',
            duration: 180,
            description: 'Dura 3 horas.',
          },
          {
            key: 'escultural',
            label: 'Uña escultural',
            duration: 240,
            description: 'Dura 4 horas.',
          },
          {
            key: 'tip_acrilica',
            label: 'Uña con tip acrílica',
            duration: 180,
            description: 'Dura 3 horas.',
          },
        ],
      },
      {
        title: 'Tamaño de tus uñas',
        type: 'select',
        name: 'unas_tamano',
        dependsOn: ['escultural', 'tip_acrilica'],
        items: [
          { key: '1', label: '1', duration: 0 },
          { key: '2', label: '2', duration: 0 },
          { key: '3', label: '3', duration: 0 },
          { key: '4', label: '4', duration: 60 },
          { key: '5', label: '5', duration: 60 },
          { key: '6', label: '6', duration: 60 },
          { key: '7', label: '7', duration: 60 },
          { key: '8', label: '8', duration: 60 },
          { key: '9', label: '9', duration: 60 },
        ],
      },
    ],
  },

  maquillaje_peinados: {
    label: 'Maquillaje y Peinados',
    requiresSelection: true,
    groups: [
      {
        title: 'Categoría',
        type: 'radio',
        name: 'maquillaje_categoria',
        items: [
          {
            key: 'sociales',
            label: 'Sociales',
            duration: 180,
            specs: ['Cumpleaños', 'Fiesta / evento social', 'Cena especial', 'Salidas importantes', 'Eventos formales', 'XV años (quinceañera o invitada)', 'Bodas (novia, dama, invitada)', 'Graduaciones', 'Bautizos', 'Primera comunión', 'Confirmaciones'],
            description: 'Dura 3 horas.',
          },
          {
            key: 'profesionales',
            label: 'Profesionales',
            duration: 180,
            specs: ['Sesión de fotos', 'Eventos corporativos', 'Conferencias'],
            description: 'Dura 3 horas.',
          },
        ],
      },
    ],
  }
};

const SERVICE_LABELS = Object.fromEntries(
  Object.entries(SERVICE_DEFINITIONS).map(([key, value]) => [key, value.label]),
);

const SERVICE_DURATION_BY_LABEL = {
  'Pestañas y Cejas': 120,
  'Diseño de Color': 480,
  'Alisados, Alaciados y Tratamientos': 240,
  'Bases Permanentes': 240,
  'Uñas': 180,
  'Maquillaje y Peinados': 180,
};

function getCitas() {
  const citasGuardadas = localStorage.getItem(STORAGE_KEY);

  if (!citasGuardadas) {
    return [];
  }

  try {
    const parsed = JSON.parse(citasGuardadas);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCitas(citas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(citas));
}

function parseTimeToMinutes(timeValue) {
  if (!timeValue) {
    return 0;
  }

  const [hours, minutes] = timeValue.split(':').map(Number);
  return (hours * 60) + minutes;
}

function minutesToTime(minutes) {
  const normalizedMinutes = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = normalizedMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function formatTimeLabel(timeValue) {
  const [hoursText, minutesText] = timeValue.split(':');
  let hours = Number(hoursText);
  const minutes = Number(minutesText);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

function addMinutes(timeValue, minutesToAdd) {
  return minutesToTime(parseTimeToMinutes(timeValue) + minutesToAdd);
}

function formatDateLabel(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  const formatted = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatMonthYearLabel(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  const formatted = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function toLocalDateString(date) {
  const localTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localTime.toISOString().split('T')[0];
}

function getScheduleForDate(dateValue) {
  const dayIndex = new Date(`${dateValue}T00:00:00`).getDay();
  return WORKING_HOURS[dayIndex] || null;
}

function getServiceDefinition(serviceValue) {
  return SERVICE_DEFINITIONS[serviceValue] || null;
}

function normalizeServiceLabel(serviceValue) {
  return SERVICE_LABELS[serviceValue] || serviceValue || '';
}

function getUnasSelectionState() {
  const typeInput = document.querySelector('#serviceFields input[name="unas_tipo_servicio"]:checked');
  const sizeSelect = document.getElementById('unas_tamano');
  const typeValue = typeInput?.value || '';
  const requiresSize = typeValue === 'escultural' || typeValue === 'tip_acrilica';
  const sizeValue = sizeSelect?.value || '';
  const sizeNumber = Number(sizeValue);

  return {
    typeValue,
    typeLabel: typeInput?.dataset.label || '',
    typeDuration: Number(typeInput?.dataset.duration) || 0,
    requiresSize,
    sizeValue,
    sizeLabel: sizeValue,
    sizeExtraDuration: requiresSize ? (sizeNumber >= 4 ? 60 : 0) : 0,
  };
}

function syncUnasSizeVisibility() {
  const sizeFieldset = document.querySelector('[data-service-group="unas_tamano"]');
  if (!sizeFieldset) {
    return;
  }

  const state = getUnasSelectionState();
  const shouldShow = state.typeValue && state.requiresSize;

  sizeFieldset.style.display = shouldShow ? '' : 'none';

  if (!shouldShow) {
    const sizeSelect = document.getElementById('unas_tamano');
    if (sizeSelect) {
      sizeSelect.value = '';
    }
  }
}

function getUnasDuration(state = getUnasSelectionState()) {
  if (!state.typeValue) {
    return 0;
  }

  if (state.requiresSize && !state.sizeValue) {
    return 0;
  }

  return state.typeDuration + state.sizeExtraDuration;
}

function getUnasSelectedItems(state = getUnasSelectionState()) {
  if (!state.typeValue) {
    return [];
  }

  const selectedItems = [{
    label: state.typeLabel,
    duration: state.typeDuration,
  }];

  if (state.requiresSize && state.sizeValue) {
    selectedItems.push({
      label: `Tamaño de tus uñas: ${state.sizeLabel}`,
      duration: state.sizeExtraDuration,
    });
  }

  return selectedItems;
}

function inferDurationFromCitation(cita) {
  if (Number.isFinite(cita?.duracionMin)) {
    return Number(cita.duracionMin);
  }

  const serviceLabel = cita?.servicio || '';
  return SERVICE_DURATION_BY_LABEL[serviceLabel] || 120;
}

function getAppointmentsForDate(dateValue) {
  return getCitas().filter((cita) => cita.fecha === dateValue && cita.estado !== 'cancelada');
}

function intervalsOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function getAvailableStartTimes(dateValue, durationMinutes, serviceValue) {
  const schedule = getScheduleForDate(dateValue);
  if (!schedule) {
    return [];
  }

  const openingMinutes = parseTimeToMinutes(schedule.start);
  const closingMinutes = parseTimeToMinutes(schedule.end);
  const bookedAppointments = getAppointmentsForDate(dateValue).map((cita) => ({
    start: parseTimeToMinutes(cita.hora),
    end: parseTimeToMinutes(cita.hora) + inferDurationFromCitation(cita),
  }));

  const available = [];

  for (let slotStart = openingMinutes; slotStart + durationMinutes <= closingMinutes; slotStart += SLOT_STEP_MINUTES) {
    const slotEnd = slotStart + durationMinutes;
    const overlaps = bookedAppointments.some((appointment) => intervalsOverlap(slotStart, slotEnd, appointment.start, appointment.end));

    if (!overlaps) {
      available.push(minutesToTime(slotStart));
    }
  }

  if (serviceValue === 'diseno_color' && available.length > 0) {
    return available.filter((timeValue) => timeValue === schedule.start);
  }

  return available;
}

function getServiceDuration(serviceValue, selectedItems = []) {
  const definition = getServiceDefinition(serviceValue);
  if (!definition) {
    return 0;
  }

  if (serviceValue === 'diseno_color') {
    return definition.fixedDuration;
  }

  if (definition.fixedDuration && !definition.requiresSelection) {
    return definition.fixedDuration;
  }

  if (serviceValue === 'unas_acrilicas_gelish') {
    return getUnasDuration();
  }

  const total = selectedItems.reduce((t, item) => t + (Number(item.duration) || 0), 0);
  if (total > 0) return total;

  // Fallback: use a default duration per service label when no specific items selected
  const fallback = SERVICE_DURATION_BY_LABEL[definition.label];
  return Number(fallback) || 0;
}


function buildServiceFieldset(definition, group, groupIndex) {
  const groupName = group.name || `${definition.label.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${groupIndex}`;
  if (group.type === 'info') {
    const infoHtml = group.items.map((item) => {
      const hours = Math.floor((Number(item.duration) || 0) / 60);
      const minutes = (Number(item.duration) || 0) % 60;
      const durationText = minutes === 0 ? `${hours} horas` : `${hours}:${String(minutes).padStart(2, '0')} horas`;
      return `
        <div class="service-info-row">
          <strong>${item.label}:</strong>
          <div class="service-info-desc">${item.description || ''} ${item.duration ? `| Tiempo estimado: ${durationText}` : ''}</div>
        </div>
      `;
    }).join('');

    return `
      <fieldset class="service-fieldset">
        <legend>${group.title}</legend>
        <div class="service-info">
          ${infoHtml}
        </div>
      </fieldset>
    `;
  }

  if (group.type === 'select') {
    const selectId = groupName;
    const options = [
      '<option value="">Selecciona una opción</option>',
      ...group.items.map((item) => `
        <option value="${item.key}">${item.label}</option>
      `),
    ].join('');

    return `
      <fieldset class="service-fieldset" data-service-group="${groupName}" data-dependent-on="${(group.dependsOn || []).join(',')}">
        <legend>${group.title}</legend>
        <div class="service-select-wrapper">
          <label class="service-select-label" for="${selectId}">${group.title}</label>
          <select id="${selectId}" name="${selectId}" class="service-select-field">
            ${options}
          </select>
        </div>
      </fieldset>
    `;
  }

  const inputs = group.items.map((item, itemIndex) => {
    const inputId = `${groupName}_${item.key}_${itemIndex}`;
    const inputType = group.type === 'radio' ? 'radio' : 'checkbox';
    const sharedName = group.type === 'radio' ? groupName : inputId;

    const specsHtml = item.specs ? `
      <ul class="service-specs" style="margin: 8px 0 0 28px; padding: 0; list-style: none; font-size: 0.85rem; color: #666;">
        ${item.specs.map(spec => `<li style="margin: 2px 0; padding: 0;">• ${spec}</li>`).join('')}
      </ul>
    ` : '';

    return `
      <label class="service-option" for="${inputId}">
        <input
          type="${inputType}"
          id="${inputId}"
          name="${sharedName}"
          value="${item.key}"
          data-label="${item.label.replace(/"/g, '&quot;')}"
          data-duration="${item.duration}"
          data-group="${groupName}"
        />
        <span>
          ${item.label}
          ${item.description ? `<small>${item.description}</small>` : ''}
        </span>
      </label>
      ${specsHtml}
    `;
  }).join('');

  return `
    <fieldset class="service-fieldset">
      <legend>${group.title}</legend>
      <div class="service-options">
        ${inputs}
      </div>
    </fieldset>
  `;
}

function renderServiceFields(serviceValue) {
  const serviceFields = document.getElementById('serviceFields');
  const serviceNotice = document.getElementById('serviceNotice');
  const horaSelect = document.getElementById('hora');
  const horaFinInput = document.getElementById('horaFin');
  const definition = getServiceDefinition(serviceValue);

  calendarMonthOffset = 0;

  if (!serviceFields) {
    return;
  }

  serviceFields.innerHTML = '';

  if (!definition) {
    if (serviceNotice) {
      serviceNotice.style.display = 'none';
      serviceNotice.innerHTML = '';
    }

    if (horaSelect) {
      horaSelect.innerHTML = '<option value="">Selecciona una fecha primero</option>';
      horaSelect.disabled = true;
    }

    if (horaFinInput) {
      horaFinInput.value = '';
    }

    // Reset calendar display
    const fechaCalendar = document.getElementById('fechaCalendar');
    const fechaFallback = document.getElementById('fechaFallback');
    if (fechaCalendar) fechaCalendar.style.display = 'none';
    if (fechaFallback) fechaFallback.style.display = 'block';

    return;
  }

  if (serviceNotice) {
    serviceNotice.style.display = 'block';
    serviceNotice.innerHTML = definition.note
      ? `<p>${definition.note}</p>`
      : '<p>Selecciona uno o varios servicios para calcular la duración.</p>';
  }

  if (definition.groups && definition.groups.length > 0) {
    serviceFields.classList.add('service-fields');
    serviceFields.innerHTML = definition.groups.map((group, groupIndex) => buildServiceFieldset(definition, group, groupIndex)).join('');
  } else {
    serviceFields.classList.remove('service-fields');
  }

  syncUnasSizeVisibility();

  renderAvailableDates();
  renderAvailableTimes();
  updateEstimatedEnd();
}

function changeCalendarMonth(delta) {
  calendarMonthOffset = Math.max(0, Math.min(CALENDAR_MONTHS_AHEAD - 1, calendarMonthOffset + delta));
  renderAvailableDates();
  renderAvailableTimes();
}

function getSelectedItems(serviceValue) {
  const definition = getServiceDefinition(serviceValue);
  if (!definition) {
    return [];
  }

  if (serviceValue === 'diseno_color') {
    return [{ label: definition.label, duration: definition.fixedDuration }];
  }

  if (definition.fixedDuration && !definition.requiresSelection) {
    return [{ label: definition.label, duration: definition.fixedDuration }];
  }

  if (serviceValue === 'unas_acrilicas_gelish') {
    return getUnasSelectedItems();
  }

  const selectedItems = [];
  document.querySelectorAll('#serviceFields input:checked').forEach((input) => {
    const label = input.dataset.label || input.value;
    const duration = Number(input.dataset.duration) || 0;
    selectedItems.push({ label, duration });
  });

  return selectedItems;
}

function getServiceDurationText(serviceValue, selectedItems) {
  if (serviceValue === 'diseno_color') {
    return '8 a 12 horas';
  }

  if (serviceValue === 'unas_acrilicas_gelish') {
    const duration = getUnasDuration();
    if (duration <= 0) {
      return '';
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (minutes === 0) {
      return `${hours} horas`;
    }

    return `${hours}:${String(minutes).padStart(2, '0')} horas`;
  }

  const totalDuration = getServiceDuration(serviceValue, selectedItems);
  if (totalDuration <= 0) {
    return '';
  }

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  if (minutes === 0) {
    return `${hours} horas`;
  }

  return `${hours}:${String(minutes).padStart(2, '0')} horas`;
}

function renderAvailableDates() {
  const serviceSelect = document.getElementById('servicio');
  const fechaCalendar = document.getElementById('fechaCalendar');
  const fechaFallback = document.getElementById('fechaFallback');
  const calendarGrid = document.getElementById('calendarGrid');
  const fechaInput = document.getElementById('fecha');

  if (!serviceSelect || !fechaCalendar || !calendarGrid) {
    return;
  }

  const serviceValue = serviceSelect.value;
  const definition = getServiceDefinition(serviceValue);
  const selectedItems = getSelectedItems(serviceValue);
  const totalDuration = getServiceDuration(serviceValue, selectedItems);

  if (serviceValue === 'unas_acrilicas_gelish') {
    const unasState = getUnasSelectionState();
    if (unasState.typeValue && unasState.requiresSize && !unasState.sizeValue) {
      fechaCalendar.style.display = 'none';
      fechaFallback.style.display = 'block';
      fechaFallback.textContent = 'Elige el tamaño de tus uñas para continuar';
      fechaInput.value = '';
      return;
    }
  }

  if (!definition || totalDuration <= 0) {
    fechaCalendar.style.display = 'none';
    fechaFallback.style.display = 'block';
    fechaFallback.textContent = serviceValue === 'unas_acrilicas_gelish'
      ? 'Selecciona un tipo de servicio para continuar'
      : 'Selecciona un servicio primero';
    fechaInput.value = '';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const viewDate = new Date(today.getFullYear(), today.getMonth() + calendarMonthOffset, 1);
  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const monthTitle = formatMonthYearLabel(toLocalDateString(monthStart));
  const firstWeekday = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const cells = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push('<div class="calendar-day calendar-day--empty"></div>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dateValue = toLocalDateString(date);
    const schedule = getScheduleForDate(dateValue);
    const appointments = getAppointmentsForDate(dateValue);
    const availableSlots = schedule ? getAvailableStartTimes(dateValue, totalDuration, serviceValue) : [];
    const isPastDate = date < today;
    const isSelected = fechaInput.value === dateValue;
    const isFullyOccupied = definition.busyDayOnly && appointments.length > 0;
    const hasAppointments = appointments.length > 0;
    const hasNoAvailableSlots = availableSlots.length === 0;
    const isUnavailable = isPastDate || !schedule || hasNoAvailableSlots;

    let dayClass = 'calendar-day';
    if (isSelected) {
      dayClass += ' calendar-day--selected';
    } else if (isFullyOccupied) {
      dayClass += ' calendar-day--occupied';
    } else if (hasAppointments && !isUnavailable) {
      dayClass += ' calendar-day--busy';
    } else if (isUnavailable) {
      dayClass += ' calendar-day--full';
    } else {
      dayClass += ' calendar-day--available';
    }

    const disabledAttr = (isFullyOccupied || isUnavailable) ? 'disabled' : '';

    cells.push(`
      <button
        type="button"
        class="${dayClass}"
        ${disabledAttr}
        onclick="selectFecha('${dateValue}')"
        aria-label="${formatDateLabel(dateValue)}"
      >
        <span class="calendar-day-number">${day}</span>
      </button>
    `);
  }

  const canGoPrev = calendarMonthOffset > 0;
  const canGoNext = calendarMonthOffset < CALENDAR_MONTHS_AHEAD - 1;

  const calendarHTML = `
    <div class="month-calendar">
      <div class="month-calendar-header">
        <button type="button" class="month-nav-btn" onclick="changeCalendarMonth(-1)" ${canGoPrev ? '' : 'disabled'} aria-label="Mes anterior">‹</button>
        <div class="month-calendar-title">${monthTitle}</div>
        <button type="button" class="month-nav-btn" onclick="changeCalendarMonth(1)" ${canGoNext ? '' : 'disabled'} aria-label="Mes siguiente">›</button>
      </div>
      <div class="month-calendar-weekdays">
        ${dayNames.map((dayName) => `<div class="month-calendar-weekday">${dayName}</div>`).join('')}
      </div>
      <div class="month-calendar-grid">
        ${cells.join('')}
      </div>
      <div class="calendar-legend calendar-legend--months">
        <span class="legend-item"><span class="legend-dot free"></span>Disponible</span>
        <span class="legend-item"><span class="legend-dot busy"></span>Poca disponibilidad</span>
        <span class="legend-item"><span class="legend-dot full"></span>No disponible</span>
      </div>
    </div>
  `;

  calendarGrid.innerHTML = calendarHTML;
  fechaCalendar.style.display = 'block';
  fechaFallback.style.display = 'none';
}

function selectFecha(dateValue) {
  const fechaInput = document.getElementById('fecha');
  fechaInput.value = dateValue;
  renderAvailableDates();
  renderAvailableTimes();
}

function renderAvailableTimes() {
  const serviceSelect = document.getElementById('servicio');
  const fechaSelect = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');

  if (!serviceSelect || !fechaSelect || !horaSelect) {
    return;
  }

  const serviceValue = serviceSelect.value;
  const dateValue = fechaSelect.value;
  const selectedItems = getSelectedItems(serviceValue);
  const totalDuration = getServiceDuration(serviceValue, selectedItems);

  if (serviceValue === 'unas_acrilicas_gelish') {
    const unasState = getUnasSelectionState();
    if (unasState.typeValue && unasState.requiresSize && !unasState.sizeValue) {
      horaSelect.innerHTML = '<option value="">Elige el tamaño de tus uñas</option>';
      horaSelect.disabled = true;
      return;
    }
  }

  if (!serviceValue || !dateValue || totalDuration <= 0) {
    horaSelect.innerHTML = '<option value="">Selecciona una fecha primero</option>';
    horaSelect.disabled = true;
    if (serviceValue === 'unas_acrilicas_gelish') {
      const unasState = getUnasSelectionState();
      horaSelect.innerHTML = `<option value="">${unasState.typeValue ? 'Elige el tamaño de tus uñas' : 'Selecciona un tipo de servicio para continuar'}</option>`;
    }
    return;
  }

  const schedule = getScheduleForDate(dateValue);
  const availableSlots = getAvailableStartTimes(dateValue, totalDuration, serviceValue);

  if (!schedule || availableSlots.length === 0) {
    horaSelect.innerHTML = '<option value="">No hay horarios disponibles</option>';
    horaSelect.disabled = true;
    return;
  }

  const currentSelection = horaSelect.value;
  const slotOptions = ['<option value="">Selecciona la hora de inicio</option>'];

  availableSlots.forEach((slotValue) => {
    slotOptions.push(`<option value="${slotValue}">${formatTimeLabel(slotValue)}</option>`);
  });

  horaSelect.innerHTML = slotOptions.join('');
  horaSelect.disabled = false;

  if (currentSelection && horaSelect.querySelector(`option[value="${currentSelection}"]`)) {
    horaSelect.value = currentSelection;
  }
}

function updateEstimatedEnd() {
  const serviceSelect = document.getElementById('servicio');
  const horaSelect = document.getElementById('hora');
  const horaFinInput = document.getElementById('horaFin');

  if (!serviceSelect || !horaFinInput) {
    return;
  }

  const serviceValue = serviceSelect.value;
  const selectedItems = getSelectedItems(serviceValue);
  const totalDuration = getServiceDuration(serviceValue, selectedItems);
  const startTime = horaSelect?.value || '';

  if (serviceValue === 'unas_acrilicas_gelish') {
    const unasState = getUnasSelectionState();
    if (unasState.typeValue && unasState.requiresSize && !unasState.sizeValue) {
      horaFinInput.value = '';
      return;
    }
  }

  if (!serviceValue || totalDuration <= 0 || !startTime) {
    horaFinInput.value = '';
    return;
  }

  if (serviceValue === 'diseno_color') {
    const minEnd = addMinutes(startTime, 480);
    const maxEnd = addMinutes(startTime, 720);
    horaFinInput.value = `${formatTimeLabel(minEnd)} - ${formatTimeLabel(maxEnd)}`;
    return;
  }

  horaFinInput.value = formatTimeLabel(addMinutes(startTime, totalDuration));
}

function getSelectedServiceSummary(serviceValue) {
  const definition = getServiceDefinition(serviceValue);
  const selectedItems = getSelectedItems(serviceValue);

  if (!definition) {
    return { label: '', detail: '', duration: 0, durationText: '' };
  }

  const duration = getServiceDuration(serviceValue, selectedItems);
  const detail = selectedItems.length > 0
    ? selectedItems.map((item) => item.label).join(', ')
    : definition.label;

  return {
    label: definition.label,
    detail,
    duration,
    durationText: getServiceDurationText(serviceValue, selectedItems),
  };
}

function resetDerivedFormFields() {
  const serviceFields = document.getElementById('serviceFields');
  const serviceNotice = document.getElementById('serviceNotice');
  const fechaSelect = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');
  const horaFinInput = document.getElementById('horaFin');

  if (serviceFields) {
    serviceFields.innerHTML = '';
  }

  if (serviceNotice) {
    serviceNotice.style.display = 'none';
    serviceNotice.innerHTML = '';
  }

  if (fechaSelect) {
    fechaSelect.innerHTML = '<option value="">Selecciona un servicio primero</option>';
    fechaSelect.disabled = true;
  }

  if (horaSelect) {
    horaSelect.innerHTML = '<option value="">Selecciona una fecha primero</option>';
    horaSelect.disabled = true;
  }

  if (horaFinInput) {
    horaFinInput.value = '';
  }
}

function showInlineMessage(messageDiv, type, title, text) {
  messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
  messageDiv.innerHTML = `
    <div class="message-card">
      <div class="message-card__icon">${type === 'error' ? '!' : '✓'}</div>
      <div class="message-card__body">
        <div class="message-card__title">${title}</div>
        <div class="message-card__text">${text}</div>
      </div>
    </div>
    <div class="message-card__actions">
      <button type="button" class="message-card__button" id="closeMessageBtn">Aceptar</button>
    </div>
  `;
  messageDiv.style.display = 'block';

  const closeMessageBtn = document.getElementById('closeMessageBtn');
  if (closeMessageBtn) {
    closeMessageBtn.addEventListener('click', () => {
      messageDiv.style.display = 'none';
    });
  }
}

// =========================
// FORMULARIO AGENDAR CITA
// =========================
const agendarForm = document.getElementById('agendarForm');
if (agendarForm) {
  const serviceSelect = document.getElementById('servicio');
  const fechaSelect = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');
  const horaFinInput = document.getElementById('horaFin');
  let disenoColorAccepted = false;

  if (typeof emailjs !== 'undefined' && emailjs.init) {
    emailjs.init('pgPhVWz5l64nPdsWO');
  }

  const today = toLocalDateString(new Date());
  if (fechaSelect) {
    fechaSelect.setAttribute('min', today);
    fechaSelect.disabled = true;
  }

  if (horaSelect) {
    horaSelect.disabled = true;
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      disenoColorAccepted = false;
      renderServiceFields(serviceSelect.value);
    });
  }

  document.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement)) {
      return;
    }

    if (!event.target.closest('#serviceFields')) {
      return;
    }

    if (event.target.matches('input[name="unas_tipo_servicio"]')) {
      syncUnasSizeVisibility();
    }

    renderAvailableDates();
    renderAvailableTimes();
    updateEstimatedEnd();
  });

  if (fechaSelect) {
    fechaSelect.addEventListener('change', () => {
      renderAvailableTimes();
      updateEstimatedEnd();
    });
  }

  if (horaSelect) {
    horaSelect.addEventListener('change', () => {
      updateEstimatedEnd();
    });
  }

  renderServiceFields(serviceSelect?.value || '');

  agendarForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    const nombre = document.getElementById('nombre')?.value.trim() || '';
    const telefono = document.getElementById('telefono')?.value.trim() || '';
    const notas = document.getElementById('notas')?.value.trim() || 'Sin notas adicionales';
    const serviceValue = serviceSelect?.value || '';
    const fechaValue = fechaSelect?.value || '';
    const horaValue = horaSelect?.value || '';
    const selectedItems = getSelectedItems(serviceValue);
    const serviceSummary = getSelectedServiceSummary(serviceValue);
    const appointmentDuration = getServiceDuration(serviceValue, selectedItems);

    if (serviceValue === 'unas_acrilicas_gelish') {
      const unasState = getUnasSelectionState();
      if (!unasState.typeValue) {
        if (messageDiv) {
          showInlineMessage(messageDiv, 'error', 'Selecciona un tipo de servicio', 'Primero elige el tipo de servicio para continuar con Uñas.');
        }
        return;
      }

      if (unasState.requiresSize && !unasState.sizeValue) {
        if (messageDiv) {
          showInlineMessage(messageDiv, 'error', 'Falta el tamaño de tus uñas', 'Si elegiste Uña con tip acrílica o Uña escultural, selecciona el tamaño de tus uñas.');
        }
        return;
      }
    }

    if (!nombre || !telefono || !serviceValue || !fechaValue || !horaValue) {
      if (messageDiv) {
        showInlineMessage(messageDiv, 'error', 'Faltan datos', 'Completa todos los campos obligatorios antes de continuar.');
      }
      return;
    }

    if (SERVICE_DEFINITIONS[serviceValue]?.requiresSelection && selectedItems.length === 0) {
      if (messageDiv) {
        showInlineMessage(messageDiv, 'error', 'Selecciona un servicio', 'Debes elegir al menos una opción del servicio seleccionado.');
      }
      return;
    }

    const availableSlots = getAvailableStartTimes(fechaValue, appointmentDuration, serviceValue);
    if (!availableSlots.includes(horaValue)) {
      if (messageDiv) {
        showInlineMessage(messageDiv, 'error', 'Horario no disponible', 'Ese horario ya no está libre. Vuelve a seleccionar una fecha u hora disponible.');
      }
      renderAvailableDates();
      renderAvailableTimes();
      return;
    }

    if (serviceValue === 'diseno_color' && !disenoColorAccepted) {
      const note = SERVICE_DEFINITIONS.diseno_color.note;
      const accepted = window.confirm(note);
      if (!accepted) {
        return;
      }
      disenoColorAccepted = true;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    const endTime = horaFinInput?.value || '';
    const formData = {
      id: Date.now(),
      nombre,
      telefono,
      servicio: serviceSummary.label,
      servicioClave: serviceValue,
      servicioDetalle: serviceSummary.detail,
      fecha: fechaValue,
      hora: horaValue,
      horaFin: endTime,
      duracionMin: appointmentDuration,
      duracionTexto: serviceSummary.durationText,
      notas,
      estado: 'en espera',
      fechaCreacion: new Date().toISOString(),
    };

    const emailParams = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      servicio: formData.servicio,
      servicio_detalle: formData.servicioDetalle,
      fecha: formData.fecha,
      hora: formData.hora,
      hora_fin: formData.horaFin,
      duracion: formData.duracionTexto,
      notas: formData.notas,
      to_email: 'queenstudioym@gmail.com',
    };

    const citasGuardadas = getCitas();
    citasGuardadas.push(formData);
    saveCitas(citasGuardadas);

    const sendPromise = typeof emailjs !== 'undefined' && emailjs.send
      ? emailjs.send('service_inzora', 'template_correo', emailParams)
      : Promise.resolve({ status: 200, text: 'emailjs no disponible' });

    sendPromise.then(() => {
      if (messageDiv) {
        showInlineMessage(messageDiv, 'success', 'Solicitud enviada', 'Tu solicitud ha sido enviada. Espera que nos contactemos personalmente contigo.');
      }

      agendarForm.reset();
      resetDerivedFormFields();
      renderServiceFields('');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Agendar Cita';
      }

      if (serviceSelect) {
        serviceSelect.value = '';
      }
    }).catch((error) => {
      console.error('Error al enviar email:', error);

      if (messageDiv) {
        const whatsappMsg = 'La cita se guardó, pero el correo no se envió. Te contactaremos por WhatsApp.';
        const whatsappBtn = '<a href="https://wa.me/528446002354" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #25D366; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Contactar por WhatsApp</a>';
        showInlineMessage(messageDiv, 'error', 'No se pudo enviar', whatsappMsg);
        const errorMsg = messageDiv.querySelector('.inline-message-content');
        if (errorMsg) {
          errorMsg.innerHTML += whatsappBtn;
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Agendar Cita';
      }
    });
  });
}

// =========================
// PANEL ADMIN
// =========================
// Variable global para el mes actual del calendario admin
let adminCalendarCurrentDate = new Date();
adminCalendarCurrentDate.setHours(0, 0, 0, 0);
adminCalendarCurrentDate.setDate(1);

function renderAdminCalendar() {
  const adminCalendar = document.getElementById('adminCalendar');
  const citasContainer = document.getElementById('citasContainer');
  const countTotal = document.getElementById('count-todas');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!adminCalendar || !countTotal) {
    return;
  }

  if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  if (logoutBtn && !logoutBtn.dataset.bound) {
    logoutBtn.dataset.bound = 'true';
    logoutBtn.addEventListener('click', () => {
      if (window.confirm('¿Segura que quieres cerrar sesión?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        window.location.href = 'index.html';
      }
    });
  }

  const citas = getCitas().sort((left, right) => {
    const leftDate = `${left.fecha}T${left.hora || '00:00'}`;
    const rightDate = `${right.fecha}T${right.hora || '00:00'}`;
    return leftDate.localeCompare(rightDate);
  });

  countTotal.textContent = String(citas.length);

  const activeAppointments = citas.filter((cita) => cita.estado !== 'cancelada');
  const citasByDate = new Map();

  activeAppointments.forEach((cita) => {
    if (!citasByDate.has(cita.fecha)) {
      citasByDate.set(cita.fecha, []);
    }
    citasByDate.get(cita.fecha).push(cita);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Renderizar el mes actual
  const viewDate = adminCalendarCurrentDate;
  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const monthTitle = formatMonthYearLabel(toLocalDateString(monthStart));
  const firstWeekday = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const cells = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push('<div class="calendar-day calendar-day--empty"></div>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dateValue = toLocalDateString(date);
    const dayAppointments = citasByDate.get(dateValue) || [];
    const isPastDate = date < today;
    const hasAppointments = dayAppointments.length > 0;

    let dayClass = 'calendar-day';
    if (isPastDate && !hasAppointments) {
      dayClass += ' calendar-day--disabled';
    } else if (hasAppointments) {
      dayClass += ' calendar-day--busy';
    } else {
      dayClass += ' calendar-day--available';
    }

    cells.push(`
      <div class="${dayClass}" data-fecha="${dateValue}" style="cursor: ${hasAppointments ? 'pointer' : 'default'};" title="${dayAppointments.length} cita(s)">
        <span class="calendar-day-number">${day}</span>
      </div>
    `);
  }

  const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
  const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);

  adminCalendar.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <button id="prevMonthBtn" style="padding: 8px 15px; border: none; background: #8e7d5a; color: white; border-radius: 8px; cursor: pointer; font-weight: bold; font-family: 'Montserrat', sans-serif;">← Anterior</button>
      <h3 style="text-align: center; color: #5d4e2e; margin: 0; flex: 1;">${monthTitle}</h3>
      <button id="nextMonthBtn" style="padding: 8px 15px; border: none; background: #8e7d5a; color: white; border-radius: 8px; cursor: pointer; font-weight: bold; font-family: 'Montserrat', sans-serif;">Siguiente →</button>
    </div>
    <div class="month-calendar">
      <div class="month-calendar-weekdays">
        ${dayNames.map((dayName) => `<div class="month-calendar-weekday">${dayName}</div>`).join('')}
      </div>
      <div class="month-calendar-grid">
        ${cells.join('')}
      </div>
    </div>
  `;

  // Agregar event listeners a los botones
  const prevBtn = document.getElementById('prevMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      adminCalendarCurrentDate.setMonth(adminCalendarCurrentDate.getMonth() - 1);
      renderAdminCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      adminCalendarCurrentDate.setMonth(adminCalendarCurrentDate.getMonth() + 1);
      renderAdminCalendar();
    });
  }

  if (!adminCalendar.dataset.boundClick) {
    adminCalendar.dataset.boundClick = 'true';
    adminCalendar.addEventListener('click', (event) => {
      const dayEl = event.target.closest('[data-fecha]');
      if (!dayEl) {
        return;
      }

      const fecha = dayEl.getAttribute('data-fecha');
      const targetCard = document.getElementById(`day-${fecha}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Renderizar citas
  if (citasContainer) {
    renderCitasAgendadas(activeAppointments, citasContainer);
  }
}

function renderCitasAgendadas(citas, container) {
  if (citas.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">No hay citas agendadas</div>';
    return;
  }

  // Agrupar citas por fecha
  const citasPorFecha = {};
  citas.forEach((cita) => {
    if (!citasPorFecha[cita.fecha]) {
      citasPorFecha[cita.fecha] = [];
    }
    citasPorFecha[cita.fecha].push(cita);
  });

  // Ordenar fechas
  const fechasOrdenadas = Object.keys(citasPorFecha).sort();

  const diasHTML = fechasOrdenadas.map((fecha) => {
    const citasDelDia = citasPorFecha[fecha];
    const confirmadasCount = citasDelDia.filter((c) => c.estado === 'confirmada').length;
    const dateObj = new Date(`${fecha}T00:00:00`);
    const formatoFecha = new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);

    const appointmentCardsHTML = citasDelDia.map((cita) => renderAdminAppointmentCard(cita)).join('');

    let dayCardClass = 'day-card';
    if (confirmadasCount > 0) {
      dayCardClass += ' day-card--confirmed';
    } else if (citasDelDia.some((c) => c.estado === 'en espera')) {
      dayCardClass += ' day-card--pending';
    }

    return `
      <div class="${dayCardClass}" id="day-${fecha}">
        <div class="admin-day-top">
          <h3 style="text-transform: capitalize;">${formatoFecha}</h3>
          <div class="admin-day-badge">${citasDelDia.length} cita${citasDelDia.length !== 1 ? 's' : ''}</div>
        </div>
        <div class="appointment-list">
          ${appointmentCardsHTML}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div class="calendar-grid admin-month-grid">${diasHTML}</div>`;
}

function getAvailableSlotsForAdmin(appointments, schedule) {
  const openingMinutes = parseTimeToMinutes(schedule.start);
  const closingMinutes = parseTimeToMinutes(schedule.end);

  const bookedIntervals = appointments.map((cita) => ({
    start: parseTimeToMinutes(cita.hora),
    end: parseTimeToMinutes(cita.hora) + inferDurationFromCitation(cita),
  }));

  const chips = [];

  for (let slotStart = openingMinutes; slotStart < closingMinutes; slotStart += SLOT_STEP_MINUTES) {
    const slotEnd = slotStart + SLOT_STEP_MINUTES;
    const occupiedAppointment = bookedIntervals.find((appointment) => intervalsOverlap(slotStart, slotEnd, appointment.start, appointment.end));

    if (occupiedAppointment) {
      chips.push(`<span class="slot-chip busy">${formatTimeLabel(minutesToTime(slotStart))}</span>`);
    } else {
      chips.push(`<span class="slot-chip free">${formatTimeLabel(minutesToTime(slotStart))}</span>`);
    }
  }

  return chips.join('');
}

function renderAdminAppointmentCard(cita) {
  const statusClass = `estado-${String(cita.estado || 'en espera').replace(/\s+/g, '-')}`;
  const endValue = cita.horaFin || (cita.hora && cita.duracionMin ? formatTimeLabel(addMinutes(cita.hora, cita.duracionMin)) : '');
  const serviceDetail = cita.servicioDetalle && cita.servicioDetalle !== cita.servicio ? cita.servicioDetalle : cita.servicio;
  const sanitizedPhone = String(cita.telefono || '').replace(/\D/g, '');

  return `
    <div class="appointment-card">
      <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">
        <strong>${cita.nombre}</strong>
        <span class="cita-estado ${statusClass}">${String(cita.estado || 'en espera').toUpperCase()}</span>
      </div>
      <div><strong>Teléfono:</strong> <a href="tel:${cita.telefono}" style="color:#fff3c1;">${cita.telefono}</a></div>
      <div><strong>Servicio:</strong> ${serviceDetail}</div>
      <div><strong>Hora:</strong> ${formatTimeLabel(cita.hora)}</div>
      ${endValue ? `<div><strong>Fin estimado:</strong> ${endValue}</div>` : ''}
      ${cita.notas ? `<div><strong>Notas:</strong> ${cita.notas}</div>` : ''}
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
        ${cita.estado !== 'confirmada' ? `<button type="button" onclick="cambiarEstado(${cita.id}, 'confirmada')" style="padding:8px 12px; border:none; border-radius:8px; background:#2e7d32; color:#fff; cursor:pointer;">Confirmar</button>` : ''}
        ${cita.estado !== 'cancelada' ? `<button type="button" onclick="cambiarEstado(${cita.id}, 'cancelada')" style="padding:8px 12px; border:none; border-radius:8px; background:#c62828; color:#fff; cursor:pointer;">Cancelar</button>` : ''}
        ${cita.estado !== 'en espera' ? `<button type="button" onclick="cambiarEstado(${cita.id}, 'en espera')" style="padding:8px 12px; border:none; border-radius:8px; background:#ed6c02; color:#fff; cursor:pointer;">En espera</button>` : ''}
        <button type="button" onclick="eliminarCita(${cita.id})" style="padding:8px 12px; border:none; border-radius:8px; background:#7d1d1d; color:#fff; cursor:pointer;">Eliminar</button>
        <a href="https://wa.me/52${sanitizedPhone}?text=Hola%20${encodeURIComponent(cita.nombre)},%20te%20contacto%20de%20Queen%20Studio%20sobre%20tu%20cita%20de%20${encodeURIComponent(serviceDetail)}" target="_blank" style="padding:8px 12px; border-radius:8px; background:#25D366; color:#fff; text-decoration:none; display:inline-block;">WhatsApp</a>
      </div>
    </div>
  `;
}

window.cambiarEstado = function cambiarEstado(id, nuevoEstado) {
  const citas = getCitas();
  const cita = citas.find((item) => item.id === id);
  if (!cita) {
    return;
  }

  cita.estado = nuevoEstado;
  saveCitas(citas);
  renderAdminCalendar();
};

window.eliminarCita = function eliminarCita(id) {
  if (!window.confirm('¿Estás segura de eliminar esta cita? Esta acción no se puede deshacer.')) {
    return;
  }

  const citas = getCitas().filter((item) => item.id !== id);
  saveCitas(citas);
  renderAdminCalendar();
};

if (document.getElementById('adminCalendar')) {
  renderAdminCalendar();
}

