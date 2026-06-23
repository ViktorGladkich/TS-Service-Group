"use client";

// Shared underline-input + custom-checkbox styling, scoped via :global
// so it applies to the inputs rendered across the form.
export function FieldStyles() {
  return (
    <style jsx>{`
      :global(.kontakt-input) {
        width: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        padding: 0.75rem 1rem;
        color: var(--color-text);
        font-size: 1rem;
        line-height: 1.5;
        outline: none;
        transition: border-color 0.3s, background-color 0.3s;
      }
      :global(.kontakt-input:focus) {
        border-color: var(--color-metallic-light);
        background: rgba(255, 255, 255, 0.05);
      }
      :global(.kontakt-input::placeholder) {
        color: var(--color-text-subtle);
      }
      :global(.kontakt-checkbox) {
        appearance: none;
        width: 1.25rem;
        height: 1.25rem;
        border: 1px solid var(--color-border-hover);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.03);
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
      }
      :global(.kontakt-checkbox:checked) {
        background: var(--color-metallic-light);
        border-color: var(--color-metallic-light);
      }
      :global(.kontakt-checkbox:checked::after) {
        content: "";
        position: absolute;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid #0a0a0a;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `}</style>
  );
}
