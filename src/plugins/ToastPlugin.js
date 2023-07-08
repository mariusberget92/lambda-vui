import { createApp } from 'vue'
import VToast from '../components/V-Toast.vue'

export default {
  install: (app, options) => {
    const defaultOptions = {
      position: 'top-right',
      duration: 5000,
      removeOnClick: true,
    }

    // Positions map.
    const position = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
    }

    // Merge options.
    const mergedOptions = { ...defaultOptions, ...options }

    // Create toast container.
    const toastContainer = document.createElement('div')
    toastContainer.className =
      'fixed flex flex-col space-y-2 ' + position[mergedOptions.position]
    document.body.appendChild(toastContainer)

    // New $toast method.
    app.config.globalProperties.$toast = (data) => {

      // Create a new toast element.
      const toastElement = document.createElement('div')

      // Add some animation classes.
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

      // Append the toast element to the toast container.
      toastContainer.appendChild(toastElement)

      // Set the toast duration.
      const duration = data.duration || mergedOptions.duration

      // Create the toast.
      const toast = createApp(VToast, {
        message: data.message,
        type: data.type,
        duration: duration,
      })

      // Render the toast.
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
