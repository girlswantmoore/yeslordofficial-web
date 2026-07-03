type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search by customer, email, or order ID"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="mb-8 w-full border border-zinc-700 bg-black px-5 py-4 text-white outline-none placeholder:text-gray-600 focus:border-white"
    />
  );
}