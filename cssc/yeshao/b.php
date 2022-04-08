<?
$str=$_GET['content'];
/*$str=$str."\n";
$fp=fopen("b.txt","a");
fwrite($fp,$str);//写入
fclose($fp);
readfile("b.txt");//读取
<!-- www.luyuz.cn　　路羽资源博客 -->
*/





// 要写入的文件名字
$filename = 'b.txt';
// 写入的字符
$word =$str."\n";

$fh = fopen($filename, "a");
fwrite($fh, $word);    // 输出：6
fclose($fh);
header("location:./index.php");






?>