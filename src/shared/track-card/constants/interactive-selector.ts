export const interactiveSelector = `
  button,
  a[href],
  input:not([disabled]):not([readonly]),
  select:not([disabled]),
  textarea:not([disabled]):not([readonly]),
  [role="button"],
  [role="link"],
  [role="checkbox"],
  [role="radio"],
  [role="tab"],
  [role="menuitem"],
  [role="option"],
  [tabindex]:not([tabindex="-1"])
`
