"use client";

import { motion } from "motion/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex items-center justify-center gap-3 mt-10 sm:mt-12"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-foreground"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-[4px] text-sm flex items-center justify-center transition-colors ${
              currentPage === page
                ? "bg-foreground text-white"
                : "bg-[#fcfcfc] text-muted-foreground hover:bg-muted"
            }`}
          >
            {page}
          </button>
        ))}

        {totalPages > 3 && (
          <span className="text-muted-foreground text-lg mx-1">.....</span>
        )}

        {totalPages > 3 && (
          <button
            onClick={() => onPageChange?.(totalPages)}
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-[4px] text-sm flex items-center justify-center transition-colors ${
              currentPage === totalPages
                ? "bg-foreground text-white"
                : "bg-[#fcfcfc] text-muted-foreground hover:bg-muted"
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>

      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-foreground"
        >
          <path
            d="M7.5 5L12.5 10L7.5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default Pagination;