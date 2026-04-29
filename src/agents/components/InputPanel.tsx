import type { ReactNode } from 'react'
import styles from '../agents.module.css'

interface FieldProps {
  label: string
  tip?: string
  children: ReactNode
}

export function Field({ label, tip, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} data-tip={tip}>
        {label}
      </label>
      {children}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

export function Select({ options, ...props }: SelectProps) {
  return (
    <select className="ei" {...props}>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number
}

export function TextArea({ rows = 6, ...props }: TextAreaProps) {
  return <textarea className="ei" rows={rows} {...props} />
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ei" type="text" {...props} />
}
