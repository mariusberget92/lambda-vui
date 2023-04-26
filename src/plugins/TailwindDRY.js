export default {
  install: (app) => {
    app.config.globalProperties.$sizeToClass = (size) => {
      const sizes = {
        xs: ['text-xs'],
        sm: ['text-sm'],
        base: ['text-base'],
        lg: ['text-lg'],
        xl: ['text-xl'],
        '2xl': ['text-2xl'],
      }
      return sizes[size].join(' ')
    }

    app.config.globalProperties.$placeholderColors = () => {
      return 'placeholder:text-nord-300/50 dark:text-nord-snow-storm-300 dark:placeholder:text-nord-snow-storm-300/50'
    }
  },
}
