import React, { useRef, useState, useMemo } from 'react';
import { OrganicBox } from './OrganicBox';
import { OrganicButton } from './OrganicButton';
import { TfiUpload } from 'react-icons/tfi';
import { brushShadows, getColor, colorVariants } from './utils';

const formatBytes = (bytes) => {
  if (bytes === 0 || !bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const OrganicFileUpload = ({
  label = 'Arrastra y suelta tus archivos',
  description = 'O pulsa para seleccionarlos desde tu dispositivo',
  accept,
  multiple = true,
  maxSize,
  onFilesSelected,
  className = '',
  strokeWidth = 5
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const accent = getColor('accent');
  const success = colorVariants.success.border;
  const borderDefault = getColor('border');
  const borderMuted = getColor('borderMuted');
  const surface = getColor('surface');
  const surfaceActive = getColor('surfaceActive');
  const surfaceAlt = getColor('surfaceAlt');
  const textPrimary = getColor('surfaceText');
  const textMuted = getColor('surfaceTextMuted');
  const textSubtle = getColor('surfaceTextSubtle');

  const handleFiles = (fileList) => {
    const arrayFiles = Array.from(fileList ?? []);
    const filtered = maxSize
      ? arrayFiles.filter((file) => file.size <= maxSize)
      : arrayFiles;
    setFiles(filtered);
    onFilesSelected?.(filtered);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const borderColor = useMemo(() => {
    if (isDragging) return accent;
    if (files.length > 0) return success;
    return borderDefault;
  }, [accent, success, borderDefault, isDragging, files.length]);

  return (
    <OrganicBox
      className={`transition-shadow duration-200 ${className}`}
      strokeWidth={strokeWidth}
      strokeColor={borderColor}
      backgroundColor={isDragging ? surfaceActive : surface}
      style={{ filter: isDragging ? brushShadows.medium : brushShadows.soft }}
    >
      <div
        className="flex flex-col items-center gap-4 text-center"
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed"
          style={{
            backgroundColor: surfaceAlt,
            borderColor: borderMuted
          }}
        >
          <TfiUpload className="h-6 w-6" style={{ color: textMuted }} />
        </span>
        <div className="space-y-1">
          <p className="font-semibold" style={{ color: textPrimary }}>{label}</p>
          <p className="text-sm" style={{ color: textMuted }}>{description}</p>
          {maxSize && (
            <p className="text-xs" style={{ color: textSubtle }}>Tamaño máximo: {formatBytes(maxSize)}</p>
          )}
        </div>
        <OrganicButton
          variant="primary"
          size="medium"
          onClick={() => inputRef.current?.click()}
          fullWidth={false}
        >
          Seleccionar archivos
        </OrganicButton>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(event) => handleFiles(event.target.files)}
        />
        {files.length > 0 && (
          <div
            className="w-full rounded-2xl p-4 text-left shadow-sm"
            style={{ backgroundColor: surfaceAlt }}
          >
            <p className="text-sm font-semibold" style={{ color: textPrimary }}>Archivos seleccionados</p>
            <ul className="space-y-1 text-sm" style={{ color: textMuted }}>
              {files.map((file) => (
                <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3">
                  <span className="truncate">{file.name}</span>
                  <span className="text-xs">{formatBytes(file.size)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </OrganicBox>
  );
};
