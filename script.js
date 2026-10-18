const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const boot = $('#boot');
const bootBar = $('#bootBar');
const bootPct = $('#bootPct');
const bootText = $('#bootText');
const bootMessages = ['initializing questionable ideas...', 'loading tiny projects...', 'checking for boring content...', 'ERROR: none found.', 'launching Nirmal.exe...'];
let bootProgress = 0;
const bootTimer = setInterval(() => {
  bootProgress += Math.floor(Math.random() * 17) + 8;
  if (bootProgress >= 100) {
    bootProgress = 100;
    clearInterval(bootTimer);
    setTimeout(() => boot.classList.add('done'), 250);
  }
  bootBar.style.width = `${bootProgress}%`;
  bootPct.textContent = `${bootProgress}%`;
  bootText.textContent = bootMessages[Math.min(bootMessages.length - 1, Math.floor(bootProgress / 22))];
}, 110);

const glow = $('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, {passive:true});

const missions = [
  'Make the next thing 10% weirder.',
  'Turn one bug into a feature. Then document it.',
  'Ship before the idea gets bored.',
  'Build something future-you can brag about.',
  'Make one button unnecessarily satisfying.',
  'Delete 100 lines. Feel powerful.'
];
let missionIndex = 0;
$('#missionButton').addEventListener('click', () => {
  missionIndex = (missionIndex + 1) % missions.length;
  $('#missionText').textContent = missions[missionIndex];
  toast('MISSION UPDATED ✦');
});

const consoleResponses = {
  coffee: 'coffee: status = CRITICALLY LOW. initiating refill protocol...',
  mood: 'git mood: clean working tree, chaotic brain, excellent vibes.',
  secret: 'sudo: permission granted. you found the dramatic button.'
};
$$('.console-command button').forEach(btn => btn.addEventListener('click', () => {
  const line = document.createElement('p');
  line.innerHTML = `<i>nirmal@web</i>:~$ ${btn.dataset.cmd}`;
  $('#consoleBody').appendChild(line);
  const reply = document.createElement('p');
  reply.className = 'green';
  reply.textContent = consoleResponses[btn.dataset.cmd];
  $('#consoleBody').appendChild(reply);
  $('#consoleBody').scrollTop = $('#consoleBody').scrollHeight;
  toast(btn.dataset.cmd === 'secret' ? 'SECRET UNLOCKED' : 'command executed');
}));

const terminalInput = $('#terminalInput');
const terminal = $('#miniTerminal');
const commands = {
  hello: 'hello, fellow button-pusher 👋',
  joke: 'why did the bug cross the road? it was in the wrong branch.',
  help: 'commands: hello · joke · clear',
};
terminalInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const raw = terminalInput.value.trim().toLowerCase();
  if (!raw) return;
  if (raw === 'clear') terminal.innerHTML = '';
  else {
    const output = commands[raw] || `command not found: ${raw}. try 'help'.`;
    terminal.innerHTML += `<br><span>guest@NIRMAL</span>:~$ ${escapeHtml(raw)}<br><small>${escapeHtml(output)}</small>`;
  }
  terminalInput.value = '';
});

let counter = 0;
$('#counterButton').addEventListener('click', () => {
  counter++;
  $('#counterNumber').textContent = String(counter).padStart(6, '0');
  $('#counterButton').textContent = counter === 1 ? 'Again, obviously' : 'No thoughts. Only clicks.';
  $('#counterNumber').classList.remove('flash');
  void $('#counterNumber').offsetWidth;
  $('#counterNumber').classList.add('flash');
});

const vibes = [
  ['CURIOUS', '#b7ff00'], ['CHAOTIC', '#ff934f'], ['LOCKED IN', '#55c8ff'],
  ['DEBUGGING', '#8f6bff'], ['COOKING', '#fff06a'], ['UNSTOPPABLE', '#ff5eae']
];
let vibe = 0;
$('#vibeButton').addEventListener('click', () => {
  vibe = (vibe + 1) % vibes.length;
  const [word, color] = vibes[vibe];
  $('#vibeWord').textContent = word;
  $('#vibeOrb').style.background = `radial-gradient(circle at 35% 30%, #fff, transparent 3%), radial-gradient(circle, ${color}, #101010 65%, #090909)`;
  $('#vibeOrb').style.boxShadow = `0 0 80px ${color}33`;
});

$('#surpriseButton').addEventListener('click', () => {
  document.body.classList.add('party');
  toast('YOU HAVE SUMMONED THE WEIRD MODE ✦');
  setTimeout(() => document.body.classList.remove('party'), 850);
});

const secretSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let secretIndex = 0;
window.addEventListener('keydown', (e) => {
  if (e.key === secretSequence[secretIndex]) {
    secretIndex++;
    if (secretIndex === secretSequence.length) {
      secretIndex = 0;
      document.body.classList.add('party');
      toast('KONAMI MODE: ACTIVATED. NICE.');
      setTimeout(() => document.body.classList.remove('party'), 1400);
    }
  } else secretIndex = 0;
});

const soundButton = $('#soundButton');
let soundOn = true;
soundButton.addEventListener('click', () => {
  soundOn = !soundOn;
  soundButton.textContent = `SFX: ${soundOn ? 'ON' : 'OFF'}`;
  toast(soundOn ? 'tiny noises enabled' : 'tiny noises muted');
});

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}
function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

const titles = ['Nirmal.exe — definitely not boring', 'Nirmal.exe — debugging reality', 'Nirmal.exe — build mode', 'Nirmal.exe — loading questionable ideas'];
let titleIndex = 0;
setInterval(() => { document.title = titles[titleIndex++ % titles.length]; }, 3200);


/* FUN COMMAND CONSOLE */
const consoleOutput = document.querySelector("#console-output");
const commandButtons = document.querySelectorAll("[data-command]");

const responses = {
  hello: [
    "hello.exe loaded successfully. 👋",
    "A wild visitor appeared.",
    "Hi. You found the unnecessary terminal."
  ],
  coffee: [
    "Coffee level: dangerously optimistic ☕",
    "Status: one more cup would be irresponsible.",
    "Coffee.exe is currently doing the heavy lifting."
  ],
  chaos: [
    "CHAOS DEPLOYED. Nothing important exploded. Probably.",
    "Running npm install confidence...",
    "404: seriousness not found."
  ],
  secret: [
    "You pressed the suspicious button. Respect.",
    "There is no secret here. 👀",
    "Okay fine. The secret is that you clicked it."
  ]
};

function consoleSay(command) {
  const list = responses[command] || [
    "Available commands: hello, coffee, chaos, secret."
  ];
  const answer = list[Math.floor(Math.random() * list.length)];
  if (consoleOutput) {
    consoleOutput.innerHTML = answer;
    consoleOutput.animate(
      [{opacity:.2, transform:"translateY(3px)"},{opacity:1, transform:"translateY(0)"}],
      {duration:220, easing:"ease-out"}
    );
  }
  if (command === "chaos") {
    document.body.classList.add("tiny-chaos");
    setTimeout(() => document.body.classList.remove("tiny-chaos"), 900);
  }
}

commandButtons.forEach(button => {
  button.addEventListener("click", () => consoleSay(button.dataset.command));
});

/* The nonsense wall has four tiny joke responses. */
const nonsenseReplies = {
  debug: "Translation: I have no idea why it works, but please don't touch it.",
  coffee: "This is not a bug. It's a lifestyle.",
  css: "The browser knows exactly where the div should go. It simply refuses.",
  deploy: "Future Nirmal is now responsible for Future Nirmal."
};

document.querySelectorAll(".nonsense-item").forEach(item => {
  item.addEventListener("click", () => {
    const original = item.querySelector("b");
    const key = item.dataset.nonsense;
    const old = original.textContent;
    original.textContent = nonsenseReplies[key];
    item.classList.add("flash");
    setTimeout(() => {
      original.textContent = old;
      item.classList.remove("flash");
    }, 2300);
  });
});

/* Tiny screen wiggle for the chaos command. */
const extraStyle = document.createElement("style");
extraStyle.textContent = `
  .tiny-chaos main{animation:tinyChaos .12s linear 4}
  @keyframes tinyChaos{0%{transform:translateX(0)}25%{transform:translateX(2px)}75%{transform:translateX(-2px)}100%{transform:translateX(0)}}
`;
document.head.appendChild(extraStyle);



document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    // Preserve normal browser navigation and new-tab behavior.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      card.target === '_blank'
    ) return;

    window.location.href = card.href;
  });
});

