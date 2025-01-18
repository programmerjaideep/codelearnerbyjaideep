// Handle sidebar navigation
document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.doc-nav a');
    const searchInput = document.getElementById('searchDocs');

    // Active link handling
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.doc-section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const headings = section.querySelectorAll('h1, h2, h3');
            let visible = false;

            headings.forEach(heading => {
                if (heading.textContent.toLowerCase().includes(searchTerm)) {
                    visible = true;
                }
            });

            if (text.includes(searchTerm)) {
                visible = true;
            }

            section.style.display = visible ? 'block' : 'none';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.doc-section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.id;
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.documentation-container').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Search Functionality
const searchInput = document.getElementById('searchDocs');
const docSections = document.querySelectorAll('.doc-section');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    docSections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const shouldShow = content.includes(searchTerm);
        section.style.display = shouldShow ? 'block' : 'none';
    });
});

// Array Visualization
class ArrayVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.array = [1, 2, 3, 4, 5];
        this.setupCanvas();
        this.draw();
    }

    setupCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const elementWidth = width / this.array.length;

        ctx.clearRect(0, 0, width, height);

        this.array.forEach((value, index) => {
            const x = index * elementWidth;
            const h = (value / Math.max(...this.array)) * (height - 40);
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            ctx.fillRect(x + 5, height - h - 20, elementWidth - 10, h);
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-color');
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), x + elementWidth/2, height - 5);
        });
    }
}

// Stack Visualization
class StackVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.stack = [];
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const elementHeight = 40;

        ctx.clearRect(0, 0, width, height);

        this.stack.forEach((value, index) => {
            const y = height - (index + 1) * elementHeight - 20;
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            ctx.fillRect(width/4, y, width/2, elementHeight - 5);
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-color');
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), width/2, y + elementHeight/2);
        });
    }
}

// Queue Visualization
class QueueVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.queue = [];
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const elementWidth = Math.min(width / 8, 60);

        ctx.clearRect(0, 0, width, height);

        this.queue.forEach((value, index) => {
            const x = 20 + index * (elementWidth + 10);
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            ctx.fillRect(x, height/2 - 20, elementWidth, 40);
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-color');
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), x + elementWidth/2, height/2 + 5);

            if (index < this.queue.length - 1) {
                ctx.beginPath();
                ctx.moveTo(x + elementWidth + 2, height/2);
                ctx.lineTo(x + elementWidth + 8, height/2);
                ctx.strokeStyle = getComputedStyle(document.documentElement)
                    .getPropertyValue('--text-color');
                ctx.stroke();
            }
        });
    }
}

// Graph Visualization
class GraphVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = new Map();
        this.edges = [];
        this.setupCanvas();
        this.addDefaultGraph();
    }

    setupCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    addDefaultGraph() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) / 4;

        // Add nodes in a circle
        const nodeCount = 6;
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i * 2 * Math.PI) / nodeCount;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            this.nodes.set(String.fromCharCode(65 + i), { x, y });
        }

        // Add edges
        this.edges = [
            ['A', 'B'], ['B', 'C'], ['C', 'D'],
            ['D', 'E'], ['E', 'F'], ['F', 'A'],
            ['B', 'F'], ['C', 'E']
        ];

        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw edges
        ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--text-color');
        ctx.lineWidth = 2;

        this.edges.forEach(([from, to]) => {
            const fromNode = this.nodes.get(from);
            const toNode = this.nodes.get(to);
            
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach((pos, label) => {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            ctx.fill();
            
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--card-bg');
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, pos.x, pos.y);
        });
    }
}

// Initialize visualizations
document.addEventListener('DOMContentLoaded', () => {
    const arrayViz = new ArrayVisualizer('arrayVisualizer');
    const stackViz = new StackVisualizer('stackVisualizer');
    const queueViz = new QueueVisualizer('queueVisualizer');
    const graphViz = new GraphVisualizer('graphVisualizer');

    // Handle window resize
    window.addEventListener('resize', () => {
        arrayViz.setupCanvas();
        arrayViz.draw();
        stackViz.setupCanvas();
        stackViz.draw();
        queueViz.setupCanvas();
        queueViz.draw();
        graphViz.setupCanvas();
        graphViz.draw();
    });

    // Initialize demo data
    stackViz.stack = [1, 2, 3];
    stackViz.draw();
    
    queueViz.queue = [1, 2, 3, 4];
    queueViz.draw();
});

// Code syntax highlighting
Prism.highlightAll();
