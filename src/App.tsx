import React from 'react';
import { useCalculateur } from './hooks/useCalculateur';
import { STEPS } from './types';
import { StepIndicator } from './components/ui';
import { Step1, Step2, Step3, Step4, Step5 } from './components/steps';
import { generatePDF } from './utils/pdfExport';
import { Building2, ExternalLink } from 'lucide-react';

function App() {
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
  } = useCalculateur();

  const handleExportPDF = async () => {
    if (calculatedValues) {
      try {
        await generatePDF(formData, calculatedValues);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        alert('Une erreur est survenue lors de la génération du PDF.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-corpiq-blue border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-corpiq-blue text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 size={32} />
              <div>
                <h1 className="text-2xl font-bold">Calculateur d'augmentation de loyer</h1>
                <p className="text-blue-200 text-sm">Année 2026 - CORPIQ</p>
              </div>
            </div>
            <a 
              href="https://www.corpiq.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <span>corpiq.com</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <StepIndicator 
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
          onStepClick={goToStep}
        />

        {/* Current step title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-corpiq-blue">
            Étape {currentStep}: {STEPS[currentStep - 1]?.title}
          </h2>
          <p className="text-gray-600">{STEPS[currentStep - 1]?.description}</p>
        </div>

        {/* Step content */}
        {currentStep === 1 && (
          <Step1
            formData={formData}
            calculatedValues={calculatedValues}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 2 && (
          <Step2
            formData={formData}
            calculatedValues={calculatedValues}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrevious={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <Step3
            formData={formData}
            calculatedValues={calculatedValues}
            addReparation={addReparation}
            updateReparation={updateReparation}
            removeReparation={removeReparation}
            onNext={nextStep}
            onPrevious={prevStep}
          />
        )}
        
        {currentStep === 4 && (
          <Step4
            formData={formData}
            calculatedValues={calculatedValues}
            addNouvelleDepense={addNouvelleDepense}
            updateNouvelleDepense={updateNouvelleDepense}
            removeNouvelleDepense={removeNouvelleDepense}
            addVariationAide={addVariationAide}
            updateVariationAide={updateVariationAide}
            removeVariationAide={removeVariationAide}
            onNext={nextStep}
            onPrevious={prevStep}
          />
        )}
        
        {currentStep === 5 && (
          <Step5
            formData={formData}
            calculatedValues={calculatedValues}
            updateFormData={updateFormData}
            onPrevious={prevStep}
            onReset={resetForm}
            onExportPDF={handleExportPDF}
          />
        )}

        {/* Auto-save indicator */}
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm shadow-md flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Sauvegarde automatique
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>
            Ce calculateur reproduit la méthodologie du{' '}
            <a 
              href="https://extranet.tal.gouv.qc.ca/internet/asp/Fixation/Simulateurdecalcul.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corpiq-blue hover:underline"
            >
              Tribunal administratif du logement (TAL)
            </a>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} CORPIQ - Corporation des propriétaires immobiliers du Québec
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
