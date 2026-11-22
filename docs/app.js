// MangaReader+ Enterprise Landing Page — Interactive Preview & Activation Modal
(() => {
  const PREVIEW_STATES = {
    manga: {
      eyebrow: 'LECTOR WEBTOON & CASCADA · UPSCALER 4K · DESCARGA PDF',
      headline: 'Manga, Manhwa y Webtoons sin compresión y con Glosario Inteligente',
      meta: 'Fuentes como MangaDex, Webtoons y Toomics integradas. Modo lectura continua, caché inteligente y descargas offline según tu plan.',
      accent: 'rgba(245, 158, 11, 0.45)',
    },
    anime: {
      eyebrow: 'ESCUDO MG NATIVO ACTIVO · 0 POPUPS · 1080p / 4K HDR',
      headline: 'Streaming Fluido, Failover Inteligente y Watch Together en Tiempo Real',
      meta: 'Salta intros y endings con AniSkip en 1 clic, activa Modo Sala/Teatro y amplifica el audio hasta 400% con perfiles EQ.',
      accent: 'rgba(56, 189, 248, 0.45)',
    },
    cine: {
      eyebrow: 'CINE & SERIES 4K · MULTI-AUDIO LATINO / SUB ES',
      headline: 'Estrenos y Series Completas con Servidores Escalonados hasta 99.9%',
      meta: 'Cambia de servidor al vuelo con latencia en vivo, activa el Modo Cine/Sala y guarda tus favoritos en Mi Biblioteca.',
      accent: 'rgba(244, 63, 94, 0.45)',
    },
    kdramas: {
      eyebrow: 'K-DRAMAS HD · SUBTÍTULOS SINCRONIZADOS · TEMPORADAS COMPLETAS',
      headline: 'Tu Catálogo Asiático Favorito sin Redirecciones ni Ventanas Emergentes',
      meta: 'Seguimiento automático por episodio, historial unificado en la nube local y servidores dedicados para maratones nocturnas.',
      accent: 'rgba(168, 85, 247, 0.45)',
    },
    music: {
      eyebrow: 'MUSIC+ / SPOTIFY AD-FREE · VISUALIZADOR CIRCULAR 360°',
      headline: 'Música Sin Anuncios con Letras Sincronizadas e Isla Flotante',
      meta: 'Disponible desde VIP Plus ($10), VIP Permanente ($50) y en tu Prueba Gratis de 7 días. Incluye control multimedia global.',
      accent: 'rgba(16, 185, 129, 0.45)',
    },
    nitro: {
      eyebrow: 'PERSONALIZACIÓN ESTILO DISCORD NITRO · WALLPAPERS 4K',
      headline: 'Temas de 2 Colores Combinados, Transparencias y Perfiles con GIFs HD',
      meta: 'Personaliza menús, degradados, marcos Neón/Oro y fondos animados 4K. Comparte tus combinaciones con código de 1 clic.',
      accent: 'rgba(168, 85, 247, 0.5)',
    },
    comunidad: {
      eyebrow: 'COMUNIDAD ESTILO DISCORD · WATCH TOGETHER · RANGOS XP',
      headline: 'Salas Sincronizadas, Videollamadas y Roles de Moderación Granulares',
      meta: 'Sube de nivel con multiplicadores 1.25x a 2.0x XP, desbloquea marcos exclusivos y disfruta salas privadas con tus amigos.',
      accent: 'rgba(245, 158, 11, 0.45)',
    },
  };

  // Interactive App Showcase Tabs
  const navButtons = document.querySelectorAll('.app-nav-item[data-preview]');
  const stageScreen = document.getElementById('stageScreen');
  const stageEyebrow = document.getElementById('stageEyebrow');
  const stageHeadline = document.getElementById('stageHeadline');
  const stageMeta = document.getElementById('stageMeta');

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-preview');
      const state = PREVIEW_STATES[key];
      if (!state) return;

      navButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      if (stageEyebrow) stageEyebrow.textContent = state.eyebrow;
      if (stageHeadline) stageHeadline.textContent = state.headline;
      if (stageMeta) stageMeta.textContent = state.meta;
      if (stageScreen) stageScreen.style.borderColor = state.accent;
    });
  });

  // Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileDrawer.hasAttribute('hidden');
      if (isHidden) {
        mobileDrawer.removeAttribute('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileDrawer.setAttribute('hidden', '');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    mobileDrawer.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => {
        mobileDrawer.setAttribute('hidden', '');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Activation Modal
  const modal = document.getElementById('activationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const selectedPlanName = document.getElementById('selectedPlanName');
  const machineIdInput = document.getElementById('machineIdInput');
  const copyRequestBtn = document.getElementById('copyRequestBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  let activePlanLabel = '7 Días Free Full ($0)';

  function openModal(planLabel) {
    activePlanLabel = planLabel || '7 Días Free Full ($0)';
    if (selectedPlanName) selectedPlanName.textContent = activePlanLabel;
    if (copyFeedback) copyFeedback.textContent = '';
    if (modal) {
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      if (machineIdInput) machineIdInput.focus();
    }
  }

  function closeModal() {
    if (modal) {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger.getAttribute('data-open-modal'));
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  if (copyRequestBtn) {
    copyRequestBtn.addEventListener('click', async () => {
      const mid = (machineIdInput?.value || '').trim().toUpperCase() || 'MG-XXXX-YYYY-ZZZZ';
      const text = `Hola! Quiero activar mi licencia de MangaReader+ Enterprise.\n• Plan elegido: ${activePlanLabel}\n• Machine ID: ${mid}`;
      try {
        await navigator.clipboard.writeText(text);
        if (copyFeedback) copyFeedback.textContent = '✓ Mensaje copiado al portapapeles. Envíalo al Propietario/Admin para recibir tu token MG-ACT.';
      } catch {
        if (copyFeedback) copyFeedback.textContent = `Copia este mensaje: ${text}`;
      }
    });
  }
})();
