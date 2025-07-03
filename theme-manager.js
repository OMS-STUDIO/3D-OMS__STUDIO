// Gestionnaire de thèmes et personnalisation avancée pour 3D OMS__STUDIO

class ThemeManager {
    constructor() {
        this.themes = {
            default: {
                name: 'Défaut',
                primary: '#667eea',
                secondary: '#764ba2',
                accent: '#28a745',
                background: 'gradient'
            },
            ocean: {
                name: 'Océan',
                primary: '#0077be',
                secondary: '#00a8cc',
                accent: '#00d4aa',
                background: 'gradient'
            },
            sunset: {
                name: 'Coucher de soleil',
                primary: '#ff6b6b',
                secondary: '#ffa726',
                accent: '#ffcc02',
                background: 'gradient'
            },
            forest: {
                name: 'Forêt',
                primary: '#2e7d32',
                secondary: '#388e3c',
                accent: '#66bb6a',
                background: 'gradient'
            },
            purple: {
                name: 'Violet',
                primary: '#7b1fa2',
                secondary: '#8e24aa',
                accent: '#ab47bc',
                background: 'gradient'
            },
            dark: {
                name: 'Sombre',
                primary: '#1a1a1a',
                secondary: '#2d2d2d',
                accent: '#4a4a4a',
                background: 'solid'
            }
        };
        
        this.currentTheme = 'default';
        this.customSettings = {};
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.createThemeSelector();
    }

    loadSettings() {
        const saved = localStorage.getItem('studioSettings');
        if (saved) {
            try {
                this.customSettings = JSON.parse(saved);
                this.applySettings(this.customSettings);
            } catch (e) {
                console.warn('Erreur lors du chargement des paramètres:', e);
            }
        }
    }

    saveSettings() {
        localStorage.setItem('studioSettings', JSON.stringify(this.customSettings));
    }

    applySettings(settings) {
        const root = document.documentElement;
        
        // Appliquer les couleurs
        if (settings.primaryColor) {
            root.style.setProperty('--primary-color', settings.primaryColor);
            root.style.setProperty('--theme-primary', settings.primaryColor);
        }
        
        if (settings.secondaryColor) {
            root.style.setProperty('--secondary-color', settings.secondaryColor);
            root.style.setProperty('--theme-secondary', settings.secondaryColor);
        }
        
        if (settings.accentColor) {
            root.style.setProperty('--accent-color', settings.accentColor);
            root.style.setProperty('--theme-accent', settings.accentColor);
        }

        // Appliquer le nom d'utilisateur
        if (settings.userName && settings.userSurname) {
            root.style.setProperty('--user-name', `"${settings.userName}"`);
            root.style.setProperty('--user-surname', `"${settings.userSurname}"`);
        }

        // Appliquer le type de fond
        this.applyBackground(settings);

        // Appliquer les effets visuels
        if (settings.enableAnimations !== undefined) {
            this.toggleAnimations(settings.enableAnimations);
        }

        if (settings.enableGlassEffect !== undefined) {
            this.toggleGlassEffect(settings.enableGlassEffect);
        }
    }

    applyBackground(settings) {
        const root = document.documentElement;
        
        switch (settings.backgroundType) {
            case 'solid':
                root.style.setProperty('--background-color', settings.primaryColor || '#667eea');
                break;
            case 'custom-gradient':
                root.style.setProperty('--background-color', 
                    `linear-gradient(135deg, ${settings.primaryColor || '#667eea'} 0%, ${settings.secondaryColor || '#764ba2'} 100%)`);
                break;
            case 'image':
                if (settings.backgroundImage) {
                    root.style.setProperty('--background-color', 
                        `url(${settings.backgroundImage}) center/cover, linear-gradient(135deg, ${settings.primaryColor || '#667eea'} 0%, ${settings.secondaryColor || '#764ba2'} 100%)`);
                }
                break;
            default:
                root.style.setProperty('--background-color', 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        }
    }

    applyTheme(themeKey) {
        const theme = this.themes[themeKey];
        if (!theme) return;

        this.currentTheme = themeKey;
        
        const settings = {
            ...this.customSettings,
            primaryColor: theme.primary,
            secondaryColor: theme.secondary,
            accentColor: theme.accent,
            backgroundType: theme.background
        };

        this.customSettings = settings;
        this.applySettings(settings);
        this.saveSettings();
    }

    createThemeSelector() {
        const settingsContent = document.querySelector('.settings-content');
        if (!settingsContent) return;

        const themeGroup = document.createElement('div');
        themeGroup.className = 'setting-group';
        themeGroup.innerHTML = `
            <label>Thème prédéfini :</label>
            <div class="theme-grid">
                ${Object.entries(this.themes).map(([key, theme]) => `
                    <div class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                         data-theme="${key}">
                        <div class="theme-preview">
                            <div class="theme-color" style="background: ${theme.primary}"></div>
                            <div class="theme-color" style="background: ${theme.secondary}"></div>
                            <div class="theme-color" style="background: ${theme.accent}"></div>
                        </div>
                        <span class="theme-name">${theme.name}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Insérer avant le groupe de couleur principale
        const primaryColorGroup = document.getElementById('primaryColorGroup');
        if (primaryColorGroup) {
            settingsContent.insertBefore(themeGroup, primaryColorGroup);
        }

        // Ajouter les styles CSS pour la grille de thèmes
        this.addThemeStyles();

        // Ajouter les événements
        themeGroup.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const themeKey = option.dataset.theme;
                this.applyTheme(themeKey);
                
                // Mettre à jour l'interface
                themeGroup.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Mettre à jour les champs de couleur
                this.updateColorInputs();
            });
        });
    }

    addThemeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 12px;
                margin-top: 8px;
            }

            .theme-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
            }

            .theme-option:hover {
                border-color: var(--primary-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .theme-option.active {
                border-color: var(--primary-color);
                background: rgba(102, 126, 234, 0.1);
            }

            .theme-preview {
                display: flex;
                gap: 4px;
                margin-bottom: 8px;
            }

            .theme-color {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .theme-name {
                font-size: 0.8rem;
                font-weight: 500;
                text-align: center;
                color: var(--text-color);
            }

            .advanced-options {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
            }

            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }

            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: 0.3s;
                border-radius: 24px;
            }

            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }

            input:checked + .toggle-slider {
                background-color: var(--primary-color);
            }

            input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }

            .setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
        `;
        document.head.appendChild(style);
    }

    updateColorInputs() {
        const theme = this.themes[this.currentTheme];
        if (!theme) return;

        const primaryColor = document.getElementById('primaryColor');
        const primaryColorText = document.getElementById('primaryColorText');
        const secondaryColor = document.getElementById('secondaryColor');
        const secondaryColorText = document.getElementById('secondaryColorText');
        const accentColor = document.getElementById('accentColor');
        const accentColorText = document.getElementById('accentColorText');

        if (primaryColor && primaryColorText) {
            primaryColor.value = theme.primary;
            primaryColorText.value = theme.primary;
        }

        if (secondaryColor && secondaryColorText) {
            secondaryColor.value = theme.secondary;
            secondaryColorText.value = theme.secondary;
        }

        if (accentColor && accentColorText) {
            accentColor.value = theme.accent;
            accentColorText.value = theme.accent;
        }
    }

    setupEventListeners() {
        // Écouter les changements de couleur en temps réel
        document.addEventListener('input', (e) => {
            if (e.target.type === 'color' || e.target.type === 'text') {
                this.handleColorChange(e.target);
            }
        });

        // Écouter les changements de paramètres
        document.addEventListener('change', (e) => {
            if (e.target.matches('#backgroundType, #userName, #userSurname')) {
                this.handleSettingChange(e.target);
            }
        });
    }

    handleColorChange(input) {
        const id = input.id;
        const value = input.value;

        // Validation de couleur hexadécimale
        if (input.type === 'text' && !/^#[0-9A-F]{6}$/i.test(value)) {
            return;
        }

        // Synchroniser les inputs couleur et texte
        if (id.includes('Color')) {
            const textInput = document.getElementById(id + 'Text');
            const colorInput = document.getElementById(id.replace('Text', ''));
            
            if (input.type === 'color' && textInput) {
                textInput.value = value;
            } else if (input.type === 'text' && colorInput) {
                colorInput.value = value;
            }
        }

        // Appliquer la couleur en temps réel
        this.applyColorPreview(id, value);
    }

    applyColorPreview(id, value) {
        const root = document.documentElement;
        
        switch (id) {
            case 'primaryColor':
            case 'primaryColorText':
                root.style.setProperty('--primary-color', value);
                root.style.setProperty('--theme-primary', value);
                break;
            case 'secondaryColor':
            case 'secondaryColorText':
                root.style.setProperty('--secondary-color', value);
                root.style.setProperty('--theme-secondary', value);
                break;
            case 'accentColor':
            case 'accentColorText':
                root.style.setProperty('--accent-color', value);
                root.style.setProperty('--theme-accent', value);
                break;
        }

        // Mettre à jour le fond si nécessaire
        const backgroundType = document.getElementById('backgroundType')?.value;
        if (backgroundType === 'custom-gradient' || backgroundType === 'solid') {
            this.applyBackground({
                backgroundType,
                primaryColor: document.getElementById('primaryColor')?.value,
                secondaryColor: document.getElementById('secondaryColor')?.value
            });
        }
    }

    handleSettingChange(input) {
        const id = input.id;
        const value = input.value;

        switch (id) {
            case 'userName':
            case 'userSurname':
                this.updateUserName();
                break;
            case 'backgroundType':
                this.updateBackground();
                break;
        }
    }

    updateUserName() {
        const userName = document.getElementById('userName')?.value || 'Utilisateur';
        const userSurname = document.getElementById('userSurname')?.value || 'Studio';
        
        const root = document.documentElement;
        root.style.setProperty('--user-name', `"${userName}"`);
        root.style.setProperty('--user-surname', `"${userSurname}"`);
    }

    updateBackground() {
        const backgroundType = document.getElementById('backgroundType')?.value;
        const primaryColor = document.getElementById('primaryColor')?.value;
        const secondaryColor = document.getElementById('secondaryColor')?.value;

        this.applyBackground({
            backgroundType,
            primaryColor,
            secondaryColor
        });
    }

    toggleAnimations(enabled) {
        const body = document.body;
        if (enabled) {
            body.classList.remove('no-animations');
        } else {
            body.classList.add('no-animations');
        }
    }

    toggleGlassEffect(enabled) {
        const body = document.body;
        if (enabled) {
            body.classList.add('glass-effect');
        } else {
            body.classList.remove('glass-effect');
        }
    }

    exportSettings() {
        const settings = {
            ...this.customSettings,
            theme: this.currentTheme,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'oms-studio-settings.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }

    importSettings(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settings = JSON.parse(e.target.result);
                this.customSettings = settings;
                this.applySettings(settings);
                this.saveSettings();
                
                // Mettre à jour l'interface
                this.updateFormFields();
                
                alert('Paramètres importés avec succès !');
            } catch (error) {
                alert('Erreur lors de l\'importation des paramètres.');
                console.error('Erreur d\'importation:', error);
            }
        };
        reader.readAsText(file);
    }

    updateFormFields() {
        const settings = this.customSettings;
        
        // Mettre à jour tous les champs du formulaire
        Object.entries(settings).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) {
                input.value = value;
            }
        });
    }

    resetToDefault() {
        this.customSettings = {};
        this.currentTheme = 'default';
        
        // Supprimer les paramètres sauvegardés
        localStorage.removeItem('studioSettings');
        
        // Réinitialiser les styles
        const root = document.documentElement;
        root.style.removeProperty('--primary-color');
        root.style.removeProperty('--secondary-color');
        root.style.removeProperty('--accent-color');
        root.style.removeProperty('--user-name');
        root.style.removeProperty('--user-surname');
        root.style.removeProperty('--background-color');
        
        // Recharger la page pour appliquer les valeurs par défaut
        location.reload();
    }
}

// Animation et effets visuels
class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
        this.setupParticleBackground();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        // Observer tous les éléments avec la classe 'animate-on-scroll'
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupParticleBackground() {
        // Créer un canvas pour les particules de fond
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        // Redimensionner le canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Créer des particules
        function createParticles() {
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1
                });
            }
        }
        
        // Animer les particules
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Rebond sur les bords
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Dessiner la particule
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Initialiser
        resizeCanvas();
        createParticles();
        animateParticles();
        
        window.addEventListener('resize', resizeCanvas);
    }

    addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', function() {
    window.themeManager = new ThemeManager();
    window.visualEffects = new VisualEffects();
    
    // Ajouter l'effet ripple aux boutons
    document.querySelectorAll('button, .btn').forEach(btn => {
        window.visualEffects.addRippleEffect(btn);
    });
});

// Styles CSS pour les effets
const effectStyles = `
    .no-animations * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .glass-effect .card-floating,
    .glass-effect .upload-section,
    .glass-effect .controls-section,
    .glass-effect .viewer-section {
        background: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .animate-on-scroll.animate-fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Ajouter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = effectStyles;
document.head.appendChild(styleSheet);
