"use client";

// Shared underline-input + custom-checkbox styling, scoped via :global
// so it applies to the inputs rendered across the form.
export function FieldStyles() {
  return (
    <style jsx>{`
      :global(.kontakt-input) {
        width: 100%;
        background: transparent;
        border: 0;
        border-bottom: 1px solid var(--color-border);
        padding: 0.5rem 0;
        color: var(--color-text);
        font-size: 1rem;
        line-height: 1.5;
        outline: none;
        transition: border-color 0.3s;
      }
      :global(.kontakt-input:focus) {
        border-bottom-color: var(--color-metallic-light);
      }
      :global(.kontakt-input::placeholder) {
        color: var(--color-text-subtle);
      }
      :global(.kontakt-checkbox) {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border: 1px solid var(--color-border-hover);
        background: transparent;
        cursor: pointer;
        position: relative;
      }
      :global(.kontakt-checkbox:checked) {
        background: var(--color-metallic-light);
        border-color: var(--color-metallic-light);
      }
      :global(.kontakt-checkbox:checked::after) {
        content: "";
        position: absolute;
        left: 3px;
        top: 0px;
        width: 4px;
        height: 8px;
        border: solid #0a0a0a;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `}</style>
  );
}
