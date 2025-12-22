'use client';

import { useState, useRef } from 'react';
import styles from './page.module.css';
import RequestForm from '../components/RequestForm';
import RequestPreview from '../components/RequestPreview';

interface FormData {
  name: string;
  address: string;
  phone: string;
  date: string;
  director: string;
  subject: string;
  content: string;
  fontSize: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    director: '',
    subject: '',
    content: '',
    fontSize: 16,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id.replace('input', '').toLowerCase();
    
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      fontSize: parseInt(e.target.value, 10),
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = previewRef.current?.querySelector('[data-page]');
    
    if (!element || typeof window === 'undefined') return;

    // Use window.html2pdf if available (loaded from public/libs)
    const html2pdf = (window as any).html2pdf;
    if (!html2pdf) {
      alert('PDF library not loaded. Please reload the page.');
      return;
    }

    const opt = {
      margin: 0,
      filename: 'طلب_خطي.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const originalShadow = (element as HTMLElement).style.boxShadow;
    (element as HTMLElement).style.boxShadow = 'none';

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        (element as HTMLElement).style.boxShadow = originalShadow;
      });
  };

  const handleDownloadDOCX = () => {
    const element = previewRef.current?.querySelector('[data-page]');
    if (!element) return;

    const filename = 'طلب_خطي.docx';
    const preHtml = `<html xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp="urn:schemas-openxmlformats-org:drawingml:2006:wordprocessingDrawing"><head><meta charset='UTF-8'><style></style></head><body>`;
    const postHtml = '</body></html>';
    
    const html = preHtml + element.innerHTML + postHtml;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.appContainer}>
      <RequestForm
        formData={formData}
        onInputChange={handleInputChange}
        onFontSizeChange={handleFontSizeChange}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
        onDownloadDOCX={handleDownloadDOCX}
      />
      <RequestPreview ref={previewRef} formData={formData} />
    </div>
  );
}
