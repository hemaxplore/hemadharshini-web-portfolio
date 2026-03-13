console.log("Modern Portfolio Loaded");

function showToast(){

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);

}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".message-form");

    form.addEventListener("submit", function () {

        setTimeout(() => {
            form.reset();
        }, 100);

    });

});

