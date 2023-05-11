//inisiasi soal dalam quiz
const question = [
  {
    question:
      "Apa keuntungan menggunakan teknik pencahayaan ring light dalam fotografi?",
    optionA: "Memberikan efek siluet pada subjek",
    optionB: "Memberikan pencahayaan yang tidak merata pada subjek",
    optionC: "Menciptakan efek lens flare",
    optionD: "Memberikan pencahayaan yang lembut pada subjek",
    correctOption: "optionD",
  },

  {
    question:
      "Apa yang dimaksud dengan teknik pencahayaan split light dalam fotografi?",
    optionA: "Teknik memotret subjek dengan sumber cahaya di belakang subjek",
    optionB: "Teknik memotret subjek dengan sumber cahaya di depan subjek",
    optionC:
      "Teknik memotret subjek dengan setengah bagian wajah diterangi cahaya",
    optionD: "Teknik memotret subjek dengan satu sisi wajah diterangi cahaya",
    correctOption: "optionD",
  },

  {
    question:
      "Apa keuntungan menggunakan teknik pencahayaan softbox dalam fotografi?",
    optionA: "Memberikan pencahayaan yang tajam pada subjek",
    optionB: "Memberikan pencahayaan yang lembut pada subjek",
    optionC: "Memberikan efek bokeh pada latar belakang",
    optionD: "Menciptakan efek siluet pada subjek",
    correctOption: "optionB",
  },

  {
    question:
      "Apa yang dimaksud dengan teknik pencahayaan butterfly dalam fotografi?",
    optionA:
      "Teknik memotret subjek dengan setengah bagian wajah diterangi cahaya",
    optionB: "Teknik memotret subjek dengan sumber cahaya di belakang subjek",
    optionC: "Teknik memotret subjek dengan satu sisi wajah diterangi cahaya",
    optionD:
      "Teknik memotret subjek dengan cahaya yang berada di atas dan depan subjek",
    correctOption: "optionD",
  },

  {
    question:
      "Apa keuntungan menggunakan teknik pencahayaan side light dalam fotografi?",
    optionA: "Memberikan pencahayaan yang tajam pada subjek",
    optionB: "Memberikan pencahayaan yang dramatis pada subjek",
    optionC: "Memberikan pencahayaan yang lembut pada subjek",
    optionD: "Memberikan pencahayaan yang tidak merata pada subjek",
    correctOption: "optionB",
  },

  {
    question: "Drajat atau kedudukan kamera terhadap object disebut?",
    optionA: "Low Angle",
    optionB: "Eye Level",
    optionC: "High Angle",
    optionD: "Angle Kamera",
    correctOption: "optionD",
  },
  {
    question: "Salah satu ciri yang dimiliki oleh kamera digital adalah?",
    optionA: "Auto Focus",
    optionB: "Pinhole",
    optionC: "High Focus",
    optionD: "Focus Eye",
    correctOption: "optionA",
  },

  {
    question:
      "Medium Close Up, Big Close Up, extreme Close Up merupakan jenis dari?",
    optionA: "VCR",
    optionB: "ZOOM",
    optionC: "Focus",
    optionD: "Shot",
    correctOption: "optionB",
  },

  {
    question: "Yang termasuk jenis utama mode kamera, kecuali?",
    optionA: "Manual",
    optionB: "Shutter",
    optionC: "Aperture",
    optionD: "Depth",
    correctOption: "optionD",
  },

  {
    question: "Sudut pandang atau sudut pemotretan disebut?",
    optionA: "Angle Demon",
    optionB: "Long Shot",
    optionC: "Angle Of View",
    optionD: "Close Up",
    correctOption: "optionC",
  },

  {
    question:
      "Biasanya jenis gambar yang disimpan di kamera digital dihitung berdasarkan jumlah apa?",
    optionA: "Textur",
    optionB: "Pixel",
    optionC: "Gelombang",
    optionD: "Cahaya",
    correctOption: "optionB",
  },
];

let shuffledQuestions = []; //empty array to hold shuffled selected question

function handleQuestions() {
  //function to shuffle and push 10 question to shuffleedQuestion array
  while (shuffledQuestions.length <= 9) {
    const random = question[Math.floor(Math.random() * question.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

//function for displaying next question in the array to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //get current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //get current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of "option" (in this radio input)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = "green";
      playerScore++;
      indexNumber++;
      //set to delay question number till when question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++;
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  //delays next question displaying for a second
  setTimeout(() => {
    if (indexNumber <= 9) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // condition check for player remark and remark color
  if (playerScore <= 3) {
    remark = "Bad Grades, Keep Practicing.";
    remarkColor = "red";
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = "Average Grades, You can do better.";
    remarkColor = "orange";
  } else if (playerScore >= 7) {
    remark = "Excellent, Keep the good work going.";
    remarkColor = "green";
  }

  const playerGrade = (playerScore / 10) * 100;

  //data to display to score board
  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("remarks").style.color = remarkColor;
  document.getElementById("grade-percentage").innerHTML = playerGrade;
  document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

//closes score modal and resets game
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
