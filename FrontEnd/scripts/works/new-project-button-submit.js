export function buttonSubmitProject() {
    const changedElements = [];

    const photoNewProject = document.querySelector(".input-add-new-photo");
    photoNewProject.addEventListener("change", () => {
        if (!changedElements.includes("Changed photo")) {
            changedElements.push("Changed photo");
            checkButtonSubmit();
        }
    })

    const titleNewProject = document.querySelector("#project-title");
    titleNewProject.addEventListener("input", () => {
        if (!changedElements.includes("Changed title") && titleNewProject.value.trim() !== '') {
            changedElements.push("Changed title");
            checkButtonSubmit();
        }

        if (titleNewProject.value == '') {
            const titleIndex = changedElements.indexOf("Changed title");
            changedElements.splice(titleIndex, 1);
            checkButtonSubmit();
        }
    })

    const categoryNewProject = document.querySelector("#project-category");
    categoryNewProject.addEventListener("change", () => {
        if (!changedElements.includes("Changed category")) {
            changedElements.push("Changed category");
            checkButtonSubmit();
        }

        const category = document.querySelector("#project-category option:checked");
        if (category.id === '0') {
            const categoryIndex = changedElements.indexOf("Changed category");
            changedElements.splice(categoryIndex, 1);
            checkButtonSubmit();
        }
    })

    function checkButtonSubmit() {
        if (changedElements.length === 3) {
            const inputProjectSubmit = document.querySelector(".input-project-submit");
            inputProjectSubmit.style.backgroundColor = '#1D6154';
        } else {
            const inputProjectSubmit = document.querySelector(".input-project-submit");
            inputProjectSubmit.style.backgroundColor = '#A7A7A7';
        }
    }
}