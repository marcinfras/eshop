import React, { useState, useRef } from "react";
import type { UseSearchBoxProps } from "react-instantsearch";
import { useInstantSearch, useSearchBox } from "react-instantsearch";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";

export const SearchBox = (
  props: UseSearchBoxProps & { handleCloseModal: () => void }
) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const refOutside = useRef(null);
  useOutsideClick(refOutside, props.handleCloseModal);

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <form
      className="flex justify-center grow items-center gap-2 max-w-[500px]"
      role="search"
      noValidate
      onClick={(e) => e.stopPropagation()}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery("");

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <Input
        className="w-full "
        aria-autocomplete="list"
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search for products"
        spellCheck={false}
        maxLength={512}
        type="search"
        value={inputValue}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        autoFocus
      />
      <button type="submit">
        <Search className="text-stone-800 h-5 w-5" />
      </button>

      <span hidden={!isSearchStalled}>Searching…</span>
    </form>
  );
};
