// contactus.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Contact form loaded");

  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("status");

  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusDiv.textContent = "Submitting...";
    statusDiv.className = "status";

    const urlParams = new URLSearchParams(window.location.search);

    const referrer = urlParams.get("referrer") || "";
    const project = urlParams.get("project") || "";
    const repo = urlParams.get("repo") || "";

    const formData = new FormData();
    formData.append("gdocument", referrer);
    formData.append("project", project);
    formData.append("git_repo", repo);
    formData.append("name", document.getElementById("name").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("message", document.getElementById("message").value);

    try {
      const response = await fetch(
        "https://webhook.site/9ebcbfbe-f87d-4292-952a-0da97c7b47c7",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      statusDiv.textContent = "Form submitted successfully!";
      statusDiv.classList.add("success");
      form.reset();

    } catch (error) {
      console.error("Submission failed:", error);
      statusDiv.textContent = "Submission failed. Check console.";
      statusDiv.classList.add("error");
    }
  });
});