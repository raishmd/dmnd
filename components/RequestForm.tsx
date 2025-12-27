import styles from './RequestForm.module.css';

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

interface RequestFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFontSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateContent: () => Promise<void>;
  onPrint: () => void;
  onDownloadPDF: () => void;
  onDownloadDOCX: () => void;
  isGenerating?: boolean;
}

export default function RequestForm({
  formData,
  onInputChange,
  onFontSizeChange,
  onGenerateContent,
  onPrint,
  onDownloadPDF,
  onDownloadDOCX,
  isGenerating = false,
}: RequestFormProps) {
  return (
    <div className={styles.formSection}>
      <div className={styles.formHeader}>
        <div className={styles.iconWrapper}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L6 24L24 44L42 24L24 4Z" fill="url(#logo-grad-1)" fillOpacity="0.8" />
            <path d="M24 4L15 24L24 34L33 24L24 4Z" fill="white" fillOpacity="0.3" />
            <path d="M24 14L18 24L24 30L30 24L24 14Z" fill="white" fillOpacity="0.5" />
            <defs>
              <linearGradient id="logo-grad-1" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1>مولّد الطلب الخطي</h1>
        <p>أنشئ طلبك الإداري بلمسة عصرية وذكية</p>
      </div>

      <div className={styles.formGroup}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="fontSize">حجم الخط</label>
          <div className={styles.fontSizeVal}>{formData.fontSize}pt</div>
        </div>
        <input
          type="range"
          id="fontSize"
          min="14"
          max="20"
          value={formData.fontSize}
          step="1"
          onChange={onFontSizeChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputName">الاسم واللقب</label>
        <input
          type="text"
          id="inputName"
          placeholder="مثال: محمد أحمد"
          value={formData.name}
          onChange={onInputChange}
          autoComplete="name"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputAddress">العنوان الكامل</label>
        <input
          type="text"
          id="inputAddress"
          placeholder="مثال: حي الزهور، الجزائر الوسطى"
          value={formData.address}
          onChange={onInputChange}
          autoComplete="street-address"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputPhone">رقم الهاتف</label>
        <input
          type="tel"
          id="inputPhone"
          placeholder="0661 00 00 00"
          value={formData.phone}
          onChange={onInputChange}
          autoComplete="tel"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputDate">التاريخ</label>
        <input
          type="date"
          id="inputDate"
          value={formData.date}
          onChange={onInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputDirector">إلى السيد مدير</label>
        <input
          type="text"
          id="inputDirector"
          placeholder="مثال: الموارد البشرية"
          value={formData.director}
          onChange={onInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputSubject">الموضوع</label>
        <input
          type="text"
          id="inputSubject"
          placeholder="مثال: طلب توظيف"
          value={formData.subject}
          onChange={onInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputContent">محتوى الطلب</label>
        <textarea
          id="inputContent"
          placeholder="أكتب نص الطلب هنا أو استخدم زر التوليد الذكي..."
          value={formData.content}
          onChange={onInputChange}
        ></textarea>
        <button
          className={`${styles.btn} ${styles.btnAI}`}
          onClick={onGenerateContent}
          disabled={isGenerating}
        >
          <span>{isGenerating ? '⏳ جاري التوليد...' : '✨ توليد ذكي بالذكاء الاصطناعي'}</span>
        </button>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onPrint}>
          <span>🖨️ طباعة الطلب</span>
        </button>
      </div>
    </div>
  );
}
