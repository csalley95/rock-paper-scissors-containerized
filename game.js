const EMOJI = { rock: '✊', paper: '✋', scissors: '✌️' };

let humanScore = 0;
let computerScore = 0;
let roundNum = 0;

// Make a list with the three possible choices.
// Pick one at random.
// Return that random choice to the game.
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// If both players picked the same move, the round is a tie.
// Otherwise, check the winning rules:
//   - rock beats scissors
//   - paper beats rock
//   - scissors beats paper
// If one of those rules matches, the human wins.
// If none match, the human loses.
function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) return 'tie';
    if (
        (humanChoice === 'rock'     && computerChoice === 'scissors') ||
        (humanChoice === 'paper'    && computerChoice === 'rock')     ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) return 'win';
    return 'loss';
}


// Stop immediately if someone already reached 5 points.
// Read which move the player clicked.
// Ask the computer to choose a move.
// Compare the two moves to decide if the player won, lost, or tied.
// Add 1 point to the appropriate score.
// Show the result in the status banner.
// Add the round details to the results table.
// If either player reaches 5 points, end the game and disable the buttons.
function handleSelection(event) {
    const buttons = document.querySelectorAll('#controls button');

    if (humanScore >= 5 || computerScore >= 5) return;

    const humanChoice    = event.target.dataset.choice;
    const computerChoice = getComputerChoice();
    const outcome        = playRound(humanChoice, computerChoice);

    roundNum++;
    if (outcome === 'win')  humanScore++;
    if (outcome === 'loss') computerScore++;

    // Update scoreboard
    document.getElementById('human-score').textContent    = humanScore;
    document.getElementById('computer-score').textContent = computerScore;

    // Update status banner
    const banner = document.getElementById('status-banner');
    banner.className = '';
    if (outcome === 'win') {
        banner.textContent = `🎉 You win this round! ${EMOJI[humanChoice]} beats ${EMOJI[computerChoice]}`;
        banner.classList.add('win');
    } else if (outcome === 'loss') {
        banner.textContent = `😞 Computer wins this round! ${EMOJI[computerChoice]} beats ${EMOJI[humanChoice]}`;
        banner.classList.add('loss');
    } else {
        banner.textContent = `🤝 It's a tie! You both chose ${EMOJI[humanChoice]}`;
        banner.classList.add('tie');
    }

    // Add a row to the table
    const tbody = document.getElementById('rounds-body');
    const row   = document.createElement('tr');

    const outcomeText  = outcome === 'win' ? 'You Win 🏆' : outcome === 'loss' ? 'CPU Wins 🤖' : 'Tie 🤝';
    const outcomeClass = `outcome-${outcome}`;

    row.innerHTML = `
        <td>${roundNum}</td>
        <td><span class="emoji">${EMOJI[humanChoice]}</span>${capitalize(humanChoice)}</td>
        <td><span class="emoji">${EMOJI[computerChoice]}</span>${capitalize(computerChoice)}</td>
        <td class="${outcomeClass}">${outcomeText}</td>
        <td>${humanScore} – ${computerScore}</td>
    `;
    tbody.appendChild(row);

    // Check for game over
    if (humanScore >= 5 || computerScore >= 5) {
        const gameWinner = humanScore >= 5 ? '🏆 You win the game!' : '🤖 Computer wins the game!';
        banner.textContent = gameWinner;
        banner.className = 'game-over';
        buttons.forEach(btn => btn.disabled = true);
        document.getElementById('reset-btn').style.display = 'inline-block';
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// Find every game button.
// When a button is clicked, run the handleSelection logic.
// This makes the game respond to the player's move.
document.querySelectorAll('#controls button').forEach(btn => {
    btn.addEventListener('click', handleSelection);
});

// Reset the score, round counter, and result table.
// Clear the status message.
// Show the buttons again so the player can start a new game.
document.getElementById('reset-btn').addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    roundNum    = 0;

    document.getElementById('human-score').textContent    = '0';
    document.getElementById('computer-score').textContent = '0';
    document.getElementById('status-banner').textContent  = '';
    document.getElementById('status-banner').className    = '';
    document.getElementById('rounds-body').innerHTML      = '';
    document.getElementById('reset-btn').style.display   = 'none';

    document.querySelectorAll('#controls button').forEach(btn => btn.disabled = false);
});
