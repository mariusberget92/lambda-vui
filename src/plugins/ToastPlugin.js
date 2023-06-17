import { createApp } from 'vue'
import VToast from '../components/V-Toast.vue'

export default {
  install: (app, options) => {
    // Options may contain a position and a duration.
    // If no position is provided, the default is 'top-right'.
    // If no duration is provided, the default is 5000ms.
    const defaultOptions = {
      position: 'top-right',
      duration: 5000,
    }

    // Define the available positions.
    const position = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
    }

    // Merge the provided options with the default options.
    const mergedOptions = { ...defaultOptions, ...options }

    // Create a new div element that will serve as the toast container and append it to the body.
    const toastContainer = document.createElement('div')
    toastContainer.className =
      'fixed flex flex-col space-y-2 ' + position[mergedOptions.position]
    document.body.appendChild(toastContainer)

    // Now we need a $toast method
    // The method takes inn a message and a type and a optional duration.
    app.config.globalProperties.$toast = (data) => {
      const toastElement = document.createElement('div')

      // Need some animation here.
      toastElement.className =
        'transition-all duration-300 ease-in-out opacity-0 transform scale-75'
      setTimeout(() => {
        toastElement.className =
          'transition-all duration-300 ease-in-out opacity-100 transform scale-100'
      }, 100)

      // Animate it out after the duration has ended.
      setTimeout(() => {
        toastElement.className =
          'transition-all duration-300 ease-in-out opacity-0 transform scale-75'
      }, (data.duration || mergedOptions.duration) - 300)

      toastContainer.appendChild(toastElement)

      const duration = data.duration || mergedOptions.duration

      // Everytime the $toast method is called, we create a new VToast component that will be removed after the duration has ended.
      const toast = createApp(VToast, {
        message: data.message,
        type: data.type,
        duration: duration,
      })

      // Mount the toast to the newly created element
      toast.mount(toastElement)

      // Check for click events on the toast.
      toastElement.addEventListener('click', () => {
        // Animate the toast out.
        toastElement.className =
          'transition-all duration-300 ease-in-out opacity-0 transform scale-75'
        // Remove the toast element from the DOM.
        setTimeout(() => {
          toast.unmount(toastElement)
          toastElement.remove()
        }, 300)
      })

      // After the duration has ended, we remove the toast.
      setTimeout(() => {
        toast.unmount(toastElement)
        // Remove the toast element from the DOM.
        toastElement.remove()
      }, duration || mergedOptions.duration)
    }
  },
}
