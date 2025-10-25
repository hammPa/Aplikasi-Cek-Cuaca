document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
      
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
        
            // Tutup semua accordion lainnya
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0px';
                otherItem.classList.remove('active');
            });
        
            // Jika yang diklik belum aktif, buka
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});