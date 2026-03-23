async function postJson(path, payload) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Något gick fel. Försök igen.')
  }

  return data
}

export function requestCoachHint(payload) {
  return postJson('/api/coach', payload)
}

export function requestEvaluation(payload) {
  return postJson('/api/evaluate', payload)
}
