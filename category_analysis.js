const fs = require('fs');

// 当前的分类映射
const currentCategoryMap = {
    '技能宝石': 'skills',
    'Skill Gems': 'skills',
    '技能寶石': 'skills',
    '辅助宝石': 'skills',
    'Support Gems': 'skills',
    '輔助寶石': 'skills',
    '灵魂宝石': 'skills',
    'Spirit Gems': 'skills',
    'Meta Skill Gem': 'skills',
    
    '傳奇': 'items',
    '传奇': 'items',
    'Unique': 'items',
    '裂隙石': 'items',
    '裂痕石': 'items',
    'Breachstones': 'items',
    '永恒珠宝': 'items',
    '永恆珠寶': 'items',
    'Timeless Jewel': 'items',
    '巅峰钥匙': 'items',
    '巔峰鑰匙': 'items',
    'Pinnacle Keys': 'items',
    '珠宝': 'items',
    '珠寶': 'items',
    'Jewels': 'items',
    '遗物': 'items',
    '聖物': 'items',
    'Relics': 'items',
    '石板': 'items',
    '碑牌': 'items',
    'Tablet': 'items',
    
    '可堆叠通货': 'currency',
    '可堆疊通貨': 'currency',
    'Stackable Currency': 'currency',
    '地图碎片': 'currency',
    '地圖碎片': 'currency',
    'Map Fragments': 'currency',
    '增幅器': 'currency',
    '增幅': 'currency',
    'Augment': 'currency',
    '宝库钥匙': 'currency',
    '遺鑰': 'currency',
    'Vault Keys': 'currency',
    '试炼硬币': 'currency',
    '試煉代幣': 'currency',
    'Trial Coins': 'currency',
    '孕育石': 'currency',
    '培育器': 'currency',
    
    'Keywords': 'mechanics',
    '關鍵字': 'mechanics',
    'WorldAreas': 'mechanics',
    '角色': 'mechanics',
    'Character': 'mechanics',
    '升华试炼': 'mechanics',
    '昇華試煉': 'mechanics',
    'Ascendancy': 'mechanics',
    '引路石': 'mechanics',
    '換界石': 'mechanics',
    'Waystones': 'mechanics',
    '预兆': 'mechanics',
    '預兆': 'mechanics',
    'Omen': 'mechanics',
    '咒符': 'mechanics',
    '護符': 'mechanics',
    'Charms': 'mechanics',
    'Item Classes': 'mechanics',
    '宝石标签': 'mechanics',
    '寶石標籤': 'mechanics',
    'Gem Tags': 'mechanics',
    'Acronym': 'mechanics',
    'Stashtab': 'mechanics',
    'Chest': 'mechanics',
    
    'Passive': 'mods',
    
    '怪物': 'monsters',
    'Monster': 'monsters',
};

// 读取三个JSON文件
const dataCN = JSON.parse(fs.readFileSync('poe2db_data.json', 'utf8'));
const dataTW = JSON.parse(fs.readFileSync('poe2db_data_tw.json', 'utf8'));
const dataEN = JSON.parse(fs.readFileSync('poe2db_data_en.json', 'utf8'));

// 收集所有唯一的desc值
const allDescs = new Set();
[...dataCN, ...dataTW, ...dataEN].forEach(item => {
    if (item.desc) allDescs.add(item.desc);
});

console.log('========================================');
console.log('分类映射检查报告');
console.log('========================================\n');

// 检查哪些分类已映射，哪些未映射
const mapped = [];
const unmapped = [];

allDescs.forEach(desc => {
    if (currentCategoryMap[desc]) {
        mapped.push(desc);
    } else {
        unmapped.push(desc);
    }
});

console.log('✅ 已映射的分类 (' + mapped.length + '个):');
const mappedByTarget = {};
mapped.forEach(desc => {
    const target = currentCategoryMap[desc];
    if (!mappedByTarget[target]) mappedByTarget[target] = [];
    mappedByTarget[target].push(desc);
});

Object.keys(mappedByTarget).sort().forEach(target => {
    console.log(`\n  ${target}:`);
    mappedByTarget[target].forEach(desc => {
        console.log(`    - ${desc}`);
    });
});

console.log('\n\n❌ 未映射的分类 (' + unmapped.length + '个):');
unmapped.forEach(desc => {
    // 统计这个分类有多少条数据
    const cnCount = dataCN.filter(item => item.desc === desc).length;
    const twCount = dataTW.filter(item => item.desc === desc).length;
    const enCount = dataEN.filter(item => item.desc === desc).length;
    const total = Math.max(cnCount, twCount, enCount);
    
    console.log(`  - ${desc.padEnd(30)} (约 ${total} 条)`);
});

console.log('\n========================================');
console.log('建议的分类映射');
console.log('========================================\n');

unmapped.forEach(desc => {
    const cnCount = dataCN.filter(item => item.desc === desc).length;
    const twCount = dataTW.filter(item => item.desc === desc).length;
    const enCount = dataEN.filter(item => item.desc === desc).length;
    
    // 根据名称推测分类
    let suggestedCategory = 'mechanics';
    
    if (desc.includes('Gem') || desc.includes('宝石') || desc.includes('寶石')) {
        suggestedCategory = 'skills';
    } else if (desc.includes('Currency') || desc.includes('通货') || desc.includes('通貨') ||
               desc.includes('币') || desc.includes('幣')) {
        suggestedCategory = 'currency';
    } else if (desc.includes('Unique') || desc.includes('传奇') || desc.includes('傳奇') ||
               desc.includes('Item') || desc.includes('物品')) {
        suggestedCategory = 'items';
    } else if (desc.includes('Monster') || desc.includes('怪物') || desc.includes('Boss')) {
        suggestedCategory = 'monsters';
    } else if (desc.includes('Passive') || desc.includes('天赋') || desc.includes('天賦') ||
               desc.includes('词缀') || desc.includes('詞綴')) {
        suggestedCategory = 'mods';
    }
    
    console.log(`'${desc}': '${suggestedCategory}',  // ${Math.max(cnCount, twCount, enCount)} 条`);
});

console.log('\n========================================');
console.log('数据统计汇总');
console.log('========================================');
console.log('总分类数:', allDescs.size);
console.log('已映射:', mapped.length);
console.log('未映射:', unmapped.length);
console.log('映射覆盖率:', (mapped.length / allDescs.size * 100).toFixed(1) + '%');
