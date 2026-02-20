const rilosData = {
    ayam: {
        title: "Risoles Ayam Gurih",
        desc: "Kenikmatan suwiran daging ayam asli yang dimasak dengan bumbu rempah pilihan, dibalut kulit risoles yang renyah di luar tapi lembut di dalam.",
        vibe: "Cocok banget buat temen ngemil sore hari sambil nyeruput teh anget atau kopi susu.",
        bgColor: "#fef08a", // Kuning mentega
        textColor: "#713f12"
    },
    sayur: {
        title: "Risoles Sayuran Segar",
        desc: "Kombinasi kentang, wortel, dan buncis segar yang ditumis dengan kaldu gurih. Rasanya ringan dan nggak bikin enek.",
        vibe: "Suasana pagi hari! Pas banget buat sarapan sehat atau pengganjal perut sebelum mulai aktivitas sibukmu.",
        bgColor: "#bbf7d0", // Hijau segar
        textColor: "#14532d"
    },
    sosis: {
        title: "Risoles Sosis Asap",
        desc: "Sensasi sosis sapi asap berpadu dengan keju lumer dan saus mayo rahasia. Rasanya nendang dan gurih maksimal di setiap gigitan.",
        vibe: "Teman setia pas lagi nonton series favorit, main game, atau nonton bareng pertandingan bola di malam hari.",
        bgColor: "#fecaca", // Merah muda/sosis
        textColor: "#7f1d1d"
    },
    sapi: {
        title: "Risoles Daging Sapi",
        desc: "Isian daging sapi cincang tebal dengan bumbu lada hitam yang khas. Aroma dagingnya langsung tercium sejak gigitan pertama.",
        vibe: "Paling nikmat dimakan pas cuaca lagi mendung atau hujan lebat, bikin suasana makin hangat dan *cozy*.",
        bgColor: "#e7e5e4", // Abu/Coklat hangat
        textColor: "#44403c"
    }
};

function changeRilos(rasa) {
    const data = rilosData[rasa];
    
    // Update Teks
    document.getElementById('rilos-title').innerText = data.title;
    document.getElementById('rilos-desc').innerText = data.desc;
    document.getElementById('rilos-vibe').innerHTML = `<strong>Suasana Pas:</strong> ${data.vibe}`;
    
    // Update Warna Tema Website (Background & Text)
    document.documentElement.style.setProperty('--bg-color', data.bgColor);
    document.documentElement.style.setProperty('--text-color', data.textColor);
}