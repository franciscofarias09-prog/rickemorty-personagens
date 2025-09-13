const urlApi = "https://rickandmortyapi.com/api/character";

//personagens principais
const principais = [1, 2, 3, 4, 5];

const container = document.getElementById("listaPersonagens");
const campoBusca = document.getElementById("campoBusca");

async function mostrarPrincipais() {
  try {
    const resposta = await fetch(`${urlApi}/${principais.join(",")}`);
    const personagens = await resposta.json();

    container.innerHTML = "";

    personagens.forEach(personagem => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${personagem.image}" alt="${personagem.name}">
        <div class="card-info">
          <h2>${personagem.name}</h2>
          <p><strong>Espécie:</strong> ${personagem.species}</p>
          <p><strong>Status:</strong> ${personagem.status}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao buscar personagens principais:", erro);
    container.innerHTML = "<p>Erro ao carregar personagens principais.</p>";
  }
}

//buscar 
async function buscarPersonagens(nome = "") {
  try {
    const resposta = await fetch(`${urlApi}?name=${nome}`);
    const dados = await resposta.json();

    container.innerHTML = "";

    if (dados.results) {
      dados.results.forEach(personagem => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${personagem.image}" alt="${personagem.name}">
          <div class="card-info">
            <h2>${personagem.name}</h2>
            <p><strong>Espécie:</strong> ${personagem.species}</p>
            <p><strong>Status:</strong> ${personagem.status}</p>
          </div>
        `;

        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>Nenhum personagem encontrado</p>";
    }
  } catch (erro) {
    console.error("Erro na busca:", erro);
    container.innerHTML = "<p>Ops! Algo deu errado...</p>";
  }
}

//mostrar os principais no começo da pagina
mostrarPrincipais();

//buscar
campoBusca.addEventListener("input", (e) => {
  if (e.target.value.trim() === "") {
    mostrarPrincipais(); 
  } else {
    buscarPersonagens(e.target.value);
  }
});