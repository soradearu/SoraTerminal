const API_URL = 'http://127.0.0.1:8000'

export async function logPageView(path) {

  console.log('[SORA SIEM] Sending event:', path)

  try {

    const response = await fetch(
      `${API_URL}/events`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          path,
          timestamp: Date.now() / 1000,
        }),
      }
    )

    console.log(
      '[SORA SIEM] Response:',
      response.status
    )

    const data = await response.json()

    console.log(
      '[SORA SIEM] Detection:',
      data
    )

    return data

  } catch (error) {

    console.error(
      '[SORA SIEM] Connection failed:',
      error
    )

    return null
  }
}