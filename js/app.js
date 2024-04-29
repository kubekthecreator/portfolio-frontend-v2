const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const modal_overlay = document.querySelector(".modal-overlay");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const images = document.querySelectorAll(".images img");
const next_btn = document.querySelector(".next-btn");
const prev_btn = document.querySelector(".prev-btn");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

window.addEventListener("scroll", () => {
  activeLink();
  if(!skillsShowed)skillsCounter();
  if(!mlPLayed)mlCounter();
});

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;
  if(currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num,maxNum);
    }, 12);
  }
}

/* STICKY STYLING */
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
  // header.classList.toggle("scrolled", window.scrollY > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);


/* REVEAL ANIMATION */

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {origin: "top", delay: 700});

/* SKILLS PROGRESS BAR ANIMATION */

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  if(window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

let skillsShowed = false; 

function skillsCounter() {
  if(!hasReached(first_skill)) return;

  skillsShowed = true;
  sk_counters.forEach((couter,i) => {
    let target = +couter.dataset.target;
    let strokeValue = 427 - 427 * (target/100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(couter, target);
    }, 400)
  })

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

/* SERVICES COUNTER ANIMATION */

let mlPLayed = false;

function mlCounter() {
  if(!hasReached(ml_section)) return;
  
  mlPLayed = true;

  ml_counters.forEach((ctr => {
    let target = +ctr.dataset.target;

    setTimeout(() => {
      updateCount(ctr, target);
    }, 400)
  }))
}

/* PORTOFLIO FILTER */

let mixer = mixitup('.portfolio-gallery', {
  selectors: {
      target: '.prt-card'
  },
  animation: {
      duration: 500
  }
});

/* MODAL POPUP ANIMATION */

let currentIndex = 0;

zoom_icons.forEach((icn,i) => 
icn.addEventListener("click", () => {
  prt_section.classList.add("open")
  document.body.classList.add("stopScrolling");
  currentIndex = i;
  changeImage(currentIndex);
}));

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open")
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 5;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
})

next_btn.addEventListener("click", () => {
  if (currentIndex === 5) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
})

function changeImage(index) {
  images.forEach(img => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}
/* TESTIMONIALS SWIPER ANIMATION */

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 500,
  autoplay: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/* CHANGE ACTIVE LINK ON SCROLL */

function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections)
  .map((sct, i) => {
    return {
      y: sct.getBoundingClientRect().top - header.offsetHeight,
      id: i,
    };
  })
  .filter((sct) => sct.y <= 0);

  let currSectionID = passedSections.at(-1).id;

  links.forEach((l) => l.classList.remove("active"));
  links[currSectionID].classList.add("active");
}

activeLink();

/* DARK MODE */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1)
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0)
  }
}

toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
})

/* OPEN AND CLOSE NAVBAR MENU */

hamburger.addEventListener("click", ()=> {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
})

links.forEach((link) => 
link.addEventListener("click", () => {
  document.body.classList.remove("open");
  document.body.classList.remove("stopScrolling");
}))

// // Function to generate random math operation
// function generateMathOperation() {
//   const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
//   const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
//   const operators = ['+', '-', '*']; // Array of arithmetic operators
//   const operator = operators[Math.floor(Math.random() * operators.length)]; // Randomly select an operator
//   let result;
//   switch (operator) {
//       case '+':
//           result = num1 + num2;
//           break;
//       case '-':
//           result = num1 - num2;
//           break;
//       case '*':
//           result = num1 * num2;
//           break;
//   }
//   return { num1, num2, operator, result };
// }

// // Function to update captcha with random math operation
// function updateCaptcha() {
//   const mathOperation = generateMathOperation();
//   const captchaText = `${mathOperation.num1} ${mathOperation.operator} ${mathOperation.num2}`;
//   document.getElementById('captcha').setAttribute('data-result', mathOperation.result);
//   document.getElementById('captcha-question').textContent = captchaText;
// }

// // Function to send email
// function sendEmail() {
//   const senderEmail = document.getElementById('sender-email').value;
//   const emailSubject = document.getElementById('email-subject').value;
//   const emailBody = document.getElementById('email-body').value;
//   const captchaInput = parseInt(document.getElementById('captcha').value);
//   const captchaResult = parseInt(document.getElementById('captcha').getAttribute('data-result'));

//   // Captcha verification
//   if (captchaInput === captchaResult) {
//       const mailtoLink = `mailto:eryk.kubiak.firma@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(senderEmail)}`;
//       window.location.href = mailtoLink;
//   } else {
//       alert('Captcha incorrect. Please try again.');
//       updateCaptcha(); // Generate new captcha
//   }
// }

// // Function to toggle contact form
// function toggleContactForm() {
//   const contactFormContainer = document.querySelector('.contact-form-container');
//   const contactSection = document.getElementById('contact');

//   if (contactFormContainer.style.display === 'none' || contactFormContainer.style.display === '') {
//     contactFormContainer.style.display = 'block';
//     contactSection.classList.add('expanded');
//     updateCaptcha(); // Generate new captcha when form toggled
//   } else {
//     contactFormContainer.style.display = 'none';
//     contactSection.classList.remove('expanded');
//   }
// }

// document.getElementById('check').addEventListener('change', toggleContactForm);

// // Add event listener to the "Mail" link
// document.querySelector('#email-container p a').addEventListener('click', toggleContactForm);

// // Highlight LinkedIn button on hover
// document.getElementById('linkedin-container').addEventListener('mouseover', function () {
//   this.classList.add('active');
// });
// document.getElementById('linkedin-container').addEventListener('mouseout', function () {
//   this.classList.remove('active');
// });

// // Handle form submission
// document.getElementById('contact-form').addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent default form submission
//   sendEmail(); // Call function to send email
// });

// // Initial call to generate captcha
// updateCaptcha();