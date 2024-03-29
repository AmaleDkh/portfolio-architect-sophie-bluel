import { showAlert } from "../utils/alerts.js";

// Add new photo

export function addNewPhoto() {
  const buttonAddNewPhoto = document.querySelector(".button-add-new-photo");
  buttonAddNewPhoto.addEventListener("change", (e) => {
    const newPhotoSelected = e.target.files[0];

    if (!newPhotoSelected) {
      return;
    }

    if (
      !(
        newPhotoSelected.type === "image/jpeg" ||
        newPhotoSelected.type === "image/png"
      )
    ) {
      showAlert(
        "error",
        "Échec lors du chargement",
        "Le format de la photo n'est pas adapté. Veuillez réessayer.",
        false,
        "",
        false,
        "",
        true,
        6000,
      );

      return;
    }

    const imgMaxSize = 4 * 1024 * 1014;
    if (newPhotoSelected.size > imgMaxSize) {
      showAlert(
        "error",
        "Échec lors du chargement",
        "La taille de la photo n'est pas adaptée. Veuillez réessayer.",
        false,
        "",
        false,
        "",
        true,
        6000,
      );

      return;
    }

    const readerPhoto = new FileReader();

    readerPhoto.addEventListener("load", (e) => {
      const newPhotoLoaded = e.target.result;

      const newPhoto = document.querySelector(".new-photo");
      newPhoto.src = newPhotoLoaded;
      const labelPhoto = document.querySelector(".label-new-photo");
      labelPhoto.style.display = null;

      const iconPhoto = document.querySelector(".fa-image");
      iconPhoto.style.display = "none";
      const buttonAddNewPhoto = document.querySelector(
        ".button-add-new-photo",
      );
      buttonAddNewPhoto.style.display = "none";
      const photoSpecifications = document.querySelector(".photo-specifications");
      photoSpecifications.style.display = "none";
    });

    readerPhoto.readAsDataURL(newPhotoSelected);
  });
}
