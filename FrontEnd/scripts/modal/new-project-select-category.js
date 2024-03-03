// Get API categories for select options

export async function choiceCategory() {
    const url = "http://localhost:5678/api/categories";
    const categoriesData = await fetch(url).then(response => response.json());

    const inputSelectCategory = document.querySelector("#project-category");

    const firstCategory = document.createElement("option");
    firstCategory.setAttribute("id", 0);
    firstCategory.innerText = "Sélectionnez une catégorie";
    inputSelectCategory.append(firstCategory);

    for (let i = 0; i < categoriesData.length; i++) {
        const categoryDataName = categoriesData[i].name;
        const optionCategory = document.createElement("option");
        optionCategory.setAttribute("id", categoriesData[i].id);
        optionCategory.append(categoryDataName);
        inputSelectCategory.append(optionCategory);
    }
}