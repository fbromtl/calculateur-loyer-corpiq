import React from 'react';
import { FormData, CalculatedValues } from '../../types';
import { 
  SectionCard, 
  CurrencyInput, 
  CalculatedField, 
  LabelWithTooltip,
  NavigationButtons,
} from '../ui';
import { Snowflake, Info } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Step5Props {
  formData: FormData;
  calculatedValues: CalculatedValues | null;
  updateFormData: (updates: Partial<FormData>) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const Step5: React.FC<Step5Props> = ({
  formData,
  calculatedValues,
  updateFormData,
  onPrevious,
  onNext,
}) => {
  const { t } = useLanguage();

  const updateDeneigement = (field: 'frais2025' | 'frais2024', value: number) => {
    updateFormData({
      deneigement: { ...formData.deneigement, [field]: value },
    });
  };

  const ajustementDeneigement = React.useMemo(() => {
    if (!calculatedValues || calculatedValues.revenusImmeuble === 0) return 0;
    const variation = formData.deneigement.frais2025 - formData.deneigement.frais2024;
    const poidsLoyer = (formData.loyerMensuelActuel * 12) / calculatedValues.revenusImmeuble;
    return Math.round((variation / 12) * poidsLoyer * 100) / 100;
  }, [formData, calculatedValues]);

  return (
    <div>
      <SectionCard title={t.step5.snowRemoval.title} badge={5} tooltip={t.step5.snowRemoval.tooltip}>
        {/* Note d'information */}
        <div className="relative bg-gradient-to-br from-sky-50 to-blue-50/80 border-2 border-sky-200/60 rounded-2xl p-5 mb-7 overflow-hidden">
          <div className="absolute top-3 right-3 opacity-[0.06]">
            <Snowflake size={80} />
          </div>
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Info size={18} className="text-sky-600" />
            </div>
            <p className="text-sm text-sky-800/90 leading-relaxed font-medium">{t.step5.snowRemoval.note}</p>
          </div>
        </div>

        {/* Champs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <LabelWithTooltip htmlFor="deneig2025">
              <span className="flex items-center gap-2">
                <Snowflake size={14} className="text-sky-500" />
                {t.step5.snowRemoval.fees2025}
              </span>
            </LabelWithTooltip>
            <CurrencyInput id="deneig2025" value={formData.deneigement.frais2025} onChange={(v) => updateDeneigement('frais2025', v)} />
          </div>
          <div className="space-y-2">
            <LabelWithTooltip htmlFor="deneig2024">
              <span className="flex items-center gap-2">
                <Snowflake size={14} className="text-sky-400" />
                {t.step5.snowRemoval.fees2024}
              </span>
            </LabelWithTooltip>
            <CurrencyInput id="deneig2024" value={formData.deneigement.frais2024} onChange={(v) => updateDeneigement('frais2024', v)} />
          </div>
          <div className="space-y-2">
            <LabelWithTooltip>{t.step5.snowRemoval.monthlyAdjustment}</LabelWithTooltip>
            <CalculatedField value={ajustementDeneigement} highlight />
          </div>
        </div>

        {/* Résumé rapide */}
        {(formData.deneigement.frais2025 > 0 || formData.deneigement.frais2024 > 0) && (
          <div className="mt-6 pt-5 border-t-2 border-gray-100">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-sky-50/80 to-blue-50/50 border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                  <Snowflake size={16} className="text-sky-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Variation annuelle</span>
              </div>
              <span className={`text-sm font-bold tabular-nums px-4 py-1.5 rounded-xl ${
                (formData.deneigement.frais2025 - formData.deneigement.frais2024) >= 0 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-red-600 bg-red-50'
              }`}>
                {(formData.deneigement.frais2025 - formData.deneigement.frais2024).toLocaleString('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
              </span>
            </div>
          </div>
        )}
      </SectionCard>

      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        previousLabel={t.common.previous}
        nextLabel={t.common.next}
      />
    </div>
  );
};
