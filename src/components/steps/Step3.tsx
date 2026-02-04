import React from 'react';
import { FormData, CalculatedValues, LigneReparation } from '../../types';
import { 
  SectionCard, 
  CurrencyInput, 
  CalculatedField, 
  NumberInput,
  Checkbox,
  LabelWithTooltip,
  NavigationButtons,
  InfoTooltip
} from '../ui';
import { Plus, Trash2 } from 'lucide-react';
import { calculAjustementReparation, formatCurrency } from '../../utils/calculations';
import { useLanguage } from '../../i18n/LanguageContext';

interface Step3Props {
  formData: FormData;
  calculatedValues: CalculatedValues | null;
  addReparation: () => void;
  updateReparation: (id: string, updates: Partial<LigneReparation>) => void;
  removeReparation: (id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step3: React.FC<Step3Props> = ({
  formData,
  calculatedValues,
  addReparation,
  updateReparation,
  removeReparation,
  onNext,
  onPrevious,
}) => {
  const { t } = useLanguage();
  const getAjustementLigne = (ligne: LigneReparation): number => {
    if (!calculatedValues) return 0;
    return calculAjustementReparation(
      ligne,
      formData.loyerMensuelActuel,
      calculatedValues.soustotalLogements.nombre,
      calculatedValues.soustotalLogements.loyer,
      calculatedValues.soustotalNonResidentiels.nombre,
      calculatedValues.soustotalNonResidentiels.loyer
    );
  };

  return (
    <div>
      <SectionCard 
        title={t.step3.title}
        badge={3}
        tooltip={t.step3.tooltip}
      >
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>{t.step3.howItWorks}</strong> {t.step3.howItWorksNote}
          </p>
        </div>

        {formData.reparations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">{t.step3.noRepairs}</p>
            <button
              type="button"
              onClick={addReparation}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              {t.step3.addRepair}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Version mobile: cartes */}
            <div className="md:hidden space-y-4">
              {formData.reparations.map((ligne, index) => (
                <div key={ligne.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-corpiq-blue">{t.step3.line} {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeReparation(ligne.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title={t.common.delete}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div>
                    <LabelWithTooltip>{t.step3.nature}</LabelWithTooltip>
                    <input
                      type="text"
                      value={ligne.nature}
                      onChange={(e) => updateReparation(ligne.id, { nature: e.target.value })}
                      className="input-field"
                      placeholder={t.step3.naturePlaceholder}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <LabelWithTooltip>{t.step3.expense}</LabelWithTooltip>
                      <CurrencyInput
                        value={ligne.depense}
                        onChange={(v) => updateReparation(ligne.id, { depense: v })}
                      />
                    </div>
                    <div>
                      <LabelWithTooltip>{t.step3.financialAid}</LabelWithTooltip>
                      <CurrencyInput
                        value={ligne.aideFinanciere}
                        onChange={(v) => updateReparation(ligne.id, { aideFinanciere: v })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <LabelWithTooltip>{t.step3.thirdPartyCompensation}</LabelWithTooltip>
                      <CurrencyInput
                        value={ligne.indemniteTiers}
                        onChange={(v) => updateReparation(ligne.id, { indemniteTiers: v })}
                      />
                    </div>
                    <div>
                      <LabelWithTooltip>{t.step3.retainedExpense}</LabelWithTooltip>
                      <CalculatedField value={ligne.depenseRetenue} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <LabelWithTooltip>{t.step3.nbDwellings}</LabelWithTooltip>
                      <NumberInput
                        value={ligne.nbLogements}
                        onChange={(v) => updateReparation(ligne.id, { nbLogements: v })}
                        min={0}
                      />
                    </div>
                    <div>
                      <LabelWithTooltip>{t.step3.nbNonResidential}</LabelWithTooltip>
                      <NumberInput
                        value={ligne.nbLocauxNonResidentiels}
                        onChange={(v) => updateReparation(ligne.id, { nbLocauxNonResidentiels: v })}
                        min={0}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <Checkbox
                      checked={ligne.logementConcerne}
                      onChange={(v) => updateReparation(ligne.id, { logementConcerne: v })}
                      label={t.step3.concernedDwelling}
                    />
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{t.step3.adjustment}</span>
                      <div className="font-semibold text-green-700">
                        {formatCurrency(getAjustementLigne(ligne))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Version desktop: tableau */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-corpiq-blue text-left">
                    <th className="py-2 px-2">Nature</th>
                    <th className="py-2 px-2 text-right">Dépense</th>
                    <th className="py-2 px-2 text-right">Aide fin.</th>
                    <th className="py-2 px-2 text-right">Indem. tiers</th>
                    <th className="py-2 px-2 text-right">Dép. retenue</th>
                    <th className="py-2 px-2 text-center">Nb log.</th>
                    <th className="py-2 px-2 text-center">Nb loc.</th>
                    <th className="py-2 px-2 text-center">Concerné</th>
                    <th className="py-2 px-2 text-right">Ajust.</th>
                    <th className="py-2 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.reparations.map((ligne) => (
                    <tr key={ligne.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          value={ligne.nature}
                          onChange={(e) => updateReparation(ligne.id, { nature: e.target.value })}
                          className="input-field text-sm"
                          placeholder="Nature..."
                        />
                      </td>
                      <td className="py-2 px-2 w-28">
                        <CurrencyInput
                          value={ligne.depense}
                          onChange={(v) => updateReparation(ligne.id, { depense: v })}
                          className="text-sm"
                        />
                      </td>
                      <td className="py-2 px-2 w-28">
                        <CurrencyInput
                          value={ligne.aideFinanciere}
                          onChange={(v) => updateReparation(ligne.id, { aideFinanciere: v })}
                          className="text-sm"
                        />
                      </td>
                      <td className="py-2 px-2 w-28">
                        <CurrencyInput
                          value={ligne.indemniteTiers}
                          onChange={(v) => updateReparation(ligne.id, { indemniteTiers: v })}
                          className="text-sm"
                        />
                      </td>
                      <td className="py-2 px-2 w-28">
                        <CalculatedField value={ligne.depenseRetenue} className="text-sm" />
                      </td>
                      <td className="py-2 px-2 w-20">
                        <NumberInput
                          value={ligne.nbLogements}
                          onChange={(v) => updateReparation(ligne.id, { nbLogements: v })}
                          min={0}
                          className="text-sm"
                        />
                      </td>
                      <td className="py-2 px-2 w-20">
                        <NumberInput
                          value={ligne.nbLocauxNonResidentiels}
                          onChange={(v) => updateReparation(ligne.id, { nbLocauxNonResidentiels: v })}
                          min={0}
                          className="text-sm"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={ligne.logementConcerne}
                          onChange={(e) => updateReparation(ligne.id, { logementConcerne: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-corpiq-blue focus:ring-corpiq-blue cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-2 w-28">
                        <CalculatedField value={getAjustementLigne(ligne)} className="text-sm" />
                      </td>
                      <td className="py-2 px-2">
                        <button
                          type="button"
                          onClick={() => removeReparation(ligne.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addReparation}
              className="btn-secondary inline-flex items-center gap-2"
              disabled={formData.reparations.length >= 30}
            >
              <Plus size={20} />
              {t.step3.addLine}
            </button>
            {formData.reparations.length >= 30 && (
              <p className="text-sm text-amber-600">{t.step3.maxLines}</p>
            )}
          </div>
        )}

        {/* Total */}
        <div className="bg-corpiq-light p-4 rounded-lg mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-corpiq-bordeaux text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <span className="font-semibold">{t.step3.totalAdjustment}</span>
              <InfoTooltip content={t.step3.totalAdjustmentTooltip} />
            </div>
            <div className="w-40">
              <CalculatedField 
                value={calculatedValues?.totalAjustementReparations || 0} 
                highlight
              />
            </div>
          </div>
        </div>
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
