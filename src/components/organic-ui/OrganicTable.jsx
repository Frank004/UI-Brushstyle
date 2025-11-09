import React from 'react';

export const OrganicTable = ({
  columns = [],
  data = [],
  renderRow,
  className = '',
  strokeWidth = 5
}) => {
  const rows = renderRow
    ? data.map((item, index) => renderRow(item, index))
    : data.map((item, index) => (
        <tr key={index} className="group">
          {columns.map((col) => (
            <td key={col.accessor} className="px-4 py-3 text-sm text-[#1e1e1e]/80">
              {item[col.accessor]}
            </td>
          ))}
        </tr>
      ));

  return (
    <div className={`overflow-hidden rounded-3xl bg-white ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#1e1e1e]/10">
          <thead className="bg-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#1e1e1e]/70"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e1e]/5">
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
};
