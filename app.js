/**
 * Crea-Caos Application Logic
 * Vanilla JavaScript implementation
 */

const app = {
    state: {
        screen: 'loading',
        isHost: false,
        roomCode: '',
        players: [],
        settings: {
            music: 70,
            sfx: 50,
            largeText: false
        }
    },

    init() {
        console.log('Crea-Caos Initializing...');
        this.dom = {
            loadingBar: document.getElementById('loading-bar'),
            loadingText: document.getElementById('loading-text'),
            lobbyRoomCode: document.getElementById('lobby-room-code'),
            playerGrid: document.getElementById('player-grid'),
            playerCount: document.getElementById('player-count'),
            gameContent: document.getElementById('game-content'),
            gameFooter: document.getElementById('game-footer'),
            screens: {
                loading: document.getElementById('screen-loading'),
                menu: document.getElementById('screen-menu'),
                lobby: document.getElementById('screen-lobby'),
                gameSelection: document.getElementById('screen-game-selection'),
                game: document.getElementById('screen-game'),
                settings: document.getElementById('screen-settings'),
                leaderboard: document.getElementById('screen-leaderboard'),
                instructions: document.getElementById('screen-instructions')
            }
        };

        this.setupEventListeners();
        
        // Load AI Model
        this.loadModel().then(() => {
            console.log("AI Model Loaded");
        });

        this.simulateLoading();
    },

    async loadModel() {
        try {
            this.mobilenetModel = await mobilenet.load();
        } catch (error) {
            console.error("Error loading MobileNet:", error);
        }
    },

    setupEventListeners() {
        document.getElementById('btn-start-game')?.addEventListener('click', () => {
            this.startGame();
        });
    },

    simulateLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.showScreen('menu'), 500);
            }
            this.dom.loadingBar.style.width = `${progress}%`;

            // Randomize loading text
            const texts = ["Preparando el caos...", "Invocando la creatividad...", "Afilando los lápices...", "Limpiando el lienzo...", "Sincronizando la diversión..."];
            if (Math.random() > 0.8) {
                this.dom.loadingText.innerText = texts[Math.floor(Math.random() * texts.length)];
            }
        }, 150);
    },

    showScreen(screenName) {
        console.log(`Transitioning to: ${screenName}`);

        // Hide all screens
        Object.values(this.dom.screens).forEach(screen => {
            if (screen) screen.classList.add('hidden');
        });

        // Show target screen
        const target = this.dom.screens[screenName];
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('flex'); // Most screens use flex
            target.classList.add('fade-in');
        }

        this.state.screen = screenName;

        // Specialized initialization
        if (screenName === 'lobby') {
            this.initLobby();
        }
    },

    initLobby() {
        this.dom.lobbyRoomCode.innerText = this.state.roomCode || 'JOIN';
        this.renderPlayers();

        // Simulating players joining if we are host
        if (this.state.isHost && this.state.players.length === 0) {
            this.addPlayer('Tú (Host)', true);
            setTimeout(() => this.addPlayer('Ana'), 2000);
            setTimeout(() => this.addPlayer('Leo'), 4000);
            setTimeout(() => this.addPlayer('Max'), 5500);
        }
    },

    addPlayer(name, isMe = false) {
        const avatarUrl = [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA0OgfMPryJIy7pXxRuLOXzQzVj0DOiDDckr-okCwf5YO-XR9zXOU6zE95MZ4mfIoJAgXYE-bNDh69C3qbOWLh7bh2aFADCPi15llG3QBbEW4mqr7_iklohtrmIsZ3lbMobo2Gg4TMNF74r1BgARXyFi1o_qPxPhZXh6rOh3vrEAEum94rzY6_g_yiPTQWDZrPTXAn3O7iZpCOXsiL6SCRO7k7qxxtfsuucvOeh2bac9xmogca0oFyrgnQkD82HqTsA_phC-gzsWx8',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAH61OAi5SecyMOP72R3BBqCpes4Q-h1XEjew5-lXeY-YnjDOHa-69OOTpOI-Yvl4Vm9AlL5LW_UZcVawPzIMaXAWm55ceG25txfskQieE6PqTYzvyCO22u22LHNUt8ZOZx9fcIMkhVwiXIqTf4i5KPeb59jggVYdFfNWOu8axPPzwPbzrmQsJkK6izniS0ALIZeofAh7B41ezWmvwGKHyCjzFPON5XYDf1fhQT06UJjLkf16VNBvkxle1KxcP6vL1GbnuuFQofNvo',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAPLwFaApb6iik9mxUQAV1WIehtQvQpEd9Qed7FeKAoZVWNOA9fajCeuq2xJAl4614EAWQo-qNPJmRx0hw2FCZ-2bK4YunTIgVwEGQJCH3qujT2_jtocJYq7WTUNmFGllFT0eQ1h_M37oY7ycndZy63tNwL-8dx27Tkgze6d2F4mvpT8h4YMpKOsidHpFF3BcBI3f4tTOo3a7jAqa36mEaiiPL01YAIOTIiywKAlyZpW01gKXeA59jQOvioZPfMRpT5TSCr4CzBwzo',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA-tjEyt3T2bnEKJ-1P9uyY5fXgJBGzvvAPLW_V-SYkmjIWqNR_v6V4SgiGc0wpEoeurGoZDV2oVKjxtTvSzJJIK0gtanxrPsbYZef59CkAO5H3HUHU9Y0sZWxidsiGJLXJ8qgMZGxCBqAJ8OOK8cGnC4jrsNB0UoRI-3IyS6oQTCP51Ec7BDfyStDX9sO6Pywo4VFTiAJgRTAW2q1PpoUWtenJrUylNHYmUXAFdrfwcPGl_BNV9NZojJaOPvWiR1KBXPHwMYZYElk'
        ];

        const player = {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            avatar: avatarUrl[this.state.players.length % avatarUrl.length],
            isMe: isMe
        };
        this.state.players.push(player);
        this.renderPlayers();
    },

    renderPlayers() {
        this.dom.playerGrid.innerHTML = '';
        this.state.players.forEach(player => {
            const div = document.createElement('div');
            div.className = 'flex flex-col items-center gap-2 fade-in';
            div.innerHTML = `
                <div class="relative">
                    <div class="size-16 rounded-full border-2 ${player.isMe ? 'border-primary shadow-[0_0_15px_rgba(244,37,175,0.4)]' : 'border-white/20'} overflow-hidden bg-surface-dark bg-cover bg-center" style="background-image: url('${player.avatar}')">
                    </div>
                    ${player.isMe ? '<div class="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-background-dark rounded-full"></div>' : ''}
                </div>
                <span class="text-[10px] font-bold ${player.isMe ? 'text-primary' : 'text-white/60'} text-center">${player.name}</span>
            `;
            this.dom.playerGrid.appendChild(div);
        });

        // Fill empty slots
        for (let i = this.state.players.length; i < 8; i++) {
            const empty = document.createElement('div');
            empty.className = 'flex flex-col items-center gap-2 opacity-20';
            empty.innerHTML = `
                <div class="size-16 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white/40">add</span>
                </div>
                <span class="text-[10px] font-bold text-white/40 uppercase">Vacio</span>
            `;
            this.dom.playerGrid.appendChild(empty);
        }

        this.dom.playerCount.innerText = `${this.state.players.length} / 8`;
    },

    createGame() {
        console.log('Creating new game...');
        this.state.isHost = true;
        this.state.players = [];
        this.state.roomCode = this.generateRoomCode();
        this.showScreen('lobby');
    },

    joinGame() {
        console.log('Joining game...');
        this.state.isHost = false;
        this.state.players = [];
        this.state.roomCode = ''; // Will need input later
        this.addPlayer('Tú (Jugador)', true);
        this.showScreen('lobby');
    },

    startGame() {
        console.log('Transitioning to selection...');
        this.showScreen('gameSelection');
    },

    selectMinigame(minigame) {
        console.log(`Minigame selected: ${minigame}`);
        this.state.currentMinigame = minigame;
        this.showScreen('game');
        this.initMinigame(minigame);
    },

    initMinigame(minigame) {
        // Clear any existing timers from previous games
        if (this.contraptionTimer) {
            clearInterval(this.contraptionTimer);
            this.contraptionTimer = null;
        }
        if (this.scavengerTimer) {
            clearInterval(this.scavengerTimer);
            this.scavengerTimer = null;
        }
        if (this.doodleTimer) {
            clearInterval(this.doodleTimer);
            this.doodleTimer = null;
        }

        this.dom.gameContent.innerHTML = '';
        this.dom.gameFooter.classList.remove('hidden');
        this.dom.gameFooter.innerHTML = '';

        if (minigame === 'contraption') {
            this.renderContraptionGame();
        } else if (minigame === 'scavenger') {
            this.renderScavengerGame();
        } else if (minigame === 'doodle') {
            this.renderDoodleGame();
        }
    },

    renderContraptionGame() {
        // All available pieces (12 total)
        const allPieces = [
            { id: 1, name: 'Engranaje', icon: 'settings', points: 10, color: 'from-blue-500/20 to-cyan-500/20' },
            { id: 2, name: 'Resorte', icon: 'spool', points: 15, color: 'from-primary/20 to-purple-500/20' },
            { id: 3, name: 'Rueda', icon: 'radio_button_unchecked', points: 10, color: 'from-green-500/20 to-emerald-500/20' },
            { id: 4, name: 'Motor', icon: 'bolt', points: 25, color: 'from-yellow-500/20 to-orange-500/20' },
            { id: 5, name: 'Tubo', icon: 'horizontal_rule', points: 8, color: 'from-slate-500/20 to-gray-500/20' },
            { id: 6, name: 'Hélice', icon: 'toys_fan', points: 20, color: 'from-red-500/20 to-pink-500/20' },
            { id: 7, name: 'Pistón', icon: 'swap_vert', points: 18, color: 'from-amber-500/20 to-yellow-500/20' },
            { id: 8, name: 'Imán', icon: 'attractions', points: 22, color: 'from-indigo-500/20 to-blue-500/20' },
            { id: 9, name: 'Bombilla', icon: 'lightbulb', points: 12, color: 'from-yellow-400/20 to-amber-400/20' },
            { id: 10, name: 'Palanca', icon: 'tune', points: 14, color: 'from-teal-500/20 to-cyan-500/20' },
            { id: 11, name: 'Cable', icon: 'cable', points: 8, color: 'from-gray-500/20 to-zinc-500/20' },
            { id: 12, name: 'Cohete', icon: 'rocket_launch', points: 30, color: 'from-orange-500/20 to-red-500/20' }
        ];
        
        // Shuffle and pick 6 random pieces
        const shuffled = allPieces.sort(() => Math.random() - 0.5);
        const selectedPieces = shuffled.slice(0, 6);

        // Initialize contraption state
        this.contraptionState = {
            pieces: selectedPieces,
            placedPieces: [],
            score: 0,
            timeLeft: 45
        };

        this.dom.gameContent.innerHTML = `
            <div class="w-full flex flex-col h-full gap-4 animate-in slide-in-from-bottom duration-700 overflow-y-auto pb-48">
                <div class="flex items-center justify-between shrink-0">
                    <div class="bg-surface-accent/80 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">stars</span>
                        <span id="contraption-score" class="text-xl font-black text-white">0</span>
                        <span class="text-xs text-white/40">pts</span>
                    </div>
                    <div class="bg-surface-accent/80 px-4 py-2 rounded-xl border border-white/10">
                        <span id="contraption-timer" class="text-xl font-black text-primary">45</span>
                        <span class="text-xs text-white/40">s</span>
                    </div>
                </div>
                
                <div class="flex-1 bg-surface-dark/50 rounded-2xl border-2 border-dashed border-white/20 p-4 relative overflow-hidden shrink-0 min-h-[250px]">
                    <div class="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                        <span class="material-symbols-outlined text-6xl text-white/20">construction</span>
                    </div>
                    <p class="text-center text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Zona de Construcción</p>
                    <div id="construction-area" class="flex flex-wrap gap-2 justify-center content-start min-h-[120px]"></div>
                </div>

                <div class="bg-surface-accent/50 rounded-2xl p-4 border border-white/10 shrink-0">
                    <p class="text-primary text-[10px] font-bold uppercase tracking-widest mb-3">Piezas Disponibles</p>
                    <div id="piece-inventory" class="grid grid-cols-3 gap-3"></div>
                </div>
            </div>
        `;

        this.dom.gameFooter.innerHTML = `
            <button id="btn-finish-contraption" class="w-full h-14 bg-primary text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-xl shadow-primary/30 active:scale-95 transition-all">
                <span class="material-symbols-outlined">rocket_launch</span> ¡PROBAR MÁQUINA!
            </button>
        `;

        this.setupContraptionGame();
    },

    setupContraptionGame() {
        const inventoryEl = document.getElementById('piece-inventory');
        const constructionEl = document.getElementById('construction-area');
        const scoreEl = document.getElementById('contraption-score');
        const timerEl = document.getElementById('contraption-timer');

        // Render inventory pieces
        this.contraptionState.pieces.forEach(piece => {
            const pieceEl = document.createElement('button');
            pieceEl.className = `flex flex-col items-center gap-1 p-3 rounded-xl bg-gradient-to-br ${piece.color} border border-white/10 hover:scale-105 active:scale-95 transition-all`;
            pieceEl.innerHTML = `
                <span class="material-symbols-outlined text-2xl text-white">${piece.icon}</span>
                <span class="text-[10px] font-bold text-white/80">${piece.name}</span>
                <span class="text-[8px] text-primary font-bold">+${piece.points}</span>
            `;
            pieceEl.addEventListener('click', () => this.addPieceToConstruction(piece));
            inventoryEl.appendChild(pieceEl);
        });

        // Finish button
        document.getElementById('btn-finish-contraption').addEventListener('click', () => {
            clearInterval(this.contraptionTimer);
            this.animateContraptionResult();
        });

        // Timer
        this.contraptionTimer = setInterval(() => {
            this.contraptionState.timeLeft--;
            timerEl.textContent = this.contraptionState.timeLeft;
            if (this.contraptionState.timeLeft <= 10) {
                timerEl.classList.add('animate-pulse', 'text-red-400');
            }
            if (this.contraptionState.timeLeft <= 0) {
                clearInterval(this.contraptionTimer);
                this.animateContraptionResult();
            }
        }, 1000);
    },

    addPieceToConstruction(piece) {
        const constructionEl = document.getElementById('construction-area');
        const scoreEl = document.getElementById('contraption-score');

        // Add piece to state
        this.contraptionState.placedPieces.push(piece);
        this.contraptionState.score += piece.points;

        // Update UI
        scoreEl.textContent = this.contraptionState.score;
        scoreEl.classList.add('scale-125');
        setTimeout(() => scoreEl.classList.remove('scale-125'), 200);

        // Create placed piece element
        const placedEl = document.createElement('div');
        placedEl.className = `size-14 rounded-xl bg-gradient-to-br ${piece.color} border border-white/20 flex items-center justify-center animate-in zoom-in duration-300 shadow-lg`;
        placedEl.innerHTML = `<span class="material-symbols-outlined text-2xl text-white">${piece.icon}</span>`;
        constructionEl.appendChild(placedEl);

        // Show floating points
        const floatPoints = document.createElement('div');
        floatPoints.className = 'absolute text-primary font-black text-lg animate-bounce';
        floatPoints.style.top = '50%';
        floatPoints.style.left = '50%';
        floatPoints.textContent = `+${piece.points}`;
        constructionEl.appendChild(floatPoints);
        setTimeout(() => floatPoints.remove(), 800);
    },

    animateContraptionResult() {
        const content = this.dom.gameContent;
        content.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-6 animate-in zoom-in duration-500">
                <div class="text-8xl animate-bounce">🚀</div>
                <h2 class="text-3xl font-black text-white">¡Máquina Lista!</h2>
                <div class="bg-primary/20 border border-primary/30 rounded-2xl px-8 py-4">
                    <p class="text-primary text-sm font-bold uppercase tracking-widest">Puntuación Total</p>
                    <p class="text-5xl font-black text-white">${this.contraptionState.score}</p>
                </div>
                <p class="text-white/50 text-sm">Piezas usadas: ${this.contraptionState.placedPieces.length}</p>
            </div>
        `;
        this.dom.gameFooter.innerHTML = `
            <button onclick="app.nextMinigame()" class="w-full h-14 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
                <span class="material-symbols-outlined text-primary">arrow_forward</span> SIGUIENTE JUEGO
            </button>
        `;
    },

    renderScavengerGame() {
        // All available objectives (Updated for AI detection)
        const allObjectives = [
            { id: 1, question: '¿Qué usas para escribir en la computadora?', hint: 'Tiene muchas teclas', icon: '⌨️', target: ['computer keyboard', 'keyboard', 'typewriter keyboard'], found: false },
            { id: 2, question: '¿Con qué mueves el cursor?', hint: 'Tiene botones y rueda', icon: '🖱️', target: ['computer mouse', 'mouse'], found: false },
            { id: 3, question: '¿De qué bebes café?', hint: 'Tiene un asa', icon: '☕', target: ['coffee mug', 'cup', 'mug', 'coffeepot'], found: false },
            { id: 4, question: '¿Qué usas para hidratarte?', hint: 'Generalmente es de plástico', icon: '🧴', target: ['water bottle', 'bottle', 'pop bottle'], found: false },
            { id: 5, question: '¿Qué usas para llamar?', hint: 'Es inteligente', icon: '📱', target: ['cellular telephone', 'cellphone', 'mobile phone', 'dial telephone'], found: false },
            { id: 6, question: '¿Con qué cambias la TV?', hint: 'Tiene muchos botones', icon: '📺', target: ['remote control', 'remote'], found: false },
            { id: 7, question: '¿Dónde ves videos?', hint: 'Tiene pantalla', icon: '💻', target: ['laptop', 'notebook', 'laptop computer', 'monitor', 'screen'], found: false },
            { id: 8, question: '¿Qué usas para jugar?', hint: 'Tiene palancas', icon: '🎮', target: ['joystick', 'gamepad', 'controller'], found: false },
        ];
        
        // Shuffle and pick 3 random objectives
        const shuffled = allObjectives.sort(() => Math.random() - 0.5);
        const selectedObjectives = shuffled.slice(0, 3).map((obj, idx) => ({...obj, id: idx + 1, found: false}));

        // Initialize scavenger state
        this.scavengerState = {
            objectives: selectedObjectives,
            currentIndex: 0,
            score: 0,
            timeLeft: 90,
            isScanning: false
        };

        this.renderScavengerUI(true);
        this.setupScavengerGame(true);
    },

    renderScavengerUI(initial = false) {
        const current = this.scavengerState.objectives[this.scavengerState.currentIndex];
        const found = this.scavengerState.objectives.filter(o => o.found).length;
        const total = this.scavengerState.objectives.length;

        if (initial) {
            this.dom.gameContent.innerHTML = `
                <div class="absolute inset-0 bg-slate-900 overflow-hidden">
                    <video id="camera-feed" autoplay playsinline muted class="h-full w-full object-cover opacity-60"></video>
                    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                    <div id="scan-line" class="absolute inset-x-0 top-1/2 h-1 bg-primary/40 shadow-[0_0_15px_#f425af] scan-line"></div>
                </div>
                <div class="relative z-10 w-full flex flex-col h-full py-4 gap-4 pointer-events-none">
                    <div class="flex items-center justify-between px-2 pointer-events-auto">
                        <div class="bg-surface-accent/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-sm">stars</span>
                            <span id="scavenger-score" class="text-lg font-black text-white">${this.scavengerState.score}</span>
                        </div>
                        <div id="objectives-list" class="flex gap-1">
                            ${this.scavengerState.objectives.map(o => `
                                <div class="size-8 rounded-lg ${o.found ? 'bg-green-500/30 border-green-500' : 'bg-surface-accent/50 border-white/10'} border flex items-center justify-center text-lg">
                                    ${o.found ? '✅' : o.icon}
                                </div>
                            `).join('')}
                        </div>
                        <div class="bg-surface-accent/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                            <span id="scavenger-timer" class="text-lg font-black ${this.scavengerState.timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-primary'}">${this.scavengerState.timeLeft}</span>
                            <span class="text-xs text-white/40">s</span>
                        </div>
                    </div>

                    <div id="current-objective-card" class="bg-surface-accent/80 backdrop-blur-md rounded-2xl p-4 border-l-4 border-primary shadow-2xl pointer-events-auto transition-all duration-300">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Objetivo ${this.scavengerState.currentIndex + 1}/${total}</p>
                                <h2 class="text-xl font-bold">${current.question}</h2>
                                <p class="text-white/60 text-xs mt-1">${current.hint}</p>
                            </div>
                            <span class="text-4xl">${current.icon}</span>
                        </div>
                    </div>

                    <div class="flex-1 flex items-center justify-center">
                        <div id="scan-area" class="size-56 border-2 border-primary/40 rounded-3xl relative flex items-center justify-center transition-all duration-300">
                            <span class="material-symbols-outlined text-4xl text-white/30 animate-pulse">center_focus_weak</span>
                        </div>
                    </div>

                    <div id="feedback-area" class="h-16 flex items-center justify-center pointer-events-auto"></div>
                </div>
            `;

            this.dom.gameFooter.innerHTML = `
            <div class="flex flex-col items-center gap-3 w-full pointer-events-auto relative z-50">
                <button id="btn-scan" class="size-20 rounded-full bg-primary border-[6px] border-white/10 shadow-2xl flex items-center justify-center active:scale-95 transition-all group cursor-pointer touch-manipulation">
                    <span class="material-symbols-outlined text-3xl text-white">document_scanner</span>
                </button>
                <p class="text-[10px] font-bold uppercase tracking-[.3em] text-white/40">Presiona para Escanear</p>
            </div>
        `;
        } else {
            // Update existing UI elements
            const scoreEl = document.getElementById('scavenger-score');
            const objectivesList = document.getElementById('objectives-list');
            const card = document.getElementById('current-objective-card');
            const timerEl = document.getElementById('scavenger-timer');
            const feedbackArea = document.getElementById('feedback-area');

            if(scoreEl) scoreEl.innerText = this.scavengerState.score;
            if(objectivesList) {
                objectivesList.innerHTML = this.scavengerState.objectives.map(o => `
                    <div class="size-8 rounded-lg ${o.found ? 'bg-green-500/30 border-green-500' : 'bg-surface-accent/50 border-white/10'} border flex items-center justify-center text-lg">
                        ${o.found ? '✅' : o.icon}
                    </div>
                `).join('');
            }
            if(card) {
                card.innerHTML = `
                    <div class="flex items-center justify-between animate-in slide-in-from-right duration-300">
                        <div>
                            <p class="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Objetivo ${this.scavengerState.currentIndex + 1}/${total}</p>
                            <h2 class="text-xl font-bold">${current.question}</h2>
                            <p class="text-white/60 text-xs mt-1">${current.hint}</p>
                        </div>
                        <span class="text-4xl">${current.icon}</span>
                    </div>
                `;
            }
            if(feedbackArea) feedbackArea.innerHTML = '';
        }
    },

    setupScavengerGame(initial = false) {
        if (initial) {
            // Scan button interaction
            const btnScan = document.getElementById('btn-scan');
            if(btnScan) {
                const triggerScan = (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Stop event bubbling
                    console.log('Botón de escaneo presionado'); 
                    this.performScan();
                };

                // Add both touch and click events to be safe on mobile
                btnScan.addEventListener('touchstart', triggerScan, { passive: false });
                btnScan.addEventListener('click', triggerScan);
            }
            
            // Start Camera
            this.startCamera();

            // Timer
            this.scavengerTimer = setInterval(() => {
                this.scavengerState.timeLeft--;
                const timerEl = document.getElementById('scavenger-timer');
                if (timerEl) {
                    timerEl.textContent = this.scavengerState.timeLeft;
                    if (this.scavengerState.timeLeft <= 10) {
                        timerEl.classList.add('text-red-400', 'animate-pulse');
                    }
                }
                if (this.scavengerState.timeLeft <= 0) {
                    clearInterval(this.scavengerTimer);
                    this.finishScavengerGame();
                }
            }, 1000);
        }
    },

    async startCamera() {
        const videoElement = document.getElementById('camera-feed');
        if (!videoElement) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment' // Prefer back camera
                } 
            });
            videoElement.srcObject = stream;
        } catch (err) {
            console.error("Error accessing camera:", err);
            // Fallback UI or alert
            const feedbackArea = document.getElementById('feedback-area');
            if(feedbackArea) {
                 feedbackArea.innerHTML = `
                    <div class="bg-red-500/20 border border-red-500/40 rounded-2xl px-6 py-3 flex items-center gap-3 animate-in zoom-in">
                        <span class="text-3xl">🚫</span>
                        <div>
                            <p class="text-red-400 font-bold">Cámara Bloqueada</p>
                            <p class="text-red-300/60 text-xs">Permite el acceso para jugar</p>
                        </div>
                    </div>
                `;
            }
        }
    },

    performScan() {
        if (this.scavengerState.isScanning) return;
        this.scavengerState.isScanning = true;

        const scanArea = document.getElementById('scan-area');
        const feedbackArea = document.getElementById('feedback-area');
        const btnScan = document.getElementById('btn-scan');

        // Scanning animation
        scanArea.classList.add('border-primary', 'shadow-[0_0_30px_rgba(244,37,175,0.5)]');
        btnScan.disabled = true;
        btnScan.classList.add('opacity-50');

        feedbackArea.innerHTML = `
            <div class="flex items-center gap-2 text-primary animate-pulse">
                <span class="material-symbols-outlined animate-spin">sync</span>
                <span class="text-sm font-bold">Escaneando...</span>
            </div>
        `;

        // AI Classification
        const videoElement = document.getElementById('camera-feed');
        
        if (!this.mobilenetModel || !videoElement) {
             // Fallback if model not loaded
             setTimeout(() => {
                 this.handleScanResult(false, null);
             }, 1000);
             return;
        }

        this.mobilenetModel.classify(videoElement).then(predictions => {
            console.log('Predictions:', predictions);
            const current = this.scavengerState.objectives[this.scavengerState.currentIndex];
            
            // Check if any of the top 3 predictions match the target keywords
            let match = false;
            let detectedName = predictions[0] ? predictions[0].className.split(',')[0] : 'nada';

            for (const prediction of predictions) {
                if (current.target.some(t => prediction.className.toLowerCase().includes(t.toLowerCase()))) {
                    match = true;
                    detectedName = prediction.className.split(',')[0];
                    break;
                }
            }

            this.handleScanResult(match, detectedName);
        }).catch(err => {
            console.error(err);
             this.handleScanResult(false, 'error');
        });
    },

    handleScanResult(success, detectedObject) {
        const feedbackArea = document.getElementById('feedback-area');
        const scanArea = document.getElementById('scan-area');
        const btnScan = document.getElementById('btn-scan');

        if (success) {
            // Success!
            const current = this.scavengerState.objectives[this.scavengerState.currentIndex];
            current.found = true;
            this.scavengerState.score += 100;

            feedbackArea.innerHTML = `
                <div class="bg-green-500/20 border border-green-500/40 rounded-2xl px-6 py-3 flex items-center gap-3 animate-in zoom-in">
                    <span class="text-3xl">✅</span>
                    <div>
                        <p class="text-green-400 font-bold">¡Encontrado!</p>
                        <p class="text-green-300/60 text-xs">Es un(a) ${detectedObject}</p>
                    </div>
                </div>
            `;

            scanArea.classList.remove('border-primary');
            scanArea.classList.add('border-green-500', 'shadow-[0_0_30px_rgba(34,197,94,0.5)]');

            // Move to next objective or finish
            setTimeout(() => {
                const remaining = this.scavengerState.objectives.filter(o => !o.found);
                if (remaining.length === 0) {
                    clearInterval(this.scavengerTimer);
                    this.finishScavengerGame();
                } else {
                    // Find next unfound objective
                    this.scavengerState.currentIndex = this.scavengerState.objectives.findIndex(o => !o.found);
                    this.scavengerState.isScanning = false;
                    this.renderScavengerUI(); 
                    // No need to call setupScavengerGame() as events are stable and camera persists
                }
            }, 2000);
        } else {
            // Fail
            feedbackArea.innerHTML = `
                <div class="bg-red-500/20 border border-red-500/40 rounded-2xl px-6 py-3 flex items-center gap-3 animate-in zoom-in">
                    <span class="text-3xl">❌</span>
                    <div>
                        <p class="text-red-400 font-bold">No es eso</p>
                        <p class="text-red-300/60 text-xs">Veo: ${detectedObject || 'nada'}</p>
                    </div>
                </div>
            `;

            scanArea.classList.remove('border-primary');
            scanArea.classList.add('border-red-500', 'shadow-[0_0_30px_rgba(239,68,68,0.5)]');

            setTimeout(() => {
                scanArea.classList.remove('border-red-500', 'shadow-[0_0_30px_rgba(239,68,68,0.5)]');
                scanArea.classList.add('border-primary/40');
                feedbackArea.innerHTML = '';
                btnScan.disabled = false;
                btnScan.classList.remove('opacity-50');
                this.scavengerState.isScanning = false;
            }, 2000);
        }
    },

    finishScavengerGame() {
        const found = this.scavengerState.objectives.filter(o => o.found).length;
        const total = this.scavengerState.objectives.length;

        this.dom.gameContent.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-6 animate-in zoom-in duration-500">
                <div class="text-8xl">${found === total ? '🎉' : '📸'}</div>
                <h2 class="text-3xl font-black text-white">${found === total ? '¡Misión Cumplida!' : 'Caza Terminada'}</h2>
                <div class="flex gap-2">
                    ${this.scavengerState.objectives.map(o => `
                        <div class="size-12 rounded-xl ${o.found ? 'bg-green-500/30 border-green-500' : 'bg-red-500/30 border-red-500'} border flex items-center justify-center text-2xl">
                            ${o.found ? '✅' : '❌'}
                        </div>
                    `).join('')}
                </div>
                <div class="bg-primary/20 border border-primary/30 rounded-2xl px-8 py-4 text-center">
                    <p class="text-primary text-sm font-bold uppercase tracking-widest">Puntuación</p>
                    <p class="text-5xl font-black text-white">${this.scavengerState.score}</p>
                </div>
                <p class="text-white/50 text-sm">Objetos encontrados: ${found}/${total}</p>
            </div>
        `;

        this.dom.gameFooter.innerHTML = `
            <button onclick="app.nextMinigame()" class="w-full h-14 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
                <span class="material-symbols-outlined text-primary">arrow_forward</span> SIGUIENTE JUEGO
            </button>
        `;
    },

    renderDoodleGame() {
        // Random words to draw (20 options)
        const words = [
            'Gato Espacial 🐱🚀', 
            'Pizza Voladora 🍕✈️', 
            'Robot Bailarín 🤖💃', 
            'Dinosaurio Chef 🦖👨‍🍳', 
            'Unicornio Pirata 🦄🏴‍☠️', 
            'Pulpo Astronauta 🐙🧑‍🚀',
            'Helado Gigante 🍦🗼',
            'Perro Superhéroe 🐕🦸',
            'Casa en la Luna 🏠🌙',
            'Dragón de Peluche 🐉🧸',
            'Sirena Futbolista ⚽🧜‍♀️',
            'Hamburguesa Monstruo 🍔👹',
            'Alien con Sombrero 👽🎩',
            'Panda Ninja 🐼🥷',
            'Tiburón Ciclista 🦈🚴',
            'Elefante en Patines 🐘⛸️',
            'Fantasma Músico 👻🎸',
            'León con Gafas 🦁👓',
            'Pingüino Surfista 🐧🏄',
            'Tortuga Velocista 🐢💨'
        ];
        const currentWord = words[Math.floor(Math.random() * words.length)];
        
        // Initialize doodle state
        this.doodleState = {
            isDrawing: false,
            currentColor: '#f425af',
            brushSize: 8,
            timeLeft: 60
        };

        this.dom.gameContent.innerHTML = `
            <div class="w-full flex flex-col h-full gap-3 pb-2">
                <div class="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 backdrop-blur-md rounded-2xl p-3 text-center flex items-center justify-between">
                    <div class="flex-1 text-left">
                        <p class="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">Tu Misión Secreta</p>
                        <h2 class="text-xl font-bold">${currentWord}</h2>
                    </div>
                    <div class="bg-surface-dark/80 px-4 py-2 rounded-xl border border-white/10">
                        <span id="doodle-timer" class="text-2xl font-black text-primary">60</span>
                        <span class="text-xs text-white/40">s</span>
                    </div>
                </div>
                <div class="flex-1 bg-white rounded-2xl border-4 border-surface-accent shadow-2xl relative overflow-hidden">
                    <canvas id="doodle-canvas" class="w-full h-full touch-none"></canvas>
                </div>
            </div>
        `;

        this.dom.gameFooter.innerHTML = `
            <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center justify-between gap-3">
                    <div id="color-palette" class="flex gap-2 flex-wrap">
                        <button data-color="#f425af" class="size-8 rounded-full bg-[#f425af] ring-2 ring-white ring-offset-2 ring-offset-background-dark color-btn"></button>
                        <button data-color="#00d4ff" class="size-8 rounded-full bg-[#00d4ff] color-btn"></button>
                        <button data-color="#00ff88" class="size-8 rounded-full bg-[#00ff88] color-btn"></button>
                        <button data-color="#ffdd00" class="size-8 rounded-full bg-[#ffdd00] color-btn"></button>
                        <button data-color="#ff6b35" class="size-8 rounded-full bg-[#ff6b35] color-btn"></button>
                        <button data-color="#000000" class="size-8 rounded-full bg-black color-btn"></button>
                        <button data-color="#ffffff" class="size-8 rounded-full bg-white border border-white/20 color-btn"></button>
                    </div>
                    <div class="flex gap-2">
                        <button id="btn-eraser" class="size-10 rounded-xl bg-surface-accent border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                            <span class="material-symbols-outlined text-white/60">ink_eraser</span>
                        </button>
                        <button id="btn-clear" class="size-10 rounded-xl bg-surface-accent border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-all">
                            <span class="material-symbols-outlined text-red-400">delete</span>
                        </button>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-xs text-white/40">Grosor:</span>
                    <div id="brush-sizes" class="flex gap-2">
                        <button data-size="4" class="size-8 rounded-lg bg-surface-accent border border-white/10 flex items-center justify-center brush-btn"><div class="size-2 rounded-full bg-white"></div></button>
                        <button data-size="8" class="size-8 rounded-lg bg-primary/30 border-2 border-primary flex items-center justify-center brush-btn"><div class="size-3 rounded-full bg-white"></div></button>
                        <button data-size="16" class="size-8 rounded-lg bg-surface-accent border border-white/10 flex items-center justify-center brush-btn"><div class="size-5 rounded-full bg-white"></div></button>
                    </div>
                </div>
                <button onclick="app.showLeaderboard()" class="w-full h-14 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-primary">check_circle</span> ¡ENVIAR!
                </button>
            </div>
        `;

        // Setup canvas
        this.setupDoodleCanvas();
    },

    setupDoodleCanvas() {
        const canvas = document.getElementById('doodle-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const startDrawing = (e) => {
            e.preventDefault();
            this.doodleState.isDrawing = true;
            const pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        };

        const draw = (e) => {
            if (!this.doodleState.isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);
            ctx.strokeStyle = this.doodleState.currentColor;
            ctx.lineWidth = this.doodleState.brushSize;
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        };

        const stopDrawing = () => {
            this.doodleState.isDrawing = false;
            ctx.beginPath();
        };

        // Mouse events
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Touch events
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        // Color buttons
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.doodleState.currentColor = btn.dataset.color;
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('ring-2', 'ring-white', 'ring-offset-2', 'ring-offset-background-dark'));
                btn.classList.add('ring-2', 'ring-white', 'ring-offset-2', 'ring-offset-background-dark');
            });
        });

        // Brush size buttons
        document.querySelectorAll('.brush-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.doodleState.brushSize = parseInt(btn.dataset.size);
                document.querySelectorAll('.brush-btn').forEach(b => {
                    b.classList.remove('bg-primary/30', 'border-2', 'border-primary');
                    b.classList.add('bg-surface-accent', 'border', 'border-white/10');
                });
                btn.classList.remove('bg-surface-accent', 'border', 'border-white/10');
                btn.classList.add('bg-primary/30', 'border-2', 'border-primary');
            });
        });

        // Eraser button
        document.getElementById('btn-eraser').addEventListener('click', () => {
            this.doodleState.currentColor = '#ffffff';
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('ring-2', 'ring-white', 'ring-offset-2', 'ring-offset-background-dark'));
        });

        // Clear button
        document.getElementById('btn-clear').addEventListener('click', () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        // Timer
        const timerEl = document.getElementById('doodle-timer');
        this.doodleTimer = setInterval(() => {
            this.doodleState.timeLeft--;
            timerEl.textContent = this.doodleState.timeLeft;
            if (this.doodleState.timeLeft <= 10) {
                timerEl.classList.add('animate-pulse', 'text-red-400');
            }
            if (this.doodleState.timeLeft <= 0) {
                clearInterval(this.doodleTimer);
                this.showLeaderboard();
            }
        }, 1000);
    },

    nextMinigame() {
        if (this.state.currentMinigame === 'contraption') {
            this.state.currentMinigame = 'scavenger';
            this.initMinigame('scavenger');
        } else if (this.state.currentMinigame === 'scavenger') {
            this.state.currentMinigame = 'doodle';
            this.initMinigame('doodle');
        } else {
            this.showLeaderboard();
        }
    },

    showLeaderboard() {
        // Clear all game timers
        if (this.contraptionTimer) {
            clearInterval(this.contraptionTimer);
            this.contraptionTimer = null;
        }
        if (this.scavengerTimer) {
            clearInterval(this.scavengerTimer);
            this.scavengerTimer = null;
        }
        if (this.doodleTimer) {
            clearInterval(this.doodleTimer);
            this.doodleTimer = null;
        }
        this.showScreen('leaderboard');
    },

    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    showSettings() {
        this.dom.screens.settings.classList.remove('hidden');
        this.dom.screens.settings.classList.add('fade-in');
    },

    hideSettings() {
        this.dom.screens.settings.classList.add('hidden');
    }
};

// Start app
window.addEventListener('DOMContentLoaded', () => app.init());