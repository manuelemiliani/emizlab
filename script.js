// ==========================================
// SCRIPT PRINCIPAL - EMIZLAB PANEL DE BACTERIOLOGÍA
// ==========================================

const todayObj = new Date();
const opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric' };
const fechaHoyFormateada = todayObj.toLocaleDateString('es-ES', opcionesFecha);
const horaHoyFormateada = todayObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

// Listado de 15 opciones de exámenes clínicos disponibles
const availableExamsList = [
    { 
        id: "coagulacion", 
        category: "COAGULACION",
        name: "Tiempos de Coagulación (PT / PTT)", 
        fields: [
            { k: "TIEMPO DE PROTROMBINA PT", val: "11.1", unit: "Seg", ref: "8.9 - 11.9" },
            { k: "Control Diario Media Poblacional", val: "10.0", unit: "Seg", ref: "" },
            { k: "INR", val: "1.11", unit: "", ref: "0.8 - 1.12" },
            { k: "TIEMPO DE TROMBOPLASTINA PARCIAL PTT", val: "36.6", unit: "Seg", ref: "24.5 - 33.8" },
            { k: "Control Diario Media Poblacional", val: "28.1", unit: "Seg", ref: "" }
        ] 
    },
    { 
        id: "hemograma", 
        category: "HEMATOLOGIA",
        name: "Hemograma Completo", 
        fields: [
            { k: "HEMOGLOBINA", val: "14.2", unit: "g/dL", ref: "12.0 - 16.0" },
            { k: "HEMATOCRITO", val: "42.0", unit: "%", ref: "37.0 - 47.0" },
            { k: "LEUCOCITOS", val: "7500", unit: "/mm³", ref: "4500 - 11000" },
            { k: "PLAQUETAS", val: "250000", unit: "/mm³", ref: "150000 - 450000" },
            { k: "NEUTROFILOS", val: "60", unit: "%", ref: "50 - 70" },
            { k: "LINFOCITOS", val: "30", unit: "%", ref: "20 - 40" }
        ] 
    },
    { 
        id: "uroanalisis", 
        category: "UROANALISIS",
        name: "Parcial de Orina", 
        fields: [
            { k: "COLOR", val: "Amarillo", unit: "", ref: "Amarillo" },
            { k: "ASPECTO", val: "Límpido", unit: "", ref: "Límpido" },
            { k: "DENSIDAD", val: "1.020", unit: "", ref: "1.010 - 1.030" },
            { k: "PH", val: "6.0", unit: "", ref: "5.0 - 7.0" },
            { k: "PROTEINAS", val: "Negativo", unit: "", ref: "Negativo" },
            { k: "GLUCOSA", val: "Negativo", unit: "", ref: "Negativo" }
        ] 
    },
    { 
        id: "quimica_sanguinea", 
        category: "QUIMICA SANGUINEA",
        name: "Perfil Hepático / Renal básico", 
        fields: [
            { k: "GLICEMIA BASAL", val: "90", unit: "mg/dL", ref: "70 - 100" },
            { k: "CREATININA", val: "0.9", unit: "mg/dL", ref: "0.6 - 1.2" },
            { k: "NITROGENO UREICO (BUN)", val: "14", unit: "mg/dL", ref: "7 - 20" },
            { k: "ACIDO URICO", val: "5.5", unit: "mg/dL", ref: "3.5 - 7.2" }
        ] 
    },
    { 
        id: "perfil_lipidico", 
        category: "QUIMICA SANGUINEA",
        name: "Perfil Lipídico", 
        fields: [
            { k: "COLESTEROL TOTAL", val: "180", unit: "mg/dL", ref: "< 200" },
            { k: "TRIGLICERIDOS", val: "150", unit: "mg/dL", ref: "< 150" },
            { k: "COLESTEROL HDL", val: "50", unit: "mg/dL", ref: "> 40" },
            { k: "COLESTEROL LDL", val: "110", unit: "mg/dL", ref: "< 130" }
        ] 
    },
    {
        id: "electrolitos",
        category: "ELECTROLITOS",
        name: "Electrolitos Séricos (Na, K, Cl)",
        fields: [
            { k: "SODIO (Na)", val: "140", unit: "mmol/L", ref: "135 - 145" },
            { k: "POTASIO (K)", val: "4.2", unit: "mmol/L", ref: "3.5 - 5.0" },
            { k: "CLORO (Cl)", val: "102", unit: "mmol/L", ref: "96 - 106" }
        ]
    },
    {
        id: "hormonas_tiroideas",
        category: "ENDOCRINOLOGIA",
        name: "Hormonas Tiroideas (TSH, T4L)",
        fields: [
            { k: "TSH", val: "2.14", unit: "uUI/mL", ref: "0.4 - 4.0" },
            { k: "T4 LIBRE", val: "1.2", unit: "ng/dL", ref: "0.8 - 1.8" }
        ]
    },
    {
        id: "pruebas_inflamatorias",
        category: "INMUNOLOGIA",
        name: "Marcadores Inflamatorios (PCR, VSG)",
        fields: [
            { k: "PROTEINA C REACTIVA (PCR)", val: "3.2", unit: "mg/L", ref: "< 5.0" },
            { k: "VELOCIDAD DE SEDIMENTACION (VSG)", val: "12", unit: "mm/h", ref: "0 - 20" }
        ]
    },
    {
        id: "pruebas_hepaticas",
        category: "ENZIMAS",
        name: "Perfil Hepático (TGO, TGP, Bilirrubinas)",
        fields: [
            { k: "TGO / AST", val: "22", unit: "U/L", ref: "0 - 35" },
            { k: "TGP / ALT", val: "25", unit: "U/L", ref: "0 - 45" },
            { k: "BILIRRUBINA TOTAL", val: "0.8", unit: "mg/dL", ref: "0.3 - 1.2" }
        ]
    },
    {
        id: "marcador_cardiaco",
        category: "CARDIOLOGIA",
        name: "Enzimas Cardíacas (Troponina, CK-MB)",
        fields: [
            { k: "TROPONINA T", val: "0.01", unit: "ng/mL", ref: "< 0.04" },
            { k: "CK-MB", val: "12", unit: "U/L", ref: "0 - 25" }
        ]
    },
    {
        id: "serologia_vdrl",
        category: "SEROLOGIA",
        name: "Prueba Serológica VDRL / RPR",
        fields: [
            { k: "VDRL / RPR", val: "No Reactivo", unit: "", ref: "No Reactivo" }
        ]
    },
    {
        id: "coagulacion_avanzada",
        category: "COAGULACION",
        name: "Fibrinógeno y Dímero D",
        fields: [
            { k: "FIBRINOGENO", val: "300", unit: "mg/dL", ref: "200 - 400" },
            { k: "DIMERO D", val: "200", unit: "ng/mL", ref: "< 500" }
        ]
    },
    {
        id: "coprologico",
        category: "COPROLOGICO",
        name: "Coprológico / Coproscópico",
        fields: [
            { k: "CONSISTENCIA", val: "Semisólida", unit: "", ref: "Semisólida" },
            { k: "MOCO", val: "Negativo", unit: "", ref: "Negativo" },
            { k: "PARASITOS", val: "No se observan", unit: "", ref: "Negativo" }
        ]
    },
    {
        id: "glicemia_post",
        category: "QUIMICA SANGUINEA",
        name: "Curva de Glicemia (Post-prandial)",
        fields: [
            { k: "GLICEMIA 1 HORA", val: "125", unit: "mg/dL", ref: "< 140" },
            { k: "GLICEMIA 2 HORAS", val: "110", unit: "mg/dL", ref: "< 120" }
        ]
    },
    {
        id: "perfil_iron",
        category: "HEMATOLOGIA",
        name: "Metabolismo del Hierro (Ferritina, Hierro)",
        fields: [
            { k: "HIERRO SERICO", val: "90", unit: "ug/dL", ref: "60 - 160" },
            { k: "FERRITINA", val: "85", unit: "ng/mL", ref: "30 - 300" }
        ]
    }
];

let currentOrderCounter = 4575;
let orders999Database = [];
let currentSelectedExams = [];
let isSigned = false;

let pacientesSistema = [
    { docType: "CC", docNum: "2424", name: "DANIEL OROZCO", dob: "1990-01-01", sex: "Masculino", phone: "3000000000", email: "daniel@correo.com" },
    { docType: "CC", docNum: "3333", name: "Carlos Andrés Pérez", dob: "1985-04-12", sex: "Masculino", phone: "3001112233", email: "carlos@correo.com" }
];

document.addEventListener("DOMContentLoaded", () => {
    const savedPacientes = localStorage.getItem('emizlab_pacientes');
    if (savedPacientes) {
        try { pacientesSistema = JSON.parse(savedPacientes); } catch (e) { console.error(e); }
    }

    const savedOrders = localStorage.getItem('emizlab_orders');
    if (savedOrders) {
        try {
            orders999Database = JSON.parse(savedOrders);
            if (orders999Database.length > 0) {
                const maxNum = Math.max(...orders999Database.map(o => o.orderNum));
                if (maxNum >= currentOrderCounter) currentOrderCounter = maxNum + 1;
            }
        } catch (e) { console.error(e); }
    }

    if (document.getElementById("patientPortalName")) {
        initPatientPortal();
    } else {
        renderAdmin999Panel();
    }

    const docNumInput = document.getElementById('manualDocNum');
    const docTypeSelect = document.getElementById('manualDocType');
    if (docNumInput) docNumInput.addEventListener('input', buscarPacienteRegistrado);
    if (docTypeSelect) docTypeSelect.addEventListener('change', buscarPacienteRegistrado);

    // Selector dinámico de médico
    const originalDoctorInput = document.getElementById('manualDoctor');
    const doctorInputContainer = originalDoctorInput?.parentNode;
    if (originalDoctorInput && doctorInputContainer) {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '6px';

        const selectDoctor = document.createElement('select');
        selectDoctor.id = 'manualDoctorSelect';
        selectDoctor.className = originalDoctorInput.className;
        selectDoctor.innerHTML = `
            <option value="ARMANDO CUESTAS">ARMANDO CUESTAS</option>
            <option value="RAFAEL RODRIGUEZ">RAFAEL RODRIGUEZ</option>
            <option value="OTRO">Otro (Escribir nombre...)</option>
        `;

        const inputOtroDoctor = document.createElement('input');
        inputOtroDoctor.type = 'text';
        inputOtroDoctor.id = 'manualDoctorOtroInput';
        inputOtroDoctor.className = originalDoctorInput.className;
        inputOtroDoctor.placeholder = 'Escriba el nombre del médico...';
        inputOtroDoctor.style.display = 'none';

        selectDoctor.onchange = function() {
            if (selectDoctor.value === 'OTRO') {
                inputOtroDoctor.style.display = 'block';
                inputOtroDoctor.focus();
            } else {
                inputOtroDoctor.style.display = 'none';
                inputOtroDoctor.value = '';
            }
        };

        doctorInputContainer.replaceChild(wrapper, originalDoctorInput);
        wrapper.appendChild(selectDoctor);
        wrapper.appendChild(inputOtroDoctor);
    }
});

// ==========================================
// RENDERIZADO DEL PANEL ADMIN DE ÓRDENES
// ==========================================
function renderAdmin999Panel() {
    const tbody = document.getElementById('tableOrders999');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (orders999Database.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">No hay órdenes registradas.</td></tr>`;
        return;
    }

    orders999Database.forEach(ord => {
        const isPub = ord.isPublished === true;
        
        // 1. Icono PDF listo o Reloj Salmón limpio
        const accionEstado = isPub ? `
            <button onclick="generarPDF(${ord.orderNum})" title="Descargar PDF" style="background:transparent; border:none; padding:2px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center;">
                <svg width="24" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" stroke="#334155" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="#ffffff"/>
                    <path d="M14 2V8H20" stroke="#334155" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="7" y="12" width="10" height="5" rx="1" fill="#dc2626"/>
                    <text x="12" y="15.8" font-size="3.5" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="Arial, sans-serif">PDF</text>
                </svg>
            </button>
        ` : `
            <span title="Esperando resultados" style="display:inline-flex; align-items:center; justify-content:center; padding:2px;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </span>
        `;

        // 2. Botón Editar
        const botonEditar = `
            <button onclick="openManualResultModal(${ord.orderNum})" title="Editar Orden" style="background:#f0f9ff; border:1.5px solid #38bdf8; color:#0284c7; border-radius:6px; padding:4px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; box-sizing:border-box;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
        `;

        // 3. Fila de Datos estructurada en 5 columnas
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #f1f5f9';
        tr.innerHTML = `
            <td style="padding: 10px 8px; vertical-align: middle;">
                <strong style="color: #00778c; font-size: 14px;">#${ord.orderNum}</strong>
            </td>
            <td style="padding: 10px 8px; vertical-align: middle; color: #64748b; font-size: 12.5px; white-space: nowrap;">
                ${ord.date || fechaHoyFormateada}
            </td>
            <td style="padding: 10px 8px; vertical-align: middle; color: #334155; font-size: 13px; white-space: nowrap;">
                ${ord.docType || 'CC'} ${ord.docNum || ''}
            </td>
            <td style="padding: 10px 8px; vertical-align: middle; color: #334155; font-size: 13px;">
                ${ord.patientName || 'Sin Nombre'}
            </td>
            <td style="padding: 10px 8px; vertical-align: middle;">
                <div style="display: flex; gap: 8px; align-items: center;">
                    ${accionEstado}
                    ${botonEditar}
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// ==========================================
// CÁLCULO DE EDAD EXACTO (Días, Meses, Años)
// ==========================================
function calcularEdadDesdeFecha() {
    const dateInput = document.getElementById('manualDobDate');
    const ageDisplay = document.getElementById('manualAgeDisplay');
    
    if (!dateInput || !ageDisplay || !dateInput.value) return;

    const fechaNac = new Date(dateInput.value + 'T00:00:00');
    const hoy = new Date();

    if (fechaNac > hoy) {
        ageDisplay.value = "Inválida";
        return;
    }

    let anos = hoy.getFullYear() - fechaNac.getFullYear();
    let meses = hoy.getMonth() - fechaNac.getMonth();
    let dias = hoy.getDate() - fechaNac.getDate();

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    if (anos >= 1) {
        ageDisplay.value = `${anos} ${anos === 1 ? 'Año' : 'Años'}`;
    } else if (meses >= 1) {
        ageDisplay.value = `${meses} ${meses === 1 ? 'Mes' : 'Meses'}`;
    } else {
        const diffTime = Math.abs(hoy - fechaNac);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        ageDisplay.value = `${diffDays} ${diffDays === 1 ? 'Día' : 'Días'}`;
    }
}

function buscarPacienteRegistrado() {
    const docType = document.getElementById('manualDocType')?.value;
    const docNum = document.getElementById('manualDocNum')?.value.trim();
    if (!docNum) return;

    const paciente = pacientesSistema.find(p => p.docType === docType && p.docNum === docNum);
    if (paciente) {
        if (document.getElementById('manualPatientName')) document.getElementById('manualPatientName').value = paciente.name || '';
        if (document.getElementById('manualDobDate')) document.getElementById('manualDobDate').value = paciente.dob || '';
        calcularEdadDesdeFecha();
        if (document.getElementById('manualSex')) document.getElementById('manualSex').value = paciente.sex || '';
        if (document.getElementById('manualPhone')) document.getElementById('manualPhone').value = paciente.phone || '';
        if (document.getElementById('manualEmail')) document.getElementById('manualEmail').value = paciente.email || '';
    }
}

function filterExamDropdown() {
    const searchInput = document.getElementById('searchExamInput');
    const dropdown = document.getElementById('searchDropdown');
    if (!searchInput || !dropdown) return;

    const query = searchInput.value.toLowerCase().trim();
    dropdown.innerHTML = '';

    if (!query) {
        dropdown.classList.add('hidden');
        return;
    }

    const filtered = availableExamsList.filter(e => e.name.toLowerCase().includes(query) || e.category.toLowerCase().includes(query));
    if (filtered.length === 0) {
        dropdown.innerHTML = `<div style="padding: 8px; color:var(--text-muted);">No hay coincidencias</div>`;
    } else {
        filtered.forEach(e => {
            const item = document.createElement('div');
            item.style.padding = '8px';
            item.style.cursor = 'pointer';
            item.innerText = `[${e.category}] ${e.name}`;
            item.onclick = () => addExamToOrder(e);
            dropdown.appendChild(item);
        });
    }
    dropdown.classList.remove('hidden');
}

function addExamToOrder(examObj) {
    document.getElementById('searchDropdown')?.classList.add('hidden');
    if (document.getElementById('searchExamInput')) document.getElementById('searchExamInput').value = '';

    if (currentSelectedExams.some(e => e.id === examObj.id)) {
        alert('Este examen ya fue agregado.');
        return;
    }

    currentSelectedExams.push({
        id: examObj.id,
        category: examObj.category,
        name: examObj.name,
        results: examObj.fields.map(f => ({ k: f.k, val: f.val || '', unit: f.unit || '', ref: f.ref || '' }))
    });
    renderSelectedExams();
}

function renderSelectedExams() {
    const container = document.getElementById('addedExamsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (currentSelectedExams.length === 0) {
        container.innerHTML = `<p style="font-size:12px; color:var(--text-muted); font-style:italic;">No se han agregado exámenes a la orden.</p>`;
        return;
    }

    currentSelectedExams.forEach((ex, exIndex) => {
        const card = document.createElement('div');
        card.style.cssText = "border:1px solid #e2e8f0; padding:10px; border-radius:6px; margin-bottom:10px; background:#f8fafc;";
        
        let fieldsHTML = '';
        ex.results.forEach((res, resIndex) => {
            fieldsHTML += `
                <div style="display:grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap:6px; margin-bottom:6px; align-items:center;">
                    <span style="font-size:11px; color:#475569;">${res.k}</span>
                    <input type="text" value="${res.val}" onchange="updateResultField(${exIndex}, ${resIndex}, 'val', this.value)" style="font-size:11px; padding:4px;" class="form-control">
                    <input type="text" value="${res.unit}" onchange="updateResultField(${exIndex}, ${resIndex}, 'unit', this.value)" style="font-size:11px; padding:4px;" class="form-control">
                    <input type="text" value="${res.ref}" onchange="updateResultField(${exIndex}, ${resIndex}, 'ref', this.value)" style="font-size:11px; padding:4px;" class="form-control">
                </div>
            `;
        });

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 12px; color: var(--primary-dark);">${ex.category} - ${ex.name}</strong>
                <button type="button" onclick="removeExamFromOrder(${exIndex})" style="background:none; border:none; color:#e11d48; cursor:pointer; font-size:12px;">Eliminar</button>
            </div>
            ${fieldsHTML}
        `;
        container.appendChild(card);
    });
}

function updateResultField(exIndex, resIndex, key, val) {
    if (currentSelectedExams[exIndex]?.results[resIndex]) {
        currentSelectedExams[exIndex].results[resIndex][key] = val;
    }
}

function removeExamFromOrder(exIndex) {
    currentSelectedExams.splice(exIndex, 1);
    renderSelectedExams();
}

function signOrder() {
    isSigned = true;
    const status = document.getElementById('signatureStatus');
    if (status) {
        status.innerText = 'Firmado por CLAUDIA DANIELA MONTES (TP: 99441)';
        status.style.color = '#059669';
    }
}

function openManualResultModal(editOrderNum = null) {
    currentSelectedExams = [];
    isSigned = false;
    
    if (document.getElementById('searchExamInput')) document.getElementById('searchExamInput').value = '';
    const status = document.getElementById('signatureStatus');
    if (status) {
        status.innerText = 'Pendiente de firma';
        status.style.color = '#e11d48';
    }

    const selectDoctor = document.getElementById('manualDoctorSelect');
    const inputOtroDoctor = document.getElementById('manualDoctorOtroInput');
    const examSectionContainer = document.getElementById('examSectionContainer');
    const signatureSectionContainer = document.getElementById('signatureSectionContainer');
    const mainSubmitBtn = document.querySelector('#manualResultModal button[type="submit"]') || document.getElementById('btnPublicarOrden');

    if (editOrderNum) {
        const ord = orders999Database.find(o => o.orderNum === editOrderNum);
        if (ord) {
            if (document.getElementById('manualModalTitle')) document.getElementById('manualModalTitle').innerText = `Digitación de Resultados (Orden #${ord.orderNum})`;
            if (document.getElementById('manualEditOrderId')) document.getElementById('manualEditOrderId').value = ord.orderNum;
            if (document.getElementById('manualDocType')) document.getElementById('manualDocType').value = ord.docType;
            if (document.getElementById('manualDocNum')) document.getElementById('manualDocNum').value = ord.docNum;
            if (document.getElementById('manualPatientName')) document.getElementById('manualPatientName').value = ord.patientName;
            if (document.getElementById('manualDobDate')) document.getElementById('manualDobDate').value = ord.dobDate || '';
            if (document.getElementById('manualAgeDisplay')) document.getElementById('manualAgeDisplay').value = ord.ageDisplay || '';
            if (document.getElementById('manualSex')) document.getElementById('manualSex').value = ord.sex || '';
            if (document.getElementById('manualPhone')) document.getElementById('manualPhone').value = ord.phone || '';
            if (document.getElementById('manualEmail')) document.getElementById('manualEmail').value = ord.email || '';
            
            if (selectDoctor) {
                selectDoctor.value = 'ARMANDO CUESTAS';
            }
            
            currentSelectedExams = JSON.parse(JSON.stringify(ord.exams || []));
            if (ord.isSigned) {
                isSigned = true;
                if (status) {
                    status.innerText = 'Firmado por CLAUDIA DANIELA MONTES (TP: 99441)';
                    status.style.color = '#059669';
                }
            }
        }
        if (examSectionContainer) examSectionContainer.style.display = 'block';
        if (signatureSectionContainer) signatureSectionContainer.style.display = 'block';
        if (mainSubmitBtn) mainSubmitBtn.innerText = 'Publicar';
    } else {
        if (document.getElementById('manualModalTitle')) document.getElementById('manualModalTitle').innerText = `Agregar Orden del Paciente (Orden #${currentOrderCounter})`;
        if (document.getElementById('manualEditOrderId')) document.getElementById('manualEditOrderId').value = '';
        if (document.getElementById('manualDocType')) document.getElementById('manualDocType').value = 'CC';
        if (document.getElementById('manualDocNum')) document.getElementById('manualDocNum').value = '';
        if (document.getElementById('manualPatientName')) document.getElementById('manualPatientName').value = '';
        if (document.getElementById('manualDobDate')) document.getElementById('manualDobDate').value = '';
        if (document.getElementById('manualAgeDisplay')) document.getElementById('manualAgeDisplay').value = '';
        if (document.getElementById('manualSex')) document.getElementById('manualSex').value = '';
        if (document.getElementById('manualPhone')) document.getElementById('manualPhone').value = '';
        if (document.getElementById('manualEmail')) document.getElementById('manualEmail').value = '';
        
        if (examSectionContainer) examSectionContainer.style.display = 'none';
        if (signatureSectionContainer) signatureSectionContainer.style.display = 'none';
        if (mainSubmitBtn) mainSubmitBtn.innerText = 'Agregar';
    }

    renderSelectedExams();
    document.getElementById('manualResultModal')?.classList.remove('hidden');
}

function closeManualResultModal() {
    document.getElementById('manualResultModal')?.classList.add('hidden');
}

function handleSaveAndPublishOrder(event) {
    if (event) event.preventDefault();

    const editOrderNum = document.getElementById('manualEditOrderId')?.value;
    const docType = document.getElementById('manualDocType')?.value || 'CC';
    const docNum = document.getElementById('manualDocNum')?.value.trim();
    const patientName = document.getElementById('manualPatientName')?.value.trim();
    const dobDate = document.getElementById('manualDobDate')?.value.trim() || '';
    const ageDisplay = document.getElementById('manualAgeDisplay')?.value.trim() || '';
    const sex = document.getElementById('manualSex')?.value.trim() || '';
    const phone = document.getElementById('manualPhone')?.value.trim() || '';
    const email = document.getElementById('manualEmail')?.value.trim() || '';

    if (!docNum || !patientName) {
        alert('Por favor complete los campos obligatorios del paciente.');
        return;
    }

    let doctor = 'ARMANDO CUESTAS';
    const selectDoctor = document.getElementById('manualDoctorSelect');
    const inputOtroDoctor = document.getElementById('manualDoctorOtroInput');
    if (selectDoctor && selectDoctor.value === 'OTRO') {
        doctor = inputOtroDoctor ? inputOtroDoctor.value.trim().toUpperCase() : 'OTRO';
    } else if (selectDoctor) {
        doctor = selectDoctor.value;
    }

    // Integración portal de pacientes
    let pacientesPortal = JSON.parse(localStorage.getItem('emizlab_portal_pacientes') || '{}');
    pacientesPortal[docNum] = {
        tipoDoc: docType,
        documento: docNum,
        nombre: patientName,
        activo: true
    };
    localStorage.setItem('emizlab_portal_pacientes', JSON.stringify(pacientesPortal));

    const existingPatientIndex = pacientesSistema.findIndex(p => p.docType === docType && p.docNum === docNum);
    if (existingPatientIndex >= 0) {
        pacientesSistema[existingPatientIndex] = { docType, docNum, name: patientName, dob: dobDate, sex, phone, email };
    } else {
        pacientesSistema.push({ docType, docNum, name: patientName, dob: dobDate, sex, phone, email });
    }
    localStorage.setItem('emizlab_pacientes', JSON.stringify(pacientesSistema));

    if (!editOrderNum) {
        const newOrder = {
            orderNum: currentOrderCounter,
            docType: docType,
            docNum: docNum,
            patientName: patientName,
            dobDate: dobDate,
            ageDisplay: ageDisplay,
            sex: sex,
            phone: phone,
            email: email,
            doctor: doctor,
            exams: [],
            isSigned: false,
            isPublished: false,
            date: fechaHoyFormateada
        };
        orders999Database.unshift(newOrder);
        localStorage.setItem('emizlab_orders', JSON.stringify(orders999Database));

        alert(`Orden #${currentOrderCounter} agregada exitosamente.`);
        currentOrderCounter++;

        closeManualResultModal();
        renderAdmin999Panel();
        return;
    }

    if (currentSelectedExams.length === 0) {
        alert('Debe agregar al menos un examen a la orden.');
        return;
    }

    if (!isSigned) {
        alert('Debe firmar la orden antes de publicar.');
        return;
    }

    const ord = orders999Database.find(o => o.orderNum === parseInt(editOrderNum));
    if (ord) {
        ord.docType = docType;
        ord.docNum = docNum;
        ord.patientName = patientName;
        ord.dobDate = dobDate;
        ord.ageDisplay = ageDisplay;
        ord.sex = sex;
        ord.phone = phone;
        ord.email = email;
        ord.doctor = doctor;
        ord.exams = JSON.parse(JSON.stringify(currentSelectedExams));
        ord.isSigned = true;
        ord.isPublished = true;

        localStorage.setItem('emizlab_orders', JSON.stringify(orders999Database));
        alert(`Orden #${editOrderNum} actualizada y publicada correctamente.`);
    }

    closeManualResultModal();
    renderAdmin999Panel();
}

function obtenerBase64DeCSS(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return '';
    const bgImage = window.getComputedStyle(el).backgroundImage;
    if (!bgImage || bgImage === 'none') return '';
    const match = bgImage.match(/url\((['"]?)(data:image\/[^'"]+)\1\)/);
    return match ? match[2] : '';
}

function generarPDF(orderNum) {
    const ord = orders999Database.find(o => o.orderNum === orderNum);
    if (!ord) return;

    try {
        const { jsPDF } = window.jspdf;
        // Documento tamaño carta en mm (215.9 x 279.4 mm)
        const doc = new jsPDF('p', 'mm', 'letter');

        const logoDataUrl = obtenerBase64DeCSS('dummy-logo');
        const firmaDataUrl = obtenerBase64DeCSS('dummy-firma');

        // Encabezado principal
        if (logoDataUrl) {
            doc.addImage(logoDataUrl, logoDataUrl.includes('png') ? 'PNG' : 'JPEG', 14, 8, 42, 11);
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("LABORATORIO CLINICO DE CIUDAD CARIBE", 108, 13, { align: "center" });
        
        doc.setFontSize(8.5);
        doc.text("CALLE 2 No. 1 - 01 - Tels 605 258 0000", 108, 17.5, { align: "center" });
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(`Fecha de impresión: ${fechaHoyFormateada}`, 201, 12, { align: "right" });
        doc.text(`Hora: ${horaHoyFormateada}`, 201, 16, { align: "right" });

        // Cuadro de datos del paciente
        doc.setDrawColor(5, 150, 105);
        doc.setLineWidth(0.4);
        doc.roundedRect(14, 21, 187.9, 28, 2.5, 2.5, 'D');

        doc.setFont("helvetica", "bold");
        doc.text("Paciente:", 18, 26.5);
        doc.text("Identificación:", 18, 31.5);
        doc.text("F. Nac / Edad:", 18, 36.5);
        doc.text("Sexo:", 18, 41.5);
        doc.text("Teléfono:", 18, 46.5);

        doc.setFont("helvetica", "normal");
        doc.text(ord.patientName || '', 45, 26.5);
        doc.text(`${ord.docType || ''} ${ord.docNum || ''}`, 45, 31.5);
        
        let fechaNacFormateadaPdf = '';
        if (ord.dobDate) {
            const partes = ord.dobDate.split('-');
            fechaNacFormateadaPdf = partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]} - ${ord.ageDisplay}` : `${ord.dobDate} - ${ord.ageDisplay}`;
        }
        doc.text(fechaNacFormateadaPdf, 45, 36.5);
        doc.text(ord.sex || '', 45, 41.5);
        doc.text(ord.phone || '', 45, 46.5);

        doc.setFont("helvetica", "bold");
        doc.text("Orden No.", 115, 26.5);
        doc.text("Médico Solicitante:", 115, 31.5);
        doc.text("Fecha Recepción:", 115, 36.5);

        doc.setFont("helvetica", "normal");
        doc.text(`${ord.orderNum}`, 148, 26.5);
        doc.text(ord.doctor || 'ARMANDO CUESTAS', 148, 31.5);
        doc.text(ord.date || fechaHoyFormateada, 148, 36.5);

        // Estructura de la tabla
        let tableRows = [];
        ord.exams.forEach(ex => {
            tableRows.push([
                { content: ex.category.toUpperCase(), colSpan: 4, styles: { fontStyle: 'bold', fillColor: [245, 245, 245], textColor: [0, 0, 0] } }
            ]);
            ex.results.forEach(res => {
                tableRows.push([res.k, res.val || '', res.unit || '', res.ref || '']);
            });
        });

        // Generación de AutoTable
        doc.autoTable({
            startY: 52,
            head: [['EXAMEN', 'RESULTADO', 'UNIDADES', 'VALORES DE REFERENCIA']],
            body: tableRows,
            theme: 'plain',
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', fontSize: 8, lineWidth: { bottom: 0.4 }, lineColor: [0, 0, 0] },
            bodyStyles: { fontSize: 7.5, textColor: [0, 0, 0], cellPadding: 1.5 },
            columnStyles: { 0: { cellWidth: 72 }, 1: { cellWidth: 36 }, 2: { cellWidth: 32 }, 3: { cellWidth: 47.9 } },
            margin: { left: 14, right: 14, bottom: 25 },
            didDrawPage: function (data) {
                // Pie de página: Texto legal (Centrado en la parte inferior)
                doc.setFont("helvetica", "italic");
                doc.setFontSize(7);
                doc.setTextColor(100, 100, 100);
                doc.text(
                    "La lectura y análisis de los exámenes de laboratorio es competencia exclusiva del profesional médico.",
                    108,
                    268,
                    { align: "center" }
                );
            }
        });

        // Control de posición para la Firma (Evita solapamientos con el pie de página)
        let finalY = doc.lastAutoTable.finalY + 12;
        if (finalY > 225) { 
            doc.addPage(); 
            finalY = 30; 
        }

        if (firmaDataUrl) doc.addImage(firmaDataUrl, 'PNG', 14, finalY, 35, 12);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.text("CLAUDIA DANIELA MONTES", 14, finalY + 14.5);
        doc.setFont("helvetica", "normal");
        doc.text("BACTERIOLOGA TP: 99441", 14, finalY + 18.5);

        // Numeración de páginas en la esquina inferior derecha (Pag 1, Pag 2, etc.)
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(7.5);
            doc.setTextColor(100, 100, 100);
            doc.text(`Pag ${i}`, 201, 268, { align: "right" });
        }

        // --- APERTURA DEL MODAL INTREGRADO (OPCIÓN 3) ---
        const pdfUrl = doc.output('bloburl');
        const modalFrame = document.getElementById('pdfFrame');
        const modalContainer = document.getElementById('pdfPreviewModal');

        if (modalFrame && modalContainer) {
            modalFrame.src = pdfUrl;
            modalContainer.style.display = 'flex';
        } else {
            // Respaldar en caso de que el HTML del modal no esté en el DOM
            window.open(pdfUrl, '_blank');
        }

    } catch (error) {
        console.error("Error al generar el PDF:", error);
    }
}

// Función auxiliar para cerrar el modal de previsualización
function cerrarModalPdf() {
    const modalContainer = document.getElementById('pdfPreviewModal');
    const modalFrame = document.getElementById('pdfFrame');
    
    if (modalContainer) modalContainer.style.display = 'none';
    if (modalFrame) modalFrame.src = '';
}

// Exponer la función de cierre globalmente
window.cerrarModalPdf = cerrarModalPdf;

// ==========================================
// PORTAL DE PACIENTES
// ==========================================

function handleLogin(event, datosPaciente) {
    if (event) event.preventDefault();

    const inputDoc = document.getElementById('loginDocInput')?.value.trim() || datosPaciente?.documento || datosPaciente?.docNum;

    if (!inputDoc) {
        alert('Por favor ingrese su número de documento.');
        return;
    }

    let pacientesPortal = JSON.parse(localStorage.getItem('emizlab_portal_pacientes')) || {};
    
    let pacienteInfo = pacientesPortal[inputDoc];
    if (!pacienteInfo) {
        const encontrado = pacientesSistema.find(p => p.docNum === inputDoc);
        pacienteInfo = {
            tipoDoc: encontrado ? encontrado.docType : 'CC',
            documento: inputDoc,
            nombre: encontrado ? encontrado.name : `PACIENTE ${inputDoc}`,
            activo: true
        };
        pacientesPortal[inputDoc] = pacienteInfo;
        localStorage.setItem('emizlab_portal_pacientes', JSON.stringify(pacientesPortal));
    }

    const patientSession = {
        name: pacienteInfo.nombre,
        docType: pacienteInfo.tipoDoc,
        docNum: pacienteInfo.documento
    };

    localStorage.setItem("activePatient", JSON.stringify(patientSession));
    window.location.href = "pacientes.html"; 
}

function initPatientPortal() {
    const patientData = JSON.parse(localStorage.getItem("activePatient"));
    if (!patientData) {
        window.location.href = "index.html"; 
        return;
    }

    const pName = patientData.name || 'Paciente';
    const pDocType = patientData.docType || '';
    const pDocNum = patientData.docNum || '';

    const nameEl = document.getElementById("patientPortalName");
    const docEl = document.getElementById("patientPortalDoc");
    if (nameEl) nameEl.innerText = `Paciente: ${pName}`;
    if (docEl) docEl.innerText = `${pDocType}: ${pDocNum}`;

    const container = document.getElementById("patientOrdersContainer");
    if (container) {
        container.innerHTML = '';
        const patientOrders = orders999Database.filter(ord => ord.docNum === pDocNum && ord.isPublished === true);

        if (patientOrders.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">No tienes exámenes publicados por el momento.</p>`;
            return;
        }

        patientOrders.forEach(ord => {
            container.innerHTML += `
                <div style="border:1px solid #e2e8f0; padding:15px; border-radius:8px; margin-bottom:10px; background:#fff; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong style="color:var(--primary-dark);">Orden #${ord.orderNum}</strong>
                        <p style="margin:4px 0; font-size:13px; color:#475569;">Fecha: ${ord.date} | Médico: ${ord.doctor}</p>
                    </div>
                    <button onclick="generarPDF(${ord.orderNum})" style="background:#059669; color:white; border:none; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:500;">Descargar PDF</button>
                </div>
            `;
        });
    }
}

function handlePatientLogout() {
    localStorage.removeItem("activePatient");
    window.location.href = "index.html";
}

// Exponer funciones globales
window.handleLogout = handlePatientLogout;
window.generarPDF = generarPDF;
window.openManualResultModal = openManualResultModal;
window.closeManualResultModal = closeManualResultModal;
window.filterExamDropdown = filterExamDropdown;
window.addExamToOrder = addExamToOrder;
window.removeExamFromOrder = removeExamFromOrder;
window.updateResultField = updateResultField;
window.signOrder = signOrder;
window.handleSaveAndPublishOrder = handleSaveAndPublishOrder;
window.calcularEdadDesdeFecha = calcularEdadDesdeFecha;
window.buscarPacienteRegistrado = buscarPacienteRegistrado;
window.handleLogin = handleLogin;
window.initPatientPortal = initPatientPortal;