const errorElement = document.querySelector('.error');

export function showErrorMessage() {
  errorElement.classList.remove('hidden');
}

export function hideErrorMessage() {
  errorElement.classList.add('hidden');
}
