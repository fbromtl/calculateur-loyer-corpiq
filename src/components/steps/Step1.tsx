import React from 'react';
import { FormData, CalculatedValues } from '../../types';
import { 
  SectionCard, 
  CurrencyInput, 
  CalculatedField, 
  NumberInput, 
  Checkbox,
  LabelWithTooltip,
  NavigationButtons 
} from '../ui';
import { formatCurrency } from '../../utils/calculations';

interface Step1Props {
  formData: FormData;
  calculatedValues: CalculatedValues | null;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({
  formData,
  calculatedValues,
  updateFormData,
  onNext,
}) => {
  const updateLogements = (
    type: 'loues' | 'inoccupes' | 'occupesLocateur',
    field: 'nombre' | 'loyerMensuel',
    value: number
  ) => {
    updateFormData({
      logements: {
        ...formData.logements,
        [type]: {
          ...formData.logements[type],
          [field]: value,
        },
      },
    });
  };

  const updateLocaux = (
    type: 'loues' | 'inoccupes' | 'occupesLocateur',
    field: 'nombre' | 'loyerMensuel',
    value: number
  ) => {
    updateFormData({
      locauxNonResidentiels: {
        ...formData.locauxNonResidentiels,
        [type]: {
          ...formData.locauxNonResidentiels[type],
          [field]: value,
        },
      },
    });
  };

  return (
    <div>
      {/* Section: Renseignements sur le logement */}
      <SectionCard 
        title="Renseignements sur le logement concerné"
        tooltip="Informations sur le logement pour lequel vous calculez l'augmentation de loyer"
      >
        <div className="space-y-4">
          <div>
            <LabelWithTooltip htmlFor="adresse" required>
              Adresse du logement concerné
            </LabelWithTooltip>
            <textarea
              id="adresse"
              value={formData.adresse}
              onChange={(e) => updateFormData({ adresse: e.target.value })}
              className="input-field"
              rows={2}
              placeholder="Ex: 123, rue Principale, Montréal, QC H1A 2B3"
            />
          </div>
          
          <Checkbox
            checked={formData.isRPA}
            onChange={(checked) => updateFormData({ isRPA: checked })}
            label="Cet immeuble est en tout ou en partie une résidence privée pour aînés (RPA) ou un autre lieu d'hébergement offrant des services aux aînés"
          />
        </div>
      </SectionCard>

      {/* Section: Ajustement de base */}
      <SectionCard 
        title="Ajustement de base du loyer"
        badge={1}
        tooltip="L'ajustement de base est calculé selon la variation annuelle moyenne de l'IPC pour le Québec"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <LabelWithTooltip 
                htmlFor="loyer" 
                required
                tooltip="Le loyer mensuel actuel, avant toute augmentation"
              >
                Loyer mensuel du logement (avant augmentation)
              </LabelWithTooltip>
              <CurrencyInput
                id="loyer"
                value={formData.loyerMensuelActuel}
                onChange={(value) => updateFormData({ loyerMensuelActuel: value })}
                placeholder="Ex: 1 200,00 $"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <LabelWithTooltip 
                  tooltip="Taux fixé par le TAL pour 2026 basé sur la moyenne de l'IPC des 3 dernières années"
                >
                  Variation annuelle moyenne de l'IPC
                </LabelWithTooltip>
                <div className="input-readonly text-right font-medium">
                  {((calculatedValues?.tauxIPC || 0) * 100).toFixed(1)} %
                </div>
              </div>
              <div>
                <LabelWithTooltip tooltip="Loyer × Taux IPC">
                  Ajustement de base du loyer mensuel
                </LabelWithTooltip>
                <CalculatedField 
                  value={calculatedValues?.ajustementBase || 0} 
                  highlight={formData.loyerMensuelActuel > 0}
                />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section: Revenus de l'immeuble */}
      <SectionCard 
        title="Revenus de l'immeuble"
        tooltip="Loyers de tous les logements et locaux de l'immeuble. Ces données servent à calculer le poids du logement concerné."
      >
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-corpiq-blue">
                  <th className="text-left py-2"></th>
                  <th colSpan={2} className="text-center py-2 text-corpiq-blue">
                    Logements
                  </th>
                  <th colSpan={2} className="text-center py-2 text-corpiq-blue border-l border-gray-200">
                    Locaux non résidentiels
                  </th>
                </tr>
                <tr className="border-b text-sm text-gray-600">
                  <th className="text-left py-2"></th>
                  <th className="text-center py-2 w-24">Nombre</th>
                  <th className="text-center py-2 w-36">Loyers mensuels</th>
                  <th className="text-center py-2 w-24 border-l border-gray-200">Nombre</th>
                  <th className="text-center py-2 w-36">Loyers mensuels</th>
                </tr>
              </thead>
              <tbody>
                {/* Loués */}
                <tr className="border-b">
                  <td className="py-3">
                    <div className="font-medium">Loués</div>
                    <div className="text-sm text-gray-500">Loyers mensuels</div>
                  </td>
                  <td className="py-3 px-2">
                    <NumberInput
                      value={formData.logements.loues.nombre}
                      onChange={(v) => updateLogements('loues', 'nombre', v)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <CurrencyInput
                      value={formData.logements.loues.loyerMensuel}
                      onChange={(v) => updateLogements('loues', 'loyerMensuel', v)}
                    />
                  </td>
                  <td className="py-3 px-2 border-l border-gray-200">
                    <NumberInput
                      value={formData.locauxNonResidentiels.loues.nombre}
                      onChange={(v) => updateLocaux('loues', 'nombre', v)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <CurrencyInput
                      value={formData.locauxNonResidentiels.loues.loyerMensuel}
                      onChange={(v) => updateLocaux('loues', 'loyerMensuel', v)}
                    />
                  </td>
                </tr>

                {/* Inoccupés */}
                <tr className="border-b">
                  <td className="py-3">
                    <div className="font-medium">Inoccupés</div>
                    <div className="text-sm text-gray-500">Loyers mensuels</div>
                  </td>
                  <td className="py-3 px-2">
                    <NumberInput
                      value={formData.logements.inoccupes.nombre}
                      onChange={(v) => updateLogements('inoccupes', 'nombre', v)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <CurrencyInput
                      value={formData.logements.inoccupes.loyerMensuel}
                      onChange={(v) => updateLogements('inoccupes', 'loyerMensuel', v)}
                    />
                  </td>
                  <td className="py-3 px-2 border-l border-gray-200">
                    <NumberInput
                      value={formData.locauxNonResidentiels.inoccupes.nombre}
                      onChange={(v) => updateLocaux('inoccupes', 'nombre', v)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <CurrencyInput
                      value={formData.locauxNonResidentiels.inoccupes.loyerMensuel}
                      onChange={(v) => updateLocaux('inoccupes', 'loyerMensuel', v)}
                    />
                  </td>
                </tr>

                {/* Occupés par le locateur */}
                <tr className="border-b">
                  <td className="py-3">
                    <div className="font-medium">Occupés par le locateur</div>
                    <div className="text-sm text-gray-500">Loyers mensuels</div>
                  </td>
                  <td className="py-3 px-2">
                    <NumberInput
                      value={formData.logements.occupesLocateur.nombre}
                      onChange={(v) => updateLogements('occupesLocateur', 'nombre', v)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <CurrencyInput
                      value={formData.logements.occupesLocateur.loyerMensuel}
                      onChange={(v) => updateLogements('occupesLocateur', 'loyerMensuel', v)}
                    />
                  </td>
                  <td className="py-3 px-2 border-l border-gray-200">
                    <NumberInput
                      value={formData.locauxNonResidentiels.occupesLocateur.nombre}
                      onChange={(v) => updateLocaux('occupesLocateur', 'nombre', v)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <CurrencyInput
                      value={formData.locauxNonResidentiels.occupesLocateur.loyerMensuel}
                      onChange={(v) => updateLocaux('occupesLocateur', 'loyerMensuel', v)}
                    />
                  </td>
                </tr>

                {/* Sous-total */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="py-3">Sous-total</td>
                  <td className="py-3 px-2 text-center">
                    {calculatedValues?.soustotalLogements.nombre || 0}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {formatCurrency(calculatedValues?.soustotalLogements.loyer || 0)}
                  </td>
                  <td className="py-3 px-2 text-center border-l border-gray-200">
                    {calculatedValues?.soustotalNonResidentiels.nombre || 0}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {formatCurrency(calculatedValues?.soustotalNonResidentiels.loyer || 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="bg-corpiq-light p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <LabelWithTooltip tooltip="(Total loyers logements + locaux) × 12 mois">
                  Total des loyers sur une base annuelle
                </LabelWithTooltip>
                <CalculatedField value={calculatedValues?.totalLoyersAnnuel || 0} />
              </div>
              <div>
                <LabelWithTooltip 
                  tooltip="Stationnements, buanderie, etc."
                >
                  Autres revenus provenant de l'exploitation
                </LabelWithTooltip>
                <CurrencyInput
                  value={formData.autresRevenus}
                  onChange={(value) => updateFormData({ autresRevenus: value })}
                />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <NavigationButtons 
        showPrevious={false}
        onNext={onNext}
        nextDisabled={formData.loyerMensuelActuel <= 0}
      />
    </div>
  );
};
