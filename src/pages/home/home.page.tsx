import { useViewportScroll } from 'framer-motion'
import { observer } from 'mobx-react'
import React from 'react'
import { PageWrapper, PrintsList } from '../../components'
import { printsStore } from '../../stores/prints.store'
import { CreatePrintBox } from './components'

export const HomePage: React.FC = observer(() => {
  const { scrollYProgress } = useViewportScroll()
  const { feed } = printsStore

  React.useEffect(() => {
    if (!printsStore.feed.length) {
      printsStore.listPrints()
    }

    return scrollYProgress.onChange((yProgress) => {
      if (yProgress === 0) {
        printsStore.listPrints()
      }
    })
  }, [scrollYProgress])

  // React.useEffect(() => {
  //   if (scrollYProgress.) {
  //     printsStore.listPrints()
  //   }
  // }, [scrollYProgress])

  return (
    <PageWrapper>
      <div className="d-flex flex-column align-items-center">
        <CreatePrintBox />
        <PrintsList prints={feed} />
      </div>
    </PageWrapper>
  )
})
