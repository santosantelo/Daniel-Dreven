


import React from 'react';
import { GoogleGenAI, Type } from "@google/genai";

type Screen = 'welcome' | 'register' | 'login' | 'onboarding' | 'results' | 'dashboard_loading' | 'dashboard' | 'workout' | 'pre_workout' | 'coach_chat' | 'modalities_list' | 'modality_workout';

const allModalities = [
    "Natação", "Funcional", "Zumba", "GAP", "HIIT", "Alongamento", "Spinning", "Cross Training",
    "Step", "Localizada", "Abdominais", "Jump", "Dance Fit", "Power Jump", "Treinamento Resistido",
    "Treino de Força", "Core Training", "Circuito", "Calistenia", "Treino de Mobilidade",
    "Treino de Equilíbrio", "Treino de Estabilidade", "Treino Cardio", "Treino de Potência",
    "Funcional com Peso Corporal", "Body Combat", "Body Pump", "Body Balance", "Body Attack",
    "Strong Nation", "Aeróbico", "Ritmos", "Fit Dance", "Dance Mix", "Power Abs", "Alongamento Ativo",
    "Treino Intervalado", "Treino Funcional Avançado", "Treino de Resistência Muscular", "Treino de Coordenação Motora"
];

const allGoals = [
    "Melhorar resistência física", "Aumentar flexibilidade", "Ganhar condicionamento cardiovascular",
    "Melhorar postura corporal", "Aumentar energia e disposição", "Reduzir estresse e ansiedade",
    "Melhorar equilíbrio e coordenação motora"
];

const initialUserData = {
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    weight: 70 as number | null,
    height: 170 as number | null,
    experienceLevel: '',
    trainingDays: '',
    equipment: '',
    modalities: [] as string[],
    modalityFrequencies: {} as { [key: string]: string },
    goals: [] as string[],
    diet: [] as string[],
    motivation: [] as string[],
    bodyType: '',
    sleepHours: 7 as number | null,
    waterIntake: 2 as number | null,
    inspirations: [] as string[],
    customInspirations: '',
    trainer: { name: '' },
    workoutPlan: null as any,
    modalityPlans: {} as { [key: string]: { plan: any; tips: string } },
    dashboard_unlocked: false,
};

const ALL_TRAINERS = [
    // Masculinos
    { name: 'Lucas Rezende', gender: 'male' }, { name: 'Rafael Costa', gender: 'male' }, { name: 'André Almeida', gender: 'male' },
    { name: 'Mateus Gomes', gender: 'male' }, { name: 'Gustavo Carvalho', gender: 'male' }, { name: 'Pedro Souza', gender: 'male' },
    { name: 'Thiago Lacerda', gender: 'male' }, { name: 'Bruno Rocha', gender: 'male' }, { name: 'Daniel Alves', gender: 'male' },
    { name: 'Caio Castro', gender: 'male' }, { name: 'Ricardo Nunes', gender: 'male' }, { name: 'Felipe Tito', gender: 'male' },
    { name: 'Enzo Ribeiro', gender: 'male' }, { name: 'Heitor Barbosa', gender: 'male' }, { name: 'Davi Pinto', gender: 'male' },
    { name: 'Arthur Monteiro', gender: 'male' }, { name: 'Bernardo Mendes', gender: 'male' }, { name: 'Miguel Teixeira', gender: 'male' },
    { name: 'Vinicius Moraes', gender: 'male' }, { name: 'Leonardo Almeida', gender: 'male' }, { name: 'Guilherme Pereira', gender: 'male' },
    { name: 'Felipe Azevedo', gender: 'male' }, { name: 'Rodrigo Ferreira', gender: 'male' }, { name: 'Diego Martins', gender: 'male' },
    { name: 'Eduardo Lima', gender: 'male' }, { name: 'João Miguel', gender: 'male' }, { name: 'Enzo Gabriel', gender: 'male' },
    { name: 'Noah Medeiros', gender: 'male' }, { name: 'Breno Correia', gender: 'male' }, { name: 'Otávio Castro', gender: 'male' },
    { name: 'Igor Drummond', gender: 'male' }, { name: 'Cauã Silveira', gender: 'male' }, { name: 'Vicente Campos', gender: 'male' },
    { name: 'Samuel Esteves', gender: 'male' }, { name: 'Theo Farias', gender: 'male' }, { name: 'Lorenzo Moreira', gender: 'male' },
    { name: 'Benjamin Cardoso', gender: 'male' }, { name: 'Matias Brandão', gender: 'male' }, { name: 'Frederico Pinto', gender: 'male' },
// FIX: Corrected syntax error in object literal
    { name: 'Gael Nogueira', gender: 'male' }, { name: 'Henrique Viana', gender: 'male' }, { name: 'Isaac Dias', gender: 'male' },
    { name: 'Lucca Barros', gender: 'male' }, { name: 'Erick Santos', gender: 'male' }, { name: 'Ravi Dantas', gender: 'male' },
    
    // Femininos
    { name: 'Sofia Oliveira', gender: 'female' }, { name: 'Beatriz Pereira', gender: 'female' }, { name: 'Clara Rodrigues', gender: 'female' },
    { name: 'Juliana Martins', gender: 'female' }, { name: 'Larissa Ferreira', gender: 'female' }, { name: 'Isabela Santos', gender: 'female' },
    { name: 'Camila Bastos', gender: 'female' }, { name: 'Fernanda Lima', gender: 'female' }, { name: 'Mariana Rios', gender: 'female' },
    { name: 'Vanessa Lopes', gender: 'female' }, { name: 'Patrícia Poeta', gender: 'female' }, { name: 'Laura Neiva', gender: 'female' },
    { name: 'Valentina Azevedo', gender: 'female' }, { name: 'Manuela Dias', gender: 'female' }, { name: 'Heloísa Rocha', gender: 'female' },
    { name: 'Cecília Cunha', gender: 'female' }, { name: 'Lorena Farias', gender: 'female' }, { name: 'Alice Correia', gender: 'female' },
    { name: 'Gabriela Lima', gender: 'female' }, { name: 'Mariana Costa', gender: 'female' }, { name: 'Beatriz Santos', gender: 'female' },
    { name: 'Isadora Oliveira', gender: 'female' }, { name: 'Luiza Carvalho', gender: 'female' }, { name: 'Amanda Ribeiro', gender: 'female' },
    { name: 'Carolina Neves', gender: 'female' }, { name: 'Maria Alice', gender: 'female' }, { name: 'Helena Moraes', gender: 'female' },
    { name: 'Maitê Gomes', gender: 'female' }, { name: 'Antonella Barros', gender: 'female' }, { name: 'Liz Araujo', gender: 'female' },
    { name: 'Yasmin Duarte', gender: 'female' }, { name: 'Esther Moura', gender: 'female' }, { name: 'Sarah Peixoto', gender: 'female' },
    { name: 'Lívia Pires', gender: 'female' }, { name: 'Giovanna Freitas', gender: 'female' }, { name: 'Alana Rezende', gender: 'female' },
    { name: 'Catarina Matos', gender: 'female' }, { name: 'Elisa Pinto', gender: 'female' }, { name: 'Rebeca Vasconcelos', gender: 'female' },
    { name: 'Nicole Andrade', gender: 'female' }, { name: 'Lavínia Teixeira', gender: 'female' }, { name: 'Agatha Sousa', gender: 'female' },
    { name: 'Olívia Bernardes', gender: 'female' }, { name: 'Ana Clara', gender: 'female' }, { name: 'Stella Castro', gender: 'female' }
];

// FIX: Refactored SVG components to remove redundant width/height attributes, promoting consistency and better practice with Tailwind CSS.
const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const NutriIcon = () => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);
const FeedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);
const ClubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V22h4v-7.34"/><path d="M12 14.66L17.5 9H6.5L12 14.66z"/></svg>
);
const PessoalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
// FIX: Applied a slight transform to visually center the send icon, which appeared off-center due to its asymmetrical shape.
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transform -translate-x-px translate-y-px"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);


const BottomNavBar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void; }) => {
    const navItems = [
        { id: 'Início', icon: <HomeIcon /> },
        { id: 'Nutri', icon: <NutriIcon /> },
        { id: 'Feed', icon: <FeedIcon /> },
        { id: 'Club', icon: <ClubIcon /> },
        { id: 'Pessoal', icon: <PessoalIcon /> },
        { id: 'Perfil', icon: <SettingsIcon /> },
    ];

    return (
        <nav className="fixed bottom-6 left-6 right-6 z-50">
            <div className="flex items-center justify-around bg-[#2A2A2C]/80 backdrop-blur-lg border border-neutral-700/60 rounded-full p-2 shadow-2xl w-full">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black/50 h-11 
                            ${activeTab === item.id ? 'bg-neutral-700/80 px-4' : 'w-11'}`}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`transition-colors duration-200 ${activeTab === item.id ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>
                                {item.icon}
                            </div>
                            {activeTab === item.id && (
                                <span className="text-white text-sm font-semibold whitespace-nowrap animate-fade-in">
                                    {item.id}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </nav>
    );
};

const App: React.FC = () => {
  const [screen, setScreen] = React.useState<Screen>('welcome');
  const [isExiting, setIsExiting] = React.useState(false);
  const [onboardingStep, setOnboardingStep] = React.useState(1);
  const [userData, setUserData] = React.useState(initialUserData);
  const [isContinueEnabled, setIsContinueEnabled] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Início');
  const [currentModality, setCurrentModality] = React.useState<string | null>(null);
  const [modalityIntro, setModalityIntro] = React.useState<string | null>(null);
  const [tipsModalData, setTipsModalData] = React.useState<{ name: string, tips: string } | null>(null);

  React.useEffect(() => {
    try {
        const savedProfile = localStorage.getItem('dreven_user_profile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            setUserData(profile);
            if (profile.dashboard_unlocked) {
                setScreen('dashboard');
            } else {
                setScreen('results');
            }
            return;
        }

        const savedProgress = localStorage.getItem('onboarding_progress');
        if (savedProgress) {
            const { userData: savedUserData, step } = JSON.parse(savedProgress);
            // Handle null values from older saves
            if (savedUserData.sleepHours === undefined) savedUserData.sleepHours = 7;
            if (savedUserData.waterIntake === undefined) savedUserData.waterIntake = 2;
            if (savedUserData.weight === undefined) savedUserData.weight = 70;
            if (savedUserData.height === undefined) savedUserData.height = 170;
            if (savedUserData.modalityFrequencies === undefined) savedUserData.modalityFrequencies = {};
            if (savedUserData.modalityPlans === undefined) savedUserData.modalityPlans = {};
            setUserData(savedUserData);
            setOnboardingStep(step);
            setScreen('onboarding');
        }
    } catch (error) {
        console.error("Falha ao carregar dados do localStorage", error);
        localStorage.removeItem('dreven_user_profile');
        localStorage.removeItem('onboarding_progress');
    }
  }, []);

  React.useEffect(() => {
    if (screen === 'onboarding') {
        try {
            const progress = { userData, step: onboardingStep };
            localStorage.setItem('onboarding_progress', JSON.stringify(progress));
        } catch (error) {
            console.error("Falha ao salvar o progresso do onboarding", error);
        }
    }
  }, [userData, onboardingStep, screen]);


  const navigate = (targetScreen: Screen) => {
      if (screen === targetScreen || isExiting) return;

      setIsExiting(true);
      setTimeout(() => {
          setScreen(targetScreen);
          setIsExiting(false);
      }, 300);
  };
  
  const handleBack = () => {
      if (screen === 'register' || screen === 'login') {
          navigate('welcome');
      } else if (screen === 'onboarding') {
          if (onboardingStep > 1) {
              setOnboardingStep(onboardingStep - 1);
          } else {
              navigate('register');
          }
      } else if (screen === 'workout' || screen === 'pre_workout' || screen === 'modalities_list' || screen === 'modality_workout') {
            navigate('dashboard');
      }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number' || type === 'range') {
        const numValue = value === '' ? '' : parseFloat(value);
        setUserData(prev => ({ ...prev, [name]: numValue }));
    } else {
        setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectCard = (field: keyof typeof userData, value: string) => {
    setUserData(prev => {
        const currentValue = prev[field] as string;
        // Toggle behavior: if the same value is clicked, clear it; otherwise, set the new value.
        const newValue = currentValue === value ? '' : value;
        return {...prev, [field]: newValue as any};
    });
  };

  const handleMultiSelectCard = (field: keyof typeof userData, value: string) => {
    setUserData(prev => {
        const currentValues = prev[field] as string[];
        let newValues: string[];

        if (field === 'modalities') {
            if (currentValues.includes(value)) {
                // Always allow deselecting
                newValues = currentValues.filter(v => v !== value);
                const newFrequencies = { ...prev.modalityFrequencies };
                delete newFrequencies[value];
                return { ...prev, modalities: newValues, modalityFrequencies: newFrequencies };

            } else if (currentValues.length < 5) {
                // Allow selecting if under the limit
                newValues = [...currentValues, value];
                 const newFrequencies = { ...prev.modalityFrequencies, [value]: '1x' };
                 return { ...prev, modalities: newValues, modalityFrequencies: newFrequencies };
            } else {
                // At limit, do not add new value
                return prev;
            }
        } else if (field === 'goals' || field === 'diet' || field === 'motivation') {
             // Single-select behavior: if it's already selected, deselect. Otherwise, make it the only selection.
             newValues = currentValues.includes(value) ? [] : [value];
        } else {
            // Default behavior for other multi-select fields
            newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
        }

        return {...prev, [field]: newValues as any};
    });
  };

  const handleFrequencyChange = (modality: string, frequency: string) => {
      setUserData(prev => ({
          ...prev,
          modalityFrequencies: {
              ...prev.modalityFrequencies,
              [modality]: frequency
          }
      }));
  };

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen navigate={navigate} />;
      case 'register':
        return <AuthScreen isRegister={true} navigate={navigate} handleInputChange={handleInputChange} userData={userData} setUserData={setUserData} />;
      case 'login':
        return <AuthScreen isRegister={false} navigate={navigate} handleInputChange={handleInputChange} userData={userData} setUserData={setUserData} />;
      case 'onboarding':
        return <OnboardingWizard 
                    step={onboardingStep} 
                    setStep={setOnboardingStep} 
                    navigate={navigate} 
                    userData={userData}
                    setUserData={setUserData}
                    handleInputChange={handleInputChange}
                    handleSelectCard={handleSelectCard}
                    handleMultiSelectCard={handleMultiSelectCard}
                    handleFrequencyChange={handleFrequencyChange}
                    isContinueEnabled={isContinueEnabled}
                    setIsContinueEnabled={setIsContinueEnabled}
                />;
      case 'results':
          return <ResultsScreen userData={userData} navigate={navigate} setUserData={setUserData} />;
      case 'dashboard_loading':
          return <DashboardLoadingScreen navigate={navigate} />;
      case 'dashboard':
          return <DashboardScreen userData={userData} navigate={navigate} setCurrentModality={setCurrentModality} setModalityIntro={setModalityIntro} />;
      case 'pre_workout':
          return <PreWorkoutScreen userData={userData} setUserData={setUserData} navigate={navigate} />;
      case 'workout':
          return <WorkoutScreen userData={userData} navigate={navigate} />;
      case 'coach_chat':
          return <CoachChatScreen userData={userData} navigate={navigate} />;
      case 'modalities_list':
// FIX: Removed the `setCurrentModality` prop as it is not defined in the `ModalitiesListScreen` component's props.
          return <ModalitiesListScreen userData={userData} navigate={navigate} setModalityIntro={setModalityIntro} />;
       case 'modality_workout':
          return <ModalityWorkoutScreen 
                    userData={userData} 
                    navigate={navigate} 
                    modalityName={currentModality} 
                    setUserData={setUserData} 
                    setTipsModalData={setTipsModalData}
                 />;
      default:
        return <WelcomeScreen navigate={navigate} />;
    }
  };

  const isDashboardScreen = ['dashboard', 'workout', 'pre_workout', 'coach_chat', 'modalities_list', 'modality_workout'].includes(screen);

  return (
    <div className={`relative h-screen w-full overflow-hidden bg-black ${isDashboardScreen ? 'font-inter bg-[#0A0A0A]' : 'font-poppins'}`}>
       {(screen === 'register' || screen === 'login' || screen === 'onboarding' || screen === 'workout' || screen === 'modalities_list' || screen === 'modality_workout' ) && !tipsModalData && (
            <button 
                onClick={handleBack} 
                className="absolute top-8 left-6 z-30 p-2 text-neutral-500 hover:text-white transition-colors"
                aria-label="Voltar"
            >
                <BackIcon />
            </button>
        )}
        
        {!isDashboardScreen && (
            <>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
                    filter: 'grayscale(100%)',
                    }}
                ></div>
                <div className={`absolute inset-0 transition-colors duration-500 ${
                    screen === 'welcome' 
                    ? 'bg-gradient-to-t from-black via-black/90 to-black/75' 
                    : 'bg-gradient-to-t from-black via-black/95 to-black/90'
                }`}></div>
            </>
        )}

      <div className={`relative z-10 text-white screen-container no-overscroll ${isExiting ? 'exiting' : ''} ${isDashboardScreen ? 'h-full overflow-y-auto' : 'flex h-screen flex-col items-center justify-center p-8'} transition-all duration-300 ${(modalityIntro || tipsModalData) ? 'blur-sm brightness-50' : ''}`}>
        {!isDashboardScreen && screen === 'welcome' && (
            <header className="absolute top-8 left-0 right-0 md:relative md:top-auto md:left-auto text-center">
                <span className="font-poppins text-2xl font-semibold tracking-tight text-neutral-100">Dreven</span>
            </header>
        )}
        <div className={`w-full ${isDashboardScreen ? '' : 'h-full flex flex-col items-center justify-center'}`}>
          {renderScreen()}
        </div>
      </div>
      {modalityIntro && (
        <ModalityIntroModal 
            modalityName={modalityIntro}
            userData={userData}
            setUserData={setUserData}
            onClose={() => setModalityIntro(null)}
            onStart={() => {
                setCurrentModality(modalityIntro);
                navigate('modality_workout');
                setModalityIntro(null);
            }}
        />
      )}
      {tipsModalData && (
        <ModalityTipsModal
            modalityName={tipsModalData.name}
            tips={tipsModalData.tips}
            onClose={() => setTipsModalData(null)}
            navigate={navigate}
        />
      )}
       {isDashboardScreen && !['pre_workout', 'workout', 'coach_chat', 'modalities_list', 'modality_workout'].includes(screen) && !modalityIntro && <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

const WelcomeScreen = ({ navigate }: { navigate: (screen: Screen) => void }) => (
  <main className="flex h-full w-full flex-col items-center justify-end text-center md:justify-center">
    <div className="w-full max-w-sm md:max-w-md">
      <h1 className="font-poppins mb-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-100 md:text-4xl lg:text-5xl">
        Bem-vindo, ao{' '}
        <span className="font-poppins font-semibold tracking-tight text-stone-200">Dreven.</span>
      </h1>
      <p className="font-poppins mb-10 text-sm leading-relaxed text-neutral-400 md:text-base">
        Train, Nourish, and Transform your Potential — with specialists, in a single ecosystem.
      </p>
      <div className="mb-8 space-y-4">
        <button onClick={() => navigate('register')} className="font-poppins w-full rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30">
          Junte-se ao club
        </button>
        <button onClick={() => navigate('login')} className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:bg-white/10">
          Entrar
        </button>
      </div>
      <p className="font-poppins mb-6 text-center text-[9px] text-neutral-500 md:text-xs">
        Ao continuar, você concorda com nossos{' '}
        <a href="#" className="text-neutral-300 underline hover:text-white">Termos</a> e{' '}
        <a href="#" className="text-neutral-300 underline hover:text-white">Política de Privacidade</a>.
      </p>
    </div>
  </main>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
);


const AuthScreen = ({ isRegister, navigate, handleInputChange, userData, setUserData }: { 
    isRegister: boolean; 
    navigate: (screen: Screen) => void; 
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    userData: typeof initialUserData; 
    setUserData: React.Dispatch<React.SetStateAction<typeof initialUserData>>;
}) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister) {
            navigate('onboarding');
        } else {
            if (userData.email === 'santsme@hotmail.com' && userData.password === 'daniel1010') {
                const userProfile = {
                    ...initialUserData,
                    name: 'Daniel Santos',
                    email: 'santsme@hotmail.com',
                    password: 'daniel1010',
                    age: '28',
                    gender: 'male',
                    weight: 80,
                    height: 180,
                    experienceLevel: 'intermediate',
                    trainingDays: '3-4',
                    equipment: 'full_gym',
                    modalities: ['Muay Thai', 'Corrida', 'Funcional'],
                    modalityFrequencies: { 'Muay Thai': '3x', 'Corrida': '2x', 'Funcional': '1x' },
                    goals: ['Hipertrofia'],
                    diet: ['Nenhuma'],
                    motivation: ['Estética'],
                    bodyType: 'mesomorph',
                    sleepHours: 8,
                    waterIntake: 3,
                    inspirations: ['CBum', 'Ramon Dino'],
                    customInspirations: '',
                    trainer: {
                        name: 'Lucas Rezende'
                    },
                     workoutPlan: {
                        planName: "Força Essencial",
                        planFocus: "Ganhe massa muscular e defina seu corpo com treinos de força e cardio inteligente.",
                        detailedWeeklySplit: [
                            { dayOfWeek: "Segunda-feira", dayTitle: "Costas & Bíceps", isRestDay: false, exercises: [{ name: 'Barra Fixa (ou Puxador Frontal)', sets: 4, reps: 'Falha', rest: 75 }, { name: 'Remada Curvada com Barra', sets: 4, reps: '8-12', rest: 75 }, { name: 'Puxada Unilateral no Cross', sets: 3, reps: '12-15', rest: 60 }, { name: 'Rosca Direta com Barra', sets: 3, reps: '10-12', rest: 60 }, { name: 'Rosca Martelo com Halteres', sets: 3, reps: '12-15', rest: 60 }] },
                            { dayOfWeek: "Terça-feira", dayTitle: "Peito, Ombros & Tríceps", isRestDay: false, exercises: [{ name: 'Supino Reto com Barra', sets: 4, reps: '8-12', rest: 60 }, { name: 'Desenvolvimento com Halteres', sets: 3, reps: '10-15', rest: 60 }, { name: 'Supino Inclinado com Halteres', sets: 3, reps: '10-12', rest: 60 }, { name: 'Elevação Lateral', sets: 4, reps: '12-15', rest: 45 }, { name: 'Tríceps na Polia', sets: 3, reps: '12-15', rest: 45 }] },
                            { dayOfWeek: "Quarta-feira", dayTitle: "Descanso", isRestDay: true, exercises: [] },
                            { dayOfWeek: "Quinta-feira", dayTitle: "Pernas & Panturrilhas", isRestDay: false, exercises: [{ name: 'Agachamento Livre', sets: 4, reps: '8-12', rest: 90 }, { name: 'Leg Press 45', sets: 3, reps: '10-15', rest: 75 }, { name: 'Cadeira Extensora', sets: 3, reps: '12-15', rest: 60 }, { name: 'Stiff com Barra', sets: 3, reps: '10-12', rest: 75 }, { name: 'Panturrilha em Pé', sets: 4, reps: '15-20', rest: 45 }] },
                            { dayOfWeek: "Sexta-feira", dayTitle: "Descanso", isRestDay: true, exercises: [] },
                            { dayOfWeek: "Sábado", dayTitle: "Corrida Leve (Ativo)", isRestDay: true, exercises: [] },
                            { dayOfWeek: "Domingo", dayTitle: "Descanso", isRestDay: true, exercises: [] }
                        ]
                    },
                    modalityPlans: {},
                    dashboard_unlocked: true,
                };
                setUserData(userProfile);
                try {
                    localStorage.setItem('dreven_user_profile', JSON.stringify(userProfile));
                } catch (error) {
                    console.error("Falha ao salvar o perfil do usuário", error);
                }
                navigate('dashboard');
            } else {
                alert('Credenciais inválidas.');
            }
        }
    };

    return (
        <main className="flex h-full flex-col items-center justify-center text-center">
            <div className="w-full max-w-sm md:max-w-md">
                <h1 className="font-poppins mb-8 text-3xl font-semibold leading-tight tracking-tight text-neutral-100">
                    {isRegister ? 'Crie sua conta' : 'Acesse sua conta'}
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {isRegister && (
                        <input type="text" name="name" onChange={handleInputChange} placeholder="Nome completo" required className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 px-6 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-white/50" />
                    )}
                    <input type="email" name="email" onChange={handleInputChange} placeholder="E-mail" required className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 px-6 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-white/50" />
                    <div className="relative">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="password" 
                            onChange={handleInputChange} 
                            placeholder="Senha" 
                            minLength={8} 
                            required 
                            className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 pl-6 pr-12 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-white/50" 
                        />
                        <button 
                            type="button" 
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 hover:text-neutral-200"
                            aria-label={passwordVisible ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    
                    {!isRegister && (
                         <div className="text-right -mt-2 mb-2">
                            <button type="button" className="text-sm font-medium text-neutral-400 underline hover:text-white">
                                Esqueceu a senha?
                            </button>
                        </div>
                    )}

                    <div className={isRegister ? "pt-4" : "pt-0"}>
                        <button type="submit" className="font-poppins w-full rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30">
                            {isRegister ? 'Criar conta' : 'Entrar'}
                        </button>
                    </div>
                </form>
                 <p className="font-poppins mt-6 text-center text-sm text-neutral-400">
                    {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'} {' '}
                    <button onClick={() => navigate(isRegister ? 'login' : 'register')} className="font-semibold text-neutral-200 underline hover:text-white">
                        {isRegister ? 'Entrar' : 'Crie uma'}
                    </button>
                </p>
            </div>
        </main>
    );
};

const ModalitiesModal = ({ isOpen, onClose, userData, handleMultiSelectCard }: { isOpen: boolean; onClose: () => void; userData: any; handleMultiSelectCard: (field: string, value: string) => void; }) => {
    if (!isOpen) return null;
    const isSelectionDisabled = userData.modalities.length >= 5;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#1C1C1E] rounded-2xl p-6 w-full max-w-md max-h-[80vh] flex flex-col border border-white/10 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Mais Opções de Modalidades</h3>
                <div className="overflow-y-auto space-y-2 pr-2 -mr-2">
                    {allModalities.map(modality => (
                        <button 
                            key={modality} 
                            onClick={() => handleMultiSelectCard('modalities', modality)}
                            disabled={isSelectionDisabled && !userData.modalities.includes(modality)}
                            className={`w-full text-left p-3 rounded-lg transition-colors text-sm ${
                                userData.modalities.includes(modality) 
                                ? 'bg-white/20 text-white font-semibold' 
                                : 'bg-white/5 text-neutral-300'
                            } ${
                                (isSelectionDisabled && !userData.modalities.includes(modality))
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/10'
                            }`}
                        >
                            {modality}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="mt-6 font-poppins w-full rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30">
                    Confirmar
                </button>
            </div>
        </div>
    );
};

const GoalsModal = ({ isOpen, onClose, userData, handleMultiSelectCard }: { isOpen: boolean; onClose: () => void; userData: any; handleMultiSelectCard: (field: string, value: string) => void; }) => {
    if (!isOpen) return null;
    const isGoalSelected = userData.goals.length > 0;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#1C1C1E] rounded-2xl p-6 w-full max-w-md max-h-[80vh] flex flex-col border border-white/10 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Mais Opções de Objetivos</h3>
                <div className="overflow-y-auto space-y-2 pr-2 -mr-2">
                    {allGoals.map(goal => (
                        <button 
                            key={goal} 
                            onClick={() => handleMultiSelectCard('goals', goal)}
                            disabled={isGoalSelected && !userData.goals.includes(goal)}
                            className={`w-full text-left p-3 rounded-lg transition-colors text-sm ${
                                userData.goals.includes(goal) ? 'bg-white/20 text-white font-semibold' : 'bg-white/5 text-neutral-300'
                            } ${
                                (isGoalSelected && !userData.goals.includes(goal)) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
                            }`}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="mt-6 font-poppins w-full rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30">
                    Confirmar
                </button>
            </div>
        </div>
    );
};


const OnboardingWizard = ({ step, setStep, navigate, userData, setUserData, handleInputChange, handleSelectCard, handleMultiSelectCard, handleFrequencyChange, isContinueEnabled, setIsContinueEnabled }: any) => {
    const totalSteps = 12;
    const [isModalitiesModalOpen, setIsModalitiesModalOpen] = React.useState(false);
    const [isGoalsModalOpen, setIsGoalsModalOpen] = React.useState(false);

    const isStepComplete = React.useMemo(() => {
        switch (step) {
            case 1:
                return userData.age && userData.gender;
            case 2:
                // This step's completion is handled by isContinueEnabled state
                return isContinueEnabled;
            case 3:
                return userData.experienceLevel && userData.trainingDays;
            case 4:
                return userData.equipment;
            case 5:
                return userData.modalities.length > 0;
            case 6:
                return userData.goals.length > 0;
            case 7:
                return userData.diet.length > 0;
            case 8:
                return userData.motivation.length > 0;
            case 9:
                return userData.bodyType;
            case 10:
                // This step's completion is handled by isContinueEnabled state
                return isContinueEnabled;
            case 11:
                // This step's completion is handled by isContinueEnabled state
                return isContinueEnabled;
            case 12:
                return userData.inspirations.length > 0 || userData.customInspirations.trim() !== '';
            default:
                return false;
        }
    }, [step, userData, isContinueEnabled]);

    React.useEffect(() => {
        // Reset the interaction-based continue button for relevant steps
        if (step === 2 || step === 10 || step === 11) {
            setIsContinueEnabled(false);
        }
    }, [step]);


    const nextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Select a trainer before navigating away
            const assignedTrainersStr = localStorage.getItem('dreven_assigned_trainers') || '[]';
            const assignedTrainers: string[] = JSON.parse(assignedTrainersStr);
            const availableTrainers = ALL_TRAINERS.filter(t => !assignedTrainers.includes(t.name));
            const trainerPool = availableTrainers.length > 0 ? availableTrainers : ALL_TRAINERS;
            
            const getDeterministicIndex = (str: string, max: number) => {
                if (!str) return Math.floor(Math.random() * max);
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    const char = str.charCodeAt(i);
                    hash = (hash << 5) - hash + char;
                    hash |= 0;
                }
                return Math.abs(hash) % max;
            };

            const trainerIndex = getDeterministicIndex(userData.email || userData.name, trainerPool.length);
            const selectedTrainerData = trainerPool[trainerIndex];
            
            const updatedUserData = { ...userData, trainer: { name: selectedTrainerData.name } };
            setUserData(updatedUserData);

            try {
                // Clear onboarding progress but save the updated user data for the next screen
                const progress = { userData: updatedUserData, step: 13 }; // Use a step beyond max to not re-enter onboarding
                localStorage.setItem('onboarding_progress', JSON.stringify(progress));
                localStorage.removeItem('onboarding_progress'); // This seems redundant but ensures cleanup
            } catch (error) {
                console.error("Falha ao atualizar o progresso do onboarding", error);
            }
            navigate('results');
        }
    };
    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        else navigate('register');
    }

    const renderStepContent = () => {
        const isWeightSet = !!userData.weight && userData.weight > 0;
        const isExperienceSet = !!userData.experienceLevel;
        const isAgeSet = !!userData.age && userData.age > 0;

        switch (step) {
            case 1: return <Step1 userData={userData} handleInputChange={handleInputChange} handleSelectCard={handleSelectCard} isGenderDisabled={!isAgeSet} />;
            case 2: return <Step2 userData={userData} setUserData={setUserData} isHeightDisabled={!isWeightSet} onInteraction={() => setIsContinueEnabled(true)} />;
            case 3: return <Step3 userData={userData} handleSelectCard={handleSelectCard} isTrainingDaysDisabled={!isExperienceSet} />;
            case 4: return <Step4 userData={userData} handleSelectCard={handleSelectCard} />;
            case 5: return <Step5 userData={userData} handleMultiSelectCard={handleMultiSelectCard} handleFrequencyChange={handleFrequencyChange} setIsModalOpen={setIsModalitiesModalOpen} />;
            case 6: return <Step6 userData={userData} handleMultiSelectCard={handleMultiSelectCard} setIsModalOpen={setIsGoalsModalOpen} />;
            case 7: return <Step7 userData={userData} handleMultiSelectCard={handleMultiSelectCard} />;
            case 8: return <Step8 userData={userData} handleMultiSelectCard={handleMultiSelectCard} />;
            case 9: return <Step9 userData={userData} handleSelectCard={handleSelectCard} />;
            case 10: return <Step10 userData={userData} handleInputChange={handleInputChange} onInteraction={() => setIsContinueEnabled(true)} />;
            case 11: return <Step11 userData={userData} handleInputChange={handleInputChange} onInteraction={() => setIsContinueEnabled(true)} />;
            case 12: return <Step12 userData={userData} handleMultiSelectCard={handleMultiSelectCard} handleInputChange={handleInputChange}/>;
            default: return null;
        }
    };

    return (
        <main className="flex h-full w-full flex-col items-center justify-center text-center">
            <ModalitiesModal isOpen={isModalitiesModalOpen} onClose={() => setIsModalitiesModalOpen(false)} userData={userData} handleMultiSelectCard={handleMultiSelectCard} />
            <GoalsModal isOpen={isGoalsModalOpen} onClose={() => setIsGoalsModalOpen(false)} userData={userData} handleMultiSelectCard={handleMultiSelectCard} />
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <div className="relative h-1 w-full rounded-full bg-white/10">
                        <div className="absolute h-1 rounded-full bg-white transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                    </div>
                </div>
                <div key={step} className="step-container">
                  {renderStepContent()}
                </div>
                <div className="mt-10 flex w-full gap-4">
                    <button onClick={prevStep} className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:bg-white/10">
                        Voltar
                    </button>
                    <button onClick={nextStep} disabled={!isStepComplete} className="font-poppins w-full rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed">
                        {step === totalSteps ? 'Finalizar' : 'Continuar'}
                    </button>
                </div>
            </div>
        </main>
    );
};

const OnboardingStep: React.FC<{title: string; description: string; children: React.ReactNode}> = ({ title, description, children }) => (
    <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-neutral-100">{title}</h2>
        <p className="mt-2 mb-8 max-w-xs text-sm text-neutral-400">{description}</p>
        {children}
    </div>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const SelectableCard: React.FC<{label?: string; isSelected: boolean; onClick: () => void; children?: React.ReactNode; align?: 'center' | 'start'; disabled?: boolean}> = ({ label, isSelected, onClick, children, align = 'center', disabled = false }) => (
    <button onClick={onClick} disabled={disabled} className={`w-full h-full rounded-2xl border ${isSelected ? 'border-white/50 bg-white/20' : 'border-white/10 bg-white/5'} p-4 text-neutral-200 backdrop-blur-sm transition-all flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}>
        {children || label}
    </button>
);

const SegmentedControl: React.FC<{
    options: { label: string; value: string }[];
    selectedValue: string;
    onSelect: (value: string) => void;
    disabled?: boolean;
}> = ({ options, selectedValue, onSelect, disabled = false }) => (
    <div className={`flex w-full rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {options.map(({ label, value }) => (
            <button
                key={value}
                onClick={() => onSelect(value)}
                disabled={disabled}
                className={`flex-1 rounded-full py-2.5 px-2 text-sm font-medium transition-colors focus:outline-none ${
                    selectedValue === value
                        ? 'bg-white/20 text-neutral-100 shadow-md'
                        : 'text-neutral-400 hover:bg-white/10'
                } disabled:cursor-not-allowed`}
            >
                {label}
            </button>
        ))}
    </div>
);

const Step1 = ({ userData, handleInputChange, handleSelectCard, isGenderDisabled }: any) => {
    return (
        <OnboardingStep title="Primeiro, sobre você" description="Essas informações nos ajudam a personalizar sua experiência desde o início.">
            <div className="w-full space-y-6">
                <div className="text-left">
                    <label className="mb-2 block text-sm font-medium text-neutral-300">Idade</label>
                    <div className="relative">
                        <input type="number" name="age" value={userData.age} onChange={handleInputChange} placeholder="Ex: 20" className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 px-6 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-white/50" />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">anos</span>
                    </div>
                </div>
                <div className="text-left">
                    <label className="mb-2 block text-sm font-medium text-neutral-300">Gênero</label>
                    <SegmentedControl
                        options={[
                            { label: 'Masculino', value: 'male' },
                            { label: 'Feminino', value: 'female' },
                        ]}
                        selectedValue={userData.gender}
                        onSelect={(value) => handleSelectCard('gender', value)}
                        disabled={isGenderDisabled}
                    />
                </div>
            </div>
        </OnboardingStep>
    );
};

const StepperButton: React.FC<{ children: React.ReactNode; onClick: () => void; disabled?: boolean }> = ({ children, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {children}
    </button>
);

const MetricInput: React.FC<{
    label: string;
    value: number | string;
    unit: string;
    onIncrement: () => void;
    onDecrement: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    disabled?: boolean;
}> = ({ label, value, unit, onIncrement, onDecrement, onChange, onBlur, name, disabled = false }) => (
    <div className={`text-center transition-opacity ${disabled ? 'opacity-50' : ''}`}>
        <label className="block text-sm font-medium text-neutral-300">{label}</label>
        <div className="mt-2 flex items-center justify-center gap-4">
            <StepperButton onClick={onDecrement} disabled={disabled}>-</StepperButton>
            <div className="relative w-36">
                <input
                    type="text"
                    inputMode="decimal"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    className="w-full bg-transparent text-center text-3xl font-semibold text-white focus:outline-none appearance-none focus:bg-white/10 rounded-xl px-4 py-1 transition-colors disabled:cursor-not-allowed"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-normal text-neutral-400 pointer-events-none">{unit}</span>
            </div>
            <StepperButton onClick={onIncrement} disabled={disabled}>+</StepperButton>
        </div>
    </div>
);


const Step2 = ({ userData, setUserData, isHeightDisabled, onInteraction }: any) => {
    const limits = {
        weight: { min: 30, max: 200 },
        height: { min: 130, max: 230 },
    };

    const [weightInput, setWeightInput] = React.useState(String(userData.weight || ''));
    const [heightInput, setHeightInput] = React.useState(userData.height ? (userData.height / 100).toFixed(2) : '');
    
    React.useEffect(() => {
        // Pre-populate if not already set by user interaction
        if (userData.weight !== null) setWeightInput(String(userData.weight));
        else setWeightInput('70');

        if (userData.height !== null) setHeightInput((userData.height / 100).toFixed(2));
        else setHeightInput('1.70');
    }, []);


    const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/[^0-9.,]/g, '');
        if (name === 'weight') {
            setWeightInput(sanitizedValue);
        } else {
            setHeightInput(sanitizedValue);
        }
        onInteraction();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onInteraction();
        const { name } = e.target;
        const isWeight = name === 'weight';
        const { min, max } = isWeight ? limits.weight : limits.height;
        const localValue = isWeight ? weightInput : heightInput;

        let numericValue = parseFloat(String(localValue).replace(',', '.'));

        if (isNaN(numericValue)) {
            numericValue = isWeight ? min : min / 100;
        }

        if (isWeight) {
            const clampedValue = Math.max(min, Math.min(max, numericValue));
            setUserData((prev: any) => ({ ...prev, weight: clampedValue }));
            setWeightInput(String(clampedValue));
        } else {
            const valueInCm = numericValue * 100;
            const clampedValueInCm = Math.max(min, Math.min(max, valueInCm));
            const finalHeight = Math.round(clampedValueInCm);
            setUserData((prev: any) => ({ ...prev, height: finalHeight }));
            setHeightInput((finalHeight / 100).toFixed(2));
        }
    };
    
    const updateMetric = (metric: 'weight' | 'height', delta: number) => {
        onInteraction();
        const { min, max } = limits[metric];
        setUserData((prev: any) => {
            let currentValue = metric === 'weight' ? parseFloat(weightInput.replace(',', '.')) : parseFloat(heightInput.replace(',', '.')) * 100;
            
            if (isNaN(currentValue)) {
                 currentValue = metric === 'weight' ? 70 : 170;
            } else if (metric === 'height') {
                // value is already in cm
            }
            
            const newValue = Math.min(max, Math.max(min, currentValue + delta));

            if (metric === 'weight') {
                setWeightInput(String(newValue));
                return { ...prev, weight: newValue };
            } else {
                setHeightInput((newValue / 100).toFixed(2));
                return { ...prev, height: newValue };
            }
        });
    };

    return (
        <OnboardingStep title="Suas métricas" description="Ajuste seu peso e altura. Isso é fundamental para os cálculos.">
            <div className="w-full space-y-8">
                <MetricInput
                    label="Peso"
                    value={weightInput}
                    unit="kg"
                    onIncrement={() => updateMetric('weight', 1)}
                    onDecrement={() => updateMetric('weight', -1)}
                    onChange={handleLocalChange}
                    onBlur={handleBlur}
                    name="weight"
                />
                <MetricInput
                    label="Altura"
                    value={heightInput}
                    unit="m"
                    onIncrement={() => updateMetric('height', 1)}
                    onDecrement={() => updateMetric('height', -1)}
                    onChange={handleLocalChange}
                    onBlur={handleBlur}
                    name="height"
                    disabled={isHeightDisabled}
                />
            </div>
        </OnboardingStep>
    );
};

const Step3 = ({ userData, handleSelectCard, isTrainingDaysDisabled }: any) => {
    const experienceOptions = [
        { label: 'Iniciante', value: 'beginner' },
        { label: 'Intermediário', value: 'intermediate' },
        { label: 'Avançado', value: 'advanced' },
    ];

    const trainingDaysOptions = [
        { label: '1-2 dias', value: '1-2' },
        { label: '3-4 dias', value: '3-4' },
        { label: '5+ dias', value: '5+' },
    ];

    return (
        <OnboardingStep title="Sua rotina de treino" description="Como você descreveria seu nível de experiência e quantos dias planeja treinar?">
            <div className="w-full space-y-8">
                <div>
                    <label className="mb-3 block text-sm font-medium text-neutral-300">Nível de Experiência</label>
                    <SegmentedControl
                        options={experienceOptions}
                        selectedValue={userData.experienceLevel}
                        onSelect={(value) => handleSelectCard('experienceLevel', value)}
                    />
                </div>
                <div>
                    <label className="mb-3 block text-sm font-medium text-neutral-300">Dias de Musculação por Semana</label>
                    <SegmentedControl
                        options={trainingDaysOptions}
                        selectedValue={userData.trainingDays}
                        onSelect={(value) => handleSelectCard('trainingDays', value)}
                        disabled={isTrainingDaysDisabled}
                    />
                </div>
            </div>
        </OnboardingStep>
    );
};

const Step4 = ({ userData, handleSelectCard }: any) => {
    const equipmentOptions = [
        { label: 'Academia', value: 'full_gym' },
        { label: 'Em Casa', value: 'home_gym' },
        { label: 'Ambos', value: 'both' },
    ];
    return(
        <OnboardingStep title="Seu equipamento" description="Onde você treina? Isso nos ajuda a montar um plano que se encaixa na sua realidade.">
            <div className="w-full">
                 <SegmentedControl
                    options={equipmentOptions}
                    selectedValue={userData.equipment}
                    onSelect={(value) => handleSelectCard('equipment', value)}
                />
            </div>
        </OnboardingStep>
    );
};

const Step5 = ({ userData, handleMultiSelectCard, handleFrequencyChange, setIsModalOpen }: any) => {
    const modalities = ['Muay Thai', 'Boxe', 'Corrida', 'Pilates', 'Yoga'];
    const isSelectionDisabled = userData.modalities.length >= 5;

    const DownArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
    );

    return (
        <OnboardingStep title="Modalidades" description="Além da musculação, você pratica outras atividades? Selecione até 5 opções.">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                {modalities.map(modality => (
                    <div key={modality} className="flex flex-col gap-2">
                        <SelectableCard 
                            label={modality} 
                            isSelected={userData.modalities.includes(modality)} 
                            onClick={() => handleMultiSelectCard('modalities', modality)}
                            disabled={isSelectionDisabled && !userData.modalities.includes(modality)}
                        />
                         {userData.modalities.includes(modality) && (
                            <div className="relative animate-fade-in">
                                <select
                                    value={userData.modalityFrequencies[modality] || '1x'}
                                    onChange={(e) => handleFrequencyChange(modality, e.target.value)}
                                    className="w-full text-center appearance-none bg-white/5 border border-white/10 rounded-xl py-2 pl-4 pr-8 text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                                >
                                    <option value="1x">1x / semana</option>
                                    <option value="2x">2x / semana</option>
                                    <option value="3x">3x / semana</option>
                                    <option value="4x">4x / semana</option>
                                    <option value="5x">5x / semana</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                                    <DownArrowIcon />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                 <div className="flex flex-col gap-2">
                    <SelectableCard isSelected={false} onClick={() => setIsModalOpen(true)} disabled={isSelectionDisabled}>
                        <PlusIcon />
                        <span>Opções</span>
                    </SelectableCard>
                </div>
            </div>
        </OnboardingStep>
    );
};

const Step6 = ({ userData, handleMultiSelectCard, setIsModalOpen }: any) => {
    const goals = ['Hipertrofia', 'Ganho de massa', 'Definição muscular', 'Perder gordura', 'Aumentar força'];
    const isGoalSelected = userData.goals.length > 0;
    return (
        <OnboardingStep title="Seu objetivo principal" description="O que você mais deseja alcançar? Escolha sua maior prioridade.">
             <div className="grid grid-cols-2 gap-4 w-full">
                {goals.map(goal => (
                    <SelectableCard 
                        key={goal} 
                        label={goal} 
                        isSelected={userData.goals.includes(goal)} 
                        onClick={() => handleMultiSelectCard('goals', goal)}
                        disabled={isGoalSelected && !userData.goals.includes(goal)}
                    />
                ))}
                <SelectableCard isSelected={false} onClick={() => setIsModalOpen(true)} disabled={isGoalSelected}>
                    <PlusIcon />
                    <span>Opções</span>
                </SelectableCard>
            </div>
        </OnboardingStep>
    );
};

const Step7 = ({ userData, handleMultiSelectCard }: any) => {
    const diets = ['Nenhuma', 'Vegetariana', 'Vegana', 'Low Carb', 'Jejum Intermitente', 'Sem Glúten'];
    const isDietSelected = userData.diet.length > 0;

    return (
        <OnboardingStep title="Sua alimentação" description="Você segue alguma dieta ou restrição alimentar específica? Escolha sua principal opção.">
            <div className="grid grid-cols-2 gap-4 w-full">
                {diets.map(diet => (
                    <SelectableCard
                        key={diet}
                        label={diet}
                        isSelected={userData.diet.includes(diet)}
                        onClick={() => handleMultiSelectCard('diet', diet)}
                        disabled={isDietSelected && !userData.diet.includes(diet)}
                    />
                ))}
            </div>
        </OnboardingStep>
    );
};

const Step8 = ({ userData, handleMultiSelectCard }: any) => {
    const motivations = ['Saúde e bem-estar', 'Estética', 'Performance', 'Aliviar estresse'];
    const isMotivationSelected = userData.motivation.length > 0;
    return (
        <OnboardingStep title="O que te motiva a treinar?" description="Saber sua motivação nos ajuda a manter o foco. Escolha sua principal motivação.">
            <div className="grid grid-cols-2 gap-4 w-full">
                {motivations.map(item => (
                    <SelectableCard 
                        key={item} 
                        label={item} 
                        isSelected={userData.motivation.includes(item)} 
                        onClick={() => handleMultiSelectCard('motivation', item)}
                        disabled={isMotivationSelected && !userData.motivation.includes(item)}
                    />
                ))}
            </div>
        </OnboardingStep>
    );
};

const Step9 = ({ userData, handleSelectCard }: any) => {
    const bodyTypes = [
        { value: 'ectomorph', label: 'Naturalmente Magro(a)', description: 'Tenho dificuldade para ganhar peso, seja músculo ou gordura.' },
        { value: 'mesomorph', label: 'Naturalmente Atlético(a)', description: 'Ganho músculos com facilidade e tenho uma boa estrutura óssea.' },
        { value: 'endomorph', label: 'Naturalmente Robusto(a)', description: 'Tenho mais facilidade para ganhar peso e acumular gordura.' },
    ];
    const isBodyTypeSelected = !!userData.bodyType;
    return (
        <OnboardingStep title="Como você descreveria seu corpo?" description="Escolha a opção que melhor representa sua estrutura corporal e metabolismo.">
            <div className="w-full space-y-4">
                {bodyTypes.map(type => (
                    <SelectableCard 
                        key={type.value} 
                        isSelected={userData.bodyType === type.value} 
                        onClick={() => handleSelectCard('bodyType', type.value)}
                        align="start"
                        disabled={isBodyTypeSelected && userData.bodyType !== type.value}
                    >
                         <div className="text-left">
                            <p className="font-semibold">{type.label}</p>
                            <p className="text-xs text-neutral-400 font-normal">{type.description}</p>
                        </div>
                    </SelectableCard>
                ))}
            </div>
        </OnboardingStep>
    );
};

const RangeSlider: React.FC<{
    label: string;
    value: number | null | undefined;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    onInteraction?: () => void;
}> = ({ label, value, min, max, step, unit, onChange, name, onInteraction }) => (
    <div className="w-full">
        <div className="flex justify-between items-baseline mb-3 px-1">
            <label className="text-sm font-medium text-neutral-300">{label}</label>
            <span className="text-xl font-semibold text-white">{(value ?? min).toFixed(step === 0.1 ? 1 : 0)} <span className="text-base font-normal text-neutral-400">{unit}</span></span>
        </div>
        <input
            type="range"
            name={name}
            value={value ?? min}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
                onChange(e);
                if(onInteraction) onInteraction();
            }}
        />
    </div>
);

const Step10 = ({ userData, handleInputChange, onInteraction }: any) => (
    <OnboardingStep title="Qualidade do sono" description="Quantas horas de sono você costuma ter por noite?">
        <RangeSlider
            label="Horas de Sono"
            name="sleepHours"
            value={userData.sleepHours}
            min={4}
            max={12}
            step={0.5}
            unit="horas"
            onChange={handleInputChange}
            onInteraction={onInteraction}
        />
    </OnboardingStep>
);

const Step11 = ({ userData, handleInputChange, onInteraction }: any) => (
    <OnboardingStep title="Sua hidratação" description="Qual é a sua ingestão diária de água, em média?">
        <RangeSlider
            label="Ingestão de Água"
            name="waterIntake"
            value={userData.waterIntake}
            min={0.5}
            max={6}
            step={0.1}
            unit="litros"
            onChange={handleInputChange}
            onInteraction={onInteraction}
        />
    </OnboardingStep>
);

const Step12 = ({ userData, handleMultiSelectCard, handleInputChange }: any) => {
    const inspirations = ['Renato Cariani', 'Paulo Muzy', 'CBum', 'Arnold', 'Ronnie Coleman', 'Ramon Dino'];
    return (
        <OnboardingStep title="Suas inspirações" description="Quem te motiva na jornada fitness? Selecione ou adicione seus ídolos.">
            <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {inspirations.map(name => (
                        <SelectableCard key={name} label={name} isSelected={userData.inspirations.includes(name)} onClick={() => handleMultiSelectCard('inspirations', name)} />
                    ))}
                </div>
                <input type="text" name="customInspirations" value={userData.customInspirations} onChange={handleInputChange} placeholder="Outros, separados por vírgula" className="font-poppins w-full rounded-3xl border border-white/10 bg-white/5 py-3 px-6 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-white/50" />
            </div>
        </OnboardingStep>
    );
};

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MetricDetail = ({ title, value, unit, children, className = '' }: React.PropsWithChildren<{title: string; value?: any; unit?: string; className?: string}>) => (
    <div className={`p-4 rounded-xl border border-white/10 ${className}`}>
        <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-base font-medium text-neutral-300">{title}</h3>
            {value && <p className="text-2xl font-semibold text-white">{value} <span className="text-base font-normal text-neutral-400">{unit}</span></p>}
        </div>
        {children && <p className="mt-1 text-sm text-neutral-400 leading-relaxed text-left">
            {children}
        </p>}
    </div>
);


const ResultsDetailModal = ({ onClose, userData, calculations } : {onClose: () => void, userData: any, calculations: any}) => {
    const bodyTypeMap: {[key: string]: {name: string, description: string}} = {
        ectomorph: { name: 'Ectomorfo', description: 'Seu biotipo indica um metabolismo naturalmente acelerado, o que pode tornar o ganho de massa muscular um desafio. Nosso plano irá focar em treinos de força eficientes e uma nutrição estratégica com superávit calórico para garantir que você construa músculos de forma sólida.' },
        mesomorph: { name: 'Mesomorfo', description: 'Seu biotipo atlético natural é uma grande vantagem, permitindo que você ganhe músculos e perca gordura com relativa facilidade. O plano será desenhado para otimizar essa genética, focando em treinos variados para hipertrofia e definição, junto com uma dieta balanceada para maximizar seus resultados.' },
        endomorph: { name: 'Endomorfo', description: 'Seu biotipo tende a ter um metabolismo mais lento, facilitando o ganho de peso. Isso não é uma desvantagem, mas um ponto de atenção! Nosso plano combinará treinos de musculação com cardiovasculares para acelerar seu metabolismo e uma dieta com controle calórico para queimar gordura e construir uma base muscular forte.' },
    };
    const bodyTypeInfo = bodyTypeMap[userData.bodyType];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#1C1C1E] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] flex flex-col border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-semibold text-white">Sua Análise Detalhada</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"><CloseIcon /></button>
                </div>
                <div className="overflow-y-auto pr-2 -mr-4 space-y-4">
                    {bodyTypeInfo && (
                        <MetricDetail title="Seu Biotipo Corporal" value={bodyTypeInfo.name} className="bg-white/10 border-l-4 border-green-400">
                             {bodyTypeInfo.description}
                        </MetricDetail>
                    )}
                    <MetricDetail title="Índice de Massa Corporal (IMC)" value={calculations.bmi} className="bg-white/5">
                        O IMC é uma medida que avalia se seu peso está dentro do considerado saudável para sua altura. É um ponto de partida, mas nosso foco principal será na composição corporal (músculos vs. gordura), que é um indicador muito mais preciso de saúde e estética.
                    </MetricDetail>
                    <MetricDetail title="Gordura Corporal (Estimativa)" value={`${calculations.bodyFat}%`} className="bg-white/5">
                        Este percentual representa a quantidade de gordura em relação ao seu peso total. Reduzir ou manter este número em um nível saudável é crucial para a definição muscular e para a saúde em geral. Seu plano de treino e dieta são projetados para otimizar essa métrica.
                    </MetricDetail>
                    <MetricDetail title="Metabolismo Basal (TMB)" value={calculations.bmr} unit="kcal" className="bg-white/5">
                        Esta é a quantidade de calorias que seu corpo queima em repouso total. Conhecer este número é o primeiro passo para criarmos um plano nutricional preciso, seja para ganhar massa muscular (superávit calórico) ou para perder gordura (déficit calórico).
                    </MetricDetail>
                    <MetricDetail title="Gasto Calórico Diário (GET)" value={calculations.tdee} unit="kcal" className="bg-white/5">
                         Isso representa seu gasto calórico total, incluindo suas atividades diárias e treinos. É com base neste número que definiremos suas metas calóricas diárias para que você atinja seu objetivo principal de forma eficiente e sustentável.
                    </MetricDetail>
                    <MetricDetail title="Faixa de Peso Ideal" value={calculations.idealWeight} className="bg-white/5">
                        Esta é uma faixa de peso considerada saudável para sua altura, baseada no IMC. Lembre-se, é apenas uma referência. O mais importante é como você se sente e sua composição corporal, não apenas o número na balança.
                    </MetricDetail>
                    <MetricDetail title="Hidratação Sugerida" value={`${calculations.waterIntake}L`} className="bg-white/5">
                        A água é fundamental para o desempenho nos treinos, recuperação muscular e saúde geral. Esta é uma meta diária recomendada com base no seu peso. Manter-se hidratado é uma das formas mais simples e eficazes de potencializar seus resultados.
                    </MetricDetail>
                </div>
                <button onClick={onClose} className="mt-6 font-poppins w-full flex-shrink-0 rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30">
                    Entendi
                </button>
            </div>
        </div>
    )
}

const workoutPlanSchema = {
    type: Type.OBJECT,
    properties: {
        planName: {
            type: Type.STRING,
            description: "Um nome curto, inspirador e criativo para o plano de treino (em português). Ex: 'Fundação de Força', 'Operação Definição', 'Potência Total'."
        },
        planFocus: {
            type: Type.STRING,
            description: "Uma descrição de uma linha sobre o foco principal do treino (em português). Ex: 'Foco em hipertrofia com dias de cardio estratégico'."
        },
        detailedWeeklySplit: {
            type: Type.ARRAY,
            description: "Um array com os treinos para cada dia da semana. Deve ter 7 itens, um para cada dia. O número de dias de treino de musculação deve corresponder ao informado pelo usuário.",
            items: {
                type: Type.OBJECT,
                properties: {
                    dayOfWeek: {
                        type: Type.STRING,
                        description: "O dia da semana para este treino (ex: 'Segunda-feira', 'Terça-feira')."
                    },
                    dayTitle: {
                        type: Type.STRING,
                        description: "O título do treino para este dia. Ex: 'Peito & Tríceps' ou 'Descanso Ativo'."
                    },
                    isRestDay: {
                        type: Type.BOOLEAN,
                        description: "True se for um dia de descanso ou cardio leve, false se for um dia de musculação."
                    },
                    exercises: {
                        type: Type.ARRAY,
                        description: "Uma lista de exercícios para os dias de musculação. Para dias de descanso, este array deve estar vazio.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {
                                    type: Type.STRING,
                                    description: "O nome do exercício (em português). Ex: 'Supino Reto com Barra'."
                                },
                                sets: {
                                    type: Type.INTEGER,
                                    description: "O número de séries para o exercício. Ex: 4."
                                },
                                reps: {
                                    type: Type.STRING,
                                    description: "A faixa de repetições. Ex: '8-12'."
                                },
                                rest: {
                                    type: Type.INTEGER,
                                    description: "O tempo de descanso em segundos entre as séries. Ex: 60."
                                }
                            },
                            required: ["name", "sets", "reps", "rest"]
                        }
                    }
                },
                required: ["dayOfWeek", "dayTitle", "isRestDay", "exercises"]
            }
        }
    },
    required: ["planName", "planFocus", "detailedWeeklySplit"]
};

const modalityPlanSchema = {
    type: Type.OBJECT,
    properties: {
        planName: {
            type: Type.STRING,
            description: "Um nome curto, inspirador e criativo para o plano de treino da modalidade (em português). Ex: 'Fundamentos do Muay Thai', 'Corrida para 5k', 'Flow e Força'."
        },
        planFocus: {
            type: Type.STRING,
            description: "Uma descrição de uma linha sobre o foco principal do treino da modalidade (em português). Ex: 'Desenvolvendo a base técnica e o condicionamento para a luta.'."
        },
        detailedWeeklySplit: {
            type: Type.ARRAY,
            description: "Um array com os treinos para a frequência de dias solicitada na semana, focado na modalidade.",
            items: {
                type: Type.OBJECT,
                properties: {
                    dayOfWeek: {
                        type: Type.STRING,
                        description: "O dia da semana sugerido para este treino (ex: 'Terça-feira', 'Quinta-feira')."
                    },
                    dayTitle: {
                        type: Type.STRING,
                        description: "O título do treino para este dia. Ex: 'Técnica e Fundamentos', 'Condicionamento', 'Resistência'."
                    },
                    isRestDay: {
                        type: Type.BOOLEAN,
                        description: "Sempre `false`, pois são dias de treino da modalidade."
                    },
                    exercises: {
                        type: Type.ARRAY,
                        description: "Uma lista de exercícios ou blocos de treino para a modalidade.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {
                                    type: Type.STRING,
                                    description: "O nome do exercício, bloco ou segmento. Ex: 'Aquecimento', 'Caminhada Rápida', 'Repetir 4x'."
                                },
                                duration: {
                                    type: Type.STRING,
                                    description: "Opcional. Duração do exercício ou segmento. Ex: '10 min', '3 min'."
                                },
                                intensity: {
                                    type: Type.STRING,
                                    description: "Opcional. Intensidade do exercício ou segmento. Ex: 'Ritmo moderado', 'Leve'."
                                },
                                details: {
                                    type: Type.STRING,
                                    description: "Descrição detalhada do exercício, incluindo rounds, distância, instruções ou detalhes de ritmo/duração para corrida (Ex: '5x400m | Ritmo Forte | 2 min descanso')."
                                }
                            },
                            required: ["name", "details"]
                        }
                    }
                },
                required: ["dayOfWeek", "dayTitle", "isRestDay", "exercises"]
            }
        }
    },
    required: ["planName", "planFocus", "detailedWeeklySplit"]
};

const generateDetailedModalityContent = async (userData: any, modalityName: string) => {
    if (!process.env.API_KEY) throw new Error("API_KEY is not set.");
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const isRunning = modalityName.toLowerCase().includes('corrida');

    const getModalityContext = () => {
        const lowerModality = modalityName.toLowerCase();
        if (isRunning) return { coach: "um coach de corrida de elite, cuja metodologia é uma síntese dos princípios de Jack Daniels, Eliud Kipchoge e estudos de biomecânica de universidades como Stanford e Harvard" };
        if (lowerModality.includes('muay thai')) return { coach: "um 'Kru' (mestre) de Muay Thai" };
        if (lowerModality.includes('boxe')) return { coach: "um treinador de boxe veterano" };
        if (lowerModality.includes('funcional')) return { coach: "um especialista em treinamento funcional" };
        return { coach: `um especialista em ${modalityName}` };
    };

    const { coach } = getModalityContext();
    
    const runningPrompt = `
        Você é ${coach} da Dreven. Sua missão é criar uma **planilha de corrida completa e profissional**, baseada em ciência, para um atleta com o seguinte perfil:
        - Nível de Experiência: ${userData.experienceLevel}
        - Objetivo Principal: ${userData.goals[0]}
        - Frequência Semanal: ${userData.modalityFrequencies[modalityName] || '2x'}

        **Instruções de Formato e Conteúdo (OBRIGATÓRIO):**
        1.  **Estrutura da Planilha:** Organize o conteúdo em seções claras e didáticas usando markdown (ex: '**Estrutura da Semana**'). As seções obrigatórias são:
            *   **Estrutura da Semana:** Detalhe o foco de cada dia de treino de corrida.
            *   **Glossário de Ritmos:** Explique os diferentes ritmos a serem usados (ex: Ritmo Leve, Ritmo de Limiar, etc.).
            *   **Técnica de Corrida:** Dicas para melhorar a forma e a eficiência.
            *   **Nutrição e Hidratação para Corredores:** Conselhos específicos para antes, durante e depois da corrida.
            *   **Prevenção de Lesões:** Recomendações essenciais.
        2.  **Conteúdo Detalhado e Científico:** Forneça informações aprofundadas em cada seção. Use linguagem clara, mas demonstre seu conhecimento de elite.
        3.  **Tags (OBRIGATÓRIO):** Dentro das seções de dicas (Técnica, Nutrição, Prevenção), cada item DEVE ser um item de lista (iniciando com '- ') e começar com uma tag entre colchetes. Use APENAS as seguintes tags:
            - \`[FOCO]\`: Para pontos de concentração e atenção.
            - \`[TÉCNICA]\`: Para detalhes sobre a execução correta de movimentos.
            - \`[DICA]\`: Para conselhos práticos e úteis.
            - \`[SEGURANÇA]\`: Para avisos sobre como evitar lesões.
            - \`[IMPORTANTE]\`: Para informações cruciais.
        4.  **Linguagem:** Use português impecável. O tom deve ser de um especialista mundial, motivador e didático.

        **NÃO inclua nenhuma introdução, conclusão ou texto fora deste formato.**
    `;

    const otherModalitiesPrompt = `
        Você é ${coach} da Dreven, um especialista de elite. Sua missão é criar um material de apoio completo e detalhado para um praticante de ${modalityName} com o seguinte perfil:
        - Nível de Experiência: ${userData.experienceLevel}
        - Objetivo Principal: ${userData.goals[0]}

        **Instruções de Formato (OBRIGATÓRIO):**
        1.  **Estrutura:** Organize o conteúdo em 3 a 4 seções claras e relevantes para a modalidade. Use markdown para os títulos das seções (ex: '**Aquecimento e Preparação**').
        2.  **Dicas Detalhadas:** Dentro de cada seção, forneça de 2 a 4 dicas. Cada dica DEVE ser um item de lista (iniciando com '- ').
        3.  **Tags (OBRIGATÓRIO):** Cada item da lista DEVE começar com uma tag entre colchetes para categorizar a dica. Use APENAS as seguintes tags:
            - \`[FOCO]\`: Para pontos de concentração e atenção.
            - \`[TÉCNICA]\`: Para detalhes sobre a execução correta de movimentos.
            - \`[DICA]\`: Para conselhos práticos e úteis.
            - \`[SEGURANÇA]\`: Para avisos sobre como evitar lesões.
            - \`[IMPORTANTE]\`: Para informações cruciais que não podem ser ignoradas.
        4.  **Linguagem:** Use português impecável. A linguagem deve ser clara, motivadora e didática, como um coach conversando diretamente com o aluno.

        **NÃO inclua nenhuma introdução, conclusão ou texto fora deste formato.**
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: isRunning ? runningPrompt : otherModalitiesPrompt,
        });
        return response.text;
    } catch (error) {
        console.error(`Error generating ${modalityName} tips:`, error);
        return "**Erro ao carregar dicas.**\n\n- [IMPORTANTE] Houve um problema ao gerar as dicas. Por favor, tente adaptar o treino novamente ou contate o suporte.";
    }
};

const generateWorkoutPlan = async (userData: any, environment: 'gym' | 'home' = 'gym') => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const getTrainingDayCount = (trainingDaysRange: string): number => {
        switch (trainingDaysRange) {
            case '1-2': return 2;
            case '3-4': return 4;
            case '5+': return 5;
            default: return 3; // Fallback for unexpected values
        }
    };
    const exactTrainingDays = getTrainingDayCount(userData.trainingDays);

    const prompt = `
        Você é 'Dreven AI Coach', um personal trainer de elite da plataforma Dreven. Sua expertise combina o conhecimento de treinadores de renome mundial como Jeff Cavaliere (ATHLEAN-X), Charles Glass e Bret Contreras. Sua abordagem é 100% baseada em evidências científicas de artigos e estudos de universidades renomadas.

        Sua tarefa é criar um plano de treino de musculação SEMANAL, completo, detalhado, único e 100% personalizado para o seguinte usuário.

        **Dados do Usuário:**
        - **Nome:** ${userData.name}
        - **Idade:** ${userData.age} anos
        - **Gênero:** ${userData.gender === 'male' ? 'Masculino' : 'Feminino'}
        - **Nível de Experiência:** ${userData.experienceLevel}
        - **Objetivo Principal:** ${userData.goals[0]}
        - **Dias de Musculação por Semana (Solicitado pelo usuário):** ${userData.trainingDays}
        - **NÚMERO EXATO DE DIAS DE TREINO A CRIAR:** ${exactTrainingDays}
        - **Biotipo Corporal:** ${userData.bodyType}
        - **Ambiente de Treino:** ${environment === 'home' ? 'Em Casa (com peso corporal, elásticos e talvez halteres leves)' : 'Academia Completa'}

        **Instruções para a Geração do Plano:**
        1.  **Plano Completo de 7 Dias:** O plano deve cobrir todos os 7 dias da semana, de forma cronológica, começando pela Segunda-feira.
        2.  **Dias de Musculação (REGRA CRÍTICA E OBRIGATÓRIA):** O plano deve conter EXATAMENTE ${exactTrainingDays} dias de musculação (onde 'isRestDay' é 'false'). NEM MAIS, NEM MENOS. Os dias restantes devem ser de descanso.
        3.  **Título do Dia (dayTitle) - REGRA CRÍTICA E OBRIGATÓRIA):** Use NOMES SIMPLES E COMUNS para os dias de treino, baseados nos grupos musculares.
            - **Exemplos de nomes PERMITIDOS:** 'Peito & Tríceps', 'Costas & Bíceps', 'Pernas & Panturrilhas', 'Ombros & Trapézio', 'Full Body'.
            - **Exemplos de nomes PROIBIDOS (NUNCA USE):** 'Corpo Superior A', 'Membro Inferior B', 'Treino A/B/C', 'Upper/Lower', 'Push/Pull/Legs com ênfase em compostos', 'treino de compostos'. ELIMINE PERMANENTEMENTE ESSA NOMENCLATURA TÉCNICA.
        4.  **Exercícios:** Forneça entre 5 e 7 exercícios fundamentais e eficazes. ${environment === 'home' ? "Adapte TODOS os exercícios para serem realizáveis em casa. Priorize peso corporal (flexões, agachamentos, pranchas), variações com elásticos de resistência, e se usar halteres, assuma que são leves. Seja criativo com exercícios como 'Mergulho no Banco' ou 'Remada com Toalha'." : "Use exercícios de academia com barras, halteres e máquinas."}
        5.  **Volume:** Para cada exercício, defina séries (3-4), repetições (ex: '8-12') e descanso em SEGUNDOS (ex: 60).
        6.  **Divisão (Split):** Crie uma divisão de treino lógica e eficaz baseada no número EXATO de ${exactTrainingDays} dias.
        7.  **Unicidade:** O plano deve ser 100% único para este usuário. Analise todos os dados para criar uma rotina que seja verdadeiramente dele.
        8.  **Formato de Saída:** Responda estritamente no formato JSON, aderindo ao schema fornecido. Não adicione nenhum texto ou explicação fora do objeto JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: workoutPlanSchema,
            },
        });
        const planJson = JSON.parse(response.text);
        return planJson;
    } catch (error) {
        console.error("Error generating workout plan from Gemini:", error);
        return null; 
    }
};

const generateModalityPlan = async (userData: any, modality: string, frequency: string, environment: 'gym' | 'home' = 'gym') => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const getModalityExpertPersona = (modalityName: string) => {
        switch (modalityName.toLowerCase()) {
            case 'muay thai': return "um 'Kru' (mestre) de Muay Thai tailandês, focado na técnica e disciplina, inspirado por lendas como Saenchai.";
            case 'boxe': return "um treinador de boxe veterano do Brooklyn, com a mentalidade de Cus D'Amato, focado em footwork, defesa e combinações precisas.";
            case 'corrida': return "um coach de corrida de elite, com a metodologia de Eliud Kipchoge, focado em consistência, treinos de limiar e recuperação inteligente.";
            case 'pilates': return "um instrutor de Pilates certificado, com a precisão de Joseph Pilates, focado no 'powerhouse', controle e fluidez.";
            case 'yoga': return "um 'Yogi' experiente, com a sabedoria de B.K.S. Iyengar, focado em alinhamento, respiração (pranayama) e conexão mente-corpo.";
            case 'funcional': return "um especialista em treinamento funcional, como Michael Boyle, focado em movimentos integrados, força do core e prevenção de lesões.";
            default: return `um especialista em ${modality}, focado em técnica, segurança e progressão.`;
        }
    };

     const getFrequencyText = (freq: string) => {
        switch(freq) {
            case '1x': return '1 dia';
            case '2x': return '2 dias';
            case '3x': return '3 dias';
            case '4x': return '4 dias';
            case '5x': return '5 dias';
            default: return '2';
        }
    };
    const exactFrequency = getFrequencyText(frequency);

    const prompt = `
        Você é um especialista de elite da plataforma Dreven. Sua identidade agora é de ${getModalityExpertPersona(modality)}. Sua abordagem é 100% baseada em evidências científicas e na experiência prática dos maiores nomes da área.

        Sua tarefa é criar um plano de treino SEMANAL para a modalidade de ${modality}, que seja detalhado, único e 100% personalizado para o seguinte usuário.

        **Dados do Usuário:**
        - **Nome:** ${userData.name}
        - **Nível de Experiência Geral:** ${userData.experienceLevel}
        - **Objetivo Principal (adapte para a modalidade):** ${userData.goals[0]}
        - **Frequência Solicitada:** ${exactFrequency} na semana

        **Instruções para a Geração do Plano de ${modality}:**
        1.  **Frequência:** Crie um plano para EXATAMENTE ${exactFrequency} na semana, que complemente a rotina de musculação do usuário.
        2.  **Título do Dia (dayTitle):** Use nomes descritivos para os dias de treino. Exemplos: 'Técnica e Base', 'Condicionamento Físico', 'Resistência e Ritmo'.
        3.  **Nomes e Foco:** Crie um 'planName' e 'planFocus' que sejam simples, diretos, claros e objetivos, como 'Fundamentos do Muay Thai' ou 'Corrida para 5k'. Evite jargões técnicos ou nomes poéticos como 'tigre de aço'.
        4.  **Exercícios/Blocos:** Forneça entre 3 a 5 exercícios ou blocos de treino por dia.
        5.  **Adaptação para Casa:** ${environment === 'home' ? `Adapte todos os exercícios e drills para serem feitos em casa ou em um ambiente externo (parque, rua), com o mínimo ou nenhum equipamento.` : ''}
        6.  **Unicidade e Personalização:** O plano deve ser 100% único para este usuário. Analise o nível de experiência e objetivo para criar uma rotina que seja verdadeiramente dele.
        7.  **Formato de Saída (REGRA CRÍTICA):** Responda estritamente no formato JSON, aderindo ao schema fornecido.
            - **Para Corrida:** Use o campo 'name' para o tipo de treino (ex: 'Rodagem Leve', 'Intervalos', 'Longo'). Use os campos 'duration' para a duração total (ex: '45 min') e 'details' para a distância ou estrutura (ex: '5km', '6x400m'). Mantenha conciso para a visualização em lista.
            - **Para outras modalidades (Muay Thai, Boxe, etc.):** Estruture cada exercício com 'name' para o bloco (ex: 'Aquecimento'), 'duration' para a duração total (ex: '10 min'), 'intensity' para a intensidade geral (ex: 'Ritmo moderado'), e 'details' para a descrição detalhada dos movimentos (ex: 'Pular corda (5 min): Varie os estilos...').
            - NÃO adicione nenhum texto ou explicação fora do objeto JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: modalityPlanSchema,
            },
        });
        const planJson = JSON.parse(response.text);
        return planJson;
    } catch (error) {
        console.error(`Error generating ${modality} plan from Gemini:`, error);
        return {
            planName: `Introdução ao ${modality}`,
            planFocus: `Desenvolvendo os fundamentos do ${modality}.`,
            detailedWeeklySplit: [
              { dayOfWeek: "Terça-feira", dayTitle: "Técnica e Fundamentos", isRestDay: false, exercises: [{ name: 'Fundamento 1', details: 'Realizar o movimento básico por 15 minutos.'}, { name: 'Condicionamento', details: 'Exercício cardiovascular por 20 minutos.'}] },
              { dayOfWeek: "Quinta-feira", dayTitle: "Prática", isRestDay: false, exercises: [{ name: 'Prática 1', details: 'Aplicar o fundamento 1 em um circuito.'}, { name: 'Flexibilidade', details: 'Alongamento focado por 10 minutos.'}] },
            ]
        };
    }
};

const generateAdaptedWorkoutPlan = async (currentPlan: any, userData: any, environment: 'home' | 'gym' = 'home') => {
     if (!process.env.API_KEY) throw new Error("API_KEY is not set.");
     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
     
     const prompt = `
        Você é 'Dreven AI Coach', um especialista em adaptação de treinos.
        Sua tarefa é adaptar o seguinte plano de treino de musculação para ser feito ${environment === 'home' ? 'EM CASA' : 'NA ACADEMIA'}.

        **Plano de Treino Original (JSON):**
        ${JSON.stringify(currentPlan, null, 2)}

        **Dados do Usuário:**
        - Nível de Experiência: ${userData.experienceLevel}
        - Objetivo: ${userData.goals[0]}

        **Instruções de Adaptação para ${environment === 'home' ? 'CASA' : 'ACADEMIA'}:**
        1.  **Substitua os Exercícios:** Troque cada exercício do plano original por um equivalente eficaz para o novo ambiente.
            - **Para Casa:** Priorize exercícios com peso corporal (flexões, agachamentos, pranchas, afundos), elásticos de resistência, e objetos domésticos (mochila com peso). Seja criativo (ex: 'Mergulho no Banco', 'Remada com Toalha').
            - **Para Academia:** Use exercícios com barras, halteres, anilhas e máquinas específicas.
        2.  **Mantenha a Estrutura:** Mantenha o mesmo número de dias de treino, a mesma divisão de grupos musculares ('dayTitle'), o número de séries, a faixa de repetições e o tempo de descanso, a menos que a adaptação do exercício exija um ajuste (ex: mais repetições para exercícios de peso corporal).
        3.  **Nomes dos Treinos (dayTitle):** Mantenha os nomes simples e originais (ex: 'Peito & Tríceps'). NÃO USE NOMES TÉCNICOS.
        4.  **Formato de Saída:** Responda estritamente no formato JSON, seguindo o mesmo schema do plano original. Não adicione texto ou explicações fora do objeto JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: workoutPlanSchema,
            },
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error adapting workout plan:", error);
        return currentPlan; // Return original plan on error
    }
};


const ResultsScreen = ({ userData, navigate, setUserData }: { userData: any; navigate: (screen: Screen) => void; setUserData: any }) => {
    const { name, weight, height, age, gender, trainingDays } = userData;
    const [isLoading, setIsLoading] = React.useState(true);
    const [isGeneratingPlan, setIsGeneratingPlan] = React.useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); 

        return () => clearTimeout(timer);
    }, []);

    const calculations = React.useMemo(() => {
        if (!weight || !height || !age || !gender || !trainingDays) return null;

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Source: Mifflin-St Jeor Equation - American Journal of Clinical Nutrition
        const bmr = gender === 'male'
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : (10 * weight) + (6.25 * height) - (5 * age) - 161;

        const activityMultipliers: { [key: string]: number } = {
            '1-2': 1.375, '3-4': 1.55, '5+': 1.725,
        };
        const tdee = bmr * (activityMultipliers[trainingDays] || 1.2);

        // Source: Deurenberg formula - British Journal of Nutrition
        let bodyFat;
        const isMale = gender === 'male' ? 1 : 0;
        if (age >= 18) {
            bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * isMale) - 5.4;
        } else {
            bodyFat = (1.51 * bmi) - (0.70 * age) - (3.6 * isMale) + 1.4;
        }
        const bodyFatPercentage = Math.max(0, bodyFat);

        // Source: WHO healthy BMI range (18.5 to 24.9)
        const idealWeightLower = 18.5 * (heightInMeters * heightInMeters);
        const idealWeightUpper = 24.9 * (heightInMeters * heightInMeters);
        
        // Source: Common nutritional guideline (35ml/kg)
        const waterIntakeInMl = weight * 35;

        return {
            bmi: bmi.toFixed(1),
            bmr: bmr.toFixed(0),
            tdee: tdee.toFixed(0),
            bodyFat: bodyFatPercentage.toFixed(1),
            idealWeight: `${idealWeightLower.toFixed(0)}kg - ${idealWeightUpper.toFixed(0)}kg`,
            waterIntake: (waterIntakeInMl / 1000).toFixed(1),
        };
    }, [weight, height, age, gender, trainingDays]);

    const handleContinueToDashboard = async () => {
        setIsGeneratingPlan(true);

        try {
            const workoutPlanPromise = generateWorkoutPlan(userData);

            const modalityDataPromises = (userData.modalities || []).map(async (modality: string) => {
                const frequency = userData.modalityFrequencies?.[modality] || '2x';
                const [plan, tips] = await Promise.all([
                    generateModalityPlan(userData, modality, frequency, 'gym'),
                    generateDetailedModalityContent(userData, modality)
                ]);
                return { modality, data: { plan, tips } };
            });

            const [workoutPlan, ...modalityResults] = await Promise.all([
                workoutPlanPromise,
                ...modalityDataPromises
            ]);

            const modalityPlans = modalityResults.reduce((acc: any, result: any) => {
                acc[result.modality] = result.data;
                return acc;
            }, {});
            
            const updatedProfile = { 
                ...userData, 
                dashboard_unlocked: true, 
                workoutPlan: workoutPlan,
                modalityPlans: modalityPlans
            };
            
            setUserData(updatedProfile);
            localStorage.setItem('dreven_user_profile', JSON.stringify(updatedProfile));

        } catch (error) {
             console.error("Failed to generate workout plans, using fallback.", error);
              const fallbackPlan = {
                    planName: "Começando com Força",
                    planFocus: "Fundamentos para ganho de força e resistência.",
                    detailedWeeklySplit: [
                      { dayOfWeek: "Segunda-feira", dayTitle: "Peito & Tríceps", isRestDay: false, exercises: [{ name: 'Supino Reto', sets: 3, reps: '8-12', rest: 60}] },
                      { dayOfWeek: "Terça-feira", dayTitle: "Descanso", isRestDay: true, exercises: [] },
                      { dayOfWeek: "Quarta-feira", dayTitle: "Costas & Bíceps", isRestDay: false, exercises: [{ name: 'Remada Curvada', sets: 3, reps: '8-12', rest: 60}] },
                      { dayOfWeek: "Quinta-feira", dayTitle: "Descanso", isRestDay: true, exercises: [] },
                      { dayOfWeek: "Sexta-feira", dayTitle: "Pernas & Ombros", isRestDay: false, exercises: [{ name: 'Agachamento Livre', sets: 3, reps: '8-12', rest: 90}] },
                      { dayOfWeek: "Sábado", dayTitle: "Descanso", isRestDay: true, exercises: [] },
                      { dayOfWeek: "Domingo", dayTitle: "Descanso", isRestDay: true, exercises: [] }
                    ]
                };
             const updatedProfile = { ...userData, dashboard_unlocked: true, workoutPlan: fallbackPlan, modalityPlans: {} };
             setUserData(updatedProfile);
             localStorage.setItem('dreven_user_profile', JSON.stringify(updatedProfile));
        } finally {
            setIsGeneratingPlan(false);
            navigate('dashboard_loading');
        }
    };

    if (isLoading && !calculations) {
        return (
            <main className="flex h-full flex-col items-center justify-center text-center">
                <div className="w-full max-w-lg animate-fade-in">
                    <h1 className="text-3xl font-semibold text-neutral-100 mb-2">Um momento...</h1>
                    <p className="text-neutral-300 mb-8">Seu especialista Dreven está analisando seus dados para gerar seu relatório inicial.</p>
                </div>
            </main>
        );
    }

    if (!calculations) {
        return (
            <main className="flex h-full flex-col items-center justify-center text-center">
                <div className="w-full max-w-lg animate-fade-in">
                    <h1 className="text-3xl font-semibold text-neutral-100 mb-2">Dados incompletos</h1>
                    <p className="text-neutral-300 mb-8">Faltam alguns dados para gerar sua análise. Por favor, volte e complete o questionário.</p>
                </div>
            </main>
        );
    }

    return (
        <>
            {isDetailsModalOpen && <ResultsDetailModal onClose={() => setIsDetailsModalOpen(false)} userData={userData} calculations={calculations} />}
            <main className="flex h-full w-full flex-col items-center justify-center text-center">
                <div className="w-full max-w-2xl animate-fade-in">
                    <h1 className="text-3xl font-semibold text-neutral-100 mb-2">Bem-vindo, {name || 'Guerreiro(a)'}!</h1>
                    <p className="text-neutral-300 mb-8">Sua análise inicial está pronta.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mb-8">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-xs text-neutral-400">IMC</p>
                            <p className="text-xl font-semibold">{calculations.bmi}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-xs text-neutral-400">Gordura Corporal</p>
                            <p className="text-xl font-semibold">{calculations.bodyFat}%</p>
                        </div>
                         <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-xs text-neutral-400">Metab. Basal</p>
                            <p className="text-xl font-semibold">{calculations.bmr} <span className="text-sm">kcal</span></p>
                        </div>
                         <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-xs text-neutral-400">Gasto Calórico</p>
                            <p className="text-xl font-semibold">{calculations.tdee} <span className="text-sm">kcal</span></p>
                        </div>
                         <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-xs text-neutral-400">Peso Ideal</p>
                            <p className="text-lg font-semibold">{calculations.idealWeight}</p>
                        </div>
                         <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                            <p className="text-xs text-neutral-400">Água Sugerida</p>
                            <p className="text-xl font-semibold">{calculations.waterIntake}L</p>
                        </div>
                    </div>
                    <div className="mt-8 flex w-full max-w-sm mx-auto flex-col sm:flex-row gap-4">
                        <button onClick={() => setIsDetailsModalOpen(true)} className="font-poppins w-full sm:w-auto flex-1 rounded-3xl border border-white/20 bg-transparent py-3 text-base font-medium text-neutral-200 backdrop-blur-sm transition-colors hover:bg-white/10">
                            Mais detalhes
                        </button>
                        <button onClick={handleContinueToDashboard} disabled={isGeneratingPlan} className="font-poppins w-full sm:w-auto flex-1 rounded-3xl border border-white/10 bg-white/20 py-3 text-base font-medium text-neutral-200 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30 disabled:opacity-50 disabled:cursor-wait">
                            {isGeneratingPlan ? 'Gerando seus treinos...' : 'Continuar'}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

const DashboardLoadingScreen = ({ navigate }: { navigate: (screen: Screen) => void }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            navigate('dashboard');
        }, 2500); // Matches animation duration
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="font-poppins text-4xl font-semibold tracking-tight text-neutral-100 animate-logo-pulse-fade">Dreven</span>
        </div>
    );
};

// FIX: Refactored DashboardSection to conditionally render the 'See all' button for better reusability.
const DashboardSection = ({ title, children, showSeeAll = true, onSeeAllClick }: { title: string, children?: React.ReactNode, showSeeAll?: boolean, onSeeAllClick?: () => void }) => (
    <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold tracking-tight text-neutral-100">{title}</h3>
            {showSeeAll && <button onClick={onSeeAllClick} className="text-neutral-400 text-base font-semibold hover:text-neutral-300 transition-colors">Ver tudo</button>}
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </section>
);


const ChartLineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-300"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);
const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-300"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
);
const SupplementationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-300"><path d="M10 20.5c.7 1.3 2 2.5 3.5 2.5s2.8-1.2 3.5-2.5"/><path d="M19 14H5c-1.1 0-2-.9-2-2V8c0-.6.2-1.1.6-1.5L4 5h16l.4 1.5c.4.4.6.9.6 1.5v4c0 1.1-.9 2-2 2Z"/><path d="M19 8h-2a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2H5"/></svg>
);
const AnatomyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-300"><circle cx="12" cy="5" r="1"/><path d="M9 20s-1-4.5-1-8 2-7.5 4-7.5 4 3.5 4 7.5-1 8-1 8"/><path d="M12 11h.01"/></svg>
);
const QuickAccessCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="bg-[#1C1C1E] border border-neutral-800/80 rounded-2xl p-3 flex items-center gap-2 w-full text-left transition-colors hover:bg-neutral-800 active:scale-95">
        {icon}
        <span className="font-semibold text-sm text-neutral-100">{label}</span>
    </button>
);


const DashboardScreen = ({ userData, navigate, setCurrentModality, setModalityIntro }: { userData: any, navigate: (screen: Screen) => void, setCurrentModality: (modality: string) => void, setModalityIntro: (modality: string | null) => void }) => {
    const nameParts = (userData.name || "Usuário").split(" ");
    const displayName = nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1][0]}.` : nameParts[0];

    const nextWorkoutInfo = React.useMemo(() => {
        if (!userData.workoutPlan?.detailedWeeklySplit || userData.workoutPlan.detailedWeeklySplit.length === 0) {
            return { title: "Nenhum Treino", subtitle: "Configure seu plano de treino." };
        }
        
        const split = userData.workoutPlan.detailedWeeklySplit;
        const todayIndex = new Date().getDay();
    
        const dayMap: { [key: string]: number } = {
            "Domingo": 0, "Segunda-feira": 1, "Terça-feira": 2, 
            "Quarta-feira": 3, "Quinta-feira": 4, "Sexta-feira": 5, "Sábado": 6
        };
    
        const todayWorkout = split.find((day: any) => dayMap[day.dayOfWeek] === todayIndex);
        let workoutTitle = "Dia de Descanso"; // Default title
    
        // If today is a workout day, use its title.
        if (todayWorkout && !todayWorkout.isRestDay) {
            workoutTitle = todayWorkout.dayTitle;
        } else {
            // If today is a rest day, find the next non-rest day's title.
            for (let i = 1; i <= 7; i++) {
                const nextDayIndex = (todayIndex + i) % 7;
                const nextWorkoutDay = split.find((day: any) => dayMap[day.dayOfWeek] === nextDayIndex && !day.isRestDay);
                
                if (nextWorkoutDay) {
                    workoutTitle = nextWorkoutDay.dayTitle;
                    break;
                }
            }
        }
        
        const subtitle = `Hoje • com ${userData.trainer?.name || 'seu especialista'}`;
    
        return { title: workoutTitle, subtitle };
    }, [userData.workoutPlan, userData.trainer]);

    const modalitiesData: { [key: string]: { img: string; desc: string; tag: string; tagColor: 'red' | 'orange' | 'blue' | 'cyan' | 'green'; kcal: string; } } = {
        "Muay Thai": { img: "https://images.unsplash.com/photo-1526793248754-cf6014a378e8?w=320&q=80", desc: "Resistência • 60 min", tag: "Intenso", tagColor: "red", kcal: "+850 kcal" },
        "Boxe": { img: "https://images.unsplash.com/photo-1636581563884-39569e81cbad?w=320&q=80", desc: "Potência • 60 min", tag: "Popular", tagColor: "orange", kcal: "+700 kcal" },
        "Corrida": { img: "https://images.unsplash.com/photo-1744706908540-c7450689a30a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Cardio • 45 min", tag: "Resistência", tagColor: "blue", kcal: "+500 kcal" },
        "Natação": { img: "https://images.unsplash.com/photo-1569880153113-76e332685714?w=320&q=80", desc: "Corpo Inteiro • 60 min", tag: "Relaxante", tagColor: "cyan", kcal: "+600 kcal" },
        "Funcional": { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&q=80", desc: "Força/Cardio • 50 min", tag: "Dinâmico", tagColor: "green", kcal: "+550 kcal" }
    };

    const tagColors = {
        red: "bg-red-500/10 text-red-400",
        orange: "bg-orange-500/10 text-orange-400",
        blue: "bg-blue-500/10 text-blue-400",
        cyan: "bg-cyan-500/10 text-cyan-400",
        green: "bg-green-500/10 text-green-400",
    };

    const handleModalityClick = (modalityName: string) => {
        setModalityIntro(modalityName);
    };

    return (
        <div className="w-full flex justify-center animate-fade-in font-inter">
            <main className="w-full max-w-md text-neutral-200 px-6 pt-16 pb-36">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-normal text-neutral-400 font-manrope">Bom dia,</h1>
                        <h2 className="text-3xl font-bold text-neutral-100 -mt-1 font-manrope">{displayName}</h2>
                    </div>
                    <button className="w-12 h-12 bg-neutral-800/80 border border-neutral-700/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-neutral-700 active:scale-95" aria-label="Notificações">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell w-6 h-6 text-neutral-300"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    </button>
                </header>

                {/* Meu treino */}
                <section className="relative bg-[#1C1C1E] border border-neutral-800/80 rounded-3xl mb-12 p-6 overflow-hidden">
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1734668486909-4637ecd66408?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(100%)',
                            opacity: 0.12,
                        }}
                    />
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-neutral-400 text-sm font-semibold tracking-wider uppercase">Meu Treino</p>
                                <p className="text-3xl mt-2 font-bold font-manrope tracking-tight text-white">{nextWorkoutInfo.title}</p>
                                <p className="text-neutral-400 mt-2.5 text-sm">
                                    {nextWorkoutInfo.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => navigate('pre_workout')} className="flex-1 bg-neutral-100 text-black rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-transform active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                <span>Iniciar</span>
                            </button>
                            <button onClick={() => navigate('coach_chat')} className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3.5 flex items-center justify-center gap-2 text-white font-semibold text-sm transition-colors hover:bg-white/20 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round w-5 h-5"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
                                <span>Coach</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Suas modalidades */}
                <DashboardSection title="Suas modalidades" onSeeAllClick={() => navigate('modalities_list')}>
                    {userData.modalities && userData.modalities.length > 0 ? (
                        userData.modalities.slice(0, 2).map((modalityName: string) => {
                            const modality = modalitiesData[modalityName as keyof typeof modalitiesData] || { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=320&q=80", desc: "Performance • 50 min", tag: "Custom", tagColor: "green", kcal: "+500 kcal" };
                            
                            const colorClass = tagColors[modality.tagColor as keyof typeof tagColors] || "bg-neutral-500/10 text-neutral-400";

                            return (
                                <button key={modalityName} onClick={() => handleModalityClick(modalityName)} className="w-full text-left bg-[#1C1C1E] border border-neutral-800/80 flex gap-4 rounded-[1.25rem] p-4 items-center transition-colors hover:bg-neutral-800">
                                    <img src={modality.img} alt={modalityName} className="w-12 h-12 rounded-full object-cover flex-shrink-0 grayscale" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-base text-neutral-100">{modalityName}</p>
                                        <p className="text-neutral-400 text-sm">{modality.desc}</p>
                                    </div>
                                    <div className="flex flex-col items-end flex-shrink-0">
                                        <div className={`px-2.5 py-1 ${colorClass} rounded-full text-xs font-bold`}>{modality.tag}</div>
                                        <p className="text-neutral-500 text-sm mt-2">{modality.kcal}</p>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                         <div className="bg-[#1C1C1E] border border-neutral-800/80 rounded-[1.25rem] p-3 text-center">
                            <p className="text-neutral-400">Nenhuma modalidade selecionada.</p>
                         </div>
                    )}
                </DashboardSection>

                {/* FIX: Implemented 'Acesso Rápido' section using the refactored DashboardSection component for consistency. */}
                <DashboardSection title="Acesso rápido" showSeeAll={false}>
                    <div className="grid grid-cols-2 gap-3">
                        <QuickAccessCard icon={<ChartLineIcon />} label="Progresso" />
                        <QuickAccessCard icon={<AppleIcon />} label="Nutrição" />
                        <QuickAccessCard icon={<SupplementationIcon />} label="Suplementação" />
                        <QuickAccessCard icon={<AnatomyIcon />} label="Anatomia" />
                    </div>
                </DashboardSection>
                
                {/* Atividades recentes */}
                <DashboardSection title="Atividades recentes">
                    <div className="bg-[#1C1C1E] border border-neutral-800/80 rounded-[1.25rem] p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-6 h-6 text-neutral-200"><path d="M22 12H18l-3 7L9 5l-3 7H2"></path></svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-base text-neutral-100">Corrida leve</p>
                            <p className="text-neutral-400 text-sm">Hoje, 7:10 • 5 km</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="flex items-center justify-end gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <p className="font-semibold text-sm text-neutral-300">Concluído</p>
                            </div>
                            <p className="text-neutral-500 text-sm mt-1">45 min</p>
                        </div>
                    </div>
                    <div className="bg-[#1C1C1E] border border-neutral-800/80 rounded-[1.25rem] p-4 flex items-center gap-4">
                        <div className="flex bg-neutral-800 w-12 h-12 rounded-xl items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell w-6 h-6 text-neutral-200"><path d="M14.4 14.4 9.6 9.6"/><path d="M18 16 8 6"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="M18 6 6 18"/><path d="m19 11-4-4"/><path d="m5 13 4 4"/><path d="M12 22v-4"/><path d="M12 6V2"/><path d="M12 14v-4"/></svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-base text-neutral-100">Funcional</p>
                            <p className="text-neutral-400 text-sm">Ontem, 18:30 • 50 min</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-sm text-neutral-400">Registrado</p>
                            <p className="text-neutral-500 text-sm mt-1">Série A/B</p>
                        </div>
                    </div>
                </DashboardSection>
            </main>
        </div>
    );
};

const CompletionCheckbox = ({ isCompleted, onClick }: { isCompleted: boolean; onClick: () => void; }) => (
    <button 
        onClick={onClick}
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121212] focus:ring-green-500 ${isCompleted ? 'border-green-500' : 'border-neutral-600 hover:border-neutral-400'}`}
        aria-label={isCompleted ? "Marcar exercício como incompleto" : "Marcar exercício como completo"}
    >
        {isCompleted && (
             <div className="w-4 h-4 bg-green-500 rounded-full animate-fade-in" style={{ animationDuration: '200ms' }}></div>
        )}
    </button>
);

const ExerciseCard = ({ exercise, isCompleted, onToggle, id, onStartTimer }: any) => {
    const baseId = id || exercise.name.replace(/\s+/g, '-').toLowerCase();
    
    const [setsData, setSetsData] = React.useState(() =>
        Array.from({ length: exercise.sets }, () => ({ reps: '', weight: '' }))
    );

    const parseReps = (repsStr: string): string => {
        if (typeof repsStr !== 'string') return '';
        if (repsStr.toLowerCase().includes('falha')) return 'F';
        const numbers = repsStr.match(/\d+/g);
        return numbers ? String(Math.max(...numbers.map(Number))) : repsStr;
    };

    React.useEffect(() => {
        if (isCompleted) {
            setSetsData(prevData =>
                Array.from({ length: exercise.sets }, (_, i) => ({
                    reps: parseReps(exercise.reps),
                    weight: prevData[i]?.weight || ''
                }))
            );
        }
    }, [isCompleted, exercise.reps, exercise.sets]);

    const handleSetChange = (index: number, field: 'reps' | 'weight', value: string) => {
        setSetsData(currentData => {
            const newData = [...currentData];
            newData[index] = { ...newData[index], [field]: value };
            return newData;
        });
    };

    return (
        <div id={id} className={`bg-[#121212] rounded-xl p-4 border border-neutral-800/60 transition-opacity duration-300 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
            <div className="flex items-start gap-4">
                <div className="mt-1">
                     <CompletionCheckbox isCompleted={isCompleted} onClick={onToggle} />
                </div>
                <div className="flex-1">
                    <h4 className={`font-semibold text-lg text-neutral-50 transition-colors ${isCompleted ? 'line-through text-neutral-400' : ''}`}>{exercise.name}</h4>
                    <p className="text-sm text-neutral-400 mt-1">{exercise.sets} séries de {exercise.reps} reps com {exercise.rest}s de descanso</p>
                </div>
            </div>
            
            <div className="mt-6 space-y-2 text-sm">
                <div className="flex gap-3 text-neutral-500 font-medium text-xs uppercase tracking-wider px-1">
                    <span className="w-8 text-center">SÉRIE</span>
                    <span className="flex-1 text-center">REPS</span>
                    <span className="flex-1 text-center">PESO</span>
                </div>
                {Array.from({ length: exercise.sets }).map((_, i) => {
                    const isPreviousSetFilled = i === 0 || (setsData[i - 1].reps && setsData[i - 1].weight);
                    const isSetDisabled = isCompleted || !isPreviousSetFilled;
                    return(
                    <div key={i} className="flex gap-3 items-center">
                        <div className="w-8 h-11 flex items-center justify-center">
                            <span className="text-neutral-300 font-semibold text-base">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                            <input 
                                type="number" 
                                aria-label={`Repetições para a série ${i + 1} de ${exercise.name}`}
                                className="w-full bg-[#2A2A2C] border border-neutral-700/80 rounded-md h-11 text-center text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors disabled:opacity-50 disabled:bg-neutral-800/50 disabled:text-neutral-400"
                                value={setsData[i].reps}
                                onChange={(e) => handleSetChange(i, 'reps', e.target.value)}
                                disabled={isSetDisabled}
                            />
                        </div>
                        <div className="relative flex-1">
                            <input 
                                type="number" 
                                aria-label={`Peso para a série ${i + 1} de ${exercise.name}`}
                                className="w-full bg-[#2A2A2C] border border-neutral-700/80 rounded-md h-11 text-center text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 pr-9 disabled:opacity-50 disabled:bg-neutral-800/50 disabled:text-neutral-400"
                                value={setsData[i].weight}
                                onChange={(e) => handleSetChange(i, 'weight', e.target.value)}
                                disabled={isSetDisabled}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none">kg</span>
                        </div>
                    </div>
                )})}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                    <label htmlFor={`${baseId}-notes`} className="text-xs text-neutral-400 mb-1.5 block px-1">Anotações</label>
                    <input 
                        id={`${baseId}-notes`}
                        type="text" 
                        placeholder="Ex: Bati meu recorde" 
                        className="w-full bg-[#2A2A2C] border border-neutral-700/80 rounded-md h-11 px-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor={`${baseId}-rest`} className="text-xs text-neutral-400 mb-1.5 block px-1">Descanso</label>
                     <button
                        onClick={() => onStartTimer(exercise.rest, id)}
                        className="w-full bg-[#2A2A2C] border border-neutral-700/80 rounded-md h-11 px-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors flex items-center justify-center gap-2 hover:bg-neutral-700 font-semibold active:scale-95"
                        aria-label={`Iniciar cronômetro de ${exercise.rest} segundos`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>{exercise.rest}s</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const DayAccordion = React.forwardRef<HTMLDivElement, any>(({ day, dayIndex, isOpen, onToggle, completedExercises, onToggleExercise, onStartTimer }, ref) => (
     <div ref={ref} className="bg-[#1C1C1E] border border-neutral-800/80 rounded-2xl overflow-hidden" style={{ scrollMarginTop: '112px' }}>
        <button 
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left"
        >
            <span className="font-semibold text-lg text-neutral-100">{day.dayTitle}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div
            className="grid transition-[grid-template-rows] duration-500 ease-in-out"
            style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
            <div className="overflow-hidden min-h-0">
                 <div className="p-4 pt-0 space-y-4">
                    {day.exercises.map((exercise: any, exerciseIndex: number) => {
                        const exerciseId = `workout-${dayIndex}-exercise-${exerciseIndex}`;
                        return (
                            <ExerciseCard 
                                key={exerciseIndex}
                                id={exerciseId}
                                exercise={exercise}
                                isCompleted={!!completedExercises[exerciseId]}
                                onToggle={() => onToggleExercise(exerciseId)}
                                onStartTimer={onStartTimer}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
));

const RestTimer = ({ remaining, isPaused, nextExerciseName, onPauseResume, onSkip }: {
    remaining: number;
    isPaused: boolean;
    nextExerciseName: string;
    onPauseResume: () => void;
    onSkip: () => void;
}) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const isFinished = remaining <= 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6">
            <div className={`transition-all duration-500 w-full max-w-md mx-auto backdrop-blur-lg border border-neutral-700/60 rounded-2xl p-4 flex items-center justify-between shadow-2xl ${isFinished ? 'bg-green-500/90' : 'bg-[#2A2A2C]/90'} animate-fade-in-up-word`}>
                {/* Left side: Info */}
                <div className="flex-1 min-w-0">
                    <p className={`text-sm transition-colors ${isFinished ? 'text-green-100' : 'text-neutral-400'}`}>{isFinished ? 'Tempo esgotado!' : 'Próximo exercício'}</p>
                    <p className={`font-semibold text-lg truncate pr-2 transition-colors ${isFinished ? 'text-white' : 'text-neutral-100'}`}>{nextExerciseName}</p>
                </div>

                {/* Right side: Timer and Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <span className={`text-4xl font-bold tracking-tight transition-colors ${isFinished ? 'text-white' : 'text-neutral-100'}`}>{formatTime(remaining)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button onClick={onPauseResume} disabled={isFinished} className="bg-white/20 hover:bg-white/30 text-white rounded-full h-9 w-20 text-sm font-semibold transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isPaused ? 'Continuar' : 'Pausar'}
                        </button>
                        <button onClick={onSkip} className="bg-transparent hover:bg-white/10 text-neutral-400 hover:text-white rounded-full h-9 w-20 text-sm font-semibold transition-colors active:scale-95">
                            Pular
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const WorkoutScreen = ({ userData, navigate }: { userData: any, navigate: (screen: Screen) => void }) => {
    const [timerState, setTimerState] = React.useState({
        isActive: false,
        remaining: 0,
        exerciseId: null as string | null,
        isPaused: false,
    });
    const timerIntervalRef = React.useRef<number | null>(null);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const accordionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

    React.useEffect(() => {
        audioRef.current = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_bb630cc098.mp3');
    }, []);

    const cleanupTimer = React.useCallback(() => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
    }, []);

    const skipTimer = React.useCallback(() => {
        cleanupTimer();
        setTimerState({ isActive: false, remaining: 0, exerciseId: null, isPaused: false });
    }, [cleanupTimer]);

    const handlePauseResumeTimer = () => {
        setTimerState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    };

    const startTimer = (duration: number, exerciseId: string) => {
        cleanupTimer();
        setTimerState({
            isActive: true,
            remaining: duration,
            exerciseId: exerciseId,
            isPaused: false,
        });
    };
    
    React.useEffect(() => {
        if (timerState.isActive && !timerState.isPaused && timerState.remaining > 0) {
            timerIntervalRef.current = window.setInterval(() => {
                setTimerState(prev => ({ ...prev, remaining: prev.remaining - 1 }));
            }, 1000);
        } else if (timerState.remaining <= 0 && timerState.isActive) {
            cleanupTimer();
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.error("Error playing audio:", e));
            }
            setTimeout(skipTimer, 2000);
        }
        return cleanupTimer;
    }, [timerState.isActive, timerState.isPaused, timerState.remaining, cleanupTimer, skipTimer]);

    const workoutToDisplay = React.useMemo(() => {
        const split = userData.workoutPlan?.detailedWeeklySplit;
        if (!split || split.length === 0) {
            return { dayTitle: "Nenhum Treino", isRestDay: true, exercises: [] };
        }
        
        const todayIndex = new Date().getDay();
        const dayMap: { [key: string]: number } = {
            "Domingo": 0, "Segunda-feira": 1, "Terça-feira": 2, 
            "Quarta-feira": 3, "Quinta-feira": 4, "Sexta-feira": 5, "Sábado": 6
        };

        const todayWorkout = split.find((day: any) => dayMap[day.dayOfWeek] === todayIndex);

        if (todayWorkout && !todayWorkout.isRestDay) {
            return todayWorkout;
        }

        // If today is a rest day, find the next non-rest day
        for (let i = 1; i <= 7; i++) {
            const nextDayIndex = (todayIndex + i) % 7;
            const nextWorkoutDay = split.find((day: any) => dayMap[day.dayOfWeek] === nextDayIndex && !day.isRestDay);
            
            if (nextWorkoutDay) {
                return nextWorkoutDay;
            }
        }
        
        return { dayTitle: "Dia de Descanso", isRestDay: true, exercises: [] };
    }, [userData.workoutPlan]);

    const workoutDays = React.useMemo(() => {
        const allWorkoutDays = userData.workoutPlan?.detailedWeeklySplit?.filter((day: any) => !day.isRestDay) || [];
        
        const currentIndex = allWorkoutDays.findIndex((day: any) => day.dayTitle === workoutToDisplay.dayTitle);

        // If the current workout is found and it's not already the first one, reorder the array.
        if (currentIndex > 0) {
            return [
                ...allWorkoutDays.slice(currentIndex),
                ...allWorkoutDays.slice(0, currentIndex)
            ];
        }

        return allWorkoutDays; // Otherwise, return the original chronological order.
    }, [userData.workoutPlan, workoutToDisplay]);

    const getWorkoutSubtitle = (title: string | undefined) => {
        if (!title) return "Foco nos seus objetivos.";
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("costas") && lowerTitle.includes("bíceps")) return "Treino focado em puxada e fortalecimento dos braços.";
        if (lowerTitle.includes("peito") && (lowerTitle.includes("ombros") || lowerTitle.includes("tríceps"))) return "Desenvolvimento completo para a parte superior do corpo.";
        if (lowerTitle.includes("pernas")) return "Construindo a base com foco em força e volume.";
        if (lowerTitle.includes("descanso")) return "Recuperação ativa para otimizar seus resultados.";
        return "Um passo mais perto da sua melhor versão.";
    };

    const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);
    const [completedExercises, setCompletedExercises] = React.useState<{ [key: string]: boolean }>({});
    
    // Logic for localStorage persistence
    const getStorageKey = () => {
        const date = new Date();
        return `dreven_workout_progress_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    React.useEffect(() => {
        const storageKey = getStorageKey();
        try {
            const savedProgress = localStorage.getItem(storageKey);
            if (savedProgress) {
                setCompletedExercises(JSON.parse(savedProgress));
            }
        } catch (error) {
            console.error("Failed to load workout progress:", error);
        }
    }, []);

    const allExerciseIds = React.useMemo(() => {
        const workoutDaysForIds = userData.workoutPlan?.detailedWeeklySplit?.filter((day: any) => !day.isRestDay) || [];
        const ids: string[] = [];
        workoutDaysForIds.forEach((day: any, dayIndex: number) => {
             const originalDayIndex = userData.workoutPlan.detailedWeeklySplit.findIndex((d: any) => d.dayTitle === day.dayTitle);
            (day.exercises || []).forEach((_: any, exerciseIndex: number) => {
                ids.push(`workout-${originalDayIndex}-exercise-${exerciseIndex}`);
            });
        });
        return ids;
    }, [userData.workoutPlan]);


    React.useEffect(() => {
        // Automatically open the first accordion (which is now the current day's workout)
        // when the component mounts or the workout list changes.
        if (workoutDays.length > 0) {
            const firstDayOriginalIndex = userData.workoutPlan.detailedWeeklySplit.findIndex((d: any) => d.dayTitle === workoutDays[0].dayTitle);
            setOpenAccordion(`workout-${firstDayOriginalIndex}`);
        }
    }, [workoutDays, userData.workoutPlan.detailedWeeklySplit]);

    const handleToggleExercise = (exerciseId: string) => {
        const newCompletedState = {
            ...completedExercises,
            [exerciseId]: !completedExercises[exerciseId]
        };
        setCompletedExercises(newCompletedState);

        try {
            const storageKey = getStorageKey();
            localStorage.setItem(storageKey, JSON.stringify(newCompletedState));
        } catch (error) {
            console.error("Failed to save workout progress:", error);
        }

        const isCompleting = !completedExercises[exerciseId];
        if (isCompleting) {
            const currentIndex = allExerciseIds.indexOf(exerciseId);
            if (currentIndex > -1 && currentIndex < allExerciseIds.length - 1) {
                const nextExerciseId = allExerciseIds[currentIndex + 1];

                const [_, dayIndexStr] = nextExerciseId.split('-');
                const nextAccordionId = `workout-${dayIndexStr}`;

                if (openAccordion !== nextAccordionId) {
                    setOpenAccordion(nextAccordionId);
                }
                
                setTimeout(() => {
                    const nextEl = document.getElementById(nextExerciseId);
                    if (nextEl) {
                        nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 350);
            }
        }
    };
    
    const nextExerciseName = React.useMemo(() => {
        if (!timerState.exerciseId) return "Bom trabalho!";
        const currentIndex = allExerciseIds.indexOf(timerState.exerciseId);
        if (currentIndex > -1 && currentIndex < allExerciseIds.length - 1) {
            const nextExerciseId = allExerciseIds[currentIndex + 1];
            const [_, dayIndexStr, __, exerciseIndexStr] = nextExerciseId.split('-');
            const dayIndex = parseInt(dayIndexStr, 10);
            const exerciseIndex = parseInt(exerciseIndexStr, 10);

            const nextExercise = userData.workoutPlan?.detailedWeeklySplit[dayIndex]?.exercises[exerciseIndex];
            return nextExercise?.name || "Fim do treino";
        }
        return "Fim do treino";
    }, [timerState.exerciseId, allExerciseIds, userData.workoutPlan]);

    const MusicPlayer = () => {
        const iconStyle = "w-6 h-6 text-neutral-400 hover:text-white transition-colors cursor-pointer";

        const AppleMusicIcon = () => (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor">
                <path d="M12.246 6.131c.023-3.352 2.403-4.942 4.805-5.012-1.702 1.102-3.604 2.532-3.604 4.432 0 1.223.82 2.222 2.032 2.752-1.282.3-2.183-.699-3.233-2.172zm-.454 9.553c1.48-1.703 2.45-3.614 2.45-5.634 0-1.998-1.02-3.72-2.69-4.832-2.78 1.43-4.744 4.22-4.744 7.55 0 2.31 1.05 4.34 2.68 5.634.32.25.69.38 1.05.38.39 0 .76-.16 1.25-.1zM17.42.06C14.86.17 12.43 1.83 11.1 1.83c-1.33 0-3.24-1.72-5.83-1.66C2.15.28 0 3.22 0 7.42c0 4.75 2.8 8.04 5.48 8.04 1.34 0 2.56-1.03 4.2-1.03 1.62 0 2.76 1.03 4.22 1.03 2.7 0 5.1-3.3 5.1-7.12 0-3.3-1.9-5.4-4.58-6.28z"/>
            </svg>
        );
        const SpotifyIcon = () => (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.43 17.13c-.22.36-.66.48-.93.26-2.52-1.54-5.7-1.88-9.45-1.03-.33.07-.66-.13-.73-.46s.13-.66.46-.73c4.12-.93 7.7- .55 10.5 1.12.28.17.39.6.12.84zm1.2-2.7c-.27.43-.8.56-1.23.28-2.85-1.74-7.14-2.24-10.45-1.23-.42.13-.86-.12-1-.54s.12-.86.54-1c3.7-1.1 8.38-.55 11.6 1.37.43.26.56.8.29 1.23zm.13-2.82c-3.25-1.95-8.58-2.14-12.04-.92-.5.18-1.04-.15-1.22-.64s.15-1.04.64-1.22c3.85-1.35 9.7-.93 13.43 1.3.48.28.63.92.35 1.4-.28.48-.92.63-1.4.35z"/>
            </svg>
        );
        const DeezerIcon = () => (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor">
                <path d="M1.5 12h3V6h-3v6zm4.5-3h3v9h-3V9zm4.5 3h3v6h-3v-6zm4.5-6h3v15h-3V6zm4.5 3h3v9h-3V9z"/>
            </svg>
        );
        const YouTubeMusicIcon = () => (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor">
                <path d="M12 24C5.372 24 0 18.628 0 12S5.372 0 12 0s12 5.372 12 12-5.372 12-12 12zm0-21.6C6.703 2.4 2.4 6.703 2.4 12c0 5.297 4.303 9.6 9.6 9.6s9.6-4.303 9.6-9.6c0-5.297-4.303-9.6-9.6-9.6zM9.6 7.2v9.6l8.4-4.8-8.4-4.8z"/>
            </svg>
        );

        return (
            <div className="flex flex-col items-center gap-3 my-8">
                <p className="text-neutral-400 text-sm font-medium">Conectar a:</p>
                <div className="flex items-center gap-6">
                    <AppleMusicIcon />
                    <SpotifyIcon />
                    <DeezerIcon />
                    <YouTubeMusicIcon />
                </div>
            </div>
        );
    };

    return (
        <div className="w-full flex justify-center animate-fade-in font-inter">
            <main className="w-full max-w-md text-neutral-200 px-6 pt-24 pb-24">
                <header className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-md z-10">
                    <div className="max-w-md mx-auto flex items-center justify-center relative h-24 px-6">
                        <h1 className="text-xl font-bold text-neutral-100">SEU TREINO</h1>
                    </div>
                </header>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-neutral-100 tracking-tight">{workoutToDisplay?.dayTitle || 'Meu Treino'}</h2>
                    <p className="text-sm text-neutral-400 mt-1 max-w-xs mx-auto">{getWorkoutSubtitle(workoutToDisplay?.dayTitle)}</p>
                </div>
                
                <MusicPlayer />
                
                <div className="flex items-center gap-3 bg-[#1C1C1E] border border-neutral-800/80 rounded-2xl p-3 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neutral-400 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <p className="text-sm text-neutral-400">
                        <span className="font-semibold text-neutral-300">Dica:</span> Clique no nome de um exercício para assistir a um vídeo demonstrativo da execução correta.
                    </p>
                </div>

                <section className="space-y-3 mb-12">
                     {workoutDays.map((day: any, index: number) => {
                        const originalDayIndex = userData.workoutPlan.detailedWeeklySplit.findIndex((d: any) => d.dayTitle === day.dayTitle);
                        const accordionId = `workout-${originalDayIndex}`;
                        return (
                            <DayAccordion
                                ref={(el: HTMLDivElement | null) => (accordionRefs.current[accordionId] = el)} 
                                key={accordionId}
                                day={day}
                                dayIndex={originalDayIndex}
                                isOpen={openAccordion === accordionId}
                                onToggle={() => {
                                    const isOpening = openAccordion !== accordionId;
                                    setOpenAccordion(isOpening ? accordionId : null);

                                    if (isOpening) {
                                        setTimeout(() => {
                                            const element = accordionRefs.current[accordionId];
                                            if (element) {
                                                element.scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'start'
                                                });
                                            }
                                        }, 300);
                                    }
                                }}
                                completedExercises={completedExercises}
                                onToggleExercise={handleToggleExercise}
                                onStartTimer={startTimer}
                            />
                        );
                    })}
                </section>
            </main>
            {timerState.isActive && (
                <div key={timerState.exerciseId}>
                    <RestTimer
                        remaining={timerState.remaining}
                        isPaused={timerState.isPaused}
                        nextExerciseName={nextExerciseName}
                        onPauseResume={handlePauseResumeTimer}
                        onSkip={skipTimer}
                    />
                </div>
            )}
        </div>
    );
};

const PreWorkoutScreen = ({ userData, setUserData, navigate }: { userData: any, setUserData: any, navigate: (screen: Screen) => void }) => {
    const { name, trainer } = userData;
    const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
    const [showButton, setShowButton] = React.useState(false);
    const [countdown, setCountdown] = React.useState<number | null>(null);
    const [showAdaptModal, setShowAdaptModal] = React.useState(false);
    const [isAdapting, setIsAdapting] = React.useState(false);

    const workoutToDisplay = React.useMemo(() => {
        const split = userData.workoutPlan?.detailedWeeklySplit;
        if (!split) return { dayTitle: "Dia de Descanso", planFocus: "Recuperação." };
        
        const todayIndex = new Date().getDay();
        const dayMap: { [key: string]: number } = { "Domingo": 0, "Segunda-feira": 1, "Terça-feira": 2, "Quarta-feira": 3, "Quinta-feira": 4, "Sexta-feira": 5, "Sábado": 6 };
        
        const todayWorkout = split.find((day: any) => dayMap[day.dayOfWeek] === todayIndex && !day.isRestDay);
        if (todayWorkout) return todayWorkout;

        for (let i = 1; i <= 7; i++) {
            const nextDayIndex = (todayIndex + i) % 7;
            const nextWorkoutDay = split.find((day: any) => dayMap[day.dayOfWeek] === nextDayIndex && !day.isRestDay);
            if (nextWorkoutDay) return nextWorkoutDay;
        }

        return { dayTitle: "Dia de Descanso", planFocus: "Recuperação." };
    }, [userData.workoutPlan]);

    const handleAdaptWorkout = async (environment: 'home' | 'gym') => {
        setShowAdaptModal(false);
        setIsAdapting(true);
        try {
            const adaptedPlan = await generateAdaptedWorkoutPlan(userData.workoutPlan, userData, environment);
            if (adaptedPlan) {
                setUserData({ ...userData, workoutPlan: adaptedPlan });
            }
        } catch (error) {
            console.error("Failed to adapt workout", error);
        } finally {
            setIsAdapting(false);
        }
    };

    const getWorkoutSubtitle = (title: string | undefined) => {
        if (!title) return "Foco nos seus objetivos.";
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("costas") && lowerTitle.includes("bíceps")) return "Hoje vamos focar em puxada e fortalecimento dos braços.";
        if (lowerTitle.includes("peito") && (lowerTitle.includes("ombros") || lowerTitle.includes("tríceps"))) return "Vamos trabalhar o desenvolvimento completo da parte superior do corpo.";
        if (lowerTitle.includes("pernas")) return "O foco é construir a base com exercícios de força e volume.";
        return "Um passo mais perto da sua melhor versão.";
    };

    const FlameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
    const DumbbellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14.4 14.4 9.6 9.6"/><path d="M18 16 8 6"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="M18 6 6 18"/><path d="m19 11-4-4"/><path d="m5 13 4 4"/><path d="M12 22v-4"/><path d="M12 6V2"/><path d="M12 14v-4"/></svg>;
    const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
    const DropletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
    
    const messages = React.useMemo(() => [
        { type: 'text', content: `Olá, ${name.split(' ')[0]}! Tudo pronto para o treino de hoje?` },
        { type: 'text', content: `O treino de hoje é de ${workoutToDisplay.dayTitle}. ${getWorkoutSubtitle(workoutToDisplay.dayTitle)}` },
        { type: 'text', content: 'Antes de começarmos, aqui estão algumas recomendações rápidas:' },
        { type: 'card', icon: <FlameIcon />, title: 'Aquecimento', content: 'Realize 5 a 10 minutos de cardio leve (esteira, bicicleta, elíptico) e alguns alongamentos dinâmicos para preparar seu corpo.' },
        { type: 'card', icon: <DumbbellIcon />, title: 'Progressão de Carga', content: 'Busque sempre aumentar a carga ou as repetições de forma gradual. O corpo precisa de estímulos crescentes para continuar se adaptando.' },
        { type: 'card', icon: <MoonIcon />, title: 'Descanso e Recuperação', content: 'Garanta 7 a 9 horas de sono por noite para otimizar a recuperação muscular. Considere dias de descanso ativo para auxiliar na recuperação.' },
        { type: 'card', icon: <DropletIcon />, title: 'Hidratação e Nutrição', content: 'Beba bastante água e mantenha uma dieta rica em proteínas, carboidratos complexos e gorduras saudáveis para suportar a hipertrofia.' },
        { type: 'text', content: 'Vamos com tudo?' },
    ], [name, workoutToDisplay.dayTitle]);

    React.useEffect(() => {
        if (currentMessageIndex >= messages.length) {
            setShowButton(true);
            return; // Stop the timer loop
        }

        const duration = messages[currentMessageIndex].type === 'card' ? 2500 : 1800;
        const timer = setTimeout(() => {
            setCurrentMessageIndex(v => v + 1);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentMessageIndex, messages]);

    React.useEffect(() => {
        if (countdown === null || countdown <= 0) return;
        if (countdown === 1) {
            setTimeout(() => navigate('workout'), 1000);
        }
        const timer = setTimeout(() => {
            setCountdown(c => (c !== null ? c - 1 : null));
        }, 1000);
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    const initials = trainer.name.split(' ').map((n: string) => n[0]).join('');

    const AdaptWorkoutModal = ({ onClose }: { onClose: () => void }) => (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#1C1C1E] rounded-2xl p-6 w-full max-w-sm flex flex-col items-center border border-white/10 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Adaptar Treino</h3>
                <div className="w-full space-y-3">
                    <button onClick={() => handleAdaptWorkout('home')} className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors">Adaptar em casa</button>
                    <button onClick={() => handleAdaptWorkout('gym')} className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors">Adaptar na academia</button>
                </div>
                 <button onClick={onClose} className="mt-6 text-neutral-400 hover:text-white text-sm">Cancelar</button>
            </div>
        </div>
    );

    return (
        <div className="h-screen w-full bg-gradient-to-b from-[#121212] to-[#0A0A0A] animate-fade-in overflow-hidden flex flex-col">
            {countdown !== null && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
                    <div key={countdown} className="countdown-number text-8xl font-bold text-white">
                        {countdown}
                    </div>
                </div>
            )}
            {showAdaptModal && <AdaptWorkoutModal onClose={() => setShowAdaptModal(false)} />}


            <header className="relative w-full z-10 px-6 pt-16 pb-4 animate-fade-in-down-word flex-shrink-0">
                <div className="relative flex justify-center items-center max-w-md mx-auto">
                    <div className="absolute left-0">
                        <button 
                            onClick={() => navigate('dashboard')} 
                            className="p-2 text-neutral-500 hover:text-white transition-colors"
                            aria-label="Voltar"
                        >
                            <BackIcon />
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-800 text-xl font-semibold text-white mb-2 border border-neutral-600">
                            {initials}
                        </div>
                        <div>
                            <h2 className="font-semibold text-base text-white">{trainer.name}</h2>
                            <p className="text-sm text-neutral-400 -mt-0.5">Seu Especialista Dreven</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-end px-6 pb-8">
                <div className="relative h-64 flex items-end">
                     {isAdapting && (
                         <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white bg-[#2C2C2E] rounded-full px-4 py-2">Adaptando seu treino...</p>
                         </div>
                    )}
                    {!isAdapting && messages.map((msg, index) => {
                        let positionClass = 'opacity-0 -translate-y-5 pointer-events-none';
                        if (index === currentMessageIndex) {
                            positionClass = 'opacity-100 translate-y-0';
                        } else if (index > currentMessageIndex) {
                            positionClass = 'opacity-0 translate-y-5 pointer-events-none';
                        }

                        return (
                            <div
                                key={index}
                                className={`absolute w-full transition-all duration-700 ease-in-out ${positionClass}`}
                            >
                                {msg.type === 'text' ? (
                                    <div className="bg-[#2C2C2E] rounded-2xl rounded-bl-lg p-3.5 inline-block max-w-[85%] chat-bubble">
                                        <p className="text-neutral-50 text-base leading-snug">{msg.content}</p>
                                    </div>
                                ) : (
                                    <div className="bg-[#1C1C1E] border border-neutral-800 rounded-2xl rounded-bl-lg p-4 max-w-[95%] chat-bubble">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="text-green-400">{msg.icon}</div>
                                            <h3 className="font-semibold text-neutral-100">{msg.title}</h3>
                                        </div>
                                        <p className="text-neutral-400 text-sm">{msg.content}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            <footer className="w-full max-w-md mx-auto px-6 pb-6 flex-shrink-0">
                {showButton && (
                     <div className="slide-up-fade-in space-y-3">
                        <button
                           onClick={() => setShowAdaptModal(true)}
                           className="w-full bg-transparent border border-neutral-700/80 rounded-full py-3 text-base font-semibold text-neutral-300 shadow-lg transition-colors hover:bg-neutral-800 active:scale-95"
                        >
                            Adaptar
                        </button>
                        <button 
                            onClick={() => setCountdown(3)}
                             className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-full py-4 flex items-center justify-center font-bold text-base text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-95"
                        >
                           Começar
                        </button>
                    </div>
                )}
            </footer>
        </div>
    );
};

const CoachChatScreen = ({ userData, navigate }: { userData: any, navigate: (screen: Screen) => void }) => {
    const { trainer } = userData;
    const chatRef = React.useRef<any>(null);

    const [messages, setMessages] = React.useState([
        { sender: 'coach', text: `Olá, ${userData.name.split(' ')[0]}! Como posso te ajudar hoje com seu treino?` }
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const messagesEndRef = React.useRef<null | HTMLDivElement>(null);
    
    React.useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: {
                systemInstruction: `Você é ${trainer.name}, um Personal Trainer especialista e dedicado da Dreven. Você está conversando com seu cliente, ${userData.name}. Responda de forma concisa, amigável e profissional, como se estivesse em um chat. Forneça dicas úteis, esclareça dúvidas sobre exercícios ou motivação.`,
              },
              history: []
            });
        } catch (error) {
            console.error("Failed to initialize chat session:", error);
        }
    }, [trainer.name, userData.name]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(scrollToBottom, [messages, isTyping]);
    
    const handleSendMessage = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isTyping || !chatRef.current) return;

        const userMessage = { sender: 'user', text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await chatRef.current.sendMessage({ message: trimmedInput });
            const coachResponse = { sender: 'coach', text: response.text };
            setMessages(prev => [...prev, coachResponse]);

        } catch (error) {
            console.error("Error getting response from Gemini:", error);
            const errorMessage = { sender: 'coach', text: 'Desculpe, estou com um problema para me conectar agora. Tente novamente mais tarde.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const initials = trainer.name.split(' ').map((n: string) => n[0]).join('');

    return (
        // FIX: Matched background and animations with the PreWorkoutScreen for a consistent user experience.
        <div className="h-screen w-full bg-gradient-to-b from-[#121212] to-[#0A0A0A] animate-fade-in overflow-hidden flex flex-col font-inter">
            {/* Header */}
            {/* FIX: Increased top padding to lower the header, preventing it from being too close to the top edge of the screen. */}
            <header className="relative w-full z-10 px-6 pt-20 pb-4 flex-shrink-0">
                <div className="relative flex justify-center items-center max-w-md mx-auto">
                    <div className="absolute left-0">
                        <button 
                            onClick={() => navigate('dashboard')} 
                            className="p-2 text-neutral-500 hover:text-white transition-colors"
                            aria-label="Voltar"
                        >
                            <BackIcon />
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-800 text-xl font-semibold text-white mb-2 border border-neutral-600">
                            {initials}
                        </div>
                        <div>
                            <h2 className="font-semibold text-base text-white">{trainer.name}</h2>
                            <p className="text-sm text-neutral-400 -mt-0.5">Seu Especialista Dreven</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 w-full max-w-md mx-auto pb-24 overflow-y-auto px-4">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender === 'coach' && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-sm font-semibold text-white flex-shrink-0">
                                    {initials}
                                </div>
                            )}
                            <div className={`rounded-2xl p-3.5 max-w-[80%] animate-fade-in-up-word ${
                                message.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-lg' 
                                : 'bg-[#2C2C2E] text-neutral-50 rounded-bl-lg'
                            }`}>
                                <p className="text-base leading-snug">{message.text}</p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                         <div className="flex items-end gap-2 justify-start animate-fade-in-up-word">
                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-sm font-semibold text-white flex-shrink-0">
                                 {initials}
                             </div>
                             <div className="bg-[#2C2C2E] rounded-2xl rounded-bl-lg p-3.5 inline-flex items-center gap-1.5">
                                <span className="block w-2 h-2 bg-neutral-400 rounded-full" style={{ animation: 'blink 1.4s infinite both', animationDelay: '0s' }}></span>
                                <span className="block w-2 h-2 bg-neutral-400 rounded-full" style={{ animation: 'blink 1.4s infinite both', animationDelay: '0.2s' }}></span>
                                <span className="block w-2 h-2 bg-neutral-400 rounded-full" style={{ animation: 'blink 1.4s infinite both', animationDelay: '0.4s' }}></span>
                             </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-20 bg-[#0A0A0A]">
                <div className="max-w-md mx-auto p-4">
                    <div className="flex items-center gap-2 bg-[#1C1C1E] border border-neutral-700/80 rounded-full p-2">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 bg-transparent px-4 text-white placeholder-neutral-400 focus:outline-none"
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white transition-transform active:scale-90 disabled:bg-neutral-600 disabled:scale-100"
                        >
                             <SendIcon />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};


const ModalitiesListScreen = ({ userData, navigate, setModalityIntro }: { userData: any, navigate: (screen: Screen) => void, setModalityIntro: (modality: string) => void }) => {

    const handleModalityClick = (modalityName: string) => {
        setModalityIntro(modalityName);
    };

    const modalitiesData: { [key: string]: { img: string; desc: string; tag: string; tagColor: 'red' | 'orange' | 'blue' | 'cyan' | 'green'; kcal: string; } } = {
        "Muay Thai": { img: "https://images.unsplash.com/photo-1526793248754-cf6014a378e8?w=320&q=80", desc: "Resistência • 60 min", tag: "Intenso", tagColor: "red", kcal: "+850 kcal" },
        "Boxe": { img: "https://images.unsplash.com/photo-1636581563884-39569e81cbad?w=320&q=80", desc: "Potência • 60 min", tag: "Popular", tagColor: "orange", kcal: "+700 kcal" },
        "Corrida": { img: "https://images.unsplash.com/photo-1744706908540-c7450689a30a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Cardio • 45 min", tag: "Resistência", tagColor: "blue", kcal: "+500 kcal" },
        "Natação": { img: "https://images.unsplash.com/photo-1569880153113-76e332685714?w=320&q=80", desc: "Corpo Inteiro • 60 min", tag: "Relaxante", tagColor: "cyan", kcal: "+600 kcal" },
        "Funcional": { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&q=80", desc: "Força/Cardio • 50 min", tag: "Dinâmico", tagColor: "green", kcal: "+550 kcal" }
    };

     const tagColors = {
        red: "bg-red-500/10 text-red-400",
        orange: "bg-orange-500/10 text-orange-400",
        blue: "bg-blue-500/10 text-blue-400",
        cyan: "bg-cyan-500/10 text-cyan-400",
        green: "bg-green-500/10 text-green-400",
    };

    return (
        <div className="w-full flex justify-center animate-fade-in font-inter">
            <main className="w-full max-w-md text-neutral-200 px-6 pt-24 pb-12">
                <header className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-md z-10">
                    <div className="max-w-md mx-auto flex items-center justify-center relative h-24 px-6">
                         <h1 className="text-xl font-bold text-neutral-100">Suas Modalidades</h1>
                    </div>
                </header>

                <div className="space-y-4">
                     {userData.modalities && userData.modalities.length > 0 ? (
                        userData.modalities.map((modalityName: string) => {
                            const modality = modalitiesData[modalityName as keyof typeof modalitiesData] || { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=320&q=80", desc: "Performance • 50 min", tag: "Custom", tagColor: "green", kcal: "+500 kcal" };
                            const colorClass = tagColors[modality.tagColor as keyof typeof tagColors] || "bg-neutral-500/10 text-neutral-400";

                            return (
                                <button key={modalityName} onClick={() => handleModalityClick(modalityName)} className="w-full text-left bg-[#1C1C1E] border border-neutral-800/80 flex gap-4 rounded-[1.25rem] p-4 items-center transition-colors hover:bg-neutral-800">
                                    <img src={modality.img} alt={modalityName} className="w-12 h-12 rounded-full object-cover flex-shrink-0 grayscale" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-base text-neutral-100">{modalityName}</p>
                                        <p className="text-neutral-400 text-sm">{modality.desc}</p>
                                    </div>
                                    <div className="flex flex-col items-end flex-shrink-0">
                                        <div className={`px-2.5 py-1 ${colorClass} rounded-full text-xs font-bold`}>{modality.tag}</div>
                                        <p className="text-neutral-500 text-sm mt-2">{modality.kcal}</p>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                         <div className="bg-[#1C1C1E] border border-neutral-800/80 rounded-[1.25rem] p-4 text-center">
                            <p className="text-neutral-400">Nenhuma modalidade selecionada.</p>
                         </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const ModalityIntroModal = ({ modalityName, userData, setUserData, onClose, onStart }: { modalityName: string, userData: any, setUserData: any, onClose: () => void, onStart: () => void }) => {
    const [showAdaptModal, setShowAdaptModal] = React.useState(false);
    const [isAdapting, setIsAdapting] = React.useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);

    const handleAdaptPlan = async (environment: 'home' | 'gym') => {
        setShowAdaptModal(false);
        setIsAdapting(true);
        try {
            const frequency = userData.modalityFrequencies?.[modalityName] || '2x';
            const [adaptedPlan, generatedTips] = await Promise.all([
                generateModalityPlan(userData, modalityName, frequency, environment),
                generateDetailedModalityContent(userData, modalityName)
            ]);
            
            if (adaptedPlan) {
                setUserData((prev: any) => ({
                    ...prev,
                    modalityPlans: {
                        ...prev.modalityPlans,
                        [modalityName]: { plan: adaptedPlan, tips: generatedTips }
                    }
                }));
            }
        } catch (e) {
            console.error("Failed to adapt modality plan", e);
        } finally {
            setIsAdapting(false);
        }
    };

    const FlameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
    const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
    const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

    const messages = React.useMemo(() => [
        { type: 'card', icon: <FlameIcon />, title: 'Aquecimento é Essencial', content: 'Aqueça de forma específica para preparar o corpo e evitar lesões.' },
        { type: 'card', icon: <ZapIcon />, title: 'Intensidade e Foco', content: 'Concentre-se na execução correta. Qualidade é mais importante que quantidade.' },
        { type: 'card', icon: <ShieldIcon />, title: 'Segurança em Primeiro Lugar', content: 'Use o equipamento de proteção adequado e sempre respeite seus limites.' },
    ], []);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
        }, 2800);

        return () => clearInterval(intervalId);
    }, [messages.length]);

    const AdaptWorkoutModal = ({ onClose: onAdaptModalClose }: { onClose: () => void }) => (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
            <div className="bg-[#1C1C1E] rounded-2xl p-6 w-full max-w-sm flex flex-col items-center border border-white/10 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Adaptar Treino</h3>
                <div className="w-full space-y-3">
                    <button onClick={() => handleAdaptPlan('home')} className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors">Adaptar para casa</button>
                    <button onClick={() => handleAdaptPlan('gym')} className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-colors">Adaptar para academia</button>
                </div>
                <button onClick={onAdaptModalClose} className="mt-6 text-neutral-400 hover:text-white text-sm">Cancelar</button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            {showAdaptModal && <AdaptWorkoutModal onClose={() => setShowAdaptModal(false)} />}

            <div className="relative bg-[#1C1C1E] rounded-3xl p-4 w-full max-w-xs flex flex-col items-center border border-neutral-800/80 shadow-2xl subtle-slide-up-fade-in">
                <h2 className="text-2xl font-bold text-white mb-2">Treino de {modalityName}</h2>
                <p className="text-neutral-400 mb-6 text-center text-sm">Prepare-se para evoluir com foco na técnica e condicionamento.</p>
                
                 {isAdapting ? (
                    <div className="h-[120px] flex items-center justify-center mb-6 w-full">
                        <p className="text-white bg-[#2C2C2E] rounded-full px-4 py-2">Adaptando seu treino...</p>
                    </div>
                ) : (
                    <div className="relative w-full mb-6 h-[120px]">
                        {messages.map((msg, index) => (
                             <div 
                                key={index} 
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${currentMessageIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                             >
                                <div className="bg-[#2C2C2E] border border-neutral-700/80 rounded-2xl p-4 flex items-center gap-4 h-full">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#1C1C1E] border border-neutral-700/60 rounded-full flex items-center justify-center text-green-400">
                                        {msg.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base text-white">{msg.title}</h3>
                                        <p className="text-neutral-400 text-sm leading-snug">{msg.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-full space-y-3">
                    <button onClick={() => setShowAdaptModal(true)} disabled={isAdapting} className="w-full bg-transparent border border-neutral-700/80 rounded-full py-3 text-base font-semibold text-neutral-300 shadow-lg transition-colors hover:bg-neutral-800 active:scale-95 disabled:opacity-50">Adaptar</button>
                    <button onClick={onStart} disabled={isAdapting} className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-full py-4 flex items-center justify-center font-bold text-base text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-95 disabled:opacity-50">Começar</button>
                </div>
            </div>
        </div>
    );
};

const TipTag = ({ tag }: { tag: string }) => {
    const tagStyles: { [key: string]: string } = {
        'FOCO': 'bg-blue-500/20 text-blue-300',
        'DICA': 'bg-green-500/20 text-green-300',
        'IMPORTANTE': 'bg-yellow-500/20 text-yellow-300',
        'TÉCNICA': 'bg-purple-500/20 text-purple-300',
        'SEGURANÇA': 'bg-red-500/20 text-red-300',
    };
    const normalizedTag = tag.toUpperCase();
    const style = tagStyles[normalizedTag] || 'bg-neutral-700 text-neutral-300';
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${style} mr-2`}>{tag}</span>;
};

const TipsRenderer = ({ text = "" }: { text: string }) => {
    const sections = text.split('\n\n');
    return (
        <div className="space-y-4 text-neutral-300">
            {sections.map((section, i) => {
                if (!section.trim()) return null;
                const lines = section.split('\n');
                const title = lines[0];
                const items = lines.slice(1);
                return (
                    <div key={i}>
                        <h4 className="font-bold text-lg text-white mb-3" dangerouslySetInnerHTML={{ __html: title.replace(/\*\*(.*?)\*\*/g, '$1') }}></h4>
                        <ul className="space-y-3 pl-1">
                            {items.map((item, j) => {
                                const match = item.match(/-\s*\[(.*?)\]\s*(.*)/);
                                if (match) {
                                    const [, tag, content] = match;
                                    return (
                                        <li key={j} className="flex">
                                            <div className="flex-1">
                                                <TipTag tag={tag} />
                                                <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-neutral-100">$1</strong>') }} />
                                            </div>
                                        </li>
                                    )
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};


const ModalityTipsModal = ({ modalityName, tips, onClose, navigate }: { modalityName: string; tips: string; onClose: () => void; navigate: (screen: Screen) => void; }) => {
    const handleConnect = () => {
        onClose();
        navigate('coach_chat');
    };
    
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#1C1C1E] rounded-2xl p-6 w-full max-w-md max-h-[90vh] flex flex-col border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-semibold text-white">{modalityName === 'Corrida' ? 'Planilha Detalhada' : 'Instruções e Dicas'}</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"><CloseIcon /></button>
                </div>
                <div className="overflow-y-auto pr-2 -mr-4 flex-grow">
                   {tips ? <TipsRenderer text={tips} /> : <p>Nenhuma dica disponível.</p>}
                </div>
                 <div className="mt-6 flex-shrink-0 flex items-center gap-3">
                    <button onClick={onClose} className="w-full bg-transparent border border-neutral-700/80 rounded-full py-3 text-base font-semibold text-neutral-300 shadow-lg transition-colors hover:bg-neutral-800 active:scale-95">
                        Fechar
                    </button>
                    <button onClick={handleConnect} className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 flex items-center justify-center gap-2 text-white font-semibold text-base transition-colors hover:bg-white/20 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
                        <span>Especialista</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const IntensityTag = ({ intensity }: { intensity?: string }) => {
    if (!intensity) return null;
    const lowerIntensity = intensity.toLowerCase();
    let colorClasses = 'bg-neutral-700 text-neutral-300';
    if (lowerIntensity.includes('leve') || lowerIntensity.includes('baixa')) colorClasses = 'bg-cyan-500/20 text-cyan-300';
    if (lowerIntensity.includes('moderada')) colorClasses = 'bg-yellow-500/20 text-yellow-300';
    if (lowerIntensity.includes('forte') || lowerIntensity.includes('intensa') || lowerIntensity.includes('alta')) colorClasses = 'bg-red-500/20 text-red-300';
    
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${colorClasses}`}>{intensity}</span>;
}

const ModalityDayAccordion = React.forwardRef<HTMLDivElement, any>(({ day, dayIndex, isOpen, onToggle, completedItems, onToggleItem }, ref) => {
    const isStructural = (name: string) => /repetir|aquecimento|desaquecimento|bloco|principal|rounds/i.test(name);
    
    return (
        <div ref={ref} className="bg-[#1C1C1E] border border-neutral-800/80 rounded-2xl overflow-hidden" style={{ scrollMarginTop: '112px' }}>
            <button onClick={onToggle} className="w-full flex items-center justify-between p-4 text-left">
                <h3 className="text-xl font-bold text-white">{day.dayTitle} (Dia {dayIndex + 1})</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="grid transition-all duration-500 ease-in-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="overflow-hidden min-h-0">
                    <div className="p-4 pt-0 space-y-1">
                        {day.exercises.map((ex: any, exIndex: number) => {
                            if (isStructural(ex.name)) {
                                return (
                                    <div key={exIndex} className={`text-center py-2 my-2 text-sm font-semibold rounded-md bg-neutral-800/60 text-neutral-300`}>
                                        {ex.name}
                                        {ex.details && <p className="text-xs font-normal text-neutral-400">{ex.details}</p>}
                                    </div>
                                );
                            }

                            const isCompleted = !!completedItems[`${dayIndex}-${exIndex}`];
                            return (
                                <div key={exIndex} className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${isCompleted ? 'bg-green-500/5' : ''}`}>
                                    <div className="flex-1">
                                        <p className={`font-semibold text-neutral-100 transition-colors ${isCompleted ? 'line-through text-neutral-400' : ''}`}>{ex.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {ex.duration && (
                                                <span className="flex items-center gap-1.5 text-sm text-neutral-400">
                                                    <ClockIcon /> {ex.duration}
                                                </span>
                                            )}
                                            {ex.intensity && <IntensityTag intensity={ex.intensity} />}
                                        </div>
                                        {ex.details && !ex.duration && !ex.intensity && (
                                            <p className="text-sm text-neutral-400 mt-1">{ex.details}</p>
                                        )}
                                    </div>
                                    <CompletionCheckbox isCompleted={isCompleted} onClick={() => onToggleItem(dayIndex, exIndex)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});


const ModalityWorkoutScreen = ({ userData, navigate, modalityName, setUserData, setTipsModalData }: { 
    userData: any; 
    navigate: (screen: Screen) => void; 
    modalityName: string | null; 
    setUserData: any; 
    setTipsModalData: (data: { name: string, tips: string } | null) => void 
}) => {
    const [currentModalityData, setCurrentModalityData] = React.useState<{plan: any, tips: string} | null>(null);
    const [completedItems, setCompletedItems] = React.useState<Record<string, boolean>>({});
    const [openAccordionIndex, setOpenAccordionIndex] = React.useState<number | null>(0);
    const accordionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
    
    const handleToggleItem = (dayIndex: number, exIndex: number) => {
        const key = `${dayIndex}-${exIndex}`;
        setCompletedItems(prev => ({...prev, [key]: !prev[key]}));
    };
    
    const handleAccordionToggle = (index: number) => {
        const isOpening = openAccordionIndex !== index;
        setOpenAccordionIndex(isOpening ? index : null);
        if (isOpening) {
            setTimeout(() => {
                const element = accordionRefs.current[index];
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    };

    React.useEffect(() => {
        if (modalityName && userData.modalityPlans) {
            setCurrentModalityData(userData.modalityPlans[modalityName]);
        }
    }, [modalityName, userData.modalityPlans]);

    if (!modalityName) {
        React.useEffect(() => { navigate('dashboard'); }, [navigate]);
        return null;
    }
    
    const MusicPlayer = () => {
        const iconStyle = "w-6 h-6 text-neutral-400 hover:text-white transition-colors cursor-pointer";
        const AppleMusicIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor"><path d="M12.246 6.131c.023-3.352 2.403-4.942 4.805-5.012-1.702 1.102-3.604 2.532-3.604 4.432 0 1.223.82 2.222 2.032 2.752-1.282.3-2.183-.699-3.233-2.172zm-.454 9.553c1.48-1.703 2.45-3.614 2.45-5.634 0-1.998-1.02-3.72-2.69-4.832-2.78 1.43-4.744 4.22-4.744 7.55 0 2.31 1.05 4.34 2.68 5.634.32.25.69.38 1.05.38.39 0 .76-.16 1.25-.1zM17.42.06C14.86.17 12.43 1.83 11.1 1.83c-1.33 0-3.24-1.72-5.83-1.66C2.15.28 0 3.22 0 7.42c0 4.75 2.8 8.04 5.48 8.04 1.34 0 2.56-1.03 4.2-1.03 1.62 0 2.76 1.03 4.22 1.03 2.7 0 5.1-3.3 5.1-7.12 0-3.3-1.9-5.4-4.58-6.28z"/></svg>);
        const SpotifyIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.43 17.13c-.22.36-.66.48-.93.26-2.52-1.54-5.7-1.88-9.45-1.03-.33.07-.66-.13-.73-.46s.13-.66.46-.73c4.12-.93 7.7- .55 10.5 1.12.28.17.39.6.12.84zm1.2-2.7c-.27.43-.8.56-1.23.28-2.85-1.74-7.14-2.24-10.45-1.23-.42.13-.86-.12-1-.54s.12-.86.54-1c3.7-1.1 8.38-.55 11.6 1.37.43.26.56.8.29 1.23zm.13-2.82c-3.25-1.95-8.58-2.14-12.04-.92-.5.18-1.04-.15-1.22-.64s.15-1.04.64-1.22c3.85-1.35 9.7-.93 13.43 1.3.48.28.63.92.35 1.4-.28.48-.92.63-1.4.35z"/></svg>);
        const DeezerIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor"><path d="M1.5 12h3V6h-3v6zm4.5-3h3v9h-3V9zm4.5 3h3v6h-3v-6zm4.5-6h3v15h-3V6zm4.5 3h3v9h-3V9z"/></svg>);
        const YouTubeMusicIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="currentColor"><path d="M12 24C5.372 24 0 18.628 0 12S5.372 0 12 0s12 5.372 12 12-5.372 12-12 12zm0-21.6C6.703 2.4 2.4 6.703 2.4 12c0 5.297 4.303 9.6 9.6 9.6s9.6-4.303 9.6-9.6c0-5.297-4.303-9.6-9.6-9.6zM9.6 7.2v9.6l8.4-4.8-8.4-4.8z"/></svg>);

        return (
            <div className="flex flex-col items-center gap-3 my-8">
                <p className="text-neutral-400 text-sm font-medium">Conectar a:</p>
                <div className="flex items-center gap-6">
                    <AppleMusicIcon />
                    <SpotifyIcon />
                    <DeezerIcon />
                    <YouTubeMusicIcon />
                </div>
            </div>
        );
    };

    return (
        <div className="w-full flex justify-center animate-fade-in font-inter">
            <main className="w-full max-w-md text-neutral-200 px-6 pt-24 pb-12">
                 <header className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-md z-10">
                    <div className="max-w-md mx-auto flex items-center justify-center relative h-24 px-6">
                         <h1 className="text-xl font-bold text-neutral-100">Plano de {modalityName}</h1>
                    </div>
                </header>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-neutral-100 tracking-tight">{currentModalityData?.plan?.planName || `Plano de ${modalityName}`}</h2>
                    <p className="text-sm text-neutral-400 mt-1 max-w-xs mx-auto">{currentModalityData?.plan?.planFocus || "Foco em desenvolver suas habilidades."}</p>
                </div>
                
                <MusicPlayer />
                
                 <button 
                    onClick={() => {
                        if (modalityName && currentModalityData) {
                            setTipsModalData({ name: modalityName, tips: currentModalityData.tips || '' });
                        }
                    }}
                    className="w-full bg-transparent border border-neutral-700/80 rounded-xl py-3 mb-6 text-base font-semibold text-neutral-300 shadow-lg transition-colors hover:bg-neutral-800 active:scale-95"
                >
                    {modalityName === 'Corrida' ? `Ver Planilha de ${modalityName} Detalhada` : 'Ver Instruções'}
                </button>

                <div className="space-y-3">
                     {currentModalityData?.plan?.detailedWeeklySplit?.map((day: any, dayIndex: number) => (
                         <ModalityDayAccordion
                            ref={(el: HTMLDivElement | null) => (accordionRefs.current[dayIndex] = el)}
                            key={dayIndex}
                            day={day}
                            dayIndex={dayIndex}
                            isOpen={openAccordionIndex === dayIndex}
                            onToggle={() => handleAccordionToggle(dayIndex)}
                            completedItems={completedItems}
                            onToggleItem={handleToggleItem}
                        />
                    ))}
                    {!currentModalityData?.plan && <p className="text-center text-neutral-400">Nenhum plano de treino disponível para esta modalidade.</p>}
                </div>
            </main>
        </div>
    )
};

export default App;