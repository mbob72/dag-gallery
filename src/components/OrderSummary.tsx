export function OrderSummary() {
  return (
    <aside className="lg:sticky lg:top-6">
      <div className="border border-black/10 bg-[#f7f7f4] p-5">
        <strong className="block text-2xl font-light text-ink">Ваш заказ</strong>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-ink">1 товар, на сумму</span>
            <span className="text-lg font-medium">3 315 ₽</span>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm text-black/55">
            <span>Доставка</span>
            <span>0 ₽</span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
            <span className="font-bold text-ink">Итого</span>
            <span className="text-2xl font-medium text-ink">3 315 ₽</span>
          </div>

          <button type="button" className="w-full bg-accent px-5 py-3.5 text-sm font-bold text-white transition hover:bg-ink">
            Оформить заказ
          </button>
          <button type="button" className="w-full border border-accent bg-white px-5 py-3.5 text-sm font-bold text-accent transition hover:bg-accent hover:text-white">
            Заказать в 1 клик
          </button>

          <label className="flex gap-3 text-sm leading-5 text-black/60">
            <input type="checkbox" defaultChecked className="mt-1 size-4 accent-[#e66a2c]" />
            <span>
              Согласен с <a href="#" className="text-ink underline decoration-black/20 underline-offset-4 hover:text-accent">условиями работы</a>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-5 border border-black/10 bg-white p-5">
        <div className="text-sm font-medium leading-5 text-ink">Отправить ссылку на товары в корзине по электронной почте</div>
        <div className="mt-4 flex overflow-hidden border border-black/15">
          <input type="email" name="share_email" placeholder="user@mail.com" className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" />
          <button type="button" className="bg-ink px-4 text-xs font-bold uppercase text-white transition hover:bg-accent">
            отправить
          </button>
        </div>
      </div>
    </aside>
  );
}
