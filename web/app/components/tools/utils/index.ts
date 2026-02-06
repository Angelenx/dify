import type { ThoughtItem } from '@/app/components/base/chat/chat/type'
import type { FileEntity } from '@/app/components/base/file-uploader/types'
import type { VisionFile } from '@/types/app'
import { getProcessedFilesFromResponse } from '@/app/components/base/file-uploader/utils'

export const sortAgentSorts = (list: ThoughtItem[]) => {
  if (!list)
    return list
  if (list.some(item => item.position === undefined))
    return list
  const temp = [...list]
  temp.sort((a, b) => a.position - b.position)
  return temp
}

export const addFileInfos = (list: ThoughtItem[], messageFiles: (FileEntity | VisionFile)[]) => {
  if (!list || !messageFiles)
    return list
  return list.map((item) => {
    if (item.files && item.files?.length > 0) {
      const matchedFiles = item.files
        .map(fileId => messageFiles.find(file => file.id === fileId))
        .filter(Boolean) as (FileEntity | VisionFile)[]
      return {
        ...item,
        message_files: getProcessedFilesFromResponse(matchedFiles.map((f: any) => ({ ...f, related_id: f.id }))),
      }
    }
    return item
  })
}
