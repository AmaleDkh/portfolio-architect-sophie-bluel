let modal = null;
const focusableSelector = "a, button, input, textarea";
let focusableElements = [];
let previouslyFocusedElement = null;

// Open modal

export function openModal(e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusableElements = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusableElements[0].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop-propagation")
    .addEventListener("click", stopPropagation);
}

// Close modal

function closeModal(e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop-propagation")
    .removeEventListener("click", stopPropagation);
  modal.addEventListener("animationend", hideModal);
}

function hideModal() {
  modal.style.display = "none";
  modal.removeEventListener("animationend", hideModal);
  modal = null;
}

function stopPropagation(e) {
  e.stopPropagation();
}

// Focus on modal elements

function focusInModal(e) {
  let index = focusableElements.findIndex(
    (f) => f === modal.querySelector(":focus"),
  );
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusableElements.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusableElements.length - 1;
  }
  focusableElements[index].focus();
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});
