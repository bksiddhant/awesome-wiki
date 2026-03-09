/**
 * parser.js - Parses the awesome markdown file
 */

class MarkdownParser {
    constructor() {
        this.sections = [];
    }

    async fetchMarkdown(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch markdown');
            const text = await response.text();
            this.parse(text);
            return this.sections;
        } catch (error) {
            console.error("Error fetching markdown:", error);
            return [];
        }
    }

    parse(markdownText) {
        this.sections = [];
        const lines = markdownText.split('\n');
        
        let currentSection = null;
        let isContentsSection = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('## Contents')) {
                isContentsSection = true;
                continue;
            }

            // Detect '## Section Name'
            if (line.startsWith('## ')) {
                isContentsSection = false;
                const title = line.substring(3).trim();
                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                currentSection = {
                    id: id,
                    title: title,
                    items: []
                };
                this.sections.push(currentSection);
                continue;
            }

            // Parse repo items if we are inside a section (and not in Contents)
            if (currentSection && !isContentsSection) {
                // Match patterns like: - [Name](url) - Description
                // or: - [Name](url)
                
                // Allow nested lists intuitively (ignoring exact depth for simplicity)
                if (line.match(/^[-*]\s+\[(.*?)\]\((.*?)\)/)) {
                    const match = line.match(/^[-*]\s+\[(.*?)\]\((.*?)\)(?:\s*-\s*(.*))?/);
                    if (match) {
                        const [, name, url, description] = match;
                        
                        let shortDesc = description ? this.shortenDescription(description) : 'Awesome resource.';
                        
                        currentSection.items.push({
                            name: name.trim(),
                            url: url.trim(),
                            description: shortDesc
                        });
                    }
                }
            }
        }
    }

    shortenDescription(desc) {
        if (!desc) return '';
        // Remove trailing dot if exists for clean processing
        let cleanDesc = desc.trim();
        if (cleanDesc.endsWith('.')) cleanDesc = cleanDesc.slice(0, -1);
        
        const words = cleanDesc.split(/\s+/);
        if (words.length <= 10) {
            return cleanDesc + '.';
        }
        
        return words.slice(0, 10).join(' ') + '...';
    }
}

// Export for app.js
window.MarkdownParser = MarkdownParser;
