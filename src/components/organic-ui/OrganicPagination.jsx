import React, { useMemo } from 'react';
import { OrganicButton } from './OrganicButton';
import { brushShadows } from './utils';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';

const createPages = (current, total, siblingCount = 1) => {
  const pages = [];
  const startPage = Math.max(2, current - siblingCount);
  const endPage = Math.min(total - 1, current + siblingCount);

  pages.push(1);

  if (startPage > 2) {
    pages.push('ellipsis-start');
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  if (endPage < total - 1) {
    pages.push('ellipsis-end');
  }

  if (total > 1) {
    pages.push(total);
  }

  return Array.from(new Set(pages)).filter((page) => page <= total);
};

export const OrganicPagination = ({
  page,
  totalPages,
  onPageChange,
  className = '',
  siblingCount = 1
}) => {
  const pages = useMemo(() => createPages(page, totalPages, siblingCount), [page, totalPages, siblingCount]);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handleChange = (nextPage) => {
    if (nextPage >= 1 && nextPage <= totalPages && nextPage !== page) {
      onPageChange?.(nextPage);
    }
  };

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 rounded-3xl bg-white/60 px-6 py-4 ${className}`}
    >
      <OrganicButton
        size="small"
        variant="default"
        strokeWidth={4}
        disabled={!canPrev}
        onClick={() => handleChange(page - 1)}
        className="!px-3"
        fullWidth={false}
      >
        <span className="flex items-center gap-1">
          <TfiAngleLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </span>
      </OrganicButton>
      <div className="flex items-center gap-2 text-sm font-semibold text-[#1e1e1e]/70">
        {pages.map((item, index) => {
          if (typeof item === 'string') {
            return <span key={item + index} className="px-2">…</span>;
          }
          const isActive = item === page;
          return (
            <OrganicButton
              key={item}
              size="small"
              variant={isActive ? 'primary' : 'default'}
              strokeWidth={isActive ? 6 : 4}
              onClick={() => handleChange(item)}
              className="!px-3"
              fullWidth={false}
            >
              {item}
            </OrganicButton>
          );
        })}
      </div>
      <OrganicButton
        size="small"
        variant="default"
        strokeWidth={4}
        disabled={!canNext}
        onClick={() => handleChange(page + 1)}
        className="!px-3"
        fullWidth={false}
      >
        <span className="flex items-center gap-1">
          <span className="hidden sm:inline">Siguiente</span>
          <TfiAngleRight className="h-4 w-4" />
        </span>
      </OrganicButton>
    </div>
  );
};
