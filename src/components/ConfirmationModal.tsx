import React, { useEffect } from 'react';
import { AlertTriangle, HelpCircle, Check, X, Trash2, Save, RotateCcw } from 'lucide-react';

export interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  details?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'warning';
  icon?: 'trash' | 'save' | 'warning' | 'reset' | 'question';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = 'Confirmation Required',
  message = 'Are you sure you want to perform this operation?',
  details,
  confirmLabel = 'Yes, Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  icon = 'question',
  onConfirm,
  onCancel,
}) => {
  // Handle ESC key to cancel
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (icon) {
      case 'trash':
        return <Trash2 className="w-6 h-6 text-rose-600" />;
      case 'save':
        return <Save className="w-6 h-6 text-emerald-600" />;
      case 'reset':
        return <RotateCcw className="w-6 h-6 text-amber-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case 'question':
      default:
        return variant === 'danger' ? (
          <Trash2 className="w-6 h-6 text-rose-600" />
        ) : (
          <HelpCircle className="w-6 h-6 text-emerald-600" />
        );
    }
  };

  const getIconBg = () => {
    if (variant === 'danger' || icon === 'trash') return 'bg-rose-100 border border-rose-200';
    if (variant === 'warning' || icon === 'reset' || icon === 'warning') return 'bg-amber-100 border border-amber-200';
    return 'bg-emerald-100 border border-emerald-200';
  };

  const getConfirmBtnClass = () => {
    if (variant === 'danger') {
      return 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-900/20';
    }
    if (variant === 'warning') {
      return 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/20';
    }
    return 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/20';
  };

  return (
    <div
      id="confirmation-modal-backdrop"
      className="fixed inset-0 z-[100] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div
        id="confirmation-modal-container"
        className="relative w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 text-stone-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X Button in top corner */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Icon */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg()}`}>
            {renderIcon()}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3
              id="confirmation-modal-title"
              className="text-base sm:text-lg font-bold text-stone-900 font-serif-luxury leading-snug"
            >
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed font-medium">
              {message}
            </p>
          </div>
        </div>

        {/* Optional Contextual Details */}
        {details && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs text-stone-700 space-y-1.5 font-sans">
            {details}
          </div>
        )}

        {/* Action Buttons: Cancel and Yes, Confirm */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-100">
          <button
            type="button"
            id="confirmation-modal-cancel-btn"
            onClick={onCancel}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            id="confirmation-modal-confirm-btn"
            onClick={onConfirm}
            className={`min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center gap-2 ${getConfirmBtnClass()}`}
          >
            <Check className="w-4 h-4" />
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
