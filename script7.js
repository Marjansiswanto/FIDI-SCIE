// ======================================================
// KONFIGURASI
// Password TIDAK disimpan dalam bentuk teks biasa di sini,
// melainkan dalam bentuk hash SHA-256, agar tidak langsung
// terbaca oleh orang yang membuka "View Source".
// CATATAN JUJUR: ini bukan keamanan tingkat tinggi, hanya
// mencegah orang iseng. Untuk data benar-benar rahasia,
// gunakan hosting dengan autentikasi server (bukan GitHub Pages).
// Cara mengganti file *.pdf nya:
//  pada baris 20 == const PDF_PATH = "SIPATRA-SMART_final.pdf" , ingat tanda ; diakhir baris jangan hilang.
//  atau ganti dengan file linenya, di sini pada baris program 21 saya hanya menambahan // untuk menonaktifkannya.
// Cara mengganti password:
// 1. Buka https://emn178.github.io/online-tools/sha256.html
// 2. Ketik password baru Anda, salin hasil hash-nya
// 3. Ganti nilai PASSWORD_HASH di bawah ini dengan hash tersebut
// ======================================================

const PASSWORD_HASH = "c9daf4dd7326fbca56c8987ca62792df03b2e93951ab9bab6081cf8571258104";
// Hash di atas = "password" — GANTI SEBELUM DI-DEPLOY!

//const PDF_PATH = "SIPATRA-SMART_final.pdf";
const PDF_PATH = "Assignment-Peserta.pdf";
const SESSION_KEY = "fidi_portal_unlocked";

const gate = document.getElementById("gate");
const content = document.getElementById("content");
const form = document.getElementById("loginForm");
const input = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const pdfFrame = document.getElementById("pdfFrame");
const logoutBtn = document.getElementById("logoutBtn");

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function unlock() {
  gate.classList.add("hidden");
  content.classList.remove("hidden");
  pdfFrame.src = PDF_PATH;
}

function lock() {
  sessionStorage.removeItem(SESSION_KEY);
  content.classList.add("hidden");
  gate.classList.remove("hidden");
  pdfFrame.src = "";
  input.value = "";
}

// Jika sudah pernah login di sesi browser ini, langsung buka
if (sessionStorage.getItem(SESSION_KEY) === "true") {
  unlock();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const hash = await sha256(input.value);

  if (hash === PASSWORD_HASH) {
    sessionStorage.setItem(SESSION_KEY, "true");
    errorMsg.textContent = "";
    unlock();
  } else {
    errorMsg.textContent = "Password salah. Silakan coba lagi.";
    input.value = "";
    input.focus();
  }
});

logoutBtn.addEventListener("click", lock);
