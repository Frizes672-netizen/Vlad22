// ===== «30 дней без телефона» shot list =====
const S = (a, b, sc, p = {}) => shot(a, b, sc, Object.assign({ noGlitch: true }, p));
S(0, 0, 'hook', { cut: true });
S(1, 1, 'pickups', { noGlitch: false });
S(2, 2, 'youToo', { cut: true, noGlitch: false });
S(3, 5, 'lockAway');
S(6, 9, 'day1', { noGlitch: false });
S(10, 14, 'day2', { noGlitch: false });
S(15, 19, 'day3', { noGlitch: false });
S(20, 23, 'day5', { noGlitch: false });
S(24, 26, 'day7');
S(27, 29, 'day14');
S(30, 33, 'day30');
S(34, 34, 'howMany', { noGlitch: false });
S(35, 35, 'share');
