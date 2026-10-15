const passwordGate = document.querySelector('#password-gate');
const passwordForm = document.querySelector('#password-form');
if (passwordGate && passwordForm) {
  const passwordInput = document.querySelector('#site-password');
  const passwordError = document.querySelector('#password-error');
  passwordInput.focus();
  passwordForm.addEventListener('submit', event => {
    event.preventDefault();
    if (passwordInput.value.trim().toLowerCase() === 'i love u') {
      passwordGate.classList.add('is-unlocking');
      passwordGate.addEventListener('animationend', () => passwordGate.remove(), { once: true });
    } else {
      passwordError.textContent = 'Incorrect password. Try again.';
      passwordInput.select();
    }
  });
}

const questions = [
  'What was your first “oh, I really like him” moment?',
  'Which tiny thing I do always makes you smile?',
  'If we could relive one day from this year, which would you pick?',
  'What should our completely ridiculous couple nickname be?',
  'What’s one new thing you want us to try together?',
  'Which snack best describes our relationship, and why?',
  'What is your favorite ordinary moment we share?',
  'Where should our next little adventure take us?'
];

const questionText = document.querySelector('#question-text');
const questionButton = document.querySelector('#question-button');
const questionCount = document.querySelector('#question-count');
let currentQuestion = 0;

questionButton.addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  questionText.textContent = questions[currentQuestion];
  questionCount.textContent = `${currentQuestion + 1} / ${questions.length}`;
});

const sillyActivities = [
  { title: 'Draw each other in 30 seconds!', caption: 'Quick, Draw! is your arena.', url: 'https://quickdraw.withgoogle.com/' },
  { title: 'Find the cursor twin!', caption: 'Pointer Pointer is waiting.', url: 'https://pointerpointer.com/' },
  { title: 'Go on a mystery internet trip!', caption: 'The Useless Web awaits.', url: 'https://theuselessweb.com/' },
  { title: 'Pick a tiny game to play!', caption: 'Browse the fun on Neal.fun.', url: 'https://neal.fun/' }
];
let sillyIndex = -1;
const sillyLink = document.querySelector('#silly-link');
sillyLink.addEventListener('click', event => {
  if (sillyIndex === -1) {
    event.preventDefault();
    sillyIndex = 0;
  } else {
    sillyIndex = (sillyIndex + 1) % sillyActivities.length;
  }
  const activity = sillyActivities[sillyIndex];
  document.querySelector('#silly-pick').textContent = activity.title;
  document.querySelector('#silly-caption').textContent = activity.caption;
  sillyLink.href = activity.url;
  sillyLink.textContent = 'Let’s go! ↗';
  if (event.defaultPrevented) sillyLink.focus();
});

const loveNotes = ['You are my favorite person. ♡', 'I would choose you in every universe. ✨', 'Thanks for making life more fun. 💗', 'One year down, all my love to go!'];
let noteIndex = 0;
document.querySelector('#love-button').addEventListener('click', () => {
  document.querySelector('#love-message').textContent = loveNotes[noteIndex];
  noteIndex = (noteIndex + 1) % loveNotes.length;
});

document.querySelectorAll('.museum-item img').forEach(image => {
  const frame = image.closest('.museum-item');
  const basePath = image.getAttribute('src').replace(/\.[^.]+$/, '');
  const formats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  let formatIndex = 0;

  image.addEventListener('load', () => frame.classList.remove('is-empty'));
  image.addEventListener('error', () => {
    formatIndex += 1;
    if (formatIndex < formats.length) image.src = `${basePath}.${formats[formatIndex]}`;
    else frame.classList.add('is-empty');
  });
  if (image.complete && !image.naturalWidth) image.dispatchEvent(new Event('error'));
});

const topToggle = document.querySelector('#top-toggle');
if (topToggle) {
  topToggle.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    topToggle.hidden = window.scrollY < 320;
  }, { passive: true });
}

const heartRainButton = document.querySelector('#heart-rain-button');
if (heartRainButton) {
  heartRainButton.addEventListener('click', () => {
    for (let index = 0; index < 20; index += 1) {
      window.setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'heart-drop';
        heart.setAttribute('aria-hidden', 'true');
        heart.textContent = Math.random() < 0.5 ? '♥' : '♡';
        heart.style.color = ['#d95875', '#ed8b9d', '#be5268'][Math.floor(Math.random() * 3)];
        heart.style.setProperty('--heart-x', `${Math.random() * 100}vw`);
        heart.style.setProperty('--heart-drift', `${Math.round(Math.random() * 120 - 60)}px`);
        heart.style.setProperty('--heart-size', `${16 + Math.round(Math.random() * 14)}px`);
        heart.style.setProperty('--heart-duration', `${2.6 + Math.random() * 1.3}s`);
        document.body.append(heart);
        window.setTimeout(() => heart.remove(), 4000);
      }, index * 80);
    }
  });
}

const starfield = document.querySelector('#starfield');
if (starfield) {
  const starColors = ['#d95875', '#e2ae45', '#9679c9', '#6f9f9b'];
  for (let index = 0; index < 48; index += 1) {
    const star = document.createElement('i');
    star.className = 'background-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--star-size', `${1 + Math.random() * 2}px`);
    star.style.setProperty('--star-color', starColors[Math.floor(Math.random() * starColors.length)]);
    star.style.setProperty('--star-time', `${1.8 + Math.random() * 3.5}s`);
    star.style.setProperty('--star-delay', `${Math.random() * -5}s`);
    starfield.append(star);
  }
}
