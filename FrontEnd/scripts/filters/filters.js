import { showProjects } from "../gallery/gallery.js";

// Projects filtered 

export async function showFilters(listProjects) {
    const filters = document.createElement("div");
    filters.setAttribute("class", "buttons");

    const setCategories = new Set();

    for (let i = 0; i < listProjects.length; i++) {
        const projectCategory = listProjects[i].category;
        setCategories.add(projectCategory.name);
    }

    const categories = Array.from(setCategories);

    const filterAllProjects = document.createElement("button");
    filterAllProjects.innerText = "Tous";
    filterAllProjects.addEventListener("click", () => {
        showProjects(listProjects);
    })

    filters.append(filterAllProjects);

    for (let i = 0; i < categories.length; i++) {
        const buttonCategory = document.createElement("button");
        buttonCategory.innerText = categories[i];

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