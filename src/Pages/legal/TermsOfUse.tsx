// TermsOfUse.tsx

import { Link } from "react-router-dom";

export default function TermsOfUse() {
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
            Termos de Uso
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Última atualização: [DATA]
          </p>
        </header>

        <div className="space-y-7 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              1. Identificação e aceitação
            </h2>

            <p>
              Estes Termos de Uso regulam o acesso e a utilização da
              plataforma VI, disponibilizada por [RAZÃO SOCIAL], inscrita
              no CNPJ sob nº [CNPJ], com sede em [ENDEREÇO COMPLETO],
              doravante denominada VI.
            </p>

            <p className="mt-3">
              Ao criar uma conta ou utilizar a plataforma, o usuário declara
              que leu e compreendeu estes Termos e concorda com as condições
              aqui estabelecidas. Caso não concorde, deverá deixar de
              utilizar a plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              2. Sobre a plataforma
            </h2>

            <p>
              O VI é uma plataforma digital destinada a conectar pessoas,
              estabelecimentos e iniciativas locais, facilitando o acesso
              a informações, produtos, serviços e oportunidades existentes
              em sua região.
            </p>

            <p className="mt-3">
              Entre as funcionalidades, a plataforma poderá disponibilizar
              conteúdos de estabelecimentos, ofertas, publicidade regional,
              eventos, oportunidades de trabalho, serviços e publicações
              de usuários ou parceiros.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              3. Cadastro e conta do usuário
            </h2>

            <p>
              Para utilizar determinadas funcionalidades, poderá ser
              necessário criar uma conta e fornecer informações verdadeiras,
              completas e atualizadas.
            </p>

            <p className="mt-3">
              O usuário é responsável pela confidencialidade de suas
              credenciais de acesso e pelas atividades realizadas por meio
              de sua conta. Qualquer suspeita de uso não autorizado deverá
              ser comunicada à VI.
            </p>

            <p className="mt-3">
              A VI poderá solicitar a atualização ou confirmação de
              informações quando necessário para a segurança e o
              funcionamento da plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              4. Localização
            </h2>

            <p>
              O VI poderá solicitar autorização para acessar a localização
              aproximada do dispositivo, com o objetivo de apresentar
              informações e conteúdos relevantes para a região do usuário.
            </p>

            <p className="mt-3">
              A localização será utilizada enquanto a plataforma estiver
              em uso, conforme as permissões concedidas pelo usuário e as
              configurações do dispositivo. O VI não pretende realizar
              rastreamento contínuo em segundo plano.
            </p>

            <p className="mt-3">
              O usuário poderá negar ou revogar a permissão de localização
              nas configurações do dispositivo. Nesse caso, algumas
              funcionalidades que dependem da região poderão ficar
              indisponíveis ou apresentar resultados menos específicos.
            </p>

            <p className="mt-3">
              As práticas de coleta e utilização desses dados estão
              detalhadas na Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              5. Publicidade e conteúdo regional
            </h2>

            <p>
              A plataforma poderá apresentar publicidade, ofertas e
              conteúdos patrocinados de empresas e estabelecimentos,
              considerando critérios regionais, como a localidade
              aproximada do usuário.
            </p>

            <p className="mt-3">
              Os conteúdos patrocinados deverão ser identificados de
              maneira adequada. A apresentação de publicidade regional
              não significa que os anunciantes recebam automaticamente
              dados pessoais, como nome, e-mail ou localização individual
              do usuário.
            </p>

            <p className="mt-3">
              A contratação de serviços de divulgação por empresas será
              regulada por condições comerciais e instrumentos próprios,
              quando aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              6. Eventos, empregos, serviços e ofertas de terceiros
            </h2>

            <p>
              O VI poderá divulgar oportunidades, eventos, vagas de
              emprego, serviços, produtos e ofertas fornecidos por
              estabelecimentos, anunciantes, parceiros ou outros usuários.
            </p>

            <p className="mt-3">
              Salvo quando expressamente informado, o VI atua como
              plataforma de divulgação e conexão, não sendo necessariamente
              responsável pela execução, disponibilidade, qualidade,
              contratação ou resultado dos serviços e oportunidades
              oferecidos por terceiros.
            </p>

            <p className="mt-3">
              O usuário deverá verificar as informações e condições
              diretamente com o responsável pela oferta antes de realizar
              pagamentos, contratar serviços ou participar de oportunidades.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              7. Conduta e conteúdo dos usuários
            </h2>

            <p>
              O usuário compromete-se a utilizar a plataforma de maneira
              lícita e respeitosa, sem publicar ou transmitir conteúdo
              falso, enganoso, discriminatório, ofensivo, ilegal ou que
              viole direitos de terceiros.
            </p>

            <p className="mt-3">
              Também é proibido utilizar a plataforma para fraudes,
              atividades ilícitas, envio de spam, tentativa de acesso
              não autorizado, distribuição de códigos maliciosos ou
              qualquer ação que prejudique o funcionamento do VI ou
              de outros usuários.
            </p>

            <p className="mt-3">
              O usuário é responsável pelo conteúdo que publica e declara
              possuir os direitos ou autorizações necessários para
              disponibilizá-lo na plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              8. Moderação e medidas de segurança
            </h2>

            <p>
              A VI poderá analisar, restringir, remover ou tornar
              indisponíveis conteúdos que violem estes Termos, a legislação
              aplicável ou direitos de terceiros.
            </p>

            <p className="mt-3">
              Quando necessário, a VI poderá limitar temporariamente
              funcionalidades ou suspender contas para investigar
              atividades suspeitas, prevenir abusos ou proteger a
              segurança da plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              9. Propriedade intelectual
            </h2>

            <p>
              A marca VI, sua identidade visual, software, layout,
              funcionalidades, textos e demais elementos próprios da
              plataforma são protegidos pela legislação aplicável de
              propriedade intelectual.
            </p>

            <p className="mt-3">
              Não é permitido copiar, reproduzir, modificar, distribuir
              ou explorar comercialmente esses elementos sem autorização,
              salvo nas hipóteses permitidas por lei.
            </p>

            <p className="mt-3">
              O conteúdo publicado por usuários ou terceiros permanece
              sob responsabilidade de seus respectivos titulares. Ao
              publicar conteúdo, o usuário autoriza sua exibição e
              disponibilização dentro das funcionalidades do VI,
              sem transferência da titularidade dos direitos.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              10. Disponibilidade e limitações
            </h2>

            <p>
              A VI buscará manter a plataforma disponível e segura, mas
              não garante funcionamento ininterrupto ou ausência de
              falhas, interrupções, indisponibilidades ou problemas
              decorrentes de fatores técnicos, operacionais ou de
              terceiros.
            </p>

            <p className="mt-3">
              A VI poderá realizar atualizações, manutenções, alterações
              ou descontinuar funcionalidades, sempre observando a
              legislação aplicável.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              11. Privacidade e proteção de dados
            </h2>

            <p>
              O tratamento de dados pessoais realizado pelo VI está
              descrito na Política de Privacidade, que apresenta as
              categorias de dados utilizadas, suas finalidades, bases
              legais, compartilhamentos, períodos de conservação e
              direitos dos titulares.
            </p>

            <p className="mt-3">
              A utilização da plataforma deverá observar a legislação
              brasileira aplicável, especialmente a Lei Geral de Proteção
              de Dados Pessoais (Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              12. Encerramento da conta
            </h2>

            <p>
              O usuário poderá solicitar o encerramento de sua conta
              por meio dos canais disponibilizados pela VI.
            </p>

            <p className="mt-3">
              O encerramento da conta não elimina automaticamente
              informações que precisem ser conservadas para cumprimento
              de obrigações legais, exercício regular de direitos ou
              outras hipóteses permitidas pela legislação. Os detalhes
              estão descritos na Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              13. Alterações destes Termos
            </h2>

            <p>
              Estes Termos poderão ser atualizados para refletir mudanças
              na plataforma, em suas funcionalidades ou na legislação
              aplicável.
            </p>

            <p className="mt-3">
              A versão vigente estará disponível na plataforma, com
              indicação da data de sua última atualização. Quando
              necessário, a VI solicitará nova manifestação de
              concordância do usuário.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              14. Legislação e foro
            </h2>

            <p>
              Estes Termos serão interpretados conforme as leis da
              República Federativa do Brasil.
            </p>

            <p className="mt-3">
              Fica eleito o foro da comarca de [CIDADE/UF], respeitadas
              as regras legais de competência e os direitos do consumidor
              aplicáveis ao caso.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              15. Contato
            </h2>

            <p>
              Em caso de dúvidas sobre estes Termos, o usuário poderá
              entrar em contato pelo e-mail:
            </p>

            <p className="mt-2 font-medium text-slate-900">
              [E-MAIL DE CONTATO]
            </p>
          </section>
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-400">
          VI — Termos de Uso. Documento sujeito a atualização.
        </footer>
      </article>
    </main>
  );
}