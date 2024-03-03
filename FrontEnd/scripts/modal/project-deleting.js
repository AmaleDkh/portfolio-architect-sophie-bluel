// Projects deleting

export function deleteProject(id) {
    const token = localStorage.getItem("accessToken");

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(() => {
            const projectInPortfolio = document.getElementById(`${id}`);
            if (projectInPortfolio) {
                projectInPortfolio.remove();
                alert("Suppression du projet réussie");
            } else {
                alert("Erreur lors de suppression du projet");
            }
        })
}