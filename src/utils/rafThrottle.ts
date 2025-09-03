// 한 프레임에 1번만 실행되도록 묶는 유틸
export function rafThrottle<T extends (...args: any[]) => void>(fn: T) {
  let scheduled = false;
  let lastArgs: any[] = [];
  return (...args: Parameters<T>) => {
    lastArgs = args;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fn(...lastArgs);
    });
  };
}
