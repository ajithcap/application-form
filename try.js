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

    // Function to navigate to the next section
    function goToNextSection(currentSection) {
        const nextSection = currentSection.nextElementSibling;
        if (nextSection) {
            currentSection.classList.add("hidden");
            nextSection.classList.remove("hidden");
            nextSection.scrollIntoView({
                behavior: "smooth"
            });
        }nextButtonSection.style.top = "0";
       
    }


    // Function to navigate to the previous section
    function goToPrevSection(currentSection) {
        const prevSection = currentSection.previousElementSibling;
        if (prevSection) {
            currentSection.classList.add("hidden");
            prevSection.classList.remove("hidden");
        }
    }

    // Attach click event listeners to the Next and Back buttons
    sections.forEach((section) => {
        const nextButton = section.querySelector("button[id^='next']");
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                goToNextSection(section);
                currentSection.classList.add("hidden");
            nextSection.classList.remove("hidden");
            nextSection.scrollIntoView({
                behavior: "smooth"
            });
            });
        }

        const backButton = section.querySelector("button[id^='prev']");
        if (backButton) {
            backButton.addEventListener("click", () => {
                goToPrevSection(section);
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
    const companiesContainer = document.querySelector(".company_details");

    addCompanyBtn.addEventListener("click", function () {
        if (yesRadio.checked) {
            const newCompanyFields = document.createElement("div");
            newCompanyFields.innerHTML = `
                <h3>New Company Details</h3>
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
document.addEventListener("DOMContentLoaded", function () {
    // Function to hide all education details
    function hideAllEducationDetails() {
        const educationDetails = document.querySelectorAll("#education_details > div");
        educationDetails.forEach((div) => {
            div.style.display = 'none';
        });
    }

    // Function to show the selected education detail
    function showEducationDetail(targetId) {
        hideAllEducationDetails();
        const selectedDetail = document.getElementById(targetId);
        if (selectedDetail) {
            selectedDetail.style.display = 'block';
        }
    }

    // Add event listeners to education navigation links
    const educationNavLinks = document.querySelectorAll("#education_levels a");
    educationNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            showEducationDetail(targetId);
        });
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
