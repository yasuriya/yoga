function modal() {
    let modalWindow = document.querySelectorAll(".modal"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");

    modalWindow.forEach((item) => {
        item.addEventListener("click", function(event) {
            overlay.style.display = "block";
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    });

    close.addEventListener("click", function() {
        overlay.style.display = "none";
        modalWindow[0].classList.remove("more-splash");
        document.body.style.overflow = "";
    });
}

module.exports = modal;