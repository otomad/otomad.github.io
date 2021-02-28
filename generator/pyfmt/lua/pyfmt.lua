local p = {}

function converse(input, upr)
	input = string.lower(input) -- 统一小写内部计算
	local output
	upr = string.lower(upr)
	tone = string.sub(input, -1) -- 读取声调表示
	if (tone > "0" and tone < "9") -- 验证声调合法性
	then input = string.gsub(input, tone, "") end
	if (tone < "0" or tone > "5") then tone = "0" end
	input = string.gsub(input, "v", "ü") -- 转义yu
	if (string.find(input, "ü") == 1) -- 起头的v仍为v
	then input = string.gsub(input, "ü", "v", 1) end
	input = string.gsub(input, "lyu", "lü")
	input = string.gsub(input, "nyu", "nü")
	input = string.gsub(input, "eh", "ê")
	input = string.gsub(input, "e^", "ê")
	vowel = "a" -- 依拼音顺序注音
	index = string.find(input, vowel)
	if (index == nil) then
		vowel = "o"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "e"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "ê"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "i"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "u"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "ü"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "n"
		index = string.find(input, vowel)
	end
	if (index == nil) then
		vowel = "m"
		index = string.find(input, vowel)
	end
	if (string.find(input, "iu") ~= nil) -- 关注iu特殊情况
	then
		vowel = "u"
		index = string.find(input, vowel)
	end
	combine = "" -- 标注声调（组合用字符）
	if (tone == "1") then combine = "̄" end
	if (tone == "2") then combine = "́" end
	if (tone == "3") then combine = "̌" end
	if (tone == "4") then combine = "̀" end
	if (tone == "5") then combine = "̇" end
	input = string.gsub(input, vowel, vowel .. combine, 1) -- 小写字母
	input_upr = string.upper(input) -- 大写字母
	input_upr = string.gsub(input_upr, "ü", "Ü")
	input_upr = string.gsub(input_upr, "ê", "Ê")
	if (upr == "4") -- 由于似乎小型大写字母会把string.sub函数弄坏，只能另辟蹊径
	then
		input_upr_first = string.sub(input_upr, 1, 1)
		input_upr = string.sub(input_upr, 2, -1)
	end
	input_smc = string.gsub(input_upr, "A", "ᴀ") -- 小型大写字母
	input_smc = string.gsub(input_smc, "B", "ʙ")
	input_smc = string.gsub(input_smc, "C", "ᴄ")
	input_smc = string.gsub(input_smc, "D", "ᴅ")
	input_smc = string.gsub(input_smc, "E", "ᴇ")
	input_smc = string.gsub(input_smc, "F", "ꜰ")
	input_smc = string.gsub(input_smc, "G", "ɢ")
	input_smc = string.gsub(input_smc, "H", "ʜ")
	input_smc = string.gsub(input_smc, "I", "ɪ")
	input_smc = string.gsub(input_smc, "J", "ᴊ")
	input_smc = string.gsub(input_smc, "K", "ᴋ")
	input_smc = string.gsub(input_smc, "L", "ʟ")
	input_smc = string.gsub(input_smc, "M", "ᴍ")
	input_smc = string.gsub(input_smc, "N", "ɴ")
	input_smc = string.gsub(input_smc, "O", "ᴏ")
	input_smc = string.gsub(input_smc, "P", "ᴘ")
	input_smc = string.gsub(input_smc, "Q", "ꞯ")
	input_smc = string.gsub(input_smc, "R", "ʀ")
	input_smc = string.gsub(input_smc, "S", "ꜱ")
	input_smc = string.gsub(input_smc, "T", "ᴛ")
	input_smc = string.gsub(input_smc, "U", "ᴜ")
	input_smc = string.gsub(input_smc, "V", "ᴠ")
	input_smc = string.gsub(input_smc, "W", "ᴡ")
	input_smc = string.gsub(input_smc, "X", "x")
	input_smc = string.gsub(input_smc, "Y", "ʏ")
	input_smc = string.gsub(input_smc, "Z", "ᴢ")
	input_smc = string.gsub(input_smc, "Ü", "ᴜ̈")
	input_smc = string.gsub(input_smc, "Ê", "ᴇ̂")
	-- 以下是不同类型的拼音
	output = input
	if (upr == "1" or upr == "大写" or upr == "大" or upr == "upr" or upr ==
		"upper" or upr == "capital") then output = input_upr end
	if (upr == "2" or upr == "小型大写字母" or upr == "small capital") then
		output = input_smc
	end
	if (upr == "3" or upr == "首字母大写") then
		output = string.sub(input_upr, 1, 1) .. string.sub(input, 2, -1)
	end
	if (upr == "4") then output = input_upr_first .. input_smc end
	return output
end

function p.converse(frame)
	local output = converse(frame.args[1], frame.args[2]) -- 从模板输入
	return output
end

function p.sentence(frame) -- 整句话的转换
	text = frame.args[1]
	text = text .. "\'"
	symbol = frame.args[2]
	mode = frame.args[3]
	flag = "0"
	begin = 0
	local output = ""
	repeat
		num = string.find(text, "\'", 1)
		single = string.sub(text, 1, num - 1)
		text = string.sub(text, num + 1, -1)
		if (mode >= "5" and mode <= "6") -- 新增的两种类型
		then
			mode = tostring(tonumber(mode) - 2)
			flag = mode
		end
		part = converse(single, mode)
		aoe = string.lower(string.sub(single, 1, 1)) -- 解决隔音符号问题
		if ((aoe == "a" or aoe == "o" or aoe == "u") and begin ~= 0 and symbol ==
			"") then part = "\'" .. part end
		if (text ~= "") then
			output = output .. part .. symbol
		else
			output = output .. part
		end
		if (flag ~= "0") then mode = tostring((tonumber(flag) - 5) * 2) end
		begin = 1
	until (text == "")
	return output
end

return p
