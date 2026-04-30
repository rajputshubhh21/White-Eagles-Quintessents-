const counters = document.querySelectorAll('.counter');

function easeOutQuad(t) {
  return t * (2 - t); // smooth easing
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K+";
  return num + "+";
}

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 2000; // ms
  let startTime = null;

  counter.classList.add('animate');

  function update(currentTime) {
    if (!startTime) startTime = currentTime;

    const progress = (currentTime - startTime) / duration;
    const easedProgress = easeOutQuad(Math.min(progress, 1));

    const value = Math.floor(easedProgress * target);

    counter.innerText = formatNumber(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.innerText = formatNumber(target);
      counter.classList.remove('animate'); // stop glow pulse
    }
  }

  requestAnimationFrame(update);
}

// Scroll trigger
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));