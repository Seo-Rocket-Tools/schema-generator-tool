// Main application logic

// State management
let currentSchema = {};
let nestedArrayCounters = {};

// Handle schema type change
function handleSchemaTypeChange() {
    const schemaType = document.getElementById('schemaType').value;
    const formContainer = document.getElementById('dynamicForm');
    
    if (!schemaType) {
        formContainer.innerHTML = '';
        currentSchema = {
            "@context": "https://schema.org",
            "@type": "Select a schema type to begin..."
        };
        updatePreview();
        return;
    }
    
    const definition = schemaDefinitions[schemaType];
    if (!definition) return;
    
    // Reset counters
    nestedArrayCounters = {};
    
    // Initialize schema
    currentSchema = {
        "@context": "https://schema.org",
        "@type": schemaType
    };
    
    // Generate form fields
    let formHTML = '';
    
    // Required fields
    formHTML += '<h3>Required Fields</h3>';
    definition.required.forEach(fieldName => {
        if (definition.fields[fieldName]) {
            formHTML += generateField(fieldName, definition.fields[fieldName], true);
        }
    });
    
    // Recommended fields
    if (definition.recommended.length > 0) {
        formHTML += '<h3>Recommended Fields</h3>';
        definition.recommended.forEach(fieldName => {
            if (definition.fields[fieldName]) {
                formHTML += generateField(fieldName, definition.fields[fieldName], false);
            }
        });
    }
    
    // Optional fields
    const optionalFields = Object.keys(definition.fields).filter(
        f => !definition.required.includes(f) && !definition.recommended.includes(f)
    );
    
    if (optionalFields.length > 0) {
        formHTML += '<button class="collapsible" onclick="toggleCollapsible(this)">Optional Fields</button>';
        formHTML += '<div class="collapsible-content">';
        optionalFields.forEach(fieldName => {
            formHTML += generateField(fieldName, definition.fields[fieldName], false);
        });
        formHTML += '</div>';
    }
    
    formContainer.innerHTML = formHTML;
    updatePreview();
}

// Load template
function loadTemplate(templateName) {
    const template = templates[templateName];
    if (template) {
        document.getElementById('schemaType').value = template.type;
        handleSchemaTypeChange();
        
        // Fill in the form with template data
        setTimeout(() => {
            fillFormWithData(template.data);
            updatePreview();
        }, 100);
    }
}

// Fill form with data
function fillFormWithData(data, prefix = '') {
    for (const [key, value] of Object.entries(data)) {
        const fieldId = prefix ? `${prefix}_${key}` : key;
        const element = document.getElementById(fieldId);
        
        if (element) {
            if (Array.isArray(value)) {
                if (key === 'mainEntity' && currentSchema['@type'] === 'FAQPage') {
                    // Special handling for FAQ items
                    value.forEach((faq, index) => {
                        if (index > 0) addFAQItem();
                        document.getElementById(`faq_question_${index}`).value = faq.name;
                        document.getElementById(`faq_answer_${index}`).value = faq.acceptedAnswer.text;
                    });
                } else if (typeof value[0] === 'object') {
                    // Handle nested arrays
                    value.forEach((item, index) => {
                        if (index > 0) {
                            const addButton = document.querySelector(`[onclick*="add${capitalizeFirst(key)}"]`);
                            if (addButton) addButton.click();
                        }
                        fillFormWithData(item, `${key}_${index}`);
                    });
                } else {
                    element.value = value.join('\n');
                }
            } else if (typeof value === 'object') {
                fillFormWithData(value, fieldId);
            } else {
                element.value = value;
            }
        }
    }
}

// Validation
function validateAndUpdate() {
    updatePreview();
    
    // Basic validation
    const errors = [];
    const schemaType = document.getElementById('schemaType').value;
    
    if (!schemaType) {
        errors.push('Please select a schema type');
    } else {
        const definition = schemaDefinitions[schemaType];
        
        // Check required fields
        definition.required.forEach(fieldName => {
            const value = getFieldValue(fieldName, definition.fields[fieldName]);
            if (!value || (Array.isArray(value) && value.length === 0)) {
                errors.push(`${definition.fields[fieldName].label} is required`);
            }
        });
    }
    
    showValidationResults(errors);
}

// Utility functions

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updatePreview();
});