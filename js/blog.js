// ── BLOG POSTS ──
// To add a new post: add an object to this array.
// To remove a post: delete its object from the array.
// To delete the whole blog: delete blog.html, css/blog.css, js/blog.js

const posts = [
  {
    id: 1,
    date: '2026-10-07',
    title: 'Dark Tech #1: DevLog Sprint 1',
    excerpt: 'Voor het vak Studio Dark Tech werk ik samen met een groep aan een fysieke kunstinstallatie voor HvA-studenten. <br> Het thema is function creep: een technologie begint met één doel, maar krijgt ongemerkt een ander doel',
    tag: 'PRIVACY',
    body: `
      <p>Voor de studio Dark Tech werk ik samen in een groepje aan een fysieke kunstinstallatie voor HvA-studenten. Het thema is function creep: een technologie begint met 1 doel, maar krijgt ongemerkt een ander doel. Denk aan een camera die eerst voor veiligheid is, maar later ook wordt gebruikt om gedrag te analyseren. Of een studentenpas die wordt gebruikt voor toegang, maar ook je looproutes bijhoudt. <br>Ons doel is niet om function creep uit te leggen — maar om het de studenten te laten voelen.</p>

      <h2>Wat heb ik gedaan in Sprint 1?</h2>
      <h3>Individueel:</h3>
      <ul> 
        <li>Ethische analyse afgemaakt over de dark value: verspilling en milieuschade<br></li>
        <li>Concepten bedacht en besproken<br></li>
        <li>prototypes gebouwd<br></li>
      </ul>
      <h2>Prototypes</h2>
      <h3>1. Photobooth:</h3>
      Een student maakt een foto — lijkt leuk en onschuldig. Maar daarna wordt die foto opgeslagen, geanalyseerd of gebruikt voor profiling zonder dat de student het doorheeft. Ook heeft de student niet door dat hij/zij op een weegschaal staat.<br>

      <h3>2. RFID + studentenpas:</h3>
      De student scant zijn kaart bij het kunstwerk. Het lijkt onschuldig, maar ondertussen wordt er data verzameld over de student.<br>

      <h3>3. Filminstallatie:</h3>
      Een student loopt een donkere ruimte in en gaat voor een film zitten. De film lijkt normaal, maar ondertussen worden er gegevens verzameld. Ook word je eigen gezicht uiteindelijk vertoond op tv.<br>

      <h2>Wat werkte goed en wat niet?</h2>

      <h3>Goed:</h3>
      <ul>
        <li>Het bouwen van de prototypes ging soepel en snel<br></li>
        <li>Fysiek bouwen van prototypes hielp echt om na te denken over ruimte en beleving<br></li>
      </ul>
      <br><br>
      <h2>Prototype 1</h2>
      <img src="images/photobooth1.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
      <img src="images/photobooth2.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
      <img src="images/photobooth3.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
      <img src="images/photobooth4.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
      <h2>Prototype 2</h2>
      <img src="images/rfid1.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
      <h2>Prototype 3</h2>
      <img src="images/cinema1.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
      <img src="images/cinema2.jpg" alt="Beschrijving" style="max-width:50%;margin:16px 0;">
    `
  }
];

// ── RENDER ──
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderGrid() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  if (posts.length === 0) {
    grid.innerHTML = `
      <div class="blog-empty" style="grid-column:1/-1">
        <span class="blog-empty-icon">📭</span>
        <p>NO POSTS YET — CHECK BACK SOON</p>
      </div>`;
    return;
  }

  grid.innerHTML = posts.map(p => `
    <a class="blog-card reveal" href="blog.html?post=${p.id}">
      <div class="blog-card-date">${formatDate(p.date)}</div>
      <div class="blog-card-title">${p.title}</div>
      <div class="blog-card-excerpt">${p.excerpt}</div>
      <div><span class="blog-card-tag">${p.tag}</span></div>
      <div class="blog-card-read">▶ READ MORE</div>
    </a>
  `).join('');

  // trigger reveal on cards
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
}

function renderPost() {
  const postWrap = document.getElementById('post-content');
  if (!postWrap) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('post'));
  const post = posts.find(p => p.id === id);

  if (!post) {
    postWrap.innerHTML = `
      <div class="blog-empty">
        <span class="blog-empty-icon">🔍</span>
        <p>POST NOT FOUND</p>
      </div>
      <a class="post-back" href="blog.html">◀ BACK TO BLOG</a>`;
    return;
  }

  postWrap.innerHTML = `
    <a class="post-back" href="blog.html">◀ BACK TO BLOG</a>
    <div class="post-date">${formatDate(post.date)} · ${post.tag}</div>
    <h1 class="post-title">${post.title}</h1>
    <div class="post-body">${post.body}</div>
  `;
}

// run on load
renderGrid();
renderPost();
