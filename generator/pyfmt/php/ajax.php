<?php
/* function echoc($text) {
if (isset($text) || stripos($text, "Undefined") === false) return $text;
else return "";
} */

// error_reporting(0);

$raw = "";
$type = "";
$sep = " ";
$result = "";
if (array_key_exists('raw', $_GET))
	$raw = $_GET['raw'];
if (array_key_exists('type', $_GET))
	$type = $_GET['type'];
if (array_key_exists('sep', $_GET))
	$sep = $_GET['sep'];

function single($input, $type = 0){
	$input = trim(strtolower($input));
	if ($input === '') return '';
	$l = strlen($input);
	$v = 0;
	for ($i = 0; $i < $l; $i++)
		if ($input[$i] == 'v')
			$v++;
	if ($v >= 2 && $input[0] == 'v')
		$input[0] = '#';
	$input = str_replace(array("v", "lyu", "nyu", "eh", "#"), array("ü", "lü", "nü", "ê", "v"), $input);
	$l = strlen($input);
	$tone = $input[$l - 1];
	if ($tone < '0' || $tone > '9') $tone = "0";
	$input = str_replace($tone, "", $input);
	if ($tone >= '6' && $tone <= '9') $tone = "1";
	$combineList = array("", "\u{0304}", "\u{0301}", "\u{030C}", "\u{0300}", "\u{0307}");
	$combine = $combineList[$tone];
	$latinCanBeToned = explode(",", "a,o,e,ê,i,u,ü,n,m");
	$latin = null;
	$serial = false;
	for ($i = 0; $serial === false && $i < count($latinCanBeToned); $i++) {
		$latin = $latinCanBeToned[$i];
		$serial = stripos($input, $latin);
	}
	if ($serial === false) $latin = "";
	if (stripos($input, "iu") !== false) $latin = "u";
	if (stripos($input, "iü") !== false) $latin = "ü";
	$result_small = ($latin !== "") ? str_replace($latin, $latin . $combine, $input) : $input;
	return $output = prepareForOutputType($result_small, $type);
}

function strtoupper_fix($str) {
	$upper = strtoupper($str);
	$upper = str_replace(array('ü', 'ê'), array('Ü', 'Ê'), $upper);
	return $upper;
}

function strtolowerupper($str) {
	$capitalList =
		explode(",", "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ê,Ü,È");
	$smallcapitalList =
		explode(",", "ᴀ,ʙ,ᴄ,ᴅ,ᴇ,ꜰ,ɢ,ʜ,ɪ,ᴊ,ᴋ,ʟ,ᴍ,ɴ,ᴏ,ᴘ,ꞯ,ʀ,ꜱ,ᴛ,ᴜ,ᴠ,ᴡ,x,ʏ,ᴢ,ᴇ\u0302,ᴜ\u0308,ᴇ\u0300");
	$smallcapital = strtoupper_fix($str);
	$smallcapital = str_replace($capitalList, $smallcapitalList, $smallcapital);
	return $smallcapital;
}

function prepareForOutputType($input, $type) {
	$diacriticalLetter =
		explode(",", "ā,á,ǎ,à,ȧ,ō,ó,ǒ,ò,ȯ,ē,é,ě,è,ė,ī,í,ǐ,ì,ï,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ń,ň,ǹ,ṅ,ḿ,ṁ,ế,ề");
	$combiningLetter =
		explode(",", "ā,á,ǎ,à,ȧ,ō,ó,ǒ,ò,ȯ,ē,é,ě,è,ė,ī,í,ǐ,ì,ï,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ń,ň,ǹ,ṅ,ḿ,ṁ,ế,ề");
	$result_small = $input;
	$result_smallcapital = strtolowerupper($result_small);
	$result_small = str_replace("i\u{0307}", "i\u{0308}", $result_small);
	// $result_small = str_replace($combiningLetter, $diacriticalLetter, $result_small);
	$result_capital = strtoupper_fix($result_small);
	$result_capital = str_replace("Ï", "İ", $result_capital);
	$output = $result_small;
	if ($type == 1)
		$output = $result_capital;
	if ($type == 2)
		$output = $result_smallcapital;
	if ($type == 3)
		$output = $result_capital[0] . mb_substr($result_small, 1);
	if ($result_smallcapital[1] >= "\u0300" && $result_smallcapital[1] < "\u0370")
		$result_smallcapital = $result_smallcapital[0] . mb_substr($result_smallcapital, 2);
	if ($type == 5)
		$output = $result_capital[0] . mb_substr($result_smallcapital, 1);
	return $output;
}

function sentence_legacy($raw, $sep = "'", $mode = 0, $type = 0) {
	if ($raw === '') return '';
	for ($i = 0; $i <= 9; $i++) 
		$raw = str_replace($i, $i . "'", $raw);
	$raw = str_replace(' ', "'", $raw);
	//preRaw 部分完
	$raw = trim(strtolower($raw));
	while (stripos($raw, "''") !== false)
		$raw = str_replace("''", "'", $raw);
	$l = strlen($raw);
	$first = 1;
	$legacy = 0;
	$n = null;
	$origType = $type;
	$result = "";
	while ($raw != "" && $raw != "'") {
		if (!($raw[0] >= '0' && $raw[0] <= '9' || $raw[0] == '^' || $raw[0] >= 'a' && $raw[0] <= 'z')) {
			if ($raw[0] == "'") {
				$raw = mb_substr($raw, 1);
				$result = $result . $sep;
			}
			if ($raw[0] == '.' || $raw[0] == '?' || $raw[0] == '!' || $raw[0] == '…' || $raw[0] == '。' || $raw[0] == '？' || $raw[0] == '！' || $raw[0] == '⋯')
				$type = $origType;
			$first = 1;
			$result = $result . $raw[0];
			$raw = mb_substr($raw, 1);
		}
		$flag = 0;
		$n = 99999;
		$n = (strpos($raw, "'") !== false ? strpos($raw, "'") : strlen($raw)); // ??  ?:
		$input = mb_substr($raw, 0, $n);
		$raw = mb_substr($raw, $n + 1);
		$aoe = $input[0];
		if ($sep == "" && ($aoe == 'a' || $aoe == 'o' || $aoe == 'e' || $aoe == 'ê' || $aoe == 'i' || $aoe == 'u' || $aoe == 'ü') && $first != 1 && $mode != 1)
			$flag = 1;
		if ($type == 4 || $type == 6) {
			$type--;
			$legacy = 1;
		}
		$input = str_replace('e^', "eh", $input);
		$output = single($input, $type);
		if ($flag == 1) $output = "'" . $output;
		$result = $result . ($raw == "" ? $output : ($output . $sep));
		if ($legacy == 1) {
			$type = $type - 3;
			$legacy = 0;
		}
		$first = 0;
	}
	$l = strlen($result);
	if ($result[$l - 1] == $sep)
		$result = mb_substr($result, 0, -1);
	return $result;
}

$result = sentence_legacy($raw, $sep, 0, $type); //在其它页面通过 $result 参数获取结果

echo $result;