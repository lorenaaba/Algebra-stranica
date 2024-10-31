document.addEventListener('DOMContentLoaded', () => {
    // Provjera prijave korisnika iz localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';   

    // Dohvati nastavni plan container
    const nastavniPlanContainer = document.getElementById('nastavni-plan-container');

    // Ako je korisnik prijavljen, prikaži nastavni plan container
    if (isLoggedIn && nastavniPlanContainer) {
        nastavniPlanContainer.style.display = 'block';
    } else if (nastavniPlanContainer) {
        nastavniPlanContainer.style.display = 'none';
    }
});