// ===== "SPOT THE LIAR — Case #001" shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 2, 'hook', { cut: true });
S(3, 5, 'maid', { cut: true });
S(6, 8, 'neighbor', { cut: true });
S(9, 11, 'guard', { cut: true });
S(12, 14, 'doubt', { cut: true });
S(15, 16, 'countdown', { cut: true });
S(17, 17, 'liar', { cut: true });
S(18, 18, 'pocket', { cut: true });
S(19, 19, 'bedplan', { cut: true });
S(20, 20, 'again', { cut: true });
