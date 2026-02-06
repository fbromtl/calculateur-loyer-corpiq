import React from 'react';
import { useCalculateur } from './hooks/useCalculateur';
import { STEPS } from './types';
import { StepIndicator } from './components/ui';
import { Step1, Step2, Step3, Step4, Step5, Step6 } from './components/steps';
import { generatePDF } from './utils/pdfExport';
import { ExternalLink, Languages, Building2, Save } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const { language, setLanguage, t } = useLanguage();
  const {
    formData,
    calculatedValues,
    currentStep,
    isLoading,
    updateFormData,
    addReparation,
    updateReparation,
    removeReparation,
    addNouvelleDepense,
    updateNouvelleDepense,
    removeNouvelleDepense,
    addVariationAide,
    updateVariationAide,
    removeVariationAide,
    resetForm,
    nextStep,
    prevStep,
    goToStep,
    canAccessStep,
  } = useCalculateur();

  const handleExportPDF = async () => {
    if (calculatedValues) {
      try {
        await generatePDF(formData, calculatedValues, language);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        alert('Une erreur est survenue lors de la génération du PDF.');
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0c2240 0%, #13315c 40%, #530f32 100%)'}}>
        <div className="text-center animate-fade-in-up">
          <div className="relative mx-auto mb-8 w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-white/10 border-b-transparent animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-white/80 font-semibold text-lg">{t.app.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="relative text-white sticky top-0 z-40 shadow-xl" style={{background: 'linear-gradient(135deg, #0a1b35 0%, #0c2240 30%, #13315c 60%, #1a4178 100%)'}}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-40" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 sm:py-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white/10 shadow-inner-glow flex items-center justify-center border border-white/10 hover:bg-white/15 transition-colors">
                <Building2 size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight">{t.app.title}</h1>
                <p className="text-blue-200/50 text-xs font-medium mt-0.5 hidden sm:block">{t.app.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-all px-3.5 py-2 rounded-xl hover:bg-white/10 font-semibold text-sm border border-transparent hover:border-white/10"
                title={language === 'en' ? 'Changer en français' : 'Switch to English'}
              >
                <Languages size={16} />
                <span>{language === 'en' ? 'FR' : 'EN'}</span>
              </button>
              <a href="https://www.corpiq.com" target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-all px-3.5 py-2 rounded-xl hover:bg-white/10 text-sm border border-transparent hover:border-white/10">
                <span>corpiq.com</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-black/30">
          <div className="h-full transition-all duration-700 ease-out rounded-r-full relative overflow-hidden"
            style={{
              width: `${(currentStep / STEPS.length) * 100}%`,
              background: 'linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)',
            }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{backgroundSize: '200% 100%'}} />
          </div>
        </div>
      </header>

      {/* ─── Main ───────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS}
          onStepClick={goToStep} canAccessStep={canAccessStep} disabledMessage={t.common.completePreviousSteps} />

        {/* Step title */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-corpiq-blue/8 text-corpiq-blue">
            <span className="text-xs font-bold uppercase tracking-widest">
              {language === 'en' ? 'Step' : 'Étape'} {currentStep}/{STEPS.length}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {t.steps[`step${currentStep}` as keyof typeof t.steps].title}
          </h2>
          <p className="text-gray-500 mt-2 text-base leading-relaxed max-w-2xl">
            {t.steps[`step${currentStep}` as keyof typeof t.steps].description}
          </p>
        </div>

        <div key={currentStep} className="step-enter">
          {currentStep === 1 && <Step1 formData={formData} calculatedValues={calculatedValues} updateFormData={updateFormData} onNext={nextStep} />}
          {currentStep === 2 && <Step2 formData={formData} calculatedValues={calculatedValues} updateFormData={updateFormData} onNext={nextStep} onPrevious={prevStep} />}
          {currentStep === 3 && <Step3 formData={formData} calculatedValues={calculatedValues} addReparation={addReparation} updateReparation={updateReparation} removeReparation={removeReparation} onNext={nextStep} onPrevious={prevStep} />}
          {currentStep === 4 && <Step4 formData={formData} calculatedValues={calculatedValues} addNouvelleDepense={addNouvelleDepense} updateNouvelleDepense={updateNouvelleDepense} removeNouvelleDepense={removeNouvelleDepense} addVariationAide={addVariationAide} updateVariationAide={updateVariationAide} removeVariationAide={removeVariationAide} onNext={nextStep} onPrevious={prevStep} />}
          {currentStep === 5 && <Step5 formData={formData} calculatedValues={calculatedValues} updateFormData={updateFormData} onPrevious={prevStep} onNext={nextStep} />}
          {currentStep === 6 && <Step6 formData={formData} calculatedValues={calculatedValues} onPrevious={prevStep} onReset={resetForm} onExportPDF={handleExportPDF} />}
        </div>

        {/* Auto-save */}
        <div className="fixed bottom-5 right-5 z-50 glass bg-white/90 text-gray-600 pl-3 pr-3.5 py-2 rounded-xl text-xs shadow-card border border-gray-200/50 flex items-center gap-2 animate-fade-in">
          <Save size={12} className="text-emerald-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">{t.app.autoSave}</span>
        </div>
      </main>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer className="text-white mt-auto" style={{background: 'linear-gradient(135deg, #0a1b35 0%, #0c2240 40%, #13315c 100%)'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center border border-white/10">
                <Building2 size={18} className="text-blue-300/60" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-wide">CORPIQ</p>
                <p className="text-blue-300/40 text-xs">Corporation des propriétaires immobiliers du Québec</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200/30 text-xs">© {new Date().getFullYear()} CORPIQ — {t.app.footerRights}</p>
              <a href="https://www.corpiq.com" target="_blank" rel="noopener noreferrer"
                className="text-blue-300/30 hover:text-white transition-colors text-xs">www.corpiq.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
