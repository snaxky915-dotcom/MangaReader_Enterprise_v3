// MangaReader+ Landing Page — Interactive Preview & Activation Modal with Legal Consent
(() => {
  const LEGAL_VERSION = '2026.1.0';

  const PREVIEW_STATES = {
    manga: {
      eyebrow: 'LECTURA CONTINUA · CALIDAD HD · GUARDADO OFFLINE',
      headline: 'Manga, Manhwa y Webtoons con lectura fluida y sin anuncios',
      meta: 'Modo cascada vertical, lupa de nitidez HD, organización en tu biblioteca local y guardado sin internet según tu plan.',
      accent: 'rgba(245, 158, 11, 0.45)',
    },
    anime: {
      eyebrow: 'SIN ANUNCIOS · SIN POPUPS · FULL HD Y 4K',
      headline: 'Mira tus animes favoritos sin cortes y con salas para ver con amigos',
      meta: 'Salta intros y endings en 1 clic, activa Modo Sala o Teatro y sube el volumen hasta 400% con perfiles de ecualizador.',
      accent: 'rgba(56, 189, 248, 0.45)',
    },
    cine: {
      eyebrow: 'CINE Y SERIES · MULTI-AUDIO Y SUBTÍTULOS',
      headline: 'Organiza y disfruta películas y series en un reproductor limpio',
      meta: 'Cambia de ruta de reproducción en 1 clic, disfruta Modo Sala o Teatro y guarda tus favoritos en Mi Biblioteca.',
      accent: 'rgba(244, 63, 94, 0.45)',
    },
    kdramas: {
      eyebrow: 'K-DRAMAS HD · SUBTÍTULOS EN ESPAÑOL · TEMPORADAS ORDENADAS',
      headline: 'Tus dramas asiáticos favoritos sin redirecciones ni ventanas molestas',
      meta: 'Seguimiento automático por episodio para continuar exactamente donde te quedaste, con cambio rápido de conexión.',
      accent: 'rgba(168, 85, 247, 0.45)',
    },
    music: {
      eyebrow: 'MUSIC+ INTEGRADO · VISUALIZADOR ANIMADO · LETRAS',
      headline: 'Tu reproductor web de música integrado con visualizador y reproductor flotante',
      meta: 'Incluido en VIP Plus ($10), VIP Permanente ($50) y en tu Prueba Gratis de 7 días para escuchar mientras lees o trabajas.',
      accent: 'rgba(16, 185, 129, 0.45)',
    },
    personalizacion: {
      eyebrow: 'PERSONALIZACIÓN TOTAL · TEMAS 2-COLORES · FONDOS 4K',
      headline: 'Haz que la app y tu perfil se vean exactamente a tu estilo',
      meta: 'Combina degradados de 2 colores para toda la app, usa avatares y banners animados, marcos exclusivos y fondos en movimiento 4K.',
      accent: 'rgba(168, 85, 247, 0.5)',
    },
    comunidad: {
      eyebrow: 'COMUNIDAD · WATCH TOGETHER · NIVELES Y MARCOS XP',
      headline: 'Salas sincronizadas, chat en vivo y videollamadas con tus amigos',
      meta: 'Ve contenido al mismo tiempo con tus amigos, sube de nivel con multiplicadores XP y desbloquea marcos exclusivos.',
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

  // Activation Modal + Mandatory Legal Consent Checkbox
  const modal = document.getElementById('activationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const selectedPlanName = document.getElementById('selectedPlanName');
  const machineIdInput = document.getElementById('machineIdInput');
  const legalAcceptCheck = document.getElementById('legalAcceptCheck');
  const copyRequestBtn = document.getElementById('copyRequestBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  let activePlanLabel = 'Prueba Gratis 7 Días ($0)';

  function syncCopyButtonState() {
    if (!copyRequestBtn || !legalAcceptCheck) return;
    copyRequestBtn.disabled = !legalAcceptCheck.checked;
  }

  function openModal(planLabel) {
    activePlanLabel = planLabel || 'Prueba Gratis 7 Días ($0)';
    if (selectedPlanName) selectedPlanName.textContent = activePlanLabel;
    if (copyFeedback) copyFeedback.textContent = '';
    if (legalAcceptCheck) legalAcceptCheck.checked = false;
    syncCopyButtonState();
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

  if (legalAcceptCheck) {
    legalAcceptCheck.addEventListener('change', syncCopyButtonState);
  }

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
      if (legalAcceptCheck && !legalAcceptCheck.checked) {
        if (copyFeedback) {
          copyFeedback.textContent = 'Debes aceptar los Términos y el Aviso Legal antes de continuar.';
        }
        return;
      }
      const mid = (machineIdInput?.value || '').trim().toUpperCase() || 'MG-XXXX-YYYY-ZZZZ';
      const text = `Hola! Quiero activar mi licencia de MangaReader+.\n• Plan elegido: ${activePlanLabel}\n• Código de equipo: ${mid}\n• Contrato legal aceptado: v${LEGAL_VERSION}`;
      try {
        await navigator.clipboard.writeText(text);
        if (copyFeedback) copyFeedback.textContent = '✓ Mensaje copiado. Envíalo por Discord o WhatsApp para recibir tu clave de activación.';
      } catch {
        if (copyFeedback) copyFeedback.textContent = `Copia este mensaje: ${text}`;
      }
    });
  }
})();
