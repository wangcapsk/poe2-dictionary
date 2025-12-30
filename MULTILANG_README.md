# 🌍 多语言版本说明

## 概述

流放之路2对照表现在支持**三种语言**：
- 🇨🇳 简体中文
- 🇹🇼 繁體中文
- 🇺🇸 English

## 版本说明

### 单语言版本（原版）
- **文件**: `index.html`
- **语言**: 简体中文 ↔ 英文
- **数据文件**: `data.js`
- **推荐**: 适合大陆用户

### 多语言版本（新）
- **文件**: `index_multilang.html`
- **语言**: 简体中文 / 繁體中文 / 英文
- **数据文件**: `data_multilang.js`
- **推荐**: 适合需要繁体中文或多语言对照的用户

## 使用方法

### 打开多语言版本

1. 双击打开 `index_multilang.html`
2. 点击页面顶部的语言按钮切换：
   - **简体中文** - 显示简体中文翻译
   - **繁體中文** - 显示繁體中文翻譯
   - **English** - 显示简体中文（可自定义）

### 语言切换

点击语言按钮后，表格中的中文列会立即更新为对应语言。

### 搜索功能

搜索支持所有三种语言，输入任何语言的关键词都能找到对应条目：
- 搜索"火球" → 找到简体中文包含"火球"的条目
- 搜索"火球" → 同时也能找到繁体"火球"
- 搜索"Fire" → 找到英文包含"Fire"的条目

## 数据对比

### 简体中文示例
| 英文 | 简体中文 | 繁體中文 |
|------|----------|----------|
| Fireball | 火球术 | 火球術 |
| Ice Shard | 寒冰碎片 | 寒冰碎片 |
| Lightning Strike | 闪电打击 | 閃電打擊 |
| Poison | 中毒 | 中毒 |
| Freeze | 冰冻 | 冰凍 |

## 数据来源

三种语言的数据均来自 PoE2DB 官方：

- 简体中文: https://cdn.poe2db.tw/json/autocompletecb_cn.json
- 繁體中文: https://cdn.poe2db.tw/json/autocompletecb_tw.json
- English: https://cdn.poe2db.tw/json/autocompletecb_us.json

## 更新数据

### 更新多语言数据

```bash
node parse_multilang.js
```

这会：
1. 下载最新的简体、繁体、英文数据
2. 匹配和整合三种语言
3. 生成 `data_multilang.js`（包含三语言）
4. 更新 `data.js`（简体中文版）

### 只更新简体中文版

```bash
node parse_combined.js
```

这只会更新简体中文 ↔ 英文的对照数据。

## 文件列表

### 多语言版本
```
📁 多语言版本/
├── index_multilang.html      # 多语言HTML页面
├── app_multilang.js          # 多语言交互逻辑
├── data_multilang.js         # 三语言数据（约550KB）
├── poe2db_data.json          # 简体原始数据
├── poe2db_data_tw.json       # 繁体原始数据
├── poe2db_data_en.json       # 英文原始数据
└── parse_multilang.js        # 多语言解析脚本
```

### 单语言版本
```
📁 单语言版本/
├── index.html                # 简体HTML页面
├── app.js                    # 简体交互逻辑
├── data.js                   # 简体数据（约500KB）
└── parse_combined.js         # 简体解析脚本
```

### 共用文件
```
📁 共用/
└── styles.css                # 样式文件（两个版本共用）
```

## 数据统计

**总计**: 4069 条完整三语言对照

| 分类 | 数量 |
|------|------|
| 技能 | 931 |
| 装备 | 619 |
| 货币 | 162 |
| 词条 | 1162 |
| 机制 | 1048 |
| 怪物 | 147 |

## 特点对比

| 特性 | 单语言版 | 多语言版 |
|------|----------|----------|
| 支持语言 | 简体+英文 | 简体+繁体+英文 |
| 文件大小 | ~500KB | ~550KB |
| 加载速度 | 快 | 略慢（可忽略） |
| 适用用户 | 大陆用户 | 全球用户 |
| 语言切换 | ❌ | ✅ |

## 翻译差异示例

部分术语在简体和繁体中有不同翻译：

| 英文 | 简体 | 繁体 |
|------|------|------|
| Arakaali's Lust | 阿拉卡力的欲望 | 艾爾卡莉之慾 |
| Amanamu's Tithe | 阿曼娜姆的奉纳 | 阿姆那姆的稅賦 |
| Atziri's Impatience | 阿兹里的焦躁 | 阿茲里的不耐 |
| Unique | 传奇 | 傳奇 |
| Stackable Currency | 可堆叠通货 | 可堆疊通貨 |

## 推荐使用场景

### 使用单语言版 (`index.html`)
- ✅ 大陆用户
- ✅ 只需要简体中文
- ✅ 追求最快加载速度

### 使用多语言版 (`index_multilang.html`)
- ✅ 港澳台用户
- ✅ 需要对照多种语言
- ✅ 制作多语言攻略
- ✅ 跨地区交流

## 浏览器支持

两个版本都完全支持：
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动浏览器

## 性能说明

- 多语言版数据量增加约10%
- 实际使用中性能差异可忽略不计
- 4000+条数据依然秒加载
- 搜索和筛选流畅无卡顿

## 常见问题

### Q: 两个版本可以同时使用吗？
A: 可以！它们是独立的文件，互不影响。

### Q: 繁体数据准确吗？
A: 完全准确，直接来自 PoE2DB 官方繁体版。

### Q: 搜索繁体时能找到简体吗？
A: 能！搜索功能支持跨语言搜索。

### Q: 如何设置默认语言？
A: 编辑 `app_multilang.js`，修改 `currentLanguage` 的初始值。

### Q: 可以添加其他语言吗？
A: 可以！只需获取对应语言的 JSON 数据并修改脚本。

## 技术细节

### 数据结构

```javascript
{
  "category": "skills",
  "english": "Fireball",
  "chinese_simplified": "火球术",
  "chinese_traditional": "火球術",
  "note": "技能宝石"
}
```

### 语言切换原理

通过 JavaScript 动态切换显示的中文列：
- 简体模式: 显示 `chinese_simplified`
- 繁体模式: 显示 `chinese_traditional`
- 英文模式: 显示 `chinese_simplified`（可自定义）

## 贡献

欢迎提交翻译纠正或改进建议！

---

**更新日期**: 2025年12月30日  
**支持语言**: 简体中文、繁體中文、English  
**数据来源**: PoE2DB Official Database
