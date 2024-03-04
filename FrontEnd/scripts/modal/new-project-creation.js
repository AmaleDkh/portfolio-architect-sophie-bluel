import { hideErrors } from "../errors-handling.js";

// New project adding

export function addNewProject() {
    const submitForm = document.querySelector(".modal-form");
    submitForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titleNewProject = document.querySelector("#project-title").value;
        const categoryNewProject = document.querySelectorAll("#project-category option:checked")[0].id;
        const photoNewProject = document.querySelector(".input-add-new-photo").files[0];

        const errors = []
        if (titleNewProject === '') {
            errors.push({ text: "titre", id: "modal-form-error-1" });
        }
        if (categoryNewProject === '0') {
            errors.push({ text: "catégorie", id: "modal-form-error-2" });
        }
        if (photoNewProject === undefined) {
            errors.push({ text: "photo", id: "modal-form-error-3" });
        }

        if (errors.length === 0) {
            const inputProjectSubmit = document.querySelector(".input-project-submit");
            inputProjectSubmit.style.backgroundColor = '#1D6154';

            const newProjectData = new FormData();
            newProjectData.append("image", photoNewProject);
            newProjectData.append("title", titleNewProject);
            newProjectData.append("category", categoryNewProject);

            const token = localStorage.getItem("accessToken");
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: newProjectData
            })
            const responseData = await response.json();
            const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
            listProjects.push(responseData);
            localStorage.setItem("stockedResponse", JSON.stringify(listProjects));  
        } else {
            errors.forEach((error) => {
                const divError = document.getElementById(error.id);
                divError.style.display = null;
                divError.innerText = "L'information " + error.text + " est manquante";
            })

            const faImage = document.querySelector(".fa-image");
            faImage.style.paddingTop = "8px";
            const selectCategory = document.querySelector("#project-category");
            selectCategory.style.marginBottom = "0";
            const inputProjectSubmit = document.querySelector(".input-project-submit");
            inputProjectSubmit.style.marginTop = "38px";
        }
        document.addEventListener("click", () => {
            hideErrors();
        }, true);
    })
}