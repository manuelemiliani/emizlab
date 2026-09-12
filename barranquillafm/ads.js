document.addEventListener("DOMContentLoaded", function() {
    

// 0. CARGAR BANNER SUPERIOR (DEBAJO DEL ENCABEZADO)
    const topBannerContainer = document.getElementById("top-banner-container");
    if (topBannerContainer) {
        topBannerContainer.innerHTML = `
    <div class="top-leaderboard-wrapper">
        <a href="noticia.html" class="top-leaderboard-slot-empty" title="Tu Publicidad Aquí">
            <i class="fa-solid fa-rectangle-ad"></i>
            <div style="text-align: left;">
                <strong style="font-size: 0.9rem; color: var(--dark); display: block;">¡Tu Publicidad Aquí!</strong>
                <span style="font-size: 0.72rem; color: var(--text-muted);">Banner principal de alta visibilidad para tu marca</span>
            </div>
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

    // 2. CARGAR BANNER FLOTANTE DENTRO DEL TEXTO
    const inArticleAdContainer = document.getElementById("in-article-ad-container");
    if (inArticleAdContainer) {
        inArticleAdContainer.innerHTML = `
            <div class="in-article-ad-box">
                <span class="ad-label">Publicidad</span>
                <a href="noticia.html" class="ad-banner-250" title="">
                    <img src="banner/banner01.png" alt="Anunciante">
                </a>
            </div>
        `;
    }

    // 3. CARGAR BANNER HORIZONTAL DEL FINAL
    const horizontalAdContainer = document.getElementById("horizontal-ad-container");
    if (horizontalAdContainer) {
        horizontalAdContainer.innerHTML = `
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 15px; border-radius: 12px; text-align: center; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; gap: 12px;">
                <i class="fa-solid fa-bullhorn" style="font-size: 1.5rem; color: var(--primary);"></i>
                <div style="text-align: left;">
                    <strong style="font-size: 0.9rem; color: var(--dark); display: block;">¡Tu Publicidad Aquí!</strong>
                    <p style="font-size: 0.78rem; margin: 0; color: var(--text-muted);">Anuncia tu marca, producto o servicio con alta visibilidad.</p>
                </div>
            </div>
        `;
    }

});