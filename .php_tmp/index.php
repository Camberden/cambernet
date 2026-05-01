<?php


$servername = "130.51.180.241";
$username = "camberde";
$password = "momone33";
$dbname = "camberde_nda";
$dbport = 3306;

// Create connection
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
// $mysqli = new mysqli('localhost', 'username', 'password', 'dbname', 3307);

$con = mysqli_connect($servername, $username, $password, $dbname, $dbport);
$con->set_charset('utf8mb4'); // always set the charset
die($con);


?>

<head>
    <meta charset="utf8">
    <link rel="stylesheet" src="styles.css">
</head>
<body>
<main>
    <div>
        <h2>Hello, you.</h2>
    
    
        </div>
</main>
</body>