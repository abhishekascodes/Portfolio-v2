import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation, useParams, Navigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Fluid from './Fluid'
import Motif from './Motif'
import { Cursor, Progress, Header, Reveal, Letters, Band } from './ui'
import { Hero, Statement, Work, Disciplines, Workshop, Record, Context, Contact, list, colorOf } from './sections'
import './styles.css'

function Home() {
  return (<><Hero /><Statement /><Work /><Band words={['Agents','Mathematics','Systems','Hardware','Autonomy']} rot={-2} /><Disciplines /><Workshop /><Band words={['Build','Measure','Break','Repeat']} dir={-1} rot={1.6} bg="var(--cobalt)" fg="#fff" /><Record /><Context /><Contact /></>)
}

function Project() {
  const { id } = useParams()
  const p = list.find((x) => x.id === id)
  if (!p) return <Navigate to="/" replace />
  const [bg, fg] = colorOf(id)
  const idx = list.indexOf(p), next = list[(idx + 1) % list.length], [nbg, nfg] = colorOf(next.id)
  const secs = [['Problem', p.problem], ['Architecture', p.architecture], ['Evidence', p.evidence]].filter((s) => s[1])
  return (
    <div className="proj-page">
      <section className="ph" style={{ background: bg, color: fg }}>
        <Link to="/" className="mono back">Back to home</Link>
        <div className="ph-grid">
          <div>
            <span className="pill">{p.status}</span>
            <h1><Letters text={p.name} /></h1>
            <p className="ph-role">{p.role}</p>
          </div>
          <div className="ph-art"><Motif id={p.id} /></div>
        </div>
      </section>
      <section className="pb">
        <div className="pb-main">
          <Reveal><p className="pb-lede">{p.summary}</p></Reveal>
          {secs.map(([t, d]) => <Reveal key={t}><div className="blk"><h3 className="mono">{t}</h3><p>{d}</p></div></Reveal>)}
          {p.caveat && <Reveal><div className="note"><b className="mono">Context</b><p>{p.caveat}</p></div></Reveal>}
        </div>
        <aside className="pb-side"><Reveal>
          <h3 className="mono">Key points</h3>
          <ul>{p.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
        </Reveal></aside>
      </section>
      <Link to={`/project/${next.id}`} className="nextp" style={{ background: nbg, color: nfg }} data-cursor="Next">
        <span className="mono">Next project</span><h2>{next.name}</h2>
      </Link>
    </div>
  )
}

function App() {
  const loc = useLocation()
  useEffect(() => {
    const l = new Lenis({ lerp: 0.09 }); window.__lenis = l
    let raf; const f = (t) => { l.raf(t); raf = requestAnimationFrame(f) }
    raf = requestAnimationFrame(f)
    return () => { cancelAnimationFrame(raf); l.destroy(); window.__lenis = null }
  }, [])
  useEffect(() => { if (loc.pathname !== '/') { window.scrollTo(0, 0); window.__lenis && window.__lenis.scrollTo(0, { immediate: true }) } }, [loc.pathname])
  return (
    <>
      <Fluid /><div className="grain" />
      <Cursor /><Progress /><Header />
      <motion.div key={'w' + loc.pathname} className="wipe" initial={{ y: '0%' }} animate={{ y: '-101%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} />
      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <Routes location={loc}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  )
}

createRoot(document.getElementById('root')).render(<HashRouter><App /></HashRouter>)
