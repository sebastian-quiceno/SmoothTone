import { useState } from "react";

import { Search } from "lucide-react";

type SearchBarProps<T> = {
  value: string;
  onChange: (direccion: string) => void;
  results: T[];
  loading: boolean;
  placeholder: string;
  renderItem: (item: T) => string;
  onSelect: (item: T) => void;
  keyExtractor: (item: T) => number;
};

export const SearchBar = <T,>({
  value,
  onChange,
  results = [],
  loading = false,
  placeholder = "Buscar...",
  renderItem,
  onSelect,
  keyExtractor,
}: SearchBarProps<T>) => {

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const showResults = isFocused && value.trim() !== "" && results.length > 0;

  const blockInput = isSelected && selected !== null;

  return (
    <div
      //className="flex flex-row max-w-sm w-full px-2 py-2.5 gap-2 rounded-xl bg-white/10 backdrop-blur-md text-white  hover:bg-white/20 hover:border-white/40 hover:ring-2 hover:ring-white/20 transition-all duration-300"
      className={`relative flex flex-col justify-center w-[350px] py-2 rounded-xl text-white ${
        blockInput
          ? "bg-green-300/70 border-green-300/60 ring-2 ring-green-200/30"
          : isFocused
            ? "bg-white/10 border-white/40 ring-2 ring-white/20"
            : "bg-white/10"
      } transition-all duration-300`}
    >
      <div className="flex flex-row px-2 gap-2 items-center">
        <Search />
        <input
          type="text"
          value={blockInput ? selected : value}
          onChange={(e) => {
            onChange(e.target.value);
            if (isSelected) {
              setIsSelected(false);
              setSelectedId(null);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            bg-white/0
            w-[350px]
          placeholder:text-white/50
            outline-none ring-0
            border-b-black
          "
        />
      </div>

      {loading && isFocused && (
        <p className="text-sm text-gray-400 mt-1">Cargando...</p>
      )}

      {showResults && (
        <>
          <ul className="absolute top-full left-0 mt-2 w-full max-h-48 overflow-y-auto rounded-xl bg-zinc-900/95 backdrop-blur-md border border-white/10 shadow-xl z-50">
            {results.map((item) => {
              const itemId = keyExtractor(item);

              return (
                <li
                  key={itemId}
                  onMouseDown={() => {
                    onSelect(item);
                    setIsSelected(true);
                    setSelected(renderItem(item));
                    setSelectedId(itemId);
                  }}
                  className={`p-2 gap-2 flex flex-row text-white/80 cursor-pointer transition-colors duration-200 ${
                    selectedId === itemId
                      ? "bg-green-300/70 hover:bg-green-300/80"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Search />
                  {renderItem(item)}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchBar;
