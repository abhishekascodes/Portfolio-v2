import React, { useMemo } from 'react'

const INK = '#0d0d12'
function rng(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647) }

/* One animated geometric emblem per project */
export default function Motif({ id }) {
  const common = { viewBox: '0 0 400 400', className: 'motif', fill: 'none', stroke: INK, strokeWidth: 2, strokeLinecap: 'round', 'aria-hidden': true }
  const r = useMemo(() => rng(id.length * 977 + id.charCodeAt(0)), [id])

  if (id === 'polaris') return (
    <svg {...common}>
      {[60, 100, 140, 180].map((x) => <circle key={x} cx="200" cy="200" r={x} strokeOpacity=".35" />)}
      <g className="spin"><path d="M200 120 L212 188 L280 200 L212 212 L200 280 L188 212 L120 200 L188 188Z" fill={INK} /></g>
      <g className="spin rev"><circle cx="200" cy="60" r="9" fill="#fff" /></g>
      <g className="spin s2"><circle cx="340" cy="200" r="7" fill="#fff" /></g>
    </svg>)

  if (id === 'sentinel') return (
    <svg {...common}>
      {[50, 100, 150, 190].map((x) => <circle key={x} cx="200" cy="200" r={x} strokeOpacity=".4" />)}
      <path d="M10 200H390M200 10V390" strokeOpacity=".3" />
      <g className="spin"><path d="M200 200 L200 10 A190 190 0 0 1 335 65Z" fill={INK} fillOpacity=".18" stroke="none" /></g>
      {[[260, 120], [130, 250], [290, 270], [170, 130]].map(([x, y], i) => <circle key={i} className="blip" style={{ animationDelay: i * 0.7 + 's' }} cx={x} cy={y} r="8" fill="#fff" />)}
    </svg>)

  if (id === 'andromeda') return (
    <svg {...common}>
      {[[70, 80], [70, 200], [70, 320]].map(([x, y], i) => <path key={i} d={`M${x} ${y} C 180 ${y}, 200 200, 300 200`} className="flow" style={{ animationDelay: i * 0.4 + 's' }} strokeDasharray="6 10" />)}
      {[[70, 80], [70, 200], [70, 320]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="16" fill="#fff" />)}
      <rect x="290" y="170" width="60" height="60" rx="16" fill={INK} />
      <path d="M350 200H385" />
    </svg>)

  if (id === 'nebula') return (
    <svg {...common} stroke="none">
      {Array.from({ length: 70 }).map((_, i) => { const a = r() * 6.283, d = Math.pow(r(), 0.6) * 170; return <circle key={i} className="drift" style={{ animationDelay: -r() * 6 + 's' }} cx={200 + Math.cos(a) * d} cy={200 + Math.sin(a) * d * 0.8} r={2 + r() * 8} fill={i % 5 === 0 ? '#fff' : INK} fillOpacity={0.25 + r() * 0.6} /> })}
    </svg>)

  if (id === 'zenith') {
    let d = ''
    for (let i = 0; i < 240; i++) { const t = i / 10, rad = 6 + t * 7; d += (i ? 'L' : 'M') + (200 + Math.cos(t) * rad).toFixed(1) + ' ' + (200 + Math.sin(t) * rad).toFixed(1) }
    return (<svg {...common}><path d={d} className="draw" /><circle cx="200" cy="200" r="12" fill={INK} /><circle cx="200" cy="200" r="30" strokeOpacity=".3" /></svg>)
  }

  if (id === 'gargantua') return (
    <svg {...common}>
      <circle cx="200" cy="200" r="38" fill={INK} />
      {[70, 110, 150, 185].map((x, i) => <g key={x} className={'spin s' + (i + 1)} style={{ animationDirection: i % 2 ? 'reverse' : 'normal' }}><circle cx="200" cy="200" r={x} strokeOpacity=".35" /><circle cx={200 + x} cy="200" r="10" fill="#fff" /></g>)}
    </svg>)

  if (id === 'indra') return (
    <svg {...common}>
      <path d="M50 200H350" strokeOpacity=".3" />
      <path d="M50 200H350" className="flow" strokeDasharray="10 14" strokeWidth="4" />
      {[50, 130, 210, 290, 350].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 150 : 250} r="22" fill={i === 4 ? INK : '#fff'} />)}
      {[50, 130, 210, 290, 350].map((x, i) => <path key={'l' + x} d={`M${x} ${i % 2 ? 150 : 250}V200`} strokeOpacity=".4" />)}
    </svg>)

  if (id === 'chimera') return (
    <svg {...common}>
      <path d="M200 360V240M200 240C200 190 120 190 120 140M200 240C200 190 280 190 280 140M120 140C120 100 80 100 80 60M120 140C120 100 160 100 160 60M280 140C280 100 240 100 240 60M280 140C280 100 320 100 320 60" className="draw" />
      {[[80, 60], [160, 60], [240, 60], [320, 60], [120, 140], [280, 140], [200, 240]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i < 4 ? 14 : 10} fill={i < 4 ? '#fff' : INK} />)}
    </svg>)

  if (id === 'neural-compiler') return (
    <svg {...common} stroke="none">
      {Array.from({ length: 36 }).map((_, i) => { const x = i % 6, y = (i / 6) | 0; return <rect key={i} className="pulse" style={{ animationDelay: -((x + y) * 0.25) + 's' }} x={40 + x * 54} y={40 + y * 54} width="40" height="40" rx="8" fill={(x + y) % 3 === 0 ? INK : '#fff'} /> })}
    </svg>)

  return (
    <svg {...common}>
      <rect x="50" y="70" width="300" height="260" rx="22" fill="#fff" fillOpacity=".7" />
      <path d="M50 110H350" />
      {[[80, 150, 150], [80, 185, 220], [80, 220, 120], [80, 255, 190]].map(([x, y, w], i) => <path key={i} d={`M${x} ${y}H${x + w}`} className="draw" style={{ animationDelay: i * 0.3 + 's' }} strokeWidth="5" />)}
      <rect className="blink" x="80" y="285" width="18" height="26" fill={INK} stroke="none" />
    </svg>
  )
}
