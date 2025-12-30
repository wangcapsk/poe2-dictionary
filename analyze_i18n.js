const fs = require('fs');

// 读取两个i18n JSON文件
const i18nEN = JSON.parse(fs.readFileSync('i18ncb_us.json', 'utf8'));
const i18nCN = JSON.parse(fs.readFileSync('i18ncb_cn.json', 'utf8'));

console.log('========================================');
console.log('i18n JSON 文件分析');
console.log('========================================\n');

// 统计数量
const enKeys = Object.keys(i18nEN);
const cnKeys = Object.keys(i18nCN);

console.log('数据量统计:');
console.log(`  英文 (i18ncb_us.json): ${enKeys.length} 条`);
console.log(`  中文 (i18ncb_cn.json): ${cnKeys.length} 条`);

// 分析键的类型
console.log('\n键的类型分析:');
const keyTypes = {};
enKeys.forEach(key => {
    const type = key.split('|')[0];
    keyTypes[type] = (keyTypes[type] || 0) + 1;
});

console.log('\n按类型统计:');
Object.entries(keyTypes).sort((a,b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  ${type.padEnd(40)} ${count} 条`);
});

// 示例数据
console.log('\n========================================');
console.log('示例数据对比 (前20条)');
console.log('========================================\n');

enKeys.slice(0, 20).forEach(key => {
    const enValue = i18nEN[key];
    const cnValue = i18nCN[key] || '[未找到中文]';
    console.log(`键: ${key}`);
    console.log(`  英文: ${enValue}`);
    console.log(`  中文: ${cnValue}`);
    console.log('');
});

// 找出特定类型的数据
console.log('========================================');
console.log('游戏标签 (Tags) 示例');
console.log('========================================\n');

const tagKeys = enKeys.filter(key => key.startsWith('Tags|'));
tagKeys.slice(0, 30).forEach(key => {
    console.log(`${key.padEnd(50)} EN: ${i18nEN[key].padEnd(20)} CN: ${i18nCN[key]}`);
});

console.log('\n========================================');
console.log('物品类型 (ItemClasses) 示例');
console.log('========================================\n');

const itemClassKeys = enKeys.filter(key => key.startsWith('ItemClasses|'));
itemClassKeys.forEach(key => {
    console.log(`${key.padEnd(50)} EN: ${i18nEN[key].padEnd(30)} CN: ${i18nCN[key]}`);
});

console.log('\n========================================');
console.log('客户端字符串 (ClientStrings) 示例');
console.log('========================================\n');

const clientStringKeys = enKeys.filter(key => key.startsWith('ClientStrings|')).slice(0, 20);
clientStringKeys.forEach(key => {
    console.log(`${key.padEnd(60)} EN: ${i18nEN[key].padEnd(30)} CN: ${i18nCN[key]}`);
});

// 数据用途分析
console.log('\n========================================');
console.log('数据用途分析');
console.log('========================================\n');

console.log('这些JSON文件包含:');
console.log('  1. 游戏标签 (Tags): 元素类型、属性类型等');
console.log('  2. 物品类型 (ItemClasses): 物品分类名称');
console.log('  3. 客户端字符串 (ClientStrings): UI文本、按钮文本');
console.log('  4. 角色面板 (CharacterPanelStats): 角色属性名称');
console.log('  5. 成就物品 (AchievementItems): 成就相关物品');
console.log('  6. 商店标签 (ShopTag): 商店分类');
console.log('  7. 其他游戏系统文本');
console.log('');
console.log('与 autocompletecb 的区别:');
console.log('  - autocompletecb: 具体的游戏物品、技能、怪物名称');
console.log('  - i18ncb: 游戏系统、UI、标签、分类等通用文本');
