'use client'
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
import Tooltip from '@/app/components/base/tooltip'
import { writeTextToClipboard } from '@/utils/clipboard'
import copyStyle from './style.module.css'

type Props = {
  content: string
  className?: string
}

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

  return (
    <Tooltip
      popupContent={
        (copied
          ? t(`${prefixEmbedded}.copied`, { ns: 'appOverview' })
          : t(`${prefixEmbedded}.copy`, { ns: 'appOverview' })) || ''
      }
    >
      <ActionButton>
        <div
          onClick={handleCopy}
          onMouseLeave={handleMouseLeave}
        >
          {copied && <RiClipboardFill className="h-4 w-4" />}
          {!copied && <RiClipboardLine className="h-4 w-4" />}
        </div>
      </ActionButton>
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

  return (
    <Tooltip
      popupContent={
        (copied
          ? t(`${prefixEmbedded}.copied`, { ns: 'appOverview' })
          : t(`${prefixEmbedded}.copy`, { ns: 'appOverview' })) || ''
      }
    >
      <div
        className={`h-8 w-8 cursor-pointer rounded-lg hover:bg-components-button-ghost-bg-hover ${className ?? ''
        }`}
      >
        <div
          onClick={handleCopy}
          onMouseLeave={handleMouseLeave}
          className={`h-full w-full ${copyStyle.copyIcon} ${copied ? copyStyle.copied : ''
          }`}
        >
        </div>
      </div>
    </Tooltip>
  )
}
