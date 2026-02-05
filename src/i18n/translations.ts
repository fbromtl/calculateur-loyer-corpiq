export type Language = 'fr' | 'en';

export interface Translations {
  // App.tsx
  app: {
    title: string;
    subtitle: string;
    loading: string;
    autoSave: string;
    footer: string;
    footerRights: string;
    footerContact: string;
  };
  
  // Steps
  steps: {
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    step4: {
      title: string;
      description: string;
    };
    step5: {
      title: string;
      description: string;
    };
  };
  
  // Step 1
  step1: {
    housingInfo: {
      title: string;
      tooltip: string;
      address: string;
      addressPlaceholder: string;
      rpa: string;
    };
    baseAdjustment: {
      title: string;
      tooltip: string;
      currentRent: string;
      currentRentTooltip: string;
      ipcVariation: string;
      ipcVariationTooltip: string;
      baseAdjustment: string;
      baseAdjustmentTooltip: string;
    };
    buildingRevenue: {
      title: string;
      tooltip: string;
      dwellings: string;
      nonResidential: string;
      number: string;
      monthlyRent: string;
      rented: string;
      vacant: string;
      occupiedByOwner: string;
      subtotal: string;
      totalAnnualRent: string;
      totalAnnualRentTooltip: string;
      otherRevenue: string;
      otherRevenueTooltip: string;
    };
  };
  
  // Step 2
  step2: {
    title: string;
    tooltip: string;
    important: string;
    importantNote: string;
    municipalTaxes: string;
    year2026: string;
    year2025: string;
    year2024: string;
    year2025_2026: string;
    year2024_2025: string;
    asOfDec31: string;
    monthlyAdjustment: string;
    monthlyAdjustmentTooltip: string;
    schoolTaxes: string;
    insurance: string;
    totalAdjustment: string;
    totalAdjustmentTooltip: string;
  };
  
  // Step 3
  step3: {
    title: string;
    tooltip: string;
    howItWorks: string;
    howItWorksNote: string;
    noRepairs: string;
    addRepair: string;
    addLine: string;
    line: string;
    nature: string;
    naturePlaceholder: string;
    expense: string;
    expenseTooltip: string;
    financialAid: string;
    financialAidTooltip: string;
    thirdPartyCompensation: string;
    thirdPartyCompensationTooltip: string;
    retainedExpense: string;
    reducedInterestLoan: string;
    annualPayment: string;
    nbDwellings: string;
    nbNonResidential: string;
    concernedDwelling: string;
    adjustment: string;
    maxLines: string;
    totalAdjustment: string;
    totalAdjustmentTooltip: string;
  };
  
  // Step 4
  step4: {
    newExpenses: {
      title: string;
      tooltip: string;
      note: string;
      noteText: string;
      noExpenses: string;
      addExpense: string;
      addLine: string;
      expense: string;
      nature: string;
      naturePlaceholder: string;
      subtotal: string;
    };
    aidVariation: {
      title: string;
      tooltip: string;
      important: string;
      importantNote: string;
      noVariations: string;
      addVariation: string;
      addLine: string;
      aidNature: string;
      amount2025: string;
      amount2024: string;
      variation: string;
      subtotal: string;
    };
    totalSection4: string;
    totalSection4Tooltip: string;
  };
  
  // Step 5
  step5: {
    snowRemoval: {
      title: string;
      tooltip: string;
      note: string;
      noteText: string;
      fees2025: string;
      fees2024: string;
      monthlyAdjustment: string;
    };
    summary: {
      title: string;
      section: string;
      description: string;
      monthlyAdjustment: string;
      baseAdjustment: string;
      taxesAndInsurance: string;
      majorRepairs: string;
    newExpenses: string;
    aidVariations: string;
    snowRemoval: string;
    totalAdjustments: string;
    };
    result: {
      title: string;
      currentRent: string;
      newRent: string;
      variation: string;
      concernedDwelling: string;
    };
    legalNotice: {
      title: string;
      text: string;
    };
    actions: {
      exportPDF: string;
      restart: string;
      confirmReset: string;
      confirmResetText: string;
      cancel: string;
      eraseAndRestart: string;
    };
  };
  
  // Common
  common: {
    previous: string;
    next: string;
    required: string;
    delete: string;
    completePreviousSteps: string;
  };
  
  // PDF
  pdf: {
    title: string;
    subtitle: string;
    concernedDwelling: string;
    summary: string;
    totalAdjustments: string;
    result: string;
    currentRent: string;
    newRent: string;
    variation: string;
    legalNotice: string;
    generatedOn: string;
    by: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    app: {
      title: 'Calculation Tool 2026',
      subtitle: 'Administrative Housing Tribunal — CORPIQ',
      loading: 'Loading...',
      autoSave: 'Auto-save',
      footer: `© ${new Date().getFullYear()} CORPIQ - Corporation des propriétaires immobiliers du Québec`,
      footerRights: 'All rights reserved',
      footerContact: 'Contact CORPIQ for more information',
    },
    steps: {
      step1: {
        title: 'Information and base adjustment',
        description: 'Dwelling, rent and building revenue',
      },
      step2: {
        title: 'Taxes and insurance',
        description: 'Municipal taxes, school taxes and building insurance',
      },
      step3: {
        title: 'Major repairs',
        description: 'Major repairs or improvements',
      },
      step4: {
        title: 'Expenses and financial aid',
        description: 'New expenses and financial aid variations',
      },
      step5: {
        title: 'Summary',
        description: 'Snow removal, result and PDF export',
      },
    },
    step1: {
      housingInfo: {
        title: 'Information on the concerned dwelling',
        tooltip: 'Information about the dwelling for which you are calculating the rent increase',
        address: 'Address of the concerned dwelling',
        addressPlaceholder: 'Ex: 123 Main Street, Montreal, QC H1A 2B3',
        rpa: 'This building is in whole or in part a private residence for seniors (RPA) or another accommodation facility offering services to seniors',
      },
      baseAdjustment: {
        title: 'Base rent adjustment',
        tooltip: 'The base adjustment is calculated according to the annual average variation of the CPI for Quebec',
        currentRent: 'Monthly rent of the dwelling',
        currentRentTooltip: 'The current monthly rent, before any increase',
        ipcVariation: 'Annual average variation of the Consumer Price Index (CPI) for Quebec',
        ipcVariationTooltip: 'Rate set by the TAL for 2026 based on the average CPI of the last 3 years',
        baseAdjustment: 'Base monthly rent adjustment',
        baseAdjustmentTooltip: 'Rent × CPI Rate',
      },
      buildingRevenue: {
        title: 'Building revenue',
        tooltip: 'Rents from all dwellings and units in the building. This data is used to calculate the weight of the concerned dwelling.',
        dwellings: 'Dwellings',
        nonResidential: 'Non-residential units',
        number: 'Number',
        monthlyRent: 'Monthly rents (total)',
        rented: 'Rented',
        vacant: 'Vacant',
        occupiedByOwner: 'Occupied by the lessor',
        subtotal: 'Subtotal',
        totalAnnualRent: 'Total rents on an annual basis',
        totalAnnualRentTooltip: '(Total dwelling rents + units) × 12 months',
        otherRevenue: 'Other revenue from the operation of the building',
        otherRevenueTooltip: 'Parking, laundry, etc.',
      },
    },
    step2: {
      title: 'Taxes and insurance of the building',
      tooltip: 'Only the increase exceeding inflation (3.1%) is passed on to the rent',
      important: 'Important:',
      importantNote: 'Only the portion of the increase that exceeds inflation ({rate}%) is taken into account in the adjustment calculation. If your taxes or insurance decrease, the reduction is fully passed on.',
      municipalTaxes: 'Municipal taxes',
      year2026: 'Year 2026',
      year2025: 'Year 2025',
      year2024: 'Year 2024',
      year2025_2026: 'Year 2025-2026',
      year2024_2025: 'Year 2024-2025',
      asOfDec31: 'As of December 31',
      monthlyAdjustment: 'Monthly adjustment',
      monthlyAdjustmentTooltip: 'Monthly adjustment calculated according to the TAL formula',
      schoolTaxes: 'School taxes',
      insurance: 'Insurance',
      totalAdjustment: 'Adjustment for taxes and insurance',
      totalAdjustmentTooltip: 'Sum of the three adjustments above',
    },
    step3: {
      title: 'Major repairs or improvements',
      tooltip: 'Major repair expenses are amortized over 20 years and distributed among the concerned dwellings',
      howItWorks: 'How it works:',
      howItWorksNote: 'Expenses are divided by 20 years, then distributed proportionally among the concerned dwellings/units according to their rent. Only the share attributable to the dwelling for which you are calculating the increase is counted.',
      noRepairs: 'No major repair or improvement added.',
      addRepair: 'Add a repair',
      addLine: 'Add a line',
      line: 'Line',
      nature: 'Nature of the expense',
      naturePlaceholder: 'Ex: Roof repair',
      expense: 'Expense ($)',
      expenseTooltip: 'Total cost of the repair or improvement',
      financialAid: 'Financial aid',
      financialAidTooltip: 'Subsidies or grants received for this expense',
      thirdPartyCompensation: 'Third-party compensation',
      thirdPartyCompensationTooltip: 'Amount received from insurance or other third parties',
      retainedExpense: 'Retained expense',
      reducedInterestLoan: 'Reduced interest loan amount',
      annualPayment: 'Annual payment',
      nbDwellings: 'Number of concerned dwellings',
      nbNonResidential: 'Number of concerned non-res. units',
      concernedDwelling: 'Is the dwelling concerned?',
      adjustment: 'Adjustment:',
      maxLines: 'Maximum of 30 lines reached.',
      totalAdjustment: 'Adjustment for major repairs or improvements',
      totalAdjustmentTooltip: 'Sum of adjustments for all repairs where the dwelling is concerned',
    },
    step4: {
      newExpenses: {
        title: 'New expenses arising from the implementation of a service or the addition of an accessory or dependency',
        tooltip: 'New services offered to tenants (e.g., parking, storage, etc.)',
        note: 'Note:',
        noteText: 'Unlike major repairs, new expenses are not amortized over 20 years. They are divided by 12 months and distributed according to the weight of the dwelling.',
        noExpenses: 'No new expense added.',
        addExpense: 'Add a new expense',
        addLine: 'Add a line',
        expense: 'Expense ($)',
        nature: 'Nature of the expense (reduction or addition)',
        naturePlaceholder: 'Ex: Parking',
        subtotal: 'Subtotal of new expenses',
      },
      aidVariation: {
        title: 'Variation or end of aid received for the implementation of a service or the addition of an accessory or dependency',
        tooltip: 'If a government aid decreases or ceases, this loss can be passed on to the rent',
        important: 'Important:',
        importantNote: 'A decrease in financial aid (amount 2025 < amount 2024) results in an increase in rent. The sign is automatically reversed in the calculation.',
        noVariations: 'No aid variation added.',
        addVariation: 'Add an aid variation',
        addLine: 'Add a line',
        aidNature: 'Nature of the financial aid',
        amount2025: 'Amount received (year 2025)',
        amount2024: 'Amount received (year 2024)',
        variation: 'Variation',
        subtotal: 'Adjustment for variations and end of financial aid',
      },
      totalSection4: 'Total sections 4 and 5',
      totalSection4Tooltip: 'Sum of new expenses and financial aid variations',
    },
    step5: {
      snowRemoval: {
        title: 'Snow removal fees (mobile home parks)',
        tooltip: 'This section only applies to mobile home parks',
        note: 'This section only applies to mobile home parks. If you are not in this case, leave these fields at zero.',
        noteText: '',
        fees2025: 'Fees 2025',
        fees2024: 'Fees 2024',
        monthlyAdjustment: 'Monthly adjustment',
      },
      summary: {
        title: 'Adjustment of the rent of the concerned dwelling',
        section: 'Section',
        description: 'Description',
        monthlyAdjustment: 'Monthly adjustment',
        baseAdjustment: 'Base rent adjustment (CPI {rate}%)',
        taxesAndInsurance: 'Taxes and insurance of the building',
        majorRepairs: 'Major repairs or improvements',
        newExpenses: 'New expenses arising from the implementation of a service or the addition of an accessory or dependency',
        aidVariations: 'Variation or end of aid received for the implementation of a service or the addition of an accessory or dependency',
        snowRemoval: 'Snow removal fees (mobile home parks)',
        totalAdjustments: 'TOTAL ADJUSTMENTS',
      },
      result: {
        title: 'Calculation result',
        currentRent: 'Current rent',
        newRent: 'Recommended new rent',
        variation: 'Variation',
        concernedDwelling: 'Concerned dwelling:',
      },
      legalNotice: {
        title: 'Important notice:',
        text: 'This calculator is provided for informational purposes only and reproduces the methodology of the Administrative Housing Tribunal (TAL). The result obtained does not constitute a TAL decision and does not bind the parties. In case of disagreement, only the TAL can set the rent in a binding manner.',
      },
      actions: {
        exportPDF: 'Export to PDF',
        restart: 'Restart',
        confirmReset: 'Confirm reset',
        confirmResetText: 'Are you sure you want to erase all data and start a new calculation? This action is irreversible.',
        cancel: 'Cancel',
        eraseAndRestart: 'Erase and restart',
      },
    },
    common: {
      previous: 'Previous',
      next: 'Next',
      required: '*',
      delete: 'Delete',
      completePreviousSteps: 'Complete previous steps first',
    },
    pdf: {
      title: 'Calculation Tool 2026',
      subtitle: 'CORPIQ - Corporation des propriétaires immobiliers du Québec',
      concernedDwelling: 'Concerned dwelling:',
      summary: 'SUMMARY OF ADJUSTMENTS',
      totalAdjustments: 'TOTAL ADJUSTMENTS',
      result: 'CALCULATION RESULT',
      currentRent: 'Current monthly rent:',
      newRent: 'Recommended new monthly rent:',
      variation: 'Variation:',
      legalNotice: 'IMPORTANT NOTICE',
      generatedOn: 'Document generated on',
      by: 'by the CORPIQ Calculator 2026',
    },
  },
  fr: {
    app: {
      title: 'Outil de calcul 2026',
      subtitle: 'Tribunal administratif du logement — CORPIQ',
      loading: 'Chargement...',
      autoSave: 'Sauvegarde automatique',
      footer: `© ${new Date().getFullYear()} CORPIQ - Corporation des propriétaires immobiliers du Québec`,
      footerRights: 'Tous droits réservés',
      footerContact: 'Contactez la CORPIQ pour plus d\'informations',
    },
    steps: {
      step1: {
        title: 'Renseignements et ajustement de base',
        description: 'Logement, loyer et revenus de l\'immeuble',
      },
      step2: {
        title: 'Taxes et assurances',
        description: 'Taxes municipales, scolaires et assurances de l\'immeuble',
      },
      step3: {
        title: 'Réparations majeures',
        description: 'Réparations ou améliorations majeures',
      },
      step4: {
        title: 'Dépenses et aide financière',
        description: 'Nouvelles dépenses et variations d\'aide financière',
      },
      step5: {
        title: 'Récapitulatif',
        description: 'Déneigement, résultat et export PDF',
      },
    },
    step1: {
      housingInfo: {
        title: 'Renseignements sur le logement concerné',
        tooltip: 'Informations sur le logement pour lequel vous calculez l\'augmentation de loyer',
        address: 'Adresse du logement concerné',
        addressPlaceholder: 'Ex: 123, rue Principale, Montréal, QC H1A 2B3',
        rpa: 'Cet immeuble est en tout ou en partie une résidence privée pour aînés (RPA) ou un autre lieu d\'hébergement offrant des services aux aînés',
      },
      baseAdjustment: {
        title: 'Ajustement de base du loyer',
        tooltip: 'L\'ajustement de base est calculé selon la variation annuelle moyenne de l\'IPC pour le Québec',
        currentRent: 'Loyer mensuel du logement',
        currentRentTooltip: 'Le loyer mensuel actuel, avant toute augmentation',
        ipcVariation: 'Variation annuelle moyenne de l\'indice des prix à la consommation (IPC) pour le Québec',
        ipcVariationTooltip: 'Taux fixé par le TAL pour 2026 basé sur la moyenne de l\'IPC des 3 dernières années',
        baseAdjustment: 'Ajustement de base du loyer mensuel',
        baseAdjustmentTooltip: 'Loyer × Taux IPC',
      },
      buildingRevenue: {
        title: 'Revenus de l\'immeuble',
        tooltip: 'Loyers de tous les logements et locaux de l\'immeuble. Ces données servent à calculer le poids du logement concerné.',
        dwellings: 'Logements',
        nonResidential: 'Locaux non résidentiels',
        number: 'Nombre',
        monthlyRent: 'Loyers mensuels (totaux)',
        rented: 'Loués',
        vacant: 'Inoccupés',
        occupiedByOwner: 'Occupés par le locateur ou la locatrice',
        subtotal: 'Sous-total',
        totalAnnualRent: 'Total des loyers sur une base annuelle',
        totalAnnualRentTooltip: '(Total loyers logements + locaux) × 12 mois',
        otherRevenue: 'Autres revenus provenant de l\'exploitation de l\'immeuble',
        otherRevenueTooltip: 'Stationnements, buanderie, etc.',
      },
    },
    step2: {
      title: 'Taxes et assurances de l\'immeuble',
      tooltip: 'Seule l\'augmentation excédant l\'inflation (3,1%) est répercutée sur le loyer',
      important: 'Important:',
      importantNote: 'Seule la portion de l\'augmentation qui dépasse l\'inflation ({rate}%) est prise en compte dans le calcul de l\'ajustement. Si vos taxes ou assurances diminuent, la réduction est entièrement répercutée.',
      municipalTaxes: 'Taxes municipales',
      year2026: 'Année 2026',
      year2025: 'Année 2025',
      year2024: 'Année 2024',
      year2025_2026: 'Année 2025-2026',
      year2024_2025: 'Année 2024-2025',
      asOfDec31: 'Au 31 décembre',
      monthlyAdjustment: 'Ajustement mensuel',
      monthlyAdjustmentTooltip: 'Ajustement mensuel calculé selon la formule du TAL',
      schoolTaxes: 'Taxes scolaires',
      insurance: 'Assurances',
      totalAdjustment: 'Ajustement pour les taxes et les assurances',
      totalAdjustmentTooltip: 'Somme des trois ajustements ci-dessus',
    },
    step3: {
      title: 'Réparations ou améliorations majeures',
      tooltip: 'Les dépenses de réparations majeures sont amorties sur 20 ans et réparties entre les logements concernés',
      howItWorks: 'Comment ça fonctionne:',
      howItWorksNote: 'Les dépenses sont divisées par 20 ans, puis réparties proportionnellement entre les logements/locaux concernés selon leur loyer. Seule la part attribuable au logement pour lequel vous calculez l\'augmentation est comptée.',
      noRepairs: 'Aucune réparation ou amélioration majeure ajoutée.',
      addRepair: 'Ajouter une réparation',
      addLine: 'Ajouter une ligne',
      line: 'Ligne',
      nature: 'Nature de la dépense',
      naturePlaceholder: 'Ex: Réfection toiture',
      expense: 'Dépense ($)',
      expenseTooltip: 'Coût total de la réparation ou de l\'amélioration',
      financialAid: 'Aide financière',
      financialAidTooltip: 'Subventions ou aides reçues pour cette dépense',
      thirdPartyCompensation: 'Indemnité versée par un tiers',
      thirdPartyCompensationTooltip: 'Montant reçu d\'assurances ou d\'autres tiers',
      retainedExpense: 'Dépense retenue',
      reducedInterestLoan: 'Montant du prêt à intérêt réduit',
      annualPayment: 'Versement annuel',
      nbDwellings: 'Nombre de logements concernés',
      nbNonResidential: 'Nombre de locaux non résidentiels concernés',
      concernedDwelling: 'Le logement est-il concerné?',
      adjustment: 'Ajustement:',
      maxLines: 'Maximum de 30 lignes atteint.',
      totalAdjustment: 'Ajustement pour les réparations ou améliorations majeures',
      totalAdjustmentTooltip: 'Somme des ajustements pour toutes les réparations où le logement est concerné',
    },
    step4: {
      newExpenses: {
        title: 'Nouvelles dépenses découlant de la mise en place d\'un service ou de l\'ajout d\'un accessoire ou d\'une dépendance',
        tooltip: 'Nouveaux services offerts aux locataires (ex: stationnement, rangement, etc.)',
        note: 'Note:',
        noteText: 'Contrairement aux réparations majeures, les nouvelles dépenses ne sont pas amorties sur 20 ans. Elles sont divisées par 12 mois et réparties selon le poids du logement.',
        noExpenses: 'Aucune nouvelle dépense ajoutée.',
        addExpense: 'Ajouter une nouvelle dépense',
        addLine: 'Ajouter une ligne',
        expense: 'Dépense ($)',
        nature: 'Nature de la dépense (réduction ou ajout)',
        naturePlaceholder: 'Ex: Stationnement',
        subtotal: 'Sous-total des nouvelles dépenses',
      },
      aidVariation: {
        title: 'Variation ou fin d\'une aide reçue pour la mise en place d\'un service ou l\'ajout d\'un accessoire ou d\'une dépendance',
        tooltip: 'Si une aide gouvernementale diminue ou cesse, cette perte peut être répercutée sur le loyer',
        important: 'Important:',
        importantNote: 'Une diminution de l\'aide financière (montant 2025 < montant 2024) entraîne une augmentation du loyer. Le signe est inversé automatiquement dans le calcul.',
        noVariations: 'Aucune variation d\'aide ajoutée.',
        addVariation: 'Ajouter une variation d\'aide',
        addLine: 'Ajouter une ligne',
        aidNature: 'Nature de l\'aide financière',
        amount2025: 'Montant reçu (année 2025)',
        amount2024: 'Montant reçu (année 2024)',
        variation: 'Variation',
        subtotal: 'Ajustement pour les variations et les fins d\'aide financière',
      },
      totalSection4: 'Total des sections 4 et 5',
      totalSection4Tooltip: 'Somme des nouvelles dépenses et des variations d\'aide financière',
    },
    step5: {
      snowRemoval: {
        title: 'Frais de déneigement (parc de maisons mobiles)',
        tooltip: 'Cette section ne s\'applique qu\'aux parcs de maisons mobiles',
        note: 'Cette section s\'applique uniquement aux parcs de maisons mobiles. Si vous n\'êtes pas dans ce cas, laissez ces champs à zéro.',
        noteText: '',
        fees2025: 'Frais 2025',
        fees2024: 'Frais 2024',
        monthlyAdjustment: 'Ajustement mensuel',
      },
      summary: {
        title: 'Ajustement du loyer du logement concerné',
        section: 'Section',
        description: 'Description',
        monthlyAdjustment: 'Ajustement mensuel',
        baseAdjustment: 'Ajustement de base du loyer (IPC {rate}%)',
        taxesAndInsurance: 'Taxes et assurances de l\'immeuble',
        majorRepairs: 'Réparations ou améliorations majeures',
        newExpenses: 'Nouvelles dépenses découlant de la mise en place d\'un service ou de l\'ajout d\'un accessoire ou d\'une dépendance',
        aidVariations: 'Variation ou fin d\'une aide reçue pour la mise en place d\'un service ou l\'ajout d\'un accessoire ou d\'une dépendance',
        snowRemoval: 'Frais de déneigement (parc de maisons mobiles)',
        totalAdjustments: 'TOTAL DES AJUSTEMENTS',
      },
      result: {
        title: 'Résultat du calcul',
        currentRent: 'Loyer actuel',
        newRent: 'Nouveau loyer recommandé',
        variation: 'Variation',
        concernedDwelling: 'Logement concerné:',
      },
      legalNotice: {
        title: 'Avis important:',
        text: 'Ce calculateur est fourni à titre indicatif seulement et reproduit la méthodologie du Tribunal administratif du logement (TAL). Le résultat obtenu ne constitue pas une décision du TAL et ne lie pas les parties. En cas de désaccord, seul le TAL peut fixer le loyer de manière obligatoire.',
      },
      actions: {
        exportPDF: 'Exporter en PDF',
        restart: 'Recommencer',
        confirmReset: 'Confirmer la réinitialisation',
        confirmResetText: 'Êtes-vous sûr de vouloir effacer toutes les données et recommencer un nouveau calcul? Cette action est irréversible.',
        cancel: 'Annuler',
        eraseAndRestart: 'Effacer et recommencer',
      },
    },
    common: {
      previous: 'Précédent',
      next: 'Suivant',
      required: '*',
      delete: 'Supprimer',
      completePreviousSteps: 'Complétez les étapes précédentes d\'abord',
    },
    pdf: {
      title: 'Outil de calcul 2026',
      subtitle: 'CORPIQ - Corporation des propriétaires immobiliers du Québec',
      concernedDwelling: 'Logement concerné:',
      summary: 'RÉCAPITULATIF DES AJUSTEMENTS',
      totalAdjustments: 'TOTAL DES AJUSTEMENTS',
      result: 'RÉSULTAT DU CALCUL',
      currentRent: 'Loyer mensuel actuel:',
      newRent: 'Nouveau loyer mensuel recommandé:',
      variation: 'Variation:',
      legalNotice: 'AVIS IMPORTANT',
      generatedOn: 'Document généré le',
      by: 'par le Calculateur CORPIQ 2026',
    },
  },
};
