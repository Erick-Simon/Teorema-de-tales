:root {
    --bg: #1a1c24; /* Azul escuro quase preto */
    --card: #ffffff;
    --primary: #2c3e50; /* Azul petróleo */
    --accent: #27ae60; /* Verde */
    --danger: #e74c3c; /* Vermelho */
    --text: #ffffff; /* Texto branco */
    --card-text: #333333; /* Texto dentro do card */
}

body {
    background-color: var(--bg);
    color: var(--text);
    font-family: 'Segoe UI', Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    overflow-y: auto;
    position: relative;
}

#particles-js {
    position: fixed; /* Fixado para cobrir a tela inteira ao rolar */
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
}

.container {
    position: relative;
    z-index: 2; /* Garante que o card fique acima das partículas */
    background: var(--card);
    border-top: 8px solid var(--primary);
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    text-align: center;
    color: var(--card-text);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 10px;
    border-bottom: 2px solid #ecf0f1;
}

#timer-display { font-weight: bold; color: var(--accent); }
#score-display { font-weight: bold; color: var(--danger); }
h1 { color: var(--primary); margin: 0; font-size: 1.5rem; }

.screen { display: none; animation: fadeIn 0.4s ease; }
.active { display: block; }

.btn, .btn-action {
    background: var(--primary);
    border: none;
    color: white;
    padding: 12px 20px;
    margin: 8px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.2s;
}

.btn:hover { background: #34495e; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
.btn-action { background: var(--accent); }
.btn-action:hover { background: #219150; }

.svg-wrapper { background: #ecf0f1; margin: 20px 0; border-radius: 4px; border: 1px solid #bdc3c7; }

#answer-input { padding: 10px; width: 100px; font-size: 1.1rem; border: 2px solid #bdc3c7; border-radius: 4px; margin: 10px 0; }
#feedback { font-weight: bold; margin-top: 15px; }

.formula { background: #f9f9f9; padding: 15px; border-left: 5px solid var(--accent); font-size: 1.2rem; margin: 1rem 0; }

/* Estilo para a Contagem Regressiva */
#countdown {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10rem;
    font-weight: bold;
    z-index: 999;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
