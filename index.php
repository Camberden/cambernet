<?php


$servername = "localhost";
$username = "camberde_nu";
$password = "momone33";
$dbname = "camberde_nda";

// Create connection
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
// $mysqli = new mysqli('localhost', 'username', 'password', 'dbname', 3307);

$con = mysqli_connect($servername, $username, $password, $dbname);
$con->set_charset('utf8mb4'); // always set the charset


?>
<body>
<main>
    <div>
        <h2>Hello, you.</h2>
    
    
</div>
</main>
</body>