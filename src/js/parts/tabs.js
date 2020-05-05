function tabs() {
    let tab = document.querySelectorAll(".info-header-tab"), // connect to HTML elements with DOM
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        //creating of func which hide all emelemnts in <div info-tabcontent></div>
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }
    hideTabContent(1); //this function is hiding every element in .info-tabcontent , so we put (1) as argument to save first element

    function showTabContent(b) {
        //
        if (tabContent[b].classList.contains("hide")) {
            //this function created to show elements
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function(event) {
        let target = event.target; // creating of event
        if (target && target.classList.contains("info-header-tab")) {
            // condition checking
            for (let i = 0; i < tab.length; i++) {
                // this cycle connects tab which is clicked with element which is showed after click
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}

module.exports = tabs;