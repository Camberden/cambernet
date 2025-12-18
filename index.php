<?php

// echo realpath(__DIR__ . DIRECTORY_SEPARATOR . "/..");

const BASE_PATH = __DIR__ . DIRECTORY_SEPARATOR;

function base_path($path = "") {
	return  BASE_PATH . $path;
}

function dd() {
	$arguments = func_get_args();
	foreach ($arguments as $argument) {
		echo "<pre style='text-align:left;'>";
		var_dump($argument);
		echo "</pre>";
	}
	exit(1);
}

function getGlobalVariableName($var) {
	foreach($GLOBALS as $varName => $value) {
		if ($value === $var) {
			return $varName;
		}
	}
	return $varName;
}

include base_path("views/partials/view.header.php");

include base_path("views/view.index.php");

include base_path("views/partials/view.footer.php");

?>
