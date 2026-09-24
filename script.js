const arena = document.getElementById('arena');
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');
const player1NameEl = document.getElementById('player1Name');
const player2NameEl = document.getElementById('player2Name');
const player1StatusName = document.getElementById('player1StatusName');
const player2StatusName = document.getElementById('player2StatusName');
const player1StatusValue = document.getElementById('player1StatusValue');
const player2StatusValue = document.getElementById('player2StatusValue');
const hp1El = document.getElementById('hp1');
const hp2El = document.getElementById('hp2');
const questionPanel = document.getElementById('questionPanel');
const turnLabel = document.getElementById('turnLabel');
const questionText = document.getElementById('questionText');
const choicesContainer = document.getElementById('choices');
const messageBox = document.getElementById('message');
const battlePopup = document.getElementById('battlePopup');
const resetBtn = document.getElementById('resetBtn');
const startMenu = document.getElementById('startMenu');
const startBtn = document.getElementById('startBtn');
const player1NameInput = document.getElementById('player1NameInput');
const player2NameInput = document.getElementById('player2NameInput');
const player1ColorInput = document.getElementById('player1Color');
const player2ColorInput = document.getElementById('player2Color');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

const difficultyConfig = {
  beginner: { hp: 120, damageMultiplier: 0.8 },
  intermediate: { hp: 100, damageMultiplier: 1 },
  expert: { hp: 90, damageMultiplier: 1.3 },
};

const questions = [
  { question: 'Which keyword is used to define a constant in C?', options: ['const', 'static', 'final', 'volatile'], answer: 0, damage: 12 },
  { question: 'What does the % operator do in C?', options: ['Divides and rounds down', 'Returns the remainder', 'Multiplies values', 'Compares values'], answer: 1, damage: 14 },
  { question: 'Which symbol is used for a single-line comment in C?', options: ['//', '#', '/*', '--'], answer: 0, damage: 18 },
  { question: 'Which function is used to print output in C?', options: ['printf()', 'scan()', 'output()', 'echo()'], answer: 0, damage: 22 },
  { question: 'What does sizeof(int) usually return on a typical 64-bit system?', options: ['2', '4', '8', '16'], answer: 1, damage: 24 },
  { question: 'Which loop is best when the number of iterations is known?', options: ['for', 'while', 'do while', 'goto'], answer: 0, damage: 30 },
  { question: 'Which type is used to store a single character in C?', options: ['char', 'string', 'text', 'byte'], answer: 0, damage: 32 },
  { question: 'What does * do when used in a variable declaration?', options: ['Adds a value', 'Creates a pointer', 'Multiplies the variable', 'Stops the program'], answer: 1, damage: 38 },
];

const state = {
  player1: { name: 'Player 1', x: 170, y: 270, hp: 100, color: '#4dade8' },
  player2: { name: 'Player 2', x: 810, y: 270, hp: 100, color: '#ff5d74' },
  activePlayer: 1,
  question: null,
  questionReady: false,
  started: false,
  difficulty: 'beginner',
  selectedIndex: { 1: 0, 2: 0 },
  answeredPlayers: new Set(),
  roundId: 0,
  keys: {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateFighterVisuals() {
  player1El.style.left = `${state.player1.x}px`;
  player1El.style.top = `${state.player1.y}px`;
  player2El.style.left = `${state.player2.x}px`;
  player2El.style.top = `${state.player2.y}px`;

  player1El.style.setProperty('--fighter-color', state.player1.color);
  player2El.style.setProperty('--fighter-color', state.player2.color);
  arena.style.setProperty('--player1-color', state.player1.color);
  arena.style.setProperty('--player2-color', state.player2.color);

  player1NameEl.textContent = state.player1.name;
  player2NameEl.textContent = state.player2.name;
  player1StatusName.textContent = state.player1.name;
  player2StatusName.textContent = state.player2.name;
  const maxHp = difficultyConfig[state.difficulty].hp;
  player1StatusValue.textContent = `${Math.max(0, Math.round(state.player1.hp))} / ${maxHp}`;
  player2StatusValue.textContent = `${Math.max(0, Math.round(state.player2.hp))} / ${maxHp}`;

  hp1El.style.width = `${(state.player1.hp / maxHp) * 100}%`;
  hp2El.style.width = `${(state.player2.hp / maxHp) * 100}%`;
}

function showMessage(text) {
  messageBox.textContent = text;
}

function showBattlePopup(playerNumber) {
  const player = playerNumber === 1 ? state.player1 : state.player2;
  const lines = [
    `${player.name}: Big brain energy!`,
    `${player.name} strikes with confidence!`,
    `${player.name}: Too slow!`,
    `${player.name} read that like a pro!`,
  ];

  battlePopup.textContent = lines[Math.floor(Math.random() * lines.length)];
  battlePopup.classList.remove('show');
  void battlePopup.offsetWidth;
  battlePopup.classList.add('show');
}

function getNextQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

function updateAnswerSelection() {
  const buttons = [...choicesContainer.querySelectorAll('.choice-btn')];
  buttons.forEach((button, index) => {
    button.classList.toggle('player1-selected', index === state.selectedIndex[1]);
    button.classList.toggle('player2-selected', index === state.selectedIndex[2]);
  });
}

function renderQuestion() {
  if (!state.started) return;

  state.question = getNextQuestion();
  state.selectedIndex = { 1: 0, 2: 0 };
  state.answeredPlayers = new Set();
  questionPanel.classList.remove('hidden');
  state.questionReady = true;

  turnLabel.textContent = 'Race to answer: Player 1 uses WASD, Player 2 uses Arrow keys';
  questionText.textContent = state.question.question;
  choicesContainer.innerHTML = '';

  state.question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-btn';
    const answerText = document.createElement('span');
    answerText.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    const player1Cursor = document.createElement('span');
    player1Cursor.className = 'answer-cursor player1-cursor';
    player1Cursor.setAttribute('aria-label', 'Player 1 selected');
    const player2Cursor = document.createElement('span');
    player2Cursor.className = 'answer-cursor player2-cursor';
    player2Cursor.setAttribute('aria-label', 'Player 2 selected');
    button.append(answerText, player1Cursor, player2Cursor);
    choicesContainer.appendChild(button);
  });

  updateAnswerSelection();
}

function handleAnswer(playerNumber) {
  if (!state.question || !state.questionReady || state.answeredPlayers.has(playerNumber)) return;

  const selectedIndex = state.selectedIndex[playerNumber];
  const correctIndex = state.question.answer;
  const buttons = [...choicesContainer.querySelectorAll('.choice-btn')];

  if (selectedIndex !== correctIndex) {
    state.answeredPlayers.add(playerNumber);
    buttons[selectedIndex].classList.add(playerNumber === 1 ? 'player1-wrong' : 'player2-wrong');
    showMessage(`${playerNumber === 1 ? state.player1.name : state.player2.name} chose the wrong answer.`);

    if (state.answeredPlayers.size === 2) {
      state.questionReady = false;
      const roundId = state.roundId;
      setTimeout(() => {
        if (state.started && state.roundId === roundId) {
          renderQuestion();
        }
      }, 700);
    }
    return;
  }

  state.questionReady = false;
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add('correct');
  });

  state.activePlayer = playerNumber;
  const target = playerNumber === 1 ? state.player2 : state.player1;
  const attacker = playerNumber === 1 ? state.player1 : state.player2;
  const config = difficultyConfig[state.difficulty];
  const distance = Math.hypot(attacker.x - target.x, attacker.y - target.y);

  let damage = Math.round(state.question.damage * config.damageMultiplier);
  let rangeMessage = '';
  if (distance > 170) {
    damage = Math.max(6, Math.round(damage * 0.45));
    rangeMessage = ' Damage reduced because they were too far away.';
  } else if (distance > 110) {
    damage = Math.round(damage * 0.75);
    rangeMessage = ' Mid-range damage.';
  } else {
    damage = Math.round(damage * 1.15);
    rangeMessage = ' Clean close-range hit.';
  }

  target.hp = clamp(target.hp - damage, 0, config.hp);
  const attackerEl = playerNumber === 1 ? player1El : player2El;
  const targetEl = playerNumber === 1 ? player2El : player1El;
  showBattlePopup(playerNumber);
  attackerEl.classList.remove('attacking');
  targetEl.classList.remove('taking-damage');
  void attackerEl.offsetWidth;
  attackerEl.classList.add('attacking');
  targetEl.classList.add('taking-damage');
  setTimeout(() => {
    attackerEl.classList.remove('attacking');
    targetEl.classList.remove('taking-damage');
  }, 500);
  showMessage(`${attacker.name} answered correctly first! ${damage} damage dealt.${rangeMessage}`);

  updateFighterVisuals();
  state.questionReady = false;

  const winner = state.player1.hp <= 0 ? 2 : state.player2.hp <= 0 ? 1 : null;
  if (winner) {
    const roundId = state.roundId;
    setTimeout(() => {
      if (!state.started || state.roundId !== roundId) return;
      questionPanel.classList.remove('hidden');
      const winningName = winner === 1 ? state.player1.name : state.player2.name;
      turnLabel.textContent = `${winningName} wins!`;
      questionText.textContent = 'Victory! The C duel is complete.';
      choicesContainer.innerHTML = '<button class="choice-btn" type="button">Play Again</button>';
      const replayButton = choicesContainer.querySelector('.choice-btn');
      replayButton.addEventListener('click', () => {
        resetGame();
        startMenu.classList.remove('hidden');
      });
      showMessage(`${winningName} wins the match.`);
    }, 700);
    return;
  }

  const roundId = state.roundId;
  setTimeout(() => {
    if (!state.started || state.roundId !== roundId) return;
    state.activePlayer = state.activePlayer === 1 ? 2 : 1;
    questionPanel.classList.add('hidden');
    renderQuestion();
  }, 1100);
}

function handleKeyDown(event) {
  if (!state.started) return;

  if (state.questionReady) {
    const p1Moves = { w: -2, a: -1 };
    const p2Moves = { ArrowUp: -2, ArrowLeft: -1 };
    const p1MovesDown = { s: 2, d: 1 };
    const p2MovesDown = { ArrowDown: 2, ArrowRight: 1 };
    const move = p1Moves[event.key] ?? p2Moves[event.key];
    const moveDown = p1MovesDown[event.key] ?? p2MovesDown[event.key];
    const playerNumber = event.key in p1Moves || event.key in p1MovesDown ? 1 : 2;

    if ((move !== undefined || moveDown !== undefined) && !state.answeredPlayers.has(playerNumber)) {
      event.preventDefault();
      const delta = move ?? moveDown;
      const current = state.selectedIndex[playerNumber];
      state.selectedIndex[playerNumber] = clamp(current + delta, 0, state.question.options.length - 1);
      updateAnswerSelection();
      return;
    }

    if (event.key.toLowerCase() === 'f') {
      event.preventDefault();
      handleAnswer(1);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      handleAnswer(2);
    }
  }
}

function updateStartButtonState() {
  const p1Name = player1NameInput.value.trim();
  const p2Name = player2NameInput.value.trim();
  const ready = p1Name.length > 0 && p2Name.length > 0 && !!state.difficulty;
  startBtn.disabled = !ready;
  startBtn.style.opacity = ready ? '1' : '0.55';
  startBtn.style.cursor = ready ? 'pointer' : 'not-allowed';
}

function setupKeyboard() {
  window.addEventListener('keydown', (event) => {
    const key = event.key;
    const isTextInput = document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

    if (!state.started) {
      return;
    }

    if (isTextInput) {
      return;
    }

    if (state.questionReady && (key in state.keys)) {
      return;
    }

    if (key in state.keys) {
      state.keys[key] = true;
      event.preventDefault();
    }
  });

  window.addEventListener('keyup', (event) => {
    const key = event.key;
    if (!state.started) {
      return;
    }

    if (key in state.keys) {
      state.keys[key] = false;
    }
  });
}

function tick() {
  const p1Vertical = (state.keys.w ? -1 : 0) + (state.keys.s ? 1 : 0);
  const p1Horizontal = (state.keys.a ? -1 : 0) + (state.keys.d ? 1 : 0);
  const p2Vertical = (state.keys.ArrowUp ? -1 : 0) + (state.keys.ArrowDown ? 1 : 0);
  const p2Horizontal = (state.keys.ArrowLeft ? -1 : 0) + (state.keys.ArrowRight ? 1 : 0);

  if (state.started) {
    state.player1.x = clamp(state.player1.x + p1Horizontal * 4.5, 60, 920);
    state.player1.y = clamp(state.player1.y + p1Vertical * 4.5, 80, 460);
    state.player2.x = clamp(state.player2.x + p2Horizontal * 4.5, 60, 920);
    state.player2.y = clamp(state.player2.y + p2Vertical * 4.5, 80, 460);
    updateFighterVisuals();
  }

  requestAnimationFrame(tick);
}

function setDifficulty(level) {
  state.difficulty = level;
  difficultyButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.difficulty === level);
  });
  updateStartButtonState();
}

function startBattle() {
  const p1Name = player1NameInput.value.trim();
  const p2Name = player2NameInput.value.trim();

  if (!p1Name || !p2Name) {
    showMessage('Both player names are required before starting the match.');
    return;
  }

  const config = difficultyConfig[state.difficulty];

  state.started = true;
  state.roundId += 1;
  state.player1.name = p1Name;
  state.player2.name = p2Name;
  state.player1.color = player1ColorInput.value;
  state.player2.color = player2ColorInput.value;
  state.player1.x = 170;
  state.player1.y = 270;
  state.player2.x = 810;
  state.player2.y = 270;
  state.player1.hp = config.hp;
  state.player2.hp = config.hp;
  state.activePlayer = 1;
  state.question = null;
  state.questionReady = false;

  startMenu.classList.add('hidden');
  showMessage('Use the arrow keys to select an answer, then confirm with F or Enter.');
  questionPanel.classList.add('hidden');
  updateFighterVisuals();
  renderQuestion();
}

function resetGame() {
  state.started = false;
  state.player1 = { name: 'Player 1', x: 170, y: 270, hp: 100, color: player1ColorInput.value || '#4dade8' };
  state.player2 = { name: 'Player 2', x: 810, y: 270, hp: 100, color: player2ColorInput.value || '#ff5d74' };
  state.activePlayer = 1;
  state.question = null;
  state.questionReady = false;
  state.selectedIndex = { 1: 0, 2: 0 };
  state.answeredPlayers = new Set();
  state.roundId += 1;
  Object.keys(state.keys).forEach((key) => {
    state.keys[key] = false;
  });
  showMessage('Choose a difficulty and enter your names to begin.');
  questionPanel.classList.add('hidden');
  startMenu.classList.remove('hidden');
  updateFighterVisuals();
}

resetBtn.addEventListener('click', resetGame);
startBtn.addEventListener('click', startBattle);
window.addEventListener('keydown', handleKeyDown);
player1NameInput.addEventListener('input', updateStartButtonState);
player2NameInput.addEventListener('input', updateStartButtonState);

difficultyButtons.forEach((button) => {
  button.addEventListener('click', () => setDifficulty(button.dataset.difficulty));
});

setupKeyboard();
updateFighterVisuals();
updateStartButtonState();
resetGame();
requestAnimationFrame(tick);
