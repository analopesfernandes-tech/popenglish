// pegar qual lesson carregar (pela URL)
const params = new URLSearchParams(window.location.search);
const lessonId = params.get("id");

// carregar JSON
fetch(`data/${lessonId}.json`)
  .then(res => res.json())
  .then(data => {

    document.getElementById("title").innerText = data.title;

    const contentDiv = document.getElementById("content");

    data.sections.forEach(section => {

      if(section.type === "text"){
        const p = document.createElement("p");
        p.innerText = section.content;
        contentDiv.appendChild(p);
      }

    });

  });

  // NOVOS TIPOS

  if(section.type === "title"){
  const h3 = document.createElement("h3");
  h3.innerText = section.content;
  contentDiv.appendChild(h3);
}

if(section.type === "tip"){
  const p = document.createElement("p");
  p.innerText = "💡 " + section.content;
  p.style.fontWeight = "bold";
  contentDiv.appendChild(p);
}

if(section.type === "warning"){
  const p = document.createElement("p");
  p.innerText = "⚠️ " + section.content;
  p.style.color = "red";
  contentDiv.appendChild(p);
}