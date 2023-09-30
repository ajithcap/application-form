document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#navList a");

    // Function to scroll to the target section
    function scrollToSection(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1); // Get the section ID from the href
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth", // Smooth scroll
            });
        }
    }

    // Attach click event listeners to navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Function to navigate to a specific section and update the highlight
function navigateToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Update the active link and highlight based on the active section
        navLinks.forEach((link) => {
            link.classList.remove("active-link");
            if (link.getAttribute("href").substring(1) === targetId) {
                link.classList.add("active-link");
            }
        });
    }
}

// Rest of your code...

    // Function to navigate to the next section
    function goToNextSection(currentSection) {
        const nextSection = currentSection.nextElementSibling;
        if (nextSection) {
            currentSection.classList.add("hidden");
            nextSection.classList.remove("hidden");
            nextSection.scrollIntoView({
                behavior: "smooth"
            });
            
                    // Get the target section's ID
                    const targetId = nextSection.id;

                    // Navigate to the target section and update the highlight
                    navigateToSection(targetId);

                    // Define and use the nextButtonSection
                    const nextButtonSection = document.querySelector("#navList"); // Adjust the selector as needed
                    nextButtonSection.style.top = "0"; // Set the style property
                }
        }
        
       
    


    // Function to navigate to the previous section
    function goToPrevSection(currentSection) {
        const prevSection = currentSection.previousElementSibling;
        if (prevSection) {
            currentSection.classList.add("hidden");
            prevSection.classList.remove("hidden");
        }
    }

   // Attach click event listeners to navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior of navigating to a new page

            const targetId = this.getAttribute("href").substring(1); // Get the section ID from the href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                sections.forEach((section) => {
                    section.classList.add("hidden");
                });

                // Show the target section
                targetSection.classList.remove("hidden");

                // Update the active link and highlight based on the active section
                navLinks.forEach((navLink) => {
                    navLink.classList.remove("active-link");
                });
                this.classList.add("active-link");
            }
        });
    });

    // Attach click event listeners to the Next and Back buttons
    sections.forEach((section) => {
        const nextButton = section.querySelector("button[id^='next']");
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                const nextSection = section.nextElementSibling;
                if (nextSection) {
                    section.classList.add("hidden");
                    nextSection.classList.remove("hidden");

                    // Find the corresponding navigation link and make it active
                    const targetLinkId = "#" + nextSection.id;
                    navLinks.forEach((navLink) => {
                        navLink.classList.remove("active-link");
                        if (navLink.getAttribute("href") === targetLinkId) {
                            navLink.classList.add("active-link");
                        }
                    });
                }
            });
        }

        const backButton = section.querySelector("button[id^='prev']");
        if (backButton) {
            backButton.addEventListener("click", () => {
                const prevSection = section.previousElementSibling;
                if (prevSection) {
                    section.classList.add("hidden");
                    prevSection.classList.remove("hidden");

                    // Find the corresponding navigation link and make it active
                    const targetLinkId = "#" + prevSection.id;
                    navLinks.forEach((navLink) => {
                        navLink.classList.remove("active-link");
                        if (navLink.getAttribute("href") === targetLinkId) {
                            navLink.classList.add("active-link");
                        }
                    });
                }
            });
        }
    });



    // Initially hide all sections except the Home section
    sections.forEach((section) => {
        if (section.id !== "home") {
            section.classList.add("hidden");
        }
    });

    // Function to show the Personal Information section and hide the Home section
    function showPersonalInfo() {
        // Hide all sections except Personal Information
        sections.forEach((section) => {
            if (section.id !== "personal_info") {
                section.classList.add("hidden");
            }
        });

        // Show the Personal Information section
        document.getElementById("personal_info").classList.remove("hidden");
    }

    // Add click event listener to the "click here" button to show Personal Information
    const showPersonalInfoButton = document.getElementById("showPersonalInfo");
    if (showPersonalInfoButton) {
        showPersonalInfoButton.addEventListener("click", showPersonalInfo);
    }

 

    const navItems = document.querySelectorAll("#navList ul li");

    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove the 'highlighted' class from all list items
            navItems.forEach((navItem) => {
                navItem.classList.remove("highlighted");
            });
            // Add the 'highlighted' class to the clicked list item
            this.classList.add("highlighted");
          
        });
    });


    });

// JavaScript code for handling company details and skills
document.addEventListener("DOMContentLoaded", function () {
    const yesRadio = document.getElementById("yes");
    const noRadio = document.getElementById("no");
    const companyDetails = document.querySelector(".company_details");

    // Function to toggle company details visibility
    function toggleCompanyDetails() {
        if (yesRadio.checked) {
            companyDetails.style.display = "block";
        } else {
            companyDetails.style.display = "none";
        }
    }

    // Attach event listeners for the company details section
    yesRadio.addEventListener("change", toggleCompanyDetails);
    noRadio.addEventListener("change", toggleCompanyDetails);

    // Initial state
    toggleCompanyDetails();

    const addCompanyBtn = document.getElementById("addCompanyBtn");
    addCompanyBtn.style.marginBottom = "10px";
    addCompanyBtn.style.backgroundColor="orange";
    const companiesContainer = document.querySelector(".company_details");

    addCompanyBtn.addEventListener("click", function () {
        if (yesRadio.checked) {
            const newCompanyFields = document.createElement("div");
            newCompanyFields.innerHTML = `
                <h3>Old Company Details</h3><br>
                <label for="newCompanyName">Company Name:</label>
                <input type="text" id="newCompanyName" name="companyName[]" class="form-input"><br><br>
    
                <label for="newDesignation">Designation:</label>
                <input type="text" id="newDesignation" name="designation[]" class="form-input"><br><br>
    
                <label for="newJoinDate">Date of Joining:</label>
                <input type="date" id="newJoinDate" name="joinDate[]" class="form-input"><br><br>
    
                <label for="newNoticePeriod">Notice Period or End date:</label>
                <input type="text" id="newNoticePeriod" name="noticePeriod[]" class="form-input"><br><br>
    
                <button type="button" class="remove-company">Remove</button>
            `;

            companiesContainer.appendChild(newCompanyFields);

            const removeButton = newCompanyFields.querySelector(".remove-company");
            removeButton.style.marginBottom = "10px";
            removeButton.style.backgroundColor = "red";
            
            removeButton.addEventListener("click", function () {
                companiesContainer.removeChild(newCompanyFields);
            });
        }
    });
    
    const addSkillButton = document.getElementById("addSkillButton");
    const skillsContainer = document.getElementById("skillsContainer");

    function addSkillInput() {
        const skillContainer = document.createElement("div");
        skillContainer.classList.add("skill-container");

        const skillInput = document.createElement("input");
        skillInput.type = "text";
        skillInput.name = "skills[]";
        skillInput.classList.add("form-input", "skill-input");
        skillInput.placeholder = "Enter a skill";

        skillInput.addEventListener("keypress", function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                addSkillInput();
            }
        });

        const clearButton = document.createElement("button");
        clearButton.textContent = "Clear";
        clearButton.classList.add("clear-button");
        clearButton.style.marginBottom="10px";
        clearButton.style.backgroundColor="red";
        clearButton.style.marginTop="0";

        clearButton.addEventListener("click", function () {
            const parentContainer = clearButton.closest(".skill-container");
            parentContainer.remove();
        });

        skillContainer.appendChild(skillInput);
        skillContainer.appendChild(clearButton);
        skillsContainer.appendChild(skillContainer);
    }

    addSkillButton.addEventListener("click", addSkillInput);

    const form = document.getElementById("application_form");

    form.addEventListener("submit", function (e) {
        const skillsInput = document.getElementById("skillsInput");
        skillsInput.type = "hidden";
        skillsInput.name = "skills[]";
        const skillsArray = [];
        const skillInputs = document.querySelectorAll(".skill-input");

        skillInputs.forEach(function (input) {
            skillsArray.push(input.value);
        });

        skillsInput.value = JSON.stringify(skillsArray);
        form.appendChild(skillsInput);
    });

    const inputFields = document.querySelectorAll('.form-input');

    inputFields.forEach((input, index) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const nextInput = inputFields[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const form = document.querySelector("form");

    // Handle form submission
    form.addEventListener("submit", function (event) {
        // Check if the checkbox is checked
        const checkbox = document.getElementById("declarationCheckbox");
        if (!checkbox.checked) {
            alert("Please agree to the terms and conditions.");
            event.preventDefault(); // Prevent form submission
        }
    });
});
// JavaScript code for handling education details
// Function to show the selected education section
function showDetails(targetId) {
    const educationSections = document.querySelectorAll("#education_details > div");
    educationSections.forEach((section) => {
        section.style.display = "none";
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = "block";
    }
}

// Initially show only the list of education levels
document.addEventListener("DOMContentLoaded", function () {
    const educationNav = document.getElementById("education_levels");
    educationNav.style.display = "block";
    educationNav.style.textDecorationLine="none";

    // Hide all education sections except the navigation
    const educationSections = document.querySelectorAll("#education_details > div");
    educationSections.forEach((section) => {
        section.style.display = "none";

    });
});

// JavaScript code for showing and hiding sections
document.addEventListener("DOMContentLoaded", function () {
    // ... Your existing code ...

    // Add event listener to the "Next" button in the "Resume Upload" section
    const nextResumeToDeclaration = document.getElementById("nextResumeToDeclaration");
    if (nextResumeToDeclaration) {
        nextResumeToDeclaration.addEventListener("click", () => {
            // Hide the "Resume Upload" section
            const resumeUploadSection = document.getElementById("resume_upload");
            resumeUploadSection.classList.add("hidden");

            // Show the "Declaration" section
            const declarationSection = document.getElementById("declaration");
            declarationSection.classList.remove("hidden");
        });
    }
});
// JavaScript code for showing and hiding sections
document.addEventListener("DOMContentLoaded", function () {
    // ... Your existing code ...

    // Add event listener to the "Back" button in the "Declaration" section
    const prevDeclarationToResume = document.getElementById("prevDeclarationToResume");
    if (prevDeclarationToResume) {
        prevDeclarationToResume.addEventListener("click", () => {
            // Hide the "Declaration" section
            const declarationSection = document.getElementById("declaration");
            declarationSection.classList.add("hidden");

            // Show the "Resume Upload" section
            const resumeUploadSection = document.getElementById("resume_upload");
            resumeUploadSection.classList.remove("hidden");
        });
    }
});
// Simulate a successful data insertion (replace this with your actual logic)
document.addEventListener("DOMContentLoaded", function () {
    // Simulate a successful data insertion (replace this with your actual logic)
    function simulateDataInsertion() {
        // Assuming data insertion is successful
        return true;
    }

    // Get the "Home" button element
    const homeButton = document.getElementById("home-button");

    // Get the success message element
    const successMessage = document.getElementById("success-message");

    // Get the error message element
    const errorMessage = document.getElementById("error-message");

    // Check if data insertion is successful
    if (simulateDataInsertion()) {
        // Data insertion was successful, show the success message
        successMessage.style.display = "block"; // Show the success message
    } else {
        // Data insertion failed, show the error message
        errorMessage.style.display = "block"; // Show the error message
    }

    // Add an event listener to the button
    homeButton.addEventListener("click", function () {
        // Redirect to the home page (replace 'home.html' with your actual home page URL)
        window.location.href = 'home.html';
    });
});
