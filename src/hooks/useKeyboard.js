import { useEffect, useCallback, useRef } from "react";
import { GAME_CONFIG } from "../utils/constants";

/**
 * Hook للتعامل مع إدخال لوحة المفاتيح بكفاءة عالية
 */
export function useKeyboard(onMove, isActive = true) {
  const lastMoveTime = useRef(0);
  const pressedKeys = useRef(new Set());

  const handleKeyDown = useCallback(
    (event) => {
      if (!isActive) return;

      // تجنب التكرار من الضغط المستمر على المفتاح
      if (pressedKeys.current.has(event.key)) {
        // لكن نسمح بالحركة المستمرة مع تأخير بسيط
        const now = Date.now();
        if (now - lastMoveTime.current < GAME_CONFIG.MOVE_DELAY) {
          return;
        }
      }

      pressedKeys.current.add(event.key);

      const { DIRECTIONS } = GAME_CONFIG;

      for (const [direction, config] of Object.entries(DIRECTIONS)) {
        if (config.key.includes(event.key)) {
          event.preventDefault();
          onMove(config.x, config.y, config.rotation);
          lastMoveTime.current = Date.now();
          return;
        }
      }
    },
    [onMove, isActive]
  );

  const handleKeyUp = useCallback((event) => {
    pressedKeys.current.delete(event.key);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
}
