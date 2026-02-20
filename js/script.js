// Variabel Global
let rilosData = [];
const wheel = document.getElementById("wheel");
const wheelContainer = document.querySelector(".wheel-container");
const anglePerItem = 15; // Jarak sudut antar menu
let wheelItems = [];

// Variabel Dragging (Geser)
let currentRotation = 0;
let isDragging = false;
let isDragged = false;
let startX = 0;
let startRotation = 0;

// --- LOGIKA HAMBURGER MENU ---
function toggleMenu() {
  document.getElementById("side-menu").classList.toggle("active");
}

// --- AMBIL DATA DARI JSON ---
// Membaca file data.json yang sudah kamu buat
fetch("assets/db/data.json")
  .then((response) => response.json())
  .then((data) => {
    rilosData = data;
    initWheel(); // Bangun roda lingkarannya setelah data sukses diambil
  })
  .catch((error) => console.error("Gagal mengambil data JSON:", error));

// --- LOGIKA RODA & DRAG ---
function initWheel() {
  // Cegah error jika script ini berjalan di halaman about.html
  if (!wheel) return;

  // Sapu bersih roda sebelum diisi (Mencegah elemen ganda)
  wheel.innerHTML = "";
  wheelItems = [];

  // Looping data dari JSON untuk membuat menu
  rilosData.forEach((item, index) => {
    const wheelItem = document.createElement("div");
    wheelItem.className = "wheel-item";

    // Jari-jari lingkaran raksasa kita sekarang adalah 600px
    wheelItem.style.transform = `rotate(${index * anglePerItem}deg) translateY(-600px)`;

    wheelItem.innerHTML = `
            <div class="item-content" id="content-${index}">
                <img src="${item.iconImg}" alt="${item.name}">
                <span>${item.name}</span>
            </div>
        `;

    // Fungsi klik pintar: Hanya berjalan jika MURNI KLIK (tidak sedang digeser)
    wheelItem.onclick = () => {
      if (!isDragged) selectMenu(index);
    };

    wheel.appendChild(wheelItem);
    wheelItems.push(wheelItem);
  });

  // Panggil menu pertama sebagai tampilan default awal
  selectMenu(0);

  // Event Listener Geser Kursor (Desktop)
  wheelContainer.addEventListener("mousedown", dragStart);
  window.addEventListener("mousemove", dragMove);
  window.addEventListener("mouseup", dragEnd);
  wheelContainer.addEventListener("mouseleave", dragEnd); // Amankan jika kursor keluar area

  // Event Listener Layar Sentuh (Mobile)
  wheelContainer.addEventListener("touchstart", dragStart, { passive: true });
  window.addEventListener("touchmove", dragMove, { passive: false });
  window.addEventListener("touchend", dragEnd);
}

// Fungsi mendeteksi posisi X (Bisa baca kursor atau jari)
function getX(e) {
  return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
}

function dragStart(e) {
  isDragging = true;
  isDragged = false;
  startX = getX(e);
  startRotation = currentRotation;

  // Matikan efek transisi (animasi) sesaat agar roda langsung menempel ke tangan/kursor
  wheel.style.transition = "none";
  wheelItems.forEach((item, index) => {
    document.getElementById(`content-${index}`).style.transition = "none";
  });
}

function dragMove(e) {
  if (!isDragging) return;
  isDragged = true; // Tandai bahwa user sedang melakukan proses "geser"

  const currentX = getX(e);
  const deltaX = currentX - startX;

  // Sensitivitas gesekan (0.15). Bisa diubah jika terasa terlalu cepat/lambat
  currentRotation = startRotation + deltaX * 0.15;

  // ==========================================
  // PEMBATAS ROTASI (CLAMP LOGIC)
  // ==========================================
  const maxRot = 0; // Batas mentok kiri (Menu pertama / Index 0)
  const minRot = -((rilosData.length - 1) * anglePerItem); // Batas mentok kanan (Menu Terakhir)

  if (currentRotation > maxRot) currentRotation = maxRot;
  if (currentRotation < minRot) currentRotation = minRot;
  // ==========================================

  wheel.style.transform = `rotate(${currentRotation}deg)`;
  updateIconsCounterRotation(currentRotation);
}

function dragEnd() {
  if (!isDragging) return;
  isDragging = false;

  // Nyalakan kembali transisi untuk efek magnet/membal yang mulus
  wheel.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  wheelItems.forEach((item, index) => {
    document.getElementById(`content-${index}`).style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  });

  // Magnet Otomatis: Arahkan ke menu terdekat saat user melepaskan geseran
  if (isDragged) {
    let closestIndex = Math.round(Math.abs(currentRotation / anglePerItem));
    if (closestIndex < 0) closestIndex = 0;
    if (closestIndex >= rilosData.length) closestIndex = rilosData.length - 1;
    selectMenu(closestIndex);
  }

  // Jeda sedikit untuk mereset status drag agar tidak bentrok dengan klik
  setTimeout(() => {
    isDragged = false;
  }, 50);
}

// Fungsi memutar balik gambar & teks agar tidak terbalik saat roda diputar
function updateIconsCounterRotation(wheelRot) {
  wheelItems.forEach((item, index) => {
    const content = document.getElementById(`content-${index}`);
    const counterRotation = -(wheelRot + index * anglePerItem);
    content.style.transform = `rotate(${counterRotation}deg)`;
  });
}

// Fungsi utama mengubah seluruh tampilan berdasarkan menu yang dipilih
function selectMenu(selectedIndex) {
  const data = rilosData[selectedIndex];
  currentRotation = -(selectedIndex * anglePerItem);

  // Putar roda ke target
  wheel.style.transform = `rotate(${currentRotation}deg)`;
  updateIconsCounterRotation(currentRotation);

  // Update Class 'active' agar ikon yang terpilih membesar
  wheelItems.forEach((item, i) => {
    if (i === selectedIndex) item.classList.add("active");
    else item.classList.remove("active");
  });

  // Update Visual Background
  document.getElementById("dynamic-bg").style.backgroundImage = data.bgImg;

  // Animasi Ganti Gambar Tengah (Menghilang sebentar lalu muncul yang baru)
  const mainImg = document.getElementById("main-img");
  mainImg.style.opacity = 0;
  mainImg.style.transform = "scale(0.8)";

  setTimeout(() => {
    mainImg.src = data.mainImg;
    mainImg.style.opacity = 1;
    mainImg.style.transform = "scale(1)";
  }, 300);

  // Update Teks Deskripsi di Bawah
  document.getElementById("rilos-title").innerText = data.title;
  document.getElementById("rilos-subtitle").innerText = data.subtitle;
  document.getElementById("rilos-desc").innerText = data.desc;
}
