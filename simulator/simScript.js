const quizData = [
  {
    age_group: "20대",
    question: "친구가 돈을 값지 않는다, 어떻게 돌려받을까?",
    options: [
      { text: "친구? 난 믿지 않으므로 납부일을 정한다.", score: 1 },
      { text: "최대한 늦게 돌려받아 올라갈 환율을 노린다.", score: 2 },
      { text: "친구의 돈을 받기 위해 뒷통수를 노린다.", score: 3 },
    ],
    economic_terms: ["납부일", "환율"],
  },
  {
    age_group: "20대",
    question: "내 첫 아르바이트를 했는데 손해를 본것 같다</br>뭐 때문이지..?",
    options: [
      { text: "시간당 임금을", score: 1 },
      { text: "아르바이트 기간 검토 했다.", score: 2 },
      { text: "4대 보험이 보장되어있는지 확인했다.", score: 3 },
      { text: "일하게 될 곳의 분위기가 어떤지 살폈다.", score: 4 },
    ],
    economic_terms: ["임금", "보험"],
  },
  {
    age_group: "30대",
    question:
      "이젠 결혼을 앞두고 있는데… 집을 사기위한 혜택중 무엇을 골라야 할까?",
    options: [
      { text: "청년 안심 주택", score: 1 },
      { text: "혼인 양도세 공제", score: 2 },
      { text: "디딤돌 대출", score: 3 },
    ],
    economic_terms: ["주택", "양도세", "공제", "대출"],
  },
  {
    age_group: "40대",
    question:
      "난 내가 결혼할지도 몰랐는데… 아이가 생길 것 같다..! 어떤게 가장 많은 혜택을 받을 수 있을까?",
    options: [
      { text: "첫 만남 이용권", score: 1 },
      { text: "부모급여", score: 2 },
      { text: "아동수당", score: 3 },
    ],
    economic_terms: ["일시불"],
  },
  {
    age_group: "50대",
    question:
      "회사에서 정리해고 당해버렸다… 돈도 어느정도 모았으니 창업을 해봐야겠다. 어떤걸 알아보는게 좋을까?",
    options: [
      { text: "창업지원금", score: 1 },
      { text: "폴리텍 신중년 특화 과정", score: 2 },
      { text: "창업 도약 패키지", score: 3 },
    ],
  },
  {
    age_group: "50대",
    question: "노후 준비 해야할 나 지금껏 안했는데 어떡하지???",
    options: [
      { text: "국민 연금 드가자!!!", score: 1 },
      {
        text: "새로운 일들을 해보고 싶어… 다른 일자리를 찾으러 떠나기",
        score: 2,
      },
      { text: "귀촌을 해 장려금 1200만원을 받는다.", score: 3 },
    ],
    economic_terms: ["연금", "장려금"],
  },
];

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const explanationContainer = document.getElementById("explanation-container");

let currentQuestionIndex = 0;
let totalScore = 0;
let correctAnswers = 0;
let startTime;
let isFinish = false;

// 질문 표시 함수
function loadQuestion(index) {
  const questionData = quizData[index];

  questionContainer.innerHTML = `${questionData.question}`;
  optionsContainer.innerHTML = "";

  const maxScore = questionData.options
    .map((x) => x.score)
    .reduce((a, b) => Math.max(a, b));

  questionData.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = option.text;
    // 첫 번째 옵션을 정답으로 가정 (필요에 따라 수정)

    button.addEventListener("click", () =>
      checkAnswer(option.score, maxScore == option.score)
    );
    optionsContainer.appendChild(button);
  });
}

// 정답 확인 함수
function checkAnswer(score, isCorrect) {
  totalScore += score;
  if (isCorrect) correctAnswers++;

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    setTimeout(() => loadQuestion(currentQuestionIndex), 200);
  } else {
    if (isFinish) return;
    isFinish = true;

    const total = quizData
      .map((x) =>
        x.options.map((xx) => xx.score).reduce((a, b) => Math.max(a, b))
      ) // 문제안 애들중 최대 점수 구하기
      .reduce((a, b) => a + b); // 걔네들끼리 더하기 

    const percentageScore = (correctAnswers / quizData.length * 100).toFixed(2);
    localStorage.setItem("percentageScore", percentageScore);

    const quizScore = ((totalScore / total) * 100).toFixed(2);
    localStorage.setItem("quizScore", quizScore);

    const endTime = new Date();
    const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2); // 소수점 둘째 자리까지
    localStorage.setItem("quizDuration", durationInSeconds);
    //수정
    setTimeout(() => {
      window.location.href = "theEnd.html";
    }, 2000);
  }
}

// 페이지 로드 시 실행되는 함수
window.onload = function () {
  startTime = new Date();
  loadQuestion(currentQuestionIndex);
};
