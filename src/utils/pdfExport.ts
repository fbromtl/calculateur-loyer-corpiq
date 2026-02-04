import { jsPDF } from 'jspdf';
import { FormData, CalculatedValues } from '../types';
import { formatCurrency } from './calculations';

export const generatePDF = async (
  formData: FormData,
  calculatedValues: CalculatedValues
): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Couleurs CORPIQ
  const bleuCorpiq = [19, 49, 92] as [number, number, number];
  const bordeauxCorpiq = [83, 15, 50] as [number, number, number];

  // En-tête
  doc.setFillColor(...bleuCorpiq);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculateur d\'augmentation de loyer 2026', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('CORPIQ - Corporation des propriétaires immobiliers du Québec', pageWidth / 2, 25, { align: 'center' });

  y = 45;

  // Fonction helper pour ajouter une section
  const addSection = (title: string, content: string[][]) => {
    doc.setTextColor(...bleuCorpiq);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += 8;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    content.forEach(([label, value]) => {
      doc.text(label, margin, y);
      doc.text(value, pageWidth - margin, y, { align: 'right' });
      y += 6;
    });

    y += 5;
  };

  // Ligne de séparation
  const addSeparator = () => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  // Informations sur le logement
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Logement concerné:', margin, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  
  // Gérer les adresses longues
  const addressLines = doc.splitTextToSize(formData.adresse || 'Non spécifié', pageWidth - 2 * margin);
  addressLines.forEach((line: string) => {
    doc.text(line, margin, y);
    y += 5;
  });
  y += 5;

  addSeparator();

  // Récapitulatif des ajustements
  doc.setFillColor(...bordeauxCorpiq);
  doc.rect(margin, y - 3, pageWidth - 2 * margin, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('RÉCAPITULATIF DES AJUSTEMENTS', margin + 5, y + 2);
  y += 12;

  // Tableau des ajustements
  const ajustements = [
    ['1. Ajustement de base (IPC ' + (calculatedValues.tauxIPC * 100).toFixed(1) + '%)', formatCurrency(calculatedValues.ajustementBase)],
    ['2. Taxes et assurances', formatCurrency(calculatedValues.totalAjustementTaxesAssurances)],
    ['3. Réparations ou améliorations majeures', formatCurrency(calculatedValues.totalAjustementReparations)],
    ['4. Nouvelles dépenses et variations d\'aide', formatCurrency(calculatedValues.totalSection4)],
    ['5. Déneigement', formatCurrency(calculatedValues.ajustementDeneigement)],
  ];

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);

  ajustements.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'bold');
    doc.text(value, pageWidth - margin, y, { align: 'right' });
    y += 7;
  });

  // Total
  y += 3;
  doc.setFillColor(...bleuCorpiq);
  doc.rect(margin, y - 4, pageWidth - 2 * margin, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL DES AJUSTEMENTS', margin + 5, y + 2);
  doc.text(formatCurrency(calculatedValues.totalAjustements), pageWidth - margin - 5, y + 2, { align: 'right' });
  y += 18;

  // Résultat final
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, y - 5, pageWidth - 2 * margin, 45, 3, 3, 'F');

  doc.setTextColor(...bleuCorpiq);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('RÉSULTAT DU CALCUL', pageWidth / 2, y + 5, { align: 'center' });
  y += 15;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Loyer mensuel actuel:', margin + 10, y);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(formData.loyerMensuelActuel), pageWidth - margin - 10, y, { align: 'right' });
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text('Nouveau loyer mensuel recommandé:', margin + 10, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...bordeauxCorpiq);
  doc.text(formatCurrency(calculatedValues.nouveauLoyerRecommande), pageWidth - margin - 10, y, { align: 'right' });
  y += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Variation:', margin + 10, y);
  doc.setFont('helvetica', 'bold');
  const variationText = `${calculatedValues.pourcentageVariation >= 0 ? '+' : ''}${calculatedValues.pourcentageVariation.toFixed(2)} %`;
  doc.text(variationText, pageWidth - margin - 10, y, { align: 'right' });
  y += 20;

  // Avertissement légal
  doc.setFillColor(255, 243, 205);
  doc.rect(margin, y, pageWidth - 2 * margin, 35, 'F');
  
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('AVIS IMPORTANT', margin + 5, y + 8);
  
  doc.setFont('helvetica', 'normal');
  const avis = 'Ce calculateur est fourni à titre indicatif seulement et reproduit la méthodologie du Tribunal administratif du logement (TAL). Le résultat obtenu ne constitue pas une décision du TAL et ne lie pas les parties. En cas de désaccord, seul le TAL peut fixer le loyer de manière obligatoire.';
  const avisLines = doc.splitTextToSize(avis, pageWidth - 2 * margin - 10);
  doc.text(avisLines, margin + 5, y + 15);

  // Pied de page
  y = doc.internal.pageSize.getHeight() - 15;
  doc.setTextColor(128, 128, 128);
  doc.setFontSize(8);
  doc.text('Document généré le ' + new Date().toLocaleDateString('fr-CA') + ' par le Calculateur CORPIQ 2026', pageWidth / 2, y, { align: 'center' });
  doc.text('www.corpiq.com', pageWidth / 2, y + 5, { align: 'center' });

  // Télécharger le PDF
  const fileName = `calcul-loyer-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
