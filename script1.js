/*==========================================================
 FIDI-SPIE Enterprise Portal
 script.js
 PART 3A
==========================================================*/

window.onload = function () {

    startClock();

    startDate();

    initPassword();

    animateStatus();

};

/*==========================================================
 LIVE CLOCK
==========================================================*/

function startClock() {

    const clock = document.getElementById("liveClock");

    setInterval(function () {

        const now = new Date();

        let h = String(now.getHours()).padStart(2, "0");
        let m = String(now.getMinutes()).padStart(2, "0");
        let s = String(now.getSeconds()).padStart(2, "0");

        clock.innerHTML = h + ":" + m + ":" + s;

    }, 1000);

}

/*==========================================================
 LIVE DATE
==========================================================*/

function startDate() {

    const date = document.getElementById("liveDate");

    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const sekarang = new Date();

    date.innerHTML =
        hari[sekarang.getDay()] +
        ", " +
        sekarang.getDate() +
        " " +
        bulan[sekarang.getMonth()] +
        " " +
        sekarang.getFullYear();

}

/*==========================================================
 SHOW PASSWORD
==========================================================*/

function initPassword() {

    const btn = document.getElementById("togglePassword");

    const pass = document.getElementById("password");

    btn.onclick = function () {

        if (pass.type === "password") {

            pass.type = "text";

            btn.innerHTML = "🙈";

        } else {

            pass.type = "password";

            btn.innerHTML = "👁";

        }

    };

}

/*==========================================================
 ONLINE STATUS
==========================================================*/

function animateStatus() {

    const dot = document.querySelector(".online-dot");

    setInterval(function () {

        dot.classList.toggle("active");

    }, 800);

  }
/*==========================================================
 LOGIN
 PART 3B
==========================================================*/

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const status =
        document.getElementById("loginStatus");

    /* ---------- Validasi ---------- */

    if (username === "") {

        status.innerHTML = "Username belum diisi.";

        return;

    }

    if (password === "") {

        status.innerHTML = "Password belum diisi.";

        return;

    }

    /* ---------- Simulasi Login ---------- */

    status.innerHTML = "Initializing Enterprise Core...";

    const btn =
        document.querySelector(".login-button");

    btn.disabled = true;

    btn.innerHTML = "CONNECTING...";

    setTimeout(function () {

        status.innerHTML = "Loading Security Module...";

    }, 800);

    setTimeout(function () {

        status.innerHTML = "Authenticating User...";

    }, 1800);

    setTimeout(function () {

        status.innerHTML = "Loading Enterprise Portal...";

    }, 2800);

    /* ---------- Demo Account ---------- */

    setTimeout(function () {

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            status.innerHTML =
                "Login Success";

            btn.innerHTML =
                "SUCCESS";

            sessionStorage.setItem(
                "loginUser",
                username
            );

            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        } else {

            status.innerHTML =
                "Username atau Password salah.";

            btn.disabled = false;

            btn.innerHTML =
                "LOGIN SECURELY";

            shakeLogin();

        }

    }, 3800);

}

/*==========================================================
 SHAKE LOGIN CARD
==========================================================*/

function shakeLogin() {

    const card =
        document.querySelector(".login-card");

    card.classList.add("shake");

    setTimeout(function () {

        card.classList.remove("shake");

    }, 700);

}

/*==========================================================
 ENTER KEY
==========================================================*/

document.addEventListener(

    "keydown",

    function (e) {

        if (e.key === "Enter") {

            login();

        }

    }

);

/*==========================================================
 LOGOUT (Future Ready)
==========================================================*/

function logout() {

    sessionStorage.clear();

    window.location.href = "index.html";

}

/*==========================================================
 END PART 3B
==========================================================*/
/*==========================================================
 PART 3C
 Background Animation Engine
==========================================================*/

function startBackgroundAnimation(){

    animateGlobe();

    animateBuildings();

    animateGraph();

}

/*==========================================================
 GLOBE SIGNAL
==========================================================*/

function animateGlobe(){

    const globe =
    document.querySelector(".background-globe");

    if(!globe) return;

    setInterval(function(){

        globe.style.opacity=
        (0.82+Math.random()*0.18);

    },500);

}

/*==========================================================
 BUILDING LIGHT
==========================================================*/

function animateBuildings(){

    const city =
    document.querySelector(".background-city");

    if(!city) return;

    setInterval(function(){

        city.style.filter=
        "brightness("+
        (0.9+Math.random()*0.25)+")";

    },700);

}

/*==========================================================
 GRAPH EFFECT
==========================================================*/

function animateGraph(){

    const graph =
    document.querySelector(".background-graph");

    if(!graph) return;

    let x=0;

    setInterval(function(){

        x++;

        graph.style.backgroundPosition=
        x+"px 0";

    },40);

}

/*==========================================================
 START ENGINE
==========================================================*/

startBackgroundAnimation();
