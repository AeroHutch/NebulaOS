/**
 * NebulaOS External App Template
 * Name: Test App
 * Description: A sample application to demonstrate the NebulaOS plugin system.
 */

(function() {
    // 1. Define the App Metadata
    const myApp = {
        id: 'test-app-' + Math.random().toString(36).substr(2, 9),
        name: 'Test App',
        icon: 'beaker',
        color: 'bg-emerald-500'
    };

    // 2. Define the UI Initialization Logic
    // This function is called by the OS when the window is created
    window[`init_${myApp.id}`] = function() {
        const content = document.getElementById(`content-${myApp.id}`);
        if (!content) return;

        content.className += " bg-slate-50 dark:bg-slate-900 p-6 flex flex-col items-center justify-center text-center";
        content.innerHTML = `
            <div class="space-y-4">
                <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <i data-lucide="beaker" class="w-8 h-8"></i>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-slate-800 dark:text-white">Hello from GitHub!</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-400">This app was fetched dynamically from the /apps folder.</p>
                </div>
                <div class="p-4 bg-white dark:bg-slate-800 rounded-lg border border-black/5 shadow-sm">
                    <p class="text-xs font-medium mb-2">Internal State Test:</p>
                    <div class="flex items-center gap-4">
                        <button id="dec-${myApp.id}" class="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300">-</button>
                        <span id="counter-${myApp.id}" class="text-lg font-bold">0</span>
                        <button id="inc-${myApp.id}" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500">+</button>
                    </div>
                </div>
                <button id="notify-${myApp.id}" class="text-xs text-blue-500 hover:underline">Test System Notification</button>
            </div>
        `;

        // 3. Handle Interactivity
        let count = 0;
        const counterEl = document.getElementById(`counter-${myApp.id}`);
        
        document.getElementById(`inc-${myApp.id}`).onclick = () => {
            count++;
            counterEl.textContent = count;
        };

        document.getElementById(`dec-${myApp.id}`).onclick = () => {
            count--;
            counterEl.textContent = count;
        };

        document.getElementById(`notify-${myApp.id}`).onclick = () => {
            if (typeof showNotification === 'function') {
                showNotification("Message from Test App: Success!");
            }
        };

        // Re-run lucide to render the icons inside the new window
        if (window.lucide) window.lucide.createIcons();
    };

    // 4. Register the app with the OS
    if (window.apps) {
        window.apps.push(myApp);
        
        // Helper to ensure the OS knows how to launch this specific instance
        const originalLaunch = window.launchApp;
        window.launchApp = function(id, params) {
            if (id === myApp.id) {
                // The OS logic for creating windows is already in nebula_os.html
                // We just need to ensure our init function runs after the window exists
                createWindow(myApp, params);
                setTimeout(() => window[`init_${myApp.id}`](), 50);
            } else {
                originalLaunch(id, params);
            }
        };
    }
})();
