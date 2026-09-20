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

  const dragMenu = document.getElementById('draggableMenu');
  const dragHeader = document.getElementById('menuDragHeader');
  const heroStage = document.getElementById('heroStage');

  if (dragMenu && dragHeader && heroStage) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const onStart = (e) => {
      isDragging = true;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      initialLeft = dragMenu.offsetLeft;
      initialTop = dragMenu.offsetTop;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      const dx = clientX - startX;
      const dy = clientY - startY;

      const stageRect = heroStage.getBoundingClientRect();
      const menuWidth = dragMenu.offsetWidth;
      const menuHeight = dragMenu.offsetHeight;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      const maxLeft = stageRect.width - menuWidth - 10;
      const maxTop = stageRect.height - menuHeight - 10;

      newLeft = Math.max(10, Math.min(newLeft, maxLeft));
      newTop = Math.max(10, Math.min(newTop, maxTop));

      dragMenu.style.left = `${newLeft}px`;
      dragMenu.style.top = `${newTop}px`;
      dragMenu.style.right = 'auto';
    };

    const onEnd = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    dragHeader.addEventListener('mousedown', onStart);
    dragHeader.addEventListener('touchstart', onStart, { passive: true });
  }

  const panelTabs = document.querySelectorAll('.panel-tab');
  panelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      panelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  const toggles = document.querySelectorAll('.toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  const fovSlider = document.getElementById('fovSlider');
  const fovVal = document.getElementById('fovVal');
  const hudFov = document.getElementById('hudFov');

  if (fovSlider && fovVal) {
    fovSlider.addEventListener('input', (e) => {
      fovVal.textContent = `${e.target.value}°`;
      if (hudFov) {
        const size = e.target.value * 2.2;
        hudFov.style.width = `${size}px`;
        hudFov.style.height = `${size}px`;
      }
    });
  }

  const smoothSlider = document.getElementById('smoothSlider');
  const smoothVal = document.getElementById('smoothVal');
  if (smoothSlider && smoothVal) {
    smoothSlider.addEventListener('input', (e) => {
      smoothVal.textContent = e.target.value;
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
          id: 'arc-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          features: ['Memory Aimbot & Smoothing', '3D Bone ESP & Health Bar', 'Streamproof OBS/Discord', 'Recoil Control & Spread Mod'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'arc-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Ring-0 Stealth Injection', 'Silent Aim & Bullet Prediction', 'Visible Check & Chams', '2D Radar & Threat Alert'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'arc-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['2nd PC DMA Hardware Capable', 'Pure Read-Only Engine', 'Standalone Web Radar', 'Custom Item & Enemy ESP'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'arc-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Unique Polymorphic Binary', 'Custom Driver Per User', 'Humanized Aim Curve', 'Integrated HWID Spoofer'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
        }
      ]
    },
    rust: {
      title: 'Rust',
      image: 'assets/images/games/rust.png',
      status: 'EAC & Cerberus Undetected',
      products: [
        {
          id: 'rust-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          features: ['Silent Aim & Bullet Drop Assist', 'Player & Sleeper ESP', 'Ore, Node & Crate ESP', 'No Recoil & No Sway'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'rust-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Kernel Driver Bypass', 'Predictive Heli & Player Aim', 'Raid ESP & Tool Cupboard ESP', 'Admin Flags & Debug Camera'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'rust-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['Full DMA Hardware Support', 'Web Map Radar on Phone', 'Loot & Monument Tracker', 'Streamproof Overlay'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'rust-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Private Build (Limited Slots)', 'Always Headshot Silent Curve', 'Full Base Radar & Trap Warning', 'Built-in Hardware Spoofer'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
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
          features: ['Magic Bullet & Vector Aim', 'Full Skeleton & Trap ESP', '100% Streamproof', 'No Recoil & Spread 0%'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'r6s-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Hypervisor Level Injection', 'Silent Aim Through Soft Walls', 'Operator & Gadget Glow ESP', 'Instant Knife & Run and Shoot'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'r6s-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['External Memory Reading', 'Hardware DMA Compatible', 'Custom 2D Radar View', 'Zero Memory Footprint'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'r6s-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Private Slot Security', 'Wallbang Prediction & Penetration', 'Enemy View Angles & Health', 'Automatic HWID Cleaner'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
        }
      ]
    },
    wardogs: {
      title: 'Wardogs',
      image: 'assets/images/games/wardogs.png',
      status: 'Ring-0 Hypervisor • Undetected',
      products: [
        {
          id: 'wd-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          features: ['Precision Smooth Aimbot', '3D Box & Distance ESP', 'Streamproof Capture Mode', 'Recoil Compensator'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'wd-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Kernel Driver Stealth', 'Target Lock & Prediction', 'Visible Check Color Swapping', 'Threat Radar Mini-Map'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'wd-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['Hardware DMA Protocol', 'Overlay Stream Shield', 'Loot & Player Tracers', 'Read-Only Integrity'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'wd-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Private Cryptographic Binary', 'Dynamic FOV & Bone Target', 'Full Item & Equipment ESP', 'Built-in HWID Spoofer'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
        }
      ]
    },
    apex: {
      title: 'Apex Legends',
      image: 'assets/images/games/apex.png',
      status: 'EAC Ring-0 Undetected',
      products: [
        {
          id: 'apex-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          features: ['Smooth Humanized Aimbot', 'Glow & Skeleton ESP', 'Shield & Health Bars', 'No Sway & No Recoil'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'apex-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Silent Aim with Drop/Speed Comp', 'Loot ESP with Tier Colors', 'Spectator Warning System', 'Auto Superglide & Bunny Hop'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'apex-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['2nd PC DMA Hardware Mode', 'Web Radar for Mobile/Tablet', 'Streamer Mode Overlay', 'Zero Memory Writing'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'apex-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Private Slot Architecture', 'Instant Target Switch & Curve', 'Full Distance & Legend Tag ESP', 'Integrated Clean HWID Spoofer'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
        }
      ]
    },
    fortnite: {
      title: 'Fortnite',
      image: 'assets/images/games/fortnite.png',
      status: 'BattlEye & EAC Bypass Undetected',
      products: [
        {
          id: 'fn-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          features: ['Memory Silent Aim & Triggerbot', 'Player Box & Skeleton ESP', 'Loot Chest & Rarity ESP', '100% Streamproof'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'fn-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Kernel Driver Injection', 'Weak Point Aim & Instant Reset', 'Vehicle & Supply Drop ESP', 'Radar & Visible Check'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'fn-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['External DMA 2nd PC Support', 'Phone Browser Mini-Map', 'No Memory Modifications', 'Streamer Protected Mode'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'fn-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Private Build per Customer', 'Unmatched Smoothing & FOV', 'Snaplines & Directional Arrows', 'Hardware Spoofer Included'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
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
          features: ['Ricochet Safe Silent Aim', 'Bone Skeleton & Box ESP', 'Full Streamproof OBS', 'Controller & KBM Support'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'cod-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Hypervisor Stealth Driver', 'Auto Prediction & Velocity', 'Loot & Killstreak ESP', 'Constant UAV Radar'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'cod-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['Hardware DMA Reading', 'External Browser Radar', 'Zero In-Memory Footprint', 'Shadowplay & Discord Safe'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'cod-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Private Ring-0 Kernel Slot', 'Humanized Aim Accelerations', 'Gun & Equipment ESP', 'Built-in Permanent Spoofer'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
        }
      ]
    },
    valorant: {
      title: 'Valorant',
      image: 'assets/images/games/valorant.png',
      status: 'Vanguard Ring-0 Undetected',
      products: [
        {
          id: 'val-crusader',
          name: 'Crusader',
          edition: 'Internal Combat Suite',
          tag: 'Most Popular',
          features: ['Hyper-Safe Visible Aimbot', 'Player Box & Health Bar', 'Streamproof Capture', 'Triggerbot with Delay'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'val-krush',
          name: 'Krush',
          edition: 'Kernel Hypervisor V2',
          tag: 'Kernel V2',
          features: ['Hypervisor Vanguard Bypass', 'RCS Recoil Control System', 'Spike & Ability Timer ESP', 'Chams with Visible Check'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'val-unnamed',
          name: 'Unnamed',
          edition: 'External DMA / Streamproof',
          tag: 'DMA Ready',
          features: ['DMA Hardware Card Capable', 'Secondary PC Display Only', 'Zero Anti-Cheat Interception', 'Full Streamproof Protection'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'val-ancient',
          name: 'Ancient',
          edition: 'Private Ring-0 Elite',
          tag: 'Private Slots',
          features: ['Invite/Private Slot Only', 'Human Curve Mouse Smoothing', 'Agent Name & Weapon ESP', 'TPM 2.0 / SecureBoot Spoofer'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
        }
      ]
    },
    spoofer: {
      title: 'HWID Spoofer',
      image: 'assets/images/games/spoofer.png',
      status: 'Kernel Virtualizer • EAC/BE/Ricochet/Vanguard Safe',
      products: [
        {
          id: 'sp-crusader',
          name: 'Crusader',
          edition: 'Temp & Perm Spoofer',
          tag: 'Most Popular',
          features: ['Disk & Volume Serial Randomizer', 'NIC MAC Address Cloaking', 'Motherboard BIOS Spoof', 'Single-Click Spoof'],
          plans: { '1d': { name: '1 Day', price: 6.99 }, '7d': { name: '7 Days', price: 24.99 }, '30d': { name: '30 Days', price: 49.99 }, 'life': { name: 'Lifetime', price: 119.99 } }
        },
        {
          id: 'sp-krush',
          name: 'Krush',
          edition: 'Kernel Virtualizer V2',
          tag: 'Kernel V2',
          features: ['Ring-0 Hardware Emulation', 'Registry & Trace Cleaner', 'Monitor Serial Number Spoof', 'Automatic Windows Clean'],
          plans: { '1d': { name: '1 Day', price: 7.99 }, '7d': { name: '7 Days', price: 27.99 }, '30d': { name: '30 Days', price: 54.99 }, 'life': { name: 'Lifetime', price: 129.99 } }
        },
        {
          id: 'sp-unnamed',
          name: 'Unnamed',
          edition: 'DMA Hardware Virtualizer',
          tag: 'DMA Ready',
          features: ['DMA PCIe Device ID Spoof', 'Flashable Firmware Safe', 'Network Adapter Virtualization', 'Tournament Mode'],
          plans: { '1d': { name: '1 Day', price: 8.99 }, '7d': { name: '7 Days', price: 29.99 }, '30d': { name: '30 Days', price: 59.99 }, 'life': { name: 'Lifetime', price: 139.99 } }
        },
        {
          id: 'sp-ancient',
          name: 'Ancient',
          edition: 'Permanent Ring-0 Elite Spoofer',
          tag: 'Private Slots',
          features: ['Permanent BIOS & SMBIOS Rewrite', 'TPM 2.0 & SecureBoot Cloak', 'ARP & IP Routing Shield', 'Zero Ban Reversal Record'],
          plans: { '1d': { name: '1 Day', price: 9.99 }, '7d': { name: '7 Days', price: 34.99 }, '30d': { name: '30 Days', price: 69.99 }, 'life': { name: 'Lifetime', price: 159.99 } }
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
        let currentPlanKey = '30d';
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
    const btn = card.querySelector('button.game-card-btn');
    if (btn && key) {
      btn.addEventListener('click', () => openCheatsModal(key));
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

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) return;
      closeCart();
      openCheckoutSuccess();
      localStorage.removeItem('madcheats_cart_items');
      updateCartUI();
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
    closeCheckoutSuccess
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

  const titleMap = {
    aimbot: 'Aimbot',
    players: 'Players',
    npcs: 'NPCs',
    world: 'World',
    oof: 'OOF Arrows',
    exploits: 'Exploits',
    misc: 'Misc'
  };

  if (loaderNavBtns.length > 0) {
    loaderNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        loaderNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (tab === 'aimbot') {
          if (loaderSubtabs) loaderSubtabs.style.display = 'flex';
          const isSilent = loaderSubtabSilent && loaderSubtabSilent.classList.contains('active');
          if (loaderCrumbParent) loaderCrumbParent.textContent = 'Aimbot';
          if (loaderCrumbActive) loaderCrumbActive.textContent = isSilent ? 'Silent Aim' : 'Aimbot';

          loaderPanels.forEach(p => p.classList.remove('active'));
          if (isSilent && panelSilent) {
            panelSilent.classList.add('active');
          } else if (panelAimbot) {
            panelAimbot.classList.add('active');
          }
        } else {
          if (loaderSubtabs) loaderSubtabs.style.display = 'none';
          const name = titleMap[tab] || tab;
          if (loaderCrumbParent) loaderCrumbParent.textContent = name;
          if (loaderCrumbActive) loaderCrumbActive.textContent = name;

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
