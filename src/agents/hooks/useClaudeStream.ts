import { useState, useCallback, useRef } from 'react'
import Anthropic from '@anthropic-ai/sdk'

interface UseClaudeStreamReturn {
  output: string
  isLoading: boolean
  error: string | null
  run: (system: string, userContent: string) => Promise<void>
  reset: () => void
}

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY ?? '',
  dangerouslyAllowBrowser: true,
})

export function useClaudeStream(): UseClaudeStreamReturn {
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef(false)

  const run = useCallback(async (system: string, userContent: string) => {
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      setError('Missing VITE_ANTHROPIC_API_KEY in .env.local')
      return
    }
    abortRef.current = false
    setOutput('')
    setError(null)
    setIsLoading(true)

    try {
      const stream = client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system,
        messages: [{ role: 'user', content: userContent }],
      })

      for await (const event of stream) {
        if (abortRef.current) break
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          const text = (event.delta as { type: 'text_delta'; text: string }).text
          setOutput(prev => prev + text)
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current = true
    setOutput('')
    setError(null)
    setIsLoading(false)
  }, [])

  return { output, isLoading, error, run, reset }
}
