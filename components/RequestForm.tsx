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
  onPrint: () => void;
  onDownloadPDF: () => void;
  onDownloadDOCX: () => void;
}

export default function RequestForm({
  formData,
  onInputChange,
  onFontSizeChange,
  onPrint,
  onDownloadPDF,
  onDownloadDOCX,
}: RequestFormProps) {
  return (
    <div className={styles.formSection}>
      <div className={styles.formHeader}>
        <h1>مولّد الطلب الخطي</h1>
        <p>أدخل معلوماتك لإنشاء الطلب تلقائياً</p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="fontSize">حجم الخط</label>
        <input
          type="range"
          id="fontSize"
          min="14"
          max="20"
          value={formData.fontSize}
          step="1"
          onChange={onFontSizeChange}
        />
        <div className={styles.fontSizeVal}>{formData.fontSize}pt</div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="inputName">الاسم واللقب</label>
        <input
          type="text"
          id="inputName"
          placeholder="مثال: محمد أحمد"
          value={formData.name}
          onChange={onInputChange}
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
          placeholder="أكتب نص الطلب هنا..."
          value={formData.content}
          onChange={onInputChange}
        ></textarea>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onPrint}>
          <span>🖨️ طباعة</span>
        </button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onDownloadPDF}>
          <span>📄 تحميل PDF</span>
        </button>
        <button className={`${styles.btn} ${styles.btnOutline}`} onClick={onDownloadDOCX}>
          <span>📝 تحميل DOCX</span>
        </button>
      </div>
    </div>
  );
}
