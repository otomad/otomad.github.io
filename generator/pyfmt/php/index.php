<?php
/*
 * 这是一个 PHP 文件。
 * 如果您正在 GitHub 上访问本页面，很遗憾，GitHub 并不支持 PHP 页面，请下载后查看。
 * 如果您的浏览器看到了这段内容，则说明您尚未开启服务器，请开启服务器后尝试。
 * 或者您可以尝试 JS 版页面。
 */
?>
<!DOCTYPE html>
<html lang="zh">
	<head>
		<!-- 原文件名：backend.php -->
		<meta charset="utf-8">
		<title>拼音格式化 (PHP)</title>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="description" content="对键盘输入的拼音进行格式化处理">
		<script src="https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js"></script>
		<script src="https://cdn.staticfile.org/popper.js/1.16.1/umd/popper.min.js"></script>
		<script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css">
		<link id="css" data-theme="bootstrap" rel="stylesheet" href="https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
		<style>
			h1 {
				margin: 20px 0 0;
			}
			[hidden] {
				display: none;
			}
		</style>
	</head>
	<body>
		<div hidden>
			<?php include_once "ajax.php"; ?>
		</div>
		<div class="container-fluid">
			<h1>拼音格式化</h1>
			<small class="text-info">PHP 版</small>
			<p class="mt-1">本页面版本乃 PHP 后端版，需开启服务器后方可正常显示本页面。或者您可以尝试&nbsp;<a href="../index.html">JavaScript&nbsp;前端版页面</a>体验更多功能。</p>
			<hr />
			<form action="index.php" class="form-group">
				<label for="rawText">要转换的拼音</label>
				<div class="input-group mb-2">
					<input type="text" name="raw" class="form-control" id="rawText" autofocus placeholder="输入你要转换的拼音" value="<?=$raw?>" />
				</div>
				<label for="modeGroup">选择转换类型</label>
				<div class="input-group mb-2">
					<select class="custom-select" name="type" id="modeGroup">
						<option value="0" selected>全部小写字母</option>
						<option value="1">全部大写字母</option>
						<option value="2">全部小型大写字母</option>
						<option value="3">所有拼音首字母大写，其余小写字母</option>
						<option value="5">所有拼音首字母大写，其余小型大写字母</option>
						<option value="4">仅第一个拼音首字母大写，其余小写字母</option>
						<option value="6">仅第一个拼音首字母大写，其余小型大写字母</option>
					</select>
				</div>
				<?php
					if ($type !== "")
						echo "<script>document.getElementById('modeGroup').value=" . $type . "</script>";
				?>
				<label for="sep">选择分隔符</label>
				<div class="input-group mb-3">
					<input type="text" name="sep" class="form-control" id="sep" placeholder="留空" value="<?=$sep?>" />
				</div>
				<input type="submit" class="btn btn-primary btn-block mb-3" id="create" value="生成" />
				<?php
					if ($raw === "" || $type === "") return;

					echo '<label for="resultText">转换结果</label>';
					echo '<div class="input-group"><input type="text" class="form-control" id="resultText" value="';
					// echo strtolower(urldecode($_SERVER["QUERY_STRING"]));
					echo $result;
					echo '" /></div>';
				?>
			</form>
		</div>
		<script src="/basis/NightTime.js"></script>
	</body>
</html>