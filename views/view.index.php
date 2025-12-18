<body>
	<main class="index-grid">

		<div class="signature-div">
			<img id="signature" src="assets/image-camberden-signature-6.svg" alt="emblem">
		</div>

		<h1 id="camberden" lang="en-US">camberden.php</h1>

		<div class="index-item">
			<h3 id="site-info"></h3>
			<br>
			<p><code>TODO: Fix SSL Stapling Issue</code></p>
			<br>
			<p><code>BASE_PATH: <?= BASE_PATH ?></code></p>
			<br>

			<p>[Sat Dec 13 02:15:18.947197 2025] [ssl:error] [pid 3758639:tid 3758639] AH02218: ssl_stapling_init_cert: no OCSP URI in certificate and no SSLStaplingForceURL set [subject: CN=camberden.net / issuer: CN=E7,O=Let's Encrypt,C=US / serial: 06C7B832D6C55CD20A0A3E5590059415FC35 / notbefore: Nov 14 06:16:38 2025 GMT / notafter: Feb 12 06:16:37 2026 GMT]
			[Sat Dec 13 02:15:18.947207 2025] [ssl:error] [pid 3758639:tid 3758639] AH02604: Unable to configure certificate camberden.net:443:0 for stapling
			</p>
			<br>
			<p>DUMPED VAR:
			<?= 
			dd($_SERVER); 
			dd(openssl_get_cert_locations());
			?>
			</p>
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