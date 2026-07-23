const menuItems = [
  { name: 'Menthe Dose', category: 'breakfast', description: 'Soft fenugreek dosa with a distinctly local flavour.', popular: true },
  { name: 'Surnali', category: 'breakfast', description: 'Soft, mildly sweet coastal-style dosa.' },
  { name: 'Idli', category: 'breakfast', description: 'Steamed rice cakes served with chutney and sambar.' },
  { name: 'Vada', category: 'breakfast', description: 'Crisp savoury lentil fritter.' },
  { name: 'Plain Dosa', category: 'breakfast', description: 'Classic South Indian dosa served with accompaniments.' },
  { name: 'Shavige', category: 'breakfast', description: 'Traditional rice noodles prepared in the local style.', popular: true },
  { name: 'Moode', category: 'breakfast', description: 'Steamed rice preparation cooked in fragrant leaves.' },
  { name: 'Kotte Kadubu', category: 'breakfast', description: 'Steamed rice cakes prepared in woven leaf cups.' },
  { name: 'Mangalore Buns', category: 'breakfast', description: 'Soft, mildly sweet banana puri from coastal Karnataka.' },
  { name: 'Poori Bhaji', category: 'breakfast', description: 'Puffed poori with gently seasoned potato bhaji.' },
  { name: 'Ragi Mudde & Bassaru', category: 'lunch', description: 'Finger-millet balls with traditional lentil broth.', popular: true },
  { name: 'Vegetarian Meals', category: 'lunch', description: 'A traditional meal with seasonal accompaniments.' },
  { name: 'North Indian Selection', category: 'lunch', description: 'A rotating selection of familiar vegetarian favourites.' },
  { name: 'Tomato Omelette', category: 'snacks', description: 'A savoury vegetarian tomato pancake.' },
  { name: 'Goli Baje', category: 'snacks', description: 'Soft and crisp coastal Karnataka fritters.' },
  { name: 'Coffee & Tea', category: 'snacks', description: 'Hot beverages to complete the meal.' }
];

const grid = document.getElementById('menuGrid');
const count = document.getElementById('menuCount');
const filters = [...document.querySelectorAll('.filter')];

function renderMenu(filter = 'all') {
  const filtered = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);
  count.textContent = `${filtered.length} selections`;
  grid.innerHTML = filtered.map((item, index) => `
    <article class="menu-item" style="animation-delay:${index * 45}ms">
      <span class="menu-index">${String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="menu-meta">
        <span>${item.category}</span>
        <b>${item.popular ? 'Signature' : 'Price to confirm'}</b>
      </div>
    </article>
  `).join('');
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderMenu(button.dataset.filter);
  });
});

const header = document.querySelector('.site-header');
const nav = document.querySelector('.nav-links');
const toggle = document.querySelector('.menu-toggle');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el => revealObserver.observe(el));

const heroMedia = document.querySelector('.hero-media');
window.addEventListener('scroll', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const y = Math.min(window.scrollY * 0.14, 100);
  heroMedia.style.transform = `scale(1.05) translateY(${y}px)`;
}, { passive: true });

window.addEventListener('load', () => {
  document.querySelector('.page-loader').classList.add('hidden');
});

setTimeout(() => document.querySelector('.page-loader').classList.add('hidden'), 1800);
document.getElementById('year').textContent = new Date().getFullYear();
renderMenu();
