import sys

table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
tr = {}
for i in range(58):
	tr[table[i]] = i
s = [11, 10, 3, 8, 4, 6]
xor = 177451812
add = 8728348608
error = "¿你在想桃子？"

def dec(x):
	try:
		r = 0
		for i in range(6):
			r += tr[x[s[i]]] * 58 ** i
		return (r - add) ^ xor
	except:
		print(error)
		exit()

def enc(x):
	x = (x ^ xor) + add
	r = list('BV1  4 1 7  ')
	for i in range(6):
		r[s[i]] = table[x // 58 ** i % 58]
	return ''.join(r)

if __name__ == "__main__":
	if len(sys.argv) < 2:
		print("Please enter av/bv number!")
		exit()
	orig = sys.argv[1].strip()
	result = error
	if orig[:2].lower() == "bv":
		result = "av" + str(dec(orig))
	elif orig[:2].lower() == "av":
		result = enc(int(orig[2:]))
	elif orig.isdigit():
		result = enc(int(orig))
	else:
		print("Please enter a legal av/bv number!")
		exit()
	print(result)