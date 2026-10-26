import { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import { Language } from '../utils/heroConfig';
import {
  ModasrProduct,
  calculateCartSummary,
  formatToman,
} from '../utils/modasrStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  items: Array<{ product: ModasrProduct; quantity: number }>;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  usdtRate: number;
  onSubmitOrder: (email: string, discountCode: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  lang,
  items,
  onUpdateQuantity,
  onRemoveItem,
  usdtRate,
  onSubmitOrder,
}: CartDrawerProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  if (!isOpen) return null;

  const isRtl = lang === 'fa';
  const summary = calculateCartSummary(items, discountCode, usdtRate);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError(
        isRtl
          ? 'لطفاً یک ایمیل معتبر برای ثبت و پیگیری سفارش وارد کنید.'
          : 'Please enter a valid email address for order tracking.'
      );
      return;
    }
    setEmailError('');
    onSubmitOrder(trimmed, discountCode);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isRtl ? 'سبد خرید مدثر' : 'MODASR Shopping Cart'}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
    >
      <div className="w-full max-w-md bg-slate-950 border-s border-teal-500/30 h-full flex flex-col justify-between p-6 overflow-y-auto shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-bold text-white">
                {isRtl ? 'سبد خرید و ثبت سفارش یکتا' : 'Server-Verified Cart'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={isRtl ? 'بستن سبد خرید' : 'Close cart'}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/75 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-10 h-10 text-white/25 mx-auto mb-3" />
              <div className="text-sm font-semibold text-white/75">
                {isRtl ? 'سبد خرید شما خالی است' : 'Your cart is currently empty'}
              </div>
              <p className="text-xs text-white/45 mt-1">
                {isRtl
                  ? 'یکی از اشتراک‌های هوش مصنوعی، VPN یا گیفت‌کارت‌ها را اضافه کنید.'
                  : 'Add an AI subscription, VPN plan, or gift card from the catalog.'}
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-white truncate">
                      {isRtl ? product.titleFa : product.titleEn}
                    </div>
                    <div className="text-[11px] text-teal-300 tabular-nums mt-0.5">
                      ${product.priceUsd.toFixed(2)} × {quantity}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      aria-label={isRtl ? 'کاهش تعداد' : 'Decrease quantity'}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      aria-label={isRtl ? 'افزایش تعداد' : 'Increase quantity'}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      aria-label={isRtl ? 'حذف محصول' : 'Remove item'}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 cursor-pointer ms-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {items.length > 0 && (
          <form onSubmit={handleCheckout} className="pt-5 border-t border-white/10 space-y-4">
            {/* Discount Code */}
            <div>
              <label className="block text-[11px] text-white/60 mb-1">
                {isRtl
                  ? 'کد تخفیف (کد آزمایشی: MODASR10):'
                  : 'Discount Code (Try: MODASR10):'}
              </label>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="MODASR10"
                className="w-full bg-black/70 border border-white/15 focus:border-teal-400 rounded-xl px-3.5 py-2 text-xs text-white font-mono uppercase focus:outline-none"
              />
              {summary.discountApplied && (
                <div className="flex items-center gap-1 text-[11px] text-teal-400 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {isRtl
                      ? 'کد تخفیف روی سرور تایید و اعمال شد.'
                      : 'Discount verified and applied.'}
                  </span>
                </div>
              )}
            </div>

            {/* Customer Email for Tracking */}
            <div>
              <label className="block text-[11px] text-white/60 mb-1">
                {isRtl ? 'ایمیل شما (جهت پیگیری سفارش):' : 'Your Email (for Order Tracking):'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="you@example.com"
                className="w-full bg-black/70 border border-white/15 focus:border-teal-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
              {emailError && (
                <div className="text-[11px] text-rose-400 mt-1">{emailError}</div>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-white/65">
                <span>{isRtl ? 'جمع جزء (دلار):' : 'Subtotal (USD):'}</span>
                <span className="tabular-nums">${summary.subtotalUsd.toFixed(2)}</span>
              </div>
              {summary.discountUsd > 0 && (
                <div className="flex justify-between text-teal-400">
                  <span>{isRtl ? 'کسر تخفیف:' : 'Discount:'}</span>
                  <span className="tabular-nums">-${summary.discountUsd.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-white pt-1.5 border-t border-white/10 text-sm">
                <span>{isRtl ? 'مبلغ قابل پرداخت:' : 'Total Due:'}</span>
                <span className="text-teal-300 tabular-nums">
                  ≈ {formatToman(summary.totalToman, lang)} (${summary.totalUsd.toFixed(2)})
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isRtl
                  ? 'ثبت سفارش واقعی و دریافت کد پیگیری'
                  : 'Submit Server-Verified Order'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
