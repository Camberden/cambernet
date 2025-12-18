<?php



$routes = [
	"/" => base_path("views/view.index.php"),
	"/novelties" => base_path("views/view.novelties.php"),
	// "/" => base_path("views/view.index.php"),
];


$uri = parse_url($_SERVER["REQUEST_URI"]);

function uriIs($uri) {
	return $uri === parse_url($_SERVER["REQUEST_URI"]);
}

function resolve_route($uri) {
	global $routes;

	if (array_key_exists($uri, $routes)) {
		return require $routes[$uri];
	} else {
		http_response_code(404);
		return require base_path("views/view.404.php");
	}
}