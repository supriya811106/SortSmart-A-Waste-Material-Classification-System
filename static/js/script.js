document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Image slider logic
    const slides = document.querySelectorAll('.img-slide');
    const contents = document.querySelectorAll('.content');
    const navButtons = document.querySelectorAll('.nav-btn');
    let currentSlide = 0;
    let sliderInterval;

    function updateSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
        contents.forEach((content, i) => content.classList.toggle("active", i === index));
        navButtons.forEach((btn, i) => btn.classList.toggle("active", i === index));
    }

    function startSlider() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        }, 5000);
    }

    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
            startSlider();
        });
    });

    startSlider();

    function toggleNavbar() {
        const navbarLinks = document.querySelector('.navbar-links');
        navbarLinks.classList.toggle('active');
    }    

    // Image upload preview
    document.getElementById("imageUpload").addEventListener("change", function (event) {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onload = function (e) {
                document.getElementById("image-preview").src = e.target.result; // Set image source
                document.getElementById("image-preview-container").style.display = "block"; // Show preview
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    });

    // Image upload and prediction
    document.getElementById("upload-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        let imageFile = document.getElementById("imageUpload").files[0];
        if (!imageFile) {
            alert("Please select an image first.");
            return;
        }

        let formData = new FormData();
        formData.append("file", imageFile);

        try {
            let response = await fetch("/predict", { method: "POST", body: formData });

            if (!response.ok) throw new Error(`Server responded with ${response.status}`);

            let resultPage = await response.text();
            document.open();
            document.write(resultPage);
            document.close();
        } catch (error) {
            alert("Prediction failed. Please try again.");
        }
    });
});

document.getElementById("feedbackSelect").addEventListener("change", function() {
    var comments = document.getElementById("comments");
    var submitBtn = document.getElementById("submitBtn");
    var label = document.querySelector('label[for="comments"]');
    if (this.value !== "Please choose an option") {
        comments.style.display = "block";
        submitBtn.style.display = "block";
        label.style.display = "block";
    } else {
        comments.style.display = "none";
        submitBtn.style.display = "none";
        label.style.display = "none";
    }
});

document.getElementById("submitBtn").addEventListener("click", function() {
    var feedbackSelect = document.getElementById("feedbackSelect");
    if (feedbackSelect.value !== "Please choose an option") {
        document.querySelector(".success-message").textContent = "Thank you for sharing your thoughts!";
        }
});