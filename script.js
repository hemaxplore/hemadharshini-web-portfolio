console.log("Modern Portfolio Loaded");

function showToast(){

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);

}

