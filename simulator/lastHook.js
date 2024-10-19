const webhookUrl ="https://discord.com/api/webhooks/1297223107664416850/ap8UHlCaBuXM_8yLz5mwtEsqrsFquTFaz5cvRZhh8ZEvr8pHL_Lt1OZNsGlhBruF2lgi";

// 예시 데이터

const RealScore = localStorage.getItem("percentageScore"); // 소수점 값
const Duration = localStorage.getItem("quizDuration"); // 소수점 값
const Result = localStorage.getItem("quizResult"); // 문자 값 (O or X)
const Score = localStorage.getItem("quizScore"); // 소수점 값
const Name = localStorage.getItem("nickname"); // 문자 값


// 메시지 전송 로직
fetch(webhookUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    content: null,
    embeds: [
      {
        title: "경제 테스트 결과",
        description:
          `${Name}님의 퀴즈 결과가 전송되었습니다.\n\n` +
          `**닉네임**: ${Name}\n` +
          `**퍼센티지 점수**: ${RealScore}\n` +
          `**퀴즈 시간**: ${Duration}초\n` +
          `**퀴즈 결과**: ${Result}\n` +
          `**퀴즈 점수**: ${Score}`,
        color: 5763719,
        timestamp: new Date().toISOString(),
      },
    ],
  }),
})
  .then((response) => {
    console.log("Response status:", response.status); // 응답 상태 로그 추가
    if (response.ok) {
      console.log("Webhook sent successfully");
    } else {
      console.error("Error sending webhook:", response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
