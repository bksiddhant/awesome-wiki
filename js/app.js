/**
 * app.js - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    const parser = new window.MarkdownParser();
    
    // UI Elements
    const sidebarNav = document.getElementById('sidebar-nav');
    const contentContainer = document.getElementById('content-container');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // 1. Fetch and Parse Markdown
    // Note: Assuming 'raw-materials/main-content.md' is accessible relative to the root server.
    const sections = await parser.fetchMarkdown('raw-materials/main-content.md');
    
    if (sections.length === 0) {
        sidebarNav.innerHTML = '<p style="padding: 1rem; color: red;">Failed to load content.</p>';
        return;
    }

    // 2. Render Sidebar Navigation
    renderSidebar(sections);

    // 3. Render Content Wrapper
    renderAllSections(sections);

    // 4. Handle Routing
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    // 5. Handle Mobile Menu
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar on link click (mobile)
    sidebarNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });

    /* --- Helper Functions --- */

    function renderSidebar(sections) {
        const ul = document.createElement('ul');
        
        // Add Home link
        const homeLi = document.createElement('li');
        const homeA = document.createElement('a');
        homeA.href = '#home';
        homeA.textContent = 'Home';
        homeA.dataset.id = 'home';
        homeLi.appendChild(homeA);
        ul.appendChild(homeLi);

        // Add Section links
        sections.forEach(section => {
            if (section.items.length === 0) return; // Skip empty sections

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${section.id}`;
            a.textContent = section.title;
            a.dataset.id = section.id;
            
            // Add wave effect listener to sidebar links
            a.addEventListener('click', createWaveEffect);
            
            li.appendChild(a);
            ul.appendChild(li);
        });

        sidebarNav.innerHTML = '';
        sidebarNav.appendChild(ul);
    }

    function renderAllSections(sections) {
        // Render Home Section
        const homeSection = document.createElement('div');
        homeSection.className = 'markdown-section';
        homeSection.id = 'section-home';
        homeSection.innerHTML = `
            <div class="welcome-message">
                <h1>Welcome to Awesome Wiki</h1>
                <p>Discover the most amazing resources curated by the open source community.</p>
                <p style="margin-top: 1rem;">Select a category from the sidebar to begin exploring.</p>
            </div>
        `;
        contentContainer.appendChild(homeSection);

        // Render Data Sections
        sections.forEach(section => {
            if (section.items.length === 0) return;

            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'markdown-section';
            sectionDiv.id = `section-${section.id}`;
            
            const title = document.createElement('h2');
            title.textContent = section.title;
            sectionDiv.appendChild(title);

            const ul = document.createElement('ul');
            ul.className = 'repo-list';

            section.items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'repo-card';
                
                // Add wave effect listener to cards
                li.addEventListener('mousedown', createWaveEffect);

                li.addEventListener('click', (e) => {
                    // Do not navigate if user is selecting text
                    if (window.getSelection().toString().length > 0) return;
                    
                    // If target is already the anchor tag, it will navigate natively
                    if (e.target.closest('a')) return;
                    
                    window.open(item.url, '_blank', 'noopener,noreferrer');
                });

                li.innerHTML = `
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a>
                    <p class="repo-desc">${item.description}</p>
                `;
                ul.appendChild(li);
            });

            sectionDiv.appendChild(ul);
            contentContainer.appendChild(sectionDiv);
        });
    }

    function handleHashChange() {
        const hash = window.location.hash.substring(1) || 'home';
        
        // Update Active Links in Sidebar
        const links = sidebarNav.querySelectorAll('a');
        links.forEach(link => {
            if (link.dataset.id === hash) {
                link.classList.add('active');
                breadcrumbs.textContent = link.textContent;
            } else {
                link.classList.remove('active');
            }
        });

        // Show Active Section
        const sections = contentContainer.querySelectorAll('.markdown-section');
        sections.forEach(section => {
            if (section.id === `section-${hash}`) {
                section.classList.add('active');
                setImmediateWaveAnimation(section);
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    // Add staggered animation to loaded elements
    function setImmediateWaveAnimation(section) {
        const cards = section.querySelectorAll('.repo-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50); // Stagger
        });
    }

    // The beautiful wave/ripple effect for interactions
    function createWaveEffect(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        
        const wave = document.createElement('span');
        wave.className = 'wave';
        
        // Calculate size: max of width/height
        const size = Math.max(rect.width, rect.height);
        wave.style.width = wave.style.height = `${size}px`;
        
        // Calculate position relative to mouse click
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        
        element.appendChild(wave);
        
        // Remove after animation finishes
        setTimeout(() => {
            wave.remove();
        }, 600);
    }
});
