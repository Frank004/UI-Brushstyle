import React from 'react';
import { getColor } from './utils';

export const OrganicTable = ({
  columns = [],
  data = [],
  renderRow,
  className = '',
  strokeWidth = 5
}) => {
  const surface = getColor('surface');
  const text = getColor('surfaceText');
  const textMuted = getColor('surfaceTextMuted');
  const borderMuted = getColor('borderMuted');

  const rows = renderRow
    ? data.map((item, index) => renderRow(item, index))
    : data.map((item, rowIndex) => (
        <tr key={rowIndex} className="group">
          {columns.map((col) => (
            <td
              key={col.accessor}
              className="px-4 py-3 text-sm"
              style={{
                color: textMuted,
                borderTop: rowIndex === 0 ? 'none' : `1px solid ${borderMuted}`
              }}
            >
              {item[col.accessor]}
            </td>
          ))}
        </tr>
      ));

  return (
    <div
      className={`overflow-hidden rounded-3xl ${className}`}
      style={{ backgroundColor: surface }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: surface }}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: textMuted, borderBottom: `1px solid ${borderMuted}` }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );
};
