document.addEventListener('DOMContentLoaded', function () {
    // Profile image upload and preview
    var profileImageInput = document.getElementById('profile-image');
    var previewImage = document.getElementById('preview-image');
    profileImageInput.addEventListener('change', function (event) {
        var target = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            if (reader.result) {
                previewImage.src = reader.result;
            }
        };
        if (target.files && target.files.length > 0) {
            reader.readAsDataURL(target.files[0]);
        }
    });
    // Generate resume on form submission
    var resumeForm = document.getElementById('resumeform');
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Collect form data
        var resumeData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            designation: document.getElementById('designation').value,
            aboutme: document.getElementById('aboutme').value,
            education: document.getElementById('education').value,
            skills: document.getElementById('skills').value.split('\n'),
            experties: document.getElementById('Experties').value.split('\n'),
            experience: document.getElementById('experience').value,
            profileImage: previewImage.src,
            whatsapp: document.getElementById('whatsapp').value,
            linkedin: document.getElementById('linkedin').value,
            portfolio: document.getElementById('portfolio').value,
            email: document.getElementById('email').value,
            languages: {
                urdu: document.getElementById('language-urdu').value,
                english: document.getElementById('language-english').value
            },
            skillsRatios: {
                ComunicationSkills: document.getElementById('skill-comunicationSkills').value,
                ProblemSolving: document.getElementById('skill-problemSolving').value,
                TeamWork: document.getElementById('skill-teamWork').value,
                WorkManagement: document.getElementById('skill-workManagement').value
            }
        };
        // Convert skills and experties into HTML list items
        var skillsList = resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
        var expertiesList = resumeData.experties.map(function (exp) { return "<li>".concat(exp, "</li>"); }).join('');
        // Create language and skills ratio sections
        var languagesSection = "\n      <h3>Languages</h3>\n      <p>1. Urdu: <span class=\"language-ratio\">".concat(resumeData.languages.urdu, "</span></p>\n      <p>2. English: <span class=\"language-ratio\">").concat(resumeData.languages.english, "</span></p>");
        var skillsSection = "\n      <h3>Skills</h3>\n      <div class=\"skill\">\n          <span>Communication Skills</span>\n          <div class=\"skill-bar\">\n            <div class=\"skill-per communicationSkills tooltip\" style=\"width: ".concat(resumeData.skillsRatios.ComunicationSkills, ";\">\n              <span class=\"tooltip\">").concat(resumeData.skillsRatios.ComunicationSkills, "</span>\n            </div>\n          </div>\n      </div>\n      <div class=\"skill\">\n          <span>Problem Solving</span>\n          <div class=\"skill-bar\">\n            <div class=\"skill-per problemSolving tooltip\" style=\"width: ").concat(resumeData.skillsRatios.ProblemSolving, ";\">\n              <span class=\"tooltip\">").concat(resumeData.skillsRatios.ProblemSolving, "</span>\n            </div>\n          </div>\n      </div>\n      <div class=\"skill\">\n          <span>Team Work</span>\n          <div class=\"skill-bar\">\n            <div class=\"skill-per teamWork tooltip\" style=\"width: ").concat(resumeData.skillsRatios.TeamWork, ";\">\n              <span class=\"tooltip\">").concat(resumeData.skillsRatios.TeamWork, "</span>\n            </div>\n          </div>\n      </div>\n      <div class=\"skill\">\n          <span>Work Management</span>\n          <div class=\"skill-bar\">\n            <div class=\"skill-per workManagement tooltip\" style=\"width: ").concat(resumeData.skillsRatios.WorkManagement, ";\">\n              <span class=\"tooltip\">").concat(resumeData.skillsRatios.WorkManagement, "</span>\n            </div>\n          </div>\n      </div>");
        // Create the resume layout with left and right columns
        var resumeContent = "\n      <div class=\"resume-container\">\n          <div class=\"left-column\">\n              <img src=\"".concat(resumeData.profileImage, "\" alt=\"profile-image\" style=\"width: 140px; height: 150px; border-radius: 50%; border: 2px solid rgb(25, 118, 240); margin-bottom: 20px; align-item: center;\">\n              <h3>Education</h3>\n              <ul>").concat(resumeData.education, "</ul>\n              ").concat(languagesSection, "\n              <h3>Skills</h3>\n              <ul>").concat(skillsList, "</ul>\n              <h3>Experties</h3>\n              <ul>").concat(expertiesList, "</ul>\n          </div>\n          <div class=\"right-column\">\n              <h1>").concat(resumeData.firstName, " ").concat(resumeData.lastName, "</h1>\n              <h2>").concat(resumeData.designation, "</h2>\n      \n              <!-- Contact buttons -->\n              <div class=\"contact-buttons\">\n                  <a href=\"https://wa.me/").concat(resumeData.whatsapp, "\" class=\"contact-button whatsapp\" target=\"_blank\">\n                      <i class=\"fab fa-whatsapp\"></i><span>WhatsApp</span>\n                  </a>\n                  <a href=\"").concat(resumeData.linkedin, "\" class=\"contact-button linkedin\" target=\"_blank\">\n                      <i class=\"fab fa-linkedin\"></i><span>LinkedIn</span>\n                  </a>\n                  <a href=\"").concat(resumeData.portfolio, "\" class=\"contact-button portfolio\" target=\"_blank\">\n                      <i class=\"fa fa-globe\"></i><span>Portfolio</span>\n                  </a>\n                  <a href=\"mailto:").concat(resumeData.email, "\" class=\"contact-button email\">\n                      <i class=\"fa fa-envelope\"></i><span>Email</span>\n                  </a>\n                  <a href=\"https://github.com/yourGithubProfile\" class=\"contact-button github\" target=\"_blank\">\n                      <i class=\"fab fa-github\"></i></i><span>GitHub</span>\n                  </a>\n              </div>\n              <hr>\n              <h3>About Me</h3>\n              <p>").concat(resumeData.aboutme, "</p>\n              <hr>\n              <h3>Experience</h3>\n              <p>").concat(resumeData.experience, "</p>\n              <hr>\n              <!-- Skillset ratio at the end -->\n              ").concat(skillsSection, "\n          </div>\n      </div>");
        // Insert the generated resume into the output container
        var resumeOutput = document.getElementById('resumeOutput');
        resumeOutput.innerHTML = resumeContent;
    });
});
