
const readMoreBtn = document.getElementById("readMoreBtn");
const moreContent = document.getElementById("moreContent");

// hide content initially
moreContent.style.display = "none";

readMoreBtn.addEventListener("click", () => {
  if (moreContent.style.display === "none") {
    moreContent.style.display = "inline";
    readMoreBtn.textContent = "Read Less";
  } else {
    moreContent.style.display = "none";
    readMoreBtn.textContent = "Read More";
  }
});




const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    nav.appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });


const typedText = document.getElementById("typed-text");
const words = ["Data Analyst", "Power BI Expert", "Web Page Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const currentChars = currentWord.substring(0, charIndex);
  typedText.textContent = currentChars;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 150);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 1000);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.getElementById("contact-f").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const status = document.getElementById("status");

  fetch("https://script.google.com/macros/s/AKfycbxztFm99OjSkOXBoa29eg1xQcX67TLU_QeY6Oly7zrj2yqbtbe_PGL_bOWUtG92S1fKNQ/exec", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === "success") {
      status.innerText = "Message sent successfully!";
      form.reset();
    } else {
      throw new Error("Submission failed. Server returned error.");
    }
  })
  .catch(error => {
    status.innerText ="Error submitting form.";
    console.error(error);
  });
});

function formatTimestamp(ts) {
  if (!ts) return '—';
  const date = new Date(ts);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

//blog
const scriptURL = "https://script.google.com/macros/s/AKfycbzTPE8Yp0V7BvlakuBaxsLflj3KyQgWf3YgmJ3aszvuEGEv6qio4rtIs7p3ZW8pp43x2Q/exec"; // Replace with your deployed script URL

fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("blogContainer");
        container.innerHTML = data.map(blog => `
            <dive class="blog-item">
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                <small>${formatTimestamp(blog.timestamp)}</small>
                </dive>
        `).join('');
    })
    .catch(err => console.error("Error loading blogs:", err));

//work

const workScriptURL = "https://script.google.com/macros/s/AKfycbxGdH_qnLv3iBUMyvzbVCU9LTmqp0_pPOCmTuFtCpgdqOQ-Am9siZxtzQ8ZF43h-u6I/exec"; // Your deployed script for projects

fetch(workScriptURL)
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector(".work-scroll");
        container.innerHTML = data.map((project, index) => `
            <div class="work-card">
                <h3>${project.title}</h3>
                <p>${project.content}</p>
                ${project.url ? `<a href="${project.url}" target="_blank" class="work-link" style=" font-weight: bold;">View Project</a>` : ""}
            </div>
        `).join('');
    })
    .catch(err => console.error("Error loading work:", err));

// Helper function to format timestamp nicely
function formatTimestamp(ts) {
    const date = new Date(ts);
    if (isNaN(date.getTime())) return ts; // if it's already a readable string
    return date.toLocaleString();
}
