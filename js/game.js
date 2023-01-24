window.addEventListener("load", () => {
  let name = new URL(document.location.href).searchParams.get("username");
  let welcomeMsg = document.querySelector(".message h2");
  welcomeMsg.textContent = `Welcome ${name}`;
  let welcomeInfo = document.querySelector(".welcome");
  welcomeInfo.textContent = name;
  document.querySelectorAll(".btn-play").forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.classList.add("hide");
      play();
    });
  });
});
