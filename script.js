document.addEventListener('DOMContentLoaded', () => {
    const reasonsList = document.getElementById('reasonsList');
    const nextReasonBtn = document.getElementById('nextReasonBtn');
    const showReasonsBtn = document.getElementById('showReasonsBtn');
    const showDedicationBtn = document.getElementById('showDedicationBtn');
    const reasonsContainer = document.getElementById('reasonsContainer');
    const dedicationDiv = document.getElementById('dedication');
    const confettiCanvas = document.getElementById('confetti-canvas');
    let confettiActive = false;
    let isVisible = false;
    const reasonsArr = [
        '1. No busco impresionarte con palabras bonitas, sino mostrarte quién soy de a poco, si me dejas. 🥕',
        '2. Juntos haríamos el mejor equipo de cocina, especialmente cuando preparemos tu amado carrot cake y el MEJOR👩‍🍳',
        '3. No te conozco tanto aún, pero me interesa sinceramente saber quién eres más  allá de lo que se ve. ✨',
        '4. Me gustaría ayudarte, acompañarte, estar ahí. Aunque sea tu DESAYUDANTE, me tomaría ese rol en serio. 🌟',
        '5. No pretendo ser el centro de tu mundo, pero sí sumar algo bonito al tuyo. 🧁',
        '6. Me gusta escucharte más que hablar, sin aparentar nada y si digo algo, lo digo de verdad. 💫',
        '7. No prometo ser perfecto, pero sí constante, leal  y honesto con lo que siento. 💝',
        '8. Los celos no se "corrigen" con exigencias, sino con confianza y comunicación. Y eso sé que te puedo dar. 🌸',
        '9. Mereces sentirte elegida cada día, sin dudas ni miedos y yo estoy dispuesto a demostrarlo con hechos, no solo palabras.',
        '10. Porque eres tú, Cami, simplemente tú ❤️'
    ];
    let currentReason = 0;

    // Corazones flotantes
    function createHearts() {
        const heartsBg = document.querySelector('.hearts-bg');
        for (let i = 0; i < 18; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            heart.style.opacity = 0.3 + Math.random() * 0.7;
            heart.style.fontSize = (18 + Math.random() * 32) + 'px';
            heart.textContent = '❤️';
            heartsBg.appendChild(heart);
        }
    }
    createHearts();

    // Animar corazones
    const style = document.createElement('style');
    style.innerHTML = `
    .floating-heart {
        position: absolute;
        top: -40px;
        animation: floatHeart linear infinite;
        will-change: transform, opacity;
    }
    @keyframes floatHeart {
        to {
            transform: translateY(110vh) scale(1.2) rotate(20deg);
            opacity: 0;
        }
    }`;
    document.head.appendChild(style);

    // Mostrar dedicatoria con animación de "escritura"
    showDedicationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dedicationDiv.style.display = 'block';
        dedicationDiv.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < dedicationText.length) {
                dedicationDiv.textContent += dedicationText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        typeWriter();
        showDedicationBtn.disabled = true;
    });

    // Confeti al mostrar todas las razones
    function launchConfetti() {
        confettiCanvas.style.display = 'block';
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        let pieces = [];
        for (let i = 0; i < 120; i++) {
            pieces.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * -confettiCanvas.height,
                r: 6 + Math.random() * 8,
                d: Math.random() * 80,
                color: `hsl(${Math.random()*360},80%,70%)`,
                tilt: Math.random() * 10 - 10
            });
        }
        let angle = 0;
        function draw() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            angle += 0.01;
            for (let i = 0; i < pieces.length; i++) {
                let p = pieces[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.y += Math.cos(angle + p.d) + 2 + p.r/4;
                p.x += Math.sin(angle);
                if (p.y > confettiCanvas.height) {
                    p.x = Math.random() * confettiCanvas.width;
                    p.y = Math.random() * -20;
                }
            }
            if (confettiActive) requestAnimationFrame(draw);
        }
        confettiActive = true;
        draw();
        setTimeout(() => {
            confettiActive = false;
            confettiCanvas.style.display = 'none';
        }, 2500);
    }

    function addReasonAnimated(index) {
        const li = document.createElement('li');
        li.className = 'reason';
        li.textContent = reasonsArr[index];
        reasonsList.appendChild(li);
        setTimeout(() => {
            li.classList.add('visible');
        }, 50);
    }

    // Mostrar razones y lanzar confeti
    showReasonsBtn.addEventListener('click', () => {
        if (!isVisible) {
            reasonsContainer.style.display = 'flex';
            reasonsList.innerHTML = '';
            currentReason = 0;
            addReasonAnimated(currentReason);
            nextReasonBtn.style.display = 'inline-block';
            showReasonsBtn.textContent = 'Ocultar razones';
        } else {
            reasonsList.innerHTML = '';
            reasonsContainer.style.display = 'none';
            nextReasonBtn.style.display = 'none';
            showReasonsBtn.textContent = 'Ver razones';
        }
        isVisible = !isVisible;
    });

    nextReasonBtn.addEventListener('click', () => {
        if (currentReason < reasonsArr.length - 1) {
            currentReason++;
            addReasonAnimated(currentReason);
            if (currentReason === reasonsArr.length - 1) {
                nextReasonBtn.textContent = 'Ocultar razones';
            }
        } else {
            reasonsList.innerHTML = '';
            reasonsContainer.style.display = 'none';
            nextReasonBtn.style.display = 'none';
            showReasonsBtn.textContent = 'Ver razones';
            isVisible = false;
        }
    });
});
