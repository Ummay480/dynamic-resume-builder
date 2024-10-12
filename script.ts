document.addEventListener('DOMContentLoaded', () => {
  // Profile image upload and preview
  const profileImageInput = document.getElementById('profile-image') as HTMLInputElement;
  const previewImage = document.getElementById('preview-image') as HTMLImageElement;

  profileImageInput.addEventListener('change', function(event: Event) {
      const target = event.target as HTMLInputElement;
      const reader = new FileReader();
      
      reader.onload = function() {
          if (reader.result) {
              previewImage.src = reader.result as string;
          }
      };
      
      if (target.files && target.files.length > 0) {
          reader.readAsDataURL(target.files[0]);
      }
  });

  // Generate resume on form submission
  const resumeForm = document.getElementById('resumeform') as HTMLFormElement;
  resumeForm.addEventListener('submit', function(event: Event) {
      event.preventDefault();

      // Collect form data
      const resumeData = {
          firstName: (document.getElementById('firstName') as HTMLInputElement).value,
          lastName: (document.getElementById('lastName') as HTMLInputElement).value,
          designation: (document.getElementById('designation') as HTMLInputElement).value,
          aboutme: (document.getElementById('aboutme') as HTMLTextAreaElement).value,
          education: (document.getElementById('education') as HTMLTextAreaElement).value,
          skills: (document.getElementById('skills') as HTMLTextAreaElement).value.split('\n'),
          experties: (document.getElementById('Experties') as HTMLTextAreaElement).value.split('\n'),
          experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
          profileImage: previewImage.src,
          whatsapp: (document.getElementById('whatsapp') as HTMLInputElement).value,
          linkedin: (document.getElementById('linkedin') as HTMLInputElement).value,
          portfolio: (document.getElementById('portfolio') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          languages: {
              urdu: (document.getElementById('language-urdu') as HTMLInputElement).value,
              english: (document.getElementById('language-english') as HTMLInputElement).value
          },
          skillsRatios: {
              ComunicationSkills: (document.getElementById('skill-comunicationSkills') as HTMLInputElement).value,
              ProblemSolving: (document.getElementById('skill-problemSolving') as HTMLInputElement).value,
              TeamWork: (document.getElementById('skill-teamWork') as HTMLInputElement).value,
              WorkManagement: (document.getElementById('skill-workManagement') as HTMLInputElement).value
          }
      };

      // Convert skills and experties into HTML list items
      const skillsList = resumeData.skills.map(skill => `<li>${skill}</li>`).join('');
      const expertiesList = resumeData.experties.map(exp => `<li>${exp}</li>`).join('');
      const educationList = resumeData.experties.map(exp => `<li>${exp}</li>`).join('');

      // Create language and skills ratio sections
      const languagesSection = `
      <h3>Languages</h3>
      <p>1. Urdu: <span class="language-ratio">${resumeData.languages.urdu}</span></p>
      <p>2. English: <span class="language-ratio">${resumeData.languages.english}</span></p>`;

      const skillsSection = `
      <h3>Skills</h3>
      <div class="skill">
          <span>Communication Skills</span>
          <div class="skill-bar">
            <div class="skill-per communicationSkills tooltip" style="width: ${resumeData.skillsRatios.ComunicationSkills};">
              <span class="tooltip">${resumeData.skillsRatios.ComunicationSkills}</span>
            </div>
          </div>
      </div>
      <div class="skill">
          <span>Problem Solving</span>
          <div class="skill-bar">
            <div class="skill-per problemSolving tooltip" style="width: ${resumeData.skillsRatios.ProblemSolving};">
              <span class="tooltip">${resumeData.skillsRatios.ProblemSolving}</span>
            </div>
          </div>
      </div>
      <div class="skill">
          <span>Team Work</span>
          <div class="skill-bar">
            <div class="skill-per teamWork tooltip" style="width: ${resumeData.skillsRatios.TeamWork};">
              <span class="tooltip">${resumeData.skillsRatios.TeamWork}</span>
            </div>
          </div>
      </div>
      <div class="skill">
          <span>Work Management</span>
          <div class="skill-bar">
            <div class="skill-per workManagement tooltip" style="width: ${resumeData.skillsRatios.WorkManagement};">
              <span class="tooltip">${resumeData.skillsRatios.WorkManagement}</span>
            </div>
          </div>
      </div>`;

      // Create the resume layout with left and right columns
      const resumeContent = `
      <div class="resume-container">
          <div class="left-column">
              <img src="${resumeData.profileImage}" alt="profile-image" style="width: 140px; height: 150px; border-radius: 50%; border: 2px solid rgb(25, 118, 240); margin-bottom: 20px; align-item: center;">
              <h3>Education</h3>
              <ul>${educationList}</ul>
              ${languagesSection}
              <h3>Skills</h3>
              <ul>${skillsList}</ul>
              <h3>Experties</h3>
              <ul>${expertiesList}</ul>
          </div>
          <div class="right-column">
              <h1>${resumeData.firstName} ${resumeData.lastName}</h1>
              <h2>${resumeData.designation}</h2>
      
              <!-- Contact buttons -->
              <div class="contact-buttons">
                  <a href="https://wa.me/${resumeData.whatsapp}" class="contact-button whatsapp" target="_blank">
                      <i class="fab fa-whatsapp"></i><span>WhatsApp</span>
                  </a>
                  <a href="${resumeData.linkedin}" class="contact-button linkedin" target="_blank">
                      <i class="fab fa-linkedin"></i><span>LinkedIn</span>
                  </a>
                  <a href="${resumeData.portfolio}" class="contact-button portfolio" target="_blank">
                      <i class="fa fa-globe"></i><span>Portfolio</span>
                  </a>
                  <a href="mailto:${resumeData.email}" class="contact-button email">
                      <i class="fa fa-envelope"></i><span>Email</span>
                  </a>
                  <a href="https://github.com/yourGithubProfile" class="contact-button github" target="_blank">
                      <i class="fab fa-github"></i></i><span>GitHub</span>
                  </a>
              </div>
              <hr>
              <h3>About Me</h3>
              <p>${resumeData.aboutme}</p>
              <hr>
              <h3>Experience</h3>
              <p>${resumeData.experience}</p>
              <hr>
              <!-- Skillset ratio at the end -->
              ${skillsSection}
          </div>
          <hr>
      </div>`;

      // Insert the generated resume into the output container
      const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
      resumeOutput.innerHTML = resumeContent;
  });
});
