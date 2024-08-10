export default eventHandler(async (event) => {
  const { authCookie } = useRuntimeConfig(event)
  deleteCookie(event, authCookie)
  await sendRedirect(event, '/login')
})
