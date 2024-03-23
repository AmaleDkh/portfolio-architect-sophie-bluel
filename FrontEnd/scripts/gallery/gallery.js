// Projects presented

export async function showProjects(listProjects) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';

    for (let i = 0; i < listProjects.length; i++) {
        const img = listProjects[i].imageUrl;
        const imgProject = document.createElement('img');
        imgProject.src = img;
        imgProject.append(img);

        const title = listProjects[i].title;
        const titleProject = document.createElement("figcaption");
        titleProject.append(title);

        const project = document.createElement("figure");
        project.setAttribute("id", listProjects[i].id);
        project.setAttribute("data-word-id", listProjects[i].id);
        project.append(imgProject);
        project.append(titleProject);

        gallery.append(project);
    }
}
