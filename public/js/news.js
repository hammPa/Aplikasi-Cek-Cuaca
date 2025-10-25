const LIMIT = 9;
let currentPage = 1;

const newsGrid = document.getElementById('newsGrid');
const loading = document.getElementById('loading');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// Fetch berita cuaca
async function fetchNews(offset) {
    if (offset === 0) loading.classList.add('show');
    try {
        const response = await fetch(`/getBerita?limit=${LIMIT}&offset=${offset}`);
        const result = await response.json();

        if (result.data && result.data.length > 0) {
            displayNews(result.data);
            updatePagination(result.pagination);
        } else {
            showEmptyState();
        }
    } catch (err) {
        showError('Terjadi kesalahan saat mengambil data');
    } finally {
        loading.classList.remove('show');
    }
}
// Tampilkan berita
function displayNews(articles) {
    newsGrid.innerHTML = ''; // Bersihkan isi sebelumnya

    articles.forEach(article => {
        // Abaikan berita yang tidak punya gambar
        if (!article.image) return;

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${article.image}"
                 alt="${article.title}"
                 class="news-image"
                 onerror="this.style.display='none'">

            <div class="news-content">
                <h5 class="news-card-title">${article.title || 'Tanpa judul'}</h5>
                <p class="news-description">${article.description || 'Tidak ada deskripsi tersedia.'}</p>
                <div class="news-meta">
                    <span class="news-author">✍️ ${article.author || 'Tidak diketahui'}</span>
                    <span class="news-source">🌐 ${article.source || 'Tidak diketahui'}</span>
                    <span class="news-date">📅 ${formatDate(article.published_at)}</span>
                </div>
            </div>
        `;

        // Klik card membuka berita di tab baru
        card.onclick = () => article.url && window.open(article.url, '_blank');

        newsGrid.appendChild(card);
    });

    // Jika tidak ada satu pun berita bergambar
    if (newsGrid.children.length === 0) {
        showEmptyState();
    }
}


function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const days = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Kemarin';
    if (days < 7) return `${days} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function updatePagination(pagination) {
    pageInfo.textContent = `Halaman ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = pagination.count < LIMIT;
}

function showEmptyState() {
    newsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
            <h3>Tidak ada berita cuaca</h3>
        </div>
    `;
}

function showError(message) {
    newsGrid.innerHTML = `
        <div class="error-message" style="grid-column: 1/-1;">
            <p>❌ ${message}</p>
        </div>
    `;
}

// Pagination
prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNews((currentPage - 1) * LIMIT);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

nextBtn.onclick = () => {
    currentPage++;
    fetchNews((currentPage - 1) * LIMIT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Load awal
fetchNews(0);
