// Nested field definitions
const nestedDefinitions = {
    address: {
        '@type': 'PostalAddress',
        fields: {
            streetAddress: { type: 'text', label: 'Street Address' },
            addressLocality: { type: 'text', label: 'City' },
            addressRegion: { type: 'text', label: 'State/Region' },
            postalCode: { type: 'text', label: 'Postal Code' },
            addressCountry: { type: 'text', label: 'Country' }
        }
    },
    geo: {
        '@type': 'GeoCoordinates',
        fields: {
            latitude: { type: 'number', label: 'Latitude', step: 'any' },
            longitude: { type: 'number', label: 'Longitude', step: 'any' }
        }
    },
    brand: {
        '@type': 'Brand',
        fields: {
            name: { type: 'text', label: 'Brand Name' }
        }
    },
    author: {
        '@type': 'Person',
        fields: {
            name: { type: 'text', label: 'Author Name' },
            url: { type: 'url', label: 'Author URL' }
        }
    },
    publisher: {
        '@type': 'Organization',
        fields: {
            name: { type: 'text', label: 'Publisher Name' },
            logo: { type: 'url', label: 'Publisher Logo URL' }
        }
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        fields: {
            ratingValue: { type: 'number', label: 'Average Rating', step: '0.1', min: '0', max: '5' },
            reviewCount: { type: 'number', label: 'Number of Reviews', min: '0' },
            bestRating: { type: 'number', label: 'Best Rating', default: '5' },
            worstRating: { type: 'number', label: 'Worst Rating', default: '1' }
        }
    },
    offers: {
        '@type': 'Offer',
        fields: {
            price: { type: 'text', label: 'Price', help: 'e.g., 19.99' },
            priceCurrency: { type: 'text', label: 'Currency', help: 'e.g., USD' },
            availability: { 
                type: 'select', 
                label: 'Availability',
                options: ['InStock', 'OutOfStock', 'PreOrder', 'SoldOut', 'OnlineOnly', 'LimitedAvailability', 'Discontinued'],
            },
            priceValidUntil: { type: 'date', label: 'Price Valid Until' },
            url: { type: 'url', label: 'Offer URL' }
        }
    },
    review: {
        '@type': 'Review',
        fields: {
            reviewRating: { type: 'nested', subtype: 'rating' },
            author: { type: 'text', label: 'Reviewer Name' },
            datePublished: { type: 'date', label: 'Review Date' },
            reviewBody: { type: 'textarea', label: 'Review Text' }
        }
    },
    rating: {
        '@type': 'Rating',
        fields: {
            ratingValue: { type: 'number', label: 'Rating', min: '1', max: '5' },
            bestRating: { type: 'number', label: 'Best Rating', default: '5' },
            worstRating: { type: 'number', label: 'Worst Rating', default: '1' }
        }
    },
    location: {
        '@type': 'Place',
        fields: {
            name: { type: 'text', label: 'Venue Name' },
            address: { type: 'nested', label: 'Address' },
            url: { type: 'url', label: 'Venue Website' }
        }
    },
    organizer: {
        '@type': 'Organization',
        fields: {
            name: { type: 'text', label: 'Organizer Name' },
            url: { type: 'url', label: 'Organizer Website' }
        }
    },
    performer: {
        '@type': 'Person',
        fields: {
            name: { type: 'text', label: 'Performer Name' },
            url: { type: 'url', label: 'Performer Website' }
        }
    },
    contactPoint: {
        '@type': 'ContactPoint',
        fields: {
            telephone: { type: 'tel', label: 'Phone Number' },
            contactType: { type: 'text', label: 'Contact Type', help: 'e.g., customer service, technical support' },
            availableLanguage: { type: 'text', label: 'Available Languages' },
            areaServed: { type: 'text', label: 'Area Served' }
        }
    },
    nutrition: {
        '@type': 'NutritionInformation',
        fields: {
            calories: { type: 'text', label: 'Calories', help: 'e.g., 250 calories' },
            carbohydrateContent: { type: 'text', label: 'Carbohydrates', help: 'e.g., 30 g' },
            proteinContent: { type: 'text', label: 'Protein', help: 'e.g., 10 g' },
            fatContent: { type: 'text', label: 'Fat', help: 'e.g., 15 g' },
            fiberContent: { type: 'text', label: 'Fiber', help: 'e.g., 5 g' },
            sodiumContent: { type: 'text', label: 'Sodium', help: 'e.g., 200 mg' },
            sugarContent: { type: 'text', label: 'Sugar', help: 'e.g., 10 g' }
        }
    },
    jobLocation: {
        '@type': 'Place',
        fields: {
            address: { type: 'nested', label: 'Address' }
        }
    },
    baseSalary: {
        '@type': 'MonetaryAmount',
        fields: {
            currency: { type: 'text', label: 'Currency', help: 'e.g., USD' },
            value: { type: 'nested', subtype: 'salaryValue' }
        }
    },
    salaryValue: {
        '@type': 'QuantitativeValue',
        fields: {
            minValue: { type: 'number', label: 'Minimum Salary' },
            maxValue: { type: 'number', label: 'Maximum Salary' },
            unitText: { 
                type: 'select', 
                label: 'Pay Period',
                options: ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR']
            }
        }
    },
    worksFor: {
        '@type': 'Organization',
        fields: {
            name: { type: 'text', label: 'Organization Name' },
            url: { type: 'url', label: 'Organization Website' }
        }
    },
    hiringOrganization: {
        '@type': 'Organization',
        fields: {
            name: { type: 'text', label: 'Company Name' },
            sameAs: { type: 'url', label: 'Company Website' },
            logo: { type: 'url', label: 'Company Logo URL' }
        }
    },
    provider: {
        '@type': 'Organization',
        fields: {
            name: { type: 'text', label: 'Provider Name' },
            url: { type: 'url', label: 'Provider Website' }
        }
    },
    director: {
        '@type': 'Person',
        fields: {
            name: { type: 'text', label: 'Director Name' }
        }
    }
};