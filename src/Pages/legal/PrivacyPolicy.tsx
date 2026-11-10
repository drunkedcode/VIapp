// PrivacyPolicy.tsx

import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#070A18] px-4 py-8 text-white">
      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-slate-800 shadow-xl sm:p-10">
        <Link
          to="/register"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          ← Voltar ao cadastro
        </Link>

        <header className="mb-8 border-b border-slate-200 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
            VI
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Política de Privacidade
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Última atualização: [DATA]
          </p>
        </header>

        <div className="space-y-7 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              1. Introdução
            </h2>

            <p>
              A privacidade dos usuários é importante para o VI. Esta
              Política de Privacidade explica como coletamos, utilizamos,
              armazenamos e protegemos dados pessoais durante a utilização
              da nossa plataforma.
            </p>

            <p className="mt-3">
              O tratamento de dados pessoais realizado pelo VI observa
              a legislação brasileira aplicável, especialmente a Lei
              Geral de Proteção de Dados Pessoais — LGPD (Lei nº
              13.709/2018).
            </p>

            <p className="mt-3">
              Ao utilizar o VI, o usuário poderá consultar esta Política
              para compreender como seus dados são tratados e quais
              direitos poderá exercer.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              2. Quem é responsável pelos dados
            </h2>

            <p>
              O responsável pelo tratamento dos dados pessoais é:
            </p>

            <div className="mt-3 rounded-xl bg-slate-50 p-4">
              <p><strong>Empresa:</strong> [RAZÃO SOCIAL]</p>
              <p><strong>CNPJ:</strong> [CNPJ]</p>
              <p><strong>Endereço:</strong> [ENDEREÇO COMPLETO]</p>
              <p><strong>E-mail:</strong> [E-MAIL DE PRIVACIDADE]</p>
            </div>

            <p className="mt-3">
              Para dúvidas, solicitações ou assuntos relacionados à
              proteção de dados pessoais, o usuário poderá utilizar
              o canal de contato informado nesta Política.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              3. Quais dados podemos coletar
            </h2>

            <p>
              Dependendo das funcionalidades utilizadas, o VI poderá
              tratar as seguintes categorias de dados:
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  3.1. Dados de cadastro
                </h3>

                <p>
                  Nome, endereço de e-mail, informações de autenticação
                  e outros dados necessários para a criação e manutenção
                  da conta.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  3.2. Dados de localização
                </h3>

                <p>
                  Localização aproximada, como bairro ou região, quando
                  o usuário autorizar o acesso à localização do dispositivo.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  3.3. Dados de utilização
                </h3>

                <p>
                  Informações sobre interações com a plataforma, páginas
                  acessadas, funcionalidades utilizadas e preferências
                  relacionadas ao uso do VI, conforme os recursos
                  efetivamente implementados.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  3.4. Dados técnicos
                </h3>

                <p>
                  Informações técnicas necessárias para segurança e
                  funcionamento, como endereço IP, tipo de dispositivo,
                  navegador, sistema operacional, registros de acesso
                  e informações de diagnóstico.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              4. Para que utilizamos os dados
            </h2>

            <p>
              Os dados pessoais poderão ser utilizados para as seguintes
              finalidades:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Criar, identificar e administrar contas de usuários.</li>
              <li>Permitir o acesso às funcionalidades da plataforma.</li>
              <li>Apresentar conteúdos e informações relevantes para a região.</li>
              <li>Exibir estabelecimentos, serviços, eventos e oportunidades locais.</li>
              <li>Apresentar publicidade regional.</li>
              <li>Melhorar a experiência e o funcionamento do VI.</li>
              <li>Prevenir fraudes, abusos e acessos não autorizados.</li>
              <li>Prestar suporte e responder às solicitações dos usuários.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              5. Utilização da localização
            </h2>

            <p>
              O VI poderá solicitar autorização para acessar a localização
              do dispositivo com a finalidade de identificar a região
              aproximada do usuário e apresentar conteúdos locais.
            </p>

            <p className="mt-3">
              A utilização da localização seguirá estas diretrizes:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                A localização será utilizada enquanto o usuário estiver
                utilizando a plataforma.
              </li>
              <li>
                A finalidade é identificar uma região aproximada, como
                bairro ou cidade.
              </li>
              <li>
                O VI não pretende realizar rastreamento contínuo em
                segundo plano.
              </li>
              <li>
                O usuário poderá negar ou revogar a autorização nas
                configurações do dispositivo.
              </li>
            </ul>

            <p className="mt-3">
              A desativação da localização poderá limitar funcionalidades
              que dependam de informações regionais, mas não deverá
              impedir o acesso às demais funcionalidades que não dependam
              desse recurso.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              6. Publicidade regional
            </h2>

            <p>
              O VI poderá apresentar publicidade e conteúdos patrocinados
              de acordo com a região aproximada do usuário.
            </p>

            <p className="mt-3">
              O objetivo é permitir que estabelecimentos e empresas
              divulguem produtos, serviços, eventos e oportunidades
              para pessoas de regiões relevantes para suas atividades.
            </p>

            <p className="mt-3">
              A publicidade regional não significa que os anunciantes
              tenham acesso automático aos dados pessoais dos usuários.
              O VI não disponibiliza automaticamente nome, e-mail ou
              localização individual aos anunciantes para essa finalidade.
            </p>

            <p className="mt-3">
              Os anunciantes poderão receber informações agregadas sobre
              resultados de campanhas, quando aplicável, sem identificação
              individual dos usuários.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              7. Bases legais para o tratamento
            </h2>

            <p>
              O VI realizará o tratamento de dados pessoais com fundamento
              nas bases legais previstas na LGPD, conforme a finalidade
              e a situação concreta.
            </p>

            <p className="mt-3">
              Entre as bases legais que poderão ser aplicáveis estão:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Execução de contrato:</strong> quando o tratamento
                for necessário para disponibilizar os serviços e
                funcionalidades solicitados pelo usuário.
              </li>
              <li>
                <strong>Consentimento:</strong> quando a legislação exigir
                uma manifestação livre, informada e inequívoca do titular.
              </li>
              <li>
                <strong>Legítimo interesse:</strong> quando aplicável,
                após avaliação de finalidade, necessidade, expectativas
                do titular e salvaguardas.
              </li>
              <li>
                <strong>Obrigação legal ou regulatória:</strong> quando
                o tratamento for necessário para cumprir exigências legais.
              </li>
              <li>
                <strong>Exercício regular de direitos:</strong> quando
                necessário para processos judiciais, administrativos
                ou arbitrais.
              </li>
            </ul>

            <p className="mt-3">
              A base legal será definida de acordo com cada operação
              de tratamento. A autorização de localização solicitada
              pelo dispositivo não substitui as informações e obrigações
              previstas nesta Política.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              8. Compartilhamento de dados
            </h2>

            <p>
              O VI poderá compartilhar dados pessoais somente quando
              necessário para finalidades legítimas e compatíveis com
              esta Política, observando a legislação aplicável.
            </p>

            <p className="mt-3">
              Isso poderá ocorrer com:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Fornecedores de hospedagem, armazenamento e infraestrutura
                tecnológica.
              </li>
              <li>
                Serviços de autenticação e gerenciamento de contas.
              </li>
              <li>
                Prestadores de serviços de comunicação e suporte.
              </li>
              <li>
                Fornecedores de mapas e recursos de localização, quando
                utilizados.
              </li>
              <li>
                Autoridades públicas, quando houver obrigação legal
                ou determinação válida.
              </li>
            </ul>

            <p className="mt-3">
              Os fornecedores que tratam dados em nome do VI deverão
              observar as condições contratuais e medidas de segurança
              aplicáveis.
            </p>

            <p className="mt-3">
              O VI não comercializa dados pessoais de usuários como
              produto ou lista de contatos.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              9. Armazenamento e conservação
            </h2>

            <p>
              Os dados pessoais serão conservados pelo período necessário
              para cumprir as finalidades para as quais foram coletados,
              respeitando os prazos legais e regulatórios aplicáveis.
            </p>

            <p className="mt-3">
              O VI poderá conservar determinadas informações após o
              encerramento da conta quando houver necessidade de cumprir
              obrigações legais, proteger direitos, prevenir fraudes
              ou atender outras hipóteses permitidas pela LGPD.
            </p>

            <p className="mt-3">
              Quando não houver mais necessidade ou fundamento legal
              para a conservação, os dados serão eliminados ou
              anonimizados, conforme aplicável.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              10. Segurança das informações
            </h2>

            <p>
              O VI adotará medidas técnicas e administrativas adequadas
              para proteger os dados pessoais contra acessos não
              autorizados, perda, alteração, destruição ou qualquer
              forma de tratamento inadequado ou ilícito.
            </p>

            <p className="mt-3">
              Apesar dos esforços de segurança, nenhum sistema é
              completamente livre de riscos. Em caso de incidente
              envolvendo dados pessoais, serão adotadas as medidas
              previstas na legislação aplicável.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              11. Cookies e tecnologias semelhantes
            </h2>

            <p>
              O VI poderá utilizar cookies e tecnologias semelhantes
              para permitir o funcionamento da plataforma, manter
              preferências, melhorar a experiência de navegação e
              obter informações técnicas de utilização.
            </p>

            <p className="mt-3">
              Quando necessário, o usuário será informado sobre essas
              tecnologias e poderá gerenciar suas preferências por
              meio dos recursos disponibilizados pela plataforma
              ou pelo navegador.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              12. Transferência internacional de dados
            </h2>

            <p>
              Alguns fornecedores de tecnologia utilizados pelo VI
              poderão armazenar ou processar informações em servidores
              localizados fora do Brasil.
            </p>

            <p className="mt-3">
              Quando houver transferência internacional de dados pessoais,
              o VI observará os requisitos e mecanismos previstos na
              LGPD e na regulamentação aplicável.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              13. Direitos dos titulares
            </h2>

            <p>
              Nos termos da LGPD, o usuário poderá exercer os direitos
              previstos na legislação, observadas as condições e
              exceções legais.
            </p>

            <p className="mt-3">
              Entre esses direitos estão:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Confirmação da existência de tratamento de dados.</li>
              <li>Acesso aos dados pessoais.</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Anonimização, bloqueio ou eliminação, quando aplicável.</li>
              <li>Portabilidade, observadas as regras da ANPD.</li>
              <li>Eliminação dos dados tratados com consentimento, quando aplicável.</li>
              <li>Informação sobre compartilhamento de dados.</li>
              <li>Informação sobre a possibilidade de não fornecer consentimento e suas consequências.</li>
              <li>Revogação do consentimento, quando essa for a base legal utilizada.</li>
            </ul>

            <p className="mt-3">
              As solicitações poderão ser realizadas pelo canal de
              privacidade informado nesta Política.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              14. Privacidade de crianças e adolescentes
            </h2>

            <p>
              O tratamento de dados pessoais de crianças e adolescentes,
              quando aplicável, observará seu melhor interesse e as
              disposições específicas da legislação brasileira.
            </p>

            <p className="mt-3">
              Caso sejam identificadas situações de tratamento
              incompatíveis com essas exigências, o VI poderá adotar
              medidas para regularizar a situação, restringir o
              tratamento ou remover informações, conforme necessário.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              15. Alterações desta Política
            </h2>

            <p>
              Esta Política poderá ser atualizada para refletir mudanças
              nas práticas de tratamento de dados, nas funcionalidades
              do VI ou na legislação aplicável.
            </p>

            <p className="mt-3">
              A versão vigente estará disponível na plataforma,
              acompanhada da data de sua última atualização.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              16. Contato e solicitações de privacidade
            </h2>

            <p>
              Para dúvidas, solicitações ou exercício de direitos
              relacionados aos dados pessoais, entre em contato:
            </p>

            <div className="mt-3 rounded-xl bg-slate-50 p-4">
              <p><strong>Responsável:</strong> [NOME DO ENCARREGADO, SE APLICÁVEL]</p>
              <p><strong>E-mail:</strong> [E-MAIL DE PRIVACIDADE]</p>
              <p><strong>Empresa:</strong> [RAZÃO SOCIAL]</p>
              <p><strong>CNPJ:</strong> [CNPJ]</p>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-400">
          VI — Política de Privacidade. Documento sujeito a atualização.
        </footer>
      </article>
    </main>
  );
}