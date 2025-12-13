<body>
	<main class="index-grid">

		<div class="signature-div">
			<img id="signature" src="assets/image-camberden-signature-6.svg" alt="emblem">
		</div>

		<h1 id="camberden" lang="en-US">camberden.php</h1>

		<div class="index-item">
			<h3 id="site-info"></h3>
			<br>
			<p><code>TODO: Import template.js from main.</code></p>
			<br>
			<p><code><?= BASE_PATH ?></code></p>

		</div>

		<div id="section-links">
				<?php
				$sections = [
					["novelties", "Novelties"],
					["workspace", "Coding Workspace"],
					["musings", "Musings Page"],
				];
				foreach ($sections as $section) : ?>
					<div>
						<a href="/controllers/<?= $section[0] ?>.php">
							<h2 class="section-title"><?= $section[1] ?></h2>
						</a>
					</div>
				<?php endforeach; ?>
		</div>
	</main>