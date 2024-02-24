init()

async function init() {
    const listProjects = await fetchWorks();
    showProjects(listProjects);
    showFilters(listProjects);
}

async function fetchWorks() {
    const url = 'http://localhost:5678/api/works'
    const response = await fetch(url).then(response => response.json());
    return response;
}

// Projects presented 

async function showProjects(listProjects) {
    const portfolioProjects = document.querySelector("#portfolio");

    const gallery = document.querySelector(".gallery");

    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    for (let i = 0; i < listProjects.length; i++) {
        const img = listProjects[i].imageUrl;
        const imgProject = document.createElement('img');
        imgProject.src = img;
        imgProject.append(img);

        const title = listProjects[i].title;
        const titleProject = document.createElement("figcaption");
        titleProject.append(title);

        const project = document.createElement("figure");
        project.append(imgProject);
        project.append(titleProject);
        project.setAttribute("id", listProjects[i].id);

        gallery.append(project);

        portfolioProjects.append(gallery);
    }
}

// Projects filtered

async function showFilters(listProjects) {
    const filters = document.createElement("div");
    filters.setAttribute("class", "buttons");

    const setCategories = new Set();

    for (let i = 0; i < listProjects.length; i++) {
        const projectCategory = listProjects[i].category;
        setCategories.add(projectCategory.name);
    }

    const categories = Array.from(setCategories);

    const filterAll = document.createElement("button");
    filterAll.innerText = "Tous";
    filterAll.addEventListener("click", () => {
        showProjects(listProjects);
    })
    filters.append(filterAll);

    for (let i = 0; i < categories.length; i++) {
        const buttonCategory = document.createElement("button");
        buttonCategory.innerText = categories[i]

        buttonCategory.addEventListener("click", () => {
            const filteredProjects = listProjects.filter(project =>
                project.category.name === categories[i]
            )

            showProjects(filteredProjects);
        })
        filters.append(buttonCategory);
    }

    const gallery = document.querySelector(".gallery");

    const portfolio = document.querySelector("#portfolio");

    portfolio.insertBefore(filters, gallery);
}