// ===== "382 days without food" shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 0, 'hook', { cut: true });
S(1, 1, 'hospitalWalk');
S(2, 2, 'nameCard');
S(3, 5, 'doctors');
S(6, 6, 'neverStopped', { noGlitch: false });
S(7, 9, 'dayOne');
S(10, 12, 'ketosis');
S(13, 14, 'backToWork');
S(15, 15, 'frying');
S(16, 16, 'diet');
S(17, 17, 'strangest', { noGlitch: false });
S(18, 18, 'bathroom');
S(19, 19, 'day382', { noGlitch: false });
S(20, 20, 'firstMeal');
S(21, 22, 'result');
S(23, 23, 'warning');
S(24, 24, 'finalQ');
