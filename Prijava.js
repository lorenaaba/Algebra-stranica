document.addEventListener("DOMContentLoaded", function() {
    const prijavaForma = document.querySelector(".Prijava-form");
    const registracijaForma = document.querySelector(".Registracija-form");
    const registracijaLink = document.getElementById("registracija-link");
    const nastavniPlanContainer = document.getElementById('nastavni-plan-container');
    const loginLogoutLink = document.getElementById("login-logout");

    const token = localStorage.getItem('jwtToken');
    //console.log(token);
    if (token) {
        nastavniPlanContainer.style.display = 'inline';  
    }

    registracijaLink.addEventListener("click", function(event) {
        event.preventDefault();
        prijavaForma.style.display = "none";
        registracijaForma.style.display = "block";
    });

    loginLogoutLink.addEventListener("click", async function(event) {
        event.preventDefault();
        if (loginLogoutLink.textContent === "Prijava") {
            prijavaForma.style.display = "block";
        } else {
            localStorage.removeItem('jwtToken');
            loginLogoutLink.textContent = "Prijava";
            nastavniPlanContainer.style.display = 'none';  
            alert('Odjavili ste se');
        }
    });

    prijavaForma.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("txtLogIn").value;
        const password = document.getElementById("txtPassword").value;

        try {
            const response = await fetch('https://www.fulek.com/data/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;

                localStorage.setItem('jwtToken', token);
                loginLogoutLink.textContent = 'Odjava';

                nastavniPlanContainer.style.display = 'inline';

                //localStorage.setItem('jwtToken', data.token);
                //localStorage.setItem('isLoggedIn', 'true');
                    
                alert('Uspješna prijava');
                window.location.href = "Algebra.html"; 


            } else {
                alert('Neispravni korisničko ime ili lozinka');
            }
        } catch (error) {
            console.error('Pogreška prilikom prijave:', error.message);
            alert('Pogreška prilikom prijave. Pokušajte ponovo kasnije.');
        }
    });

    registracijaForma.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("txtRegistration").value;
        const password = document.getElementById("txtRegistrationPassword").value;

        try {
            const response = await fetch('https://www.fulek.com/data/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                alert('Uspješna registracija');

                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                registracijaForma.style.display = "none";
                prijavaForma.style.display = "block";
            } else {
                alert('Registracija nije uspjela');
            }
        } catch (error) {
            console.error('Pogreška prilikom registracije:', error.message);
            alert('Pogreška prilikom registracije. Pokušajte ponovo kasnije.');
        }
    });

});
