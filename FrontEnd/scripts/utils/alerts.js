// Handle alerts

export async function showAlert(
  icon,
  title,
  text,
  confirmButton,
  confirmText,
  cancelButton,
  cancelText,
  timeProgress,
  timer,
) {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: confirmButton,
    confirmButtonText: confirmText,
    showCancelButton: cancelButton,
    cancelButtonText: cancelText,
    showCloseButton: true,
    timerProgressBar: timeProgress,
    timer: timer,
  });
}
