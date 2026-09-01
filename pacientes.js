/**
 * Emizlab - Módulo de Gestión de Pacientes y Conexión con Bacteriología
 */

document.addEventListener('DOMContentLoaded', () => {
    cargarPortalPaciente();

    window.addEventListener('storage', (e) => {
        if (e.key === 'emizlab_ordenes' || e.key === 'emizlab_orders' || e.key === 'pacienteData' || e.key === 'activePatient') {
            cargarPortalPaciente();
        }
    });
});

/**
 * Convierte cualquier formato de fecha a texto legible en español (mes en letras)
 */
function formatearFechaLegible(fechaInput) {
    if (!fechaInput) {
        return "1 de septiembre de 2026";
    }

    if (typeof fechaInput === 'string' && fechaInput.includes('de')) {
        return fechaInput;
    }

    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    let dia, mesIndex, anio;

    if (typeof fechaInput === 'string' && fechaInput.includes('/')) {
        const partes = fechaInput.split('/');
        if (partes.length === 3) {
            dia = parseInt(partes[0], 10);
            mesIndex = parseInt(partes[1], 10) - 1;
            anio = parseInt(partes[2], 10);
        }
    }

    if (isNaN(dia) || isNaN(mesIndex) || mesIndex < 0 || mesIndex > 11) {
        const fecha = new Date(fechaInput);
        if (!isNaN(fecha.getTime())) {
            dia = fecha.getDate();
            mesIndex = fecha.getMonth();
            anio = fecha.getFullYear();
        } else {
            return "1 de septiembre de 2026";
        }
    }

    const nombreMes = meses[mesIndex] || "septiembre";
    return `${dia} de ${nombreMes} de ${anio}`;
}

/**
 * Carga el perfil del paciente y busca sus órdenes en el sistema
 */
function cargarPortalPaciente() {
    const sesionRaw = JSON.parse(localStorage.getItem('activePatient')) || JSON.parse(localStorage.getItem('pacienteData')) || {
        name: "Andres Soto Gutierrez",
        docType: "CC",
        docNum: "123",
        sede: "E.S.E. Hospital Local de Ciudad Caribe"
    };

    const pacienteData = {
        nombre: sesionRaw.name || sesionRaw.nombre || "Paciente",
        documentoTipo: sesionRaw.docType || sesionRaw.documentoTipo || "CC",
        documentoNumero: String(sesionRaw.docNum || sesionRaw.documentoNumero || "").trim(),
        sede: sesionRaw.sede || "E.S.E. Hospital Local de Ciudad Caribe"
    };

    renderEtiquetaPaciente(pacienteData);

    const ordenesA = JSON.parse(localStorage.getItem('emizlab_ordenes')) || [];
    const ordenesB = JSON.parse(localStorage.getItem('emizlab_orders')) || [];
    
    const mapOrdenes = new Map();
    [...ordenesA, ...ordenesB].forEach(o => {
        const num = String(o.orderNum || o.numeroOrden || '');
        if (num) mapOrdenes.set(num, o);
    });

    const ordenesGlobalesRaw = Array.from(mapOrdenes.values());

    const ordenesGlobales = ordenesGlobalesRaw.map(o => {
        const fechaCruda = o.date || o.fechaToma || new Date();
        const esPublicada = (o.isPublished === true || o.estado === 'disponible' || o.completado === true);

        return {
            ...o,
            numeroOrden: String(o.orderNum || o.numeroOrden || ''),
            estado: esPublicada ? 'disponible' : 'proceso',
            fechaToma: formatearFechaLegible(fechaCruda),
            sede: o.sede || 'E.S.E. Hospital Local de Ciudad Caribe',
            docNum: String(o.docNum || o.pacienteDoc || o.documento || '').trim(),
            pdfAdjunto: o.pdfAdjunto || null
        };
    });

    const docBuscado = pacienteData.documentoNumero;

    let ordenesDelPaciente = ordenesGlobales.filter(orden => {
        if (!docBuscado || docBuscado === "123") return true;
        const docOrden = orden.docNum;
        return docOrden === docBuscado || docOrden.includes(docBuscado) || docBuscado.includes(docOrden);
    });

    if (ordenesDelPaciente.length === 0 && ordenesGlobales.length > 0) {
        ordenesDelPaciente = ordenesGlobales;
    }

    window.currentOrdenesPaciente = ordenesDelPaciente;
    renderListaOrdenes(ordenesDelPaciente);
}

/**
 * Pinta el banner del paciente con icono SVG
 */
function renderEtiquetaPaciente(paciente) {
    const tagContainer = document.getElementById('patientTag');
    if (!tagContainer) return;

    tagContainer.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2A5 5 0 1 0 12 12A5 5 0 0 0 12 2ZM4 19C4 15.134 7.134 12 11 12C12.38 12 13.666 12.4 14.743 13.09C13.66 14.39 13 16.06 13 17.88C13 18.26 13.03 18.63 13.09 19H4Z" fill="#4C4B6C"/>
            <circle cx="17.5" cy="17.5" r="5.5" fill="#52D68A"/>
            <path d="M15 17.5L16.8 19.3L20 15.5" stroke="#004D1A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Paciente: ${paciente.nombre} | ${paciente.documentoTipo}: ${paciente.documentoNumero}
    `;
}

/**
 * Imprime el listado de tarjetas respetando la estructura y clases idénticas del HTML
 */
function renderListaOrdenes(ordenes) {
    const listContainer = document.getElementById('labList');
    if (!listContainer) return;

    if (ordenes.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; color: #64748b; padding: 30px;">
                <p>No se encontraron resultados u órdenes asociadas a su documento.</p>
            </div>`;
        return;
    }

    ordenes.sort((a, b) => Number(b.numeroOrden) - Number(a.numeroOrden));

    listContainer.innerHTML = ordenes.map(orden => {
        const esDisponible = (orden.estado === 'disponible' || orden.isPublished === true);
        
        const strokeColor = esDisponible ? '#333' : '#94a3b8';
        const rectColor = esDisponible ? '#e50914' : '#94a3b8';

        const statusBadge = esDisponible
            ? `<span class="pacientes-status-badge pacientes-status-ready">🟢 Disponible</span>`
            : `<span class="pacientes-status-badge pacientes-status-pending">🟡 En Proceso</span>`;

        const downloadButton = esDisponible
            ? `<a href="#" download class="pacientes-btn-download" onclick="descargarResultado('${orden.numeroOrden}'); return false;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Descargar
               </a>`
            : `<a href="#" class="pacientes-btn-download disabled" onclick="event.preventDefault();">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                En proceso
               </a>`;

        return `
            <div class="pacientes-lab-item">
                <div class="pacientes-lab-info">
                    <svg class="pacientes-pdf-icon" viewBox="0 0 100 120" fill="none">
                        <path d="M25 10 H60 L85 35 V105 A 10 10 0 0 1 75 115 H25 A 10 10 0 0 1 15 105 V20 A 10 10 0 0 1 25 10 Z" stroke="${strokeColor}" stroke-width="7" fill="none"/>
                        <path d="M60 10 V35 H85" stroke="${strokeColor}" stroke-width="7" fill="none"/>
                        <rect x="0" y="42" width="58" height="28" rx="6" fill="${rectColor}"/>
                        <text x="29" y="61" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">PDF</text>
                    </svg>
                    <div class="pacientes-lab-details">
                        <h4>N° Orden: ${orden.numeroOrden}</h4>
                        <p>Fecha de Toma: ${orden.fechaToma}</p>
                        <span class="pacientes-location-tag" style="color: #00a896;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            ${orden.sede || 'E.S.E. Hospital Local de Ciudad Caribe'}
                        </span>
                        ${statusBadge}
                    </div>
                </div>
                ${downloadButton}
            </div>
        `;
    }).join('');
}

/**
 * Función para descargar el PDF generado o adjuntado por el bacteriólogo
 */
function descargarResultado(numeroOrden) {
    const listaOrdenes = window.currentOrdenesPaciente || [];
    const ordenEncontrada = listaOrdenes.find(o => String(o.numeroOrden) === String(numeroOrden));

    if (ordenEncontrada && ordenEncontrada.pdfAdjunto) {
        const link = document.createElement('a');
        link.href = ordenEncontrada.pdfAdjunto;
        link.download = `Resultado_Laboratorio_Orden_${numeroOrden}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
    }

    // Si por alguna razón el PDF adjunto no está guardado aún pero la orden está publicada, 
    // intentamos invocar la función generarPDF original si está disponible globalmente.
    if (typeof window.generarPDF === 'function') {
        window.generarPDF(Number(numeroOrden));
    } else {
        alert("El archivo PDF para esta orden no está disponible para descarga directa todavía.");
    }
}

window.descargarResultado = descargarResultado;