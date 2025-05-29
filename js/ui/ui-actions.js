// UI Action functions

function copyToClipboard() {
    const preview = document.getElementById('jsonPreview');
    const text = preview.textContent;
    
    // Create script tag wrapper
    const scriptWrapped = '<script type="application/ld+json">\n' + text + '\n</' + 'script>';
    
    navigator.clipboard.writeText(scriptWrapped).then(() => {
        const button = document.querySelector('.copy-btn');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('btn-success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('btn-success');
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = scriptWrapped;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        alert('Copied to clipboard!');
    });
}

function clearForm() {
    if (confirm('Are you sure you want to clear all fields?')) {
        document.getElementById('schemaType').value = '';
        handleSchemaTypeChange(); // This function is still in main.js
    }
}

function showValidationResults(errors) {
    if (errors.length > 0) {
        alert('Validation errors:\n\n' + errors.join('\n'));
    } else {
        alert('Schema is valid! You can copy the JSON-LD to your website.');
    }
} 