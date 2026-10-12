document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. FLOATING HEARTS & SPARKLE ANIMATIONS
       ========================================================================= */
    const heartsContainer = document.getElementById('floating-hearts-container');

    function createFloatingHeart() {
        if (!heartsContainer) return;
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart', 'floating-heart');
        
        const size = Math.random() * 18 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 6;

        heart.style.left = `${left}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;

        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    setInterval(createFloatingHeart, 450);

    function createSparkleBurst(x, y, count = 12) {
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            document.body.appendChild(sparkle);

            const offsetX = (Math.random() - 0.5) * 120;
            const offsetY = (Math.random() - 0.5) * 120;

            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;

            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${offsetX}px, ${offsetY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0,0,0.2,1)'
            }).onfinish = () => sparkle.remove();
        }
    }


    /* =========================================================================
       2. BACKGROUND MUSIC CONTROLLER
       ========================================================================= */
    const musicBtn = document.getElementById('musicToggleBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicBtn.classList.add('playing');
                    isPlaying = true;
                }).catch(err => {
                    console.log('Audio file missing or blocked by browser:', err);
                });
            }
        });
    }


    /* =========================================================================
       3. PAGE NAVIGATION CONTROLLER
       ========================================================================= */
    const pages = {
        1: document.getElementById('page-1'),
        2: document.getElementById('page-2'),
        3: document.getElementById('page-3')
    };

    function showPage(pageNumber) {
        Object.keys(pages).forEach(key => {
            if (parseInt(key) === pageNumber) {
                pages[key].classList.add('active');
            } else {
                pages[key].classList.remove('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const goToPage2Btn = document.getElementById('goToPage2Btn');
    if (goToPage2Btn) {
        goToPage2Btn.addEventListener('click', (e) => {
            createSparkleBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 15);
            showPage(2);
        });
    }


    /* =========================================================================
       4. PAGE TWO: QUESTION & 15+ NO SEQUENCE
       ========================================================================= */
    const questionText = document.getElementById('questionText');
    const subtitleText = document.getElementById('subtitleText');
    const characterEmoji = document.getElementById('characterEmoji');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationOverlay = document.getElementById('celebrationOverlay');

    const noSequence = [
        { q: "Are you sure, Jagriti? 🥺", sub: "Think about it one more time, please... 💗", emoji: "🥺", noText: "No, I'm sure 🙈" },
        { q: "Are you really sure? 😭💗", sub: "My tiny heart needs confirmation!", emoji: "😭", noText: "Still No 🙈" },
        { q: "Really really sure, cutie? 👀", sub: "Look how pretty the YES button is! 💖", emoji: "👀", noText: "No way 🙈" },
        { q: "Think just once more, my life 🥹", sub: "Imagine all the sweet moments we can make together. 💗", emoji: "🥹", noText: "Nope 🙈" },
        { q: "Asking one last time? 🫶", sub: "Whatever your answer, you mean the world to me. ❤️", emoji: "🫶", noText: "Still no 🙈" },
        { q: "Still sure, Jagriti? 🥺💕", sub: "Not even a little bit of love? 🥹", emoji: "🙈", noText: "Nope 🙈" },
        { q: "Can't I get a tiny YES? 🥹", sub: "I'm waiting right here with hope in my heart!", emoji: "👉👈", noText: "No 🙈" },
        { q: "Are you absolutely sure, cutie? 🌷", sub: "Don't break my tiny heart! 💔", emoji: "💔", noText: "I'm sure 🙈" },
        { q: "Think again, my favorite person! 💗", sub: "You know you love me deep down! ✨", emoji: "✨", noText: "Nooo 🙈" },
        { q: "Can I ask you just one more time? 🫣", sub: "Pretty please with extra love on top?", emoji: "🫣", noText: "Nah 🙈" },
        { q: "Your answer means everything to me, Jagriti. ❤️", sub: "Give it one more gentle thought? 🌸", emoji: "🌸", noText: "Still No 🙈" },
        { q: "Don't be so cold to your Raj! 🥺", sub: "I brought so many virtual hugs for you! 🤗", emoji: "🤗", noText: "No hugs 🙈" },
        { q: "Are you testing my patience, cutie? 😉", sub: "I will keep asking because I love you that much!", emoji: "😜", noText: "Keep trying 🙈" },
        { q: "Look at this cute little face! 🥺❤️", sub: "How can you say no to this?", emoji: "😿", noText: "Easily 🙈" },
        { q: "Okay, infinite loop of love initiated! 🔄", sub: "You can click NO all day, but my love won't change!", emoji: "💖", noText: "Try me 🙈" }
    ];

    let noClickCount = 0;
    let yesScale = 1;

    if (noBtn) {
        noBtn.addEventListener('click', (e) => {
            const currentMsg = noSequence[noClickCount % noSequence.length];

            questionText.style.opacity = '0';
            subtitleText.style.opacity = '0';

            setTimeout(() => {
                questionText.innerText = currentMsg.q;
                subtitleText.innerText = currentMsg.sub;
                characterEmoji.innerText = currentMsg.emoji;
                noBtn.innerText = currentMsg.noText;

                questionText.style.opacity = '1';
                subtitleText.style.opacity = '1';
            }, 200);

            yesScale += 0.08;
            if (yesScale <= 1.6) {
                yesBtn.style.transform = `scale(${yesScale})`;
            }

            noClickCount++;
            createSparkleBurst(e.clientX, e.clientY, 6);
        });
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', (e) => {
            createSparkleBurst(e.clientX, e.clientY, 30);

            celebrationOverlay.classList.add('active');

            // Automatically set current date
            const now = new Date();
            const certDateDisplay = document.getElementById('certDateDisplay');
            if (certDateDisplay) {
                certDateDisplay.innerText = `Officially Issued on: ${now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
            }

            setTimeout(() => {
                celebrationOverlay.classList.remove('active');
                showPage(3);
            }, 2200);
        });
    }


    /* =========================================================================
       5. PAGE THREE: THUMBPRINT PRESS-AND-HOLD SEAL
       ========================================================================= */
    const thumbprintTouchArea = document.getElementById('thumbprintTouchArea');
    const progressCircle = document.getElementById('progressCircle');
    const officialSeal = document.getElementById('officialSeal');
    const certStatusMsg = document.getElementById('certStatusMsg');

    let progressInterval = null;
    let isSealed = false;
    const maxOffset = 276; // Circumference of progress circle

    function startHold(e) {
        if (isSealed) return;
        e.preventDefault();

        progressCircle.style.strokeDashoffset = maxOffset;
        const startTime = Date.now();

        progressInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progressRatio = Math.min(elapsedTime / 1500, 1);
            const currentOffset = maxOffset - (progressRatio * maxOffset);

            progressCircle.style.strokeDashoffset = currentOffset;

            if (progressRatio >= 1) {
                completeSeal();
            }
        }, 20);
    }

    function cancelHold() {
        if (isSealed) return;
        clearInterval(progressInterval);
        progressCircle.style.strokeDashoffset = maxOffset;
    }

    function completeSeal() {
        isSealed = true;
        clearInterval(progressInterval);
        progressCircle.style.strokeDashoffset = 0;

        officialSeal.classList.add('sealed');

        const rect = thumbprintTouchArea.getBoundingClientRect();
        createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);

        certStatusMsg.innerText = "Certificate officially sealed with love! 💗";
    }

    if (thumbprintTouchArea) {
        thumbprintTouchArea.addEventListener('pointerdown', startHold);
        thumbprintTouchArea.addEventListener('pointerup', cancelHold);
        thumbprintTouchArea.addEventListener('pointerleave', cancelHold);
        thumbprintTouchArea.addEventListener('contextmenu', (e) => e.preventDefault());
    }


    /* =========================================================================
       6. RESTART BUTTON ACTION
       ========================================================================= */
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            noClickCount = 0;
            yesScale = 1;
            if (yesBtn) yesBtn.style.transform = 'scale(1)';
            if (questionText) questionText.innerText = "Jagriti, do you still love me? 🥺❤️";
            if (subtitleText) subtitleText.innerText = "Think carefully, my cutie... my heart is waiting for your answer. 💗";
            if (characterEmoji) characterEmoji.innerText = "🥺";
            if (noBtn) noBtn.innerText = "No 🙈";

            isSealed = false;
            if (officialSeal) officialSeal.classList.remove('sealed');
            if (progressCircle) progressCircle.style.strokeDashoffset = maxOffset;
            if (certStatusMsg) certStatusMsg.innerText = "";

            showPage(1);
        });
    }

});