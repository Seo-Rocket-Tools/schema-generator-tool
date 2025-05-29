// Schema building and value extraction functions

// Get field value
function getFieldValue(fieldName, fieldDef) {
    const element = document.getElementById(fieldName);
    
    switch (fieldDef.type) {
        case 'array':
            if (element && element.value) {
                return element.value.split('\n').filter(line => line.trim());
            }
            return [];
            
        case 'nested':
            return getNestedValue(fieldName, fieldDef.subtype || fieldName);
            
        case 'nested-array':
            return getNestedArrayValue(fieldName);
            
        case 'faq-array':
            return getFAQValue();
            
        case 'number':
            if (element && element.value) {
                return parseFloat(element.value);
            }
            return null;
            
        default:
            if (element) {
                return element.value || null;
            }
            return null;
    }
}

// Get nested value
function getNestedValue(parentName, nestedType) {
    const nested = nestedDefinitions[nestedType];
    if (!nested) return null;
    
    const nestedObj = {};
    let hasValue = false;
    
    if (nested['@type']) {
        nestedObj['@type'] = nested['@type'];
    }
    
    for (const [fieldName, fieldDef] of Object.entries(nested.fields)) {
        const fieldId = `${parentName}_${fieldName}`;
        
        if (fieldDef.type === 'nested') {
            const nestedValue = getNestedValue(fieldId, fieldDef.subtype);
            if (nestedValue) {
                nestedObj[fieldName] = nestedValue;
                hasValue = true;
            }
        } else {
            const element = document.getElementById(fieldId);
            if (element && element.value) {
                if (fieldDef.type === 'number') {
                    nestedObj[fieldName] = parseFloat(element.value);
                } else {
                    nestedObj[fieldName] = element.value;
                }
                hasValue = true;
            }
        }
    }
    
    return hasValue ? nestedObj : null;
}

// Get nested array value
function getNestedArrayValue(fieldName) {
    const container = document.getElementById(`${fieldName}_container`);
    if (!container) return [];
    
    const items = [];
    const sections = container.querySelectorAll(`[id^="${fieldName}_"][id$="_section"]`);
    
    sections.forEach(section => {
        const match = section.id.match(new RegExp(`${fieldName}_(\\d+)_section`));
        if (match) {
            const index = match[1];
            const item = getNestedArrayItemValue(fieldName, index);
            if (item) {
                items.push(item);
            }
        }
    });
    
    return items;
}

// Get nested array item value
function getNestedArrayItemValue(fieldName, index) {
    const nestedDef = nestedDefinitions[fieldName];
    if (!nestedDef) return null;
    
    const item = {};
    let hasValue = false;
    
    if (nestedDef['@type']) {
        item['@type'] = nestedDef['@type'];
    }
    
    for (const [nestedFieldName, nestedFieldDef] of Object.entries(nestedDef.fields)) {
        const fieldId = `${fieldName}_${index}_${nestedFieldName}`;
        
        if (nestedFieldDef.type === 'nested') {
            const nestedValue = getNestedValue(fieldId, nestedFieldDef.subtype);
            if (nestedValue) {
                item[nestedFieldName] = nestedValue;
                hasValue = true;
            }
        } else {
            const element = document.getElementById(fieldId);
            if (element && element.value) {
                if (nestedFieldDef.type === 'number') {
                    item[nestedFieldName] = parseFloat(element.value);
                } else {
                    item[nestedFieldName] = element.value;
                }
                hasValue = true;
            }
        }
    }
    
    return hasValue ? item : null;
}

// Get FAQ value
function getFAQValue() {
    const container = document.getElementById('faq_container');
    if (!container) return [];
    
    const items = [];
    const sections = container.querySelectorAll('[id^="faq_"][id$="_section"]');
    
    sections.forEach(section => {
        const match = section.id.match(/faq_(\d+)_section/);
        if (match) {
            const index = match[1];
            const question = document.getElementById(`faq_question_${index}`);
            const answer = document.getElementById(`faq_answer_${index}`);
            
            if (question && question.value && answer && answer.value) {
                items.push({
                    "@type": "Question",
                    "name": question.value,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer.value
                    }
                });
            }
        }
    });
    
    return items;
}

// Update preview
function updatePreview() {
    const schemaType = document.getElementById('schemaType').value;
    if (!schemaType) return;
    
    const definition = schemaDefinitions[schemaType];
    if (!definition) return;
    
    // Build schema object
    const schema = {
        "@context": "https://schema.org",
        "@type": schemaType
    };
    
    // Process all fields
    for (const [fieldName, fieldDef] of Object.entries(definition.fields)) {
        const value = getFieldValue(fieldName, fieldDef);
        if (value !== null && value !== undefined && value !== '' && 
            (!Array.isArray(value) || value.length > 0)) {
            schema[fieldName] = value;
        }
    }
    
    currentSchema = schema;
    
    // Update preview
    const preview = document.getElementById('jsonPreview');
    preview.textContent = JSON.stringify(schema, null, 2);
}