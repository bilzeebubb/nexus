// Shared Search Index
const searchIndex = [
    {
        title: "Home - Nexus",
        description: "The Saint's Mouth Bleeds, PROJECT SUNSHINE, Edge of Nowhere, encounters, bilzeebub music, portfolio, code, contact",
        url: "index.html",
        keywords: ["home", "nexus", "music", "art", "code", "videos"]
    },
    {
        title: "Music - bilzeebub",
        description: "Music is the language of God, math is the syntax. Explore bilzeebub's music journey since 2020/21 with Black Santa.",
        url: "music.html",
        keywords: ["music", "bilzeebub", "black santa", "frequencies"]
    },
    {
        title: "Art - Portfolio",
        description: "Thank you for observing my work, now it is real. View digital art creations like Creation of Man, Shambho, and more.",
        url: "art.html",
        keywords: ["art", "portfolio", "digital art", "creation", "shambho"]
    },
    {
        title: "Code - Github",
        description: "Explore coding projects on Github. The Nexus is the realization of a vision from batch scripts to systems.",
        url: "code.html",
        keywords: ["code", "github", "programming", "nexus"]
    },
    {
        title: "Videos - Nexus",
        description: "Watch videos like neurological stimulation, p h o n k, urmybabe, and Rick N Morty - SwuM.",
        url: "videos.html",
        keywords: ["videos", "youtube", "music videos", "swum"]
    },
    {
        title: "Blog - Nexus",
        description: "Read thoughts, musings, and updates on music, art, and code from the Nexus.",
        url: "blog.html",
        keywords: ["blog", "posts", "music", "art", "code"]
    }
];

// Shared Functions
function initializeNavbar() {
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.href === window.location.href || link.href === window.location.href.split('#')[0]) {
            link.classList.add('active');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('.nav-link[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Toggle
    document.getElementById('menu-toggle').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
}

function initializeSearch() {
    const searchModal = document.getElementById('search-modal');
    if (!searchModal) return;

    const searchClose = searchModal.querySelector('.modal-close');

    // Search Modal Toggle
    document.getElementById('search-toggle').addEventListener('click', () => {
        searchModal.classList.toggle('hidden');
        document.getElementById('search-input').focus();
    });

    // Search Logic
    document.getElementById('search-form').addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        const resultsEl = document.getElementById('search-results');

        if (query.length < 2) {
            resultsEl.innerHTML = '<p class="text-gray-400">Enter at least 2 characters to search.</p>';
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.keywords.some(keyword => keyword.includes(query))
        );

        if (results.length === 0) {
            resultsEl.innerHTML = '<p class="text-gray-400">No results found.</p>';
            return;
        }

        resultsEl.innerHTML = results.map(item => `
            <div class="mb-4">
                <a href="${item.url}" class="text-indigo-400 hover:underline text-lg">${item.title}</a>
                <p class="text-gray-300">${item.description}</p>
            </div>
        `).join('');
    });

    // Close Search Modal
    searchClose.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        document.getElementById('search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.add('hidden');
            document.getElementById('search-input').value = '';
            document.getElementById('search-results').innerHTML = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
            searchModal.classList.add('hidden');
            document.getElementById('search-input').value = '';
            document.getElementById('search-results').innerHTML = '';
        }
    });
}

// Page-Specific Functions
function initializeIndex() {
    // Hero Slideshow
    let heroIndex = 0;
    const heroSlides = document.querySelectorAll('.hero-slide');
    function showHeroSlide() {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroIndex = (heroIndex + 1) % heroSlides.length;
        heroSlides[heroIndex].classList.add('active');
    }
    if (heroSlides.length > 0) {
        showHeroSlide();
        setInterval(showHeroSlide, 5000);
    }

    // Art Modal Functionality
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const modalImage = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        const imageClose = imageModal.querySelector('.modal-close');

        window.openModal = function(src, caption) {
            modalImage.src = src;
            modalImage.alt = caption;
            modalCaption.textContent = caption;
            imageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        imageClose.addEventListener('click', () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.style.display === 'flex') {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const messageEl = document.getElementById('form-message');

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    messageEl.textContent = 'Message sent successfully!';
                    messageEl.classList.remove('hidden', 'text-red-500');
                    messageEl.classList.add('text-green-500');
                    form.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                messageEl.textContent = 'Error sending message. Please try again.';
                messageEl.classList.remove('hidden', 'text-green-500');
                messageEl.classList.add('text-red-500');
            }
        });
    }
}

function initializeMusic() {
    // Album Data
    const albums = [
        {
            id: 1,
            title: "It Takes Time",
            artist: "bilzeebub",
            status: "Available on all platforms",
            embeds: {
                spotify: "https://open.spotify.com/embed/album/7s3oAOeQi5PZ2BfKm8Ub8p?utm_source=generator&theme=0",
                apple: "https://embed.music.apple.com/us/album/it-takes-time/1781948906",
                youtube: "https://www.youtube.com/embed/videoseries?si=BMavNrVg96CsMnFO&list=OLAK5uy_le8O5-dd76oBKlYmEw-Z4w9hcJiaMeJiE"
            },
        },
        {
            id: 2,
            title: "The Saint's Mouth Bleeds",
            artist: "bilzeebub",
            status: "Available on all platforms",
            embeds: {
                spotify: "https://open.spotify.com/embed/album/2CepuWwtImRMW3Pec2IgYz?utm_source=generator&theme=0",
                apple: "https://embed.music.apple.com/us/album/the-saints-mouth-bleeds-so-the-sinners-mouth-can/1758577742",
                youtube: "https://www.youtube.com/embed/FdtPRc_tUIk?si=WdmY_WCCRDOy3h-M"
            },
        },
        {
            id: 3,
            title: "Edge of Nowhere",
            artist: "bilzeebub",
            status: "Available on all platforms",
            embeds: {
                spotify: "https://open.spotify.com/embed/album/45zUHDMjnyd7YlPHaNCOqI?utm_source=generator&theme=0",
                apple: "https://embed.music.apple.com/us/album/the-edge-of-nowhere-single/1733413116",
                youtube: "https://www.youtube.com/embed/ev4e7JPcOKA?si=8XNvDtFllLiuN4_l"
            },
        },
        {
            id: 4,
            title: "encounters",
            artist: "bilzeebub",
            status: "Available on all platforms",
            embeds: {
                spotify: "https://open.spotify.com/embed/album/6tX8MxyAp9Kl051u7Aovs8?utm_source=generator&theme=0",
                apple: "https://embed.music.apple.com/us/album/encounters-single/1757970176",
                youtube: "https://www.youtube.com/embed/ZD2NbnmDSE0?si=Hz27gk_J8CLlZ9LG"
            },
        },
    ];

    // Show Album Embeds
    window.showAlbum = function(albumId) {
        const album = albums.find(a => a.id == albumId);
        const embedContainer = document.getElementById("embed-container");
        embedContainer.innerHTML = `
            <h4 class="text-xl font-semibold mb-4">${album.title} by ${album.artist}</h4>
            <img src="${album.albumArt}" alt="${album.title} Album Cover" class="w-full max-w-xs mb-4">
            <iframe src="${album.embeds.spotify}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media" class="mb-4"></iframe>
            <iframe src="${album.embeds.apple}" width="100%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media" class="mb-4"></iframe>
            <iframe src="${album.embeds.youtube}" width="100%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        `;
    };

    // Initialize with first album
    if (albums.length > 0 && document.getElementById('embed-container')) {
        window.showAlbum(albums[0].id);
    }

    // Keyboard Accessibility for Cards
    document.querySelectorAll('.album-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

function initializeArt() {
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const modalImage = document.getElementById('modal-image');
        const closeModal = imageModal.querySelector('.modal-close');

        window.openModal = function(src, alt) {
            modalImage.src = src;
            modalImage.alt = alt;
            imageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        closeModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.style.display === 'flex') {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initializeCode() {
    // Copy Code Function
    window.copyCode = function() {
        const code = `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))`;
        navigator.clipboard.writeText(code).then(() => {
            alert("Code copied to clipboard!");
        });
    };

    // Fetch GitHub Repositories
    async function fetchRepos() {
        try {
            const response = await fetch('https://api.github.com/users/bilzeebubb/repos');
            const data = await response.json();
            const reposContainer = document.getElementById('repos');
            data.slice(0, 3).forEach(repo => {
                reposContainer.innerHTML += `
                    <div class="bg-gray-800 p-4 hover:shadow-lg transition">
                        <h4 class="text-lg text-gray-300">${repo.name}</h4>
                        <p class="text-gray-400 text-sm">${repo.description || 'No description available'}</p>
                        <p class="text-gray-400 text-sm mt-2">
                            <i class="fa fa-star"></i> ${repo.stargazers_count} 
                            <i class="fa fa-code-fork"></i> ${repo.forks_count}
                        </p>
                        <a href="${repo.html_url}" target="_blank" class="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">View on GitHub</a>
                    </div>`;
            });
        } catch (error) {
            console.error('Error fetching repos:', error);
            document.getElementById('repos').innerHTML = '<p class="text-red-400">Failed to load repositories.</p>';
        }
    }

    // Canvas Animation
    const canvas = document.getElementById('phyllotaxis-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const goldenAngle = 137.5 * Math.PI / 180;
        let n = [0, 0, 0];
        let scale = 4;
        let mouseX = 0, mouseY = 0;
        const offsets = [-200, 0, 200];
        let animationFrameId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 64;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function draw(t) {
            scale = 4 + Math.sin(t / 1000) * 0.5;
            for (let i = 0; i < 3; i++) {
                const angle = n[i] * goldenAngle;
                const radius = scale * Math.sqrt(n[i]);
                const mouseOffsetX = (mouseX - canvas.width / 2) * 0.02;
                const mouseOffsetY = (mouseY - canvas.height / 2) * 0.02;
                const x = canvas.width / 2 + offsets[i] + radius * Math.cos(angle) + mouseOffsetX;
                const y = canvas.height / 2 + radius * Math.sin(angle) + mouseOffsetY;
                ctx.beginPath();
                ctx.arc(x, y, 3 + Math.sin(t / 500 + i) * 2, 0, 2 * Math.PI);
                const hue = (t / 50 + i * 120) % 360;
                ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
                ctx.fill();
                n[i]++;
            }
            if (n[0] <= 5000) {
                animationFrameId = requestAnimationFrame(drawFrame);
            }
        }

        function drawFrame(t) {
            draw(t);
        }

        // IntersectionObserver to pause animation when off-screen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationFrameId && n[0] <= 5000) {
                        animationFrameId = requestAnimationFrame(drawFrame);
                    }
                } else {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            });
        }, { threshold: 0.1 });

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        observer.observe(canvas);
    }

    fetchRepos();
}

function initializeVideos() {
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        const videoCards = document.querySelectorAll('.video-card');
        const modalIframe = videoModal.querySelector('iframe');
        const closeBtn = videoModal.querySelector('.modal-close');

        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.getAttribute('data-video-id');
                modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            videoModal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                modalIframe.src = '';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.style.display === 'flex') {
                videoModal.style.display = 'none';
                modalIframe.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initializeBlog() {
    // Fetch and Render Blog Posts
    fetch('posts.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load posts');
            return response.json();
        })
        .then(posts => {
            const blogContainer = document.getElementById('blog-posts');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-card p-6 bg-gray-800';
                postElement.innerHTML = `
                    <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
                    <p class="text-gray-400 mb-4">${post.date}</p>
                    <p class="text-gray-300 mb-4">${post.excerpt}</p>
                    <button onclick="openBlogModal(${post.id})" class="bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-500 transition">Read More</button>
                `;
                blogContainer.appendChild(postElement);
            });
            window.blogPosts = posts;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('blog-posts').innerHTML = '<p class="text-gray-400">Error loading posts. Please try again later.</p>';
        });

    // Blog Modal Functionality
    const blogModal = document.getElementById('blog-modal');
    if (blogModal) {
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        const modalContent = document.getElementById('modal-content');
        const blogClose = blogModal.querySelector('.modal-close');

        window.openBlogModal = function(postId) {
            const post = window.blogPosts.find(p => p.id === postId);
            modalTitle.textContent = post.title;
            modalDate.textContent = post.date;
            modalContent.textContent = post.content;
            blogModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        blogClose.addEventListener('click', () => {
            blogModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                blogModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && blogModal.style.display === 'flex') {
                blogModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.querySelectorAll('.blog-card button').forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
}

// Initialize Common Features
initializeNavbar();
initializeSearch();

// Initialize Page-Specific Features
const page = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
switch (page) {
    case 'index.html':
        initializeIndex();
        break;
    case 'music.html':
        initializeMusic();
        break;
    case 'art.html':
        initializeArt();
        break;
    case 'code.html':
        initializeCode();
        break;
    case 'videos.html':
        initializeVideos();
        break;
    case 'blog.html':
        initializeBlog();
        break;
}

function openModal(src, caption) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  modal.style.display = 'block';
  modalImg.src = src;
  modalCaption.textContent = caption;
  modalCaption.classList.add('glitch');
  modalCaption.setAttribute('data-text', caption);
}