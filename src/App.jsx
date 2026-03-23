import './App.css'
import { portalApps, portalGuide, portalPlan } from './data/portalApps'

function App() {
  return (
    <div className="portal-shell">
      <header className="portal-header">
        <a className="portal-brand" href="/">
          <span className="portal-mark">pp</span>
          <span className="portal-copy">
            <strong>plugg.pro</strong>
            <span>En enkel startsida för läxhjälpsappar</span>
          </span>
        </a>
        <span className="portal-note">Länka appar här allt eftersom de blir klara</span>
      </header>

      <main className="portal-main">
        <section className="hero-card">
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">Enklare start</div>
              <h1>En lugn startsida som samlar alla pluggappar på ett ställe.</h1>
              <p>
                Portalen är nu medvetet enkel. Den ska främst hjälpa barn att
                hitta rätt app snabbt, utan brus och utan att behöva förstå en
                större plattform först.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#appar">
                  Se appar
                </a>
                <a className="button button-secondary" href="#nasta-steg">
                  Se nästa steg
                </a>
              </div>
            </div>

            <aside className="hero-panel">
              <strong>Vad startsidan ska göra nu</strong>
              <p>
                Vara en tydlig hemadress för plugg.pro och en enkel meny till
                de appar som finns eller är på väg in.
              </p>

              <div className="hero-metrics">
                <div className="hero-metric">
                  <span className="hero-metric-label">Roll</span>
                  <span className="hero-metric-value">Portalstart</span>
                </div>
                <div className="hero-metric">
                  <span className="hero-metric-label">Fokus</span>
                  <span className="hero-metric-value">Länkar till appar</span>
                </div>
                <div className="hero-metric">
                  <span className="hero-metric-label">Känsla</span>
                  <span className="hero-metric-value">Lugn och mobilvänlig</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="apps-card" id="appar">
          <div className="section-copy">
            <h2>Appar i portalen</h2>
            <p>
              Här samlar vi ämnesapparna som egna destinationer. När en app är
              redo lägger vi bara in dess länk här.
            </p>
          </div>

          <div className="apps-grid">
            {portalApps.map((appItem) => (
              <article className="app-card" key={appItem.name}>
                <div className="app-topline">
                  <span className={`status-pill status-${appItem.status}`}>
                    {appItem.statusLabel}
                  </span>
                  <span className="route-pill">{appItem.pathLabel}</span>
                </div>

                <div>
                  <h3>{appItem.name}</h3>
                  <p>{appItem.description}</p>
                </div>

                <ul className="simple-list">
                  {appItem.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="app-meta">
                  {appItem.href ? (
                    <a
                      className="button button-primary app-link"
                      href={appItem.href}
                    >
                      Öppna app
                    </a>
                  ) : (
                    <span className="button button-secondary app-link is-disabled">
                      Länk kommer snart
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="guide-card">
          <div className="section-copy">
            <h2>Hur sidan ska kännas</h2>
            <p>
              Enkel nog för att förstå direkt, men med tillräcklig identitet för
              att kännas som en trygg plats att börja från.
            </p>
          </div>

          <div className="guide-grid">
            {portalGuide.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="plan-card" id="nasta-steg">
          <div className="section-copy">
            <h2>Nästa steg</h2>
            <p>
              Vi håller detta lätt nu. När första ämnesappen är klar länkar vi
              in den utan att behöva bygga om startsidan.
            </p>
          </div>

          <div className="plan-grid">
            {portalPlan.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="portal-footer">
        plugg.pro är just nu en enkel portalstart där vi samlar länkar till
        olika läxhjälpsappar.
      </footer>
    </div>
  )
}

export default App
