'use client'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useCallback } from 'react'
import { userProfileQueryOptions } from '@/features/account-profile/client'
import { usePathname } from '@/next/navigation'

dayjs.extend(utc)
dayjs.extend(timezone)

const SHARE_ROUTE_PREFIXES = [
  '/chat',
  '/chatbot',
  '/workflow',
  '/completion',
  '/webapp-signin',
  '/webapp-reset-password',
] as const

const SHARE_FALLBACK_TIMEZONE = 'Asia/Shanghai'

const useTimestamp = () => {
  const pathname = usePathname()
  const isShareRoute = SHARE_ROUTE_PREFIXES.some(prefix => pathname?.startsWith(prefix))
  const { data: profileTimezone } = useQuery({
    ...userProfileQueryOptions(),
    enabled: !isShareRoute,
    select: data => data.profile.timezone ?? undefined,
  })
  const timezone = isShareRoute ? SHARE_FALLBACK_TIMEZONE : profileTimezone

  const formatTime = useCallback((value: number, format: string) => {
    return dayjs.unix(value).tz(timezone).format(format)
  }, [timezone])

  const formatDate = useCallback((value: string, format: string) => {
    return dayjs(value).tz(timezone).format(format)
  }, [timezone])

  return { formatTime, formatDate }
}

export default useTimestamp
