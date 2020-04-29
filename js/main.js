window.addEventListener("DOMContentLoaded", function() {
    // script's work start after loading DOM elements correctly

    "use strict";

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

    //                                                             Timer

    let deadline = "2020-04-30";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector(".days"),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return "0" + num;
                } else return num;
            }

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }
    }

    setClock("timer", deadline);

    // Modal

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

    // Form

    let message = {
        loading: "loading...",
        success: `Thanks. We'll contact you soon`,
        failure: "Something gone wrong.",
    };

    let form = document.querySelector(".main-form"),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div"),
        contactForm = document.querySelector("#formContact");

    statusMessage.classList.add("status");

    form.addEventListener("submit", sendForm);
    contactForm.addEventListener("submit", sendForm);

    function sendForm(event) {
        event.preventDefault();
        event.target.appendChild(statusMessage);

        let formData = new FormData(event.target);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        form;

        function postData(data) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open("POST", "server.php");
                request.setRequestHeader(
                    "Content-type",
                    "application/json; charset=utf-8"
                );

                request.send(json);

                request.addEventListener("readystatechange", function() {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }

        let input = event.target.getElementsByTagName("input");
        for (let i = 0; i < input.length; i++) {
            input[i].value = "!@#!$%^&*";
        }

        postData(json)
            .then(() => (statusMessage.innerHTML = message.loading))

            .then(() => (statusMessage.innerHTML = message.success))
            .catch(() => (statusMessage.innerHTML = message.failure));
    }
    //1231231

});