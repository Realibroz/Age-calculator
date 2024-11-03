// app.js

// Fake profile generator
function generateFakeProfile() {
  return {
    name: "John Doe",
    email: "johndoe@example.com",
    photoURL: "https://via.placeholder.com/80"
  };
}

// Function to load or create a fake profile
function loadProfile() {
  let profile = localStorage.getItem("userProfile");
  if (profile) {
    return JSON.parse(profile);
  } else {
    profile = generateFakeProfile();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    return profile;
  }
}

// Function to save the profile to localStorage
function saveProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

// Function to show the dashboard with user profile
function showDashboard(profile) {
  document.querySelector(".login-card").style.display = "none";
  document.querySelector(".dashboard-card").style.display = "block";

  // Set user profile information
  document.getElementById("profile-name").innerText = `Name: ${profile.name}`;
  document.getElementById("profile-email").innerText = `Email: ${profile.email}`;
  document.getElementById("profile-pic").src = profile.photoURL;
}

// Load or create profile on login or create account click
document.getElementById("login-button").addEventListener("click", () => {
  const profile = loadProfile();
  showDashboard(profile);
});

document.getElementById("create-account").addEventListener("click", () => {
  const profile = loadProfile();
  showDashboard(profile);
});

// Open the edit profile modal
document.getElementById("edit-profile").addEventListener("click", () => {
  const profile = loadProfile();
  document.getElementById("edit-name").value = profile.name;
  document.getElementById("edit-email").value = profile.email;
  document.getElementById("edit-modal").style.display = "flex";
});

// Save the updated profile
document.getElementById("save-profile").addEventListener("click", () => {
  const profile = loadProfile();
  profile.name = document.getElementById("edit-name").value;
  profile.email = document.getElementById("edit-email").value;

  const fileInput = document.getElementById("edit-pic");
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profile.photoURL = e.target.result;
      saveProfile(profile);
      showDashboard(profile);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    saveProfile(profile);
    showDashboard(profile);
  }

  document.getElementById("edit-modal").style.display = "none";
});

// Close the edit profile modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("edit-modal").style.display = "none";
});

// Age calculation function
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Event listener for "Generate" button to calculate and show age
document.getElementById("generate").addEventListener("click", () => {
  const dob = document.getElementById("dob").value;
  if (dob) {
    const age = calculateAge(dob);
    document.getElementById("age-result").innerText = `Your Age: ${age}`;
  } else {
    document.getElementById("age-result").innerText = "Please enter a valid birth date.";
  }
});

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
  document.querySelector(".login-card").style.display = "block";
  document.querySelector(".dashboard-card").style.display = "none";
});
