// 应用主逻辑
let currentCategory = 'all';
let currentSearchTerm = '';

// DOM 元素
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const tableBody = document.getElementById('tableBody');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clearBtn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderTable(gameData);
    updateResultCount(gameData.length);
    
    // 事件监听
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => handleFilterClick(btn));
    });
    
    clearBtn.addEventListener('click', clearFilters);
});

// 渲染表格
function renderTable(data) {
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        noResults.style.display = 'block';
        document.querySelector('.table-container').style.display = 'none';
        return;
    }
    
    noResults.style.display = 'none';
    document.querySelector('.table-container').style.display = 'block';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="category-badge category-${item.category}">${getCategoryName(item.category)}</span></td>
            <td>${highlightText(item.english, currentSearchTerm)}</td>
            <td>${highlightText(item.chinese, currentSearchTerm)}</td>
            <td>${item.note}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 搜索处理
function handleSearch() {
    currentSearchTerm = searchInput.value.trim().toLowerCase();
    filterAndRender();
}

// 筛选按钮处理
function handleFilterClick(btn) {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterAndRender();
}

// 筛选并渲染
function filterAndRender() {
    let filteredData = gameData;
    
    // 分类筛选
    if (currentCategory !== 'all') {
        filteredData = filteredData.filter(item => item.category === currentCategory);
    }
    
    // 搜索筛选
    if (currentSearchTerm) {
        filteredData = filteredData.filter(item => 
            item.english.toLowerCase().includes(currentSearchTerm) ||
            item.chinese.includes(currentSearchTerm) ||
            item.note.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    renderTable(filteredData);
    updateResultCount(filteredData.length);
}

// 清除筛选
function clearFilters() {
    currentCategory = 'all';
    currentSearchTerm = '';
    searchInput.value = '';
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    filterBtns[0].classList.add('active');
    
    renderTable(gameData);
    updateResultCount(gameData.length);
}

// 更新结果计数
function updateResultCount(count) {
    resultCount.innerHTML = `共 <strong>${count}</strong> 条结果`;
}

// 高亮搜索文本
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(139, 92, 246, 0.3); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// 转义正则表达式特殊字符
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 获取分类中文名
function getCategoryName(category) {
    const names = {
        'skills': '技能',
        'items': '装备',
        'mods': '词条',
        'mechanics': '机制',
        'currency': '货币',
        'monsters': '怪物'
    };
    return names[category] || category;
}
