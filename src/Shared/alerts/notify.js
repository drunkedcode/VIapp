import { toast } from 'sonner';
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
    success: (message, description) => toast.success(message, { description }),
    error: (message, description) => toast.error(message, { description }),
    warning: (message, description) => toast.warning(message, { description }),
    info: (message, description) => toast(message, { description }),
    loading: (message) => toast.loading(message),
    dismiss: (id) => toast.dismiss(id),
    promise: toast.promise,
};
