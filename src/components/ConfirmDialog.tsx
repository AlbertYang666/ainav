'use client';

import { useEffect, useState } from 'react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  message,
  confirmText = '确定',
  cancelText = '取消',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 淡入动画
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 150);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 150);
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
          <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line">
            {message}
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-white rounded transition-colors ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
