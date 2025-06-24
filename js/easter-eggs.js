document.addEventListener('DOMContentLoaded', () => {

    const matrixSequence = "matrix";
    let currentMatrixInput = "";

    const godModeSequence = "iddqd";
    let currentGodModeInput = "";
    const visitorCountElement = document.getElementById('visitor-count');

    // New Easter Egg Sequences
    const retroGameSequence = "retrogame";
    let currentRetroGameInput = "";

    const systemFailSequence = "systemfail";
    let currentSystemFailInput = "";

    const monochromeSequence = "monochrome";
    let currentMonochromeInput = "";

    // Get the pre-existing matrix container
    const matrixEffectContainer = document.querySelector('.matrix-effect-container');

    // Diagnostic console log for keypress listener
    console.log("Easter Eggs: Keypress listener active.");

    document.addEventListener('keypress', (e) => {
        const typedChar = String.fromCharCode(e.keyCode).toLowerCase();
        // console.log("Typed:", typedChar, "Current Matrix Input:", currentMatrixInput); // Uncomment for very verbose debugging

        // Matrix Effect
        currentMatrixInput += typedChar;
        if (currentMatrixInput.endsWith(matrixSequence)) {
            console.log("Easter Eggs: Matrix sequence detected!");
            triggerMatrixEffect();
            currentMatrixInput = "";
        }
        if (currentMatrixInput.length > 100) { // Keep input buffer from growing too large
            currentMatrixInput = currentMatrixInput.substring(currentMatrixInput.length - matrixSequence.length - 5);
        }

        // God Mode Effect
        if (visitorCountElement) {
            currentGodModeInput += typedChar;
            if (currentGodModeInput.endsWith(godModeSequence)) {
                console.log("Easter Eggs: God Mode sequence detected!");
                triggerGodModeEffect();
                currentGodModeInput = "";
            }
            if (currentGodModeInput.length > 100) { // Keep input buffer from growing too large
                currentGodModeInput = currentGodModeInput.substring(currentGodModeInput.length - godModeSequence.length - 5);
            }
        }

        // Retro Game Effect
        currentRetroGameInput += typedChar;
        if (currentRetroGameInput.endsWith(retroGameSequence)) {
            console.log("Easter Eggs: Retro Game sequence detected!");
            triggerRetroGameEffect();
            currentRetroGameInput = "";
        }
        if (currentRetroGameInput.length > 100) {
            currentRetroGameInput = currentRetroGameInput.substring(currentRetroGameInput.length - retroGameSequence.length - 5);
        }

        // System Fail Glitch Effect
        currentSystemFailInput += typedChar;
        if (currentSystemFailInput.endsWith(systemFailSequence)) {
            console.log("Easter Eggs: System Fail sequence detected!");
            triggerBrokenScreenGlitch();
            currentSystemFailInput = "";
        }
        if (currentSystemFailInput.length > 100) {
            currentSystemFailInput = currentSystemFailInput.substring(currentSystemFailInput.length - systemFailSequence.length - 5);
        }

        // Monochrome Toggle
        currentMonochromeInput += typedChar;
        if (currentMonochromeInput.endsWith(monochromeSequence)) {
            console.log("Easter Eggs: Monochrome sequence detected!");
            toggleMonochromeMode();
            currentMonochromeInput = "";
        }
        if (currentMonochromeInput.length > 100) {
            currentMonochromeInput = currentMonochromeInput.substring(currentMonochromeInput.length - monochromeSequence.length - 5);
        }
    });

    function triggerMatrixEffect() {
        console.log("Matrix Easter Egg Activated! - Showing container and generating chars.");

        if (!matrixEffectContainer) {
            console.error("Matrix effect container not found in HTML.");
            return;
        }

        // Clear any existing chars from previous runs
        matrixEffectContainer.innerHTML = ''; 
        matrixEffectContainer.style.display = 'block'; // Show the container

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ";
        const charArray = chars.split("");
        const numColumns = Math.floor(window.innerWidth / 15);

        for (let i = 0; i < numColumns; i++) {
            setTimeout(() => {
                createColumn(matrixEffectContainer, charArray, i * 15);
            }, Math.random() * 1000);
        }

        setTimeout(() => {
            matrixEffectContainer.style.display = 'none'; // Hide the container
            console.log("Matrix Easter Egg Activated! - Matrix effect ended.");
        }, 5000); // Effect lasts for 5 seconds
    }

function createColumn(container, chars, xPosition) {
        // Original: let yPosition = Math.random() * -window.innerHeight;
        let yPosition = 0; // Diagnostic: start at the very top of the container
        const columnSpeed = 10 + Math.random() * 10; // Diagnostic: faster descent

        function dropChar() {
            if (yPosition > window.innerHeight) {
                return;
            }

            const charElement = document.createElement('span');
            charElement.textContent = chars[Math.floor(Math.random() * chars.length)];
            charElement.classList.add('matrix-char');
            charElement.style.left = xPosition + 'px';
            charElement.style.top = yPosition + 'px';
            container.appendChild(charElement);

            yPosition += columnSpeed;

            // With matrixFadeAndFall set to be static, these timeouts for opacity fade are less relevant for initial display.
            setTimeout(() => {
                charElement.style.transition = 'none'; // No transition during debugging
                charElement.style.opacity = '1'; // Ensure full opacity
                // The charElement removal logic below is still important for cleanup.
                setTimeout(() => {
                    if (container.contains(charElement)) {
                        container.removeChild(charElement);
                    }
                }, 800); // This still controls how long individual chars stay. You can increase this.
            }, 200 + Math.random() * 500);

            requestAnimationFrame(dropChar);
        }
        dropChar();
    }

    function triggerGodModeEffect() {
        if (!visitorCountElement) return;

        console.log("God Mode Easter Egg Activated on Visitor Counter!");
        visitorCountElement.classList.add('god-mode-active');

        setTimeout(() => {
            visitorCountElement.classList.remove('god-mode-active');
            console.log("God Mode on Visitor Counter Deactivated.");
        }, 2000);
    }

    // NEW EASTER EGGS START HERE

    function triggerRetroGameEffect() {
        console.log("Retro Game Easter Egg Activated!");
        const body = document.body;
        body.classList.add('retro-game-mode');

        const overlay = document.createElement('div');
        overlay.classList.add('retro-game-overlay');
        document.body.appendChild(overlay);

        // Simple bouncing square character
        const char = document.createElement('div');
        char.classList.add('retro-game-char');
        overlay.appendChild(char);

        setTimeout(() => {
            body.classList.remove('retro-game-mode');
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            console.log("Retro Game Easter Egg Deactivated.");
        }, 5000); // Effect lasts for 5 seconds
    }

    function triggerBrokenScreenGlitch() {
        console.log("System Fail Glitch Easter Egg Activated!");
        const body = document.body;
        body.classList.add('glitch-active');

        // Play a glitch sound if an audio element exists. You would need to provide `assets/audio/glitch.mp3`.
        const glitchSound = document.getElementById('glitch-audio');
        if (glitchSound) {
            glitchSound.play().catch(e => console.warn("Glitch audio playback failed:", e));
        }

        setTimeout(() => {
            body.classList.remove('glitch-active');
            console.log("System Fail Glitch Easter Egg Deactivated.");
        }, 5000); // Effect lasts for 5 seconds
    }

    function toggleMonochromeMode() {
        console.log("Monochrome Mode Toggled!");
        const body = document.body;
        body.classList.toggle('monochrome-mode');
    }

});