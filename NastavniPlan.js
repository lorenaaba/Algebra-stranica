document.addEventListener("DOMContentLoaded", function() {
    const nastavniPlanContainer = document.getElementById("nastavni-plan-container");
    //const nastavniPlanMain = document.getElementById("main-container");

    nastavniPlanContainer.addEventListener("click", function(event) {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        if (token) {
            //nastavniPlanMain.style.display = 'block';  // Prikaži container
            fetchCourses(token);  
        } else {
            alert("Niste prijavljeni!");
        }
    });
});

async function fetchCourses(token) {
    const response = await fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const courses = await response.json();
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';

    courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course.name;
        li.addEventListener('click', () => fetchCourseDetails(course.id, token));
        coursesList.appendChild(li);
    });
}

async function fetchCourseDetails(courseId, token) {
    const response = await fetch(`https://www.fulek.com/data/api/supit/get-curriculum/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const course = await response.json();
    const detailsDiv = document.getElementById('course-details');
    detailsDiv.innerHTML = `<h3>${course.name}</h3><p>${course.description}</p>`;
}
