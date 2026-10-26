import { ChevronRight, ShoppingBag, X } from 'lucide-react';
import {
  COLLECTION_ITEMS,
  DRAWER_HEADERS,
  JOURNAL_ITEMS,
  SHOP_ITEMS,
  calculateCartTotal,
  type CartEntry,
  type DrawerType,
  type ShopItem,
} from '../utils/lgpsmLogic';

interface SideDrawerProps {
  activeDrawer: DrawerType;
  onClose: () => void;
  cart: ReadonlyArray<CartEntry>;
  onAddToCart: (item: ShopItem) => void;
  onRemoveFromCart: (uid: string) => void;
  onCheckout: () => void;
}

export function SideDrawer({
  activeDrawer,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
}: SideDrawerProps) {
  if (!activeDrawer) return null;

  const headerInfo = DRAWER_HEADERS[activeDrawer];
  const totalAmount = calculateCartTotal(cart);

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={headerInfo.title}
    >
      {/* Dimmed backdrop */}
      <div
        data-testid="drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
      />

      {/* Right-side white drawer */}
      <aside className="relative z-10 w-full lgpsm-drawer bg-white border-l border-gray-200 h-full flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-200">
            <div>
              <h2 className="font-orbitron font-bold uppercase tracking-widest text-lg text-black">
                {headerInfo.title}
              </h2>
              {headerInfo.subtitle && (
                <p className="lgpsm-micro uppercase tracking-[0.2em] text-gray-500 mt-1">
                  {headerInfo.subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 text-black hover:opacity-50 transition-opacity cursor-pointer"
            >
              <X className="lgpsm-icon" strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Content Body */}
          <div className="mt-6">
            {activeDrawer === 'shop' && (
              <div className="divide-y divide-gray-200">
                {SHOP_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="lgpsm-micro uppercase tracking-[0.18em] text-gray-500 font-medium">
                        {item.tag}
                      </p>
                      <h3 className="lgpsm-body font-semibold tracking-wider uppercase text-black mt-1">
                        {item.title}
                      </h3>
                      <p className="lgpsm-body text-gray-600 font-medium tabular-nums mt-0.5">
                        {item.priceFormatted}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      aria-label={`Add ${item.title}`}
                      className="shrink-0 px-3.5 py-1.5 border border-gray-400 rounded text-black lgpsm-micro font-semibold uppercase tracking-[0.18em] hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer whitespace-nowrap"
                    >
                      ADD
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeDrawer === 'collections' && (
              <div className="divide-y divide-gray-200">
                {COLLECTION_ITEMS.map((col) => (
                  <div key={col.id} className="py-5 first:pt-0 last:pb-0">
                    <p className="lgpsm-micro uppercase tracking-[0.2em] text-gray-500 font-semibold">
                      {col.series}
                    </p>
                    <h3 className="font-orbitron font-bold uppercase tracking-wider lgpsm-body text-black mt-1">
                      {col.title}
                    </h3>
                    <p className="lgpsm-body text-gray-600 leading-relaxed mt-2">
                      {col.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeDrawer === 'journal' && (
              <div className="divide-y divide-gray-200">
                {JOURNAL_ITEMS.map((entry) => (
                  <article key={entry.id} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between lgpsm-micro uppercase tracking-[0.18em] text-gray-500 font-medium">
                      <span>{entry.date}</span>
                      <span>{entry.readTime}</span>
                    </div>
                    <h3 className="lgpsm-body font-semibold uppercase tracking-wider text-black mt-1.5 leading-snug">
                      {entry.title}
                    </h3>
                  </article>
                ))}
              </div>
            )}

            {activeDrawer === 'cart' && (
              <div>
                {cart.length === 0 ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <ShoppingBag
                      className="w-8 h-8 text-gray-400 mb-3"
                      strokeWidth={1.5}
                    />
                    <p className="lgpsm-body text-gray-500">
                      Your shopping bag is empty.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {cart.map((entry) => (
                      <div
                        key={entry.uid}
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <h3 className="lgpsm-body font-semibold uppercase tracking-wider text-black">
                            {entry.item.title}
                          </h3>
                          <p className="lgpsm-body text-gray-600 tabular-nums mt-0.5">
                            {entry.item.priceFormatted}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveFromCart(entry.uid)}
                          aria-label={`Remove ${entry.item.title}`}
                          className="lgpsm-micro uppercase tracking-[0.16em] text-gray-500 hover:text-black transition-colors cursor-pointer shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          {activeDrawer === 'cart' ? (
            cart.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between lgpsm-body font-semibold uppercase tracking-wider">
                  <span className="text-gray-600">Total</span>
                  <span className="text-black tabular-nums">${totalAmount}</span>
                </div>
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-3 px-4 bg-black text-white lgpsm-body font-semibold uppercase tracking-[0.18em] rounded flex items-center justify-center gap-2 hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <p className="lgpsm-micro text-gray-400 text-center uppercase tracking-[0.18em]">
                LGPSM © 2026 — FUTURE FORWARD FASHION
              </p>
            )
          ) : (
            <p className="lgpsm-micro text-gray-400 text-center uppercase tracking-[0.18em]">
              LGPSM © 2026 — FUTURE FORWARD FASHION
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
