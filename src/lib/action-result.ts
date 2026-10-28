/** Shape returned by every Server Action. Actions never throw to the client, so no stack traces or internals leak. */
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; error: string; fieldErrors?: Record<string, string[]> };

export class ActionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ActionError";
  }
}

/** Turns an ActionResult into a value-or-throw, so it plugs straight into TanStack Query. */
export async function unwrap<T>(result: Promise<ActionResult<T>>): Promise<T> {
  const res = await result;
  if (!res.ok) throw new ActionError(res.error, res.code, res.fieldErrors);
  return res.data;
}
