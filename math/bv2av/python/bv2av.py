#!/usr/bin/env python3
import sys

# 原转换代码针对 2023 年 3 月 28 日 19:45:02 (av99999999) 之后的新视频出现了转换为负数 av 号的 bug，此处使用新的算法来实现：
# https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md

XOR_CODE = 23442827791579
MASK_CODE = 2251799813685247
MAX_AID = 1 << 51
ALPHABET = "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf"
ENCODE_MAP = 8, 7, 0, 5, 1, 3, 2, 4, 6
DECODE_MAP = tuple(reversed(ENCODE_MAP))

BASE = len(ALPHABET)
PREFIX = "BV1"
PREFIX_LEN = len(PREFIX)
CODE_LEN = len(ENCODE_MAP)
ERROR = "¿你在想桃子？"

def av2bv(aid: int) -> str:
	bvid = [""] * 9
	tmp = (MAX_AID | aid) ^ XOR_CODE
	for i in range(CODE_LEN):
		bvid[ENCODE_MAP[i]] = ALPHABET[tmp % BASE]
		tmp //= BASE
	return PREFIX + "".join(bvid)

def bv2av(bvid: str) -> int:
	assert bvid[:3] == PREFIX

	bvid = bvid[3:]
	tmp = 0
	for i in range(CODE_LEN):
		idx = ALPHABET.index(bvid[DECODE_MAP[i]])
		tmp = tmp * BASE + idx
	return (tmp & MASK_CODE) ^ XOR_CODE

if __name__ == "__main__":
	if len(sys.argv) < 2:
		print("Please input av/BV number!")
		exit()
	original = sys.argv[1].strip()
	result = ERROR
	if original[:2].lower() == "bv":
		result = "av" + str(bv2av(original))
	elif original[:2].lower() == "av":
		result = av2bv(int(original[2:]))
	elif original.isdigit():
		result = av2bv(int(original))
	else:
		print("Please input a valid av/BV number!")
		exit()
	print(result)

# assert av2bv(111298867365120) == "BV1L9Uoa9EUx"
# assert bv2av("BV1L9Uoa9EUx") == 111298867365120
