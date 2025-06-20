'use strict';


document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.firebaseConfig === 'undefined') {
        console.error("Firebase configuration (window.firebaseConfig) not found. Visitor counter cannot be initialized.");
        return;
    }

    const app = firebase.initializeApp(window.firebaseConfig);
    const database = app.database();
    const visitorCountRef = database.ref('visitorCount'); 

    const visitorCountElement = document.getElementById('visitor-count');

    if (!visitorCountElement) {
        console.warn("Visitor count element (id='visitor-count') not found. Skipping Firebase counter setup.");
        return;
    }

    function initializeFirebaseVisitorCounter() {
        const hasVisitedSession = sessionStorage.getItem('portfolioVisited');

        if (!hasVisitedSession) {
            console.log("New session detected. Attempting to increment visitor count via Firebase transaction...");
            visitorCountRef.transaction((currentCount) => {
                const newCount = (currentCount || 0) + 1;
                console.log(`Transaction: Current count was ${currentCount}, proposing new count ${newCount}`);
                return newCount;
            }, (error, committed, snapshot) => {
                if (error) {
                    console.error("Firebase transaction failed: ", error);
                    if (error.message && error.message.includes("permission_denied")) {
                        console.error("Firebase Error: Permission denied. Check your Realtime Database Security Rules for the 'visitorCount' node. It needs '.write': true.");
                    }
                    visitorCountElement.textContent = 'ERROR!';
                } else if (committed) {
                    console.log("Visitor count incremented successfully! New value:", snapshot.val());
                    sessionStorage.setItem('portfolioVisited', 'true');
                } else {
                    console.warn("Firebase transaction aborted (another client updated the count or data conflict).");
                }
            });
        } else {
            console.log("Visitor count not incremented (already visited this session).");
        }

        visitorCountRef.on('value', (snapshot) => {
            const currentCount = snapshot.val();
            if (currentCount !== null) {
                visitorCountElement.textContent = String(currentCount).padStart(6, '0');
            } else {
                visitorCountElement.textContent = '000000';
            }
        }, (error) => {
            console.error("Firebase read failed for visitor count: ", error);
            visitorCountElement.textContent = '------';
        });
    }

    initializeFirebaseVisitorCounter();
});