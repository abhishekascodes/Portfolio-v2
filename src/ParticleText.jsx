import React, { useEffect, useRef } from 'react'

const FONT = '"Bricolage Grotesque", system-ui, sans-serif'

/**
 * Text made of thousands of springy dots. Dots flee the pointer, burst on click,
 * and fly in from random positions on first paint.
 * lines: [{ t: 'TEXT', palette: ['#hex', ...] }]  (palette entries are picked at random, repeat a colour to weight it)
 */
export default function ParticleText({ lines, fit = 0.98, gap = 6, weight = 800, lineGap = 0.92, align = 'left', pad: padProp, label }) {
  const wrap = useRef(), cv = useRef()
  useEffect(() => {
    let raf, parts = [], boxes = [], dead = false, W = 0, H = 0, dpr = 1, R = 120, timer
    const mouse = { x: -9999, y: -9999 }
    const ctx = cv.current.getContext('2d')

    const build = async () => {
      try { await document.fonts.load(`${weight} 100px ${FONT}`); await document.fonts.ready } catch (e) {}
      if (dead) return
      W = wrap.current.clientWidth; dpr = Math.min(devicePixelRatio || 1, 2)
      const probe = document.createElement('canvas').getContext('2d')
      probe.font = `${weight} 100px ${FONT}`
      const sc = (l) => l.scale || 1
      const maxW = Math.max(...lines.map((l) => probe.measureText(l.t).width * sc(l)))
      const fs = (100 * W * fit) / maxW, lh = fs * lineGap
      const rows = Math.max(...lines.map((l, i) => (l.row ?? i))) + 1
      H = Math.ceil(lh * rows + fs * 0.2)
      cv.current.width = W * dpr; cv.current.height = H * dpr
      cv.current.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.max(80, fs * 0.45)

      const off = document.createElement('canvas'); off.width = W; off.height = H
      const o = off.getContext('2d'); o.fillStyle = '#000'; o.textBaseline = 'alphabetic'
      const edge = padProp ?? W * (1 - fit) / 2
      boxes = []
      lines.forEach((l, i) => {
        const row = l.row ?? i, size = fs * sc(l)
        o.font = `${weight} ${size}px ${FONT}`
        const w = o.measureText(l.t).width, al = l.align || align
        const x = al === 'center' ? (W - w) / 2 : al === 'right' ? W - w - edge : edge
        const base = lh * row + fs * 0.78
        o.fillText(l.t, x, base)
        boxes.push({ x0: x - 4, x1: x + w + 4, y0: base - size * 0.85, y1: base + size * 0.15 })
      })
      const g = Math.max(8, Math.round(gap * Math.min(1, W / 1100) + 4))
      const data = o.getImageData(0, 0, W, H).data
      parts = []
      for (let y = 0; y < H; y += g) for (let x = 0; x < W; x += g) {
        if (data[((y | 0) * W + (x | 0)) * 4 + 3] > 140) {
          let li = boxes.findIndex((b) => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1); if (li < 0) li = 0
          const pal = lines[li].palette
          const k = Math.min(pal.length - 1, Math.max(0, Math.floor((x / W + (Math.random() - 0.5) * 0.22) * pal.length)))
          parts.push({ hx: x, hy: y, x: Math.random() * W, y: Math.random() * H * 1.4 - H * 0.2, vx: 0, vy: 0, c: pal[k], r: g * 0.47, ph: Math.random() * 6.28 })
        }
      }
    }

    const mv = (e) => { const r = cv.current.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const lv = () => { mouse.x = mouse.y = -9999 }
    const dn = (e) => {
      const r = cv.current.getBoundingClientRect(), cx = e.clientX - r.left, cy = e.clientY - r.top
      parts.forEach((p) => { const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1; if (d < R * 3) { const f = (1 - d / (R * 3)) * 38; p.vx += (dx / d) * f; p.vy += (dy / d) * f } })
    }
    addEventListener('pointermove', mv); document.addEventListener('pointerleave', lv); cv.current.addEventListener('pointerdown', dn)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const rect = cv.current.getBoundingClientRect()
      if (rect.bottom < -50 || rect.top > innerHeight + 50) return
      ctx.clearRect(0, 0, W, H)
      const groups = {}
      const t = performance.now() / 1000
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy
        if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 3.6; p.vx += (dx / d) * f - (dy / d) * f * 0.7; p.vy += (dy / d) * f + (dx / d) * f * 0.7 }
        const tx = p.hx + Math.sin(t * 1.3 + p.hy * 0.03) * 2.4, ty = p.hy + Math.cos(t * 1.1 + p.hx * 0.03) * 2.4
        p.vx += (tx - p.x) * 0.055; p.vy += (ty - p.y) * 0.055
        p.vx *= 0.85; p.vy *= 0.85; p.x += p.vx; p.y += p.vy
        const sp = Math.min(1.8, Math.hypot(p.vx, p.vy) * 0.12)
        p.cr = p.r * (0.38 + 0.62 * (0.5 + 0.5 * Math.sin(t * 2 + (p.hx + p.hy) * 0.014 + p.ph * 0.3)) + sp * 0.4)
        ;(groups[p.c] = groups[p.c] || []).push(p)
      }
      for (const c in groups) {
        ctx.fillStyle = c; ctx.beginPath()
        groups[c].forEach((p) => { ctx.moveTo(p.x + p.cr, p.y); ctx.arc(p.x, p.y, p.cr, 0, 6.2832) })
        ctx.fill()
      }
    }
    build().then(() => { if (!dead) loop() })
    const ro = () => { clearTimeout(timer); timer = setTimeout(build, 250) }
    addEventListener('resize', ro)
    return () => { dead = true; cancelAnimationFrame(raf); removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv); removeEventListener('resize', ro); clearTimeout(timer) }
  }, [])
  return <div ref={wrap} className="pt" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}><canvas ref={cv} /></div>
}
