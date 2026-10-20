import { z, type ZodTypeAny } from "zod";
import { forms, type Field, type FormKind } from "./forms";

function fieldSchema(f: Field): ZodTypeAny {
  switch (f.type) {
    case "checkbox":
      return f.required
        ? z.literal(true, { errorMap: () => ({ message: "Please tick this box to continue." }) })
        : z.boolean().optional();
    case "multi": {
      const arr = z.array(z.enum(f.options as [string, ...string[]]));
      return f.required ? arr.min(1, "Choose at least one option.") : arr.optional();
    }
    case "select":
    case "radio": {
      const e = z.enum(f.options as [string, ...string[]], { errorMap: () => ({ message: "Choose one option." }) });
      return f.required ? e : e.optional().or(z.literal(""));
    }
    default: {
      let s = z.string().trim().max(f.max ?? 500, `Keep this under ${f.max ?? 500} characters.`);
      if (f.type === "email") s = s.email("Enter an email address like name@example.com.");
      return f.required ? s.min(1, "This field is required.") : s.optional().or(z.literal(""));
    }
  }
}

export function schemaFor(kind: FormKind) {
  const shape: Record<string, ZodTypeAny> = {};
  for (const step of forms[kind].steps) for (const f of step.fields) shape[f.name] = fieldSchema(f);
  return z.object(shape).strict();
}

export function errorsFor(kind: FormKind, data: unknown): Record<string, string> | null {
  const r = schemaFor(kind).safeParse(data);
  if (r.success) return null;
  const out: Record<string, string> = {};
  for (const issue of r.error.issues) {
    const key = String(issue.path[0] ?? "_form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
