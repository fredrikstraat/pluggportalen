import { startTransition, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import './App.css'
import {
  getSubjectBySlug,
  learningFoundation,
  mathLaunchPlan,
  routeBlueprint,
  subjects,
} from './data/subjects'
import { requestCoachHint, requestEvaluation } from './lib/api'

function App() {
  return (
    <BrowserRouter>
      <PortalShell />
    </BrowserRouter>
  )
}

function PortalShell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">pp</span>
          <span className="brand-copy">
            <strong>plugg.pro</strong>
            <span>Lugn läxhjälp i ett gemensamt portalformat</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Huvudnavigation">
          <NavItem to="/">Start</NavItem>
          <NavItem to="/matematik">Matematik</NavItem>
          <NavItem to="/geografi">Geografi</NavItem>
          <NavItem to="/historia">Historia</NavItem>
          <NavItem to="/biologi">Biologi</NavItem>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:subjectSlug" element={<SubjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer className="site-footer">
        En portal, en Render-service och samma pedagogiska kärna för varje ämne.
      </footer>
    </div>
  )
}

function NavItem({ children, to }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link'
      }
      to={to}
    >
      {children}
    </NavLink>
  )
}

function HomePage() {
  const featuredSubject = getSubjectBySlug('matematik')

  return (
    <main className="page">
      <section className="panel hero-panel">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">Startsida för plugg.pro</div>
            <h1>En lugn portal som hjälper barn över starttröskeln.</h1>
            <p>
              plugg.pro blir en samlad portal för läxhjälpsappar där varje ämne
              lever som en route i samma app. Barnet möter samma trygga upplägg
              varje gång: starta lugnt, få coachning, prova själv och få varm
              återkoppling.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" to={featuredSubject.route}>
                Öppna Matematik
              </Link>
              <a
                className="button button-secondary"
                href="#portal-arkitektur"
              >
                Se portalens struktur
              </a>
            </div>
          </div>

          <aside className="hero-side">
            <div className="summary-card">
              <strong>Första versionen vi bygger nu</strong>
              <p>
                En tydlig startyta, gemensam routing, mörk mobilvänlig design
                och Matematik som första ämne i drift.
              </p>

              <div className="metric-row">
                <div className="metric">
                  <span className="metric-label">Domänroll</span>
                  <span className="metric-value">plugg.pro = portalens hem</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Drift</span>
                  <span className="metric-value">1 Render-service</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Först ut</span>
                  <span className="metric-value">Matematik</span>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <strong>OpenAI:s roll</strong>
              <p>
                Samma backend-yta används för två typer av stöd: coachning med
                ledtrådar och rättning med nästa steg. Det gör att ämneslogiken
                kan återanvändas mellan routes.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="page" aria-labelledby="subjects-heading">
        <div className="section-heading">
          <div>
            <h2 id="subjects-heading">1. Informationsarkitektur</h2>
            <p>
              Portalen består av ett gemensamt skal och ämnen som kan växa
              ett i taget utan att vi ändrar grundlogiken.
            </p>
          </div>
        </div>

        <div className="subject-grid">
          {subjects.map((subject) => (
            <Link className="subject-card" key={subject.slug} to={subject.route}>
              <div className="subject-topline">
                <span className={`status-pill status-${subject.status}`}>
                  {subject.status === 'live'
                    ? 'Live nu'
                    : subject.status === 'soon'
                      ? 'Nästa ämne'
                      : 'Planerat'}
                </span>
                <span className="subject-path">{subject.route}</span>
              </div>
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.tagline}</p>
              </div>
              <ul className="subject-meta">
                <li>{subject.levelFocus}</li>
                <li>{subject.coachStyle}</li>
                <li>{subject.launchNote}</li>
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="page" aria-labelledby="foundation-heading">
        <div className="section-heading">
          <div>
            <h2 id="foundation-heading">Gemensam pedagogisk grund</h2>
            <p>
              Varje ämne använder samma kärna så att barnen känner igen sig,
              även när innehållet skiftar mellan matte, geografi och historia.
            </p>
          </div>
        </div>

        <div className="foundation-grid">
          {learningFoundation.map((pillar) => (
            <article className="foundation-card" key={pillar.id}>
              <span>Pelarstruktur</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="page"
        id="portal-arkitektur"
        aria-labelledby="routing-heading"
      >
        <div className="section-heading">
          <div>
            <h2 id="routing-heading">2. Design och 3. Routingstruktur</h2>
            <p>
              Startsidan visar tydligt vad portalen är, vad som är live nu och
              hur varje route får sin plats under samma app och backend.
            </p>
          </div>
        </div>

        <div className="route-grid">
          {routeBlueprint.map((route) => (
            <article className="route-card" key={route.path}>
              <div className="route-topline">
                <span>Route</span>
                <span className="route-chip">Samma app</span>
              </div>
              <code>{route.path}</code>
              <h3>{route.title}</h3>
              <p>{route.purpose}</p>
              <ul className="route-list">
                {route.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="page" aria-labelledby="math-heading">
        <div className="section-heading">
          <div>
            <h2 id="math-heading">4. Matematik som första ämne</h2>
            <p>
              Matematik får visa helheten först: portaldesign, ämnesroute,
              coachning och rättning. När den rytmen sitter kan nästa ämne
              kopieras in i samma mall.
            </p>
          </div>
        </div>

        <div className="timeline-grid">
          {mathLaunchPlan.map((phase) => (
            <article className="timeline-card" key={phase.id}>
              <div className="timeline-topline">
                <span>{phase.step}</span>
                <span className={`step-chip step-${phase.status}`}>
                  {phase.status === 'live'
                    ? 'På plats'
                    : phase.status === 'soon'
                      ? 'Näst på tur'
                      : 'Senare'}
                </span>
              </div>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function SubjectPage() {
  const { subjectSlug } = useParams()
  const subject = getSubjectBySlug(subjectSlug)

  if (!subject) {
    return <NotFoundPage />
  }

  return (
    <main className="subject-page">
      <section className="panel hero-panel">
        <div className="subject-hero">
          <div className="subject-copy">
            <div className="eyebrow">{subject.name}</div>
            <h1>{subject.name} i plugg.pro</h1>
            <p>{subject.summary}</p>

            <div className="subject-tags" aria-label="Ämnesetiketter">
              <span className="subject-tag">{subject.levelFocus}</span>
              <span className="subject-tag">{subject.coachStyle}</span>
              <span className="subject-tag">
                {subject.status === 'live'
                  ? 'Första live-ämnet'
                  : subject.status === 'soon'
                    ? 'Förberedd route'
                    : 'Planerad route'}
              </span>
            </div>

            <div className="subject-actions">
              <Link className="button button-primary" to="/">
                Till startsidan
              </Link>
              {subject.slug !== 'matematik' ? (
                <Link className="button button-secondary" to="/matematik">
                  Se hur mallen ser ut i Matematik
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="subject-side">
            {subject.practiceModes.map((mode) => (
              <article className="mode-card" key={mode.title}>
                <strong>{mode.title}</strong>
                <p>{mode.description}</p>
              </article>
            ))}
            <article className="status-card">
              <strong>Ämnesstatus</strong>
              <p>{subject.launchNote}</p>
              <ul className="progress-list">
                {subject.skillTracks.map((track) => (
                  <li key={track}>{track}</li>
                ))}
              </ul>
            </article>
          </aside>
        </div>
      </section>

      <section className="subject-body">
        {subject.slug === 'matematik' ? (
          <MathPractice subject={subject} />
        ) : (
          <PlaceholderSubject subject={subject} />
        )}

        <aside className="overview-card">
          <h3>Återanvändbar ämnesmall</h3>
          <p>
            Den här sidan använder samma ämnesskal som resten av portalen. Vi
            byter i första hand innehållsdata, inte layout eller backendflöde.
          </p>
          <ul className="overview-list">
            {subject.lessonFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <strong>Varför det är viktigt</strong>
          <p>
            När barn känner igen strukturen blir det lättare att fokusera på
            ämnet i stället för att förstå gränssnittet på nytt.
          </p>
        </aside>
      </section>
    </main>
  )
}

function MathPractice({ subject }) {
  const [answer, setAnswer] = useState('')
  const [coachResponse, setCoachResponse] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [coachPending, setCoachPending] = useState(false)
  const [evaluatePending, setEvaluatePending] = useState(false)
  const [error, setError] = useState('')

  async function handleCoachRequest() {
    setCoachPending(true)
    setError('')

    try {
      const data = await requestCoachHint({
        subject: subject.slug,
        taskId: subject.starterTask.id,
        attempt: answer,
      })

      startTransition(() => {
        setCoachResponse(data.message)
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setCoachPending(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setEvaluatePending(true)
    setError('')

    try {
      const data = await requestEvaluation({
        subject: subject.slug,
        taskId: subject.starterTask.id,
        attempt: answer,
      })

      startTransition(() => {
        setFeedback(data)
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setEvaluatePending(false)
    }
  }

  return (
    <>
      <section className="practice-card">
        <h3>Startuppdrag i Matematik</h3>
        <p>
          Här ser vi första ämnesflödet i praktiken: en uppgift, en coachknapp
          och en rättning som visar nästa steg.
        </p>

        <div className="task-box">
          <strong>{subject.starterTask.label}</strong>
          <p>{subject.starterTask.question}</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="math-answer">Skriv ditt svar</label>
          <input
            className="text-input"
            id="math-answer"
            name="math-answer"
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Jag tror att talet är..."
            value={answer}
          />

          <div className="stacked-actions">
            <button
              className="button button-primary"
              disabled={evaluatePending}
              type="submit"
            >
              {evaluatePending ? 'Rättar...' : 'Rätta mitt svar'}
            </button>
            <button
              className="button button-secondary"
              disabled={coachPending}
              onClick={handleCoachRequest}
              type="button"
            >
              {coachPending ? 'Tänker...' : 'Be coachen om en ledtråd'}
            </button>
          </div>
        </form>

        <p className="helper-text">
          Den här demo-uppgiften visar flödet för framtida mattebanor.
        </p>
        {error ? <p className="helper-text error-text">{error}</p> : null}
      </section>

      <section className="coach-card">
        <h3>Coach och rättning</h3>
        <p>
          OpenAI används för att ge stöd i lugn ton. Om ingen API-nyckel finns
          körs en lokal fallback så att portalen ändå går att testa.
        </p>

        {coachResponse ? (
          <div className="response-box">
            <strong>Ledtråd</strong>
            <p>{coachResponse}</p>
          </div>
        ) : (
          <div className="empty-card">
            <strong>Ingen ledtråd ännu</strong>
            <p>
              Tryck på coachknappen om du vill se hur samma API-yta kan stötta
              barnet innan rättning.
            </p>
          </div>
        )}

        {feedback ? (
          <div className="response-box">
            <strong>
              {feedback.verdict === 'correct'
                ? 'Det stämmer'
                : feedback.verdict === 'almost'
                  ? 'Du är nära'
                  : 'Vi tar ett steg till'}
            </strong>
            <p>{feedback.feedback}</p>
            <p className="response-meta">
              Nästa steg: {feedback.nextStep}
            </p>
          </div>
        ) : null}
      </section>
    </>
  )
}

function PlaceholderSubject({ subject }) {
  return (
    <>
      <section className="placeholder-card">
        <h3>{subject.name} använder samma portalmall</h3>
        <p>
          Route, design och backend är redan förberedda. När vi öppnar ämnet
          fyller vi främst på ämnesdata, första uppdrag och ämnesspecifika
          prompts till coach och rättning.
        </p>
        <ul className="pillar-list">
          <li>Behåller samma lugna start och samma navigation</li>
          <li>Återanvänder samma komponenter och API-endpoints</li>
          <li>Byter bara ut uppdrag, språkstöd och bedömningskontext</li>
        </ul>
      </section>

      <section className="placeholder-card">
        <h3>Nästa steg för {subject.name}</h3>
        <p>
          När vi väljer detta ämne som nästa release kan vi lägga in första
          live-uppdraget utan att ändra portalens kärnstruktur.
        </p>
      </section>
    </>
  )
}

function NotFoundPage() {
  return (
    <main className="page">
      <section className="placeholder-card">
        <h3>Den sidan finns inte ännu</h3>
        <p>
          Portalen är uppsatt för ämnesroutes under samma app. Just nu är
          startsidan och första ämnessidorna förberedda.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/">
            Till startsidan
          </Link>
        </div>
      </section>
    </main>
  )
}

export default App
