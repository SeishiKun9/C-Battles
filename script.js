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
const controlsPopup = document.getElementById('controlsPopup');
const readyBtn = document.getElementById('readyBtn');
const player1ControlGuide = document.getElementById('player1ControlGuide');
const player2ControlGuide = document.getElementById('player2ControlGuide');
const resetBtn = document.getElementById('resetBtn');
const startMenu = document.getElementById('startMenu');
const startBtn = document.getElementById('startBtn');
const player1NameInput = document.getElementById('player1NameInput');
const player2NameInput = document.getElementById('player2NameInput');
const player1ColorInput = document.getElementById('player1Color');
const player2ColorInput = document.getElementById('player2Color');
const player1ControlInput = document.getElementById('player1Control');
const player2ControlInput = document.getElementById('player2Control');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const subjectButtons = document.querySelectorAll('.subject-btn');

const difficultyConfig = {
  beginner: { hp: 120, damageMultiplier: 0.8 },
  intermediate: { hp: 100, damageMultiplier: 1 },
  expert: { hp: 90, damageMultiplier: 1.3 },
};

const questionBanks = {
  c: [
  { question: 'Which keyword is used to define a constant in C?', options: ['const', 'static', 'final', 'volatile'], answer: 0, damage: 12 },
  { question: 'What does the % operator do in C?', options: ['Divides and rounds down', 'Returns the remainder', 'Multiplies values', 'Compares values'], answer: 1, damage: 14 },
  { question: 'Which symbol is used for a single-line comment in C?', options: ['//', '#', '/*', '--'], answer: 0, damage: 18 },
  { question: 'Which function is used to print output in C?', options: ['printf()', 'scan()', 'output()', 'echo()'], answer: 0, damage: 22 },
  { question: 'What does sizeof(int) usually return on a typical 64-bit system?', options: ['2', '4', '8', '16'], answer: 1, damage: 24 },
  { question: 'Which loop is best when the number of iterations is known?', options: ['for', 'while', 'do while', 'goto'], answer: 0, damage: 30 },
  { question: 'Which type is used to store a single character in C?', options: ['char', 'string', 'text', 'byte'], answer: 0, damage: 32 },
  { question: 'What does * do when used in a variable declaration?', options: ['Adds a value', 'Creates a pointer', 'Multiplies the variable', 'Stops the program'], answer: 1, damage: 38 },
  ],
  psychology: [
    { question: 'Which part of the brain is strongly associated with memory formation?', options: ['Hippocampus', 'Medulla', 'Cerebellum', 'Occipital lobe'], answer: 0, damage: 12 },
    { question: 'Classical conditioning is most associated with which psychologist?', options: ['Ivan Pavlov', 'Jean Piaget', 'Carl Rogers', 'Abraham Maslow'], answer: 0, damage: 16 },
    { question: 'What is confirmation bias?', options: ['Favoring evidence that supports existing beliefs', 'Forgetting a learned skill', 'Fear of social situations', 'Learning through rewards only'], answer: 0, damage: 20 },
    { question: 'Which theory describes a hierarchy of human needs?', options: ['Maslow\'s hierarchy', 'Drive reduction theory', 'Attachment theory', 'Two-factor theory'], answer: 0, damage: 24 },
    { question: 'What does empathy involve?', options: ['Understanding another person\'s perspective', 'Avoiding all emotions', 'Controlling another person', 'Ignoring social cues'], answer: 0, damage: 28 },
  ],
  accountancy: [
    { question: 'What is the basic accounting equation?', options: ['Assets = Liabilities + Equity', 'Assets = Revenue - Expenses', 'Equity = Assets + Liabilities', 'Profit = Assets + Capital'], answer: 0, damage: 12 },
    { question: 'Which account normally has a debit balance?', options: ['Asset', 'Revenue', 'Capital', 'Liability'], answer: 0, damage: 16 },
    { question: 'What is depreciation?', options: ['Allocation of an asset\'s cost over its useful life', 'An increase in cash', 'A business loan', 'A type of revenue'], answer: 0, damage: 20 },
    { question: 'Which statement reports revenue and expenses?', options: ['Income statement', 'Balance sheet', 'Cash book', 'Bank statement'], answer: 0, damage: 24 },
    { question: 'A trial balance is mainly used to check what?', options: ['Equality of debits and credits', 'The market price of stock', 'Employee attendance', 'Customer satisfaction'], answer: 0, damage: 28 },
  ],
  criminology: [
    { question: 'What does criminology study?', options: ['Crime, criminals, and society\'s response', 'Only courtroom procedure', 'Weather patterns', 'Business profits'], answer: 0, damage: 12 },
    { question: 'What is the dark figure of crime?', options: ['Crime that is not reported or recorded', 'Violent crime at night', 'Crime committed in darkness', 'A criminal profile'], answer: 0, damage: 16 },
    { question: 'Routine activity theory focuses on motivated offenders, suitable targets, and what?', options: ['Lack of capable guardianship', 'Prison overcrowding', 'Media coverage', 'Physical strength'], answer: 0, damage: 20 },
    { question: 'What is recidivism?', options: ['Reoffending after punishment or rehabilitation', 'Reporting a crime', 'Witness protection', 'Crime prevention by design'], answer: 0, damage: 24 },
    { question: 'Which approach emphasizes repairing harm to victims and communities?', options: ['Restorative justice', 'Retributive justice', 'Deterrence theory', 'Classical conditioning'], answer: 0, damage: 28 },
  ],
  tourism: [
    { question: 'What is sustainable tourism?', options: ['Tourism that limits harm and supports future needs', 'Tourism only for wealthy travelers', 'Travel without local guides', 'Tourism during one season'], answer: 0, damage: 12 },
    { question: 'What is a destination?', options: ['A place visited by travelers', 'A travel document', 'A hotel room type', 'An airline employee'], answer: 0, damage: 16 },
    { question: 'Which sector provides accommodation for visitors?', options: ['Hospitality', 'Agriculture', 'Manufacturing', 'Telecommunications'], answer: 0, damage: 20 },
    { question: 'What is ecotourism primarily focused on?', options: ['Responsible travel in natural areas', 'Large-scale shopping trips', 'Business conferences only', 'Theme park rides'], answer: 0, damage: 24 },
    { question: 'What is cultural tourism?', options: ['Travel to experience culture and heritage', 'Travel only for medical care', 'Travel without meeting locals', 'Travel limited to airports'], answer: 0, damage: 28 },
  ],
};

const state = {
  player1: { name: 'Player 1', x: 170, y: 270, hp: 100, color: '#4dade8' },
  player2: { name: 'Player 2', x: 810, y: 270, hp: 100, color: '#ff5d74' },
  activePlayer: 1,
  question: null,
  questionReady: false,
  started: false,
  difficulty: 'beginner',
  subject: 'c',
  controls: { 1: 'wasd', 2: 'arrows' },
  gamepadButtons: { 1: {}, 2: {} },
  selectedIndex: { 1: 0, 2: 0 },
  answeredPlayers: new Set(),
  roundId: 0,
  controlsOpen: false,
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
  const questions = questionBanks[state.subject];
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
  arena.classList.add('question-active');
  state.questionReady = true;

  turnLabel.textContent = '';
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
    arena.classList.remove('question-active');
    renderQuestion();
  }, 1100);
}

function handleKeyDown(event) {
  if (!state.started || state.controlsOpen) return;

  if (state.questionReady) {
    const p1Moves = state.controls[1] === 'wasd' ? { w: -2, a: -1 } : { ArrowUp: -2, ArrowLeft: -1 };
    const p2Moves = state.controls[2] === 'wasd' ? { w: -2, a: -1 } : { ArrowUp: -2, ArrowLeft: -1 };
    const p1MovesDown = state.controls[1] === 'wasd' ? { s: 2, d: 1 } : { ArrowDown: 2, ArrowRight: 1 };
    const p2MovesDown = state.controls[2] === 'wasd' ? { s: 2, d: 1 } : { ArrowDown: 2, ArrowRight: 1 };
    const p1Move = p1Moves[event.key] ?? p1MovesDown[event.key];
    const p2Move = p2Moves[event.key] ?? p2MovesDown[event.key];
    const playerNumber = p1Move !== undefined ? 1 : 2;
    const move = playerNumber === 1 ? p1Move : p2Move;

    if (move !== undefined && !state.answeredPlayers.has(playerNumber)) {
      event.preventDefault();
      const current = state.selectedIndex[playerNumber];
      state.selectedIndex[playerNumber] = clamp(current + move, 0, state.question.options.length - 1);
      updateAnswerSelection();
      return;
    }

    if (event.key.toLowerCase() === 'f' && !state.controls[1].startsWith('gamepad')) {
      event.preventDefault();
      handleAnswer(1);
      return;
    }

    if (event.key === 'Enter' && !state.controls[2].startsWith('gamepad')) {
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

function isConfiguredKeyboardKey(key) {
  const p1Keyboard = state.controls[1] === 'wasd' ? ['w', 'a', 's', 'd'] : state.controls[1] === 'arrows' ? ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] : [];
  const p2Keyboard = state.controls[2] === 'wasd' ? ['w', 'a', 's', 'd'] : state.controls[2] === 'arrows' ? ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] : [];
  return p1Keyboard.includes(key) || p2Keyboard.includes(key);
}

function setupKeyboard() {
  window.addEventListener('keydown', (event) => {
    const key = event.key;
    const isTextInput = document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

    if (!state.started || state.controlsOpen) {
      return;
    }

    if (isTextInput) {
      return;
    }

    if (state.questionReady && isConfiguredKeyboardKey(key)) {
      return;
    }

    if (isConfiguredKeyboardKey(key)) {
      state.keys[key] = true;
      event.preventDefault();
    }
  });

  window.addEventListener('keyup', (event) => {
    const key = event.key;
    if (!state.started || state.controlsOpen) {
      return;
    }

    if (isConfiguredKeyboardKey(key)) {
      state.keys[key] = false;
    }
  });
}

function getGamepadInput(playerNumber) {
  const control = state.controls[playerNumber];
  if (!control.startsWith('gamepad')) return null;

  const gamepadIndex = control === 'gamepad1' ? 0 : 1;
  const gamepads = navigator.getGamepads?.() || [];
  const gamepad = gamepads[gamepadIndex];
  if (!gamepad) return null;

  const axisX = gamepad.axes[0] || 0;
  const axisY = gamepad.axes[1] || 0;
  const direction = Math.abs(axisX) > Math.abs(axisY)
    ? (axisX < -0.45 ? -1 : axisX > 0.45 ? 1 : 0)
    : (axisY < -0.45 ? -2 : axisY > 0.45 ? 2 : 0);
  const previousDirection = state.gamepadButtons[playerNumber].direction || 0;
  state.gamepadButtons[playerNumber].direction = direction;

  return {
    horizontal: Math.abs(axisX) > 0.25 ? axisX : 0,
    vertical: Math.abs(axisY) > 0.25 ? axisY : 0,
    direction: direction !== 0 && direction !== previousDirection ? direction : 0,
    confirm: !!gamepad.buttons[0]?.pressed && !state.gamepadButtons[playerNumber].confirm,
    confirmHeld: !!gamepad.buttons[0]?.pressed,
  };
}

function tick() {
  const p1Gamepad = getGamepadInput(1);
  const p2Gamepad = getGamepadInput(2);
  const p1Keyboard = state.controls[1] === 'wasd';
  const p2Keyboard = state.controls[2] === 'arrows';
  const p1Vertical = p1Gamepad ? p1Gamepad.vertical : p1Keyboard ? (state.keys.w ? -1 : 0) + (state.keys.s ? 1 : 0) : 0;
  const p1Horizontal = p1Gamepad ? p1Gamepad.horizontal : p1Keyboard ? (state.keys.a ? -1 : 0) + (state.keys.d ? 1 : 0) : 0;
  const p2Vertical = p2Gamepad ? p2Gamepad.vertical : p2Keyboard ? (state.keys.ArrowUp ? -1 : 0) + (state.keys.ArrowDown ? 1 : 0) : 0;
  const p2Horizontal = p2Gamepad ? p2Gamepad.horizontal : p2Keyboard ? (state.keys.ArrowLeft ? -1 : 0) + (state.keys.ArrowRight ? 1 : 0) : 0;

  if (state.questionReady) {
    [[1, p1Gamepad], [2, p2Gamepad]].forEach(([playerNumber, gamepad]) => {
      if (!gamepad || state.answeredPlayers.has(playerNumber)) return;
      if (gamepad.direction !== 0) {
        state.selectedIndex[playerNumber] = clamp(state.selectedIndex[playerNumber] + gamepad.direction, 0, state.question.options.length - 1);
        updateAnswerSelection();
      }
      if (gamepad.confirm) handleAnswer(playerNumber);
    });
  }

  state.gamepadButtons[1].confirm = !!p1Gamepad?.confirmHeld;
  state.gamepadButtons[2].confirm = !!p2Gamepad?.confirmHeld;

  if (state.started && !state.questionReady && !state.controlsOpen) {
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

function setSubject(subject) {
  state.subject = subject;
  subjectButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.subject === subject);
  });
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
  state.controls[1] = player1ControlInput.value;
  state.controls[2] = player2ControlInput.value;
  state.gamepadButtons = { 1: {}, 2: {} };
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
  state.controlsOpen = true;

  startMenu.classList.add('hidden');
  showMessage('Review the controls, then press I’m Ready to begin.');
  questionPanel.classList.add('hidden');
  controlsPopup.classList.add('show');
  updateFighterVisuals();
}

function beginQuestionRound() {
  if (!state.started || !state.controlsOpen) return;
  state.controlsOpen = false;
  controlsPopup.classList.remove('show');
  const controlGuide = (control, confirmKey) => control === 'wasd'
    ? `WASD to choose - ${confirmKey} to confirm`
    : control === 'arrows'
      ? `Arrow keys to choose - ${confirmKey} to confirm`
      : `${control === 'gamepad1' ? 'Controller 1' : 'Controller 2'} stick or D-pad - button A to confirm`;
  player1ControlGuide.textContent = controlGuide(state.controls[1], 'F');
  player2ControlGuide.textContent = controlGuide(state.controls[2], 'Enter');
  showMessage('Use the controls to select an answer and confirm it.');
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
  state.controlsOpen = false;
  state.controls[1] = player1ControlInput.value || 'wasd';
  state.controls[2] = player2ControlInput.value || 'arrows';
  state.gamepadButtons = { 1: {}, 2: {} };
  state.roundId += 1;
  Object.keys(state.keys).forEach((key) => {
    state.keys[key] = false;
  });
  showMessage('Choose a difficulty and enter your names to begin.');
  questionPanel.classList.add('hidden');
  arena.classList.remove('question-active');
  controlsPopup.classList.remove('show');
  startMenu.classList.remove('hidden');
  updateFighterVisuals();
}

resetBtn.addEventListener('click', resetGame);
startBtn.addEventListener('click', startBattle);
readyBtn.addEventListener('click', beginQuestionRound);
window.addEventListener('keydown', handleKeyDown);
player1NameInput.addEventListener('input', updateStartButtonState);
player2NameInput.addEventListener('input', updateStartButtonState);

difficultyButtons.forEach((button) => {
  button.addEventListener('click', () => setDifficulty(button.dataset.difficulty));
});

subjectButtons.forEach((button) => {
  button.addEventListener('click', () => setSubject(button.dataset.subject));
});

setupKeyboard();
updateFighterVisuals();
updateStartButtonState();
resetGame();
requestAnimationFrame(tick);
