document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elements = document.querySelectorAll('.hiw__column, .hiw-heading, .hiw__sub, .button__wrapper');
    elements.forEach(element => {
        observer.observe(element);
    });

    // Project transition
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projects = document.querySelectorAll('.project');
    let resizeTimer;

    function updateScrollAnimation() {
        const projectWidth = projects[0].offsetWidth + 20;
        const totalWidth = projectWidth * projects.length;
        const maxScroll = totalWidth - window.innerWidth;

        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const maxVerticalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const horizontalScroll = (scrollTop / maxVerticalScroll) * maxScroll * 2;
            projectsWrapper.style.transform = `translateX(-${horizontalScroll}px)`;
        }

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    }

    function updateProjectWidths() {
        const screenWidth = window.innerWidth;
        projects.forEach(project => {
            if (screenWidth >= 991 && screenWidth <= 1800) {
                project.classList.add('medium-screen');
            } else if (screenWidth <= 990 || screenWidth <= 479) {
                project.classList.add('small-screen');
            } else {
                project.classList.remove('medium-screen', 'small-screen');
            }
        });
    }

    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateProjectWidths();
            updateScrollAnimation();
        }, 250);
    }

    window.addEventListener('resize', onResize);

    // Initial setup
    updateProjectWidths();
    updateScrollAnimation();

    // Review slide
    let currentSlide = 0;
    const slides = document.querySelectorAll('.review-card');
    const totalSlides = slides.length;

    function updateSlidePosition() {
        const reviewsContainer = document.getElementById('reviews-container');
        const cardWidth = slides[0].offsetWidth;
        const newTransform = -currentSlide * cardWidth;
        reviewsContainer.style.transform = `translateX(${newTransform}px)`;
    }

    function prevSlide() {
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
        updateSlidePosition();
    }

    function nextSlide() {
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
        updateSlidePosition();
    }

    setInterval(nextSlide, 5000);

    window.addEventListener('resize', updateSlidePosition);
    document.addEventListener('DOMContentLoaded', updateSlidePosition);
    document.querySelector('.left-arrow').addEventListener('click', prevSlide);
    document.querySelector('.right-arrow').addEventListener('click', nextSlide);

    // Tabs switch in pricing (pro/standard)
    const tabs = document.querySelectorAll(".tabs-menu .tab");
    const tabContents = document.querySelectorAll(".tabs-content .tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
            tabs.forEach(tab => tab.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(tabId + "-content").classList.add("active");
        });
    });

    // Navbar current section highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".floating-nav__link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });
});
