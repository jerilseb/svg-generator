export default function lexer(code) {
  return code
    .split(/\s+/)
    .filter(t => t.length > 0)
    .map(t => (isNaN(t) ? { type: "word", value: t } : { type: "number", value: t }));
}
