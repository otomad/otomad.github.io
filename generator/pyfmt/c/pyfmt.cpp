/* 
 * 拼音格式化
 */

#define breag if(flag==1) break;
#define restart { printf("输入有误！\n"); flag_error = 1; return; }
#include <stdio.h>
#include <string.h>
#include <Windows.h>
#include <clocale>
char input[20], sentence[100];
wchar_t output[20], output_upr[20];
int flag_error;
void converse()
{
	wchar_t latin, latin_upr, combine = L'#';
	int l, tone, i, flag = 0;
	input[19] = '\0';
	l = strlen(input);
	tone = input[l - 1] - '0';
	if (tone < 0 || tone > 5) restart;
	l--;
	for (int j = 0; j < l; j++)
		if (!((input[j] >= 'a' && input[j] <= 'z') || input[j] == '^'))
			restart;
	for (int j = 0; j < 1; j++)
	{
		for (i = 0; i < l; i++)
			if (input[i]=='a')
			{
				if (tone == 1) { latin = L'ā'; latin_upr = L'Ā'; }
				if (tone == 2) { latin = L'á'; latin_upr = L'Á'; }
				if (tone == 3) { latin = L'ǎ'; latin_upr = L'Ǎ'; }
				if (tone == 4) { latin = L'à'; latin_upr = L'À'; }
				if (tone == 5) { latin = L'ȧ'; latin_upr = L'Ȧ'; }
				if (tone == 0) { latin = L'a'; latin_upr = L'A'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'o')
			{
				if (tone == 1) { latin = L'ō'; latin_upr = L'Ō'; }
				if (tone == 2) { latin = L'ó'; latin_upr = L'Ó'; }
				if (tone == 3) { latin = L'ǒ'; latin_upr = L'Ǒ'; }
				if (tone == 4) { latin = L'ò'; latin_upr = L'Ò'; }
				if (tone == 5) { latin = L'ȯ'; latin_upr = L'Ȯ'; }
				if (tone == 0) { latin = L'o'; latin_upr = L'O'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'e')
			{
				if (input[i + 1] == 'h' || input[i + 1] == '^')
				{
					if (tone == 1) { latin = L'ê'; latin_upr = L'Ê'; combine = L'\x304'; }
					if (tone == 2) { latin = L'ế'; latin_upr = L'Ế'; }
					if (tone == 3) { latin = L'ê'; latin_upr = L'Ê'; combine = L'\x30C'; }
					if (tone == 4) { latin = L'ề'; latin_upr = L'Ề'; }
					if (tone == 5) { latin = L'ê'; latin_upr = L'Ê'; combine = L'\x307'; }
					if (tone == 0) { latin = L'ê'; latin_upr = L'Ê'; }
					flag = 1; break;
				}
				if (tone == 1) { latin = L'ē'; latin_upr = L'Ē'; }
				if (tone == 2) { latin = L'é'; latin_upr = L'É'; }
				if (tone == 3) { latin = L'ě'; latin_upr = L'Ě'; }
				if (tone == 4) { latin = L'è'; latin_upr = L'È'; }
				if (tone == 5) { latin = L'ė'; latin_upr = L'Ė'; }
				if (tone == 0) { latin = L'e'; latin_upr = L'E'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'i')
			{
				if (input[i + 1] == 'u') break;
				if (tone == 1) { latin = L'ī'; latin_upr = L'Ī'; }
				if (tone == 2) { latin = L'í'; latin_upr = L'Í'; }
				if (tone == 3) { latin = L'ǐ'; latin_upr = L'Ǐ'; }
				if (tone == 4) { latin = L'ì'; latin_upr = L'Ì'; }
				if (tone == 5) { latin = L'ï'; latin_upr = L'Ï'; }
				if (tone == 0) { latin = L'i'; latin_upr = L'I'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'u')
			{
				if (tone == 1) { latin = L'ū'; latin_upr = L'Ū'; }
				if (tone == 2) { latin = L'ú'; latin_upr = L'Ú'; }
				if (tone == 3) { latin = L'ǔ'; latin_upr = L'Ǔ'; }
				if (tone == 4) { latin = L'ù'; latin_upr = L'Ù'; }
				if (tone == 5) { latin = L'u'; latin_upr = L'U'; combine = L'\x307'; }
				if (tone == 0) { latin = L'u'; latin_upr = L'U'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'v')
			{
				if (tone == 1) { latin = L'ǖ'; latin_upr = L'Ǖ'; }
				if (tone == 2) { latin = L'ǘ'; latin_upr = L'Ǘ'; }
				if (tone == 3) { latin = L'ǚ'; latin_upr = L'Ǚ'; }
				if (tone == 4) { latin = L'ǜ'; latin_upr = L'Ǜ'; }
				if (tone == 5) { latin = L'ü'; latin_upr = L'Ü'; combine = L'\x307'; }
				if (tone == 0) { latin = L'ü'; latin_upr = L'Ü'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'n')
			{
				if (tone == 1) { latin = L'n'; latin_upr = L'N'; combine = L'\x304'; }
				if (tone == 2) { latin = L'ń'; latin_upr = L'Ń'; }
				if (tone == 3) { latin = L'ň'; latin_upr = L'Ň'; }
				if (tone == 4) { latin = L'ǹ'; latin_upr = L'Ǹ'; }
				if (tone == 5) { latin = L'ṅ'; latin_upr = L'Ṅ'; }
				if (tone == 0) { latin = L'n'; latin_upr = L'N'; }
				flag = 1; break;
			}
		breag;
		for (i = 0; i < l; i++)
			if (input[i] == 'm')
			{
				if (tone == 1) { latin = L'm'; latin_upr = L'M'; combine = L'\x304'; }
				if (tone == 2) { latin = L'ḿ'; latin_upr = L'Ḿ'; }
				if (tone == 3) { latin = L'm'; latin_upr = L'M'; combine = L'\x30C'; }
				if (tone == 4) { latin = L'm'; latin_upr = L'M'; combine = L'\x300'; }
				if (tone == 5) { latin = L'ṁ'; latin_upr = L'Ṁ'; }
				if (tone == 0) { latin = L'm'; latin_upr = L'M'; }
				flag = 1; break;
			}
	}
	input[l] = '\0';
	if (combine != '#')
		for (int j = l; j > i; j--)
			input[j] = input[j - 1];
	setlocale(LC_ALL, "zh-CN.UTF-8");
	mbstowcs(output, input, 20);
	strupr(input);
	mbstowcs(output_upr, input, 20);
	if (flag == 1) { output[i] = latin; output_upr[i] = latin_upr; }
	if (combine != '#') { output[i + 1] = combine; output_upr[i + 1] = combine; }
	wprintf(L"%ls", output);
	//wprintf(L"大写字母为：%ls\n", output_upr);
}
int main()
{
begin:
	int l, hint = 0;
	flag_error = 0;
	system("title 格式化拼音形式");
	system("cls");
	printf("（最多可输入 100 字母，拼音之间用隔音符号“'”分隔，每个拼音最多可输入 20 字母。）\n");
	printf("请输入拼音：");
	scanf("%s", sentence);
	l = strlen(sentence);
	strlwr(sentence);
	system("cls");
	printf("请输入拼音：%s\n", sentence);
	sentence[l] = '\'';
	printf("转换结果为：");
	for (int i = 0; i <= l; i++)
	{
		if (sentence[i] != '\'') { input[i - hint] = sentence[i]; continue; }
		input[i - hint] = '\0';
		converse();
		if (flag_error == 1) goto begin;
		if (i != l) putchar('\'');
		hint = i + 1;
	}
	putchar('\n');
	return 0;
}