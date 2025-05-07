function Search({ search, setSearch, searchFiled, setSearchFiled }) {
  const fields = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
  ];

  return (
    <div className="mb-4 flex flex-wrap  justify-center md:justify-start items-center gap-2">
      {/* Search Input */}
      <div className="relative md:w-48 w-44">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search By ${getFieldLabel(searchFiled)}...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#375559] focus:border-[#375559] outline-none transition-all"
        />
      </div>

      {/* Field Selection Buttons */}
      <div className="flex items-center gap-1  p-1 rounded-lg">
        {fields.map((field) => (
          <button
            key={field.value}
            onClick={() => setSearchFiled(field.value)}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              searchFiled === field.value
                ? "bg-[#375559] text-white"
                : "text-gray-500 hover:bg-[#89AEB2]"
            }`}
          >
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Search;

function getFieldLabel(field) {
  const labels = {
    name: "Name",
    email: "Email",
  };
  return labels[field] || field;
}
