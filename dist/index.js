"use strict";
// Portfolio App with TypeScript
class PortfolioApp {
    constructor() {
        this.observer = null;
        this.currentTab = 'about';
        this.isAnimating = false;
        this.init();
    }
    init() {
        console.log('Portfolio app initialized');
        this.setupIntersectionObserver();
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupTabSystem();
    }
    setupTabSystem() {
        const aboutTab = document.getElementById('aboutTab');
        const designTab = document.getElementById('designTab');
        const aboutSection = document.getElementById('aboutSection');
        const designSection = document.getElementById('designSection');
        aboutTab?.addEventListener('click', () => this.switchTab('about'));
        designTab?.addEventListener('click', () => this.switchTab('design'));
    }
    async switchTab(tabName) {
        if (this.isAnimating || this.currentTab === tabName)
            return;
        this.isAnimating = true;
        const aboutTab = document.getElementById('aboutTab');
        const designTab = document.getElementById('designTab');
        const aboutSection = document.getElementById('aboutSection');
        const designSection = document.getElementById('designSection');
        // Update tab buttons
        aboutTab?.classList.toggle('active', tabName === 'about');
        aboutTab?.classList.toggle('text-primary', tabName === 'about');
        aboutTab?.classList.toggle('text-gray-500', tabName !== 'about');
        aboutTab?.classList.toggle('border-primary', tabName === 'about');
        aboutTab?.classList.toggle('border-transparent', tabName !== 'about');
        designTab?.classList.toggle('active', tabName === 'design');
        designTab?.classList.toggle('text-primary', tabName === 'design');
        designTab?.classList.toggle('text-gray-500', tabName !== 'design');
        designTab?.classList.toggle('border-primary', tabName === 'design');
        designTab?.classList.toggle('border-transparent', tabName !== 'design');
        // Fancy transition animation
        if (tabName === 'design') {
            await this.animateToDesign(aboutSection, designSection);
        }
        else {
            await this.animateToAbout(aboutSection, designSection);
        }
        this.currentTab = tabName;
        this.isAnimating = false;
    }
    async animateToDesign(aboutSection, designSection) {
        if (!aboutSection || !designSection)
            return;
        // Slide out about section
        aboutSection.style.transform = 'translateX(-100%)';
        aboutSection.style.opacity = '0';
        await this.delay(300);
        // Hide about, show design
        aboutSection.classList.add('hidden');
        aboutSection.classList.remove('active');
        designSection.classList.remove('hidden');
        await this.delay(50);
        // Prepare design section for entrance
        designSection.style.transform = 'translateX(100%)';
        designSection.style.opacity = '0';
        designSection.classList.add('active');
        await this.delay(50);
        // Slide in design section
        designSection.style.transform = 'translateX(0)';
        designSection.style.opacity = '1';
    }
    async animateToAbout(aboutSection, designSection) {
        if (!aboutSection || !designSection)
            return;
        // Slide out design section
        designSection.style.transform = 'translateX(100%)';
        designSection.style.opacity = '0';
        await this.delay(300);
        // Hide design, show about
        designSection.classList.add('hidden');
        designSection.classList.remove('active');
        aboutSection.classList.remove('hidden');
        await this.delay(50);
        // Prepare about section for entrance
        aboutSection.style.transform = 'translateX(-100%)';
        aboutSection.style.opacity = '0';
        aboutSection.classList.add('active');
        await this.delay(50);
        // Slide in about section
        aboutSection.style.transform = 'translateX(0)';
        aboutSection.style.opacity = '1';
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            this.fallbackAnimation();
            return;
        }
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        document.querySelectorAll('.design-card').forEach(el => {
            this.observer?.observe(el);
        });
    }
    fallbackAnimation() {
        document.querySelectorAll('.design-card').forEach(el => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 100);
        });
    }
    setupEventListeners() {
        // CV download tracking
        const cvButton = document.getElementById('cvButton');
        if (cvButton) {
            cvButton.addEventListener('click', () => {
                this.trackDownload('CV');
            });
        }
        // External link tracking
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = e.target;
                this.trackExternalLink(target.href);
            });
        });
        // Image click handlers for lightbox
        document.querySelectorAll('.design-image').forEach(img => {
            img.addEventListener('click', (e) => {
                this.handleImageClick(e.target);
            });
        });
    }
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    trackDownload(item) {
        console.log(`Downloaded: ${item}`);
    }
    trackExternalLink(url) {
        console.log(`External link clicked: ${url}`);
    }
    handleImageClick(img) {
        console.log('Image clicked:', img.alt);
        this.showImageModal(img.src, img.alt);
    }
    showImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 transition-opacity duration-300';
        modal.style.opacity = '0';
        modal.innerHTML = `
      <div class="relative max-w-6xl max-h-full transform scale-95 transition-transform duration-300">
        <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">
        <button class="absolute -top-4 -right-4 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg text-xl font-bold">
          ×
        </button>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          ${alt}
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            const content = modal.querySelector('div');
            content.style.transform = 'scale(1)';
        });
        const closeModal = () => {
            modal.style.opacity = '0';
            const content = modal.querySelector('div');
            content.style.transform = 'scale(0.95)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        const closeButton = modal.querySelector('button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
