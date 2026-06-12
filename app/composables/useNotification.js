/**
 * 
 * useNotification Composable
 * 
 * global notification handler
 */

export const useNotification = () => {

  /**
   * reactive states
   */
  const showMsg = ref(false)
  const message = ref("")
  const isError = ref(false)
  let timeoutId = null

  /**
   * 
   * notifications actions
   */

  // display success notification 
  const showSuccess = (msg, duration = 5000) => {

    message.value = msg
    isError.value = false
    showMsg.value = true

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      showMsg.value = false
    }, duration)
  }

  // displays error notification
  const showError = (msg, duration = 5000) => {

    message.value = msg
    isError.value = true
    showMsg.value = true

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      showMsg.value = false
    }, duration)
  }

  /**
   * manually closes notification
   */
  const closeNotification = () => {
    showMsg.value = false
    clearTimeout(timeoutId)
  }

  return {
    showMsg,
    message,
    isError,
    showSuccess,
    showError,
    closeNotification
  }
}