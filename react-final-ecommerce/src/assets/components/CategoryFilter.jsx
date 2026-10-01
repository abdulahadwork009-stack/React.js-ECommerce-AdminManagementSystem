export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 capitalize dark:border-gray-600 dark:bg-gray-800"
    >
      {categories.map((c) => (
        <option key={c} value={c} className="capitalize">{c}</option>
      ))}
    </select>
  );
}