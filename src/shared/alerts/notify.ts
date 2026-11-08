import { toast } from 'sonner'

/**
 * Notificaciones de toda la app. Uso desde cualquier componente:
 *
 *   import { notify } from '@/shared/alerts/notify'
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
  success: (message: string, description?: string) => toast.success(message, { description }),
  error: (message: string, description?: string) => toast.error(message, { description }),
  warning: (message: string, description?: string) => toast.warning(message, { description }),
  info: (message: string, description?: string) => toast(message, { description }),
  loading: (message: string) => toast.loading(message),
  dismiss: (id?: string | number) => toast.dismiss(id),
  promise: toast.promise,
}
