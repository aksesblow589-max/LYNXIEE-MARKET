const CONFIG = {
    storeName: "Lynxee Market",
    ownerName: "Lynxiee- 599",
    avatar: "image/logo/logo.jpg",
    instagram: "",
    telegram: "",
    whatsappNumber: "6283847530372",
    adminNumber: "6283847530372",
    adminName: "Lynxiee- 599"
};

const SHOW_PRICE_PRODUCTS = ["Reaction Saluran", "Nokos Whatsapp", "Mentahan Desain"];

const banners = [
    "image/banner/banner1.jpg",
    "image/banner/banner1.jpg",
    "image/banner/banner1.jpg"
];

const products = [
    { id: 1, name: "Reaction Saluran", price: 1500, image: "image/produk/produk1.jpg", desc: "Memberikan Boost Reaction Ke Pesan Saluran Mu" },
    { id: 2, name: "Nokos Whatsapp", price: 7000, image: "image/produk/produk2.jpg", desc: "Nomor kosong whatsapp murah" },
    { id: 3, name: "Mentahan Desain", price: 5000, image: "image/produk/produk3.jpg", desc: "File Berisi mentahan mentahan untuk kebutuah mendesain" },
    { id: 4, name: "Apk pembuat Logo jb", price: 55000, image: "image/produk/produk4.jpg", desc: "Banyak templat untuk jualan jasa buat logo" },
    { id: 5, name: "Aplikasi premium", price: 65000, image: "image/produk/produk5.jpg", desc: "Beli akun apk premium" },
    { id: 6, name: "Top Up Diamond Ml", price: 1000, image: "image/produk/produk6.jpg", desc: "Top Up Diamond Ml" },
    { id: 7, name: "Top Up Diamond FF", price: 1000, image: "image/produk/produk7.jpg", desc: "Top Up Diamond FF" },
    { id: 8, name: "Suntik Sosmed", price: 1000, image: "image/produk/produk8.jpg", desc: "Boost Akun Sosmed mu" },
    { id: 9, name: "Panel Pterodactly", price: 1000, image: "image/produk/produk9.jpg", desc: "Server Untuk Hosting Bot" },
    { id: 10, name: "Reseler Panel", price: 1000, image: "image/produk/produk10.jpg", desc: "Bisa buat panel sepuasnya" },
    { id: 11, name: "web To Apk", price: 5000, image: "image/produk/produk11.jpg", desc: "Merubah Website Menjadi Apk" },
    { id: 12, name: "Pembuatan Logo Bebas Request", price: 5000, image: "image/produk/produk12.jpg", desc: "Seperti Logo JB" },
    { id: 13, name: "Jasa Pembuatan Website Simple", price: 20000, image: "image/produk/produk13.jpg", desc: "Seperti Web E -commerce Dll" }, 
    { Id: 14, name: "Top Up Game Mobile Legend", price: 50000, image: "image/produk/produk 14.jpg", desc: "Untuk Harga Chat Admin" }, 
    { id: 15, name: "Top Up Game Free Fire", price: 50000, image: "image/produk/produk15.jpg", desc: "Untuk Harga Chat Admin" }, 
    { Id: 16, name: "Jasa Hd Foto/Vidio", price: 5000, image: "image/produk/produk16.jpg", desc: "Gambar /Vidio Lebih Tanjam Dan Bagus" }, 
    { id: 17, name: "Jasa Status Hd Whatsapp", price: 5000, image: "image/produk/produk17.jpg", desc: "Hd Sw Tanpa Pecah Dan Anti Muter Terus" },
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let currentProduct = null;
let bannerInterval = null;

function playSound() {
    const audio = document.getElementById("clickSound");
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function addRipple(e, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

document.addEventListener("click", function(e) {
    const target = e.target.closest(".product-card, .feature-item, .social-icon, .btn-buy, .btn-cart, .menu-btn, .cart-badge, .menu-item, .modal-close, .btn-confirm");
    if (target && !target.closest(".modal-overlay")) {
        playSound();
        addRipple(e, target);
    }
});

function updateCartCount() {
    document.getElementById("cartCount").innerText = cart.reduce((sum, i) => sum + i.qty, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function showToast(message) {
    let toast = document.querySelector(".toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast-notification";
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function formatTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate();
    const year = now.getFullYear();
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${hours}.${minutes} • ${day} ${months[now.getMonth()]} ${year}`;
}

function shouldShowPrice(product) {
    return SHOW_PRICE_PRODUCTS.some(name => product.name.toLowerCase() === name.toLowerCase());
}

function sendWhatsAppMessage(product, qty = 1) {
    const timeString = formatTime();
    const showPrice = shouldShowPrice(product);
    const totalPrice = product.price * qty;
    
    let message = `Halo ${CONFIG.adminName} 👋

Saya ingin Order

📦 Detail Pesanan

• Produk: ${product.name}
• Jumlah: ${qty}`;
    
    if (showPrice) {
        message += `
• Harga: Rp${totalPrice.toLocaleString('id-ID')}`;
    }
    
    message += `
• Waktu: ${timeString}

Saya ingin melakukan pembelian untuk produk dengan detail di atas, mohon kirim qris nya, untuk saya melakukan pembayaran.🙏`;
    
    const url = `https://wa.me/${CONFIG.adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartCount();
    showToast(`${product.name} +1`);
}

function showPayment(product) {
    sendWhatsAppMessage(product, 1);
}

function initBanner() {
    const container = document.getElementById("bannerSlider");
    if (!container) return;
    container.innerHTML = "";
    banners.forEach((src, idx) => {
        const slide = document.createElement("div");
        slide.className = "banner-slide";
        if (idx === 0) slide.classList.add("active");
        slide.innerHTML = `<img src="${src}" alt="banner" onerror="this.src='image/logo/logo.jpg'">`;
        container.appendChild(slide);
    });
    const dotsDiv = document.createElement("div");
    dotsDiv.className = "banner-dots";
    banners.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "banner-dot";
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showBannerSlide(i));
        dotsDiv.appendChild(dot);
    });
    container.appendChild(dotsDiv);
    let current = 0;
    if (bannerInterval) clearInterval(bannerInterval);
    bannerInterval = setInterval(() => {
        current = (current + 1) % banners.length;
        showBannerSlide(current);
    }, 5000);
}

function showBannerSlide(index) {
    const slides = document.querySelectorAll(".banner-slide");
    const dots = document.querySelectorAll(".banner-dot");
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

function showProductDetail(product) {
    currentProduct = product;
    const modal = document.getElementById("productDetailModal");
    const content = document.getElementById("detailContent");
    const showPrice = shouldShowPrice(product);
    
    content.innerHTML = `
        <img src="${product.image}" class="detail-image" onerror="this.src='image/logo/logo.jpg'">
        <div class="detail-title">${product.name}</div>
        ${showPrice ? `<div class="detail-price">Rp ${product.price.toLocaleString('id-ID')}</div>` : ''}
        <div class="detail-desc" style="margin-bottom:20px;">${product.desc}</div>
        <button class="btn-buy" id="detailBuyBtn" style="width:100%; padding:14px; background: #25D366; border:none; border-radius:40px; color:white; font-weight:700;">Beli via WhatsApp</button>
    `;
    modal.classList.add("open");
    document.getElementById("modalOverlay").classList.add("active");
    document.getElementById("detailBuyBtn").onclick = () => { 
        sendWhatsAppMessage(product, 1);
        closeDetail(); 
    };
}

function closeDetail() {
    document.getElementById("productDetailModal").classList.remove("open");
    document.getElementById("modalOverlay").classList.remove("active");
}

function closePayment() {
    document.getElementById("paymentModal").classList.remove("open");
    document.getElementById("modalOverlay").classList.remove("active");
}

function showCart() {
    const main = document.getElementById("mainContent");
    if (cart.length === 0) {
        main.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center;">
                <i class="ri-shopping-cart-line" style="font-size: 80px; color: #8e95a5; margin-bottom: 20px;"></i>
                <p style="font-size: 16px; color: #8e95a5; margin-bottom: 24px;">Keranjang kosong</p>
                <button id="btnBackToShop" style="width: 200px; padding: 12px 24px; background: var(--accent); border: none; border-radius: 40px; color: white; font-weight: 600; cursor: pointer;">Kembali Belanja</button>
            </div>
        `;
        const backBtn = document.getElementById("btnBackToShop");
        if (backBtn) {
            backBtn.onclick = function(e) {
                e.stopPropagation();
                renderHome();
            };
        }
        return;
    }
    
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const showTotalPrice = cart.some(item => shouldShowPrice(item));
    
    main.innerHTML = `
        <div style="padding:20px 0;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
                <i class="ri-arrow-left-line" id="backHomeFromCart" style="font-size:24px; cursor:pointer;"></i>
                <h2 style="font-size:20px;">Keranjang Belanja</h2>
            </div>
            <div class="cart-items">
                ${cart.map(item => {
                    const showPrice = shouldShowPrice(item);
                    return `
                    <div class="cart-item">
                        <div>
                            <strong>${item.name}</strong><br>
                            ${showPrice ? `<small>Rp ${item.price.toLocaleString('id-ID')}</small>` : '<small>Hubungi Admin</small>'}
                        </div>
                        <div style="display:flex; align-items:center; gap:12px;">
                            <button class="cart-qty-minus" data-id="${item.id}" style="background:#2a2f38; border:none; width:32px; height:32px; border-radius:16px; cursor:pointer; font-size:16px; color:white;">-</button>
                            <span style="min-width:24px; text-align:center;">${item.qty}</span>
                            <button class="cart-qty-plus" data-id="${item.id}" style="background:#2a2f38; border:none; width:32px; height:32px; border-radius:16px; cursor:pointer; font-size:16px; color:white;">+</button>
                            <button class="cart-remove" data-id="${item.id}" style="background:#dc2626; border:none; width:32px; height:32px; border-radius:16px; cursor:pointer; color:white;"><i class="ri-delete-bin-line"></i></button>
                        </div>
                    </div>
                `}).join('')}
            </div>
            ${showTotalPrice ? `<div class="cart-total">Total: Rp ${total.toLocaleString('id-ID')}</div>` : ''}
            <button class="btn-buy" id="checkoutFromCart" style="width:100%; padding:14px;">Checkout via WhatsApp</button>
            <button id="backToShopBtn" style="width:100%; padding:14px; margin-top:12px; background:var(--bg-elevated); border:1px solid var(--border); border-radius:40px; color:white; cursor:pointer;">Kembali Belanja</button>
        </div>
    `;
    
    const backHomeFromCart = document.getElementById("backHomeFromCart");
if (backHomeFromCart) { backHomeFromCart.addEventListener("click", () => renderHome());
}
    document.getElementById("backToShopBtn")?.addEventListener("click", () => renderHome());
    
    document.querySelectorAll(".cart-qty-minus").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item.qty > 1) item.qty--;
            else cart = cart.filter(i => i.id !== id);
            updateCartCount();
            showCart();
        });
    });
    
    document.querySelectorAll(".cart-qty-plus").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const item = cart.find(i => i.id === id);
            item.qty++;
            updateCartCount();
            showCart();
        });
    });
    
    document.querySelectorAll(".cart-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            cart = cart.filter(i => i.id !== id);
            updateCartCount();
            showCart();
        });
    });
    
    document.getElementById("checkoutFromCart")?.addEventListener("click", () => {
        const timeString = formatTime();
        const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const showTotalPrice = cart.some(item => shouldShowPrice(item));
        
        let productList = "";
        for (let item of cart) {
            const showPrice = shouldShowPrice(item);
            const itemTotal = item.price * item.qty;
            productList += `• ${item.name} (${item.qty}x)`;
            if (showPrice) {
                productList += ` - Rp${itemTotal.toLocaleString('id-ID')}`;
            }
            productList += `\n`;
        }
        
        let message = `Halo ${CONFIG.adminName} 👋

Saya ingin Order

📦 Detail Pesanan

${productList}`;
        
        if (showTotalPrice) {
            message += `\n• Total Harga: Rp${total.toLocaleString('id-ID')}`;
        }
        
        message += `
• Waktu: ${timeString}

Saya ingin melakukan pembelian untuk produk dengan detail di atas, mohon kirim qris nya, untuk saya melakukan pembayaran.🙏`;
        
        window.open(`https://wa.me/${CONFIG.adminNumber}?text=${encodeURIComponent(message)}`, "_blank");
        cart = [];
        updateCartCount();
        renderHome();
        showToast("Pesanan dikirim ke admin via WhatsApp!");
    });
}

function showGuide() {
    const main = document.getElementById("mainContent");
    main.innerHTML = `
        <div style="padding:20px 0;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
                <i class="ri-arrow-left-line" id="backHomeGuide" style="font-size:24px; cursor:pointer;"></i>
                <h2 style="font-size:20px;">Panduan Belanja</h2>
            </div>
            <div style="background:#1a1d24; border-radius:24px; padding:24px;">
                <div style="margin-bottom:20px;"><span style="background:#06b6d4; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:14px; margin-right:12px;">1</span> Pilih produk yang ingin dibeli</div>
                <div style="margin-bottom:20px;"><span style="background:#06b6d4; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:14px; margin-right:12px;">2</span> Klik "Beli via WhatsApp" atau tambah ke keranjang</div>
                <div style="margin-bottom:20px;"><span style="background:#06b6d4; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:14px; margin-right:12px;">3</span> Pesan akan otomatis terkirim ke admin</div>
                <div style="margin-bottom:20px;"><span style="background:#06b6d4; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:14px; margin-right:12px;">4</span> Admin akan membalas dengan QRIS pembayaran</div>
                <div><span style="background:#06b6d4; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:14px; margin-right:12px;">5</span> Lakukan pembayaran dan produk akan diproses</div>
            </div>
        </div>
    `;
    document.getElementById("backHomeGuide")?.addEventListener("click", () => renderHome());
}

function renderHome() {
    const main = document.getElementById("mainContent");
    main.innerHTML = `
        <div class="profile-section">
            <img src="${CONFIG.avatar}" class="profile-avatar" onerror="this.src='image/logo/logo.jpg'">
            <div class="profile-info">
                <h2>${CONFIG.storeName}</h2>
                <p><span class="status-badge"></span> Online & Terpercaya</p>
                <div class="social-links">
                    <a href="${CONFIG.instagram}" target="_blank" class="social-icon"><i class="ri-instagram-line"></i></a>
                    <a href="${CONFIG.telegram}" target="_blank" class="social-icon"><i class="ri-telegram-line"></i></a>
                    <a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" class="social-icon"><i class="ri-whatsapp-line"></i></a>
                </div>
            </div>
        </div>
        <div class="banner-slider" id="bannerSlider"></div>
        <div class="marquee">
            <div class="marquee-text">PROMO SPESIAL CASHBACK 10 UNTUK PEMBELIAN PERTAMA   GARANSI 100 AMAN   LAYANAN 24 JAM   HUBUNGI ADMIN JIKA ADA KENDALA</div>
        </div>
        <div class="section-title"><i class="ri-shopping-bag-3-line"></i> Produk Kami</div>
        <div class="products-grid" id="productsGrid"></div>
        <div class="feature-grid">
            <div class="feature-item"><i class="ri-flashlight-line feature-icon"></i><div class="feature-text"><h5>Proses Cepat</h5><p>2-5 menit</p></div></div>
            <div class="feature-item"><i class="ri-shield-check-line feature-icon"></i><div class="feature-text"><h5>Garansi 100</h5><p>Refund jika gagal</p></div></div>
            <div class="feature-item"><i class="ri-customer-service-2-line feature-icon"></i><div class="feature-text"><h5>Support 24/7</h5><p>Admin siap bantu</p></div></div>
        </div>
        <div class="promo-card"><h4>PROMO CASHBACK 10</h4><p>Khusus pengguna baru transaksi pertama</p><i class="ri-discount-line promo-deco"></i></div>
    `;

    const grid = document.getElementById("productsGrid");
    grid.innerHTML = products.map(p => {
        const showPrice = shouldShowPrice(p);
        return `
        <div class="product-card" data-id="${p.id}">
            <img src="${p.image}" class="product-image" onerror="this.src='image/logo/logo.jpg'">
            <div class="product-title">${p.name}</div>
            ${showPrice ? `<div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>` : `<div class="product-price" style="color: var(--warning);">Hubungi Admin</div>`}
            <div class="product-actions">
                <button class="btn-buy" data-product='${JSON.stringify(p)}'>Beli</button>
                <button class="btn-cart" data-product='${JSON.stringify(p)}'><i class="ri-add-line"></i> Keranjang</button>
            </div>
        </div>
    `}).join("");

    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-buy") || e.target.classList.contains("btn-cart")) return;
            const id = parseInt(card.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) showProductDetail(product);
        });
    });

    document.querySelectorAll(".btn-buy").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const product = JSON.parse(btn.dataset.product);
            sendWhatsAppMessage(product, 1);
        });
    });

    document.querySelectorAll(".btn-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const product = JSON.parse(btn.dataset.product);
            addToCart(product);
        });
    });

    initBanner();
}

function initMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("menuSidebar");
    const overlay = document.getElementById("modalOverlay");
    const closeMenu = document.getElementById("closeMenu");
    
    function openMenu() {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    }
    
    function closeMenuPanel() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    }
    
    menuBtn.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeMenuPanel);
    overlay.addEventListener("click", closeMenuPanel);
    
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            const nav = item.dataset.nav;
            if (nav === "home") renderHome();
            else if (nav === "cart") showCart();
            else if (nav === "guide") showGuide();
            closeMenuPanel();
            document.getElementById("storeNameHeader").innerText = CONFIG.storeName;
        });
    });
}

function initModals() {
    document.getElementById("closeDetail").addEventListener("click", closeDetail);
    document.getElementById("closePayment").addEventListener("click", closePayment);
    
    const cartBadge = document.getElementById("cartBadge");
    if (cartBadge) {
        cartBadge.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            showCart();
        });
    }
}

document.getElementById("storeNameHeader").innerText = CONFIG.storeName;
renderHome();
initMenu();
initModals();
updateCartCount();