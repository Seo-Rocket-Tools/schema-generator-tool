# Schema Markup Generator by SEO Rocket

A beginner-friendly tool for creating Schema.org structured data in JSON-LD format. Built by [SEO Rocket](https://seorocket.dev) to help improve your website's SEO performance with proper structured data implementation.

This tool runs entirely client-side with no backend required.

## Features

- 20+ schema types supported (Organization, Product, Event, FAQPage, etc.)
- Dynamic form generation based on selected schema type
- Live JSON-LD preview
- Template presets for quick start
- Nested property support
- Field validation and helpful tooltips
- Copy to clipboard functionality

## Project Structure

```
schema-generator-tool/
├── index.html                # Main HTML file
├── css/
│   └── styles.css            # All styling separated into its own file
├── js/
│   ├── schema-definitions.js  # All schema type definitions
│   ├── nested-definitions.js  # Nested field type definitions
│   ├── templates.js          # Template presets
│   ├── form-generator.js     # Form generation and field rendering
│   ├── schema-builder.js     # Schema building and value extraction
│   └── main.js              # Main application logic
└── README.md                # This file
```

## File Descriptions

### CSS
- **styles.css**: Contains all styling including layout, form elements, buttons, and responsive design

### JavaScript Modules

1. **schema-definitions.js**
   - Contains all schema type definitions (Organization, Product, Event, etc.)
   - Defines required, recommended, and optional fields for each schema type
   - Easy to add new schema types by following the existing pattern

2. **nested-definitions.js**
   - Defines nested field types (address, geo, author, etc.)
   - Each nested type includes its @type and field definitions
   - Used by multiple parent schema types

3. **templates.js**
   - Contains pre-filled template data for common use cases
   - Templates include: organization, localbusiness, product, event, faq, article
   - Easy to add new templates

4. **form-generator.js**
   - Generates HTML form fields dynamically
   - Handles different field types (text, url, date, nested, arrays, etc.)
   - Manages nested array items (offers, reviews, etc.)
   - Contains FAQ-specific form generation

5. **schema-builder.js**
   - Extracts values from form fields
   - Builds the final JSON-LD schema object
   - Handles nested values and arrays
   - Updates the preview in real-time

6. **main.js**
   - Main application controller
   - Handles schema type changes
   - Manages template loading
   - Contains validation logic
   - Clipboard functionality
   - Utility functions

## Adding New Schema Types

To add a new schema type:

1. Add the schema definition to `js/schema-definitions.js`:
```javascript
NewSchemaType: {
    required: ['name'],
    recommended: ['description'],
    fields: {
        name: { type: 'text', label: 'Name', help: 'The name of the item' },
        description: { type: 'textarea', label: 'Description', help: 'Description of the item' }
    }
}
```

2. Add any new nested types to `js/nested-definitions.js` if needed

3. Add the schema type option to the select dropdown in the HTML

4. Optionally add a template to `js/templates.js`

## Development

The refactored version makes it easy to:
- Add new schema types
- Modify existing schemas
- Add new field types
- Customize styling
- Add new features

The code is organized into logical modules, making it much more maintainable and easier to understand.

## Usage

1. Open `index.html` in a web browser
2. Select a schema type or click a template
3. Fill in the form fields
4. View the live JSON-LD preview
5. Click "Copy to Clipboard" to get the complete script tag

The generated JSON-LD can be pasted directly into your website's `<head>` section.

## About SEO Rocket

[SEO Rocket](https://seorocket.dev) provides tools and services to help businesses improve their search engine optimization. This Schema Markup Generator is a free tool to help you implement structured data correctly for better search visibility.

## License

This tool is provided free of charge by SEO Rocket. Feel free to use it for your projects.

## Support

For questions or support, visit [seorocket.dev](https://seorocket.dev) or open an issue on GitHub.