'use client'
import { Tooltip, TooltipContent, TooltipTrigger } from '@langgenius/dify-ui/tooltip'
import {
  useCallback,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { writeTextToClipboard } from '@/utils/clipboard'

type Props = Readonly<{
  content: string
}>

const prefixEmbedded = 'overview.appInfo.embedded'

const CopyIcon = ({ content }: Props) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await writeTextToClipboard(content)
      setCopied(true)
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error('CopyIcon: failed to copy', err)
    }
  }, [content])

  const handleMouseLeave = useCallback(() => {
    setCopied(false)
  }, [])

  const tooltipText = copied
    ? t(`${prefixEmbedded}.copied`, { ns: 'appOverview' })
    : t(`${prefixEmbedded}.copy`, { ns: 'appOverview' })
  /* v8 ignore next -- i18n test mock always returns a non-empty string; runtime fallback is defensive. -- @preserve */
  const safeTooltipText = tooltipText || ''

  return (
    <Tooltip>
      <TooltipTrigger
        render={(
          <button
            type="button"
            aria-label={safeTooltipText}
            className="mx-1 inline-flex size-3.5 cursor-pointer border-0 bg-transparent p-0 text-text-tertiary"
            onClick={handleCopy}
            onMouseLeave={handleMouseLeave}
            data-testid="copy-icon"
          >
            {!copied
              ? (<span aria-hidden className="i-custom-vender-line-files-copy size-3.5" />)
              : (<span aria-hidden className="i-custom-vender-line-files-copy-check size-3.5" />)}
          </button>
        )}
      />
      <TooltipContent>
        {safeTooltipText}
      </TooltipContent>
    </Tooltip>
  )
}

export default CopyIcon
