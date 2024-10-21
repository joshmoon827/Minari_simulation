const quizData = [
    {
      age_group: "20대",
      question: "1/9<br/><br/>다음중 최고의 학교는? ( 점수 안들어감 )",
      options: [
        { text: "**대구소프트웨어마이스터고등학교**", score: 1 },
        { text: "광주소프트웨어마이스터고등학교", score: 1 },
        { text: "부산소프트웨어마이스터고등학교", score: 1 },
      ],
      economic_terms: [],
    },
    {
      age_group: "20대",
      question: "2/9<br/><br/>가입 시점 외에는 돈을 넣을 수 없는 예금은?",
      options: [
        { text: "정기 예금", score: 4 },
        { text: "보통 예금", score: 3 },
        { text: "CMA", score: 2 },
        { text: "대고객 RP", score: 1 },
      ],
      economic_terms: ["임금", "보험"],
    },
    {
      age_group: "30대",
      question: "3/9<br/><br/>이젠 결혼을 앞두고 있는데… 집을 사기위한 혜택중 무엇을 골라야 할까?",
      options: [
        { text: "청년 안심 자택", score: 2 },
        { text: "혼인 양도세 공제", score: 3 },
        { text: "디딤다리 대출", score: 1 },
      ],
      economic_terms: ["주택", "양도세", "공제", "대출"],
    },
    {
      age_group: "40대",
      question: "4/9<br/><br/>‘1달러=1000원’에서 ‘1달러=2000원’이 됐다고 가정했을 때, 잘못된 해석은?",
      options: [
        { text: "원화값 상승", score: 4 },
        { text: "원달러 환율 상승", score: 1 },
        { text: "달러가치 상승", score: 2 },
        { text: "수출기업에 긍정적 영향", score: 1 },
      ],
      economic_terms: ["아동 수당"],
    },
    {
      age_group: "50대",
      question: "5/9<br/><br/>현재 한국은행 기준금리는 얼마일까?",
      options: [
        { text: "연 3.25%", score: 3 },
        { text: "연 3.47%", score: 1 },
        { text: "연 4.1%", score: 1 },
      ],
    },
    {
      age_group: "50대",
      question: "6/9<br/><br/>점포를 거래할 때 기존 점주가 쌓은 영업 노하우와 단골 등을 이어받는 명목으로 지급하는 돈은?",
      options: [
        { text: "권리금", score: 1 },
        { text: "중도금", score: 3 },
        { text: "『모른다』", score: 0 },
      ],
      economic_terms: ["연금"],
    },
    {
      age_group: "50대",
      question: "7/9<br/><br/>강력한 경쟁자가 등장했을 때 기존 기업들의 경쟁력이 오히려 강해지는 현상을 가리키는 용어는?",
      options: [
        { text: "풍선효과", score: 1 },
        { text: "기저효과", score: 1 },
        { text: "메기효과", score: 3 },
      ],
      economic_terms: ["연금"],
    },
    {
      age_group: "50대",
      question: "8/9<br/><br/>어떤 산업이 장기 호황을 맞거나 어떤 자산 가격이 대세 상승장을 맞았을 때 쓰는 표현은?",
      options: [
        { text: "퍼펙트 스톰", score: 1 },
        { text: "캐리트레이드", score: 1 },
        { text: "승자의 저주", score: 1 },
        { text: "슈퍼 사이클", score: 3 },
      ],
      economic_terms: ["연금"],
    },
    {
      age_group: "50대",
      question: "⚠️ 청소년만 선택(마지막) ⚠️ <br/><br/><br/>  경제를 배우고 싶은 의향이 있나요?  <br/> ( 점수 안들어감 )<br/><br/>",
      options: [
        { text: "있다", score: 0, result: 1 },
        { text: "없다", score: 0,result: 0 },
        { text: "(청소년이 아닙니다)", score: 1 },
      ],
      economic_terms: ["연금"],
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

    button.addEventListener("click", () =>
      checkAnswer(option.score, maxScore == option.score, option.result)
    );
    optionsContainer.appendChild(button);
  });
}


// 정답 확인 함수
function checkAnswer(score, isCorrect, result = null) {
  totalScore += score;
  if (isCorrect) correctAnswers++;

  // result 값이 있는 경우 저장 (1은 'O', 0은 'X'로 저장)
  if (result !== null) {
    const resultString = result === 1 ? "O" : "X";
    localStorage.setItem("quizResult", resultString);
  }

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

    setTimeout(() => {
      window.location.href = "theEnd.html";
    }, 500);
  }
}


// 페이지 로드 시 실행되는 함수
window.onload = function () {
  startTime = new Date();
  loadQuestion(currentQuestionIndex);
};
