// ===== "Sucked out of the plane" shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 0, 'hook', { cut: true });
S(1, 2, 'flight');
S(3, 5, 'blowout', { cut: true });
S(6, 6, 'outside', { cut: true });
S(7, 8, 'grab', { cut: true });
S(9, 9, 'copilot');
S(10, 12, 'hold');
S(13, 13, 'landing');
S(14, 16, 'alive');
S(17, 17, 'back');
