import { fetchCategories } from "../api-requests/api-requests.js";

// Show select options with categories

export async function choiceCategory() {
    const listCategories = await fetchCategories();

    const inputSelectCategory = document.querySelector("#project-category");

    const firstCategory = document.createElement("option");
    firstCategory.setAttribute("id", 0);
    firstCategory.innerText = "Sélectionnez une catégorie";
    inputSelectCategory.append(firstCategory);

    for (let i = 0; i < listCategories.length; i++) {
        const categoryDataName = listCategories[i].name;
        const optionCategory = document.createElement("option");
        optionCategory.setAttribute("id", listCategories[i].id);
        optionCategory.append(categoryDataName);
        inputSelectCategory.append(optionCategory);
    }
}