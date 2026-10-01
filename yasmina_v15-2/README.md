# Yasmina Collection — Premium Modest Fashion Store

This version is a redesigned storefront with a premium "liquid glass" / glassmorphism aesthetic for a Muslim women's fashion brand.

## Included
- Premium responsive storefront
- Modest-fashion categories: Dresses, Abayas, Sets, Outerwear, Scarves
- Search overlay
- Category filters
- Product cards with favorites and add-to-bag
- Slide-out shopping bag
- Persistent cart using localStorage
- Order summary with UZS pricing
- Delivery logic
- Secure-checkout UI
- Mobile navigation
- Editorial brand/story section
- Payment-provider-ready checkout architecture

## Important: live payments
The website does NOT collect raw card numbers or CVV. For a real store, payment should be completed on a payment provider's secure checkout or through your own server-side payment integration.

The current `script.js` has:

`PAYMENT_CONFIG.apiEndpoint`

and

`PAYMENT_CONFIG.checkoutUrl`

Set up a merchant account with your chosen provider, then connect its official checkout/API through a server endpoint. For Uzbekistan, Click offers merchant/billing integration and merchant access; its official documentation is at https://docs.click.uz/ .

You can also connect another provider such as Payme if it fits your business setup.

### Recommended production architecture
1. Customer selects products.
2. Your server creates an order/invoice with the payment provider.
3. Customer is redirected to the provider's secure payment page.
4. Provider sends a server-to-server payment status/callback.
5. Your server marks the order paid and stores the order record.
6. Your admin dashboard shows paid/pending/refunded orders.

Never put merchant secret keys in `script.js` or other browser-visible files.

## Currency
The redesigned demo uses Uzbek soum (UZS). Replace sample products, prices, images and delivery rules with your real catalog.

## Run
Open `index.html` in a browser, or serve the folder with any static web server.

## Production
For real orders, connect a backend/database and a merchant payment provider before accepting customer payments.


## Admin dashboard
Open `admin.html` to access the dashboard. It includes:
- Dashboard overview
- Orders with paid/unpaid payment status
- Customer information
- Order detail view
- Product management
- Stock quantities and low-stock warnings
- Revenue and average-order metrics
- Customer list
- Shop information: phone and address
- Demo local data persistence

Current shop contact information shown in the site:
- Phone: +998 91 190 87 40
- Address: Seoul Street 190, Tashkent

A public listing currently shows those details for Yasmina Collection. Verify them with the shop before launch.

### Important production note
This admin dashboard is a front-end prototype using localStorage. It is NOT a secure multi-user production admin system. For real business use, move orders/products/customers into a server database and protect the admin area with server-side authentication, role permissions, HTTPS, audit logs and secure payment webhooks.


## New storefront/admin sync

The storefront now reads the same `yasmina-admin-data-v2` store data used by the admin dashboard. Product name, price, stock, photo URL, badge, shop information, homepage headline/description, and the Ramadan section toggle can be changed from Admin. Changes are broadcast to an open storefront tab immediately in the same browser.

For a real production shop where customers on different phones/computers see changes, replace browser storage with a server database/API. The current package intentionally does not pretend that browser localStorage is a production database.

## Photography

The refreshed catalog uses free-to-use Pexels photography references for modest/hijab fashion. Before commercial launch, keep a record of each image's source/license and replace stock photography with your own product photography where possible.

See `PHOTO_SOURCES.md` for the photography source pages used by the current storefront.

## Motion update
The storefront now uses repeatable viewport reveals, staggered section choreography, subtle image hover depth, a scroll progress indicator, and reduced-motion support. Elements reset when they leave the viewport so their reveal can replay when the visitor scrolls back.


## Admin/server launch
For development, `npm start` runs the storefront and API. For a real deployment set environment variables before launch:
- `ADMIN_EMAIL` — server-side admin email
- `ADMIN_PASSWORD` — server-side admin password (use a strong secret)
- `CLICK_MERCHANT_ID`, `CLICK_SERVICE_ID`, `CLICK_SECRET_KEY` — Click server credentials
- `PAYME_CASHBOX_ID`, `PAYME_PASSWORD` — Payme server credentials
- `TELEGRAM_BOT_TOKEN` and/or SMTP variables for notifications
- `GA_MEASUREMENT_ID` / `META_PIXEL_ID` for analytics status

The current payment/notification screens collect public configuration and the server reports whether private environment credentials exist. Provider-specific payment/webhook implementation still requires the merchant credentials, production domain and current provider onboarding details; do not put secrets into browser/localStorage.

## Excel product import
In Admin → Categories, upload `.xlsx`, `.xls` or `.csv`. Supported columns include Name/Product Name, Category, Price, Stock/Quantity, Image URL, Badge, SKU/ID and Description. Any category present in the spreadsheet that does not already exist is created automatically.


## Telegram order notifications
1. Open Telegram and message @BotFather. Use /newbot and follow Telegram's prompts to create a bot and receive its token. Keep the token secret.
2. Start a chat with your new bot (send /start), or add it to the private/group/channel destination that should receive order alerts.
3. Open **Admin → Connections → Notifications**, paste the token into **Telegram bot token**, and click **Save bot token**. The server validates it with Telegram's `getMe` method and stores it outside the browser store data.
4. Enter the destination **Telegram bot chat ID**, or click **Find chat ID** after sending `/start` to the bot.
5. Enable order notifications and click **Save connection settings**.
6. Click **Send test message** to verify delivery.
7. Customers placing orders through the Node server will create an order and the server will send the order summary to the configured Telegram chat.
8. Do not put the token in HTML, JavaScript, localStorage, or `data/store.json`.

Telegram officially documents creating bots with @BotFather and keeping the token secure. The bot must have access to the destination chat and the appropriate permissions.
