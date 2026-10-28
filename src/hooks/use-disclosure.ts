"use client";

import { useCallback, useState } from "react";

/** Open/close state for modals; optionally carries a payload (e.g. the row being edited). */
export function useDisclosure<T = undefined>() {
  const [state, setState] = useState<{ open: boolean; payload?: T }>({ open: false });

  const onOpen = useCallback((payload?: T) => setState({ open: true, payload }), []);
  const onClose = useCallback(() => setState((prev) => ({ ...prev, open: false })), []);
  const onOpenChange = useCallback((open: boolean) => setState((prev) => ({ ...prev, open })), []);

  return { open: state.open, payload: state.payload, onOpen, onClose, onOpenChange };
}
