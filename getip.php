<?php
// Get the client's IP address
$ip = $_SERVER['REMOTE_ADDR'];

// Return the IP address as JSON
echo json_encode(array('ip' => $ip));
?>
