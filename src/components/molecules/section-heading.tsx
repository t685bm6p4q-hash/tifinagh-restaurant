import { Eyebrow } from '../atoms/eyebrow'

type SectionHeadingProps = { eyebrow: string; title: string; text?: string }

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return <div className="section-heading"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text ? <p>{text}</p> : null}</div>
}
