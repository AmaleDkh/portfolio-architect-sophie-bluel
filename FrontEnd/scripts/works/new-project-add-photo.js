// // New photo adding

export function addNewPhoto() {
    const titleAddPhoto = document.querySelector(".button-add-new-photo");
    titleAddPhoto.addEventListener("change", (e) => {
        const newPhotoSelected = e.target.files[0];
        const readerPhoto = new FileReader();

        readerPhoto.addEventListener("load", (e) => {
            const newPhotoLoaded = e.target.result;

            const newPhoto = document.querySelector(".new-photo");
            newPhoto.src = newPhotoLoaded;
            const labelPhoto = document.querySelector(".label-new-photo");
            labelPhoto.style.display = null;

            const iconPhoto = document.querySelector(".fa-image");
            iconPhoto.style.display = "none";
            const secondModalAddPhoto = document.querySelector(".button-add-new-photo");
            secondModalAddPhoto.style.display = "none";
            const specsPhoto = document.querySelector(".specs-photo");
            specsPhoto.style.display = "none";
        })
        if (newPhotoSelected) {
            readerPhoto.readAsDataURL(newPhotoSelected);
        }
    })
}