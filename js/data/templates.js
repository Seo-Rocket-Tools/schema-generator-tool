// Template presets
const templates = {
    organization: {
        type: 'Organization',
        data: {
            name: 'SEO Rocket',
            url: 'https://seorocket.dev',
            logo: 'https://seorocket.dev/logo.png',
            description: 'SEO tools and services to boost your search engine rankings and online visibility.',
            email: 'hello@seorocket.dev',
            telephone: '+1-555-123-4567',
            address: {
                streetAddress: '123 Digital Avenue',
                addressLocality: 'San Francisco',
                addressRegion: 'CA',
                postalCode: '94102',
                addressCountry: 'US'
            },
            sameAs: ['https://facebook.com/seorocket', 'https://twitter.com/seorocket', 'https://linkedin.com/company/seorocket']
        }
    },
    localbusiness: {
        type: 'LocalBusiness',
        data: {
            name: 'Joe\'s Pizza Restaurant',
            url: 'https://www.joespizza.com',
            telephone: '+1-555-234-5678',
            priceRange: '$$',
            address: {
                streetAddress: '456 Oak Avenue',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90001',
                addressCountry: 'US'
            },
            geo: {
                latitude: '34.0522',
                longitude: '-118.2437'
            },
            openingHours: ['Mo-Th 11:00-22:00', 'Fr-Sa 11:00-23:00', 'Su 12:00-21:00'],
            servesCuisine: 'Italian'
        }
    },
    product: {
        type: 'Product',
        data: {
            name: 'Wireless Bluetooth Headphones',
            image: ['https://example.com/headphones-1.jpg', 'https://example.com/headphones-2.jpg'],
            description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
            sku: 'WBH-12345',
            brand: { name: 'AudioTech' },
            offers: [{
                price: '199.99',
                priceCurrency: 'USD',
                availability: 'InStock',
                url: 'https://example.com/products/wireless-headphones'
            }],
            aggregateRating: {
                ratingValue: '4.5',
                reviewCount: '237'
            }
        }
    },
    event: {
        type: 'Event',
        data: {
            name: 'Summer Music Festival 2024',
            description: 'Join us for an unforgettable weekend of live music featuring top artists.',
            startDate: '2024-07-15T16:00',
            endDate: '2024-07-17T23:00',
            eventStatus: 'EventScheduled',
            eventAttendanceMode: 'OfflineEventAttendanceMode',
            location: {
                name: 'Central Park',
                address: {
                    streetAddress: 'Central Park West',
                    addressLocality: 'New York',
                    addressRegion: 'NY',
                    postalCode: '10024',
                    addressCountry: 'US'
                }
            },
            organizer: {
                name: 'NYC Events',
                url: 'https://www.nycevents.com'
            },
            offers: [{
                price: '75',
                priceCurrency: 'USD',
                availability: 'InStock',
                url: 'https://example.com/tickets'
            }]
        }
    },
    faq: {
        type: 'FAQPage',
        data: {
            name: 'Frequently Asked Questions',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'What is your return policy?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We offer a 30-day return policy for all products. Items must be in original condition with tags attached.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Do you ship internationally?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.'
                    }
                }
            ]
        }
    },
    article: {
        type: 'Article',
        data: {
            headline: '10 Tips for Better Web Performance',
            alternativeHeadline: 'How to Speed Up Your Website',
            image: 'https://example.com/article-image.jpg',
            author: {
                name: 'Jane Smith',
                url: 'https://example.com/authors/jane-smith'
            },
            datePublished: '2024-01-15',
            dateModified: '2024-01-20',
            publisher: {
                name: 'Tech Blog',
                logo: 'https://example.com/logo.png'
            },
            description: 'Learn how to optimize your website for better performance with these proven techniques.',
            wordCount: '1500'
        }
    }
};