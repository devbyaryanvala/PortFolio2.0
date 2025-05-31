document.addEventListener('DOMContentLoaded', () => {

    // --- Matrix Text Cascade Easter Egg ---
    const matrixSequence = "matrix";
    let currentMatrixInput = "";

    // --- God Mode Visitor Counter Easter Egg ---
    const godModeSequence = "iddqd"; // Classic Doom cheat code
    let currentGodModeInput = "";
    const visitorCountElement = document.getElementById('visitor-count'); // Get the visitor count element

    document.addEventListener('keypress', (e) => {
        const typedChar = String.fromCharCode(e.keyCode).toLowerCase();

        // Handle Matrix Input
        currentMatrixInput += typedChar;
        if (currentMatrixInput.endsWith(matrixSequence)) {
            triggerMatrixEffect();
            currentMatrixInput = ""; // Reset after triggering
        }
        if (currentMatrixInput.length > 100) { // Prevent string from getting too long
            currentMatrixInput = currentMatrixInput.substring(currentMatrixInput.length - matrixSequence.length - 5);
        }

        // Handle God Mode Input
        if (visitorCountElement) { // Only process if the visitor counter element exists
            currentGodModeInput += typedChar;
            if (currentGodModeInput.endsWith(godModeSequence)) {
                triggerGodModeEffect();
                currentGodModeInput = ""; // Reset after triggering
            }
            if (currentGodModeInput.length > 100) { // Prevent string from getting too long
                currentGodModeInput = currentGodModeInput.substring(currentGodModeInput.length - godModeSequence.length - 5);
            }
        }
    });

    function triggerMatrixEffect() {
        console.log("Matrix Easter Egg Activated!");

        const effectContainer = document.createElement('div');
        effectContainer.style.position = 'fixed';
        effectContainer.style.top = '0';
        effectContainer.style.left = '0';
        effectContainer.style.width = '100%';
        effectContainer.style.height = '100%';
        effectContainer.style.overflow = 'hidden';
        effectContainer.style.zIndex = '10001';
        effectContainer.style.pointerEvents = 'none';
        document.body.appendChild(effectContainer);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ";
        const charArray = chars.split("");
        const numColumns = Math.floor(window.innerWidth / 15);

        for (let i = 0; i < numColumns; i++) {
            setTimeout(() => {
                createColumn(effectContainer, charArray, i * 15);
            }, Math.random() * 1000);
        }

        setTimeout(() => {
            if (document.body.contains(effectContainer)) {
                 document.body.removeChild(effectContainer);
            }
        }, 5000);
    }

    function createColumn(container, chars, xPosition) {
        let yPosition = Math.random() * -window.innerHeight;
        const columnSpeed = 5 + Math.random() * 10;

        function dropChar() {
            if (yPosition > window.innerHeight) {
                return;
            }

            const charElement = document.createElement('span');
            charElement.textContent = chars[Math.floor(Math.random() * chars.length)];
            charElement.style.position = 'absolute';
            charElement.style.left = xPosition + 'px';
            charElement.style.top = yPosition + 'px';
            charElement.style.color = '#39ff14';
            charElement.style.fontSize = '16px';
            charElement.style.fontFamily = "'RetroMono', monospace";
            charElement.style.textShadow = '0 0 5px #39ff14';
            charElement.style.opacity = '1';
            container.appendChild(charElement);

            yPosition += columnSpeed;

            setTimeout(() => {
                charElement.style.transition = 'opacity 0.8s';
                charElement.style.opacity = '0';
                setTimeout(() => {
                    if (container.contains(charElement)) {
                         container.removeChild(charElement);
                    }
                }, 800);
            }, 200 + Math.random() * 500);

            requestAnimationFrame(dropChar);
        }
        dropChar();
    }

    // --- God Mode Visitor Counter Effect Function ---
    function triggerGodModeEffect() {
        if (!visitorCountElement) return; // Safety check

        console.log("God Mode Easter Egg Activated on Visitor Counter!");
        const originalColor = visitorCountElement.style.color || 'yellow'; // Default to yellow if not set via CSS
        const originalTextShadow = visitorCountElement.style.textShadow;

        // Apply "God Mode" style
        visitorCountElement.style.color = '#FFD700'; // Gold color
        visitorCountElement.style.fontWeight = 'bold';
        visitorCountElement.style.transition = 'all 0.1s ease-in-out';
        visitorCountElement.style.textShadow = '0 0 5px #FFD700, 0 0 10px #FFF, 0 0 15px #FF8C00'; // Intense glow
        visitorCountElement.classList.add('god-mode-flash'); // For CSS animation

        // Add a temporary CSS animation for flashing
        const styleSheet = document.getElementById('easter-egg-styles') || document.createElement('style');
        styleSheet.id = 'easter-egg-styles';
        styleSheet.innerHTML = `
            .god-mode-flash {
                animation: godModePulse 0.3s 5 alternate; /* Pulse 5 times */
            }
            @keyframes godModePulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.15); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);


        // Revert to original style after a few seconds
        setTimeout(() => {
            visitorCountElement.style.color = originalColor;
            visitorCountElement.style.fontWeight = 'normal'; // Or whatever its original weight was
            visitorCountElement.style.textShadow = originalTextShadow || 'none';
            visitorCountElement.classList.remove('god-mode-flash');
            // Optionally remove the stylesheet if no other EEs use it or if it's single-use
            // if (styleSheet.parentNode && styleSheet.innerHTML.includes('@keyframes godModePulse')) {
            //    styleSheet.parentNode.removeChild(styleSheet);
            // }
            console.log("God Mode on Visitor Counter Deactivated.");
        }, 2000); // Effect lasts 2 seconds
    }

    // --- You could add more Easter eggs below ---

});