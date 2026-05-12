import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, ChevronRight, Clock, Lock, Server, Globe, Users, Zap, ArrowRight, Phone, Mail, Building, ExternalLink, X, Menu, Rocket, Target, Eye, Bug, Database, Wifi, ShieldCheck } from 'lucide-react'

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  site_url: string;
  authorize_test: boolean;
};

type QuizAnswer = {
  has_sla: boolean | null;
  has_server_access: boolean | null;
  uses_cloudflare: boolean | null;
  had_incidents: boolean | null;
  has_crm_data: boolean | null;
  has_wifi_open: boolean | null;
};

const QUIZ_QUESTIONS = [
  {
    id: 'has_sla',
    question: 'Sua empresa tem SLA (Acordo de Nível de Serviço) definido com clientes?',
    description: 'SLA define prazos e responsabilidades claras em caso de problemas.',
    icon: Clock,
  },
  {
    id: 'has_server_access',
    question: 'Você tem controle total sobre seus servidores e hospedagem?',
    description: 'Acesso root permite configurações de segurança avançadas.',
    icon: Server,
  },
  {
    id: 'uses_cloudflare',
    question: 'Seu site usa Cloudflare ou outro serviço de proteção CDN/WAF?',
    description: 'CDNs com WAF bloqueiam ataques antes de chegarem ao servidor.',
    icon: Globe,
  },
  {
    id: 'had_incidents',
    question: 'Sua empresa já teve algum incidente de segurança nos últimos 12 meses?',
    description: 'Incidentes anteriores indicam vulnerabilidades que podem persistir.',
    icon: AlertTriangle,
  },
  {
    id: 'has_crm_data',
    question: 'Você armazena dados de clientes em CRM ou banco de dados próprio?',
    description: 'Dados de clientes são alvos valiosos para atacantes.',
    icon: Database,
  },
  {
    id: 'has_wifi_open',
    question: 'Sua rede Wi-Fi empresarial está aberta ou tem senha fraca?',
    description: 'Redes abertas permitem acesso de intrusos à rede interna.',
    icon: Wifi,
  },
];

function App() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer>({
    has_sla: null,
    has_server_access: null,
    has_crm_data: null,
    had_incidents: null,
    has_wifi_open: null,
    uses_cloudflare: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    site_url: '',
    authorize_test: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const calculateScore = () => {
    let points = 0;
    // Pontos positivos
    if (quizAnswers.has_sla === true) points += 5;
    if (quizAnswers.has_server_access === true) points += 5;
    if (quizAnswers.uses_cloudflare === true) points += 5;
    // Pontos negativos
    if (quizAnswers.had_incidents === true) points += 5;
    if (quizAnswers.has_crm_data === true) points += 3;
    if (quizAnswers.has_wifi_open === true) points += 5;
    return points;
  };

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = QUIZ_QUESTIONS[quizStep];
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      const finalScore = calculateScore();
      setScore(finalScore);
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://felipes.zo.space/api/patolino-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quiz_score: score,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 20) return { level: 'Alto', color: 'text-red-500', bg: 'bg-red-500/20', icon: AlertTriangle };
    if (score >= 10) return { level: 'Médio', color: 'text-yellow-500', bg: 'bg-yellow-500/20', icon: Shield };
    return { level: 'Baixo', color: 'text-green-500', bg: 'bg-green-500/20', icon: CheckCircle };
  };

  const getWhatsAppLink = () => {
    const risk = getRiskLevel(score);
    const message = encodeURIComponent(
      `Olá! Acabei de fazer o diagnóstico do Patolino.Security e meu nível de risco é *${risk.level}*.\n\nGostaria de saber mais sobre como proteger meu negócio.`
    );
    return `https://wa.me/5511910376040?text=${message}`;
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({
      has_sla: null,
      has_server_access: null,
      has_crm_data: null,
      had_incidents: null,
      has_wifi_open: null,
      uses_cloudflare: null,
    });
    setShowForm(false);
    setSubmitted(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      site_url: '',
      authorize_test: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <span className="text-xl font-bold">Patolino<span className="text-amber-500">.Security</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#quiz" className="text-zinc-400 hover:text-amber-500 transition">Diagnóstico</a>
              <a href="#features" className="text-zinc-400 hover:text-amber-500 transition">Recursos</a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-amber-500 transition">Como Funciona</a>
              <a 
                href="#quiz" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg transition"
              >
                Fazer Diagnóstico
              </a>
            </div>
            <button 
              className="md:hidden text-zinc-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0f0f0f] border-b border-zinc-800 px-4 py-4 space-y-4">
            <a href="#quiz" className="block text-zinc-400 hover:text-amber-500 transition">Diagnóstico</a>
            <a href="#features" className="block text-zinc-400 hover:text-amber-500 transition">Recursos</a>
            <a href="#how-it-works" className="block text-zinc-400 hover:text-amber-500 transition">Como Funciona</a>
            <a 
              href="#quiz" 
              className="block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg transition text-center"
            >
              Fazer Diagnóstico
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-500 font-medium">Diagnóstico Gratuito</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Descubra as <span className="text-amber-500">portas abertas</span><br />
            no seu negócio antes que<br />
            <span className="text-red-500">alguém mal-intencionado</span> as encontre
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Em menos de 2 minutos, descubra vulnerabilidades críticas na sua empresa que podem estar expondo dados, clientes e reputação a riscos invisíveis.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#quiz"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition pulse-glow flex items-center gap-2"
            >
              Fazer Diagnóstico Grátis
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#how-it-works"
              className="text-zinc-400 hover:text-white font-medium px-8 py-4 transition flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Ver como funciona
            </a>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Sem cadastro prévio</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Resultado na hora</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              O que você vai descobrir
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Nossa análise identifica os principais vetores de ataque que empresas brasileiras ignoram até ser tarde demais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bug,
                title: 'Vulnerabilidades Web',
                description: 'Portas abertas no seu site que permitem invasão, roubo de dados e sequestro de domínio.',
              },
              {
                icon: Database,
                title: 'Exposição de Dados',
                description: 'Informações sensíveis de clientes e negócio vazando na internet sem você saber.',
              },
              {
                icon: Wifi,
                title: 'Rede Interna',
                description: 'Wi-Fi corporativo vulnerável, dispositivos sem proteção e acessos não autorizados.',
              },
              {
                icon: Globe,
                title: 'Presença Digital',
                description: 'DNS mal configurado, SSL vencido, headers inseguros e rastros expostos.',
              },
              {
                icon: ShieldCheck,
                title: 'Processos & Políticas',
                description: 'Ausência de SLA, backups não testados, sem plano de resposta a incidentes.',
              },
              {
                icon: Target,
                title: 'Vetores de Ataque',
                description: 'Caminhos que atacantes usam para entrar na sua empresa e como bloqueá-los.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
                <feature.icon className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Em 3 passos simples você descobre o nível de risco do seu negócio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Responda o Quiz',
                description: '6 perguntas rápidas sobre a segurança atual da sua empresa.',
                icon: Target,
              },
              {
                step: '02',
                title: 'Veja o Resultado',
                description: 'Na hora você descobre seu nível de risco: Baixo, Médio ou Alto.',
                icon: Eye,
              },
              {
                step: '03',
                title: 'Receba o Plano',
                description: 'Especialista analisa seu caso e envia recomendações personalizadas.',
                icon: Rocket,
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-amber-500/20 absolute -top-4 left-0">{item.step}</div>
                <div className="pt-8 pl-4">
                  <item.icon className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Diagnóstico de Segurança
            </h2>
            <p className="text-zinc-400 text-lg">
              Responda 6 perguntas e descubra o nível de risco do seu negócio.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            {!showForm && !submitted ? (
              <>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-zinc-500 mb-2">
                    <span>Pergunta {quizStep + 1} de {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(((quizStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  {(() => {
                    const q = QUIZ_QUESTIONS[quizStep];
                    const Icon = q.icon;
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-amber-500" />
                          </div>
                          <span className="text-sm text-amber-500 font-medium">Pergunta {quizStep + 1}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                          {q.question}
                        </h3>
                        <p className="text-zinc-400">
                          {q.description}
                        </p>
                      </>
                    );
                  })()}
                </div>

                {/* Answer buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Sim
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Não
                  </button>
                </div>
              </>
            ) : submitted ? (
              /* Result */
              <div className="text-center">
                {(() => {
                  const risk = getRiskLevel(score);
                  const RiskIcon = risk.icon;
                  return (
                    <>
                      <div className={`w-20 h-20 ${risk.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <RiskIcon className={`w-10 h-10 ${risk.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Nível de Risco: <span className={risk.color}>{risk.level}</span>
                      </h3>
                      <p className="text-zinc-400 mb-6">
                        {score >= 20 
                          ? 'Sua empresa tem vulnerabilidades críticas que precisam de atenção imediata.'
                          : score >= 10
                          ? 'Existem pontos de atenção que devem ser avaliados por um especialista.'
                          : 'Sua empresa está em boa situação, mas sempre há melhorias possíveis.'}
                      </p>

                      <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 text-left">
                        <h4 className="font-semibold mb-2">Próximos passos:</h4>
                        <ul className="text-zinc-400 text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Um especialista vai analisar seus dados</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Você receberá recomendações personalizadas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Scan automático do seu site será realizado</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
                        >
                          <Phone className="w-5 h-5" />
                          Falar no WhatsApp
                        </a>
                        <button
                          onClick={resetQuiz}
                          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-6 rounded-xl transition"
                        >
                          Fazer Novo Diagnóstico
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-6">
                  {(() => {
                    const risk = getRiskLevel(score);
                    const RiskIcon = risk.icon;
                    return (
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`w-10 h-10 ${risk.bg} rounded-full flex items-center justify-center`}>
                          <RiskIcon className={`w-5 h-5 ${risk.color}`} />
                        </div>
                        <span className="text-lg">
                          Risco <span className={`font-bold ${risk.color}`}>{risk.level}</span> detectado
                        </span>
                      </div>
                    );
                  })()}
                  <p className="text-zinc-400">
                    Preencha seus dados para receber o diagnóstico completo.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Nome completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Empresa</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 transition"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 transition"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 transition"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Site da empresa</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="url"
                        required
                        value={formData.site_url}
                        onChange={e => setFormData(prev => ({ ...prev, site_url: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500 transition"
                        placeholder="https://suaempresa.com.br"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="authorize"
                      required
                      checked={formData.authorize_test}
                      onChange={e => setFormData(prev => ({ ...prev, authorize_test: e.target.checked }))}
                      className="mt-1 w-5 h-5 accent-amber-500"
                    />
                    <label htmlFor="authorize" className="text-sm text-zinc-400">
                      Autorizo a realização de um teste de segurança não invasivo no meu site e aceito receber o diagnóstico por e-mail/WhatsApp.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Receber Diagnóstico Completo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-500" />
              <span className="font-bold">Patolino<span className="text-amber-500">.Security</span></span>
            </div>
            <p className="text-zinc-500 text-sm text-center">
              © 2026 Patolino.Security. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-zinc-500 hover:text-amber-500 transition">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
