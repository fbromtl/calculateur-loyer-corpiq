import { useState, useEffect, useCallback } from 'react';
import { FormData, initialFormData, CalculatedValues, LigneReparation, LigneNouvelleDepense, LigneVariationAide } from '../types';
import { calculerToutesLesValeurs } from '../utils/calculations';

const STORAGE_KEY = 'corpiq-calculateur-loyer-2026';

// Générer un ID unique
const generateId = () => Math.random().toString(36).substring(2, 11);

export const useCalculateur = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      }
    } catch (e) {
      console.error('Erreur lors du chargement des données:', e);
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder automatiquement (debounced)
  useEffect(() => {
    if (isLoading) return;
    
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [formData, isLoading]);

  // Recalculer les valeurs à chaque changement
  useEffect(() => {
    const values = calculerToutesLesValeurs(formData);
    setCalculatedValues(values);
  }, [formData]);

  // Mise à jour partielle du formulaire
  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  // Mise à jour imbriquée pour les sous-objets
  const updateNestedFormData = useCallback(<K extends keyof FormData>(
    key: K,
    updates: Partial<FormData[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...updates },
    }));
  }, []);

  // Gestion des lignes de réparation
  const addReparation = useCallback(() => {
    const newLigne: LigneReparation = {
      id: generateId(),
      nature: '',
      depense: 0,
      aideFinanciere: 0,
      indemniteTiers: 0,
      depenseRetenue: 0,
      montantPretReduit: 0,
      versementAnnuel: 0,
      nbLogements: 1,
      nbLocauxNonResidentiels: 0,
      logementConcerne: true,
      ajustementCalcule: 0,
    };
    setFormData(prev => ({
      ...prev,
      reparations: [...prev.reparations, newLigne],
    }));
  }, []);

  const updateReparation = useCallback((id: string, updates: Partial<LigneReparation>) => {
    setFormData(prev => ({
      ...prev,
      reparations: prev.reparations.map(ligne => {
        if (ligne.id !== id) return ligne;
        const updated = { ...ligne, ...updates };
        // Recalculer dépense retenue
        updated.depenseRetenue = updated.depense - updated.aideFinanciere - updated.indemniteTiers;
        return updated;
      }),
    }));
  }, []);

  const removeReparation = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      reparations: prev.reparations.filter(ligne => ligne.id !== id),
    }));
  }, []);

  // Gestion des nouvelles dépenses
  const addNouvelleDepense = useCallback(() => {
    const newLigne: LigneNouvelleDepense = {
      id: generateId(),
      nature: '',
      depense: 0,
      aideFinanciere: 0,
      depenseRetenue: 0,
      nbLogements: 1,
      nbLocauxNonResidentiels: 0,
      logementConcerne: true,
      ajustementCalcule: 0,
    };
    setFormData(prev => ({
      ...prev,
      nouvellesDepenses: [...prev.nouvellesDepenses, newLigne],
    }));
  }, []);

  const updateNouvelleDepense = useCallback((id: string, updates: Partial<LigneNouvelleDepense>) => {
    setFormData(prev => ({
      ...prev,
      nouvellesDepenses: prev.nouvellesDepenses.map(ligne => {
        if (ligne.id !== id) return ligne;
        const updated = { ...ligne, ...updates };
        updated.depenseRetenue = updated.depense - updated.aideFinanciere;
        return updated;
      }),
    }));
  }, []);

  const removeNouvelleDepense = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      nouvellesDepenses: prev.nouvellesDepenses.filter(ligne => ligne.id !== id),
    }));
  }, []);

  // Gestion des variations d'aide
  const addVariationAide = useCallback(() => {
    const newLigne: LigneVariationAide = {
      id: generateId(),
      nature: '',
      montant2025: 0,
      montant2024: 0,
      variation: 0,
      nbLogements: 1,
      nbLocauxNonResidentiels: 0,
      logementConcerne: true,
      ajustementCalcule: 0,
    };
    setFormData(prev => ({
      ...prev,
      variationsAide: [...prev.variationsAide, newLigne],
    }));
  }, []);

  const updateVariationAide = useCallback((id: string, updates: Partial<LigneVariationAide>) => {
    setFormData(prev => ({
      ...prev,
      variationsAide: prev.variationsAide.map(ligne => {
        if (ligne.id !== id) return ligne;
        const updated = { ...ligne, ...updates };
        updated.variation = updated.montant2025 - updated.montant2024;
        return updated;
      }),
    }));
  }, []);

  const removeVariationAide = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      variationsAide: prev.variationsAide.filter(ligne => ligne.id !== id),
    }));
  }, []);

  // Réinitialiser le formulaire
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Navigation
  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 5)));
  }, []);

  return {
    formData,
    calculatedValues,
    currentStep,
    isLoading,
    updateFormData,
    updateNestedFormData,
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
  };
};
