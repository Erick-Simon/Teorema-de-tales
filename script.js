const state = {
    score: 0,
    currentIdx: 0,
    totalQ: 0,
    questions: [],
    currentAns: 0
};

// Gerador de questões simples (onde X é o resultado direto)
function genSimple() {
    let a, c, x, b;
    do {
        a = (Math.floor(Math.random() * 5) + 2) * 10;
        c = (Math.floor(Math.random() * 5) + 2) * 10;
        x = (Math.floor(Math.random() * 10) + 2) * 5;
        b = (a * x) / c;
    } while (!Number.isInteger(b) || a === b);
    return { type: 'simple', labels: [a, b, c, "X"], ans: x };
}

// Gerador de questões algébricas (estilo da sua foto)
function genAlgebraic() {
    // Proporção: (mx + n) / (px + q) = R1 / R2
    // Para simplificar e garantir X inteiro: 
    // Vamos fixar X e construir a equação em volta.
    let x = Math.floor(Math.random() * 5) + 2; // O X que o aluno deve achar
    let m = Math.floor(Math.random() * 4) + 1;
    let n = Math.floor(Math.random() * 5) + 1;
    let p = 1; 
    let q = Math.floor(Math.random() * 4) + 1;

    let val1 = m * x + n; // Ex: 4x + 1
    let val2 = p * x + q; // Ex: x + 2
    
    // Simplificamos a fração val1/val2 para obter os números da direita
    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
    let common = gcd(val1, val2);
    let r1 = val1 / common;
    let r2 = val2 / common;

    return { 
        type: 'algebraic', 
        labels: [`${m > 1 ? m : ''}x + ${n}`, `${p > 1 ? p : ''}x + ${q}`, r1, r2], 
        ans: x 
    };
}

function loadQuestion() {
    const q = state.questions[state.currentIdx];
    state.currentAns = q.ans;
    
    document.getElementById('quest-level').innerText = `Projeto ${state.currentIdx + 1} de ${state.totalQ}`;
    document.getElementById('question-text').innerText = q.type === 'simple' ? 
        "Calcule a distância da quadra X." : "Resolva a equação de tráfego para encontrar o valor de X.";
    
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
        <text x="60" y="115" fill="#333" font-weight="bold" font-size="16">${q.labels[0]}</text>
        <text x="60" y="195" fill="#333" font-weight="bold" font-size="16">${q.labels[1]}</text>
        <text x="310" y="115" fill="#333" font-weight="bold" font-size="16">${q.labels[2]}</text>
        <text x="310" y="195" fill="#333" font-weight="bold" font-size="16">${q.labels[3]}</text>
    `;
}

function startPractice(qtd) {
    state.totalQ = qtd;
    state.score = 0;
    state.currentIdx = 0;
    state.questions = [];
    
    for(let i=0; i<qtd; i++) {
        // A cada 2 questões, a dificuldade aumenta
        if (i < 2) state.questions.push(genSimple());
        else state.questions.push(genAlgebraic());
    }
    loadQuestion();
    showScreen('game');
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-revisar').onclick = () => showScreen('revision');
    document.getElementById('btn-praticar-menu').onclick = () => showScreen('practice-select');
    document.getElementById('btn-voltar-menu').onclick = () => showScreen('menu');
    document.getElementById('btn-restart').onclick = () => showScreen('menu');

    document.querySelectorAll('#practice-select .btn').forEach(btn => {
        btn.onclick = () => startPractice(parseInt(btn.getAttribute('data-qtd')));
    });

    document.getElementById('btn-check').onclick = () => {
        const userVal = parseInt(document.getElementById('answer-input').value);
        if (userVal === state.currentAns) {
            document.getElementById('feedback').innerText = "✓ Excelente cálculo!";
            document.getElementById('feedback').style.color = "green";
            state.score++;
        } else {
            document.getElementById('feedback').innerText = `✗ Erro. O valor de X era ${state.currentAns}.`;
            document.getElementById('feedback').style.color = "red";
        }
        document.getElementById('score-display').innerText = `Pontos: ${state.score}`;
        document.getElementById('btn-check').style.display = "none";
        document.getElementById('btn-next').style.display = "inline-block";
    };

    document.getElementById('btn-next').onclick = () => {
        state.currentIdx++;
        if (state.currentIdx < state.totalQ) loadQuestion();
        else showScreen('final');
    };
});
