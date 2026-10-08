import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vert = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`
const frag = `
precision highp float;
uniform float uTime,uScroll;uniform vec2 uRes,uMouse;varying vec2 vUv;
float hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
void main(){
 float asp=uRes.x/uRes.y;
 vec2 p=vUv*vec2(asp,1.)*1.5;p.y+=uScroll;
 vec2 m=uMouse*vec2(asp,1.)*1.5;m.y+=uScroll;
 float d=distance(p,m);
 vec2 q=vec2(fbm(p+uTime*.05),fbm(p+vec2(5.2,1.3)-uTime*.04));
 vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)+uTime*.06),fbm(p+3.*q+vec2(8.3,2.8)));
 r+=(p-m)*exp(-d*3.)*.4;
 float f=fbm(p+3.*r);
 vec3 bg=vec3(.953,.949,.933);
 vec3 lilac=vec3(.79,.76,1.),peach=vec3(1.,.72,.6),lime=vec3(.81,1.,.24),sky=vec3(.68,.85,1.);
 vec3 c=mix(bg,lilac,smoothstep(.3,.7,q.x)*.85);
 c=mix(c,peach,smoothstep(.4,.8,r.x)*.65);
 c=mix(c,sky,smoothstep(.45,.85,f)*.55);
 c=mix(c,lime,smoothstep(.7,.95,f*r.y*1.7)*.5);
 gl_FragColor=vec4(mix(c,bg,.3),1.);
}`

function Plane() {
  const mat = useRef(), cur = useRef(new THREE.Vector2(.5, .5)), tgt = useRef(new THREE.Vector2(.5, .5))
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uScroll: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2(.5, .5) } }), [])
  useEffect(() => {
    const mv = (e) => tgt.current.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight)
    addEventListener('pointermove', mv); return () => removeEventListener('pointermove', mv)
  }, [])
  useFrame((s) => {
    const u = mat.current.uniforms
    u.uTime.value = s.clock.elapsedTime
    u.uScroll.value = (window.scrollY / innerHeight) * 0.18
    cur.current.lerp(tgt.current, 0.06); u.uMouse.value.copy(cur.current)
    u.uRes.value.set(s.size.width, s.size.height)
  })
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} depthTest={false} />
    </mesh>
  )
}

export default function Fluid() {
  return <div className="fluid" aria-hidden="true"><Canvas dpr={[1, 1.5]} gl={{ antialias: false }}><Plane /></Canvas></div>
}
