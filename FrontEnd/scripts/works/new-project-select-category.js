import { fetchCategories } from "../api-requests/api-requests.js";

// Show select with categories options

export async function selectCategory() {
  const listCategories = await fetchCategories();

  const inputSelectCategory = document.querySelector("#project-category");

  const firstCategory = document.createElement("option");
  firstCategory.setAttribute("id", 0);
  firstCategory.innerText = "Sélectionnez une catégorie";
  inputSelectCategory.append(firstCategory);

  for (let i = 0; i < listCategories.length; i++) {
    const categoryName = listCategories[i].name;
    const optionCategory = document.createElement("option");
    optionCategory.setAttribute("id", listCategories[i].id);
    optionCategory.append(categoryName);
    inputSelectCategory.append(optionCategory);
  }
}
