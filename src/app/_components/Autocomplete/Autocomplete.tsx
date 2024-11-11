"use client";

import "instantsearch.css/themes/satellite.css";

import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { SearchModal } from "./components/SearchModal";

export const Autocomplete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {isModalOpen && (
        <SearchModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      )}
      <Button
        variant={"outline"}
        className="sm:w-full max-w-[350px] sm:justify-start overflo"
        onClick={handleOpenModal}
      >
        <Search className="text-stone-800 h-4 w-4 sm:mr-2" />
        <span className="sr-only sm:not-sr-only text-stone-500 text-xs">
          Search...
        </span>
      </Button>
    </>
  );
};
