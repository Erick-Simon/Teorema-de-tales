const state = {
    score: 0,
    currentIdx: 0,
    totalQ: 0,
    questions: [],
    currentAns: 0,
    timeElapsed: 0, // Segundos totais
    timerInterval: null // Intervalo do temporizador geral
};

const streetContexts = [
    "A Avenida das Flores é paralela à Rua dos Pinheiros. Calcule X.",
    "O engenheiro precisa medir o recuo da calçada entre as transversais.",
    "Para instalar novos postes, calcule a distância proporcional.",
    "A prefeitura quer saber o comprimento do novo canteiro central.",
    "Calcule a distância entre as faixas de pedestres nestas ruas."
];

// Partículas (Mais ludismo e menos branco)
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40 },
            "color": { "value": "#27ae60" }, // Verde
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4 },
            "size": { "value": 2 },
            "move": { "enable": true, "speed": 1 }
        }
    });
}

// Navegação
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

// Matemática de Tales (Progressiva)
function generateMath(difficulty) {
    let a, b, c, x;
    do {
        // Aumenta os valores base dependendo da dificuldade
        let base = difficulty === 'hard' ? 30 : 10;
        a = (Math.floor(Math.random() * 8) + 2) * base; 
        c = (Math.floor(Math.random() * 8) + 2) * base;
        x = (Math.floor(Math.random() * 12) + 5) * (difficulty === 'hard' ? 10 : 5); 
        b = (a * x) / c;
    } while (!Number.isInteger(b) || b <= 0 || a === b);
    return { a, b, c, x };
}

// Iniciar Contagem Regressiva (3, 2, 1)
function startCountdown() {
    showScreen('countdown');
    let count = 3;
    const countDisplay = document.getElementById('countdown-number');
    countDisplay.innerText = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countDisplay.innerText = count;
        } else if (count === 0) {
            countDisplay.innerText = "JÁ!";
        } else {
            clearInterval(interval);
            loadQuestion(); // Inicia a questão após "JÁ!"
            showScreen('game');
        }
    }, 1000);
}

function loadQuestion() {
    const q = state.questions[state.currentIdx];
    state.currentAns = q.x;
    
    document.getElementById('quest-level').innerText = `Projeto ${state.currentIdx + 1} de ${state.totalQ}`;
    document.getElementById('question-text').innerText = streetContexts[Math.floor(Math.random() * streetContexts.length)];
    document.getElementById('feedback').innerText = "";
    document.getElementById('answer-input').value = "";
    document.getElementById('btn-check').style.display = "inline-block";
    document.getElementById('btn-next').style.display = "none";
    
    const svg = document.getElementById('dynamic-svg');
    svg.innerHTML = `
        <line x1="40" y1="80" x2="360" y2="80" stroke="#7f8c8d" stroke-width="12"/>
        <line x1="40" y1="150" x2="360" y2="150" stroke="#7f8c8d" stroke-width="12"/>
        <line x1="40" y1="220" x2="360" y2="220" stroke="#7f8c8d" stroke-width="12"/>
        <line x1="120" y1="40" x2="100" y2="260" stroke="#34495e" stroke-width="8"/>
        <line x1="280" y1="40" x2="300" y2="260" stroke="#34495e" stroke-width="8"/>
        <text x="75" y="120" fill="#333" font-weight="bold">${q.a}m</text>
        <text x="65" y="195" fill="#333" font-weight="bold">${q.b}m</text>
        <text x="310" y="120" fill="#333" font-weight="bold">${q.c}m</text>
        <text x="320" y="195" fill="#e74c3c" font-weight="bold" font-size="22">X</text>
    `;
}

// Temporizador Geral
function startTimer() {
    state.timeElapsed = 0;
    state.timerInterval = setInterval(() => {
        state.timeElapsed++;
        const minutes = Math.floor(state.timeElapsed / 60).toString().padStart(2, '0');
        const seconds = (state.timeElapsed % 60).toString().padStart(2, '0');
        document.getElementById('timer-display').innerText = `Tempo: ${minutes}:${seconds}`;
    }, 1000);
}

// Iniciar prática
function startPractice(qtd) {
    state.totalQ = qtd;
    state.questions = [];
    for(let i=0; i<qtd; i++) {
        // Aumenta a dificuldade na metade final
        let difficulty = (i >= qtd/2) ? 'hard' : 'easy';
        state.questions.push(generateMath(difficulty));
    }
    
    startTimer(); // Começa o relógio
    startCountdown(); // Começa a contagem de 3 segundos
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-revisar').onclick = () => showScreen('revision');
    document.getElementById('btn-praticar-menu').onclick = () => showScreen('practice-select');
    document.getElementById('btn-voltar-menu').onclick = () => showScreen('menu');
    document.getElementById('btn-restart').onclick = () => location.reload(); // Recarrega para resetar tudo

    document.querySelectorAll('#practice-select .btn').forEach(btn => {
        btn.onclick = () => {
            const qtd = parseInt(btn.getAttribute('data-qtd'));
            startPractice(qtd);
        };
    });

    document.getElementById('btn-check').onclick = () => {
        const userVal = parseInt(document.getElementById('answer-input').value);
        const feedback = document.getElementById('feedback');
        
        if (userVal === state.currentAns) {
            feedback.innerText = "✓ Medição correta!";
            feedback.style.color = "#27ae60";
            state.score++;
        } else {
            feedback.innerText = `✗ Erro! O valor era ${state.currentAns}m.`;
            feedback.style.color = "#e74c3c";
        }
        
        document.getElementById('score-display').innerText = `Pontos: ${state.score}`;
        document.getElementById('btn-check').style.display = "none";
        document.getElementById('btn-next').style.display = "inline-block";
    };

    document.getElementById('btn-next').onclick = () => {
        state.currentIdx++;
        if (state.currentIdx < state.totalQ) {
            startCountdown(); // Nova contagem antes da próxima
        } else {
            clearInterval(state.timerInterval); // Para o relógio
            showScreen('final');
            const minutes = Math.floor(state.timeElapsed / 60);
            const seconds = state.timeElapsed % 60;
            document.getElementById('final-msg').innerText = `Fim do projeto! Acertos: ${state.score} de ${state.totalQ}.`;
            document.getElementById('final-time').innerText = `Tempo Total: ${minutes}min ${seconds}seg`;
        }
    };
});
