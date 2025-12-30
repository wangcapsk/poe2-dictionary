const fs = require('fs');

// 读取三个JSON文件
const dataCN = JSON.parse(fs.readFileSync('poe2db_data.json', 'utf8'));
const dataTW = JSON.parse(fs.readFileSync('poe2db_data_tw.json', 'utf8'));
const dataEN = JSON.parse(fs.readFileSync('poe2db_data_en.json', 'utf8'));

// 统计分类
function getCats(data) {
    const cats = {};
    data.forEach(item => {
        const cat = item.desc || 'unknown';
        cats[cat] = (cats[cat] || 0) + 1;
    });
    return cats;
}

console.log('========================================');
console.log('简体中文 (poe2db_data.json) 分类统计');
console.log('========================================');
console.log('总数:', dataCN.length);
console.log('');
const catsCN = getCats(dataCN);
Object.entries(catsCN).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`${cat.padEnd(30)} ${count}`);
});

console.log('\n========================================');
console.log('繁体中文 (poe2db_data_tw.json) 分类统计');
console.log('========================================');
console.log('总数:', dataTW.length);
console.log('');
const catsTW = getCats(dataTW);
Object.entries(catsTW).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`${cat.padEnd(30)} ${count}`);
});

console.log('\n========================================');
console.log('英文 (poe2db_data_en.json) 分类统计');
console.log('========================================');
console.log('总数:', dataEN.length);
console.log('');
const catsEN = getCats(dataEN);
Object.entries(catsEN).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`${cat.padEnd(30)} ${count}`);
});

// 找出所有唯一的分类
console.log('\n========================================');
console.log('所有唯一分类汇总');
console.log('========================================');
const allCats = new Set([
    ...Object.keys(catsCN),
    ...Object.keys(catsTW),
    ...Object.keys(catsEN)
]);
console.log('分类数量:', allCats.size);
console.log('');
[...allCats].sort().forEach(cat => {
    const cn = catsCN[cat] || 0;
    const tw = catsTW[cat] || 0;
    const en = catsEN[cat] || 0;
    console.log(`${cat.padEnd(30)} CN:${cn.toString().padStart(5)} TW:${tw.toString().padStart(5)} EN:${en.toString().padStart(5)}`);
});
