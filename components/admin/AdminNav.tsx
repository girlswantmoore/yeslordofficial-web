export type AdminTab = "orders" | "engagement" | "sales";

const tabs: { id: AdminTab; label: string; description: string }[] = [
  { id: "orders", label: "Orders", description: "Manage fulfillment" },
  { id: "engagement", label: "User engagement", description: "Understand visits" },
  { id: "sales", label: "Sales analytics", description: "Track performance" },
];

export default function AdminNav({
  active,
  onChange,
}: {
  active: AdminTab;
  onChange: (tab: AdminTab) => void;
}) {
  return (
    <nav aria-label="Admin sections" className="mb-10 border-y border-zinc-800">
      <div className="grid md:grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`border-b px-5 py-5 text-left transition md:border-b-0 md:border-r last:border-0 ${
              active === tab.id
                ? "border-white bg-white text-black"
                : "border-zinc-800 text-zinc-400 hover:bg-zinc-950 hover:text-white"
            }`}
          >
            <span className="block text-sm font-semibold uppercase tracking-[0.18em]">
              {tab.label}
            </span>
            <span className={`mt-1 block text-xs ${active === tab.id ? "text-zinc-600" : "text-zinc-600"}`}>
              {tab.description}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
