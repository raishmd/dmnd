// Elements
const inputs = {
    name: document.getElementById('inputName'),
    address: document.getElementById('inputAddress'),
    phone: document.getElementById('inputPhone'),
    date: document.getElementById('inputDate'),
    director: document.getElementById('inputDirector'),
    subject: document.getElementById('inputSubject'),
    content: document.getElementById('inputContent'),
    fontSize: document.getElementById('fontSize')
};

const outputs = {
    name: document.getElementById('outName'),
    address: document.getElementById('outAddress'),
    phone: document.getElementById('outPhone'),
    date: document.getElementById('outDate'),
    director: document.getElementById('outDirector'),
    subject: document.getElementById('outSubject'),
    content: document.getElementById('outContent'),
    signature: document.getElementById('outSignature'),
    page: document.getElementById('request-page'),
    fontSizeVal: document.getElementById('fontSizeVal')
};

// Update Functions
function updatePreview() {
    outputs.name.textContent = inputs.name.value || '................';
    outputs.address.textContent = inputs.address.value || '................';
    outputs.phone.textContent = inputs.phone.value || '................';

    // Format Date
    if (inputs.date.value) {
        const d = new Date(inputs.date.value);
        outputs.date.textContent = `في: ${d.toLocaleDateString('fr-FR')}`; // DD/MM/YYYY
    } else {
        outputs.date.textContent = 'في: ..../../..';
    }

    outputs.director.textContent = inputs.director.value || '................';
    outputs.subject.textContent = inputs.subject.value || '................';
    outputs.content.textContent = inputs.content.value || 'لي عظيم الشرف أن أتقدم إلى سيادتكم المحترمة بهذا الطلب...';

    // Signature usually matches name
    // outputs.signature.textContent = inputs.name.value || '';
}

function updateFontSize() {
    const size = inputs.fontSize.value;
    outputs.page.style.fontSize = `${size}pt`;
    outputs.fontSizeVal.textContent = `${size}pt`;
}

// Event Listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', () => {
        if (input === inputs.fontSize) updateFontSize();
        else updatePreview();
    });
});

// Initialize Date to today
const today = new Date().toISOString().split('T')[0];
inputs.date.value = today;
updatePreview();

// Actions
function printRequest() {
    window.print();
}

function downloadPDF() {
    const element = document.getElementById('request-page');
    const opt = {
        margin: 0,
        filename: 'طلب_خطي.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Temporary style adjustment for PDF generation
    const originalShadow = element.style.boxShadow;
    element.style.boxShadow = 'none';

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.boxShadow = originalShadow;
    });
}

function downloadDOCX() {
    // Check if html-docx is loaded
    const lib = window.htmlDocx || window.HtmlDocx;
    if (!lib) {
        alert('عذراً، مكتبة DOCX لم يتم تحميلها بشكل صحيح. يرجى التحقق من الاتصال بالإنترنت.');
        return;
    }

    const content = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <style>
                body { 
                    font-family: 'Times New Roman', serif; 
                    direction: rtl; 
                    text-align: right; 
                }
                p, div, span {
                    font-family: 'Times New Roman', serif;
                    mso-ascii-font-family: 'Times New Roman';
                    mso-hansi-font-family: 'Times New Roman';
                    mso-bidi-font-family: 'Times New Roman';
                }
                .page-header { display: flex; justify-content: space-between; }
                .sender-info { text-align: right; }
                .date-info { text-align: left; }
                .recipient-section { margin-top: 20px; text-align: left; font-weight: bold; }
                .subject-section { margin-top: 30px; text-align: center; font-weight: bold; text-decoration: underline; }
                .content-section { margin-top: 20px; text-align: justify; }
                .signature-section { margin-top: 40px; text-align: left; font-weight: bold; }
            </style>
        </head>
        <body>
            ${document.getElementById('request-page').innerHTML}
        </body>
        </html>
    `;

    try {
        const converted = lib.asBlob(content, {
            orientation: 'portrait',
            margins: { top: 720, right: 720, bottom: 720, left: 720 } // twips
        });
        saveAs(converted, 'طلب_خطي.docx');
    } catch (e) {
        console.error(e);
        alert('حدث خطأ أثناء إنشاء ملف DOCX.');
    }
}
