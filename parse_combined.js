// 解析中英文 PoE2DB JSON 数据并生成完整对照表
const fs = require('fs');

// 读取中文和英文数据
const cnData = JSON.parse(fs.readFileSync('poe2db_data.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('poe2db_data_en.json', 'utf8'));

console.log(`读取中文数据: ${cnData.length} 条`);
console.log(`读取英文数据: ${enData.length} 条`);

// 创建英文到中文的映射
const valueMap = {};
cnData.forEach(item => {
    valueMap[item.value] = item;
});

// 分类映射
const categoryMap = {
    '技能宝石': 'skills',
    'Skill Gems': 'skills',
    '辅助宝石': 'skills',
    'Support Gems': 'skills',
    '灵魂宝石': 'skills',
    'Spirit Gems': 'skills',
    '传奇': 'items',
    'Unique': 'items',
    '可堆叠通货': 'currency',
    'Stackable Currency': 'currency',
    '货币': 'currency',
    '精华': 'currency',
    'Essence': 'currency',
    '催化剂': 'currency',
    'Catalyst': 'currency',
    '裂界碎片': 'currency',
    'Keywords': 'mechanics',
    'Passive': 'mods',
    '天赋': 'mods',
    '怪物': 'monsters',
    'Monster': 'monsters',
    '首领': 'monsters',
    'Boss': 'monsters',
    'WorldAreas': 'mechanics',
    '角色': 'mechanics',
    'Character': 'mechanics',
    '裂隙石': 'items',
    'Breachstone': 'items',
    '永恒珠宝': 'items',
    '巅峰钥匙': 'items',
    '词缀': 'mods',
    '升华试炼': 'mechanics',
    'Ascendancy': 'mechanics',
};

// 转换数据
const gameData = [];
const processed = new Set();

enData.forEach(enItem => {
    const cnItem = valueMap[enItem.value];
    
    if (!cnItem || processed.has(enItem.value)) {
        return;
    }
    
    processed.add(enItem.value);
    
    // 确定分类
    let category = 'mechanics';
    
    if (categoryMap[enItem.desc]) {
        category = categoryMap[enItem.desc];
    } else if (categoryMap[cnItem.desc]) {
        category = categoryMap[cnItem.desc];
    } else if (enItem.class === 'item_gem') {
        category = 'skills';
    } else if (enItem.class === 'uniqueitem') {
        category = 'items';
    } else if (enItem.class === 'item_currency') {
        category = 'currency';
    }
    
    // 清理英文名称
    let englishName = enItem.label;
    if (englishName === cnItem.label) {
        // 如果英文名和中文名相同，使用value作为英文名
        englishName = enItem.value.replace(/_/g, ' ');
    }
    
    gameData.push({
        category: category,
        english: englishName,
        chinese: cnItem.label,
        note: cnItem.desc || enItem.desc || ''
    });
});

console.log(`\n成功匹配生成: ${gameData.length} 条数据`);

// 统计各分类数量
const stats = {};
gameData.forEach(item => {
    stats[item.category] = (stats[item.category] || 0) + 1;
});

console.log('\n分类统计:');
Object.entries(stats).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
});

// 按分类排序
gameData.sort((a, b) => {
    if (a.category !== b.category) {
        const order = ['skills', 'items', 'currency', 'mods', 'mechanics', 'monsters'];
        return order.indexOf(a.category) - order.indexOf(b.category);
    }
    return a.chinese.localeCompare(b.chinese, 'zh-CN');
});

// 生成 JavaScript 文件
const output = `// 流放之路2 中英文对照数据
// 数据来源: PoE2DB (https://poe2db.tw/)
// 自动生成于: ${new Date().toLocaleString('zh-CN')}
// 总计: ${gameData.length} 条

const gameData = ${JSON.stringify(gameData, null, 2)};
`;

fs.writeFileSync('data.js', output, 'utf8');
console.log(`\n✅ 数据已生成并覆盖到 data.js`);
console.log(`✅ 共生成 ${gameData.length} 条完整中英文对照数据`);
