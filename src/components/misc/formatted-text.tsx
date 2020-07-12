import React from 'react'

interface Props {
  text: string
}

export const FormattedText: React.FC<Props> = ({ text }) => {
  const [rendered, setRendered] = React.useState<React.ReactNodeArray>([])

  const render = React.useCallback((content: string) => {
    const slices: React.ReactNodeArray = []
    let startIndex = 0

    const BOLD_PATTERN = /\*([^*]+)\*/g
    let results: RegExpExecArray | null = BOLD_PATTERN.exec(content)

    while (results !== null) {
      const sliceBefore = content.slice(startIndex, results.index)

      if (sliceBefore) slices.push(<span key={startIndex}>{sliceBefore}</span>)
      slices.push(<b key={results.index}>{results[1]}</b>)

      startIndex = BOLD_PATTERN.lastIndex
      results = BOLD_PATTERN.exec(content)
    }

    const lastSlice = content.slice(startIndex)

    if (lastSlice) {
      slices.push(<span key={startIndex}>{lastSlice}</span>)
    }

    setRendered(slices)
  }, [])

  React.useEffect(() => {
    render(text)
  }, [text, render])

  return <React.Fragment>{rendered}</React.Fragment>
}
