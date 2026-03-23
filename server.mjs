import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import OpenAI from 'openai'
import { getSubjectBySlug } from './src/data/subjects.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 3001)
const model = process.env.OPENAI_MODEL || 'gpt-5-mini'
const apiKey = process.env.OPENAI_API_KEY
const client = apiKey ? new OpenAI({ apiKey }) : null

const app = express()
app.use(express.json({ limit: '1mb' }))

app.get('/api/status', (_request, response) => {
  response.json({
    ok: true,
    model,
    openaiConfigured: Boolean(client),
  })
})

app.post('/api/coach', async (request, response) => {
  const task = findTask(request.body)

  if (!task) {
    response.status(404).json({ error: 'Uppgiften kunde inte hittas.' })
    return
  }

  const attempt = String(request.body?.attempt || '').trim()

  if (!client) {
    response.json({
      message: buildOfflineHint(task, attempt),
      source: 'offline',
    })
    return
  }

  try {
    const result = await client.responses.create({
      model,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                'Du ar en varm svensk studiecoach for barn. Ge en kort ledtrad i hogst tre meningar. Ge inte hela losningen direkt. Hjalp barnet att ta nasta steg.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: [
                `Uppgift: ${task.question}`,
                `Barnets forsok: ${attempt || 'Inget svar annu.'}`,
                `Intern ledtrad: ${task.hint}`,
              ].join('\n'),
            },
          ],
        },
      ],
    })

    response.json({
      message: extractOutputText(result) || buildOfflineHint(task, attempt),
      source: 'openai',
    })
  } catch (error) {
    console.error('Coach request failed:', error)
    response.status(500).json({
      error: 'Coachningen kunde inte hamtas just nu.',
    })
  }
})

app.post('/api/evaluate', async (request, response) => {
  const task = findTask(request.body)

  if (!task) {
    response.status(404).json({ error: 'Uppgiften kunde inte hittas.' })
    return
  }

  const attempt = String(request.body?.attempt || '').trim()

  if (!attempt) {
    response.status(400).json({
      error: 'Skriv ett svar innan du ber om rättning.',
    })
    return
  }

  if (!client) {
    response.json(buildOfflineEvaluation(task, attempt))
    return
  }

  try {
    const result = await client.responses.create({
      model,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                'Du ar en varm svensk larcoach for barn. Bedom svaret kort och tydligt. Om svaret ar fel ska du vara stottande, kortfattad och ge ett konkret nasta steg.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: [
                `Uppgift: ${task.question}`,
                `Forvantat svar: ${task.expectedAnswer}`,
                `Godkanda varianter: ${task.acceptedAnswers.join(', ')}`,
                `Forklaring: ${task.explanation}`,
                `Barnets svar: ${attempt}`,
              ].join('\n'),
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'study_feedback',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              verdict: {
                type: 'string',
                enum: ['correct', 'almost', 'needs_work'],
              },
              feedback: {
                type: 'string',
              },
              nextStep: {
                type: 'string',
              },
            },
            required: ['verdict', 'feedback', 'nextStep'],
          },
          strict: true,
        },
      },
    })

    const parsed = safeParseJson(extractOutputText(result))

    response.json(
      parsed || {
        verdict: 'needs_work',
        feedback: 'Jag kunde inte tolka bedomningen fullt ut, men vi provar ett steg i taget.',
        nextStep: task.hint,
      },
    )
  } catch (error) {
    console.error('Evaluation request failed:', error)
    response.status(500).json({
      error: 'Rattningen kunde inte genomforas just nu.',
    })
  }
})

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))

  app.get(/^(?!\/api).*/, (_request, response) => {
    response.sendFile(path.join(distDir, 'index.html'))
  })
} else {
  app.get('/', (_request, response) => {
    response.status(503).send(
      'Frontend-build saknas. Kor `npm run dev` for klienten eller `npm run build` innan `npm start`.',
    )
  })
}

app.listen(port, () => {
  console.log(`plugg.pro server listening on http://localhost:${port}`)
})

function findTask(payload) {
  const subject = getSubjectBySlug(payload?.subject)

  if (!subject || !subject.starterTask) {
    return null
  }

  if (subject.starterTask.id !== payload?.taskId) {
    return null
  }

  return subject.starterTask
}

function buildOfflineHint(task, attempt) {
  if (!attempt) {
    return `${task.hint} Du behover bara hitta hur mycket serien okar med for att komma vidare.`
  }

  return `Bra att du provar. ${task.hint} Titta sedan pa vilket tal som borde komma efter 36 innan du jamfor med 48.`
}

function buildOfflineEvaluation(task, attempt) {
  const normalizedAttempt = normalize(attempt)
  const normalizedAnswers = task.acceptedAnswers.map(normalize)

  if (normalizedAnswers.includes(normalizedAttempt)) {
    return {
      verdict: 'correct',
      feedback: `${task.successMessage} ${task.explanation}`,
      nextStep: 'Prova nu att forklara med egna ord hur du sag monstret.',
    }
  }

  const almost = normalizedAttempt.includes('4') || normalizedAttempt.includes('2')

  if (almost) {
    return {
      verdict: 'almost',
      feedback:
        'Du verkar vara inne pa ratt spar, men kontrollera hur mycket talen okar mellan varje steg.',
      nextStep: task.hint,
    }
  }

  return {
    verdict: 'needs_work',
    feedback:
      'Inte riktigt annu, men det ar helt okej. Vi fokuserar bara pa skillnaden mellan talen ett steg i taget.',
    nextStep: task.hint,
  }
}

function extractOutputText(result) {
  if (typeof result.output_text === 'string' && result.output_text.trim()) {
    return result.output_text.trim()
  }

  const textParts = result.output
    ?.flatMap((item) => item.content || [])
    .filter((item) => item.type === 'output_text')
    .map((item) => item.text)

  return textParts?.join('\n').trim() || ''
}

function safeParseJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()
}
