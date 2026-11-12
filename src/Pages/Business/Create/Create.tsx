import { useNavigate } from 'react-router-dom'
import BaseWizard from '@/Shared/components/wizards/BaseWizard'
import { businessCreateSteps } from './steps/wizardStep'
import { toPayload } from './steps/toPayload'

export default function BusinessCreate() {
  const navigate = useNavigate()

  const handleFinish = (data: Record<string, unknown>) => {
    const payload = toPayload(data)
    console.log('Datos listos para registrar:', payload)
    
    // Aquí conectarás con tu API cuando la tengas lista
    // fetch('/api/businesses', { method: 'POST', body: JSON.stringify(payload) })
    //   .then(() => navigate('/feed'))
  }

  const handleCancel = () => {
    navigate('/feed')
  }

return (
    <div className="w-full">
        <BaseWizard
            steps={businessCreateSteps}
            onFinish={handleFinish}
            onCancel={handleCancel}
        />
    </div>
);
}
