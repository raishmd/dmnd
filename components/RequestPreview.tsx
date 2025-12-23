import { forwardRef } from 'react';
import styles from './RequestPreview.module.css';

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

interface RequestPreviewProps {
  formData: FormData;
}

const RequestPreview = forwardRef<HTMLDivElement, RequestPreviewProps>(
  ({ formData }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return 'في: ..../../..';
      const d = new Date(dateString);
      return `في: ${d.toLocaleDateString('fr-FR')}`;
    };

    return (
      <div className={styles.previewSection} ref={ref}>
        <div className={styles.requestPage} data-page>
          {/* Header: Sender & Date */}
          <div className={styles.pageHeader}>
            <div className={styles.senderInfo}>
              <div>الاسم واللقب: <span>{formData.name || '................'}</span></div>
              <div>العنوان: <span>{formData.address || '................'}</span></div>
              <div>رقم الهاتف: <span>{formData.phone || '................'}</span></div>
            </div>
            <div className={styles.dateInfo}>
              <span>{formatDate(formData.date)}</span>
            </div>
          </div>

          {/* Recipient */}
          <div className={styles.recipientSection}>
            إلى السيد مدير: <span>{formData.director || '................'}</span>
          </div>

          {/* Subject */}
          <div className={styles.subjectSection}>
            الموضوع: <span>{formData.subject || '................'}</span>
          </div>

          {/* Content */}
          <div className={styles.contentSection} style={{ fontSize: `${formData.fontSize}pt` }}>
            {formData.content || 'لي عظيم الشرف أن أتقدم إلى سيادتكم المحترمة بهذا الطلب...'}
          </div>

          {/* Signature */}
          <div className={styles.signatureSection}>
            <div>الإمضاء:</div>
            <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RequestPreview.displayName = 'RequestPreview';

export default RequestPreview;
