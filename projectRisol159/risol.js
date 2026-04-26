
// ===== DATA =====
const varian = [
  { img: "img/mayo.jpeg", nama: "Risol Mayo", deskription: "Mayo | Telur | Sosis", rasa: "gurih", harga: 3000 },
  { img: "img/mentai.jpeg", nama: "Risol Mentai", deskription: "Mentai | Telur | Sosis", rasa: "umami", harga: 3000 },
  { img: "img/Ayam.jpeg", nama: "Risol Ayam", deskription: "Ayam | Bumbu Pedas", rasa: "pedas", harga: 3000 },
  { img: "img/coklat.jpeg", nama: "Risol Coklat", deskription: "Coklat | Pisang", rasa: "manis", harga: 3000 },
  { img: "img/matcha.jpg", nama: "Risol Matcha", deskription: "Matcha | Keju", rasa: "manis", harga: 3000 },
];

// ===== STATE =====
let currentFilter = "semua";

// load keranjang dari localStorage
const keranjang = JSON.parse(localStorage.getItem("keranjang")) ||
  varian.reduce((acc, item) => {
    acc[item.nama] = 0;
    return acc;
  }, {});

// ===== SAVE =====
function saveKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

// ===== TOTAL =====
function hitungTotal() {
  return Object.entries(keranjang).reduce((total, [nama, jumlah]) => {
    const item = varian.find(v => v.nama === nama);
    return total + item.harga * jumlah;
  }, 0);
}

// ===== TOAST =====
function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}


// ===== RENDER =====
function render(data) {
  document.querySelector("#menu-container").innerHTML = data
    .map(item => `
      <div class="menu-item">
        <img src="${item.img}" />

        <div class="info">
          <h4>${item.nama}</h4>
          <p>${item.deskription}</p>
          <p class="harga">Rp${item.harga.toLocaleString()}</p>
        </div>

        <div class="control">
          <button onclick="ubahJumlah('${item.nama}', -1)">−</button>
          <span>${keranjang[item.nama]}</span>
          <button onclick="ubahJumlah('${item.nama}', 1)">+</button>
        </div>
      </div>
    `)
    .join("");

  document.querySelector("#total-box").textContent =
    "Total: Rp" + hitungTotal().toLocaleString();
}

// ===== FILTER =====
function filterMenu(kategori) {
  currentFilter = kategori;

  // active button
  document.querySelectorAll(".filter-btn button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-filter="${kategori}"]`).classList.add("active");

  const hasil =
    kategori === "semua"
      ? varian
      : varian.filter(item => item.rasa === kategori);

  render(hasil);
}

// ===== FILTER EVENT =====
document.querySelector(".filter-btn").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  filterMenu(e.target.dataset.filter);
});

// ===== UPDATE JUMLAH =====
function ubahJumlah(nama, angka) {
  keranjang[nama] += angka;
  if (keranjang[nama] < 0) keranjang[nama] = 0;

  saveKeranjang();
  filterMenu(currentFilter);

  showToast("Keranjang diperbarui");
}

// ===== WHATSAPP =====
function pesanWA() {
  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();

  if (!nama || !kelas) {
    showToast("Isi nama & kelas dulu!");
    return;
  }

  const items = Object.entries(keranjang)
    .filter(([_, jumlah]) => jumlah > 0);

  if (items.length === 0) {
    showToast("Keranjang kosong!");
    return;
  }

  let pesan = `*ORDER RISOL PEMUDA 159* 🍽️\n\n`;
  pesan += `Nama  : ${nama}\n`;
  pesan += `Kelas : ${kelas}\n\n`;

  items.forEach(([namaItem, jumlah]) => {
    const item = varian.find(v => v.nama === namaItem);
    pesan += `• ${namaItem} x${jumlah} = Rp${(item.harga * jumlah).toLocaleString()}\n`;
  });

  pesan += `\nTotal: *Rp${hitungTotal().toLocaleString()}*`;

  window.open(`https://wa.me/6287811165612?text=${encodeURIComponent(pesan)}`);

  // reset
  document.getElementById("nama").value = "";
  document.getElementById("kelas").value = "";
}

// ===== INIT =====
render(varian);

