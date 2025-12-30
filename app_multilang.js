// 多语言应用逻辑
let currentCategory = 'all';
let currentSearchTerm = '';
let showTraditional = false; // 是否显示繁体中文列

// DOM 元素
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const tableBody = document.getElementById('tableBody');
const resultCount = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clearBtn');
const showTraditionalToggle = document.getElementById('showTraditionalToggle');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderTable(gameDataMultiLang);
    updateResultCount(gameDataMultiLang.length);
    
    // 搜索事件
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // 分类筛选事件
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => handleFilterClick(btn));
    });
    
    // 繁体中文显示切换事件
    showTraditionalToggle.addEventListener('change', handleTraditionalToggle);
    
    clearBtn.addEventListener('click', clearFilters);
});

// 繁体中文显示切换处理
function handleTraditionalToggle() {
    showTraditional = showTraditionalToggle.checked;
    
    // 切换表头和表格单元格的显示
    const traditionalCols = document.querySelectorAll('.col-traditional');
    traditionalCols.forEach(col => {
        if (showTraditional) {
            col.classList.add('show');
        } else {
            col.classList.remove('show');
        }
    });
}

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
        
        // 构建表格行，默认显示英文+简体中文，可选显示繁体中文
        row.innerHTML = `
            <td><span class="category-badge category-${item.category}">${getCategoryName(item.category)}</span></td>
            <td>${highlightText(item.english, currentSearchTerm)}</td>
            <td>${highlightText(item.chinese_simplified, currentSearchTerm)}</td>
            <td class="col-traditional ${showTraditional ? 'show' : ''}">${highlightText(item.chinese_traditional, currentSearchTerm)}</td>
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
    let filteredData = gameDataMultiLang;
    
    // 分类筛选
    if (currentCategory !== 'all') {
        filteredData = filteredData.filter(item => item.category === currentCategory);
    }
    
    // 搜索筛选（支持多语言）
    if (currentSearchTerm) {
        filteredData = filteredData.filter(item => {
            const searchInCN = item.chinese_simplified.toLowerCase().includes(currentSearchTerm);
            const searchInTW = item.chinese_traditional.toLowerCase().includes(currentSearchTerm);
            const searchInEN = item.english.toLowerCase().includes(currentSearchTerm);
            const searchInNote = item.note.toLowerCase().includes(currentSearchTerm);
            
            return searchInCN || searchInTW || searchInEN || searchInNote;
        });
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
    
    renderTable(gameDataMultiLang);
    updateResultCount(gameDataMultiLang.length);
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
