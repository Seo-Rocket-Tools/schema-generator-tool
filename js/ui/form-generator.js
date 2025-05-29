// Form generation and field rendering functions

// Generate field HTML
function generateField(fieldName, fieldDef, isRequired) {
    let html = '<div class="form-group">';
    
    const label = fieldDef.label || fieldName;
    const helpText = fieldDef.help || '';
    
    html += `<label for="${fieldName}">${label}${isRequired ? ' *' : ''}`;
    if (helpText) {
        html += `<span class="tooltip"><span class="tooltip-text">${helpText}</span></span>`;
    }
    html += '</label>';
    
    switch (fieldDef.type) {
        case 'text':
        case 'url':
        case 'email':
        case 'tel':
            html += `<input type="${fieldDef.type}" id="${fieldName}" onchange="updatePreview()" />`;
            break;
            
        case 'number':
            const step = fieldDef.step || '1';
            const min = fieldDef.min || '';
            const max = fieldDef.max || '';
            html += `<input type="number" id="${fieldName}" step="${step}" min="${min}" max="${max}" onchange="updatePreview()" />`;
            break;
            
        case 'date':
            html += `<input type="date" id="${fieldName}" onchange="updatePreview()" />`;
            break;
            
        case 'datetime-local':
            html += `<input type="datetime-local" id="${fieldName}" onchange="updatePreview()" />`;
            break;
            
        case 'textarea':
            html += `<textarea id="${fieldName}" onchange="updatePreview()"></textarea>`;
            break;
            
        case 'select':
            html += `<select id="${fieldName}" onchange="updatePreview()">`;
            html += '<option value="">Select...</option>';
            fieldDef.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += '</select>';
            break;
            
        case 'array':
            html += `<textarea id="${fieldName}" onchange="updatePreview()" placeholder="Enter one value per line"></textarea>`;
            if (helpText) {
                html += `<div class="help-text">${helpText}</div>`;
            }
            break;
            
        case 'nested':
            html += generateNestedFields(fieldName, fieldDef.subtype || fieldName);
            break;
            
        case 'nested-array':
            html += generateNestedArrayField(fieldName);
            break;
            
        case 'faq-array':
            html += generateFAQField();
            break;
    }
    
    html += '</div>';
    return html;
}

// Generate nested fields
function generateNestedFields(parentName, nestedType) {
    const nested = nestedDefinitions[nestedType];
    if (!nested) return '';
    
    let html = '<div class="nested-section">';
    
    for (const [fieldName, fieldDef] of Object.entries(nested.fields)) {
        const fieldId = `${parentName}_${fieldName}`;
        html += '<div class="form-group">';
        html += `<label for="${fieldId}">${fieldDef.label}</label>`;
        
        if (fieldDef.type === 'nested') {
            html += generateNestedFields(fieldId, fieldDef.subtype);
        } else if (fieldDef.type === 'select') {
            html += `<select id="${fieldId}" onchange="updatePreview()">`;
            html += '<option value="">Select...</option>';
            fieldDef.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += '</select>';
        } else {
            const inputType = fieldDef.type || 'text';
            const step = fieldDef.step ? `step="${fieldDef.step}"` : '';
            const min = fieldDef.min ? `min="${fieldDef.min}"` : '';
            const max = fieldDef.max ? `max="${fieldDef.max}"` : '';
            const defaultValue = fieldDef.default ? `value="${fieldDef.default}"` : '';
            html += `<input type="${inputType}" id="${fieldId}" ${step} ${min} ${max} ${defaultValue} onchange="updatePreview()" />`;
        }
        
        if (fieldDef.help) {
            html += `<div class="help-text">${fieldDef.help}</div>`;
        }
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// Generate nested array field
function generateNestedArrayField(fieldName) {
    nestedArrayCounters[fieldName] = 0;
    
    let html = '<div class="nested-section">';
    html += '<div class="nested-header">';
    html += `<span class="nested-title">${capitalizeFirst(fieldName)}</span>`;
    html += `<button type="button" class="btn btn-secondary" onclick="add${capitalizeFirst(fieldName)}()">Add ${capitalizeFirst(fieldName.replace(/s$/, ''))}</button>`;
    html += '</div>';
    html += `<div id="${fieldName}_container"></div>`;
    html += '</div>';
    
    return html;
}

// Generate FAQ field
function generateFAQField() {
    nestedArrayCounters['faq'] = 0;
    
    let html = '<div class="nested-section">';
    html += '<div class="nested-header">';
    html += '<span class="nested-title">Questions & Answers</span>';
    html += '<button type="button" class="btn btn-secondary" onclick="addFAQItem()">Add Question</button>';
    html += '</div>';
    html += '<div id="faq_container"></div>';
    html += '</div>';
    
    return html;
}

// Add dynamic nested array item functions
window.addOffers = function() {
    addNestedArrayItem('offers');
};

window.addReview = function() {
    addNestedArrayItem('review');
};

window.addPerformer = function() {
    addNestedArrayItem('performer');
};

window.addContactPoint = function() {
    addNestedArrayItem('contactPoint');
};

// Generic function to add nested array items
function addNestedArrayItem(fieldName) {
    const container = document.getElementById(`${fieldName}_container`);
    const index = nestedArrayCounters[fieldName] || 0;
    
    let html = `<div class="nested-section" id="${fieldName}_${index}_section">`;
    html += '<div class="nested-header">';
    html += `<span class="nested-title">${capitalizeFirst(fieldName.replace(/s$/, ''))} ${index + 1}</span>`;
    html += `<button type="button" class="btn btn-danger" onclick="removeNestedItem('${fieldName}', ${index})">Remove</button>`;
    html += '</div>';
    
    const nestedDef = nestedDefinitions[fieldName];
    if (nestedDef) {
        for (const [nestedFieldName, nestedFieldDef] of Object.entries(nestedDef.fields)) {
            const fieldId = `${fieldName}_${index}_${nestedFieldName}`;
            html += '<div class="form-group">';
            html += `<label for="${fieldId}">${nestedFieldDef.label}</label>`;
            
            if (nestedFieldDef.type === 'nested') {
                html += generateNestedFields(fieldId, nestedFieldDef.subtype);
            } else if (nestedFieldDef.type === 'select') {
                html += `<select id="${fieldId}" onchange="updatePreview()">`;
                html += '<option value="">Select...</option>';
                nestedFieldDef.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += '</select>';
            } else if (nestedFieldDef.type === 'textarea') {
                html += `<textarea id="${fieldId}" onchange="updatePreview()"></textarea>`;
            } else {
                const inputType = nestedFieldDef.type || 'text';
                const step = nestedFieldDef.step ? `step="${nestedFieldDef.step}"` : '';
                const min = nestedFieldDef.min ? `min="${nestedFieldDef.min}"` : '';
                const max = nestedFieldDef.max ? `max="${nestedFieldDef.max}"` : '';
                const defaultValue = nestedFieldDef.default ? `value="${nestedFieldDef.default}"` : '';
                html += `<input type="${inputType}" id="${fieldId}" ${step} ${min} ${max} ${defaultValue} onchange="updatePreview()" />`;
            }
            
            if (nestedFieldDef.help) {
                html += `<div class="help-text">${nestedFieldDef.help}</div>`;
            }
            html += '</div>';
        }
    }
    
    html += '</div>';
    
    container.insertAdjacentHTML('beforeend', html);
    nestedArrayCounters[fieldName] = index + 1;
    updatePreview();
}

// Add FAQ item
function addFAQItem() {
    const container = document.getElementById('faq_container');
    const index = nestedArrayCounters['faq'] || 0;
    
    let html = `<div class="nested-section" id="faq_${index}_section">`;
    html += '<div class="nested-header">';
    html += `<span class="nested-title">Question ${index + 1}</span>`;
    html += `<button type="button" class="btn btn-danger" onclick="removeFAQItem(${index})">Remove</button>`;
    html += '</div>';
    
    html += '<div class="form-group">';
    html += `<label for="faq_question_${index}">Question</label>`;
    html += `<input type="text" id="faq_question_${index}" onchange="updatePreview()" />`;
    html += '</div>';
    
    html += '<div class="form-group">';
    html += `<label for="faq_answer_${index}">Answer</label>`;
    html += `<textarea id="faq_answer_${index}" onchange="updatePreview()"></textarea>`;
    html += '</div>';
    
    html += '</div>';
    
    container.insertAdjacentHTML('beforeend', html);
    nestedArrayCounters['faq'] = index + 1;
    updatePreview();
}

// Remove nested item
function removeNestedItem(fieldName, index) {
    const element = document.getElementById(`${fieldName}_${index}_section`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

// Remove FAQ item
function removeFAQItem(index) {
    const element = document.getElementById(`faq_${index}_section`);
    if (element) {
        element.remove();
        updatePreview();
    }
}