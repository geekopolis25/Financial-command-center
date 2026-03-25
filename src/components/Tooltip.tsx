import { useEffect, useRef } from 'react'

export default function Tooltip() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const show = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-tip]') as HTMLElement | null
      if (target) {
        el.textContent = target.dataset.tip!
        el.classList.add('show')
        el.style.left = `${Math.min(e.clientX + 12, window.innerWidth - 240)}px`
        el.style.top = `${e.clientY - 30}px`
      } else {
        el.classList.remove('show')
      }
    }
    document.addEventListener('mousemove', show)
    return () => document.removeEventListener('mousemove', show)
  }, [])

  return <div id="tt" ref={ref} />
}
