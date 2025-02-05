if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", (event) => {
    console.log("JavaScript geladen");
    var modal = document.getElementById("loginModal");
    var btn = document.getElementById("loginBtn");
    var span = document.getElementsByClassName("close")[0];

    // Öffne das Modal beim Klicken auf den Button
    btn.onclick = function () {
      modal.style.display = "block";
    };

    // Schließe das Modal beim Klicken auf den Schließen-Button
    span.onclick = function () {
      modal.style.display = "none";
    };

    // Schließe das Modal, wenn der Benutzer außerhalb des Modals klickt
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
}
