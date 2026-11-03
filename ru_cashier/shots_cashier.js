// ===== «Кассир трижды пробила шоколадку» shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 0, 'hook', { cut: true });
S(1, 2, 'street');
S(3, 3, 'belt', { cut: true });
S(4, 4, 'grip');
S(5, 6, 'notice', { cut: true });
S(7, 9, 'gesture');
S(10, 13, 'freeze', { cut: true });
S(14, 14, 'panic', { cut: true });
S(15, 17, 'police');
S(18, 21, 'flashback');
S(22, 23, 'signal');
S(24, 25, 'remember');
