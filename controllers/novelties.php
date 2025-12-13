<?php

const BASE_PATH = ".." . DIRECTORY_SEPARATOR;

function base_path($path = "") {
	return  BASE_PATH . $path;
}

require base_path("views/partials/view.header.php");

require base_path("views/view.novelties.php");

require base_path("views/partials/view.footer.php");