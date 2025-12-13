<?php

// echo realpath(__DIR__ . DIRECTORY_SEPARATOR . "/..");

const BASE_PATH = __DIR__ . DIRECTORY_SEPARATOR;

function base_path($path = "") {
	return  BASE_PATH . $path;
}

include base_path("views/partials/view.header.php");

include base_path("views/view.index.php");

include base_path("views/partials/view.footer.php");




?>
