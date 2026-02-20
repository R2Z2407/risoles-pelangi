const rilosData = {
    ayam: {
        title: "Risoles Ayam Gurih",
        desc: "Kenikmatan suwiran daging ayam asli yang dimasak dengan bumbu rempah pilihan, dibalut kulit risoles yang renyah di luar tapi lembut di dalam.",
        vibe: "✨ Santai Sore & Ngeteh",
        bgColor: "#fef08a",
        textColor: "#713f12",
        centerText: "Ayam<br>Gurih"
    },
    sayur: {
        title: "Risoles Sayuran Segar",
        desc: "Kombinasi kentang, wortel, dan buncis segar yang ditumis dengan kaldu gurih. Rasanya ringan, sehat, dan nggak bikin enek.",
        vibe: "✨ Sarapan Cepat & Sehat",
        bgColor: "#bbf7d0",
        textColor: "#14532d",
        centerText: "Sayur<br>Segar"
    },
    sosis: {
        title: "Risoles Sosis Asap",
        desc: "Sensasi sosis sapi asap berpadu dengan keju lumer dan saus mayo rahasia. Rasanya nendang dan gurih maksimal di setiap gigitan.",
        vibe: "✨ Teman Nonton Series",
        bgColor: "#fecaca",
        textColor: "#7f1d1d",
        centerText: "Sosis<br>Asap"
    },
    sapi: {
        title: "Risoles Daging Sapi",
        desc: "Isian daging sapi cincang tebal dengan bumbu lada hitam yang khas. Aroma dagingnya langsung tercium sejak gigitan pertama.",
        vibe: "✨ Cuaca Mendung & Cozy",
        bgColor: "#e7e5e4",
        textColor: "#44403c",
        centerText: "Daging<br>Sapi"
    }
};

function changeRilos(rasa) {
    const data = rilosData[rasa];
    
    // Update Konten Cerita
    document.getElementById('rilos-title').innerText = data.title;
    document.getElementById('rilos-desc').innerText = data.desc;
    document.getElementById('rilos-vibe').innerText = data.vibe;
    
    // Update Lingkaran Tengah
    const centerDisplay = document.getElementById('center-display');
    centerDisplay.innerHTML = data.centerText;
    centerDisplay.style.backgroundColor = data.textColor;
    centerDisplay.style.color = data.bgColor;

    // Update Warna Tema Keseluruhan
    document.documentElement.style.setProperty('--bg-main', data.bgColor);
    document.documentElement.style.setProperty('--text-main', data.textColor);
    
    // Scroll otomatis ke bagian sensasi (opsional biar user langsung baca)
    document.getElementById('sensation-box').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
