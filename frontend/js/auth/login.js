let email = document.querySelector("#emailLogin");
let password = document.querySelector("#passwordLogin");
const form = document.querySelector("#formLogin");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    });

    let data = await response.json();
    if (data.error) {
        console.log(data.error);
    } else {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    }
});
