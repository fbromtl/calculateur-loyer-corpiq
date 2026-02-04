import React from 'react';
import { FormData, CalculatedValues } from '../../types';
import { 
  SectionCard, 
  CurrencyInput, 
  CalculatedField, 
  LabelWithTooltip,
  NavigationButtons,
  InfoTooltip
} from '../ui';
import { Download, RotateCcw, Calculator, TrendingUp, Home } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';
import { useLanguage } from '../../i18n/LanguageContext';

interface Step5Props {
  formData: FormData;
  calculatedValues: CalculatedValues | null;
  updateFormData: (updates: Partial<FormData>) => void;
  onPrevious: () => void;
  onReset: () => void;
  onExportPDF: () => void;
}

export const Step5: React.FC<Step5Props> = ({
  formData,
  calculatedValues,
  updateFormData,
  onPrevious,
  onReset,
  onExportPDF,
}) => {
  const { t } = useLanguage();
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const updateDeneigement = (field: 'frais2025' | 'frais2024', value: number) => {
    updateFormData({
      deneigement: {
        ...formData.deneigement,
        [field]: value,
      },
    });
  };

  // Calcul ajustement déneigement
  const ajustementDeneigement = React.useMemo(() => {
    if (!calculatedValues || calculatedValues.revenusImmeuble === 0) return 0;
    const variation = formData.deneigement.frais2025 - formData.deneigement.frais2024;
    const poidsLoyer = (formData.loyerMensuelActuel * 12) / calculatedValues.revenusImmeuble;
    return Math.round((variation / 12) * poidsLoyer * 100) / 100;
  }, [formData, calculatedValues]);

  const handleReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  return (
    <div>
      {/* Section Déneigement (pour parcs de maisons mobiles) */}
      <SectionCard 
        title={t.step5.snowRemoval.title}
        tooltip={t.step5.snowRemoval.tooltip}
      >
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600">
            {t.step5.snowRemoval.note}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <LabelWithTooltip htmlFor="deneig2025">
              {t.step5.snowRemoval.fees2025}
            </LabelWithTooltip>
            <CurrencyInput
              id="deneig2025"
              value={formData.deneigement.frais2025}
              onChange={(v) => updateDeneigement('frais2025', v)}
            />
          </div>
          <div>
            <LabelWithTooltip htmlFor="deneig2024">
              {t.step5.snowRemoval.fees2024}
            </LabelWithTooltip>
            <CurrencyInput
              id="deneig2024"
              value={formData.deneigement.frais2024}
              onChange={(v) => updateDeneigement('frais2024', v)}
            />
          </div>
          <div>
            <LabelWithTooltip>{t.step5.snowRemoval.monthlyAdjustment}</LabelWithTooltip>
            <CalculatedField value={ajustementDeneigement} />
          </div>
        </div>
      </SectionCard>

      {/* Récapitulatif des ajustements */}
      <SectionCard title={t.step5.summary.title}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-corpiq-blue">
                <th className="text-left py-3 px-2">{t.step5.summary.section}</th>
                <th className="text-left py-3 px-2">{t.step5.summary.description}</th>
                <th className="text-right py-3 px-2 w-40">{t.step5.summary.monthlyAdjustment}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="bg-corpiq-bordeaux text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-2">
                    1
                  </span>
                </td>
                <td className="py-3 px-2">{t.step5.summary.baseAdjustment.replace('{rate}', ((calculatedValues?.tauxIPC || 0) * 100).toFixed(1))}</td>
                <td className="py-3 px-2 text-right font-medium text-green-700">
                  {formatCurrency(calculatedValues?.ajustementBase || 0)}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="bg-corpiq-bordeaux text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-2">
                    2
                  </span>
                </td>
                <td className="py-3 px-2">{t.step5.summary.taxesAndInsurance}</td>
                <td className={`py-3 px-2 text-right font-medium ${(calculatedValues?.totalAjustementTaxesAssurances || 0) >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {formatCurrency(calculatedValues?.totalAjustementTaxesAssurances || 0)}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="bg-corpiq-bordeaux text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-2">
                    3
                  </span>
                </td>
                <td className="py-3 px-2">{t.step5.summary.majorRepairs}</td>
                <td className={`py-3 px-2 text-right font-medium ${(calculatedValues?.totalAjustementReparations || 0) >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {formatCurrency(calculatedValues?.totalAjustementReparations || 0)}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="bg-corpiq-bordeaux text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-2">
                    4
                  </span>
                </td>
                <td className="py-3 px-2">{t.step5.summary.newExpensesAndAid}</td>
                <td className={`py-3 px-2 text-right font-medium ${(calculatedValues?.totalSection4 || 0) >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {formatCurrency(calculatedValues?.totalSection4 || 0)}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="bg-corpiq-bordeaux text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-bold mr-2">
                    5
                  </span>
                </td>
                <td className="py-3 px-2">{t.step5.summary.snowRemoval}</td>
                <td className={`py-3 px-2 text-right font-medium ${ajustementDeneigement >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {formatCurrency(ajustementDeneigement)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-corpiq-blue text-white font-bold">
                <td className="py-4 px-2" colSpan={2}>
                  {t.step5.summary.totalAdjustments}
                </td>
                <td className="py-4 px-2 text-right text-lg">
                  {formatCurrency(calculatedValues?.totalAjustements || 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </SectionCard>

      {/* Résultat final */}
      <div className="bg-gradient-to-br from-corpiq-blue to-corpiq-bordeaux rounded-xl p-6 text-white mb-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calculator size={24} />
          {t.step5.result.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Loyer actuel */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <Home size={18} />
              <span className="text-sm">{t.step5.result.currentRent}</span>
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(formData.loyerMensuelActuel)}
            </div>
          </div>

          {/* Nouveau loyer */}
          <div className="bg-white/20 rounded-lg p-4 ring-2 ring-white/30">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <TrendingUp size={18} />
              <span className="text-sm">{t.step5.result.newRent}</span>
            </div>
            <div className="text-3xl font-bold">
              {formatCurrency(calculatedValues?.nouveauLoyerRecommande || 0)}
            </div>
          </div>

          {/* Variation */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-white/80 text-sm mb-2">{t.step5.result.variation}</div>
            <div className="text-2xl font-bold">
              {calculatedValues?.pourcentageVariation !== undefined 
                ? `${calculatedValues.pourcentageVariation >= 0 ? '+' : ''}${calculatedValues.pourcentageVariation.toFixed(2)} %`
                : '0,00 %'
              }
            </div>
            <div className="text-sm text-white/70 mt-1">
              ({formatCurrency(calculatedValues?.totalAjustements || 0)} / mois)
            </div>
          </div>
        </div>

        {/* Adresse */}
        {formData.adresse && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="text-sm text-white/70">{t.step5.result.concernedDwelling}</div>
            <div className="font-medium">{formData.adresse}</div>
          </div>
        )}
      </div>

      {/* Avertissement légal */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800">
          <strong>{t.step5.legalNotice.title}</strong> {t.step5.legalNotice.text}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={onExportPDF}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Download size={20} />
          {t.step5.actions.exportPDF}
        </button>
        
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <RotateCcw size={20} />
          {t.step5.actions.restart}
        </button>
      </div>

      {/* Modal de confirmation de réinitialisation */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.step5.actions.confirmReset}</h3>
            <p className="text-gray-600 mb-6">
              {t.step5.actions.confirmResetText}
            </p>
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary"
              >
                {t.step5.actions.cancel}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                {t.step5.actions.eraseAndRestart}
              </button>
            </div>
          </div>
        </div>
      )}

      <NavigationButtons 
        onPrevious={onPrevious}
        showNext={false}
        previousLabel={t.common.previous}
      />
    </div>
  );
};
