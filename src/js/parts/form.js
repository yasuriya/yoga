function form() {
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

        let input = event.target.querySelectorAll("input");

        input.forEach((item) => {
            item.value = " ";
        });

        // for (let i = 0; i < input.length; i++) {
        //     input[i].value = " ";
        // }

        postData(json)
            .then(() => (statusMessage.innerHTML = message.loading))

            .then(() => (statusMessage.innerHTML = message.success))
            .catch(() => (statusMessage.innerHTML = message.failure));
    }
}

module.exports = form;