const terreal = document.querySelector(".terreal");
const base = `door@<span style="color: #33D7FF">uwus.xyz</span>:<span style="color: dodgerblue">~</span>$ `;
let array = [];
let input = "";
let lastIdx = -1;
let lastCmd = "";
let index = 0;
let sw = true;

function updateConsole() {
    document.querySelector(".new-line").innerHTML = sw ? index === 0 ? base + input + "|" : base + input.slice(0, index) + "|" + input.slice(index) : base + input
}
document.addEventListener("keydown", function(a) {
    a = a || window.event;
    const b = a.key;
    if ((a.metaKey || a.ctrlKey) && a.key === "v" && navigator.userAgent.search("Firefox") === -1) {
        navigator.clipboard.readText().then(function(c) {
            if (c === "" || c.trim().length === 0) return;
            if (index === 0) input += c;
            else input = input.slice(0, index) + c + input.slice(index);
            updateConsole()
        });
        a.preventDefault();
        return
    }
    if (a.ctrlKey || a.metaKey || a.altKey) return;
    if (input.length + index <= 0) index = -input.length;
    if (index > 0) index = 0;
    if (b.length === 1) {
        if (index === 0) input += b;
        else input = input.slice(0, index) + b + input.slice(index);
        updateConsole();
        a.preventDefault();
        return
    }
    switch (b) {
        case "Enter":
            let d = input.length !== 0;
            if (d) {
                const e = input.trim().split(" ");
                const f = e.shift().toLowerCase();
                switch (f) {
                    case "clear":
                        clear();
                        break;
                    case "info":
                    case "neofetch":
                        info();
                        break;
                    default:
                        d = false;
                        writeLine(`root: command not found: ${f} (list of commands: info, neofetch, clear)`);
                        break
                }
            }
            switchToNewLine(d);
            terreal.scrollTop = terreal.scrollHeight - terreal.clientHeight;
            break;
        case "Backspace":
            if (input.length <= 0) return;
            if (index === 0) input = input.slice(0, -1);
            else input = input.slice(0, index - 1) + input.slice(index);
            updateConsole();
            break;
        case "Delete":
            if (input.length <= 0 || index === 0) return;
            input = input.slice(0, index) + (index === -1 ? "" : input.slice(index + 1));
            index = index >= 0 ? 0 : index + 1;
            updateConsole();
            break;
        case "ArrowLeft":
            if (input.length === 0 || input.length + index <= 0) index = -input.length;
            else index--;
            updateConsole();
            break;
        case "ArrowRight":
            index = index >= 0 ? 0 : index + 1;
            updateConsole();
            break;
        case "ArrowUp":
            if (array.length === 0) return;
            if (lastIdx === -1) {
                lastIdx = array.length;
                lastCmd = input
            }
            lastIdx--;
            if (lastIdx <= 0) lastIdx = 0;
            input = array[lastIdx];
            updateConsole();
            break;
        case "ArrowDown":
            if (lastIdx === -1) return;
            lastIdx++;
            if (lastIdx >= array.length) {
                lastIdx = -1;
                input = lastCmd;
                return
            }
            input = array[lastIdx];
            updateConsole();
            break
    }
    a.preventDefault()
}, false);
inputLine("info");
info();
switchToNewLine(true);
setInterval(function g() {
    if (index === 0) sw = !sw;
    else sw = true;
    updateConsole();
    return g
}(), 500);

function switchToNewLine(h) {
    if (input.length !== 0) array.push(input);
    lastIdx = -1;
    input = "";
    const i = document.querySelector(".new-line");
    if (i) {
        if (h) i.style.paddingBottom = "5px";
        i.classList.remove("new-line");
        if (i.innerHTML.endsWith("|")) i.innerHTML = i.innerHTML.slice(0, -1)
    }
    index = 0;
    inputLine()
}

function print404() {
    const j = document.querySelector(".new-line");
    j.classList.remove("new-line");
    if (j.innerHTML.endsWith("|")) j.innerHTML = j.innerHTML.slice(0, -1);
    j.innerHTML += "urmomgay";
    writeLine(`zsh: <span>404</span> - Page not found. Redirected to the main page in <span>24h</span>.......`);
    inputLine("./main");
    switchToNewLine()
}

function inputLine(k) {
    terreal.innerHTML += `\n<div class=\"new-line\">door@<span style=\"color: #33D7FF\">uwus.xyz</span>:<span style=\"color: dodgerblue\">~</span>$ ${k?k:""}</div>`
}

function writeLine(l) {
    terreal.innerHTML += `<div>${l}</div>`
}

function clear() {
    terreal.innerHTML = ""
}

function info() {
    terreal.innerHTML += '\n<img onmouseover="arch-logo-2.png" class="img" width="600" height="600" src="static/arch-logo.png" alt="Image not found!">\n' + "  <div><span>door</span>@<span>uwus.xyz</span></div>\n" + "  <div>---------------------</div>\n" + "  <div><span>OS</span>: Arch</div>\n" + "  <div><span>Age</span>: 19</div>\n" + "  <div><span>Facebook</span>: <a href=\"https://facebook.com\" target='_blank'>@DontMind</a></div>\n" + "  <div><span>Discord</span>: <a href=\"https://discord.com\" target='_blank'>OpenTheFukingDoor#8793</a></div>\n" + "  <div><span>Youtube</span>: <a href=\"https://www.youtube.com/channel/UCSsyUSWfEHtg0TyWMR4EloA\" target='_blank'>Vishvesh</a></div>\n" + "  <div><span>Github</span>: <a href=\"https://github.com/VishveshC\" target='_blank'>OpenDoor</a></div>\n" + "  <div><span>emuos</span>: <a href=\"https://emupedia.net/beta/emuos/\" target='_blank'>- lol -</a></div>\n" + "  <div><span>Voxel Network</span>: <a href=\"https://discord.gg/BUHFkkgFB6\" target='_blank'>Server</a></div>\n" + '  <div style="padding-bottom:10px; clear: both;">'
}