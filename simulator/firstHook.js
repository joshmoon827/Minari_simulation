document.getElementById("submit-btn").addEventListener("click", function () {
    const name = document.getElementById("name-input").value;

    if (name === "") {
        alert("닉네임을 입력해주세요.");
        return;
    }

    // 닉네임을 로컬 스토리지에 저장
    localStorage.setItem("nickname", name);

    const webhookUrl = 'https://discord.com/api/webhooks/1295894245684805683/Tml3v0FwRGC3lfFXgFwuTmlLki0QvHX60sdRR14qJXRkabB6S3kFcB-_C1HhLz6CBjWL';

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: null,
            embeds: [
                {
                    title: "경제 테스트 응시 시작 알림",
                    description: `응시자 : ${name}\n`,
                    color: 5763719,
                    timestamp: new Date().toISOString(),
                },
            ],
        }),
    })
    .then(response => {
        console.log('Response status:', response.status); // 응답 상태 로그 추가
        if (response.ok) {
            console.log('Webhook sent successfully');
            location.href = 'sim.html'; // 성공 시 페이지 이동
        } else {
            console.error('Error sending webhook:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});