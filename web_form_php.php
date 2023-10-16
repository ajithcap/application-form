
<?php
 

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "application"; // Replace with your actual database name

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "connected";
$uploadDirectory = "E:/XAMPP/htdocs/Application_form/upload_documents/";

// Function to sanitize and validate input data
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$successMessage = "";
$errorMessage = "";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Set variables for the form data
    $preferred_pronounce = test_input($_POST["preferred_pronounce"]);
    $first_name = test_input($_POST["first_name"]);
    $last_name = test_input($_POST["last_name"]);
    $age = test_input($_POST["age"]);
    $dob=test_input($_POST["dob"]);
    $address = test_input($_POST["address"]);
    $father_name = test_input($_POST["father_name"]);
    $mother_name = test_input($_POST["mother_name"]);
    $father_occupation = test_input($_POST["father_occupation"]);
    $mother_occupation = test_input($_POST["mother_occupation"]);
    $annual_income = test_input($_POST["annual_income"]);
    $nationality = test_input($_POST["nationality"]);
    $martial_status = test_input($_POST["martial_status"]);
    $occupation = test_input($_POST["occupation"]);
    $family_members = test_input($_POST["family_members"]);
    $phone_number = test_input($_POST["phone_number"]);
    $telephone_number = test_input($_POST["telephone_number"]);
    $father_number = test_input($_POST["father_number"]);
    $mother_number = test_input($_POST["mother_number"]);
    $email = test_input($_POST["email"]);
    $linkedin = test_input($_POST["linkedin"]);
    $github = test_input($_POST["github"]);
    $instagram = test_input($_POST["instagram"]);
    $twitter = test_input($_POST["twitter"]);
    $portfolio = test_input($_POST["portfolio"]);
    $ug_university = test_input($_POST["ug_university"]);
    $ug_college = test_input($_POST["ug_college"]);
    $ug_start_date = test_input($_POST["ug_start_date"]);
    $ug_end_date = test_input($_POST["ug_end_date"]);
    $ug_percentage = test_input($_POST["ug_percentage"]);
    $pg_university = test_input($_POST["pg_university"]);
    $pg_college = test_input($_POST["pg_college"]);
    $pg_start_date = test_input($_POST["pg_start_date"]);
    $pg_end_date = test_input($_POST["pg_end_date"]);
    $pg_percentage = test_input($_POST["pg_percentage"]);
    $diploma_university = test_input($_POST["diploma_university"]);
    $diploma_college = test_input($_POST["diploma_college"]);
    $diploma_start_date = test_input($_POST["diploma_start_date"]);
    $diploma_end_date = test_input($_POST["diploma_end_date"]);
    $diploma_percentage = test_input($_POST["diploma_percentage"]);
    $s12_school = test_input($_POST["s12_school"]);
    $s12th_board = test_input($_POST["s12th_board"]);
    $s12th_start_date = test_input($_POST["s12th_start_date"]);
    $s12th_end_date = test_input($_POST["s12th_end_date"]);
    $s12th_percentage = test_input($_POST["s12th_percentage"]);
    $s10th_school = test_input($_POST["s10th_school"]);
    $s10th_board = test_input($_POST["s10th_board"]);
    $s10th_start_date = test_input($_POST["s10th_start_date"]);
    $s10th_end_date = test_input($_POST["s10th_end_date"]);
    $s10th_percentage = test_input($_POST["s10th_percentage"]);
    $working = isset($_POST["working"]) ? ($_POST["working"] === "yes" ? true : null) : null;


    // Process the skills array
    $skillsJson = $_POST["skills"];
    $resumeFileName = $_FILES["resume"]["name"];
    $resumeTmpName = $_FILES["resume"]["tmp_name"];
    $coverLetterFileName = $_FILES["cover_letter"]["name"];
    $coverLetterTmpName = $_FILES["cover_letter"]["tmp_name"];

    $resumePath = $uploadDirectory . $resumeFileName;
    $coverLetterPath = $uploadDirectory . $coverLetterFileName;

    // Specify the directory where you want to store uploaded files

    if (move_uploaded_file($resumeTmpName, $uploadDirectory . $resumeFileName) &&
        move_uploaded_file($coverLetterTmpName, $uploadDirectory . $coverLetterFileName)) {
        echo "Files uploaded successfully!<br>";
        echo "Resume path: " . $resumePath . "<br>";
        echo "Cover Letter path: " . $coverLetterPath . "<br>";
    } else {
        echo "Error uploading files!<br>";
    }

    // Check if "skills" is set in the POST data
    if (isset($_POST["skills"])) {
        // Process the skills array
        $skillsArray = $_POST["skills"];
        $serializedSkills = json_encode($skillsArray);
    } else {
        // If "skills" key doesn't exist, set it to an empty array
        $serializedSkills = json_encode([]);
    }

    $data = [
        'working' => $working,
        'companyName' => [], // Initialize an empty array for company details
    ];

    if ($working) {
        // Get the company details arrays
        $companyNames = $_POST["companyName"];
        $designations = $_POST["designation"];
        $joinDates = $_POST["joinDate"];
        $noticePeriods = $_POST["noticePeriod"];

        // Create an array to store company details
        $companyDetails = [];

        // Loop through the arrays and insert each company's data
        for ($i = 0; $i < count($companyNames); $i++) {
            $companyDetail = [
                'companyName' => $companyNames[$i],
                'designation' => $designations[$i],
                'joinDate' => $joinDates[$i],
                'noticePeriod' => $noticePeriods[$i],
            ];
            $companyDetails[] = $companyDetail;
        }
        $companyDetailsJson = json_encode($companyDetails);

        // Remove square brackets at the beginning and end
        $companyDetailsJson = substr($companyDetailsJson, 1, -1);


        // Remove double quotes
        //$companyDetailsJson = str_replace('"', '', $companyDetailsJson);

        //$skills = json_decode($skillsJson, true);

        // Insert data into the "trying" table
        $sql = "INSERT INTO application_data (
            preferred_pronounce, first_name, last_name, age, dob, address, father_name, mother_name, father_occupation, mother_occupation, annual_income, nationality, martial_status, occupation, family_members,
            phone_number, telephone_number, father_number, mother_number, email, linkedin, github, instagram, twitter, portfolio,
            ug_university, ug_college, ug_start_date, ug_end_date, ug_percentage, pg_university, pg_college, pg_start_date, pg_end_date, pg_percentage,
            diploma_university, diploma_college, diploma_start_date, diploma_end_date, diploma_percentage,
            s12th_school, s12th_board, s12th_start_date, s12th_end_date, s12th_percentage,
            s10th_school, s10th_board, s10th_start_date, s10th_end_date, s10th_percentage,
            working, companyName, skills, resume_path, cover_letter_path
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        
        $stmt = $conn->prepare($sql);
    
        if ($stmt) {
            // Bind parameters for the user details
            $stmt->bind_param(
                "sssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                $preferred_pronounce,
                $first_name,
                $last_name,
                $age,
                $dob,
                $address,
                $father_name,
                $mother_name,
                $father_occupation,
                $mother_occupation,
                $annual_income,
                $nationality,
                $martial_status,
                $occupation,
                $family_members,
                $phone_number,
                $telephone_number,
                $father_number,
                $mother_number,
                $email,
                $linkedin,
                $github,
                $instagram,
                $twitter,
                $portfolio,
                $ug_university,
                $ug_college,
                $ug_start_date,
                $ug_end_date,
                $ug_percentage,
                $pg_university,
                $pg_college,
                $pg_start_date,
                $pg_end_date,
                $pg_percentage,
                $diploma_university,
                $diploma_college,
                $diploma_start_date,
                $diploma_end_date,
                $diploma_percentage,
                $s12_school,
                $s12th_board,
                $s12th_start_date,
                $s12th_end_date,
                $s12th_percentage,
                $s10th_school,
                $s10th_board,
                $s10th_start_date,
                $s10th_end_date,
                $s10th_percentage,
                $working,
                $companyDetailsJson,
                $serializedSkills,
                $resumePath,
                $coverLetterPath
            ); // Bind resume and cover letter paths
    
            if ($stmt->execute()) {
                echo "Data inserted successfully!<br>";
            } else {
                echo "Error: " . $stmt->error . "<br>";
            }
    
            $stmt->close();
        } else {
            echo "Error preparing SQL statement: " . $conn->error . "<br>";
        }
    } else {
        // If the form is not submitted, you can set the "company details" section to null if "working" is "no."
        $working = "no"; // Set this value based on your form field or logic.
        
        if ($working === "no") {
            $companyDetailsJson = "null";
        }
    
        // Insert data into the "trying" table
        $sql = "INSERT INTO application_data (
            preferred_pronounce, first_name, last_name, age, dob, address, father_name, mother_name, father_occupation, mother_occupation, annual_income, nationality, martial_status, occupation, family_members,
            phone_number, telephone_number, father_number, mother_number, email, linkedin, github, instagram, twitter, portfolio,
            ug_university, ug_college, ug_start_date, ug_end_date, ug_percentage, pg_university, pg_college, pg_start_date, pg_end_date, pg_percentage,
            diploma_university, diploma_college, diploma_start_date, diploma_end_date, diploma_percentage,
            s12th_school, s12th_board, s12th_start_date, s12th_end_date, s12th_percentage,
            s10th_school, s10th_board, s10th_start_date, s10th_end_date, s10th_percentage,
            working, companyName, skills, resume_path, cover_letter_path
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        
        $stmt = $conn->prepare($sql);
    
        if ($stmt) {
            // Bind parameters for the user details
            $stmt->bind_param(
                "sssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                $preferred_pronounce,
                $first_name,
                $last_name,
                $age,
                $dob,
                $address,
                $father_name,
                $mother_name,
                $father_occupation,
                $mother_occupation,
                $annual_income,
                $nationality,
                $martial_status,
                $occupation,
                $family_members,
                $phone_number,
                $telephone_number,
                $father_number,
                $mother_number,
                $email,
                $linkedin,
                $github,
                $instagram,
                $twitter,
                $portfolio,
                $ug_university,
                $ug_college,
                $ug_start_date,
                $ug_end_date,
                $ug_percentage,
                $pg_university,
                $pg_college,
                $pg_start_date,
                $pg_end_date,
                $pg_percentage,
                $diploma_university,
                $diploma_college,
                $diploma_start_date,
                $diploma_end_date,
                $diploma_percentage,
                $s12_school,
                $s12th_board,
                $s12th_start_date,
                $s12th_end_date,
                $s12th_percentage,
                $s10th_school,
                $s10th_board,
                $s10th_start_date,
                $s10th_end_date,
                $s10th_percentage,
                $working,
                $companyDetailsJson,
                $serializedSkills,
                $resumePath,
                $coverLetterPath
            ); // Bind resume and cover letter paths
    
            if ($stmt->execute()) {
                echo "Data inserted successfully!<br>";
                $successMessage = "Data inserted successfully!";
                
            } else {
                echo "Error: " . $stmt->error . "<br>";
                $errorMessage = "Error: " . $stmt->error;
                
            }
    
            $stmt->close();
        } else {
            echo "Error preparing SQL statement: " . $conn->error . "<br>";
            $errorMessage = "Error preparing SQL statement: " . $conn->error;
        }
        
    }
          
}   

?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application php server </title>
    <link rel="icon" href="black.ico" type = "image/x-icon"/>


    <link rel="stylesheet"  href="web_form_style.css">
    <style>
        /* Center the success message and the button vertically and horizontally */
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        #success-message {
            background-color: green;
            color: white;
            padding: 10px;
            text-align: center;
            <?php if (!empty($successMessage)) { ?>display: block;<?php } else { ?>display: none;<?php } ?>
        }
    </style>
</head>
<body>
    <section id="message">
        <div id="success-message">
            <div id="success-text"><?= $successMessage ?></div>
            <div id="error-text" class="hidden"><?= $errorMessage ?></div>
            <button id="home-button"  onclick="scrollToHomeSection()" href="#home">Home</button>
        </div>
    </section>
    <script>
         function scrollToHomeSection() {
        // Use window.location to navigate to the "home.html" page
        window.location.href = "index.html.HTML";
    }

    // Attach the click event handler to the "Home" button
    var homeButton = document.getElementById("home-button");
    homeButton.addEventListener("click", scrollToHomeSection);
        
    </script>
</body>
</html>
