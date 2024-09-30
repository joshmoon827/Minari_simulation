function openShareModal() {
  document.getElementById("shareModal").style.display = "block";
}

function closeShareModal() {
  document.getElementById("shareModal").style.display = "none";
}

function shareKakao() {
  alert("카카오톡 공유 기능이 실행되었습니다.");
  // 실제 카카오톡 공유 API 구현 필요
}

function shareInstagram() {
  alert("인스타그램 공유 기능이 실행되었습니다.");
  // 실제 인스타그램 공유 API 구현 필요
}

function copyLink() {
  const webLink = "bit.ly/Minari_cheongpodo_sim";
  navigator.clipboard
    .writeText(webLink)
    .then(() => {
      alert("링크가 클립보드에 복사되었습니다.");
    })
    .catch((err) => {
      console.error("링크 복사 실패:", err);
      alert("링크 복사에 실패했습니다.");
    });
}
// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  if (event.target == document.getElementById("shareModal")) {
    closeShareModal();
  }
};


