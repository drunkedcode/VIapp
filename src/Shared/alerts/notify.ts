import { toast, type ExternalToast } from 'sonner'

/**
 * Notificaciones de toda la app. Uso desde cualquier componente:
 *
 *   import { notify } from '@/Shared/alerts/notify'
 *   notify.success('Salvo com sucesso')
 *   notify.error('Algo deu errado', 'Tente novamente em instantes')
 *
 *   notify.promise(api.post('/x'), {
 *     loading: 'Enviando...',
 *     success: 'Enviado!',
 *     error: 'Falha ao enviar',
 *   })
 */
export const notify = {
  success: (message: string, description?: string, options?: ExternalToast) =>
    toast.success(message, { description, ...options }),

  error: (message: string, description?: string, options?: ExternalToast) =>
    toast.error(message, { description, ...options }),

  warning: (message: string, description?: string, options?: ExternalToast) =>
    toast.warning(message, { description, ...options }),

  info: (message: string, description?: string, options?: ExternalToast) =>
    toast(message, { description, ...options }),

  loading: (message: string, options?: ExternalToast) =>
    toast.loading(message, options),

  dismiss: (id?: string | number) =>
    toast.dismiss(id),

  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    data: {
      loading?: string | React.ReactNode
      success?: string | React.ReactNode | ((data: T) => string | React.ReactNode)
      error?: string | React.ReactNode | ((error: unknown) => string | React.ReactNode)
      finally?: () => void | Promise<void>
    }
  ) => {
    return toast.promise(promise, data)
  },
}