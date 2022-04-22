
const main = async () => {
    const httpResponse = await fetch("jeopardy.json");
    const data = await httpResponse.json();

    // query selectors jquery
    const oneHundred = $(".100");
    const twoHundred = $(".200");
    const fourHundred = $(".400");
    const sixHundred = $(".600");
    const eightHundred = $(".800");
    const score = $("#score");
    const question = $("#question");
    const answer = $("#answer");
    const form = $("#form");

    // global variables
    let isClicked = false;
    let buttonEnable = true;
    let randomObject;
    let newQuestion = "";

    // jquery for score
    let scoreTotal = localStorage.getItem("scoreTotal");
    if (scoreTotal === null) {
        scoreTotal = 0;
        score.text(`Score: ${Number(scoreTotal)}`);
    }
    else {
        score.text(`Score: ${Number(scoreTotal)}`);
    }

    // function to get question
    const randomQuestion = function (value) {
        randomObject = data[Math.ceil(Math.random() * data.length - 1)];
        while (randomObject.value !== value) {
            randomObject = data[Math.ceil(Math.random() * data.length - 1)];
        }
        console.log(randomObject);
        question.text(`${randomObject.question}?`);
    }

    // ___________________________________event listeners for questions________________________________________________________________________
    
    // jquery event listener for $100
    oneHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$100");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
            }
        }
    })
    // jquery event listener for $200
    twoHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$200");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
            }
        }
    })
    // jquery event listener for $400
    fourHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$400");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
            }
        }
    })
    // jquery event listener for $600
    sixHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$600");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
            }
        }
    })
    // jquery event listener for $800
    eightHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$800");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
            }
        }
    })
    //___________________________________________________end of event listeners__________________________________________________________

    // submit button
    if (buttonEnable === true) {
        form.on("submit", (event) => {
            event.preventDefault();

            if (answer.value === undefined) {
                question.text("Please enter an answer.");
                isClicked = false;
            }
            else if (answer.value === "") {
                question.text("Please enter an answer.");
            }

            let currentScore = randomObject.value.substring(1);

            // correct answer
            const correctAnswer = () => {
                scoreTotal = Number(scoreTotal) + Number(currentScore);
                question.text(`Correct! + $${currentScore}`);
                answer.val("");
                score.text(`Score: $${Number(scoreTotal)}`);
                localStorage.setItem("scoreTotal", scoreTotal);
                isClicked = false;
                buttonEnable = false;
            }

            // incorrect answer
            const incorrectAnswer = () => {
                scoreTotal = Number(scoreTotal) - Number(currentScore);
                score.text(`Score: $${scoreTotal}`);
                question.text(`Incorrect! The correct answer is: ${randomObject.answer} - $${currentScore}`);
                answer.val("");
                localStorage.setItem("scoreTotal", scoreTotal);
                isClicked = false;
                buttonEnable = false;
            }

            // conditional for correct/incorrect
            if (answer.val().toString() === randomObject.answer.toString()) {
                correctAnswer();
            }
            else {
                console.log(answer.value);
                if (answer.val().toString() === undefined) {
                    question.text(`${randomObject.question}? Please input an answer.`);
                }
                else if (answer.val().toString() === "") {
                    question.text(`${randomObject.question}? Please input an answer.`);
                }
                else {
                    incorrectAnswer();
                }
            }
        })
    }

}
main();
