import {
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react'
import {
  create,
  useStore as useZustandStore,
} from 'zustand'
import type {
  FileEntity,
} from './types'
import { v4 as uuid4 } from 'uuid'
import { TransferMethod } from '@/types/app'

type Shape = {
  files: FileEntity[]
  setFiles: (files: FileEntity[]) => void
}

export const createFileStore = (
  value: FileEntity[] = [],
) => {
  return create<Shape>(set => ({
    files: value ? [...value] : [],
    setFiles: (files) => {
      set({ files })
    },
  }))
}

type FileStore = ReturnType<typeof createFileStore>
export const FileContext = createContext<FileStore | null>(null)

export function useStore<T>(selector: (state: Shape) => T): T {
  const store = useContext(FileContext)
  if (!store)
    throw new Error('Missing FileContext.Provider in the tree')

  return useZustandStore(store, selector)
}

export const useFileStore = () => {
  return useContext(FileContext)!
}

type FileProviderProps = {
  children: React.ReactNode
  value?: FileEntity[]
  onChange?: (files: FileEntity[]) => void
}
export const FileContextProvider = ({
  children,
  value,
  onChange,
}: FileProviderProps) => {
  const storeRef = useRef<FileStore | undefined>(undefined)
  const onChangeRef = useRef<FileProviderProps['onChange']>(onChange)
  const isSyncingRef = useRef(false)

  if (!storeRef.current)
    storeRef.current = createFileStore(value)

  // keep latest onChange
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // subscribe to store changes and call latest onChange
  useEffect(() => {
    const store = storeRef.current!
    const unsubscribe = store.subscribe((state: Shape) => {
      if (isSyncingRef.current) return
      onChangeRef.current?.(state.files)
    })
    return unsubscribe
  }, [])

  // sync external value into internal store when value changes
  useEffect(() => {
    const store = storeRef.current!
    const prevFiles = store.getState().files
    const nextFiles = (value ? [...value] : []).map((file: any, idx: number) => {
      if (file.id)
        return file as FileEntity

      // try to reuse existing file by uploadedId or name/size/transferMethod to keep stable ids during upload
      const existingByIndex = prevFiles[idx]
      const existing = prevFiles.find((item) => {
        if (file.upload_file_id && item.uploadedId === file.upload_file_id)
          return true
        if (!file.upload_file_id && item.transferMethod === (file.transferMethod || file.transfer_method) && item.name === file.name && item.size === file.size)
          return true
        return false
      })
      const matched = existing || existingByIndex

      // normalize snake_case or processed objects back to FileEntity shape
      const fallbackId = matched?.id || file.upload_file_id || uuid4()
      return {
        id: fallbackId,
        name: file.name || matched?.name || '',
        size: file.size || matched?.size || 0,
        type: file.type || file.mime_type || '',
        progress: file.progress ?? matched?.progress ?? (file.upload_file_id ? 100 : 0),
        transferMethod: file.transferMethod || file.transfer_method || matched?.transferMethod || TransferMethod.local_file,
        supportFileType: file.supportFileType || file.type || matched?.supportFileType || '',
        originalFile: file.originalFile || matched?.originalFile,
        uploadedId: file.uploadedId || file.upload_file_id || matched?.uploadedId,
        base64Url: file.base64Url || matched?.base64Url,
        url: file.url || matched?.url,
        isRemote: file.isRemote ?? matched?.isRemote,
      } as FileEntity
    })

    console.debug('[fileUploader] sync external value', {
      incomingCount: value?.length || 0,
      prevIds: prevFiles.map(item => item.id),
      next: nextFiles.map(item => ({ id: item.id, uploadedId: item.uploadedId, transferMethod: item.transferMethod, progress: item.progress })),
    })
    isSyncingRef.current = true
    store.setState({ files: nextFiles })
    isSyncingRef.current = false
  }, [value])

  return (
    <FileContext.Provider value={storeRef.current}>
      {children}
    </FileContext.Provider>
  )
}
