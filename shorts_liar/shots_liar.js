// ===== "SPOT THE LIAR — Case #001" shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 2, 'hook', { cut: true });
S(3, 5, 'maid', { cut: true });
S(6, 8, 'neighbor', { cut: true });
S(9, 11, 'guard', { cut: true });
S(12, 12, 'countdown', { cut: true });
S(13, 16, 'reveal', { cut: true });
S(17, 18, 'plan');
S(19, 20, 'again', { cut: true });
