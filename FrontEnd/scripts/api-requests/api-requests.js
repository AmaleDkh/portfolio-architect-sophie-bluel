// Get projects from API

export async function fetchProjects() {
    const url = 'http://localhost:5678/api/works';

    const response = await fetch(url);
    const responseProjects = await response.json();

    localStorage.setItem("stockedResponse", JSON.stringify(responseProjects));

    return responseProjects;
}

// Get categories from API

export async function fetchCategories() {
    const url = "http://localhost:5678/api/categories";

    const response = await fetch(url);
    const responseCategories = await response.json();

    return responseCategories;
}

// Add new project in API

export async function fetchNewProject(newProjectData) {
    const token = localStorage.getItem("accessToken");

    const url = 'http://localhost:5678/api/works';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: newProjectData
    })

    if (response.status !== 201) {
        throw new Error;
    }

    const responseNewProject = await response.json();

    return responseNewProject;
}

// Delete project in API

export async function fetchDeleteProject(id) {
    const token = localStorage.getItem("accessToken");

    const url = `http://localhost:5678/api/works/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status !== 204) {
        throw new Error;
    }

    return response;
}

// Check login information in API

export async function fetchLogin(email, password) {
    const url = 'http://localhost:5678/api/users/login';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (response.status !== 200) {
        throw new Error;
    }

    const responseLogin = await response.json();

    return responseLogin;
}