# 数据说明

## 数据来源

本项目的游戏数据来自 [PoE2DB官方数据库](https://poe2db.tw/)

- 中文数据源: https://cdn.poe2db.tw/json/autocompletecb_cn.94ff324c68f35f2c.json
- 英文数据源: https://cdn.poe2db.tw/json/autocompletecb_us.4a71e038c68657af.json

## 数据统计

**总计: 4069 条中英文对照数据**

### 分类明细

| 分类 | 数量 | 说明 |
|------|------|------|
| 技能 (skills) | 931 | 主动技能、辅助技能、灵魂宝石 |
| 装备 (items) | 619 | 传奇装备、裂隙石、永恒珠宝等 |
| 货币 (currency) | 162 | 通货、精华、催化剂 |
| 词条 (mods) | 1162 | 天赋、被动技能 |
| 机制 (mechanics) | 1048 | 游戏关键词、区域、角色 |
| 怪物 (monsters) | 147 | 怪物、Boss |

## 数据结构

每条数据包含:
- `category`: 分类 (skills/items/currency/mods/mechanics/monsters)
- `english`: 英文名称
- `chinese`: 中文名称
- `note`: 备注说明 (类型、来源等)

## 更新方法

### 自动更新（推荐）

运行解析脚本自动获取最新数据:

```bash
cd d:\po2
node parse_combined.js
```

脚本会：
1. 从PoE2DB下载最新的中英文JSON数据
2. 自动匹配和分类
3. 生成完整的 `data.js` 文件

### 手动添加

编辑 `data.js` 文件，在数组中添加:

```javascript
{
  "category": "skills",
  "english": "Lightning Strike",
  "chinese": "闪电打击",
  "note": "技能宝石"
}
```

## 数据覆盖范围

✅ **包含的内容:**
- 所有技能宝石和辅助宝石
- 传奇装备
- 通货系统
- 天赋技能树
- 游戏机制关键词
- 怪物和Boss
- 世界区域
- 永恒珠宝
- 裂隙石
- 升华试炼

❌ **不包含的内容:**
- 普通白色装备基底
- 随机生成的稀有装备
- 临时活动物品
- 未公开/测试内容

## 数据质量

- ✅ 所有数据来自官方PoE2DB
- ✅ 自动匹配中英文对照
- ✅ 智能分类系统
- ✅ 实时可更新

## 许可说明

数据版权归 Grinding Gear Games 和 PoE2DB 所有。
本项目仅用于学习和游戏辅助目的。

---

最后更新: 2025/12/30
