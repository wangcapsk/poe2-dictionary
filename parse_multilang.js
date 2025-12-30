// 解析多语言 PoE2DB JSON 数据并生成完整对照表
// 支持：简体中文、繁体中文、英文
const fs = require('fs');

// 读取三种语言数据
const cnData = JSON.parse(fs.readFileSync('poe2db_data.json', 'utf8'));      // 简体中文
const twData = JSON.parse(fs.readFileSync('poe2db_data_tw.json', 'utf8'));   // 繁体中文
const enData = JSON.parse(fs.readFileSync('poe2db_data_en.json', 'utf8'));   // 英文

console.log(`读取简体中文数据: ${cnData.length} 条`);
console.log(`读取繁体中文数据: ${twData.length} 条`);
console.log(`读取英文数据: ${enData.length} 条`);

// 创建映射表
const cnMap = {};
const twMap = {};

cnData.forEach(item => {
    cnMap[item.value] = item;
});

twData.forEach(item => {
    twMap[item.value] = item;
});

// 分类映射
const categoryMap = {
    '技能宝石': 'skills',
    'Skill Gems': 'skills',
    '辅助宝石': 'skills',
    'Support Gems': 'skills',
    '灵魂宝石': 'skills',
    'Spirit Gems': 'skills',
    '傳奇': 'items',
    '传奇': 'items',
    'Unique': 'items',
    '可堆叠通货': 'currency',
    '可堆疊通貨': 'currency',
    'Stackable Currency': 'currency',
    '货币': 'currency',
    '貨幣': 'currency',
    '精华': 'currency',
    '精髓': 'currency',
    'Essence': 'currency',
    '催化剂': 'currency',
    'Catalyst': 'currency',
    '裂界碎片': 'currency',
    'Keywords': 'mechanics',
    'Passive': 'mods',
    '天赋': 'mods',
    '天賦': 'mods',
    '怪物': 'monsters',
    'Monster': 'monsters',
    '首领': 'monsters',
    '首領': 'monsters',
    'Boss': 'monsters',
    'WorldAreas': 'mechanics',
    '角色': 'mechanics',
    'Character': 'mechanics',
    '裂隙石': 'items',
    'Breachstone': 'items',
    '永恒珠宝': 'items',
    '永恆珠寶': 'items',
    '巅峰钥匙': 'items',
    '巔峰鑰匙': 'items',
    '词缀': 'mods',
    '詞綴': 'mods',
    '升华试炼': 'mechanics',
    '昇華試煉': 'mechanics',
    'Ascendancy': 'mechanics',
};

// 转换数据（包含三语言）
const gameData = [];
const processed = new Set();

enData.forEach(enItem => {
    const cnItem = cnMap[enItem.value];
    const twItem = twMap[enItem.value];
    
    if (!cnItem || processed.has(enItem.value)) {
        return;
    }
    
    processed.add(enItem.value);
    
    // 确定分类
    let category = 'mechanics';
    
    if (categoryMap[enItem.desc]) {
        category = categoryMap[enItem.desc];
    } else if (cnItem && categoryMap[cnItem.desc]) {
        category = categoryMap[cnItem.desc];
    } else if (twItem && categoryMap[twItem.desc]) {
        category = categoryMap[twItem.desc];
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
        englishName = enItem.value.replace(/_/g, ' ');
    }
    
    gameData.push({
        category: category,
        english: englishName,
        chinese_simplified: cnItem.label,
        chinese_traditional: twItem ? twItem.label : cnItem.label,
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
    return a.chinese_simplified.localeCompare(b.chinese_simplified, 'zh-CN');
});

// 生成多语言版本的 JavaScript 文件
const outputMultiLang = `// 流放之路2 多语言对照数据
// 数据来源: PoE2DB (https://poe2db.tw/)
// 自动生成于: ${new Date().toLocaleString('zh-CN')}
// 总计: ${gameData.length} 条
// 支持语言: 简体中文、繁体中文、英文

const gameDataMultiLang = ${JSON.stringify(gameData, null, 2)};
`;

// 也生成简化版（仅简体中文）用于当前网站
const gameDataSimplified = gameData.map(item => ({
    category: item.category,
    english: item.english,
    chinese: item.chinese_simplified,
    note: item.note
}));

const outputSimplified = `// 流放之路2 中英文对照数据
// 数据来源: PoE2DB (https://poe2db.tw/)
// 自动生成于: ${new Date().toLocaleString('zh-CN')}
// 总计: ${gameData.length} 条

const gameData = ${JSON.stringify(gameDataSimplified, null, 2)};
`;

fs.writeFileSync('data_multilang.js', outputMultiLang, 'utf8');
fs.writeFileSync('data.js', outputSimplified, 'utf8');

console.log(`\n✅ 多语言数据已生成到 data_multilang.js`);
console.log(`✅ 简体中文数据已更新到 data.js`);
console.log(`✅ 共生成 ${gameData.length} 条完整数据`);
console.log(`\n💡 提示: data_multilang.js 包含简体、繁体、英文三语言数据`);
