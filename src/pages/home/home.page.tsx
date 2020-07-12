import { useViewportScroll } from 'framer-motion'
import { observer } from 'mobx-react'
import React from 'react'
import { PageWrapper, PrintsList } from '../../components'
import { PrintsSocketService } from '../../services'
import { printsStore } from '../../stores/prints.store'
import { CreatePrintBox } from './components'

export const HomePage: React.FC = observer(() => {
  const { scrollYProgress } = useViewportScroll()
  const { feed } = printsStore
  const [
    printsSService,
    setPrintsSService,
  ] = React.useState<PrintsSocketService | null>(null)

  React.useEffect(() => {
    if (!printsStore.feed.length) {
      printsStore.getFeed()
    }

    return scrollYProgress.onChange((yProgress) => {
      if (yProgress === 0) {
        printsStore.getFeed()
      }
    })
  }, [scrollYProgress])

  React.useEffect(() => {
    setPrintsSService(new PrintsSocketService())

    return () => {
      printsSService?.destruct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      <div className="d-flex flex-column align-items-center">
        <CreatePrintBox />
        <PrintsList prints={feed} />
      </div>
    </PageWrapper>
  )
})
