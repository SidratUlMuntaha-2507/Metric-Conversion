// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = darkModeToggle.querySelector('i');

// Check for saved theme or preferred scheme
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
}

darkModeToggle.addEventListener('click', function() {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        theme = 'light';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
});

// Quick Conversion Function
function quickConvert() {
    const value = parseFloat(document.getElementById('quickValue').value);
    const fromUnit = document.getElementById('quickFrom').value;
    const toUnit = document.getElementById('quickTo').value;
    const resultElement = document.getElementById('quickResult');
    
    if (isNaN(value)) {
        resultElement.innerHTML = '<span style="color: #ff4444;">Please enter a valid number</span>';
        return;
    }
    
    let result;
    
    // Conversion factors
    const conversions = {
        // Length conversions
        'inches-cm': value * 2.54,
        'cm-inches': value / 2.54,
        'feet-meters': value * 0.3048,
        'meters-feet': value / 0.3048,
        'inches-feet': value / 12,
        'feet-inches': value * 12,
        'cm-meters': value / 100,
        'meters-cm': value * 100,
        
        // Temperature conversions
        'celsius-fahrenheit': (value * 9/5) + 32,
        'fahrenheit-celsius': (value - 32) * 5/9,
        'celsius-kelvin': value + 273.15,
        'kelvin-celsius': value - 273.15,
        'fahrenheit-kelvin': (value - 32) * 5/9 + 273.15,
        'kelvin-fahrenheit': (value - 273.15) * 9/5 + 32
    };
    
    const conversionKey = `${fromUnit}-${toUnit}`;
    
    if (conversions[conversionKey] !== undefined) {
        result = conversions[conversionKey].toFixed(4);
        resultElement.innerHTML = `
            <span style="color: white; font-weight: 600;">
                ${value} ${fromUnit} = ${result} ${toUnit}
            </span>
        `;
    } else {
        resultElement.innerHTML = '<span style="color: #ffdd44;">Please use dedicated converter for this conversion</span>';
    }
}

// Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    initCardInteractions();
});

function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const converterType = card.getAttribute('data-converter');
        const quickActionBtn = card.querySelector('.quick-action');
        const exploreActionBtn = card.querySelector('.explore-action');
        const overlay = card.querySelector('.card-overlay');
        const closeOverlay = card.querySelector('.close-overlay');
        const miniConvertBtn = card.querySelector('.mini-convert-btn');
        
        // Quick convert action
        if (quickActionBtn) {
            quickActionBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (overlay) {
                    overlay.classList.add('active');
                    card.style.zIndex = '100';
                }
            });
        }
        
        // Explore action
        if (exploreActionBtn) {
            exploreActionBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateToConverter(converterType);
            });
        }
        
        // Close overlay
        if (closeOverlay) {
            closeOverlay.addEventListener('click', function(e) {
                e.stopPropagation();
                if (overlay) {
                    overlay.classList.remove('active');
                    card.style.zIndex = '';
                }
            });
        }
        
        // Mini converter
        if (miniConvertBtn) {
            miniConvertBtn.addEventListener('click', function() {
                performMiniConversion(card, converterType);
            });
        }
    });
}

function performMiniConversion(card, converterType) {
    const miniInput = card.querySelector('.mini-input');
    const fromSelect = card.querySelector('.mini-select[data-unit="from"]');
    const toSelect = card.querySelector('.mini-select[data-unit="to"]');
    const miniResult = card.querySelector('.mini-result');
    
    if (!miniInput || !fromSelect || !toSelect || !miniResult) return;
    
    const value = parseFloat(miniInput.value);
    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;
    
    if (isNaN(value)) {
        miniResult.textContent = 'Enter a valid number';
        miniResult.style.color = '#ff4444';
        return;
    }
    
    let result;
    
    const conversions = {
        'length': {
            'inches-cm': value * 2.54,
            'cm-inches': value / 2.54,
            'feet-meters': value * 0.3048,
            'meters-feet': value / 0.3048
        },
        'area': {
            'sqft-sqm': value * 0.092903,
            'sqm-sqft': value / 0.092903,
            'acres-hectares': value * 0.404686,
            'hectares-acres': value / 0.404686
        },
        'volume': {
            'liters-gallons': value * 0.264172,
            'gallons-liters': value / 0.264172,
            'ml-liters': value / 1000,
            'liters-ml': value * 1000
        },
        'temperature': {
            'celsius-fahrenheit': (value * 9/5) + 32,
            'fahrenheit-celsius': (value - 32) * 5/9,
            'celsius-kelvin': value + 273.15,
            'kelvin-celsius': value - 273.15
        },
        'mass': {
            'kg-pounds': value * 2.20462,
            'pounds-kg': value / 2.20462,
            'grams-kg': value / 1000,
            'kg-grams': value * 1000
        }
    };
    
    const conversionKey = `${fromUnit}-${toUnit}`;
    const converterConversions = conversions[converterType];
    
    if (converterConversions && converterConversions[conversionKey] !== undefined) {
        result = converterConversions[conversionKey].toFixed(4);
        miniResult.textContent = `${value} ${fromUnit} = ${result} ${toUnit}`;
        miniResult.style.color = 'var(--primary-color)';
    } else {
        miniResult.textContent = 'Select different units';
        miniResult.style.color = '#ff8800';
    }
}

function navigateToConverter(converterType) {
    const pages = {
        'length': 'length.html',
        'area': 'area.html',
        'volume': 'volume.html',
        'temperature': 'temperature.html',
        'mass': 'mass.html',
        'currency': 'currency.html',
        'time': 'time.html',
        'angle': 'angle.html',
        'pressure': 'pressure.html',
        'energy-and-power': 'energy-and-power.html'
    };
    
    const page = pages[converterType];
    if (page) {
        window.location.href = page;
    }
}
// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        this.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Toggle icon between bars and times
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Handle dropdown toggles in mobile menu
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        });
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && 
            !event.target.closest('.mobile-menu') && 
            mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        body.classList.remove('menu-open');
        
        // Close all dropdowns
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-dropdown')) {
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCardInteractions();
    
    // Add active class to current page in mobile menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});