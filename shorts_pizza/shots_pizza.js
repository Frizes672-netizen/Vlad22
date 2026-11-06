// ===== true story: the 911 "pizza order" — shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ cut: true }, p));
S(0, 0, 'hook'); S(1, 2, 'dispatch'); S(3, 4, 'order'); S(5, 5, 'hangup'); S(6, 7, 'didnt'); S(8, 10, 'understood'); S(11, 12, 'yesno'); S(13, 13, 'sirens'); S(14, 14, 'arrest'); S(15, 16, 'nocode'); S(17, 17, 'text'); S(18, 18, 'final');
