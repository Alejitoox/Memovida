import { MemoVidaProvider } from '@/lib/memovida-context'
import { MemoVidaApp } from '@/components/memovida/memovida-app'

export default function Page() {
  return (
    <MemoVidaProvider>
      <MemoVidaApp />
    </MemoVidaProvider>
  )
}
