const params = new URLSearchParams(window.location.search);
let lessonId = params.get("id");

// fallback pra evitar erro
if (!lessonId) {
  lessonId = "lesson1";
}

fetch(`data/${lessonId}.json`)
  .then(res => res.json())
  .then(data => {

    document.getElementById("title").innerText = data.title;

    const contentDiv = document.getElementById("content");

    data.sections.forEach(section => {

      if (section.type === "text") {
        const p = document.createElement("p");
        p.innerText = section.content;
        contentDiv.appendChild(p);
      }

      if (section.type === "title") {
        const h3 = document.createElement("h3");
        h3.innerText = section.content;
        contentDiv.appendChild(h3);
      }

      if (section.type === "tip") {
        const p = document.createElement("p");
        p.innerText = "💡 " + section.content;
        p.style.fontWeight = "bold";
        contentDiv.appendChild(p);
      }

      if (section.type === "warning") {
        const p = document.createElement("p");
        p.innerText = "⚠️ " + section.content;
        p.style.color = "red";
        contentDiv.appendChild(p);
      }

    });

    // 👉 botão para quiz
    document.getElementById("btnQuiz").onclick = () => {
      window.location.href = `quiz.html?id=${lessonId}`;
    };

  })
  .catch(err => console.log("Erro:", err));