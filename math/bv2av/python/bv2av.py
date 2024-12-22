#!/usr/bin/env python3
import sys

table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
transform: dict[str, int] = {}
for i in range(58):
	transform[table[i]] = i
slots = [11, 10, 3, 8, 4, 6]
xor = 177451812
add = 8728348608
error = '¿你在想桃子？'

def decode(input: str) -> int:
	try:
		result: int = 0
		for i in range(6):
			result += transform[input[slots[i]]] * 58 ** i
		return (result - add) ^ xor
	except:
		print(error)
		exit()

def encode(input: int) -> str:
	input = (input ^ xor) + add
	result = list('BV1  4 1 7  ')
	for i in range(6):
		result[slots[i]] = table[input // 58 ** i % 58]
	return ''.join(result)

if __name__ == '__main__':
	if len(sys.argv) < 2:
		print('Please enter av/bv number!')
		exit()
	original = sys.argv[1].strip()
	result = error
	if original[:2].lower() == 'bv':
		result = 'av' + str(decode(original))
	elif original[:2].lower() == 'av':
		result = encode(int(original[2:]))
	elif original.isdigit():
		result = encode(int(original))
	else:
		print('Please enter a legal av/bv number!')
		exit()
	print(result)
