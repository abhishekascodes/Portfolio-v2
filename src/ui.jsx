import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export const goTo = (id) => {
  const el = document.getElementById(id)
  if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -20 }) : el.scrollIntoView({ behavior: 'smooth' })
}

export function Cursor() {
  const ref = useRef()
  const [label, setLabel] = useState(''), [mode, setMode] = useState('')
  useEffect(() => {
    let x = -100, y = -100, cx = -100, cy = -100, raf
    const mv = (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target.closest('[data-cursor]'), a = e.target.closest('a,button,.hov')
      setLabel(t ? t.dataset.cursor : ''); setMode(t ? 'label' : a ? 'link' : '')
    }
    const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; if (ref.current) ref.current.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(loop) }
    addEventListener('pointermove', mv); raf = requestAnimationFrame(loop)
    return () => { removeEventListener('pointermove', mv); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="cursor" aria-hidden="true"><div className={'cur-in ' + mode}><span>{label}</span></div></div>
}

export function Progress() {
  const ref = useRef()
  useEffect(() => {
    const f = () => { if (ref.current) ref.current.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})` }
    addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  return <div className="progress" ref={ref} />
}

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef()
  const mv = (e) => { const r = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${(e.clientY - r.top - r.height / 2) * strength}px)` }
  return <span className="mag" ref={ref} onPointerMove={mv} onPointerLeave={() => { ref.current.style.transform = '' }}>{children}</span>
}

const items = [['work', 'Work'], ['disciplines', 'Disciplines'], ['workshop', 'Workshop'], ['record', 'Record'], ['context', 'Context'], ['contact', 'Contact']]
export function Header() {
  const [open, setOpen] = useState(false)
  const nav = useNavigate(), loc = useLocation()
  const go = (id) => {
    setOpen(false)
    if (loc.pathname !== '/') { nav('/'); setTimeout(() => goTo(id), 700) } else setTimeout(() => goTo(id), 350)
  }
  return (
    <>
      <header className="hdr">
        <button className="wordmark" onClick={() => { setOpen(false); nav('/'); window.__lenis && window.__lenis.scrollTo(0) }}><i />Abhishek A.S.</button>
        <button className="menubtn" onClick={() => setOpen(!open)} aria-expanded={open}><span>{open ? 'Close' : 'Menu'}</span><b className={open ? 'x' : ''}><u /><u /></b></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav className="menu" initial={{ clipPath: 'circle(0% at calc(100% - 70px) 40px)' }} animate={{ clipPath: 'circle(150% at calc(100% - 70px) 40px)' }} exit={{ clipPath: 'circle(0% at calc(100% - 70px) 40px)' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <ul>{items.map(([id, t], i) => (
              <motion.li key={id} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
                <button onClick={() => go(id)}><em className="mono">0{i + 1}</em>{t}</button>
              </motion.li>))}</ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export function Reveal({ children, delay = 0, className = '', y = 40 }) {
  return <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>
}

/* Letters that rise in and morph weight and width near the pointer */
export function Letters({ text, className = '', delay = 0 }) {
  const refs = useRef([])
  useEffect(() => {
    const mv = (e) => refs.current.forEach((el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const k = Math.max(0, 1 - Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) / 300)
      el.style.fontVariationSettings = `"wght" ${500 + k * 300}, "wdth" ${100 - k * 25}, "opsz" 96`
    })
    addEventListener('pointermove', mv); return () => removeEventListener('pointermove', mv)
  }, [])
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((c, i) => (
        <span className="ch" key={i} aria-hidden="true">
          <motion.span initial={{ y: '115%', rotate: 8 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: delay + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}>
            <span className="liv" ref={(el) => (refs.current[i] = el)}>{c}</span>
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Word({ w, i, n, p }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.14, 1])
  const accent = w.startsWith('*')
  return <motion.span style={{ opacity: o }} className={accent ? 'acc' : ''}>{accent ? w.replace(/\*/g, '') : w}{' '}</motion.span>
}
export function ScrollWords({ text }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')
  return <p className="swords" ref={ref}>{words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}</p>
}

/* Section title: each word rises out of a mask */
export function Title({ text }) {
  return (
    <h2 aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="tw" key={i} aria-hidden="true">
          <motion.span initial={{ y: '112%', rotate: 5 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.95, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}>{w}</motion.span>
        </span>
      ))}
    </h2>
  )
}

/* Tilted marquee band whose text is driven by scroll position */
export function Band({ words, dir = 1, rot = -2, bg = 'var(--lime)', fg = 'var(--ink)', outline = false }) {
  const { scrollY } = useScroll()
  const x = useTransform(scrollY, [0, 12000], dir > 0 ? [0, -4800] : [-4800, 0])
  const items = Array.from({ length: 14 }, () => words).flat()
  return (
    <div className="band" style={{ background: bg, color: fg, transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <motion.div className={'band-in' + (outline ? ' outline' : '')} style={{ x }}>
        {items.map((w, i) => <span key={i}>{w}<i style={{ background: fg }} /></span>)}
      </motion.div>
    </div>
  )
}
