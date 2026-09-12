document.addEventListener("DOMContentLoaded", function() {
    

// 0. CARGAR BANNER SUPERIOR (DEBAJO DEL ENCABEZADO)
    const topBannerContainer = document.getElementById("top-banner-container");
    if (topBannerContainer) {
        topBannerContainer.innerHTML = `
        <div class="top-leaderboard-wrapper">
            <a href="noticia.html" title="Tu Publicidad Aquí" style="display: block; width: 100%; max-width: 728px; margin: 0 auto;">
                <img src="banner/banner04.png" alt="Banner Principal" style="width: 100%; height: auto; border-radius: 8px; display: block; object-fit: cover;">
            </a>
        </div>
        `;
    }


    // 1. CARGAR BARRAS LATERALES (SIDEBAR)
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <a href="noticia.html" class="sidebar-ad-card" title="Anuncio 1">
                <span class="ad-label" style="margin-bottom: 3px;">Publicidad</span>
                <div class="sidebar-ad-content">
                    <img src="banner/banner01.png" alt="Banner Publicitario 1">
                </div>
            </a>
            
            <a href="noticia.html" class="sidebar-ad-card" title="Anuncio 2">
                <div class="sidebar-ad-content">
                    <img src="banner/banner02.png" alt="Banner Publicitario 2">
                </div>
            </a>

            <a href="noticia.html" class="sidebar-ad-slot-empty" title="Tu Publicidad Aquí">
                <i class="fa-solid fa-rectangle-ad"></i>
                <strong style="font-size: 0.85rem; color: var(--dark);">¡Tu Publicidad Aquí!</strong>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Destaca tu negocio con nosotros</span>
            </a>
        `;
    }

// 2. CARGAR BANNER FLOTANTE (Solo la imagen pura, sin bordes ni textos)
    const inArticleAdContainer = document.getElementById("in-article-ad-container");
    if (inArticleAdContainer) {
        inArticleAdContainer.innerHTML = `
            <div style="float: left; width: 320px; margin: 0 20px 15px 0; background: transparent; border: none; box-shadow: none; padding: 0;">
                <a href="noticia.html" title="Anuncio Interno" style="display: block; width: 100%;">
                    <img src="banner/banner06.gif" alt="Banner Publicitario" style="width: 100%; height: auto; display: block; border-radius: 8px; object-fit: cover;">
                </a>
            </div>
        `;
    }


    // 3. CARGAR BANNER FLOTANTE FINAL (Solo la imagen pura, sin bordes ni textos)
    const inArticleAdContainer2 = document.getElementById("in-article-ad-container2");
    if (inArticleAdContainer2) {
        inArticleAdContainer2.innerHTML = `
            <div style="float: left; width: 320px; margin: 0 20px 15px 0; background: transparent; border: none; box-shadow: none; padding: 0;">
                <a href="noticia.html" title="Anuncio Interno" style="display: block; width: 100%;">
                    <img src="banner/banner07.png" alt="Banner Publicitario" style="width: 100%; height: auto; display: block; border-radius: 8px; object-fit: cover;">
                </a>
            </div>
        `;
    }


});