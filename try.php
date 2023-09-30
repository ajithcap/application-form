<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "application";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "connected";


// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $working = isset($_POST["working"]) && $_POST["working"] === "yes" ? true : false;

    if ($working) {
        // Get and sanitize other form data
        $companyNames = $_POST["companyName"];
        $designations = $_POST["designation"];
        $joinDates = $_POST["joinDate"];
        $noticePeriods = $_POST["noticePeriod"];

        // Loop through the arrays to insert each set of data into the database
        for ($i = 0; $i < count($companyNames); $i++) {
            $companyName = $companyNames[$i];
            $designation = $designations[$i];
            $joinDate = $joinDates[$i];
            $noticePeriod = $noticePeriods[$i];
    

    
    // Insert data into the database
            $sql = "INSERT INTO  try(name, email) VALUES (name,email,companyName,designation,joinDate,noticePeriod)";
            $stmt = $conn->prepare($sql);
            if ($stmt) {
                $stmt->bind_param("sssssss",$companyNames,$designations,$joinDates,$noticePeriods ,$working, $companyName, $designation, $joinDate, $noticePeriod);

                if ($stmt->execute()) {
                    echo "Data inserted successfully!<br>";
                } else {
                    echo "Error: " . $stmt->error . "<br>";
                }

                $stmt->close();
            } else {
                echo "Error preparing SQL statement: " . $conn->error . "<br>";
            }
        }
    }
}
    // Close the database connection
    $conn->close();

?>