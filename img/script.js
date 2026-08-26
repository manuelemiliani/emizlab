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

// Base de datos general de pacientes (sincronizada con localStorage)
let pacientesSistema = [
    { docType: "CC", docNum: "3333", name: "Carlos Andrés Pérez", dob: "1985-04-12", sex: "Masculino", phone: "3001112233" },
    { docType: "TI", docNum: "4444", name: "Valeria Sofía Gómez", dob: "2010-09-20", sex: "Femenino", phone: "3104445566" },
    { docType: "PPT", docNum: "5555", name: "Jesús David Martínez", dob: "1995-12-05", sex: "Masculino", phone: "3207778899" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Cargar pacientes de localStorage
    const savedPacientes = localStorage.getItem('emizlab_pacientes');
    if (savedPacientes) {
        try {
            pacientesSistema = JSON.parse(savedPacientes);
        } catch (e) {
            console.error("Error al cargar pacientes guardados", e);
        }
    }

    // Cargar órdenes de localStorage para persistencia real
    const savedOrders = localStorage.getItem('emizlab_orders');
    if (savedOrders) {
        try {
            orders999Database = JSON.parse(savedOrders);
            if (orders999Database.length > 0) {
                const maxNum = Math.max(...orders999Database.map(o => o.orderNum));
                if (maxNum >= currentOrderCounter) {
                    currentOrderCounter = maxNum + 1;
                }
            }
        } catch (e) {
            console.error("Error al cargar órdenes guardadas", e);
        }
    }

    // Detectar si estamos en pacientes.html o index.html automáticamente
    if (document.getElementById("patientPortalName")) {
        initPatientPortal();
    } else {
        renderAdmin999Panel();
    }

    const mainActionBtn = document.querySelector('button[onclick*="openManualResultModal"]') || document.getElementById('btnAddOrderMain');
    if (mainActionBtn) {
        mainActionBtn.innerText = "+ Agregar orden del paciente";
    }

    const docNumInput = document.getElementById('manualDocNum');
    const docTypeSelect = document.getElementById('manualDocType');

    if (docNumInput) {
        docNumInput.addEventListener('input', buscarPacienteRegistrado);
    }
    if (docTypeSelect) {
        docTypeSelect.addEventListener('change', buscarPacienteRegistrado);
    }

    const doctorInputContainer = document.getElementById('manualDoctor')?.parentNode;
    const originalDoctorInput = document.getElementById('manualDoctor');

    if (originalDoctorInput && doctorInputContainer) {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '6px';
        wrapper.id = 'doctorWrapperContainer';

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

function renderAdmin999Panel() {
    const tbody = document.getElementById('tableOrders999');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (orders999Database.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">No hay órdenes registradas. Haga clic en "+ Agregar orden del paciente" para empezar.</td></tr>`;
        return;
    }

    orders999Database.forEach(ord => {
        const isPub = ord.isPublished === true;
        const pdfBg = isPub ? '#059669' : '#94a3b8';
        const pdfCursor = isPub ? 'pointer' : 'not-allowed';
        const pdfAction = isPub ? `generarPDF(${ord.orderNum})` : `alert('Debe firmar y publicar la orden antes de poder ver el PDF.');`;

        tbody.innerHTML += `
            <tr>
                <td><strong style="color:var(--primary-dark);">#${ord.orderNum}</strong></td>
                <td>${ord.docType} &nbsp; ${ord.docNum}</td>
                <td><strong>${ord.patientName}</strong></td>
                <td>${ord.date}</td>
                <td>
                    <button onclick="openManualResultModal(${ord.orderNum})" class="btn-sm-action" style="background:#0284c7; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; margin-right:4px;">Editar</button>
                    <button onclick="${pdfAction}" class="btn-sm-action" style="background-color:${pdfBg}; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:${pdfCursor};">Ver PDF</button>
                </td>
            </tr>
        `;
    });
}

function calcularEdadDesdeFecha() {
    const dobInput = document.getElementById('manualDobDate').value;
    const ageDisplay = document.getElementById('manualAgeDisplay');
    if (!dobInput || !ageDisplay) return;

    const birthDate = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    ageDisplay.value = `${age} Años`;
}

function buscarPacienteRegistrado() {
    const docTypeEl = document.getElementById('manualDocType');
    const docNumEl = document.getElementById('manualDocNum');
    if (!docTypeEl || !docNumEl) return;

    const docType = docTypeEl.value;
    const docNum = docNumEl.value.trim();

    const pacienteEncontrado = pacientesSistema.find(p => p.docType === docType && p.docNum === docNum);

    const nameEl = document.getElementById('manualPatientName');
    const dobEl = document.getElementById('manualDobDate');
    const ageEl = document.getElementById('manualAgeDisplay');
    const sexEl = document.getElementById('manualSex');
    const phoneEl = document.getElementById('manualPhone');

    if (pacienteEncontrado) {
        if (nameEl) nameEl.value = pacienteEncontrado.name || '';
        if (dobEl) dobEl.value = pacienteEncontrado.dob || '';
        calcularEdadDesdeFecha();
        if (sexEl) sexEl.value = pacienteEncontrado.sex || '';
        if (phoneEl) phoneEl.value = pacienteEncontrado.phone || '';
    } else {
        if (nameEl) nameEl.value = '';
        if (dobEl) dobEl.value = '';
        if (ageEl) ageEl.value = '';
        if (sexEl) sexEl.value = '';
        if (phoneEl) phoneEl.value = '';
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

    const filtered = availableExamsList.filter(e => e.name.toLowerCase().includes(query) || e.id.toLowerCase().includes(query) || e.category.toLowerCase().includes(query));

    if (filtered.length === 0) {
        dropdown.innerHTML = `<div class="search-result-item" style="color:var(--text-muted); padding: 8px;">No hay coincidencias</div>`;
    } else {
        filtered.forEach(e => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
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
    const dropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchExamInput');
    if (dropdown) dropdown.classList.add('hidden');
    if (searchInput) searchInput.value = '';

    if (currentSelectedExams.some(e => e.id === examObj.id)) {
        alert('Este examen ya fue añadido a la orden.');
        return;
    }

    const examCopy = {
        id: examObj.id,
        category: examObj.category,
        name: examObj.name,
        results: examObj.fields.map(f => ({ k: f.k, val: f.val || '', unit: f.unit || '', ref: f.ref || '' }))
    };

    currentSelectedExams.push(examCopy);
    renderSelectedExams();
}

function renderSelectedExams() {
    const container = document.getElementById('addedExamsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (currentSelectedExams.length === 0) {
        container.innerHTML = `<p id="emptyExamsText" style="font-size:12px; color:var(--text-muted); font-style:italic;">No se han agregado exámenes a la orden.</p>`;
        return;
    }

    currentSelectedExams.forEach((ex, exIndex) => {
        const card = document.createElement('div');
        card.className = 'exam-item-card';

        let fieldsHTML = '';
        ex.results.forEach((res, resIndex) => {
            fieldsHTML += `
                <div style="display:grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap:6px; margin-bottom:6px; align-items:center;">
                    <span style="font-size:11px; color:#475569;">${res.k}</span>
                    <input type="text" value="${res.val}" onchange="updateResultField(${exIndex}, ${resIndex}, 'val', this.value)" placeholder="Resultado" class="form-control" style="font-size:11px; padding:4px 6px; height: auto;" required>
                    <input type="text" value="${res.unit}" onchange="updateResultField(${exIndex}, ${resIndex}, 'unit', this.value)" placeholder="Unidades" class="form-control" style="font-size:11px; padding:4px 6px; height: auto;">
                    <input type="text" value="${res.ref}" onchange="updateResultField(${exIndex}, ${resIndex}, 'ref', this.value)" placeholder="V. Ref" class="form-control" style="font-size:11px; padding:4px 6px; height: auto;">
                </div>
            `;
        });

        card.innerHTML = `
            <div class="exam-item-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="font-size: 12px; color: var(--primary-dark);">${ex.category} - ${ex.name}</strong>
                <button type="button" onclick="removeExamFromOrder(${exIndex})" style="background:none; border:none; color:#e11d48; cursor:pointer; font-size:12px;">Eliminar</button>
            </div>
            ${fieldsHTML}
        `;
        container.appendChild(card);
    });
}

function updateResultField(exIndex, resIndex, key, val) {
    if (currentSelectedExams[exIndex] && currentSelectedExams[exIndex].results[resIndex]) {
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
    if (!status) return;
    status.innerText = 'Firmado por CLAUDIA DANIELA MONTES (TP: 99441)';
    status.style.color = '#059669';
}

function openManualResultModal(editOrderNum = null) {
    currentSelectedExams = [];
    isSigned = false;
    
    const searchExamInput = document.getElementById('searchExamInput');
    if (searchExamInput) searchExamInput.value = '';
    
    const signatureStatus = document.getElementById('signatureStatus');
    if (signatureStatus) {
        signatureStatus.innerText = 'Pendiente de firma';
        signatureStatus.style.color = '#e11d48';
    }

    const selectDoctor = document.getElementById('manualDoctorSelect');
    const inputOtroDoctor = document.getElementById('manualDoctorOtroInput');

    const examSectionContainer = document.getElementById('examSectionContainer');
    const signatureSectionContainer = document.getElementById('signatureSectionContainer');
    const mainSubmitBtn = document.querySelector('#manualResultModal button[type="submit"]') || document.getElementById('btnPublicarOrden');

    if (editOrderNum) {
        const ord = orders999Database.find(o => o.orderNum === editOrderNum);
        if (ord) {
            const titleEl = document.getElementById('manualModalTitle');
            const editIdEl = document.getElementById('manualEditOrderId');
            const docTypeEl = document.getElementById('manualDocType');
            const docNumEl = document.getElementById('manualDocNum');
            const patientNameEl = document.getElementById('manualPatientName');
            const dobDateEl = document.getElementById('manualDobDate');
            const ageDisplayEl = document.getElementById('manualAgeDisplay');
            const sexEl = document.getElementById('manualSex');
            const phoneEl = document.getElementById('manualPhone');

            if (titleEl) titleEl.innerText = `Digitación de Resultados (Orden #${ord.orderNum})`;
            if (editIdEl) editIdEl.value = ord.orderNum;
            if (docTypeEl) docTypeEl.value = ord.docType;
            if (docNumEl) docNumEl.value = ord.docNum;
            if (patientNameEl) patientNameEl.value = ord.patientName;
            if (dobDateEl) dobDateEl.value = ord.dobDate || '';
            if (ageDisplayEl) ageDisplayEl.value = ord.ageDisplay || '';
            if (sexEl) sexEl.value = ord.sex || '';
            if (phoneEl) phoneEl.value = ord.phone || '';
            
            const docName = ord.doctor || 'ARMANDO CUESTAS';
            if (selectDoctor) {
                if (docName === 'ARMANDO CUESTAS' || docName === 'RAFAEL RODRIGUEZ') {
                    selectDoctor.value = docName;
                    if (inputOtroDoctor) {
                        inputOtroDoctor.style.display = 'none';
                        inputOtroDoctor.value = '';
                    }
                } else {
                    selectDoctor.value = 'OTRO';
                    if (inputOtroDoctor) {
                        inputOtroDoctor.style.display = 'block';
                        inputOtroDoctor.value = docName;
                    }
                }
            }
            
            currentSelectedExams = JSON.parse(JSON.stringify(ord.exams || []));
            if (ord.isSigned) {
                isSigned = true;
                if (signatureStatus) {
                    signatureStatus.innerText = 'Firmado por CLAUDIA DANIELA MONTES (TP: 99441)';
                    signatureStatus.style.color = '#059669';
                }
            }
        }
        
        if (examSectionContainer) examSectionContainer.style.display = 'block';
        if (signatureSectionContainer) signatureSectionContainer.style.display = 'block';
        if (mainSubmitBtn) mainSubmitBtn.innerText = 'Publicar';

    } else {
        const titleEl = document.getElementById('manualModalTitle');
        const editIdEl = document.getElementById('manualEditOrderId');
        const docTypeEl = document.getElementById('manualDocType');
        const docNumEl = document.getElementById('manualDocNum');
        const patientNameEl = document.getElementById('manualPatientName');
        const dobDateEl = document.getElementById('manualDobDate');
        const ageDisplayEl = document.getElementById('manualAgeDisplay');
        const sexEl = document.getElementById('manualSex');
        const phoneEl = document.getElementById('manualPhone');

        if (titleEl) titleEl.innerText = `Agregar Orden del Paciente (Orden #${currentOrderCounter})`;
        if (editIdEl) editIdEl.value = '';
        if (docTypeEl) docTypeEl.value = 'CC';
        if (docNumEl) docNumEl.value = '';
        if (patientNameEl) patientNameEl.value = '';
        if (dobDateEl) dobDateEl.value = '';
        if (ageDisplayEl) ageDisplayEl.value = '';
        if (sexEl) sexEl.value = '';
        if (phoneEl) phoneEl.value = '';
        
        if (selectDoctor) selectDoctor.value = 'ARMANDO CUESTAS';
        if (inputOtroDoctor) {
            inputOtroDoctor.style.display = 'none';
            inputOtroDoctor.value = '';
        }

        if (examSectionContainer) examSectionContainer.style.display = 'none';
        if (signatureSectionContainer) signatureSectionContainer.style.display = 'none';
        if (mainSubmitBtn) mainSubmitBtn.innerText = 'Agregar';
    }

    renderSelectedExams();
    const modal = document.getElementById('manualResultModal');
    if (modal) modal.classList.remove('hidden');
}

function closeManualResultModal() {
    const modal = document.getElementById('manualResultModal');
    if (modal) modal.classList.add('hidden');
    
    const examSectionContainer = document.getElementById('examSectionContainer');
    const signatureSectionContainer = document.getElementById('signatureSectionContainer');
    if (examSectionContainer) examSectionContainer.style.display = 'block';
    if (signatureSectionContainer) signatureSectionContainer.style.display = 'block';
}

function handleSaveAndPublishOrder(event) {
    if (event) event.preventDefault();

    const editOrderNumEl = document.getElementById('manualEditOrderId');
    const docTypeEl = document.getElementById('manualDocType');
    const docNumEl = document.getElementById('manualDocNum');
    const patientNameEl = document.getElementById('manualPatientName');
    const dobDateEl = document.getElementById('manualDobDate');
    const ageDisplayEl = document.getElementById('manualAgeDisplay');
    const sexEl = document.getElementById('manualSex');
    const phoneEl = document.getElementById('manualPhone');

    if (!docNumEl || !patientNameEl) return;

    const editOrderNum = editOrderNumEl ? editOrderNumEl.value : '';
    const docType = docTypeEl ? docTypeEl.value : 'CC';
    const docNum = docNumEl.value.trim();
    const patientName = patientNameEl.value.trim();
    const dobDate = dobDateEl ? dobDateEl.value.trim() : '';
    const ageDisplay = ageDisplayEl ? ageDisplayEl.value.trim() : '';
    const sex = sexEl ? sexEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    
    const selectDoctor = document.getElementById('manualDoctorSelect');
    const inputOtroDoctor = document.getElementById('manualDoctorOtroInput');
    let doctor = 'ARMANDO CUESTAS';
    if (selectDoctor) {
        if (selectDoctor.value === 'OTRO') {
            doctor = inputOtroDoctor ? inputOtroDoctor.value.trim().toUpperCase() : '';
            if (!doctor) {
                alert('Por favor, escriba el nombre del médico.');
                if (inputOtroDoctor) inputOtroDoctor.focus();
                return;
            }
        } else {
            doctor = selectDoctor.value;
        }
    }

    // ==========================================
    // INTEGRACIÓN: Registrar o actualizar acceso al Portal de Pacientes
    // ==========================================
    let pacientesPortal = JSON.parse(localStorage.getItem('emizlab_portal_pacientes') || '{}');
    if (!pacientesPortal[docNum]) {
        pacientesPortal[docNum] = {
            tipoDoc: docType,
            documento: docNum,
            nombre: patientName,
            activo: true
        };
        localStorage.setItem('emizlab_portal_pacientes', JSON.stringify(pacientesPortal));
    }
    // ==========================================

    const existingPatientIndex = pacientesSistema.findIndex(p => p.docType === docType && p.docNum === docNum);
    if (existingPatientIndex >= 0) {
        pacientesSistema[existingPatientIndex] = { docType, docNum, name: patientName, dob: dobDate, sex, phone };
    } else {
        pacientesSistema.push({ docType, docNum, name: patientName, dob: dobDate, sex, phone });
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
        const doc = new jsPDF('p', 'mm', 'letter');

        const logoDataUrl = obtenerBase64DeCSS('dummy-logo');
        const firmaDataUrl = obtenerBase64DeCSS('dummy-firma');

        if (logoDataUrl) {
            const formatoLogo = logoDataUrl.includes('image/png') ? 'PNG' : 'JPEG';
            doc.addImage(logoDataUrl, formatoLogo, 14, 8, 42, 11);
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("LABORATORIO CLINICO DE CIUDAD CARIBE", 108, 13, { align: "center" });
        
        doc.setFontSize(8.5);
        doc.text("CALLE 2 No. 1 - 01 - Tels 605 258 0000", 108, 17.5, { align: "center" });
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(`Fecha de impresión: ${fechaHoyFormateada}`, 201, 12, { align: "right" });
        doc.text(`Hora: ${horaHoyFormateada}`, 201, 16, { align: "right" });

        doc.setDrawColor(5, 150, 105);
        doc.setLineWidth(0.4);
        doc.roundedRect(14, 21, 187.9, 28, 2.5, 2.5, 'D');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);

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
            if (partes.length === 3) {
                fechaNacFormateadaPdf = `${partes[2]}/${partes[1]}/${partes[0]} - ${ord.ageDisplay}`;
            } else {
                fechaNacFormateadaPdf = `${ord.dobDate} - ${ord.ageDisplay}`;
            }
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

        let tableRows = [];
        ord.exams.forEach(ex => {
            tableRows.push([
                { content: ex.category.toUpperCase(), colSpan: 4, styles: { fontStyle: 'bold', fillColor: [245, 245, 245], textColor: [0, 0, 0] } }
            ]);
            ex.results.forEach(res => {
                tableRows.push([
                    res.k,
                    res.val || '',
                    res.unit || '',
                    res.ref || ''
                ]);
            });
        });

        doc.autoTable({
            startY: 52,
            head: [['EXAMEN', 'RESULTADO', 'UNIDADES', 'VALORES DE REFERENCIA']],
            body: tableRows,
            theme: 'plain',
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontStyle: 'bold',
                fontSize: 8,
                lineWidth: { bottom: 0.4 },
                lineColor: [0, 0, 0]
            },
            bodyStyles: {
                fontSize: 7.5,
                textColor: [0, 0, 0],
                cellPadding: 1.5
            },
            columnStyles: {
                0: { cellWidth: 72 },
                1: { cellWidth: 36 },
                2: { cellWidth: 32 },
                3: { cellWidth: 47.9 }
            },
            margin: { left: 14, right: 14, bottom: 30 },
            
            didDrawPage: function (data) {
                doc.setFont("helvetica", "italic");
                doc.setFontSize(7);
                doc.setTextColor(100, 100, 100);
                doc.text(
                    "La lectura y análisis de los exámenes de laboratorio es competencia exclusiva del profesional médico.", 
                    108, 
                    274, 
                    { align: "center" }
                );
            }
        });

        let finalY = doc.lastAutoTable.finalY + 8;
        
        if (finalY > 245) {
            doc.addPage();
            finalY = 25;
        }

        if (firmaDataUrl) {
            doc.addImage(firmaDataUrl, 'PNG', 14, finalY, 35, 12);
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("CLAUDIA DANIELA MONTES", 14, finalY + 14.5);
        doc.setFont("helvetica", "normal");
        doc.text("BACTERIOLOGA TP: 99441", 14, finalY + 18.5);

        doc.output('dataurlnewwindow');

    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Ocurrió un detalle al generar el PDF. Revisa la consola del navegador.");
    }
}

// ==========================================
// PORTAL DE PACIENTES (pacientes.html)
// ==========================================

function handleLogin(event, datosPaciente) {
    if (event) event.preventDefault();
    const patientSession = {
        name: datosPaciente.nombre || datosPaciente.name,
        docType: datosPaciente.tipoDoc || datosPaciente.docType,
        docNum: datosPaciente.documento || datosPaciente.docNum
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

    const pName = patientData.name || patientData.nombre || 'Paciente';
    const pDocType = patientData.docType || patientData.tipoDoc || '';
    const pDocNum = patientData.docNum || patientData.documento || '';

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