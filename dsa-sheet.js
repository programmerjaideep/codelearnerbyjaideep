// Theme Toggle and Progress Tracking
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

// Progress tracking
function updateProgress() {
    const total = problems.length;
    const solved = problems.filter(p => p.status === 'solved').length;
    const progress = (solved / total) * 100;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
}

// LeetCode-style Problems Data
const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "easy",
        acceptance: "48.2%",
        topics: ["arrays", "hash-table"],
        status: "solved",
        leetcode: "https://leetcode.com/problems/two-sum/"
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "medium",
        acceptance: "39.1%",
        topics: ["linked-lists", "math"],
        status: "todo",
        leetcode: "https://leetcode.com/problems/add-two-numbers/"
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "medium",
        acceptance: "33.8%",
        topics: ["strings", "sliding-window"],
        status: "attempted",
        leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "hard",
        acceptance: "35.1%",
        topics: ["arrays", "binary-search"],
        status: "todo",
        leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
    },
    {
        id: 5,
        title: "Longest Palindromic Substring",
        difficulty: "medium",
        acceptance: "31.7%",
        topics: ["strings", "dp"],
        status: "todo",
        leetcode: "https://leetcode.com/problems/longest-palindromic-substring/"
    },
    // Add more problems here...
    {
        id: 98,
        title: "Validate Binary Search Tree",
        difficulty: "medium",
        acceptance: "30.5%",
        topics: ["trees", "dfs"],
        status: "todo",
        leetcode: "https://leetcode.com/problems/validate-binary-search-tree/"
    },
    {
        id: 99,
        title: "Recover Binary Search Tree",
        difficulty: "hard",
        acceptance: "44.7%",
        topics: ["trees", "dfs"],
        status: "todo",
        leetcode: "https://leetcode.com/problems/recover-binary-search-tree/"
    },
    {
        id: 100,
        title: "Same Tree",
        difficulty: "easy",
        acceptance: "55.8%",
        topics: ["trees", "dfs"],
        status: "todo",
        leetcode: "https://leetcode.com/problems/same-tree/"
    }
];

// Loading animation
document.getElementById('problemsList').classList.add('loading');
setTimeout(() => {
    document.getElementById('problemsList').classList.remove('loading');
    renderProblems();
}, 1000);

// Enhanced render function
function renderProblems(filteredProblems = problems) {
    const container = document.getElementById('problemsList');
    container.innerHTML = '';

    filteredProblems.forEach((problem, index) => {
        const problemElement = document.createElement('div');
        problemElement.className = 'problem-item';
        problemElement.style.animationDelay = `${index * 0.05}s`;
        
        problemElement.innerHTML = `
            <div class="problem-number">
                <span class="status-indicator status-${problem.status}"></span>
                ${problem.id}
            </div>
            <div class="problem-title ${problem.status === 'solved' ? 'solved' : ''}">
                <a href="${problem.leetcode}" target="_blank" rel="noopener noreferrer">
                    ${problem.title}
                </a>
            </div>
            <div class="difficulty ${problem.difficulty}">${problem.difficulty}</div>
            <div class="acceptance">${problem.acceptance}</div>
            <div class="topics">
                ${problem.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>
        `;

        container.appendChild(problemElement);
    });

    updateProgress();
}

// Filter functionality
function applyFilters() {
    const searchTerm = document.getElementById('searchProblems').value.toLowerCase();
    const difficultyFilters = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => ['easy', 'medium', 'hard'].includes(cb.value))
        .reduce((acc, cb) => ({ ...acc, [cb.value]: cb.checked }), {});
    
    const topicFilters = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => !['easy', 'medium', 'hard', 'todo', 'solved', 'attempted'].includes(cb.value))
        .reduce((acc, cb) => ({ ...acc, [cb.value]: cb.checked }), {});
    
    const statusFilters = Array.from(document.querySelectorAll('input[type="checkbox"]'))
        .filter(cb => ['todo', 'solved', 'attempted'].includes(cb.value))
        .reduce((acc, cb) => ({ ...acc, [cb.value]: cb.checked }), {});

    const filteredProblems = problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchTerm);
        const matchesDifficulty = difficultyFilters[problem.difficulty];
        const matchesStatus = statusFilters[problem.status];
        const matchesTopics = problem.topics.some(topic => topicFilters[topic]);

        return matchesSearch && matchesDifficulty && matchesStatus && matchesTopics;
    });

    renderProblems(filteredProblems);
}

// Event listeners
document.getElementById('searchProblems').addEventListener('input', applyFilters);
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});
