type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function FilterBar({ filter, setFilter }: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {[
        ["all", "All"],
        ["today", "Today"],
        ["this-month", "This Month"],
        ["this-year", "This Year"],
        ["q1", "Q1"],
        ["q2", "Q2"],
        ["q3", "Q3"],
        ["q4", "Q4"],
      ].map(([value, label]) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`border px-4 py-2 text-sm uppercase tracking-[0.2em] transition ${
            filter === value
              ? "border-white bg-white text-black"
              : "border-zinc-700 text-gray-400 hover:border-white hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}