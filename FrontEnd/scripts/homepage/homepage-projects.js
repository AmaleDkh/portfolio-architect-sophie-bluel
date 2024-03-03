// Projects presented

export async function showProjects(listProjects) {
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