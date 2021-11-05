/* Lorem Ipsum Generator
 * (CC-BY) Fredrik Bridell 2009
 * Version 0.21 - multilingual
 * Released under a Creative Commons Attribution License
 */
var loremIpsumParagraph;
(function () {
	var str = "";
	function chance(e) {
		return Math.floor(Math.random() * 100) < e
	}
	function capitalize(e) {
		return e.substring(0, 1).toUpperCase() + e.substring(1, e.length)
	}
	function getLoremWord() {
		return loremLang[Math.floor(Math.random() * loremLang.length)]
	}
	function getLoremEnding() {
		var e = Math.floor(Math.random() * endings.length);
		return endings.substring(e, e + 1)
	}
	function loremIpsum(e) {
		for (var t = 0; t < e - 1; t++) {
			str += getLoremWord() + " ";
		}
		str += getLoremWord();
	}
	function loremIpsumSentence(e) {
		str += capitalize(getLoremWord()) + " ";
		loremIpsum(e - 1);
		str += getLoremEnding();
		str += " ";
	}
	function loremIpsumSentence2(e) {
		str += capitalize(getLoremWord()) + " ";
		var t = 0;
		if (chance(50)) {
			t = Math.floor(Math.random() * e - 2);
			loremIpsum(t);
			str += ", ";
		} else {
			str += " ";
		}
		loremIpsum(e - t - 1);
		str += getLoremEnding();
		str += " ";
	}
	loremIpsumParagraph = function (e) {
		str = "";
		var t = e;
		while (t > 0) {
			if (t > 10) {
				w = Math.floor(Math.random() * 8) + 2;
				loremIpsumSentence2(w);
				t = t - w
			} else {
				loremIpsumSentence2(t);
				t = 0
			}
		}
		return str;
	}
	var latin = ["pull", "crowbar", "take back", "abruptly", "of embriage", "giving", "of the right", "and take completely", "progressively", "back the crowbar", "of embriage to you", "to you, while", "while", "for making", "for the walking", "hurl the mover", "hurl", "second speed", "first speed", "push rapidly", "it gaves all its strength", "carriage", "15Km/Hr", "it is raised up again", "up again", "for taking", "at the crowbar forward", "rapidly forward", "stopped", "take abruptly", "when you are in first speed", "the drag of the wheel", "til his starting", "without brutality", "crowbar of the right", "completely", "take forth"];
	var loremLang = latin;
	var endings = ".......!.........................!"
}());