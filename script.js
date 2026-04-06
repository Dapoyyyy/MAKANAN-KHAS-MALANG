// =============================================
// GANTI URL INI dengan URL Google Apps Script kamu
// Cara: buka Google Spreadsheet → Extensions → Apps Script
// Paste kode Apps Script di bawah, deploy sebagai Web App, copy URL-nya
// =============================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylu3db-PHgJqAlJmeXlhhT17H6WMKMgbGAU7OhqLFnAixZTKrGjwHtG4ygv4hRrwCS/exec";

// Data menu makanan khas Malang
const menuData = [
  {
    nama: "Bakso Malang",
    deskripsi: "Bakso kenyal dengan kuah kaldu sapi gurih, lengkap dengan mie dan tahu.",
    harga: 15000,
    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAukvd9bwkkxFm5Qj-uzn7WJPGPpKtHy4ePg&s"
  },
  {
    nama: "Cwie Mie Malang",
    deskripsi: "Mie kuning dengan topping ayam cincang, pangsit goreng, dan sayuran segar.",
    harga: 10000,
    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCklVdUoMwOs7DKBKWweZDLMe_PAw-JWYUg&s"
  },
  {
    nama: "Rawon",
    deskripsi: "Sup daging sapi hitam khas Jawa Timur dengan bumbu kluwek yang kaya rasa.",
    harga: 20000,
    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVfQaXC13XXkO5HllGKKz4eQUV1RwrUxrUw&s"
  },
  {
    nama: "Tahu Campur",
    deskripsi: "Tahu goreng, lontong, tauge, dan mie dengan kuah petis yang khas.",
    harga: 15000,
    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5Pi5Cc2gYJx7YsIbz3wdnYk-i_RC4x6Mtg&s"
  },
  {
    nama: "Soto Malang",
    deskripsi: "Soto bening dengan daging sapi, perkedel, dan taburan bawang goreng.",
    harga: 15000,
    gambar: "https://cdn-jpr.jawapos.com/images/15/2025/10/31/WhatsApp-Image-2025-10-31-at-204129-3685640433.jpeg"
  },
  {
    nama: "Nasi Pecel",
    deskripsi: "Nasi dengan sayuran rebus dan siraman bumbu kacang pedas manis khas Malang.",
    harga: 12000,
    gambar: "https://assets.unileversolutions.com/recipes-v2/258082.jpg"
  },
  {
    nama: "Rujak Cingur",
    deskripsi: "Irisan cingur sapi, sayuran, dan buah segar dengan bumbu petis hitam yang khas.",
    harga: 15000,
    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdJm3htHBuHds9PWpnoaGPbPf-YB6XHKRL1g&s"
  },
];

// Render kartu menu
function renderMenu() {
  const grid = document.getElementById("menu-grid");
  const select = document.getElementById("menu-pilihan");

  menuData.forEach((item, i) => {
    // Card
    const card = document.createElement("div");
    card.className = "card";
    card.classList.add("fade-in");
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${item.gambar}" alt="${item.nama}" onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(item.nama)}'">
        <div class="card-badge">🔥 Favorit</div>
      </div>
      <div class="card-body">
        <h3>${item.nama}</h3>
        <p>${item.deskripsi}</p>
        <div class="card-footer">
          <div class="price">Rp ${item.harga.toLocaleString("id-ID")} <span>/porsi</span></div>
          <button onclick="pilihMenu('${item.nama}')">🛒 Pesan</button>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Option di form
    const opt = document.createElement("option");
    opt.value = item.nama;
    opt.textContent = `${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}`;
    select.appendChild(opt);
  });

  // Trigger observer untuk kartu yang baru dirender
  document.querySelectorAll(".card.fade-in").forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    observer.observe(el);
  });
}

// Scroll ke form & pilih menu
function pilihMenu(nama) {
  document.getElementById("pesan").scrollIntoView({ behavior: "smooth" });
  document.getElementById("menu-pilihan").value = nama;
}

// Submit form ke Google Spreadsheet
async function submitPesanan(e) {
  e.preventDefault();
  const btn = document.querySelector('button[type="submit"]');
  const statusMsg = document.getElementById("status-msg");

  const data = {
    nama: document.getElementById("nama").value,
    telepon: document.getElementById("telepon").value,
    alamat: document.getElementById("alamat").value,
    menu: document.getElementById("menu-pilihan").value,
    jumlah: document.getElementById("jumlah").value,
    catatan: document.getElementById("catatan").value,
    waktu: new Date().toLocaleString("id-ID")
  };

  btn.disabled = true;
  btn.textContent = "Mengirim...";
  statusMsg.textContent = "";
  statusMsg.style.color = "#2e7d32";

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    statusMsg.textContent = "Pesanan berhasil dikirim! Kami akan segera menghubungi kamu.";
    document.getElementById("form-pesan").reset();
  } catch (err) {
    statusMsg.style.color = "#c62828";
    statusMsg.textContent = "Gagal mengirim pesanan. Coba lagi atau hubungi kami langsung.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Kirim Pesanan";
  }
}

// Scroll fade-in animation
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  document.getElementById("form-pesan").addEventListener("submit", submitPesanan);
  initScrollAnimation();
});
