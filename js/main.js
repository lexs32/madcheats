document.addEventListener('DOMContentLoaded', () => {
  const announcementBar = document.getElementById('announcementBar');
  const closeAnnouncement = document.getElementById('closeAnnouncement');
  if (closeAnnouncement && announcementBar) {
    if (localStorage.getItem('madcheats_notice_dismissed') === 'true') {
      announcementBar.style.display = 'none';
    }
    closeAnnouncement.addEventListener('click', () => {
      announcementBar.style.display = 'none';
      localStorage.setItem('madcheats_notice_dismissed', 'true');
    });
  }

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchModal = document.getElementById('searchModal');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const searchResultsList = document.getElementById('searchResultsList');

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    if (globalSearchInput) {
      globalSearchInput.value = '';
      setTimeout(() => globalSearchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
  }

  if (searchTriggerBtn) searchTriggerBtn.addEventListener('click', openSearch);

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeCheatsModal();
      closeCart();
      closeCheckoutSuccess();
    }
  });

  if (globalSearchInput && searchResultsList) {
    globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const rows = searchResultsList.querySelectorAll('.search-result-row');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
  const starCanvas = document.getElementById('heroStars');
  if (starCanvas) {
    const ctx = starCanvas.getContext('2d');
    let width = (starCanvas.width = starCanvas.offsetWidth);
    let height = (starCanvas.height = starCanvas.offsetHeight);

    const stars = [];
    const starCount = 65;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        speedX: (Math.random() - 0.5) * 0.28,
        speedY: (Math.random() - 0.5) * 0.28,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.3 ? '#ffffff' : '#ff4d4d'
      });
    }

    window.addEventListener('resize', () => {
      width = starCanvas.width = starCanvas.offsetWidth;
      height = starCanvas.height = starCanvas.offsetHeight;
    });

    const animateStars = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animateStars);
    };
    animateStars();
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  const onlineCounter = document.getElementById('onlineCounter');
  if (onlineCounter) {
    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2;
      let current = parseInt(onlineCounter.textContent.replace(',', '')) || 1482;
      current = Math.max(1420, Math.min(1560, current + delta));
      onlineCounter.textContent = current.toLocaleString();
    }, 4000);
  }

  const CHEATS_CATALOG = {
    arc: {
      title: 'Arc Raiders',
      image: 'assets/images/games/arc_raiders.png',
      status: 'Ring-0 Hypervisor • EAC Undetected',
      products: [
        {
          id: 'arc-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Most Popular',
          productId: 884622,
          features: ['Unique Polymorphic Binary', 'Custom Driver Per User', 'Humanized Aim Curve', 'Integrated HWID Spoofer'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 884622, variantId: 1714657 },
            '7d': { name: '7 Days', price: 29.99, productId: 884622, variantId: 1714658 },
            '30d': { name: '30 Days', price: 59.99, productId: 884622, variantId: 1714659 }
          }
        },
        {
          id: 'arc-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          productId: 886600,
          features: ['Ring-0 Stealth Injection', 'Silent Aim & Bullet Prediction', 'Visible Check & Chams', '2D Radar & Threat Alert'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 886600, variantId: 1727939 },
            '7d': { name: '7 Days', price: 34.99, productId: 886600, variantId: 1727940 },
            '30d': { name: '30 Days', price: 69.99, productId: 886600, variantId: 1727941 }
          }
        }
      ]
    },
    rust: {
      title: 'Rust',
      image: 'assets/images/games/rust.png',
      status: 'EAC & Cerberus Undetected',
      products: [
        {
          id: 'rust-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Most Popular',
          productId: 884610,
          features: ['Kernel Driver Bypass', 'Predictive Heli & Player Aim', 'Raid ESP & Tool Cupboard ESP', 'Admin Flags & Debug Camera'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 884610, variantId: 1714641 },
            '7d': { name: '7 Days', price: 29.99, productId: 884610, variantId: 1714642 },
            '30d': { name: '30 Days', price: 59.99, productId: 884610, variantId: 1714643 }
          }
        },
        {
          id: 'rust-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          productId: 886602,
          features: ['Private Build (Limited Slots)', 'Always Headshot Silent Curve', 'Full Base Radar & Trap Warning', 'Built-in Hardware Spoofer'],
          plans: {
            '1d': { name: '1 Day', price: 9.99, productId: 886602, variantId: 1727943 },
            '7d': { name: '7 Days', price: 39.99, productId: 886602, variantId: 1727944 },
            '30d': { name: '30 Days', price: 69.99, productId: 886602, variantId: 1727945 }
          }
        }
      ]
    },
    r6s: {
      title: 'Rainbow Six Siege',
      image: 'assets/images/games/r6.png',
      status: 'BattlEye & QB Bypass Undetected',
      products: [
        {
          id: 'r6s-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          productId: 884587,
          features: ['Magic Bullet & Vector Aim', 'Full Skeleton & Trap ESP', '100% Streamproof', 'No Recoil & Spread 0%'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 884587, variantId: 1714586 },
            '7d': { name: '7 Days', price: 29.99, productId: 884587, variantId: 1714587 },
            '30d': { name: '30 Days', price: 59.99, productId: 884587, variantId: 1714588 }
          }
        },
        {
          id: 'r6s-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          productId: 886184,
          features: ['Private Slot Security', 'Wallbang Prediction & Penetration', 'Enemy View Angles & Health', 'Automatic HWID Cleaner'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 886184, variantId: 1724894 },
            '7d': { name: '7 Days', price: 29.99, productId: 886184, variantId: 1724895 },
            '30d': { name: '30 Days', price: 59.99, productId: 886184, variantId: 1724896 }
          }
        }
      ]
    },
    wardogs: {
      title: 'Wardogs',
      image: 'assets/images/games/wardogs.png',
      status: 'Ring-0 Hypervisor • Undetected',
      products: [
        {
          id: 'wd-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          productId: 886592,
          features: ['Private Cryptographic Binary', 'Dynamic FOV & Bone Target', 'Full Item & Equipment ESP', 'Built-in HWID Spoofer'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 886592, variantId: 1727920 },
            '7d': { name: '7 Days', price: 29.99, productId: 886592, variantId: 1727921 },
            '30d': { name: '30 Days', price: 59.99, productId: 886592, variantId: 1727922 }
          }
        },
        {
          id: 'wd-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          productId: 886596,
          features: ['Kernel Driver Stealth', 'Target Lock & Prediction', 'Visible Check Color Swapping', 'Threat Radar Mini-Map'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 886596, variantId: 1727932 },
            '7d': { name: '7 Days', price: 29.99, productId: 886596, variantId: 1727933 },
            '30d': { name: '30 Days', price: 59.99, productId: 886596, variantId: 1727934 }
          }
        },
        {
          id: 'wd-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          productId: 887809,
          features: ['Hardware DMA Protocol', 'Overlay Stream Shield', 'Loot & Player Tracers', 'Read-Only Integrity'],
          plans: {
            '1d': { name: '1 Day', price: 9.99, productId: 887809, variantId: 1736059 },
            '7d': { name: '7 Days', price: 39.99, productId: 887809, variantId: 1736060 },
            '30d': { name: '30 Days', price: 69.99, productId: 887809, variantId: 1736061 }
          }
        }
      ]
    },
    apex: {
      title: 'Apex Legends',
      image: 'assets/images/games/apex.png',
      status: 'EAC Ring-0 Undetected',
      products: [
        {
          id: 'apex-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          productId: 886659,
          features: ['Private Slot Architecture', 'Instant Target Switch & Curve', 'Full Distance & Legend Tag ESP', 'Integrated Clean HWID Spoofer'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 886659, variantId: 1728097 },
            '7d': { name: '7 Days', price: 29.99, productId: 886659, variantId: 1728098 },
            '30d': { name: '30 Days', price: 59.99, productId: 886659, variantId: 1728099 }
          }
        },
        {
          id: 'apex-internal',
          name: 'Unnamed Internal',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          productId: 887852,
          features: ['Smooth Humanized Aimbot', 'Glow & Skeleton ESP', 'Shield & Health Bars', 'No Sway & No Recoil'],
          plans: {
            '1d': { name: '1 Day', price: 9.99, productId: 887852, variantId: 1736149 },
            '7d': { name: '7 Days', price: 39.99, productId: 887852, variantId: 1736150 },
            '30d': { name: '30 Days', price: 69.99, productId: 887852, variantId: 1736151 }
          }
        },
        {
          id: 'apex-external',
          name: 'Unnamed External',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          productId: 887853,
          features: ['2nd PC DMA Hardware Mode', 'Web Radar for Mobile/Tablet', 'Streamer Mode Overlay', 'Zero Memory Writing'],
          plans: {
            '1d': { name: '1 Day', price: 8.99, productId: 887853, variantId: 1736152 },
            '7d': { name: '7 Days', price: 34.99, productId: 887853, variantId: 1736153 },
            '30d': { name: '30 Days', price: 64.99, productId: 887853, variantId: 1736154 }
          }
        }
      ]
    },
    fortnite: {
      title: 'Fortnite',
      image: 'assets/images/games/fortnite.png',
      status: 'BattlEye & EAC Bypass Undetected',
      products: [
        {
          id: 'fn-internal',
          name: 'Unnamed Internal',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          productId: 887815,
          features: ['Memory Silent Aim & Triggerbot', 'Player Box & Skeleton ESP', 'Loot Chest & Rarity ESP', '100% Streamproof'],
          plans: {
            '1d': { name: '1 Day', price: 9.99, productId: 887815, variantId: 1736071 },
            '7d': { name: '7 Days', price: 39.99, productId: 887815, variantId: 1736072 },
            '30d': { name: '30 Days', price: 69.99, productId: 887815, variantId: 1736073 }
          }
        },
        {
          id: 'fn-external',
          name: 'Unnamed External',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          productId: 887820,
          features: ['External DMA 2nd PC Support', 'Phone Browser Mini-Map', 'No Memory Modifications', 'Streamer Protected Mode'],
          plans: {
            '1d': { name: '1 Day', price: 8.99, productId: 887820, variantId: 1736080 },
            '7d': { name: '7 Days', price: 34.99, productId: 887820, variantId: 1736081 },
            '30d': { name: '30 Days', price: 64.99, productId: 887820, variantId: 1736082 }
          }
        }
      ]
    },
    valorant: {
      title: 'Valorant',
      image: 'assets/images/games/valorant.png',
      status: 'Vanguard Ring-0 Undetected',
      products: [
        {
          id: 'val-unnamed',
          name: 'Unnamed',
          edition: 'Hyper-Safe Vanguard Ring-0',
          tag: 'Vanguard Safe',
          productId: 887352,
          features: ['Hyper-Safe Visible Aimbot', 'Player Box & Health Bar', 'Streamproof Capture', 'Triggerbot with Delay'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 887352, variantId: 1731692 },
            '7d': { name: '7 Days', price: 29.99, productId: 887352, variantId: 1731693 },
            '30d': { name: '30 Days', price: 59.99, productId: 887352, variantId: 1731694 }
          }
        }
      ]
    },
    delta_force: {
      title: 'Delta Force',
      image: 'assets/images/games/delta_force.png',
      status: 'Ring-0 Driver • ACE Bypass Undetected',
      products: [
        {
          id: 'df-ancient',
          name: 'Ancient',
          edition: 'Combat & Tactical ESP',
          tag: 'Most Popular',
          productId: 887840,
          features: ['3D Bounding Box & Bone Skeleton', 'Adaptive Smoothing Aimbot', 'Vehicle & Helo Tracker', 'Custom FOV & Triggerbot'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 887840, variantId: 1736126 },
            '7d': { name: '7 Days', price: 29.99, productId: 887840, variantId: 1736127 },
            '30d': { name: '30 Days', price: 59.99, productId: 887840, variantId: 1736128 }
          }
        },
        {
          id: 'df-unnamed',
          name: 'Unnamed',
          edition: 'Tournament Edition',
          tag: 'Streamproof',
          productId: 887830,
          features: ['Hardware DMA Direct Link', 'OBS & Discord Streamproof', 'No Recoil & Sway Removal', 'Loot & Extraction Locator'],
          plans: {
            '1d': { name: '1 Day', price: 9.99, productId: 887830, variantId: 1736104 },
            '7d': { name: '7 Days', price: 39.99, productId: 887830, variantId: 1736105 },
            '30d': { name: '30 Days', price: 59.99, productId: 887830, variantId: 1736106 }
          }
        }
      ]
    },
    eft: {
      title: 'Escape From Tarkov',
      image: 'assets/images/games/eft.png',
      status: 'Ring-0 Kernel Hypervisor • BattleEye Undetected',
      products: [
        {
          id: 'eft-crusader',
          name: 'Crusader',
          edition: 'Full Internal Suite',
          tag: 'Most Popular',
          productId: 887845,
          features: ['Loot & Item Value ESP', 'Aimbot with Silent Aim & Recoil Control', 'Player & Scav Distance ESP', 'Extract Points & Grenade ESP'],
          plans: {
            '1d': { name: '1 Day', price: 9.99, productId: 887845, variantId: 1736135 },
            '7d': { name: '7 Days', price: 39.99, productId: 887845, variantId: 1736136 },
            '30d': { name: '30 Days', price: 69.99, productId: 887845, variantId: 1736137 }
          }
        },
        {
          id: 'eft-unnamed',
          name: 'Unnamed',
          edition: 'External & Streamproof',
          tag: 'DMA / Streamproof',
          productId: 887834,
          features: ['Secondary PC Web Radar', 'Zero BattlEye Memory Footprint', 'Container & Corpse Filter', 'Instant Bullet & Speed Modifier'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 887834, variantId: 1736111 },
            '7d': { name: '7 Days', price: 29.99, productId: 887834, variantId: 1736112 },
            '30d': { name: '30 Days', price: 59.99, productId: 887834, variantId: 1736113 }
          }
        }
      ]
    },
    marvel_rivals: {
      title: 'Marvel Rivals',
      image: 'assets/images/games/marvel_rivals.png',
      status: 'Kernel Hypervisor • Vanguard/ACE Safe',
      products: [
        {
          id: 'mr-crusader',
          name: 'Predator',
          edition: 'Hero Mastery Internal',
          tag: 'Top Rated',
          productId: 887840,
          features: ['Hero Skill Cooldown ESP', 'Projectile Prediction Aimbot', 'Ultimate Ability Tracker', 'Team Health & Barrier Visuals'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 887840, variantId: 1736126 },
            '7d': { name: '7 Days', price: 29.99, productId: 887840, variantId: 1736127 },
            '30d': { name: '30 Days', price: 59.99, productId: 887840, variantId: 1736128 }
          }
        }
      ]
    },
    cod: {
      title: 'BO7 & Warzone',
      image: 'assets/images/games/cod.png',
      status: 'Ricochet Kernel Undetected',
      products: [
        {
          id: 'cod-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          productId: 884587,
          features: ['Ricochet Safe Silent Aim', 'Bone Skeleton & Box ESP', 'Full Streamproof OBS', 'Controller & KBM Support'],
          plans: {
            '1d': { name: '1 Day', price: 7.99, productId: 884587, variantId: 1714586 },
            '7d': { name: '7 Days', price: 29.99, productId: 884587, variantId: 1714587 },
            '30d': { name: '30 Days', price: 59.99, productId: 884587, variantId: 1714588 }
          }
        }
      ]
    }
  };

  const gameCheatsModal = document.getElementById('gameCheatsModal');
  const modalGameThumb = document.getElementById('modalGameThumb');
  const modalGameStatus = document.getElementById('modalGameStatus');
  const cheatsModalTitle = document.getElementById('cheatsModalTitle');
  const cheatsModalList = document.getElementById('cheatsModalList');
  const closeCheatsModalBtn = document.getElementById('closeCheatsModalBtn');
  const closeCheatsModalBackdrop = document.getElementById('closeCheatsModalBackdrop');

  function openCheatsModal(gameKey) {
    const data = CHEATS_CATALOG[gameKey] || CHEATS_CATALOG.arc;
    if (modalGameThumb) modalGameThumb.src = data.image;
    if (modalGameThumb) modalGameThumb.alt = data.title;
    if (modalGameStatus) modalGameStatus.textContent = data.status;
    if (cheatsModalTitle) cheatsModalTitle.textContent = `${data.title} Cheats`;

    if (cheatsModalList) {
      cheatsModalList.innerHTML = '';
      data.products.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'cheat-card-item';
        let currentPlanKey = prod.plans['30d'] ? '30d' : Object.keys(prod.plans)[0];
        let currentPlan = prod.plans[currentPlanKey];

        const durationButtonsHtml = Object.keys(prod.plans).map(key => {
          const p = prod.plans[key];
          const activeClass = key === currentPlanKey ? 'active' : '';
          return `
            <button type="button" class="duration-btn ${activeClass}" data-key="${key}">
              <span class="duration-name">${p.name}</span>
              <span class="duration-price">$${p.price.toFixed(2)}</span>
            </button>
          `;
        }).join('');

        const featuresHtml = prod.features.map(f => `
          <span class="cheat-feature-pill">
            <i class="fa-solid fa-check"></i>
            <span>${f}</span>
          </span>
        `).join('');

        card.innerHTML = `
          <div>
            <div class="cheat-card-top">
              <div class="cheat-title-wrap">
                <h4>${prod.name}</h4>
                <div class="cheat-sub">${prod.edition}</div>
              </div>
              <span class="cheat-tag">${prod.tag}</span>
            </div>

            <div style="margin: 14px 0 16px;">
              <div class="cheat-features-list">
                ${featuresHtml}
              </div>
            </div>

            <div class="cheat-durations-row">
              ${durationButtonsHtml}
            </div>
          </div>

          <div class="cheat-pricing-actions">
            <div class="cheat-price-display">
              <span class="cheat-price-label">Price</span>
              <span class="cheat-price-val js-cheat-price">$${currentPlan.price.toFixed(2)}</span>
            </div>
            <div class="cheat-action-btns">
              <button type="button" class="cheat-add-cart-btn js-add-cart-btn">
                <i class="fa-solid fa-cart-plus"></i>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        `;

        const durBtns = card.querySelectorAll('.duration-btn');
        const priceValEl = card.querySelector('.js-cheat-price');

        durBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            durBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPlanKey = btn.getAttribute('data-key');
            currentPlan = prod.plans[currentPlanKey];
            if (priceValEl) priceValEl.textContent = `$${currentPlan.price.toFixed(2)}`;
          });
        });

        const addCartBtn = card.querySelector('.js-add-cart-btn');
        if (addCartBtn) {
          addCartBtn.addEventListener('click', () => {
            addToCart({
              id: prod.id,
              gameKey: gameKey,
              gameTitle: data.title,
              cheatName: prod.name,
              edition: prod.edition,
              durationKey: currentPlanKey,
              durationName: currentPlan.name,
              price: currentPlan.price,
              productId: currentPlan.productId || prod.productId || 856084,
              variantId: currentPlan.variantId || 1532957,
              image: data.image
            });
            closeCheatsModal();
            openCart();
          });
        }

        cheatsModalList.appendChild(card);
      });
    }

    if (gameCheatsModal) gameCheatsModal.classList.add('open');
  }

  function closeCheatsModal() {
    if (gameCheatsModal) gameCheatsModal.classList.remove('open');
  }

  if (closeCheatsModalBtn) closeCheatsModalBtn.addEventListener('click', closeCheatsModal);
  if (closeCheatsModalBackdrop) closeCheatsModalBackdrop.addEventListener('click', closeCheatsModal);

  const heroVideos = document.querySelectorAll('video.hero-game-video');
  heroVideos.forEach(v => {
    v.play().catch(() => {});
  });

  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    const key = card.getAttribute('data-game-key');
    const btn = card.querySelector('.game-card-btn');
    if (btn && key) {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript:')) {
          e.preventDefault();
          openCheatsModal(key);
        }
      });
    }
  });

  const searchRows = document.querySelectorAll('.search-result-row[data-game-key]');
  searchRows.forEach(row => {
    const key = row.getAttribute('data-game-key');
    if (key && CHEATS_CATALOG[key]) {
      row.addEventListener('click', (e) => {
        e.preventDefault();
        closeSearch();
        openCheatsModal(key);
      });
    }
  });

  const cartDrawer = document.getElementById('cartDrawer');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartDrawerBtn = document.getElementById('closeCartDrawerBtn');
  const closeCartBackdrop = document.getElementById('closeCartBackdrop');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartDrawerFooter = document.getElementById('cartDrawerFooter');
  const cartItemsCountText = document.getElementById('cartItemsCountText');
  const cartSubtotalVal = document.getElementById('cartSubtotalVal');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountVal = document.getElementById('cartDiscountVal');
  const cartTotalVal = document.getElementById('cartTotalVal');
  const promoCodeInput = document.getElementById('promoCodeInput') || document.getElementById('cartPromoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn') || document.getElementById('cartApplyPromoBtn');
  const promoFeedback = document.getElementById('promoFeedback') || document.getElementById('cartPromoMsg');
  const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
  const cartBrowseCheatsBtn = document.getElementById('cartBrowseCheatsBtn');
  const cartBadge = document.querySelector('.cart-badge');

  let discountRate = 0;

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('madcheats_cart_items')) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem('madcheats_cart_items', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(newItem) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === newItem.id && item.durationKey === newItem.durationKey);
    if (existingIndex > -1) {
      cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
    } else {
      cart.push({ ...newItem, qty: 1 });
    }
    saveCart(cart);
  }

  function updateQuantity(itemIndex, delta) {
    const cart = getCart();
    if (!cart[itemIndex]) return;
    cart[itemIndex].qty = (cart[itemIndex].qty || 1) + delta;
    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart(cart);
  }

  function removeItem(itemIndex) {
    const cart = getCart();
    cart.splice(itemIndex, 1);
    saveCart(cart);
  }

  function openCart() {
    window.location.href = 'cart.html';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('open');
  }

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', (e) => {
      if (cartToggleBtn.tagName.toLowerCase() !== 'a') {
        e.preventDefault();
        openCart();
      }
    });
  }

  if (closeCartDrawerBtn) closeCartDrawerBtn.addEventListener('click', closeCart);
  if (closeCartBackdrop) closeCartBackdrop.addEventListener('click', closeCart);

  if (cartBrowseCheatsBtn) {
    cartBrowseCheatsBtn.addEventListener('click', () => {
      closeCart();
      const target = document.getElementById('popular-cheats');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function updateCartUI() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, it) => acc + (it.qty || 1), 0);

    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (cartItemsCountText) {
      cartItemsCountText.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in cart`;
    }

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.style.display = 'none';
      if (cartEmptyState) cartEmptyState.style.display = 'flex';
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
      return;
    }

    cartItemsList.style.display = 'flex';
    if (cartEmptyState) cartEmptyState.style.display = 'none';
    if (cartDrawerFooter) cartDrawerFooter.style.display = 'flex';

    cartItemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemSub = item.price * (item.qty || 1);
      subtotal += itemSub;

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <img src="${item.image}" alt="${item.gameTitle}" class="cart-item-thumb">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.cheatName} &bull; ${item.gameTitle}</div>
          <span class="cart-item-plan">${item.durationName} License</span>
          <div class="cart-item-price-qty">
            <span class="cart-item-price">$${itemSub.toFixed(2)}</span>
            <div class="cart-qty-ctrls">
              <button type="button" class="cart-qty-btn js-qty-minus" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="cart-qty-num">${item.qty || 1}</span>
              <button type="button" class="cart-qty-btn js-qty-plus" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <button type="button" class="cart-item-del-btn js-del-item" aria-label="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;

      row.querySelector('.js-qty-minus').addEventListener('click', () => updateQuantity(index, -1));
      row.querySelector('.js-qty-plus').addEventListener('click', () => updateQuantity(index, 1));
      row.querySelector('.js-del-item').addEventListener('click', () => removeItem(index));

      cartItemsList.appendChild(row);
    });

    const discountAmount = subtotal * discountRate;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    if (cartSubtotalVal) cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartDiscountRow && cartDiscountVal) {
      if (discountRate > 0) {
        cartDiscountRow.style.display = 'flex';
        cartDiscountVal.textContent = `-$${discountAmount.toFixed(2)}`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }
    if (cartTotalVal) cartTotalVal.textContent = `$${finalTotal.toFixed(2)}`;
  }

  if (applyPromoBtn && promoCodeInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoCodeInput.value.trim().toUpperCase();
      if (code === 'MAD10' || code === 'ARCTIC' || code === 'PROMO') {
        discountRate = 0.10;
        if (promoFeedback) {
          promoFeedback.className = 'promo-feedback success';
          promoFeedback.textContent = 'Coupon applied: 10% discount added!';
        }
      } else if (code.length === 0) {
        discountRate = 0;
        if (promoFeedback) {
          promoFeedback.className = 'promo-feedback';
          promoFeedback.textContent = '';
        }
      } else {
        discountRate = 0;
        if (promoFeedback) {
          promoFeedback.className = 'promo-feedback error';
          promoFeedback.textContent = 'Invalid coupon code. Try MAD10';
        }
      }
      updateCartUI();
    });
  }

  const checkoutSuccessModal = document.getElementById('checkoutSuccessModal');
  const closeCheckoutSuccessBtn = document.getElementById('closeCheckoutSuccessBtn') || document.getElementById('closeSuccessModalBtn');
  const closeCheckoutSuccessBackdrop = document.getElementById('closeCheckoutSuccessBackdrop');
  const finishCheckoutBtn = document.getElementById('finishCheckoutBtn');
  const generatedLicenseKey = document.getElementById('generatedLicenseKey') || document.getElementById('successKeyDisplay');
  const copyLicenseBtn = document.getElementById('copyLicenseBtn') || document.getElementById('copyKeyBtn');

  function openCheckoutSuccess() {
    closeCart();
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
    const key = `MAD-${randomHex()}-${randomHex()}-${randomHex()}-CRUSADER`;
    if (generatedLicenseKey) generatedLicenseKey.textContent = key;
    if (checkoutSuccessModal) {
      checkoutSuccessModal.setAttribute('aria-hidden', 'false');
      checkoutSuccessModal.classList.add('open');
    }
  }

  function closeCheckoutSuccess() {
    if (checkoutSuccessModal) {
      checkoutSuccessModal.setAttribute('aria-hidden', 'true');
      checkoutSuccessModal.classList.remove('open');
    }
  }

  const SELLAUTH_CONFIG = {
    shopId: '269719',
    apiKey: '6169583|m657Xdip6yxBI1ZRo5B3jhQMVvNvrOtciCP43hM90fc3b021',
    apiEndpoint: 'https://api.sellauth.com',
    storeUrl: 'https://madcheats.net'
  };

  function resolveSellAuthItem(item) {
    if (item.productId && item.variantId) {
      return { productId: Number(item.productId), variantId: Number(item.variantId) };
    }
    if (item.gameKey && CHEATS_CATALOG[item.gameKey]) {
      const cat = CHEATS_CATALOG[item.gameKey];
      for (const prod of cat.products) {
        if (prod.plans) {
          for (const key of Object.keys(prod.plans)) {
            const plan = prod.plans[key];
            if (item.durationKey === key || item.durationName === plan.name) {
              return { productId: Number(plan.productId || prod.productId), variantId: Number(plan.variantId) };
            }
          }
        }
      }
      if (cat.products[0] && cat.products[0].plans) {
        const firstPlan = Object.values(cat.products[0].plans)[0];
        if (firstPlan && firstPlan.variantId) {
          return { productId: Number(firstPlan.productId || cat.products[0].productId), variantId: Number(firstPlan.variantId) };
        }
      }
    }
    return { productId: 884587, variantId: 1714586 };
  }

  async function initiateSellAuthCheckout(btnEl) {
    const cart = getCart();
    if (!cart || cart.length === 0) return;

    if (btnEl) {
      btnEl.disabled = true;
      btnEl.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Connecting to Checkout...</span>';
    }

    const sellAuthCart = cart.map(item => {
      const resolved = resolveSellAuthItem(item);
      return {
        productId: resolved.productId,
        variantId: resolved.variantId,
        quantity: Number(item.qty) || 1
      };
    });

    const payload = {
      cart: sellAuthCart,
      currency: 'USD',
      shopId: String(SELLAUTH_CONFIG.shopId),
      source: 'storefront'
    };

    try {
      const response = await fetch(`${SELLAUTH_CONFIG.apiEndpoint}/v1/shops/${SELLAUTH_CONFIG.shopId}/checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SELLAUTH_CONFIG.apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json().catch(() => null);

      if (resData && (resData.url || resData.invoice_url)) {
        localStorage.removeItem('madcheats_cart_items');
        window.location.href = resData.url || resData.invoice_url;
        return;
      }
    } catch (err) {
      console.warn('[SellAuth] Shop Checkout API fallback:', err);
    }

    try {
      const response2 = await fetch(`https://api-internal-3.sellauth.com/v1/checkout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData2 = await response2.json().catch(() => null);

      if (resData2 && (resData2.url || resData2.invoice_url)) {
        localStorage.removeItem('madcheats_cart_items');
        window.location.href = resData2.url || resData2.invoice_url;
        return;
      }
    } catch (err2) {
      console.warn('[SellAuth] Internal checkout error:', err2);
    }

    // Direct fallback to product page on MadCheats SellAuth store
    const firstItem = cart[0];
    const targetUrl = firstItem && firstItem.productId
      ? `${SELLAUTH_CONFIG.storeUrl}/product/${firstItem.productId}?variant=${firstItem.variantId || ''}`
      : `${SELLAUTH_CONFIG.storeUrl}/checkout`;

    if (btnEl) {
      btnEl.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> <span>Redirecting...</span>';
    }

    setTimeout(() => {
      localStorage.removeItem('madcheats_cart_items');
      window.location.href = targetUrl;
    }, 400);
  }

  async function fetchSellAuthProducts() {
    try {
      const res = await fetch(`${SELLAUTH_CONFIG.apiEndpoint}/v1/shops/${SELLAUTH_CONFIG.shopId}/products`, {
        headers: {
          'Authorization': `Bearer ${SELLAUTH_CONFIG.apiKey}`,
          'Accept': 'application/json'
        }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('[SellAuth] Could not fetch products directly from browser:', e);
    }
    return null;
  }

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      initiateSellAuthCheckout(cartCheckoutBtn);
    });
  }

  if (closeCheckoutSuccessBtn) closeCheckoutSuccessBtn.addEventListener('click', closeCheckoutSuccess);
  if (closeCheckoutSuccessBackdrop) closeCheckoutSuccessBackdrop.addEventListener('click', closeCheckoutSuccess);
  if (finishCheckoutBtn) finishCheckoutBtn.addEventListener('click', closeCheckoutSuccess);
  if (checkoutSuccessModal) {
    checkoutSuccessModal.addEventListener('click', (e) => {
      if (e.target === checkoutSuccessModal) closeCheckoutSuccess();
    });
  }

  if (copyLicenseBtn && generatedLicenseKey) {
    copyLicenseBtn.addEventListener('click', () => {
      const key = generatedLicenseKey.textContent;
      navigator.clipboard.writeText(key).then(() => {
        copyLicenseBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied!</span>';
        setTimeout(() => {
          copyLicenseBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Copy Key</span>';
        }, 2000);
      });
    });
  }

  window.MadCheatsCart = {
    getCart,
    saveCart,
    addToCart,
    removeFromCart: removeItem,
    updateQuantity,
    updateCartUI,
    openCart,
    closeCart,
    openCheckoutSuccess,
    closeCheckoutSuccess,
    checkout: initiateSellAuthCheckout
  };

  window.SellAuthIntegration = {
    config: SELLAUTH_CONFIG,
    initiateCheckout: initiateSellAuthCheckout,
    fetchProducts: fetchSellAuthProducts
  };

  const loaderNavBtns = document.querySelectorAll('.loader-nav-btn');
  const loaderPanels = document.querySelectorAll('.loader-panel');
  const loaderSubtabs = document.getElementById('loaderSubtabs');
  const loaderCrumbParent = document.getElementById('loaderCrumbParent');
  const loaderCrumbActive = document.getElementById('loaderCrumbActive');
  const loaderSubtabSilent = document.getElementById('loaderSubtabSilent');
  const loaderSubtabAimbot = document.getElementById('loaderSubtabAimbot');
  const panelAimbot = document.getElementById('panel-aimbot');
  const panelSilent = document.getElementById('panel-silent');
  const loaderCard = document.getElementById('loaderCard');
  const loaderFooterKey = document.querySelector('.loader-footer-key');
  const loaderRestoreBar = document.getElementById('loaderRestoreBar');

  const categoryMap = {
    aimbot: { cat: 'Combat', title: 'Aimbot' },
    players: { cat: 'Visuals', title: 'Players' },
    npcs: { cat: 'Visuals', title: 'NPCs' },
    world: { cat: 'Visuals', title: 'World' },
    oof: { cat: 'Utilities', title: 'OOF Arrows' },
    exploits: { cat: 'Utilities', title: 'Exploits' },
    misc: { cat: 'Utilities', title: 'Misc' }
  };

  if (loaderNavBtns.length > 0) {
    loaderNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        loaderNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (window.innerWidth <= 900) {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        const meta = categoryMap[tab] || { cat: 'Combat', title: tab };

        if (tab === 'aimbot') {
          if (loaderSubtabs) loaderSubtabs.style.display = 'flex';
          const isSilent = loaderSubtabSilent && loaderSubtabSilent.classList.contains('active');
          if (loaderCrumbParent) loaderCrumbParent.textContent = meta.cat;
          if (loaderCrumbActive) loaderCrumbActive.textContent = isSilent ? 'Silent Aim' : 'Aimbot';

          loaderPanels.forEach(p => p.classList.remove('active'));
          if (isSilent && panelSilent) {
            panelSilent.classList.add('active');
          } else if (panelAimbot) {
            panelAimbot.classList.add('active');
          }
        } else {
          if (loaderSubtabs) loaderSubtabs.style.display = 'none';
          if (loaderCrumbParent) loaderCrumbParent.textContent = meta.cat;
          if (loaderCrumbActive) loaderCrumbActive.textContent = meta.title;

          loaderPanels.forEach(p => p.classList.remove('active'));
          const target = document.getElementById(`panel-${tab}`);
          if (target) target.classList.add('active');
        }
      });
    });
  }

  if (loaderSubtabSilent && loaderSubtabAimbot) {
    loaderSubtabSilent.addEventListener('click', () => {
      loaderSubtabAimbot.classList.remove('active');
      loaderSubtabSilent.classList.add('active');
      if (loaderCrumbActive) loaderCrumbActive.textContent = 'Silent Aim';
      if (panelAimbot) panelAimbot.classList.remove('active');
      if (panelSilent) panelSilent.classList.add('active');
    });

    loaderSubtabAimbot.addEventListener('click', () => {
      loaderSubtabSilent.classList.remove('active');
      loaderSubtabAimbot.classList.add('active');
      if (loaderCrumbActive) loaderCrumbActive.textContent = 'Aimbot';
      if (panelSilent) panelSilent.classList.remove('active');
      if (panelAimbot) panelAimbot.classList.add('active');
    });
  }

  const loaderClickRows = document.querySelectorAll('.loader-toggle-row, .loader-feature-item, .loader-box-header');
  loaderClickRows.forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.closest('.loader-switch') || e.target.tagName === 'SELECT' || e.target.closest('.loader-select-wrap')) {
        return;
      }
      const cb = row.querySelector('input[type="checkbox"]');
      if (cb) {
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    });
  });

  const featureCheckboxes = document.querySelectorAll('.loader-feature-item input[type="checkbox"]');
  featureCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const item = cb.closest('.loader-feature-item');
      if (item) {
        if (cb.checked) {
          item.classList.add('highlighted');
        } else {
          item.classList.remove('highlighted');
        }
      }
    });
  });

  const loaderSelects = document.querySelectorAll('.loader-select');
  loaderSelects.forEach(sel => {
    sel.addEventListener('change', () => {
      sel.style.borderColor = '#ff4343';
      setTimeout(() => {
        sel.style.borderColor = '';
      }, 600);
    });
  });

  const fovSlider = document.getElementById('fovSlider');
  const fovVal = document.getElementById('fovVal');
  if (fovSlider && fovVal) {
    fovSlider.addEventListener('input', () => {
      fovVal.textContent = `${fovSlider.value}px`;
    });
  }

  const smoothSlider = document.getElementById('smoothSlider');
  const smoothVal = document.getElementById('smoothVal');
  if (smoothSlider && smoothVal) {
    smoothSlider.addEventListener('input', () => {
      smoothVal.textContent = smoothSlider.value;
    });
  }

  const silentFovSlider = document.getElementById('silentFovSlider');
  const silentFovVal = document.getElementById('silentFovVal');
  if (silentFovSlider && silentFovVal) {
    silentFovSlider.addEventListener('input', () => {
      silentFovVal.textContent = `${silentFovSlider.value}px`;
    });
  }

  const silentHitSlider = document.getElementById('silentHitSlider');
  const silentHitVal = document.getElementById('silentHitVal');
  if (silentHitSlider && silentHitVal) {
    silentHitSlider.addEventListener('input', () => {
      silentHitVal.textContent = `${silentHitSlider.value}%`;
    });
  }

  const arrowSizeSlider = document.getElementById('arrowSizeSlider');
  const arrowSizeVal = document.getElementById('arrowSizeVal');
  if (arrowSizeSlider && arrowSizeVal) {
    arrowSizeSlider.addEventListener('input', () => {
      arrowSizeVal.textContent = `${arrowSizeSlider.value}px`;
    });
  }

  function toggleLoaderMinimize() {
    if (!loaderCard) return;
    loaderCard.classList.toggle('is-minimized');
  }

  if (loaderFooterKey) {
    loaderFooterKey.style.cursor = 'pointer';
    loaderFooterKey.addEventListener('click', toggleLoaderMinimize);
  }

  if (loaderRestoreBar) {
    loaderRestoreBar.addEventListener('click', toggleLoaderMinimize);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Insert') {
      toggleLoaderMinimize();
    }
  });

  const loaderPill = document.querySelector('.loader-pill-status');
  if (loaderPill) {
    loaderPill.style.cursor = 'pointer';
    loaderPill.addEventListener('click', () => {
      loaderPill.style.borderColor = '#ff4343';
      loaderPill.style.color = '#fff';
      setTimeout(() => {
        loaderPill.style.borderColor = '';
        loaderPill.style.color = '';
      }, 700);
    });
  }

  const pingEl = document.querySelector('.loader-footer-meta strong.text-green');
  const fpsEl = document.querySelector('.loader-footer-meta strong.text-white');
  if (pingEl && fpsEl) {
    setInterval(() => {
      const ping = Math.floor(Math.random() * 5) + 22;
      const fps = Math.random() > 0.25 ? 144 : 143;
      pingEl.textContent = `${ping}ms`;
      fpsEl.textContent = `${fps}`;
    }, 3200);
  }

  if (getCart().length === 0 && !localStorage.getItem('madcheats_cart_initialized')) {
    localStorage.setItem('madcheats_cart_initialized', 'true');
    addToCart({
      id: 'arc-crusader',
      gameKey: 'arc',
      gameTitle: 'Arc Raiders',
      cheatName: 'Crusader',
      edition: 'Internal Combat Suite',
      durationKey: '30d',
      durationName: '30 Days',
      price: 49.99,
      image: 'assets/images/games/arc_raiders.png'
    });
  } else {
    updateCartUI();
  }
});
