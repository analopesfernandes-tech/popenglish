const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

// carregar quiz
fetch(`data/${quizId}.json`)
  .then(res => res.json())
  .then(data => {

    document.querySelector("h1").innerText = data.title;

    const form = document.getElementById("quizForm");

    data.questions.forEach((q, index) => {

      const div = document.createElement("div");
      div.classList.add("question");

      const p = document.createElement("p");
      p.innerText = `${index + 1}. ${q.question}`;
      div.appendChild(p);

      q.options.forEach(option => {
        const label = document.createElement("label");

        label.innerHTML = `
          <input type="radio" name="q${index}" value="${option}">
          ${option}
        `;

        div.appendChild(label);
      });

      form.appendChild(div);
    });

    window.quizData = data;
  });


// 🔥 VERIFICAR QUIZ (MESMA LÓGICA)
function verificarQuiz(){

  let score = 0;

  window.quizData.questions.forEach((q, index) => {

    const selecionado = document.querySelector(`input[name="q${index}"]:checked`);
    const inputs = document.querySelectorAll(`input[name="q${index}"]`);

    inputs.forEach(input => {
      input.parentElement.classList.remove("correto", "errado");
    });

    if(selecionado){

      if(selecionado.value === q.correct){
        selecionado.parentElement.classList.add("correto");
        score++;
      } else {
        selecionado.parentElement.classList.add("errado");

        inputs.forEach(input => {
          if(input.value === q.correct){
            input.parentElement.classList.add("correto");
          }
        });
      }
    }

  });

  const total = window.quizData.questions.length;
  const porcentagem = (score / total) * 100;

  const popup = document.getElementById("popup");
  const title = document.getElementById("popupTitle");
  const message = document.getElementById("popupMessage");
  const nextBtn = document.getElementById("nextBtn");
  const retryBtn = document.getElementById("retryBtn");

  popup.classList.remove("hidden");

  if(porcentagem >= 60){

    localStorage.setItem(window.quizData.lessonId + "Completed", "true");

    title.innerText = "🎉 Parabéns!";
    message.innerText = `Você passou! (${score}/${total})`;

    nextBtn.style.display = "inline-block";
    nextBtn.onclick = () => {
      window.location.href = window.quizData.nextLesson;
    };

  } else {

    title.innerText = "😢 Não foi dessa vez";
    message.innerText = `Continue tentando! (${score}/${total})`;

    nextBtn.style.display = "none";
  }

  retryBtn.onclick = () => location.reload();
}