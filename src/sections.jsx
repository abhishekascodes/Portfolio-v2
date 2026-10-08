import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, disciplines, method, workshop, record, notes, github } from './data'
import Motif from './Motif'
import ParticleText from './ParticleText'
import { Reveal, ScrollWords, Magnetic, goTo, Title } from './ui'

export const palette = [
  ['#cbc2ff', '#0d0d12'], ['#d3ff45', '#0d0d12'], ['#ffb89a', '#0d0d12'], ['#b4dbff', '#0d0d12'], ['#ffe27a', '#0d0d12'],
  ['#2f3bff', '#ffffff'], ['#b8f0d0', '#0d0d12'], ['#ffc2e0', '#0d0d12'], ['#f6f3ea', '#0d0d12'], ['#cbc2ff', '#0d0d12'],
]
const order = ['polaris', 'sentinel', 'andromeda', 'nebula', 'zenith', 'gargantua', 'indra', 'chimera', 'neural-compiler', 'untitledos']
export const list = order.map((id) => projects.find((p) => p.id === id))
export const colorOf = (id) => palette[order.indexOf(id)] || palette[0]

const INK = '#0d0d12', COBALT = '#2f3bff'
const pills = [['AI', '#d3ff45', -6], ['Mathematics', '#cbc2ff', 4], ['Systems', '#ffb89a', -3], ['Hardware', '#b4dbff', 7], ['Autonomy', '#ffe27a', -5]]

export function Hero() {
  const co = useRef()
  useEffect(() => {
    const mv = (e) => { if (co.current) co.current.textContent = `x ${String(e.clientX).padStart(4, '0')}  y ${String(e.clientY).padStart(4, '0')}` }
    addEventListener('pointermove', mv); return () => removeEventListener('pointermove', mv)
  }, [])
  return (
    <section className="hero">
      <div className="hero-top mono"><span>Independent builder</span><span>Researcher</span><span className="coords hide-sm" ref={co}>x 0000  y 0000</span></div>
      <h1 className="sr">Abhishek A.S.</h1>
      <div className="pt-hero">
        <ParticleText gap={5} lines={[
          { t: 'ABHISHEK', palette: [INK, '#2f3bff', '#7b5cff', '#ff5a36'] },
          { t: 'A.S.', palette: ['#2f3bff', '#7b5cff', '#ff5a36', '#ff5a36'] },
        ]} />
        <div className="hero-right">
          <div className="rollbox"><span className="mono">currently building</span>
            <span className="rolly"><span className="roll">
              <b>autonomous agents</b><b>safe AI systems</b><b>distributed databases</b><b>operating systems</b><b>circuits from scrap</b><b>autonomous agents</b>
            </span></span></div>
          <div className="pillbox">
            {pills.map(([t, c, r], i) => (
              <motion.span key={t} className="sticker hov" style={{ background: c, rotate: r }} drag dragElastic={0.3} dragMomentum whileDrag={{ scale: 1.15, zIndex: 20 }} whileHover={{ scale: 1.08 }}
                initial={{ opacity: 0, y: -80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.12, type: 'spring', stiffness: 160, damping: 11 }}>{t}</motion.span>
            ))}
          </div>
          <svg viewBox="0 0 200 200" className="badge" aria-hidden="true">
            <defs><path id="bp" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
            <circle cx="100" cy="100" r="98" fill="#d3ff45" stroke={INK} strokeWidth="2" />
            <g className="spinb"><text fontFamily="JetBrains Mono" fontSize="13" letterSpacing="1" fill={INK}><textPath href="#bp" textLength="440" lengthAdjust="spacing">INDEPENDENT BUILDER + AI + SYSTEMS + HARDWARE + </textPath></text></g>
            <path d="M100 66 L108 92 L134 100 L108 108 L100 134 L92 108 L66 100 L92 92Z" fill={INK} />
          </svg>
        </div>
      </div>
      <motion.div className="hero-bot" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }}>
        <p className="lede">I build AI systems, and the mathematics, software and hardware underneath them. Move your cursor through my name.</p>
        <div className="cta">
          <Magnetic><button className="btn solid" onClick={() => goTo('work')}>See the work</button></Magnetic>
          <Magnetic><a className="btn" href={github} target="_blank" rel="noopener noreferrer">GitHub</a></Magnetic>
        </div>
      </motion.div>
    </section>
  )
}

export function Statement() {
  return (
    <section className="statement">
      <p className="mono kicker">About</p>
      <ScrollWords text="I like understanding how things work from the ground up, then building them. That means *AI systems* and the *mathematics* behind them, but also *operating systems*, *circuits* and a lot of *scrap hardware* that deserves a second life. I find patterns in everything." />
    </section>
  )
}

/* Project index: giant typographic rows, a floating preview that chases the cursor */
export function Work() {
  const nav = useNavigate()
  const [hov, setHov] = useState(null)
  const peek = useRef(), sec = useRef()
  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0, rot = 0, raf
    const mv = (e) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      const vx = x - cx
      cx += vx * 0.13; cy += (y - cy) * 0.13; rot += (Math.max(-14, Math.min(14, vx * 0.35)) - rot) * 0.12
      if (peek.current) peek.current.style.transform = `translate(${cx + 36}px,${cy - 190}px) rotate(${rot}deg)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', mv); raf = requestAnimationFrame(loop)
    return () => { removeEventListener('pointermove', mv); cancelAnimationFrame(raf) }
  }, [])
  const cur = list.find((p) => p.id === hov)
  const [pbg, pfg] = cur ? colorOf(cur.id) : ['#fff', '#000']
  return (
    <section id="work" className="work" ref={sec}>
      <div className="sec-t"><p className="mono kicker">Work &middot; {list.length} projects</p><Title text="Things I have built and am building" /></div>
      <ul className={'index' + (hov ? ' has' : '')} onMouseLeave={() => setHov(null)}>
        {list.map((p, i) => {
          const [bg, fg] = colorOf(p.id)
          return (
            <li key={p.id} className={hov === p.id ? 'act' : ''} style={{ '--bg': bg, '--fg': fg }} onMouseEnter={() => setHov(p.id)} onClick={() => nav(`/project/${p.id}`)} data-cursor="">
              <Reveal y={30} className="row">
                <span className="num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.name}</h3>
                <div className="meta"><p>{p.role}</p><div className="tags"><span className="pill">{p.status}</span></div></div>
                <span className="go" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 19L19 5M8 5h11v11" /></svg></span>
              </Reveal>
            </li>
          )
        })}
      </ul>
      <div ref={peek} className={'peek' + (cur ? ' on' : '')} style={{ background: pbg, color: pfg }} aria-hidden="true">
        {cur && (<><Motif id={cur.id} /><div className="peek-l"><b>{cur.name}</b><span className="mono">{cur.status}</span></div></>)}
      </div>
    </section>
  )
}

export function Disciplines() {
  const [a, setA] = useState(0)
  return (
    <section id="disciplines" className="disc">
      <div className="sec-t"><p className="mono kicker">Disciplines</p><Title text="Where the work lives" /></div>
      <ul className="acc">
        {disciplines.map(([t, items], i) => (
          <li key={t} className={a === i ? 'on' : ''} onMouseEnter={() => setA(i)} onClick={() => setA(i)}>
            <div className="acc-h"><span className="mono">0{i + 1}</span><h3>{t}</h3><i className="plus" /></div>
            <AnimatePresence initial={false}>
              {a === i && (
                <motion.div className="acc-b" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
                  <div className="chips">{items.map((x) => <span key={x}>{x}</span>)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <div className="method">
        <p className="mono kicker">How I work</p>
        <ol>{method.map(([t, d], i) => <Reveal key={t} delay={i * 0.04}><li><span className="mono">0{i + 1}</span><b>{t}</b><small>{d}</small></li></Reveal>)}</ol>
      </div>
    </section>
  )
}

function Tile({ w, i }) {
  const ref = useRef()
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`
  }
  const [bg] = palette[(i * 3 + 1) % palette.length]
  return (
    <Reveal className={'tile t' + i} delay={(i % 3) * 0.08}>
      <div ref={ref} className="tile-in" style={{ background: bg }} onPointerMove={mv} onPointerLeave={() => { ref.current.style.transform = '' }}>
        <span className="mono">{w.tag}</span><h3>{w.title}</h3><p>{w.text}</p>
      </div>
    </Reveal>
  )
}
export function Workshop() {
  return (
    <section id="workshop" className="shop">
      <div className="sec-t"><p className="mono kicker">Workshop</p><Title text="Where theory meets solder" /></div>
      <div className="bento">{workshop.map((w, i) => <Tile key={w.title} w={w} i={i} />)}</div>
    </section>
  )
}

export function Record() {
  const tints = ['#cbc2ff', '#d3ff45', '#ffb89a']
  return (
    <section id="record" className="rec">
      <div className="sec-t"><p className="mono kicker">Record</p><Title text="Where the work has been seen" /></div>
      <div className="rec-grid">
        {Object.entries(record).map(([h, rows], k) => (
          <Reveal key={h} delay={k * 0.1} className="rp-wrap">
            <div className="rec-panel" style={{ background: tints[k] }}>
              <div className="rp-top"><span className="mono">0{k + 1}</span><h3>{h}</h3></div>
              <ul>{rows.map(([a, b]) => (
                <li key={a} className="hov"><svg className="rp-star" viewBox="0 0 24 24"><path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" /></svg><div><b>{a}</b><span>{b}</span></div></li>
              ))}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
export function Context() {
  return (
    <section id="context" className="ctx">
      <div className="sec-t"><p className="mono kicker">Context</p><Title text="What the work is, and is not yet" /></div>
      <div className="ctx-grid">{notes.map(([t, d], i) => <Reveal key={t} delay={i * 0.07}><div className="ctx-c"><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div>
    </section>
  )
}

const words = ['Agents', 'Systems', 'Mathematics', 'Hardware', 'Autonomy', 'Operating systems', 'Circuits']
export function Contact() {
  return (
    <section id="contact" className="finale">
      <div className="fin-panel">
        <p className="mono fin-k">Contact &middot; open to collaboration</p>
        <ParticleText label="Say hello" fit={0.96} gap={6} align="left" lineGap={0.9} lines={[
          { t: 'SAY', palette: ['#d3ff45', '#d3ff45', '#d3ff45', '#ffffff'] },
          { t: 'HELLO.', palette: ['#ffffff', '#ffffff', '#ffffff', '#d3ff45'] },
        ]} />
        <div className="fin-row">
          <p className="fin-lede">Research collaboration, open source, technical internships and ambitious projects. If something here made you curious, the best place to start is GitHub.</p>
          <div className="fin-btns">
            <Magnetic strength={0.5}><a className="blob" href={github} target="_blank" rel="noopener noreferrer">GitHub</a></Magnetic>
            <Magnetic strength={0.5}><button className="blob ghost" onClick={() => window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo(0, 0)}>Back to top</button></Magnetic>
          </div>
        </div>
        <div className="fin-marq" aria-hidden="true"><div>{[...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w}<i /></span>)}</div></div>
      </div>
    </section>
  )
}
