// VARIABLES GLOBALES DE MÚSICA
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let userMuted = false;

// --- 1. FUNCIÓN DE INICIO (MÚSICA Y PÉTALOS) ---
function startExperience() {
    music.volume = 0.5; 
    
    // 1. Mostrar el botón de música INMEDIATAMENTE
    musicBtn.classList.remove('hidden'); 

    // 2. Intentar reproducir la música
    music.play().catch(error => {
        console.log("Aún no hay canción o el navegador la bloqueó:", error);
        // Si falla (porque no has puesto el mp3 aún), mostramos el ícono de muteado
        musicBtn.innerText = "🔇";
        userMuted = true;
    });

    createPetals();
    nextStep(1, 2);
}

// --- LÓGICA DEL BOTÓN DE MÚSICA ---
function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "🔊";
        userMuted = false;
    } else {
        music.pause();
        musicBtn.innerText = "🔇";
        userMuted = true;
    }
}

// Generador de pétalos
function createPetals() {
    const container = document.getElementById('petals-container');
    const totalPetals = 35; // Reduje un poco para rendimiento en celular

    for (let i = 0; i < totalPetals; i++) {
        let petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's, ' + (Math.random() * 2 + 2) + 's';
        petal.style.animationDelay = Math.random() * 10 + 's, 0s';
        
        container.appendChild(petal);
    }
}

// --- 2. TRANSICIÓN DE PANTALLAS ---
function nextStep(current, next) {
    const currentScreen = document.getElementById(`step-${current}`);
    const nextScreen = document.getElementById(`step-${next}`);

    currentScreen.classList.remove('active');
    currentScreen.classList.add('hidden');

    // Desplazar automáticamente hacia arriba cuando cambie de pantalla (útil para celulares)
    setTimeout(() => {
        nextScreen.scrollTo(0, 0); 
        nextScreen.classList.remove('hidden');
        nextScreen.classList.add('active');
    }, 800);
}

// --- 3. LÓGICA DE CHOCOLATES Y VIDEOS ---
function flipCard(cardNumber) {
    const card = document.getElementById(`choco-${cardNumber}`);
    const video = document.getElementById(`video-${cardNumber}`);
    const title = document.getElementById('choco-title');

    card.classList.add('flipped');
    
    if(video) {
        video.play();

        video.onplay = function() {
            if (!music.paused) {
                music.pause();
                musicBtn.innerText = "🔇";
            }
        };

        video.onpause = function() {
            if (!userMuted && video.currentTime !== video.duration) {
                music.play();
                musicBtn.innerText = "🔊";
            }
        };

        if (cardNumber === 1) {
            title.innerText = "Disfruta el video...";
            
            video.onended = function() {
                title.innerText = "¡Ahora puedes abrir el blanco!";
                title.style.color = "#ffb6c1";
                
                const choco2 = document.getElementById('choco-2');
                choco2.classList.remove('locked');

                if (!userMuted) {
                    music.play();
                    musicBtn.innerText = "🔊";
                }
            };
        }

        if (cardNumber === 2) {
            title.innerText = "Qué hermoso detalle, ¿verdad?";
            
            video.onended = function() {
                const btn = document.getElementById('btn-to-mail');
                btn.classList.remove('hidden');

                if (!userMuted) {
                    music.play();
                    musicBtn.innerText = "🔊";
                }
                
                // Hace scroll automático hacia abajo en móviles para mostrar el botón
                setTimeout(() => {
                   btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            };
        }
    }
}

// --- 4. ENVÍO DE WHATSAPP ---
function sendMessage() {
    const name = document.getElementById('senderName').value;
    const message = document.getElementById('senderMessage').value;

    if(name === '' || message === '') {
        alert("Por favor, llena tu nombre y el mensaje antes de enviar. 😊");
        return;
    }

    // PON TU NÚMERO DE WHATSAPP AQUÍ 
    const miNumero = "593963731759"; 
    
    const textoWhatsapp = `¡Hola Luisito! Soy ${name}. %0A%0A*Mi mensaje:* ${message}`;
    
    const url = `https://wa.me/${miNumero}?text=${textoWhatsapp}`;
    window.open(url, '_blank');
}