// 解析 PoE2DB JSON 数据并转换为我们的格式
const fs = require('fs');

// 读取原始 JSON 数据
const rawData = JSON.parse(fs.readFileSync('poe2db_data.json', 'utf8'));

console.log(`总共读取到 ${rawData.length} 条数据`);

// 分类映射
const categoryMap = {
    '技能宝石': 'skills',
    '辅助宝石': 'skills',
    '灵魂宝石': 'skills',
    '传奇': 'items',
    '可堆叠通货': 'currency',
    '货币': 'currency',
    '精华': 'currency',
    '催化剂': 'currency',
    '裂界碎片': 'currency',
    'Keywords': 'mechanics',
    'Passive': 'mods',
    '怪物': 'monsters',
    '首领': 'monsters',
    'WorldAreas': 'mechanics',
    '角色': 'mechanics',
    '裂隙石': 'items',
    '永恒珠宝': 'items',
    '巅峰钥匙': 'items',
    '词缀': 'mods',
};

// 转换数据
const gameData = rawData
    .filter(item => item.label && item.value) // 过滤无效数据
    .map(item => {
        let category = 'mechanics'; // 默认分类
        
        // 根据 desc 确定分类
        if (categoryMap[item.desc]) {
            category = categoryMap[item.desc];
        } else if (item.class === 'item_gem') {
            category = 'skills';
        } else if (item.class === 'uniqueitem') {
            category = 'items';
        } else if (item.class === 'item_currency') {
            category = 'currency';
        }
        
        return {
            category: category,
            english: item.value.replace(/_/g, ' '),
            chinese: item.label,
            note: item.desc || ''
        };
    })
    .slice(0, 1000); // 获取更多数据

// 统计各分类数量
const stats = {};
gameData.forEach(item => {
    stats[item.category] = (stats[item.category] || 0) + 1;
});

console.log('\n分类统计:');
console.log(stats);

// 生成 JavaScript 文件
const output = `// 流放之路2 中英文对照数据
// 数据来源: PoE2DB (https://poe2db.tw/)
// 自动生成于: ${new Date().toLocaleString('zh-CN')}

const gameData = ${JSON.stringify(gameData, null, 2)};
`;

fs.writeFileSync('data_generated.js', output, 'utf8');
console.log('\n✅ 数据已生成到 data_generated.js');
console.log(`✅ 共生成 ${gameData.length} 条数据`);
