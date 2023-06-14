document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".NAVBAR");

  // add a click event listener to the hamburger button
  hamburger.addEventListener("click", () => {
    console.log(
      "The hamburger button was clicked. The class 'hamburger-clicked' was toggled on the button and the display property of the .NAVBAR list was toggled."
    );
    // toggle the class 'hamburger-clicked' on the hamburger button
    hamburger.classList.toggle("hamburger-clicked");
    // toggle the display property of the .NAVBAR list
    navbar.style.display = navbar.style.display === "none" ? "flex" : "none";
  });

  // add a resize event listener to remove the hamburger-clicked class when the window is resized beyond the media query's maximum width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("hamburger-clicked");
      navbar.style.display = "flex";
    }
  });
});
