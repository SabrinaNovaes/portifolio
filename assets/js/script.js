// Seção About
const about = document.querySelector("#about");

// Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper");

// Seção Form
const formulario = document.querySelector("#formulario");

// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Função de Preenchimento da seção about
async function getAboutHitHub() {
    try {
        // Requisição do tipo GET para a API do Github
        const resposta = await fetch("https://api.github.com/users/SabrinaNovaes");

        // Converter a Resposta para json
        const perfil = await resposta.json();

        about.innerHTML = "";

        about.innerHTML = `

            <!-- Imagem da Seção About -->
            <figure class="about-image">
                <!-- Pega a imagem do perfil do github -->
                <img src="${perfil.avatar_url}" alt="${perfil.name}">
            </figure>

            <!-- Conteúdo da Seção About -->
            <article class="about-content">
                <h2>Sobre Mim</h2>
                <p>Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá. Nullam volutpat
                    risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Posuere libero varius.
                    Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Segunda-feiris nun dá, eu vô me
                    pirulitá!</p>

                <!-- Links (Github e Curriculo) e Dados do Github -->
                <div class="about-buttons-data">

                    <!-- Links -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">Github</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>

                    <!-- Dados -->
                    <div class="data-container">

                        <!-- Seguidores -->
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <!-- Repositórios públicos -->
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        console.error("Erro ao buscar dados no Github", error);
    }
}

// Função para Pegar os Projetos do GitHub
async function getProjectsGitHub() {
    try {
        // Requisição do tipo GET para a API do Github
        const resposta = await fetch(
            "https://api.github.com/users/SabrinaNovaes/repos?sort=updated&per_page=6",
        );

        // Converter a Resposta para json
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML += "";

        // ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach(repositorio => {
            // Identificar a Linguagem padrão do Repositorio
            const linguagem = repositorio.language || "GitHub";

            // Seleciona o icone da Linguagem Padrão
            const icone = linguagens[linguagem] ?? linguagens["GitHub"];

            // Monta a url que aponta para o ícone da Linguagem padrão
            const urlIcone = `./assets/icons/languages/${icone}.svg`;

            // Formatar o nome do Repositorio
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, " ") // Substitui hifens e underlines por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, "") // Remove Caracteres especiais
                .toUpperCase(); // Converte a String em letrar maiusculas

            // Descrição do repositorio
            // const descricao = repositorio.description
            //     ? repositorio.description.length > 100
            //         ? repositorio.description.substring(0, 97) + "..."
            //         : repositorio.description
            //     : "Projeto desenvolvido no Github";

            // // Tags do Repositorio
            // const tags =
            //     repositorio.topics?.length > 0
            //         ? repositorio.topics
            //             .slice(0, 3)
            //             .map((topic) => `<span class="tag">${topic}</span>`)
            //             .join(" ")
            //         : `<span class="tag">${linguagem}</span>`;

            // // Botões de ação
            // const botoesAcao = `
            //         <div class="project-buttons">
            //             <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">Github</a>

            //             ${repositorio.homepage ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
            //             : ""}
            //         </div>`


            // Função para truncar texto
            // Se a descrição possuir mais de 100 carcateres
            // seleciona os primeiros 97 e acrescenta '...' no final
            // Senão retorna o mesmo texto
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            // Define a descrição do Repositório
            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub'

            // tags
            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            // Cria o Botão Deploy
            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : ''

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${botaoDeploy}
                </div>`

            // Construir o Card
            swiperWrapper.innerHTML += `

                <div class="swiper-slide">
                    <article class="project-card">

                        <!-- Ícone da Tecnologia padrão do projeto -->
                        <figure class="project-image">
                            <img src="${urlIcone}" alt="Icone - ${linguagem} - Linguagem principal do projeto">
                        </figure>

                        <!-- Conteúdo do Projeto -->
                        <div class="project-content">

                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>

                        <!-- Tags do Projeto -->
                        <div class="project-tags">
                            ${tags}
                        </div>
                        ${botoesAcao}
                    </div>
                </article>
            </div>`
        })

        iniciarSwiper();

    } catch (error) {
        console.error("Erro ao buscar dados no Github", error);
    }
}

function iniciarSwiper() {
	new Swiper('.projects-swiper', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 24,
		centeredSlides: false,
		loop: true,
		watchOverflow: true,

		breakpoints: {
			0: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 40,
				centeredSlides: false,
			},
			769: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 40,
				centeredSlides: false,
			},
			1025: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 54,
				centeredSlides: false,
			},
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},

		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},

		grabCursor: true,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
	})
}

formulario.addEventListener("submit", function (event) {

    // Não deixa enviar o formulario sem fazer a validação de dados antes
    event.preventDefault()

    document.querySelectorAll("form span")
        .forEach(span => span.innerHTML = "")

    let isValid = true

    const nome = document.querySelector("#nome")
    const erroNome = document.querySelector("#erro-nome")

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = "O nome deve ter no mínimo 3 caracteres"

        if (isValid) nome.focus()
        isValid = false
    }

    const email = document.querySelector("#email")
    const erroEmail = document.querySelector("#erro-email")

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = "Digite um endereço de e-mail válido"

        if (isValid) email.focus()
        isValid = false
    }

    const assunto = document.querySelector("#assunto")
    const erroAssunto = document.querySelector("#erro-assunto")

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres"

        if (isValid) assunto.focus()
        isValid = false
    }

    const mensagem = document.querySelector("#mensagem")
    const erroMensagem = document.querySelector("#erro-mensagem")

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = "A mensagem não pode ser vazia"

        if (isValid) mensagem.focus()
        isValid = false
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]')
        submitButton.disabled = true
        submitButton.textContent = 'Enviando...'

        formulario.submit()
    }
})

// Executar a função getAboutGitHub
getAboutHitHub();

// Executar a função getProjectsGitHub
getProjectsGitHub();
