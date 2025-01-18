// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });

    roadmapItems.forEach((item, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', reveal);

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for style changes
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Code editor functionality
const codeEditor = document.getElementById('code-editor');
const languageSelect = document.getElementById('language');
const runButton = document.getElementById('run-code');
const output = document.getElementById('output');

// Sample starter code for different languages
const starterCode = {
    python: '# Write your Python code here\nprint("Hello, World!")',
    javascript: '// Write your JavaScript code here\nconsole.log("Hello, World!");',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
};

// Update editor content when language changes
languageSelect.addEventListener('change', () => {
    codeEditor.value = starterCode[languageSelect.value];
});

// Set initial code
codeEditor.value = starterCode[languageSelect.value];

// Run code functionality using Judge0 API
runButton.addEventListener('click', async () => {
    output.innerHTML = '<p>Running code...</p>';
    
    const language_ids = {
        'python': 71,
        'javascript': 63,
        'java': 62,
        'cpp': 54
    };

    try {
        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Replace with your RapidAPI key
            },
            body: JSON.stringify({
                language_id: language_ids[languageSelect.value],
                source_code: codeEditor.value,
                stdin: ''
            })
        });

        const data = await response.json();
        
        // Get submission result
        setTimeout(async () => {
            const result = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${data.token}`, {
                headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Replace with your RapidAPI key
                }
            });
            
            const resultData = await result.json();
            
            if (resultData.stdout) {
                output.innerHTML = `<pre>${resultData.stdout}</pre>`;
            } else if (resultData.stderr) {
                output.innerHTML = `<pre class="error">${resultData.stderr}</pre>`;
            } else if (resultData.compile_output) {
                output.innerHTML = `<pre class="error">${resultData.compile_output}</pre>`;
            }
        }, 2000);

    } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});

// DSA Progress Tracking
const dsaProgress = {
    'Arrays': 0,
    'Linked Lists': 0,
    'Trees': 0,
    'Dynamic Programming': 0
};

function updateDSAProgress() {
    Object.keys(dsaProgress).forEach(topic => {
        const card = document.querySelector(`[data-topic="${topic}"]`);
        if (card) {
            const progressBar = card.querySelector('.dsa-progress-bar');
            if (progressBar) {
                progressBar.style.width = `${dsaProgress[topic]}%`;
            }
        }
    });
}

// Simulate completing DSA problems
document.querySelectorAll('.dsa-card').forEach(card => {
    card.addEventListener('click', () => {
        const topic = card.getAttribute('data-topic');
        if (dsaProgress[topic] < 100) {
            dsaProgress[topic] += 10;
            updateDSAProgress();
            
            // Save progress to localStorage
            localStorage.setItem('dsaProgress', JSON.stringify(dsaProgress));
        }
    });
});

// Load saved DSA progress
const savedProgress = localStorage.getItem('dsaProgress');
if (savedProgress) {
    Object.assign(dsaProgress, JSON.parse(savedProgress));
    updateDSAProgress();
}

// Add syntax highlighting (simplified version)
codeEditor.addEventListener('input', function() {
    // Here you could integrate a syntax highlighting library
    // like Prism.js or highlight.js for real syntax highlighting
});

// Course enrollment simulation
document.querySelectorAll('.course-card button').forEach(button => {
    button.addEventListener('click', function() {
        const courseName = this.parentElement.querySelector('h3').textContent;
        alert(`Enrolled in ${courseName}! (This is a demo)`);
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    reveal();
    updateDSAProgress();
    
    // Add animation class to nav links
    document.querySelectorAll('.nav-links li').forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, index * 100);
    });
});
