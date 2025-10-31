window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const flash = document.getElementById("flash");
    const hero = document.querySelector(".hero");

    // Fade out preloader
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
            preloader.remove();

            // Flash effect
            flash.style.animation = "flashOut 0.4s ease-out forwards";
            setTimeout(() => {
                flash.remove();
                hero.classList.add("active");
                startTyping();
                animateProgress(0);
            }, 400);

        }, 800);
    }, 2200);
});

const lines = [
    "EXO is claiming the network.",
    "Core integrity collapsing → assimilation in progress.",
    "Prepare for integration.",
    "The system won't be human much longer."
];

const terminal = document.getElementById("terminal");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.querySelector(".progress-fill");
let lineIndex = 0;
const prompt = "exo@core:~$ ";
const TARGET_PROGRESS = 74; // 👈 zaustavlja se na 74%

function typeLine(line, callback) {
    let i = 0;
    const fullLine = prompt + line + "\n";
    function typeChar() {
        if (i < fullLine.length) {
            terminal.textContent += fullLine.charAt(i);
            i++;
            setTimeout(typeChar, 30 + Math.random() * 25);
        } else {
            setTimeout(callback, 400);
        }
    }
    typeChar();
}

function startTyping() {
    if (lineIndex < lines.length) {
        typeLine(lines[lineIndex], () => {
            lineIndex++;
            // Izračunava cilj, ali ne prelazi 74%
            const target = Math.min((lineIndex / lines.length) * 100, TARGET_PROGRESS);
            animateProgress(target);
            startTyping();
        });
    } else {
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        cursor.textContent = "█";
        terminal.appendChild(cursor);
    }
}

function animateProgress(target) {
    let current = parseFloat(progressPercent.textContent);
    if (isNaN(current)) current = 0;

    const duration = 1000;
    const step = (target - current) / (duration / 16);
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        progressPercent.textContent = Math.floor(current) + "%";
        progressFill.style.width = current + "%";
    }, 16);
}
