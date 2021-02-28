~*你猜它怎么用？*~

# 多语言
* <span lang="zh-cn">简体中文 ⸺ **魔力大转盘**</span>
* <span lang="zh-tw">繁體中文 ⸺ **魔法轉輪**</span>
* <span lang="en">English ⸺ **Magic Turntable**</span>
* <span lang="ja">日本語 ⸺ **魔力の大ターンテーブル**</span>

**简称：** 魔力大

# 注
~（本例中 n 表示数字）~

| 符号 | 名称 | 示例 | 区间 |
| ---- | ---- | ---- | ---- |
| \+ | 加 | \`3+\` | \`x\in(3,+\infty)\` |
| \- | 减 | \`3-\` | \`x\in(-\infty,3)\` |
| &+ | 和加 | \`3&+\` | \`x\in[3,+\infty)\` |
| &- | 和减 | \`3&-\` | \`x\in(-\infty,3]\` |
| \> | 大于 | \`>3\` | \`x\in(3,+\infty)\` |
| \< | 小于 | \`<3\` | \`x\in(-\infty,3)\` |
| ≥ | 大及 | \`\geq3\` | \`x\in[3,+\infty)\` |
| ≤ | 小及 | \`\leq3\` | \`x\in(-\infty,3]\` |


# 钱←货币
* 币
	* 旧称“纸币”。即赚钱或完成任务获得奖励所得的货币。
* 矿币
	* 旧称“硬币”。超市购买任何无特殊标注的物品所使用的货币。由“币”一比一兑换而来。
* 酷币
	* 即“K币”，该币图片标志上印有“K”符号。专门用来购买家具等装饰物品，这些东西无法使用“矿币”购买。
* 铂金
	* 旧称“钻石”，后因“钻石”另有他用而让位名称。可以代替“币”“矿币”“酷币”使用而无需转换。且使用该币购买任意物品均打 0.1 折，比如 1 铂金可代替 100 矿币。
* 钻石
	* 用于购买稀有物品。
* 蔻币
	* 充钱而得，也可以提现。
* 匡慧币
	* 愤怒指数。目前也不知道这个币有啥用。

* 存折
	* （有利润，无存储上限）
* 铺满/存钱罐
	* （无利润，有存储上限）
* 银行卡
	* （同存折）

## 资料部分（不在钱庄）
* 功勋
	* （即“等级”）
* 口碑
	* （即“经验”）
* 节操
	* 每关结束不论成功与否均可获得根据该回合情况而换算的一定数目的节操。一定节操可以去“老徐搞笑小屋”兑换普通物品或稀有物品。
* 宠物的功勋、口碑
	* （每个宠物均有各自的功勋与口碑）

# 模式
* 经典
* 转钱<sub>（四亿版）（壕式转钱）</sub>
* 押奖<sub>（不小于三版）（无奖式转钱）（大及三版）</sub>
* 投注
* 游戏<sub>（惯性篇用）</sub>
* 抽奖<sub>（里迪号用）</sub>
* *（设置）*

# 设置
* ［滑块开关式复选框］

	将“游戏”转盘移步至地图“娱乐表”处

> 打开此选项之后，“惯性”篇的游戏环节将转移到地图的“娱乐表”中去呈现，操作更便捷。不过在本应用界面的“游戏”选项卡中是标准的转盘形式展现，而在“娱乐表”中则是 Windows 8~10 的磁贴样式展现。两者可实现的功能均相同，只是展现样式不一样。开启本项后届时若主动打开“游戏”选项卡，会提示‘该内容已转移到“娱乐表”处，点击前往。或进入设置关闭选项以回到标准形式。’。

# 转钱
1. 投币四亿 \`($4,0000,0000.00)\` 。或铂金 0.1 折，只需四百万。
2. 选择币种（用手点）。
3. 选择位数（只能转盘）：
	* 1 位，占 \`1/2\` 转盘；
	* 2 位，占 \`1/4\` 转盘；
	* ⋯⋯
	* n 位，占 \`1/(2^n)\` 转盘 \`(n\in[1,8])\`；
	* 9 位，占剩余 \`1/(2^8)=1/256\` 转盘。
4. 选择各位数值（0~9 各位均分）

本玩法不考虑中奖的几率，毕竟这只是土豪家的玩具。

# 押奖
先投入本金（至少 3 元）。

转盘上有 40 格，分别为 0~39。

转盘上只有“0”是无奖，其余均中奖。0 位于转盘顶部。

在靠近 0 附近的依次是：

`…5 36 3 38 1 0 39 2 37 4 35…`

并依此规律完成全转盘。

首先选择左旋（逆时针）或右旋（顺时针）。

从去除大小王的 52 张扑克牌的背面抽取 3 张扑克（盲抽），将三张扑克的点数相加求和。

在转盘上找到该数值，根据之前选好的旋转方向，往该方向走该点数格。比如开始选“左旋”点数为 3，则从 3 开始往逆时针方向移 3 格。若此时所指为 0，即无奖，则输；只要非 0，则赢。

输，则失去本金。

赢，则获得本金的三分之四。比如投入 3 元，则获得 4 元，净得 1 元。

本玩法中奖的几率为 0.5。

# 投注
投入本金，押在 1~6 之间选的一个数字。

同时抛三枚骰子。

所选数字出现在几枚骰子的顶面，就获得几倍的本金。

概率统计：\`-17/216\`

## 概率分析
> **补例（一种博彩方式）** 设想有这样一种博彩游戏，博彩者将本金 1 元押注在 1 到 6 的某个数字上，然后掷三颗骰子，若所压的数字出现 \`i\` 次 \`(i=1,2,3)\`，则下注者赢 \`i\` 元，否则没收 1 元本金．试问这样的游戏规则对下注者是否公平？

#### 解
设 \`X\` 为一次下注的盈利，于是得 \`X\` 的分布律为

| \`X\` | -1 | 1 | 2 | 3 |
| ---- | ---- | ---- | ---- | ---- |
| \`p_{k}\` | \`125/216\` | \`75/216\` | \`15/216\` | \`1/216\` |

于是

\`E(X)=(-1)\times\frac{125}{216}+1\times\frac{75}{216}+2\times\frac{15}{216}+3\times\frac{1}{216}=-\frac{17}{216}.\`

----

大致地可说：每平均玩 216 次，下注者必将输 17 元。故这一游戏规则对下注者来说是不公平的。

# 经典
六个基本属性：

* *活力*
* 饱和
* 清洁
* 学习
* 生命
* 运动

初始除“活力”值为 5 之外，其余均为 0。

“活力”是作为特殊项目出现的，一旦其降为 0，就会出现一个蟑螂的模型。

## 转盘内容
* 特殊
	* 刀
		* 若活力 > 0，则活力 -1；若活力 ≤ 0，则生命 -1。
	* 漩涡（逆时针）
		* 若转盘旋转方向目前设定为为顺时针，则自动更改为逆时针，并重新立刻开始转动，五分钟内若想手动改回来，只能通过转动按钮的方式，不能用手点。若转盘旋转方向目前设定为逆时针，则转盘指针会逐渐进入转盘中心，掉进漩涡，需要玩子游戏（一个迷宫游戏）才能回来。
	* 漩涡（顺时针）
		* 若转盘旋转方向目前设定为为逆时针，则自动更改为顺时针，并重新立刻开始转动，五分钟内若想手动改回来，只能通过转动按钮的方式，不能用手点。若转盘旋转方向目前设定为顺时针，则转盘指针会逐渐进入转盘中心，掉进漩涡，需要玩子游戏（一个迷宫游戏）才能回来。
	* 蓝屏
		* 此时会让游戏崩溃（一个假的蓝屏画面）。在游戏里面重启之后会弹出一个百度的搜索框首页，输入刚才你正在玩的游戏名字并百度一下才能恢复游戏。
* 饱和 +1
	* 万利隆面包
	* 生日蛋糕
	* 御宝羊奶
	* 雀巢咖啡
	* 德芙巧克力
	* 麻阳冰糖柑
	* 黑凤梨
	* 豪客来牛排
	* 新奥尔良鸡翅
	* 咸菜包子
	* 王老吉
	* 加多宝
	* 和其正
* 饱和 -1
	* 腐肉
	* 麻辣辣条
	* 方便面
	* 乔布斯咬过的苹果
	* 虫子啃过的鸭梨
	* 茄子干
	* 海参
	* 红色尖叫
	* 黑松沙士
	* 东方树叶乌龙茶
	* 格瓦斯
	* 崂山白花蛇草水
	* 三无产品（图案是没有 QS 认证）
* 清洁 +1
	* 吹风机
	* 剃须刀
	* 吸尘器
	* 浴缸
	* 浴霸
	* 漱口水
	* 洗衣机
	* 消毒柜
* 清洁 -1
	* 一次性饭盒
	* 快递包装
	* 垃圾
* 学习 +1
	* HB 铅笔
	* 4B 橡皮擦
	* 100 分闯关
	* 量角器
	* 圆规
	* 草稿本
* 学习 -1
	* 单机游戏
	* 网络游戏
	* 小说
	* 麻将馆
	* 关掉，关掉，一定要关掉⋯⋯
* 生命 +1
	* 注射器
	* 吊针
	* 阿司匹林
	* 盘尼西林
	* 阿莫西林
	* 云南白药
	* 创可贴
	* 急救包
* 生命 -1
	* 水果刀
	* 万箭齐发
	* 诸葛连弩
	* 加特林
	* 雪茄
	* 毒品
	* 电门
	* Brain Power
		* `O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA`
	* 美团电单车
* 运动 +1
	* 跑步机
	* 单杠
	* 双杠
	* 哑铃
	* 杠铃
	* 动感单车
	* 肋木
	* 太空漫步机
	* 扭腰器
* 运动 -1
	* 短视频
	* 直播
	* 油腻食物
	* 钢丝球（不想努力球）
* 无作用
	* 芝麻开门
	* 动感光波
	* （我是英雄，迪迦超人，）发光变身
	* 你过来呀
	* 龟派气功
	* 军体拳，第一套，准备格斗

# 抽奖
## 转盘内容
* 刀
* 新空间舱
	* 由于初始的舱容量有限，为了避免挤爆，需要获得新的大容量舱。
* 增加抽奖次数
	* 每天抽奖的次数是有限的。它可以用于增加抽奖的次数。
* 喷射器

此处补充各种需要在里迪号空间站里获得的物品。

# 游戏

**您好，您转到的是空白，请稍后再拨。**