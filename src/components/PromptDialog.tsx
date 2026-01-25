'use client';

import { useEffect, useState } from 'react';

interface PromptDialogProps {
  title: string;
  message: string;
  placeholder?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export default function PromptDialog({
  title,
  message,
  placeholder = '',
  defaultValue = '',
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
}: PromptDialogProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(() => onConfirm(value), 150);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-150 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleCancel}
      />

      {/* 对话框 */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-150 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {message}
          </p>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-700 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
