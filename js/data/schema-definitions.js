// Schema definitions with required and recommended fields
const schemaDefinitions = {
    Organization: {
        required: ['name'],
        recommended: ['url', 'logo', 'description', 'address', 'contactPoint', 'sameAs'],
        fields: {
            name: { type: 'text', label: 'Organization Name', help: 'The official name of your organization' },
            url: { type: 'url', label: 'Website URL', help: 'Your organization\'s main website' },
            logo: { type: 'url', label: 'Logo URL', help: 'Direct link to your organization\'s logo image' },
            description: { type: 'textarea', label: 'Description', help: 'Brief description of what your organization does' },
            email: { type: 'email', label: 'Email', help: 'Contact email address' },
            telephone: { type: 'tel', label: 'Phone Number', help: 'Main contact phone number' },
            address: { type: 'nested', label: 'Address', help: 'Physical address of your organization' },
            contactPoint: { type: 'nested-array', label: 'Contact Points', help: 'Different ways to contact your organization' },
            sameAs: { type: 'array', label: 'Social Media URLs', help: 'Links to your social media profiles (one per line)' }
        }
    },
    LocalBusiness: {
        required: ['name', 'address'],
        recommended: ['url', 'telephone', 'openingHours', 'priceRange', 'image', 'geo'],
        fields: {
            name: { type: 'text', label: 'Business Name', help: 'The name of your local business' },
            url: { type: 'url', label: 'Website URL', help: 'Your business website' },
            image: { type: 'url', label: 'Business Image URL', help: 'Main image of your business' },
            description: { type: 'textarea', label: 'Description', help: 'What your business offers' },
            telephone: { type: 'tel', label: 'Phone Number', help: 'Business phone number' },
            priceRange: { type: 'text', label: 'Price Range', help: 'e.g., $, $$, $$$, or $10-$30' },
            address: { type: 'nested', label: 'Address', help: 'Physical address of your business' },
            geo: { type: 'nested', label: 'Geographic Coordinates', help: 'Latitude and longitude of your business' },
            openingHours: { type: 'array', label: 'Opening Hours', help: 'e.g., Mo-Fr 09:00-17:00 (one per line)' },
            servesCuisine: { type: 'text', label: 'Cuisine Type', help: 'For restaurants: type of cuisine served' },
            menu: { type: 'url', label: 'Menu URL', help: 'Link to your menu (for restaurants)' }
        }
    },
    Product: {
        required: ['name'],
        recommended: ['image', 'description', 'brand', 'offers', 'aggregateRating'],
        fields: {
            name: { type: 'text', label: 'Product Name', help: 'The name of your product' },
            image: { type: 'array', label: 'Product Images', help: 'URLs to product images (one per line)' },
            description: { type: 'textarea', label: 'Description', help: 'Detailed product description' },
            sku: { type: 'text', label: 'SKU', help: 'Stock Keeping Unit identifier' },
            mpn: { type: 'text', label: 'MPN', help: 'Manufacturer Part Number' },
            brand: { type: 'nested', label: 'Brand', help: 'The brand/manufacturer of the product' },
            offers: { type: 'nested-array', label: 'Offers', help: 'Pricing and availability information' },
            aggregateRating: { type: 'nested', label: 'Aggregate Rating', help: 'Overall rating based on reviews' },
            review: { type: 'nested-array', label: 'Reviews', help: 'Individual product reviews' }
        }
    },
    Event: {
        required: ['name', 'startDate', 'location'],
        recommended: ['endDate', 'description', 'image', 'offers', 'performer'],
        fields: {
            name: { type: 'text', label: 'Event Name', help: 'The title of your event' },
            description: { type: 'textarea', label: 'Description', help: 'What the event is about' },
            image: { type: 'url', label: 'Event Image URL', help: 'Main image for the event' },
            startDate: { type: 'datetime-local', label: 'Start Date & Time', help: 'When the event begins' },
            endDate: { type: 'datetime-local', label: 'End Date & Time', help: 'When the event ends' },
            eventStatus: { 
                type: 'select', 
                label: 'Event Status', 
                options: ['EventScheduled', 'EventCancelled', 'EventMovedOnline', 'EventPostponed', 'EventRescheduled'],
                help: 'Current status of the event' 
            },
            eventAttendanceMode: {
                type: 'select',
                label: 'Attendance Mode',
                options: ['OfflineEventAttendanceMode', 'OnlineEventAttendanceMode', 'MixedEventAttendanceMode'],
                help: 'Whether the event is online, offline, or both'
            },
            location: { type: 'nested', label: 'Location', help: 'Where the event takes place' },
            organizer: { type: 'nested', label: 'Organizer', help: 'Who is organizing the event' },
            performer: { type: 'nested-array', label: 'Performers', help: 'Artists, speakers, or performers' },
            offers: { type: 'nested-array', label: 'Ticket Offers', help: 'Ticket pricing and availability' }
        }
    },
    Article: {
        required: ['headline', 'author', 'datePublished'],
        recommended: ['image', 'dateModified', 'publisher'],
        fields: {
            headline: { type: 'text', label: 'Headline', help: 'Article title (max 110 characters recommended)' },
            alternativeHeadline: { type: 'text', label: 'Alternative Headline', help: 'A secondary title for the article' },
            image: { type: 'url', label: 'Article Image URL', help: 'Main image for the article' },
            author: { type: 'nested', label: 'Author', help: 'Who wrote the article' },
            datePublished: { type: 'date', label: 'Date Published', help: 'When the article was first published' },
            dateModified: { type: 'date', label: 'Date Modified', help: 'When the article was last updated' },
            publisher: { type: 'nested', label: 'Publisher', help: 'Organization that published the article' },
            description: { type: 'textarea', label: 'Description', help: 'Brief summary of the article' },
            articleBody: { type: 'textarea', label: 'Article Body', help: 'The main text of the article' },
            wordCount: { type: 'number', label: 'Word Count', help: 'Number of words in the article' }
        }
    },
    FAQPage: {
        required: ['mainEntity'],
        recommended: [],
        fields: {
            name: { type: 'text', label: 'Page Title', help: 'Title of your FAQ page' },
            description: { type: 'textarea', label: 'Page Description', help: 'Brief description of the FAQ page' },
            mainEntity: { type: 'faq-array', label: 'Questions & Answers', help: 'Add your FAQ items' }
        }
    },
    Person: {
        required: ['name'],
        recommended: ['image', 'jobTitle', 'worksFor', 'url'],
        fields: {
            name: { type: 'text', label: 'Full Name', help: 'Person\'s full name' },
            image: { type: 'url', label: 'Photo URL', help: 'URL to person\'s photo' },
            jobTitle: { type: 'text', label: 'Job Title', help: 'Current job title' },
            worksFor: { type: 'nested', label: 'Works For', help: 'Organization where person works' },
            url: { type: 'url', label: 'Personal Website', help: 'Person\'s website or profile page' },
            email: { type: 'email', label: 'Email', help: 'Contact email' },
            telephone: { type: 'tel', label: 'Phone', help: 'Contact phone number' },
            address: { type: 'nested', label: 'Address', help: 'Person\'s address' },
            sameAs: { type: 'array', label: 'Social Profiles', help: 'Social media profile URLs (one per line)' }
        }
    },
    Recipe: {
        required: ['name', 'recipeIngredient', 'recipeInstructions'],
        recommended: ['image', 'author', 'prepTime', 'cookTime', 'totalTime', 'recipeYield'],
        fields: {
            name: { type: 'text', label: 'Recipe Name', help: 'Name of your recipe' },
            image: { type: 'url', label: 'Recipe Image URL', help: 'Main photo of the finished dish' },
            description: { type: 'textarea', label: 'Description', help: 'Brief description of the recipe' },
            author: { type: 'nested', label: 'Author', help: 'Who created this recipe' },
            prepTime: { type: 'text', label: 'Prep Time', help: 'e.g., PT15M for 15 minutes' },
            cookTime: { type: 'text', label: 'Cook Time', help: 'e.g., PT30M for 30 minutes' },
            totalTime: { type: 'text', label: 'Total Time', help: 'e.g., PT45M for 45 minutes' },
            recipeYield: { type: 'text', label: 'Servings', help: 'e.g., 4 servings' },
            recipeCategory: { type: 'text', label: 'Category', help: 'e.g., Dessert, Main Course' },
            recipeCuisine: { type: 'text', label: 'Cuisine', help: 'e.g., Italian, Mexican' },
            recipeIngredient: { type: 'array', label: 'Ingredients', help: 'List each ingredient on a new line' },
            recipeInstructions: { type: 'array', label: 'Instructions', help: 'Each step on a new line' },
            nutrition: { type: 'nested', label: 'Nutrition Information', help: 'Nutritional facts per serving' },
            aggregateRating: { type: 'nested', label: 'Rating', help: 'Average rating from reviews' }
        }
    },
    JobPosting: {
        required: ['title', 'description', 'datePosted', 'hiringOrganization'],
        recommended: ['employmentType', 'jobLocation', 'baseSalary', 'validThrough'],
        fields: {
            title: { type: 'text', label: 'Job Title', help: 'The title of the job position' },
            description: { type: 'textarea', label: 'Job Description', help: 'Full description of the position' },
            datePosted: { type: 'date', label: 'Date Posted', help: 'When the job was posted' },
            validThrough: { type: 'date', label: 'Application Deadline', help: 'Last date to apply' },
            employmentType: { 
                type: 'select',
                label: 'Employment Type',
                options: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN', 'VOLUNTEER', 'PER_DIEM', 'OTHER'],
                help: 'Type of employment'
            },
            hiringOrganization: { type: 'nested', label: 'Hiring Organization', help: 'Company offering the job' },
            jobLocation: { type: 'nested', label: 'Job Location', help: 'Where the job is located' },
            baseSalary: { type: 'nested', label: 'Salary', help: 'Salary range or amount' },
            experienceRequirements: { type: 'text', label: 'Experience Required', help: 'e.g., 3-5 years' },
            skills: { type: 'array', label: 'Required Skills', help: 'List each skill on a new line' },
            educationRequirements: { type: 'text', label: 'Education Requirements', help: 'Required education level' },
            incentiveCompensation: { type: 'text', label: 'Benefits/Incentives', help: 'Additional compensation details' }
        }
    },
    Course: {
        required: ['name', 'description', 'provider'],
        recommended: ['courseCode', 'coursePrerequisites', 'educationalCredentialAwarded'],
        fields: {
            name: { type: 'text', label: 'Course Name', help: 'Title of the course' },
            description: { type: 'textarea', label: 'Course Description', help: 'What the course covers' },
            provider: { type: 'nested', label: 'Course Provider', help: 'Organization offering the course' },
            courseCode: { type: 'text', label: 'Course Code', help: 'Unique identifier for the course' },
            coursePrerequisites: { type: 'text', label: 'Prerequisites', help: 'Required knowledge or courses' },
            educationalCredentialAwarded: { type: 'text', label: 'Credential Awarded', help: 'Certificate or degree earned' },
            numberOfCredits: { type: 'number', label: 'Credits', help: 'Number of credits earned' },
            timeRequired: { type: 'text', label: 'Duration', help: 'e.g., P6W for 6 weeks' },
            aggregateRating: { type: 'nested', label: 'Course Rating', help: 'Average rating from students' },
            offers: { type: 'nested-array', label: 'Pricing', help: 'Course pricing information' }
        }
    },
    NewsArticle: {
        required: ['headline', 'author', 'datePublished'],
        recommended: ['image', 'dateModified', 'publisher'],
        fields: {
            headline: { type: 'text', label: 'Headline', help: 'Article title' },
            image: { type: 'url', label: 'Article Image URL', help: 'Main image' },
            author: { type: 'nested', label: 'Author', help: 'Who wrote the article' },
            datePublished: { type: 'date', label: 'Date Published', help: 'Publication date' },
            dateModified: { type: 'date', label: 'Date Modified', help: 'Last update date' },
            publisher: { type: 'nested', label: 'Publisher', help: 'News organization' },
            description: { type: 'textarea', label: 'Description', help: 'Brief summary' },
            articleBody: { type: 'textarea', label: 'Article Body', help: 'Main content' }
        }
    },
    BlogPosting: {
        required: ['headline', 'author', 'datePublished'],
        recommended: ['image', 'dateModified', 'publisher'],
        fields: {
            headline: { type: 'text', label: 'Blog Title', help: 'Title of your blog post' },
            image: { type: 'url', label: 'Featured Image URL', help: 'Main blog image' },
            author: { type: 'nested', label: 'Author', help: 'Blog author' },
            datePublished: { type: 'date', label: 'Date Published', help: 'Publication date' },
            dateModified: { type: 'date', label: 'Date Modified', help: 'Last update' },
            publisher: { type: 'nested', label: 'Publisher', help: 'Blog publisher' },
            description: { type: 'textarea', label: 'Description', help: 'Blog summary' },
            articleBody: { type: 'textarea', label: 'Blog Content', help: 'Main content' }
        }
    },
    WebPage: {
        required: ['name'],
        recommended: ['url', 'description'],
        fields: {
            name: { type: 'text', label: 'Page Title', help: 'Title of the web page' },
            url: { type: 'url', label: 'Page URL', help: 'Full URL of this page' },
            description: { type: 'textarea', label: 'Page Description', help: 'What this page is about' }
        }
    },
    WebSite: {
        required: ['name', 'url'],
        recommended: ['description', 'publisher'],
        fields: {
            name: { type: 'text', label: 'Website Name', help: 'Name of your website' },
            url: { type: 'url', label: 'Website URL', help: 'Homepage URL' },
            description: { type: 'textarea', label: 'Website Description', help: 'What your website is about' },
            publisher: { type: 'nested', label: 'Publisher', help: 'Website owner' }
        }
    },
    VideoObject: {
        required: ['name', 'description'],
        recommended: ['thumbnailUrl', 'uploadDate', 'duration'],
        fields: {
            name: { type: 'text', label: 'Video Title', help: 'Title of the video' },
            description: { type: 'textarea', label: 'Video Description', help: 'What the video is about' },
            thumbnailUrl: { type: 'url', label: 'Thumbnail URL', help: 'Video thumbnail image' },
            uploadDate: { type: 'date', label: 'Upload Date', help: 'When video was uploaded' },
            duration: { type: 'text', label: 'Duration', help: 'e.g., PT4M30S for 4:30' },
            contentUrl: { type: 'url', label: 'Video URL', help: 'Direct video file URL' },
            embedUrl: { type: 'url', label: 'Embed URL', help: 'Video embed URL' }
        }
    },
    SoftwareApplication: {
        required: ['name'],
        recommended: ['offers', 'aggregateRating'],
        fields: {
            name: { type: 'text', label: 'Application Name', help: 'Name of the software' },
            operatingSystem: { type: 'text', label: 'Operating System', help: 'e.g., Windows, macOS, Android' },
            applicationCategory: { type: 'text', label: 'Category', help: 'e.g., GameApplication, BusinessApplication' },
            offers: { type: 'nested-array', label: 'Pricing', help: 'Price information' },
            aggregateRating: { type: 'nested', label: 'Rating', help: 'Average user rating' }
        }
    },
    Book: {
        required: ['name', 'author'],
        recommended: ['isbn', 'numberOfPages'],
        fields: {
            name: { type: 'text', label: 'Book Title', help: 'Title of the book' },
            author: { type: 'nested', label: 'Author', help: 'Book author' },
            isbn: { type: 'text', label: 'ISBN', help: 'International Standard Book Number' },
            numberOfPages: { type: 'number', label: 'Page Count', help: 'Total number of pages' },
            bookFormat: { type: 'text', label: 'Format', help: 'e.g., Hardcover, Paperback, EBook' }
        }
    },
    Movie: {
        required: ['name'],
        recommended: ['director', 'datePublished'],
        fields: {
            name: { type: 'text', label: 'Movie Title', help: 'Title of the movie' },
            director: { type: 'nested', label: 'Director', help: 'Movie director' },
            datePublished: { type: 'date', label: 'Release Date', help: 'When the movie was released' },
            duration: { type: 'text', label: 'Duration', help: 'e.g., PT2H30M for 2.5 hours' }
        }
    },
    MusicAlbum: {
        required: ['name', 'byArtist'],
        recommended: ['datePublished', 'numTracks'],
        fields: {
            name: { type: 'text', label: 'Album Title', help: 'Title of the album' },
            byArtist: { type: 'text', label: 'Artist', help: 'Album artist or band' },
            datePublished: { type: 'date', label: 'Release Date', help: 'Album release date' },
            numTracks: { type: 'number', label: 'Number of Tracks', help: 'Total tracks on album' }
        }
    },
    Service: {
        required: ['name'],
        recommended: ['description', 'provider'],
        fields: {
            name: { type: 'text', label: 'Service Name', help: 'Name of the service' },
            description: { type: 'textarea', label: 'Service Description', help: 'What the service offers' },
            provider: { type: 'nested', label: 'Service Provider', help: 'Who provides this service' },
            areaServed: { type: 'text', label: 'Service Area', help: 'Geographic area served' }
        }
    }
};