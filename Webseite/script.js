// Initialisierung Emoji-Animation-Elemente
const emojiList = ['🦢', '🦢', '🦢', '🥐', '🥐', '🍓', '🍓', '🐇', '🕊️', '🐻', '🐸', '🌻'];
const halloweenEmojiList = ['🎃', '👻', '🦇', '🕷️', '🕯️'];

const elements = {
    headline: document.getElementById('main-headline'),
    subHeadline: document.getElementById('sub-headline'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

// Ermittelt die aktuelle Phase
function getActiveTargetInfo() {
    const year = new Date().getFullYear();
    const oct31 = new Date(year, 9, 31, 14, 0, 0); // 31.10. 14 Uhr
    const dec14 = new Date(year, 11, 13, 0, 0, 0); // 13.12. 0 Uhr

    if (Date.now() < oct31.getTime()) {
        return {
            stage: 1,
            targetDate: oct31,
            headline: 'Bis wir uns wiedersehen',
            subHeadline: 'sind es nur noch...'
        };
    }

    return {
        stage: 2,
        targetDate: dec14,
        headline: 'Bis zur magischen Sternennacht...',
        subHeadline: 'Kein Wiedersehen, aber das Gleiche sehen in der Nacht vom 13. auf den 14. Dezember 🌌'
    };
}

let activeStage = -1;

function updateCountdown() {
    const info = getActiveTargetInfo();

    if (activeStage !== info.stage) {
        activeStage = info.stage;
        elements.headline.textContent = info.headline;
        elements.subHeadline.textContent = info.subHeadline;
    }

    const diff = Math.max(0, info.targetDate.getTime() - Date.now());
    const pad = n => String(n).padStart(2, '0');

    elements.days.textContent = pad(Math.floor(diff / 86400000));
    elements.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    elements.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    elements.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
}

function randomizeDigitTilt() {
    document.querySelectorAll('.countdown-digit').forEach(digit => {
        const angle = (Math.random() * 16 - 4).toFixed(1);
        digit.style.transform = `rotate(${angle}deg)`;
        digit.style.display = 'inline-block';

        const label = digit.parentElement.querySelector('.countdown-label');
        if (label) label.style.transform = `rotate(${angle}deg)`;
    });
}

function initFloatingEmoji() {
    const container = document.getElementById('emoji-background');
    if (!container) return;

    const allEmojis = [...emojiList, ...halloweenEmojiList];

    for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        span.className = 'floating-emoji';
        span.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];

        const duration = Math.random() * 14 + 14;
        span.style.fontSize = `${(Math.random() * 2 + 1).toFixed(2)}rem`;
        span.style.left = `${(Math.random() * 95).toFixed(2)}vw`;
        span.style.animationDelay = `${(-Math.random() * duration).toFixed(2)}s`;
        span.style.setProperty('--duration', `${duration.toFixed(2)}s`);
        span.style.setProperty('--target-opacity', (Math.random() * 0.35 + 0.35).toFixed(2));
        span.style.setProperty('--drift-x', `${Math.round((Math.random() - 0.5) * 160)}px`);
        span.style.setProperty('--target-rotation', `${Math.round((Math.random() - 0.5) * 120)}deg`);

        container.appendChild(span);
    }
}

// Buttonlogik,
const toggleBtn = document.getElementById('toggle-btn');
const headlineContainer = document.getElementById('headline-container');
const countdownContainer = document.getElementById('countdown-container');
const messageContainer = document.getElementById('message-container');
const btnText = document.getElementById('btn-text');

let isTextVisible = false;

// Grundklassen für den Übergang setzen
headlineContainer.classList.add('fade-container');
countdownContainer.classList.add('fade-container');
messageContainer.classList.add('fade-container');

// Initialisieren: Nachricht ist zu Beginn unsichtbar und ausgeblendet
messageContainer.classList.add('fade-out');
messageContainer.style.display = 'none';

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        isTextVisible = !isTextVisible; // Sauberer Toggle

        if (isTextVisible) {
            // Countdown und Überschrift ausblenden
            countdownContainer.classList.add('fade-out');
            headlineContainer.classList.add('fade-out');

            setTimeout(() => {
                countdownContainer.style.display = 'none';
                headlineContainer.style.display = 'none';
                messageContainer.style.display = 'flex';
                setTimeout(() => {
                    messageContainer.classList.remove('fade-out');
                }, 20);
            }, 300);

            btnText.textContent = 'Wieder zum Countdown';
        } else {
            // Nachricht ausblenden
            messageContainer.classList.add('fade-out');

            setTimeout(() => {
                messageContainer.style.display = 'none';
                countdownContainer.style.display = 'flex';
                headlineContainer.style.display = 'block';
                setTimeout(() => {
                    countdownContainer.classList.remove('fade-out');
                    headlineContainer.classList.remove('fade-out');
                }, 20);
            }, 300);

            btnText.textContent = 'Castor & Pollux';
        }
    });
}

updateCountdown();
setInterval(updateCountdown, 1000);

window.addEventListener('DOMContentLoaded', () => {
    initFloatingEmoji();
    randomizeDigitTilt();
});
