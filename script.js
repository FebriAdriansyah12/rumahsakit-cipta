// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const heroText = document.getElementById("hero-text")
const contactHeader = document.getElementById("contact-header")
const contactGrid = document.getElementById("contact-grid")
const contactCta = document.getElementById("contact-cta")

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Hero text animation on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    heroText.classList.add("visible")
  }, 300)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "contact-header") {
        // Animate contact header
        const title = entry.target.querySelector(".contact-title")
        const description = entry.target.querySelector(".contact-description")

        setTimeout(() => {
          title.style.opacity = "1"
          title.style.transform = "translateY(0)"
        }, 0)

        setTimeout(() => {
          description.style.opacity = "1"
          description.style.transform = "translateY(0)"
        }, 200)

        // Animate contact cards
        const cards = contactGrid.querySelectorAll(".contact-card")
        cards.forEach((card, index) => {
          setTimeout(
            () => {
              card.classList.add("visible")
            },
            400 + index * 200,
          )
        })

        // Animate CTA button
        setTimeout(() => {
          contactCta.classList.add("visible")
        }, 1000)
      }
    }
  })
}, observerOptions)

// Observe contact section
if (contactHeader) {
  observer.observe(contactHeader)
}

// Initialize contact section styles
document.addEventListener("DOMContentLoaded", () => {
  const contactTitle = document.querySelector(".contact-title")
  const contactDescription = document.querySelector(".contact-description")

  if (contactTitle) {
    contactTitle.style.opacity = "0"
    contactTitle.style.transform = "translateY(2rem)"
    contactTitle.style.transition = "all 1s ease"
  }

  if (contactDescription) {
    contactDescription.style.opacity = "0"
    contactDescription.style.transform = "translateY(2rem)"
    contactDescription.style.transition = "all 1s ease 0.2s"
  }
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Add hover effects to cards
document.querySelectorAll(".about-card, .service-card, .doctor-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-0.5rem) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Button click effects
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255, 255, 255, 0.3)"
    ripple.style.transform = "scale(0)"
    ripple.style.animation = "ripple 0.6s linear"
    ripple.style.pointerEvents = "none"

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Add scroll-triggered animations for other sections
const animateOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

// Apply scroll animations to sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section:not(#home):not(#contact)")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(2rem)"
    section.style.transition = "all 0.8s ease"
    animateOnScroll.observe(section)
  })
})
