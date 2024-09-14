import * as bootstrap from 'bootstrap';


function createToast (message, bgColor) {
    const toastContainer = document.getElementById('toastContainer')
    const toast = document.createElement('div')
  
    toast.classList.add('toast', 'align-items-center', 'text-white', `bg-${bgColor}`, 'border-0')
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'assertive')
    toast.setAttribute('aria-atomic', 'true')
  
    // Create a toast d-flex
    const toastDFlex = document.createElement('div')
    toastDFlex.classList.add('d-flex')
  
    // Create a toast body
    const toastBody = document.createElement('div')
    toastBody.classList.add('toast-body')
    toastBody.innerText = message
  
    // Create a close button
    const closeButton = document.createElement('button')
    closeButton.type = 'button'
    closeButton.classList.add('btn-close', 'btn-close-white', 'me-2', 'm-auto')
    closeButton.setAttribute('data-bs-dismiss', 'toast')
    closeButton.setAttribute('aria-label', 'Close')
  
    // Append the body to the toast
    toastDFlex.appendChild(toastBody)
    toastDFlex.appendChild(closeButton)
  
    toast.appendChild(toastDFlex)
    toastContainer?.appendChild(toast)
    console.log(toast)

    const bsToast = new bootstrap.Toast(toast)
    bsToast.show()
  }
  
  export const ToastSetup = {
    createSuccessToast: (message) => { createToast(message, 'success') },
    createErrorToast: (message) => { createToast(message, 'danger') }
  }