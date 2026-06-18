'use client'
import { Tooltip, TooltipContent, TooltipTrigger } from '@langgenius/dify-ui/tooltip'
import {
  RiClipboardFill,
  RiClipboardLine,
} from '@remixicon/react'
import {
  useCallback,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import ActionButton from '@/app/components/base/action-button'
import { writeTextToClipboard } from '@/utils/clipboard'
import copyStyle from './style.module.css'

type Props = Readonly<{
  content: string
  className?: string
}>

const prefixEmbedded = 'overview.appInfo.embedded'

const CopyFeedback = ({ content }: Props) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await writeTextToClipboard(content)
      setCopied(true)
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error('CopyFeedback: failed to copy', err)
    }
  }, [content])

  const handleMouseLeave = useCallback(() => {
    setCopied(false)
  }, [])

  const tooltipText = copied
    ? t(`${prefixEmbedded}.copied`, { ns: 'appOverview' })
    : t(`${prefixEmbedded}.copy`, { ns: 'appOverview' })
  /* v8 ignore next -- i18n test mock always returns a non-empty string; runtime fallback is defensive. -- @preserve */
  const safeText = tooltipText || ''

  return (
    <Tooltip>
      <TooltipTrigger
        render={(
          <ActionButton aria-label={safeText} onClick={handleCopy} onMouseLeave={handleMouseLeave}>
            {copied && <RiClipboardFill className="size-4" aria-hidden="true" />}
            {!copied && <RiClipboardLine className="size-4" aria-hidden="true" />}
          </ActionButton>
        )}
      />
      <TooltipContent>
        {safeText}
      </TooltipContent>
    </Tooltip>
  )
}

export default CopyFeedback

export const CopyFeedbackNew = ({ content, className }: Pick<Props, 'className' | 'content'>) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await writeTextToClipboard(content)
      setCopied(true)
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.error('CopyFeedbackNew: failed to copy', err)
    }
  }, [content])

  const handleMouseLeave = useCallback(() => {
    setCopied(false)
  }, [])

  const tooltipText = copied
    ? t(`${prefixEmbedded}.copied`, { ns: 'appOverview' })
    : t(`${prefixEmbedded}.copy`, { ns: 'appOverview' })
  /* v8 ignore next -- i18n test mock always returns a non-empty string; runtime fallback is defensive. -- @preserve */
  const safeText = tooltipText || ''

  return (
    <Tooltip>
      <TooltipTrigger
        render={(
          <button
            type="button"
            aria-label={safeText}
            className={`size-8 cursor-pointer rounded-lg border-none bg-transparent p-0 hover:bg-components-button-ghost-bg-hover focus-visible:ring-1 focus-visible:ring-components-input-border-active focus-visible:outline-hidden ${className ?? ''}`}
            onClick={handleCopy}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`size-full ${copyStyle.copyIcon} ${copied ? copyStyle.copied : ''}`}
            >
            </div>
          </button>
        )}
      />
      <TooltipContent>
        {safeText}
      </TooltipContent>
    </Tooltip>
  )
}
