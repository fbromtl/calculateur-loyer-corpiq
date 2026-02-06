import React from 'react';
import { FormData, CalculatedValues } from '../../types';
import { 
  SectionCard, 
  NavigationButtons,
} from '../ui';
import { 
  Download, RotateCcw, Calculator, TrendingUp, Home, 
  AlertTriangle, Sparkles, ArrowRight, Trophy, Target 
} from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';
import { useLanguage } from '../../i18n/LanguageContext';

interface Step6Props {
  formData: FormData;
  calculatedValues: CalculatedValues | null;
  onPrevious: () => void;
  onReset: () => void;
  onExportPDF: () => void;
}

export const Step6: React.FC<Step6Props> = ({
  formData,
  calculatedValues,
  onPrevious,
  onReset,
  onExportPDF,
}) => {
  const { t } = useLanguage();
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const handleReset = () => { onReset(); setShowResetConfirm(false); };

  const ajustementDeneigement = React.useMemo(() => {
    if (!calculatedValues || calculatedValues.revenusImmeuble === 0) return 0;
    const variation = formData.deneigement.frais2025 - formData.deneigement.frais2024;
    const poidsLoyer = (formData.loyerMensuelActuel * 12) / calculatedValues.revenusImmeuble;
    return Math.round((variation / 12) * poidsLoyer * 100) / 100;
  }, [formData, calculatedValues]);

  const summaryRows = [
    { badge: '1', label: t.step5.summary.baseAdjustment.replace('{rate}', ((calculatedValues?.tauxIPC || 0) * 100).toFixed(1)), value: calculatedValues?.ajustementBase || 0, color: 'from-corpiq-blue to-corpiq-blue-light' },
    { badge: '2', label: t.step5.summary.taxesAndInsurance, value: calculatedValues?.totalAjustementTaxesAssurances || 0, color: 'from-indigo-600 to-indigo-500' },
    { badge: '3', label: t.step5.summary.majorRepairs, value: calculatedValues?.totalAjustementReparations || 0, color: 'from-violet-600 to-violet-500' },
    { badge: '4a', label: t.step5.summary.newExpenses, value: calculatedValues?.totalAjustementNouvellesDepenses || 0, color: 'from-purple-600 to-purple-500' },
    { badge: '4b', label: t.step5.summary.aidVariations, value: calculatedValues?.totalAjustementVariationsAide || 0, color: 'from-fuchsia-600 to-fuchsia-500' },
    { badge: '5', label: t.step5.summary.snowRemoval, value: ajustementDeneigement, color: 'from-sky-600 to-sky-500' },
  ];

  const totalAjustements = calculatedValues?.totalAjustements || 0;
  const variation = calculatedValues?.pourcentageVariation || 0;

  return (
    <div>
      {/* ─── Récapitulatif des ajustements ─── */}
      <SectionCard title={t.step5.summary.title} badge={6}>
        <div className="space-y-3">
          {summaryRows.map((row, index) => (
            <div key={row.badge}
              className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50/80 hover:bg-white border-2 border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-md"
              style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-4">
                <span className={`${row.badge.length > 1 ? 'w-11 px-1 text-[11px]' : 'w-10 text-xs'} h-10 rounded-xl font-extrabold inline-flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${row.color}`}>
                  {row.badge}
                </span>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-snug max-w-md">{row.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold tabular-nums px-4 py-2 rounded-xl transition-all ${
                  row.value > 0 ? 'text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100' 
                  : row.value < 0 ? 'text-red-600 bg-red-50 group-hover:bg-red-100' 
                  : 'text-gray-500 bg-gray-100'
                }`}>
                  {row.value >= 0 ? '+' : ''}{formatCurrency(row.value)}
                </span>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-5 relative overflow-hidden rounded-2xl"
            style={{background: 'linear-gradient(135deg, #13315c 0%, #1a4178 50%, #530f32 100%)'}}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center border border-white/10">
                  <Target size={20} className="text-white" />
                </div>
                <span className="font-extrabold text-lg text-white tracking-wide">{t.step5.summary.totalAdjustments}</span>
              </div>
              <span className="text-3xl font-extrabold tabular-nums text-white">
                {totalAjustements >= 0 ? '+' : ''}{formatCurrency(totalAjustements)}
              </span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── Résultat final ─── */}
      <div className="relative overflow-hidden rounded-3xl mb-8 shadow-xl-soft"
        style={{background: 'linear-gradient(135deg, #0c2240 0%, #13315c 25%, #1a4178 50%, #3b1d6e 75%, #530f32 100%)'}}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-sm" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/4 blur-sm" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-white/[0.02] rounded-full blur-md" />

        <div className="relative p-8 sm:p-10">
          {/* Trophy header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shadow-inner-glow">
              <Trophy size={26} className="text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{t.step5.result.title}</h2>
              <p className="text-white/40 text-sm font-medium mt-0.5">Résultat de votre calcul personnalisé</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Loyer actuel */}
            <div className="bg-white/[0.07] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.12] transition-all duration-300">
              <div className="flex items-center gap-2.5 text-white/50 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Home size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{t.step5.result.currentRent}</span>
              </div>
              <div className="text-3xl font-extrabold tabular-nums text-white/90">
                {formatCurrency(formData.loyerMensuelActuel)}
              </div>
              <div className="text-xs text-white/30 mt-2 font-medium">par mois</div>
            </div>

            {/* Nouveau loyer - mis en avant */}
            <div className="relative bg-white/[0.15] backdrop-blur-md rounded-2xl p-6 border-2 border-white/25 ring-2 ring-white/10 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 group">
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Nouveau</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70 mb-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-emerald-300" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{t.step5.result.newRent}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tabular-nums text-white animate-count-up group-hover:scale-[1.02] transition-transform origin-left">
                {formatCurrency(calculatedValues?.nouveauLoyerRecommande || 0)}
              </div>
              <div className="text-xs text-white/40 mt-2 font-medium">par mois</div>
            </div>

            {/* Variation */}
            <div className="bg-white/[0.07] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.12] transition-all duration-300">
              <div className="flex items-center gap-2.5 text-white/50 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{t.step5.result.variation}</span>
              </div>
              <div className={`text-3xl font-extrabold tabular-nums ${variation >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                {variation >= 0 ? '+' : ''}{variation.toFixed(2)} %
              </div>
              <div className="flex items-center gap-2 mt-3">
                <ArrowRight size={12} className="text-white/30" />
                <span className="text-sm text-white/40 tabular-nums font-semibold">
                  {totalAjustements >= 0 ? '+' : ''}{formatCurrency(totalAjustements)} / mois
                </span>
              </div>
            </div>
          </div>

          {formData.adresse && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-xs text-white/35 font-bold uppercase tracking-widest mb-1.5">{t.step5.result.concernedDwelling}</div>
              <div className="font-semibold text-white/80 text-lg">{formData.adresse}</div>
            </div>
          )}
        </div>
      </div>

      {/* Avertissement légal */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50/80 border-2 border-amber-200/80 rounded-2xl p-5 mb-8 overflow-hidden">
        <div className="absolute top-2 right-2 opacity-[0.04]">
          <AlertTriangle size={100} />
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 shadow-sm">
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm mb-1">{t.step5.legalNotice.title}</p>
            <p className="text-sm text-amber-800/80 leading-relaxed">
              {t.step5.legalNotice.text}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
        <button type="button" onClick={onExportPDF}
          className="group relative overflow-hidden inline-flex items-center gap-3 text-base w-full sm:w-auto justify-center px-8 py-4 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
          style={{background: 'linear-gradient(135deg, #13315c 0%, #1a4178 100%)'}}>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
          <Download size={20} className="relative z-10" />
          <span className="relative z-10">{t.step5.actions.exportPDF}</span>
        </button>
        <button type="button" onClick={() => setShowResetConfirm(true)}
          className="group inline-flex items-center gap-3 text-base w-full sm:w-auto justify-center px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
          <RotateCcw size={20} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
          {t.step5.actions.restart}
        </button>
      </div>

      {/* Modal réinitialisation */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4 info-overlay-enter">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl info-panel-enter border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2 text-center">{t.step5.actions.confirmReset}</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed text-center">{t.step5.actions.confirmResetText}</p>
            <div className="flex gap-3 justify-center">
              <button type="button" onClick={() => setShowResetConfirm(false)} 
                className="btn-secondary py-3.5 px-7 text-sm">
                {t.step5.actions.cancel}
              </button>
              <button type="button" onClick={handleReset}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:from-red-700 hover:to-red-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                {t.step5.actions.eraseAndRestart}
              </button>
            </div>
          </div>
        </div>
      )}

      <NavigationButtons onPrevious={onPrevious} showNext={false} previousLabel={t.common.previous} />
    </div>
  );
};
