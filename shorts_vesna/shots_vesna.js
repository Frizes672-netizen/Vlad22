// ===== "She fell 33,000 feet" shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 2, 'hookFall', { cut: true });
S(3, 4, 'airport1972');
S(5, 6, 'mixUp');
S(7, 7, 'bomb');
S(8, 8, 'breakApart', { noGlitch: false });
S(9, 11, 'noSurvive');
S(12, 12, 'pinned');
S(13, 13, 'tailCrash');
S(14, 16, 'honke');
S(17, 19, 'injuries');
S(20, 21, 'coma');
S(22, 23, 'recovery');
S(24, 24, 'record');
S(25, 25, 'finalQ');
