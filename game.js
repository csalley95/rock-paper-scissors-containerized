function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "It's a tie!";
    }
    if ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {
        humanScore++;
        return "You win!";
    }
    computerScore++;
    return "Computer wins!";
}

function handleSelection(event) {
    if (humanScore === 5 || computerScore === 5) {
        return;
    }

    const humanSelection = event.target.dataset.choice;
    const computerSelection = getComputerChoice();
    const result = playRound(humanSelection, computerSelection);
    const results = document.querySelector("#results");

    results.textContent = `You chose ${humanSelection}. Computer chose ${computerSelection}. ${result} ` +
        `Score: You ${humanScore}, Computer ${computerScore}.`;

    if (humanScore === 5 || computerScore === 5) {
        const winner = humanScore === 5 ? "You win the game!" : "Computer wins the game!";
        results.textContent += ` ${winner}`;
    }
}

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handleSelection);
});
