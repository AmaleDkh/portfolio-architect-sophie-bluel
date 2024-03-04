// Projects deleting

export async function deleteProject(id) {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
        const projectInPortfolio = document.getElementById(`${id}`);
        if (projectInPortfolio) {
            const listProjects = JSON.parse(localStorage.getItem("stockedResponse"));
            const updatedListProjects = listProjects.filter(project => project.id !== id);
            localStorage.setItem("stockedResponse", JSON.stringify(updatedListProjects));
            alert("Suppression du projet réussie");
        } else {
            alert("Erreur lors de suppression du projet");
        }
    }
}