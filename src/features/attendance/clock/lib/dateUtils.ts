const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

export const nowToMinutes = (): number => {
  const now = new Date();
  const jstOffset = 9 * 60;
  return (now.getUTCHours() * 60 + now.getUTCMinutes() + jstOffset) % (24 * 60);
};

export const todayJST = (): Date => {
  const now = new Date();
  const jstMs = now.getTime() + JST_OFFSET_MS;
  const jst = new Date(jstMs);

  const y = jst.getUTCFullYear();
  const m = jst.getUTCMonth();
  const d = jst.getUTCDate();

  const utcMs = Date.UTC(y, m, d) - JST_OFFSET_MS;
  return new Date(utcMs);
};

export const thisMonthJST = (): Date => {
  const today = todayJST();
  return new Date(today.getFullYear(), today.getMonth(), 1);
};
