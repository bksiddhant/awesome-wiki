/**
 * visuals.js - Special Visual Effects & Particle System
 */

class ParticleSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'particle-container';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(this.container);
        
        this.particles = [];
        this.maxParticles = 50;
        this.colors = ['#0000EE', '#08B4FF', '#FFFFFF', '#FFD700'];
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.7) { // Rate limit spawning
                this.createParticle(e.clientX, e.clientY);
            }
        });

        this.animate();
    }

    createParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            const p = this.particles.shift();
            p.element.remove();
        }

        const element = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 ${size * 2}px ${color};
            opacity: ${Math.random() * 0.5 + 0.5};
            pointer-events: none;
            transition: transform 1s ease-out, opacity 1s ease-out;
        `;

        this.container.appendChild(element);

        const particle = {
            element,
            x,
            y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.02
        };

        this.particles.push(particle);

        // Schedule removal
        setTimeout(() => {
            element.style.transform = `translate(${particle.vx * 50}px, ${particle.vy * 50}px) scale(0)`;
            element.style.opacity = '0';
        }, 10);
    }

    animate() {
        this.particles = this.particles.filter(p => {
            p.life -= p.decay;
            if (p.life <= 0) {
                p.element.remove();
                return false;
            }
            return true;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on load
window.addEventListener('load', () => {
    new ParticleSystem();
});
