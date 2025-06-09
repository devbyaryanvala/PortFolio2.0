document.addEventListener('DOMContentLoaded', () => {

    const matrixSequence = "matrix";
    let currentMatrixInput = "";

    const godModeSequence = "iddqd";
    let currentGodModeInput = "";
    const visitorCountElement = document.getElementById('visitor-count');

    document.addEventListener('keypress', (e) => {
        const typedChar = String.fromCharCode(e.keyCode).toLowerCase();

        currentMatrixInput += typedChar;
        if (currentMatrixInput.endsWith(matrixSequence)) {
            triggerMatrixEffect();
            currentMatrixInput = "";
        }
        if (currentMatrixInput.length > 100) {
            currentMatrixInput = currentMatrixInput.substring(currentMatrixInput.length - matrixSequence.length - 5);
        }

        if (visitorCountElement) {
            currentGodModeInput += typedChar;
            if (currentGodModeInput.endsWith(godModeSequence)) {
                triggerGodModeEffect();
                currentGodModeInput = "";
            }
            if (currentGodModeInput.length > 100) {
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

    function triggerGodModeEffect() {
        if (!visitorCountElement) return;

        console.log("God Mode Easter Egg Activated on Visitor Counter!");
        const originalColor = visitorCountElement.style.color || 'yellow';
        const originalTextShadow = visitorCountElement.style.textShadow;

        visitorCountElement.style.color = '#FFD700';
        visitorCountElement.style.fontWeight = 'bold';
        visitorCountElement.style.transition = 'all 0.1s ease-in-out';
        visitorCountElement.style.textShadow = '0 0 5px #FFD700, 0 0 10px #FFF, 0 0 15px #FF8C00';
        visitorCountElement.classList.add('god-mode-flash');

        const styleSheet = document.getElementById('easter-egg-styles') || document.createElement('style');
        styleSheet.id = 'easter-egg-styles';
        styleSheet.innerHTML = `
            .god-mode-flash {
                animation: godModePulse 0.3s 5 alternate;
            }
            @keyframes godModePulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.15); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);

        setTimeout(() => {
            visitorCountElement.style.color = originalColor;
            visitorCountElement.style.fontWeight = 'normal';
            visitorCountElement.style.textShadow = originalTextShadow || 'none';
            visitorCountElement.classList.remove('god-mode-flash');
            console.log("God Mode on Visitor Counter Deactivated.");
        }, 2000);
    }
});
