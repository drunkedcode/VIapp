import { useNavigate } from 'react-router-dom';
import BaseWizard from '@/Shared/components/wizards/BaseWizard';
import { businessCreateSteps } from './steps/wizardStep';
import { toPayload } from './steps/toPayload';
export default function BusinessCreate() {
    const navigate = useNavigate();
    const handleFinish = (data) => {
        const payload = toPayload(data);
        console.log('Datos listos para registrar:', payload);
        // Aquí conectarás con tu API cuando la tengas lista
        // fetch('/api/businesses', { method: 'POST', body: JSON.stringify(payload) })
        //   .then(() => navigate('/feed'))
    };
    const handleCancel = () => {
        navigate('/feed');
    };
    return (
    // <ViLayout>
    <div className="w-full px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-[var(--text-dark)]">
            Registrar Nuevo Negocio
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Completá los datos de ubicación y confirmá
          </p>
        </div>

        <BaseWizard steps={businessCreateSteps} onFinish={handleFinish} onCancel={handleCancel}/>
      </div>
    // </ViLayout>
    );
}
