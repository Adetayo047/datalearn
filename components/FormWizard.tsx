"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { forms, type Field, type FormKind } from "@/lib/forms";
import { Mark } from "./Logo";

type Values = Record<string, string | boolean | string[]>;

function emptyValue(f: Field) {
  return f.type === "checkbox" ? false : f.type === "multi" ? [] : "";
}

function checkField(f: Field, v: Values[string]): string | null {
  if (f.type === "checkbox") return f.required && v !== true ? "Please tick this box to continue." : null;
  if (f.type === "multi") return f.required && (v as string[]).length === 0 ? "Choose at least one option." : null;
  const str = String(v ?? "").trim();
  if (f.required && !str) return f.type === "radio" || f.type === "select" ? "Choose one option." : "This field is required.";
  if (str && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) return "Enter an email address like name@example.com.";
  if (f.max && str.length > f.max) return `Keep this under ${f.max} characters.`;
  return null;
}

export default function FormWizard({ kind }: { kind: FormKind }) {
  const def = forms[kind];
  const all = def.steps.flatMap((s) => s.fields);
  const [values, setValues] = useState<Values>(() => Object.fromEntries(all.map((f) => [f.name, emptyValue(f)])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const started = useRef(Date.now());
  const hp = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const draftKey = `draft:${kind}`;

  // Keep an unsent draft in this browser so a refresh doesn't lose answers.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) setValues((v) => ({ ...v, ...JSON.parse(saved) }));
    } catch {}
  }, [draftKey]);
  useEffect(() => {
    if (status === "done") return;
    try {
      localStorage.setItem(draftKey, JSON.stringify(values));
    } catch {}
  }, [values, draftKey, status]);

  const current = def.steps[step];
  const last = step === def.steps.length - 1;

  function set(name: string, v: Values[string]) {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function validate(fields: Field[]) {
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const msg = checkField(f, values[f.name]);
      if (msg) errs[f.name] = msg;
    }
    setErrors((e) => ({ ...e, ...Object.fromEntries(fields.map((f) => [f.name, errs[f.name] ?? ""])) }));
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(`f-${kind}-${first}`)?.focus();
    return !first;
  }

  function goTo(n: number) {
    setStep(n);
    setFormError(null);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate(current.fields)) return;
    if (!last) return goTo(step + 1);

    setStatus("sending");
    setFormError(null);
    const payload: Record<string, unknown> = { _hp: hp.current?.value ?? "", _t: started.current };
    for (const f of all) {
      const v = values[f.name];
      if (v === "" || (Array.isArray(v) && v.length === 0 && !f.required)) continue;
      payload[f.name] = v;
    }
    try {
      const res = await fetch(`/api/submit/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("idle");
        if (data.fields) {
          setErrors(data.fields);
          const idx = def.steps.findIndex((s) => s.fields.some((f) => data.fields[f.name]));
          if (idx >= 0) setStep(idx);
        }
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      try {
        localStorage.removeItem(draftKey);
      } catch {}
      setStatus("done");
      requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setStatus("idle");
      setFormError("We couldn't reach the server. Check your connection and try again. Your answers are saved in this browser.");
    }
  }

  if (status === "done") {
    return (
      <div className="form-shell" ref={top}>
        <div className="form-success" role="status">
          <Mark />
          <h2 style={{ fontSize: "var(--step-2)" }}>{def.successTitle}</h2>
          <p className="muted">{def.successText}</p>
          <div className="btn-row">
            <Link href="/" className="btn btn-ghost">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-shell" ref={top}>
      {def.steps.length > 1 && (
        <ol className="form-progress" aria-label="Form progress">
          {def.steps.map((s, i) => (
            <li key={s.title} data-state={i < step ? "done" : i === step ? "current" : "todo"} aria-current={i === step ? "step" : undefined}>
              <span className="mono">
                Step {i + 1}
                <span className="of"> of {def.steps.length}</span>
              </span>
              <span className="t">{s.title}</span>
            </li>
          ))}
        </ol>
      )}
      <form onSubmit={onSubmit} noValidate>
        <div className="form-body">
          {def.steps.length > 1 && <h2 style={{ fontSize: "var(--step-2)" }}>{current.title}</h2>}
          {current.intro && <p className="muted">{current.intro}</p>}
          {formError && (
            <div className="form-error" role="alert">
              {formError}
            </div>
          )}
          {current.fields.map((f) => (
            <FieldInput key={f.name} kind={kind} f={f} value={values[f.name]} error={errors[f.name]} onChange={(v) => set(f.name, v)} />
          ))}
          <div className="hp" aria-hidden="true">
            <label htmlFor={`hp-${kind}`}>Leave this empty</label>
            <input id={`hp-${kind}`} ref={hp} tabIndex={-1} autoComplete="off" />
          </div>
        </div>
        <div className="form-foot">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={() => goTo(step - 1)}>
              ← Back
            </button>
          ) : (
            <span className="mono muted">Answers are saved in this browser until you send them.</span>
          )}
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : last ? def.submitLabel : "Continue"}
            {status !== "sending" && (
              <span className="arrow" aria-hidden="true">
                →
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function FieldInput({ kind, f, value, error, onChange }: { kind: string; f: Field; value: Values[string]; error?: string; onChange: (v: Values[string]) => void }) {
  const id = `f-${kind}-${f.name}`;
  const describedBy = [f.hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  const req = f.required ? <span aria-hidden="true"> *</span> : null;
  const hint = f.hint && (
    <span id={`${id}-hint`} className="hint">
      {f.hint}
    </span>
  );
  const err = error && (
    <span id={`${id}-err`} className="err">
      {error}
    </span>
  );

  if (f.type === "checkbox") {
    return (
      <div className="field" data-error={!!error}>
        <label className="check">
          <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} aria-describedby={describedBy} />
          <span>
            {f.label}{" "}
            <Link href="/privacy" className="link" target="_blank">
              Privacy notice
            </Link>
            {req}
          </span>
        </label>
        {err}
      </div>
    );
  }

  if (f.type === "radio" || f.type === "multi") {
    const multi = f.type === "multi";
    const arr = (value as string[]) ?? [];
    return (
      <fieldset className="field" data-error={!!error} aria-describedby={describedBy}>
        <legend>
          {f.label}
          {req}
        </legend>
        {hint}
        <div className="options" role={multi ? "group" : "radiogroup"}>
          {f.options!.map((o, i) => (
            <label key={o} className="opt">
              <input
                id={i === 0 ? id : undefined}
                type={multi ? "checkbox" : "radio"}
                name={`${kind}-${f.name}`}
                value={o}
                checked={multi ? arr.includes(o) : value === o}
                onChange={(e) => (multi ? onChange(e.target.checked ? [...arr, o] : arr.filter((x) => x !== o)) : onChange(o))}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );
  }

  return (
    <div className="field" data-error={!!error}>
      <label htmlFor={id}>
        {f.label}
        {req}
      </label>
      {hint}
      {f.type === "textarea" ? (
        <textarea id={id} value={String(value)} maxLength={f.max} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={describedBy} placeholder={f.placeholder} />
      ) : f.type === "select" ? (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={describedBy}>
          <option value="">Choose…</option>
          {f.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={f.type}
          value={String(value)}
          maxLength={f.max}
          autoComplete={f.autoComplete}
          placeholder={f.placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
        />
      )}
      {f.type === "textarea" && f.max && (
        <span className="hint tnum" aria-live="polite">
          {String(value).length} / {f.max}
        </span>
      )}
      {err}
    </div>
  );
}
