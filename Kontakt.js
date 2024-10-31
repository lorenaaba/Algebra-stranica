const modal = document.getElementById('contact-modal');
const contactLink = document.getElementById('contact-link');
const closeBtn = document.getElementById('close-btn');

contactLink.addEventListener('click', function(event) {
    event.preventDefault(); 
    modal.style.display = 'flex'; 
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none'; 
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
