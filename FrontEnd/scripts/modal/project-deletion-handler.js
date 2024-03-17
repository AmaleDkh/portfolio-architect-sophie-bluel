import { showProjects } from "../gallery/gallery.js";

// Projects deleting

export async function deleteProject(id) {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        return
    }

    const projectInPortfolio = document.querySelector(`[data-work-id="${id}"]`);

    if (!projectInPortfolio) {
        alert("Erreur lors de suppression du projet");
        return
    }

    projectInPortfolio.remove();
    const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
    const updatedListProjects = listProjects.filter(project => project.id !== id);
    localStorage.setItem("stockedResponse", JSON.stringify(updatedListProjects));
    showProjects(updatedListProjects);
    alert("Suppression du projet réussie");
}