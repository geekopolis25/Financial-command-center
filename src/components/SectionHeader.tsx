interface Props {
  num: string
  title: string
  sub?: string
}

export default function SectionHeader({ num, title, sub }: Props) {
  return (
    <div className="sec-hdr">
      <span className="sec-num">{num}</span>
      <span className="sec-title">{title}</span>
      {sub && <span className="sec-sub">{sub}</span>}
    </div>
  )
}
