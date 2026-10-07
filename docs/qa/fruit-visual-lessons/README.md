# 三种水果：图解教学与重复内容整理

2026-09-30。用户要求补充图片，并复核重复的挑选规则。预览端口 3107，本轮未部署。

## 内容决定

- 猕猴桃：6 个正文小节合并为 2 个图解步骤。轻压与局部软点合并；饱满外形与皱缩合并。食用时机保留在原有时间表，绒毛误区保留在简短提醒中。
- 石榴：6 个正文小节合并为 4 个。先同等大小掂重，再检查果皮；形状是辅助线索；颜色差异与采后不继续成熟合并说明。避免把“更圆”或“更浅色”直接判为差。
- 柿子：6 个正文小节合并为 3 个。原有整果品种对照保留，并建议先看标签；新增 Fuyu 切片、Hachiya 软熟果肉照片，之后统一检查果皮。颜色条件并入果皮段落，删除重复的一套规则总结。
- 每个保留的正文小节均有配图。新照片用大幅 4:3 图文布局，手机上图片位于具体判断说明之前；保留水果各自配色。
- 照片说明手法或典型质地，不替读者测量重量、软硬或甜度。图片下方说明其教学用途。文字、标签和图片说明均是可选择、可翻译的 HTML。

## 判断依据

没有发现适合取代轻压、掂重、品种识别的更可靠单一目测方法；改进集中在检查顺序、具体动作和证据呈现。

- [Zespri：选择和催熟猕猴桃](https://www.zespri.com/en-NZ/corporate-information/faqs)：轻压微微让步、避免软伤与皱缩。
- [NC State Extension：石榴](https://plants.ces.ncsu.edu/plants/punica-granatum/)：同等大小的重量感与完整果皮。
- [UC Davis：石榴品质](https://postharvest.ucdavis.edu/produce-facts-sheets/pomegranate)：裂口、伤口、腐败及采后不继续成熟。
- [USU：石榴品种](https://extension.usu.edu/yardandgarden/research/pomegranate-fruit-of-the-desert)：不同品种的果皮颜色有差异。
- [UC ANR：柿子采收与食用质地](https://ucanr.edu/node/137200/printable/print)：Fuyu 可像苹果一样脆食，Hachiya 软熟后果肉呈果冻状。
- [UC Davis：柿子品质](https://postharvest.ucdavis.edu/produce-facts-sheets/persimmon)：品种对应的成熟颜色及避免裂伤、腐败。

## 图片交付

使用内置 imagegen 工具，每张独立生成；检查了主体、手部姿态、切面质地和画面内容。原始生成图片保留在工具返回的生成目录。网站副本为 1448×1086 WebP，质量 88，单张约 176–216 KiB，5 张共约 950 KiB。没有把已生成图片替换成 CSS 模拟质地。

| 教学用途 | 项目图片 |
|---|---|
| 猕猴桃轻触手法 | [palm-pressure.webp](../../../public/fruits/kiwi/education/palm-pressure.webp) |
| 石榴同等大小掂重 | [heft-comparison.webp](../../../public/fruits/pomegranate/education/heft-comparison.webp) |
| 石榴果皮颜色差异 | [color-varieties.webp](../../../public/fruits/pomegranate/education/color-varieties.webp) |
| Fuyu 脆实切片 | [fuyu-texture.webp](../../../public/fruits/persimmon/education/fuyu-texture.webp) |
| Hachiya 软熟果肉 | [hachiya-texture.webp](../../../public/fruits/persimmon/education/hachiya-texture.webp) |

[完整提示词](prompts.json) · [原图与项目路径映射](assets.json)

## 验证结果

- 72 项测试 / 22 个文件通过；lint、TypeScript、生产构建、git diff 检查通过。
- 资产注册表 38 → 43 项；新增资产均被内容引用且真实存在，无开发占位图。
- 本地 Chrome：3 种水果 × 1366×650、390×844、360×800，共 9 个场景。360px 使用减少动态效果模式。
- 默认折叠状态下，9 个图解小节在桌面为 466–576px，在手机为 458–708px，均小于各自测试视口高度；没有固定高度裁切正文。展开细节后允许自然增长。
- 全部图片解码成功，无横向溢出、无页面 JS 错误；逐个展开/收起细节通过；Fuyu/Hachiya 原有锚点可跳转。
- 每个场景验证一题正确、一题错误：等待后均停留在反馈状态，显示 Got it；正确反馈点击后才前进。既有自动化覆盖其余问题逻辑。
- 已人工查看桌面猕猴桃、石榴颜色、Hachiya 图文，以及手机石榴掂重、Fuyu 图文截图。新增排版只在三种水果的主题作用域内；Avocado 内容、图片和 Quiz 样式未修改。

[浏览器脚本](check.mjs) · [尺寸及图片加载记录](results.json)
