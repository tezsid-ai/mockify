# Subscription Plan Details — AI Mockup Generator

## 1. Overview

AI Mockup Generator is offered as a subscription product, with recurring billing on monthly and/or annual plans rather than pay-per-use charging. All plans include access to the core mockup generation workflow. Higher tiers are intended to provide higher monthly generation allowances and priority-oriented features for larger teams.

## 2. Plan Comparison Table

| Feature                   | Starter                      | Pro                          | Business                       |
| ------------------------- | ---------------------------- | ---------------------------- | ------------------------------ |
| Monthly Price             | ₹499/month                   | ₹1,299/month                 | ₹2,999/month                   |
| Annual Price (per month)  | ₹399/month (billed annually) | ₹999/month (billed annually) | ₹2,399/month (billed annually) |
| Generations per Month     | 30 generations/month         | 100 generations/month        | 300 generations/month          |
| Max Images per Generation | 3                            | 3                            | 3                              |
| Custom Prompt Support     | No                           | Yes                          | Yes                            |
| Aspect Ratio Options      | 16:9 and 9:16                | 16:9 and 9:16                | 16:9 and 9:16                  |
| Priority Processing       | No                           | Yes                          | Yes                            |
| Download Access           | Yes                          | Yes                          | Yes                            |
| API Access                | No                           | No                           | Yes                            |
| Support Level             | [STARTER_SUPPORT]            | [PRO_SUPPORT]                | [BUSINESS_SUPPORT]             |
| Team Members              | 1                            | 3                            | 10                             |

Implementation-backed notes:

- Max images per generation are capped at 3 by backend logic (`generationCount` clamped to 1-3).
- Supported aspect ratios are validated server-side as 16:9 and 9:16.

## 3. Billing Cycles

- Monthly billing: charged every 30 days.
- Annual billing: charged once per year, with discount applied.
- Annual discount percentage: 20%
- Switching between plans takes effect at the next billing cycle.

## 4. Payment Methods

- Accepted methods: UPI, Credit/Debit Card, Net Banking (subject to payment processor integration)
- Payment processor used: [PAYMENT_PROCESSOR — Razorpay recommended for India-based platforms]
- GST applicability for Indian users: Yes — 18% GST is applicable for all Indian users as per Indian tax regulations
- Invoices provided: Yes — GST-compliant invoices are provided for all transactions as required under Indian tax law

Current implementation note: no payment gateway or billing execution logic is present in the active codebase path.

## 5. Free Trial

- Available: Yes
- Duration: 7 days
- Generations during trial: 5 generations
- Credit card required to start trial: No
- What happens after trial ends: Account is restricted to read-only mode; no new generations until a paid plan is selected

## 6. Upgrades & Downgrades

- Upgrading behavior: Upgrades take effect immediately; the billing cycle resets from the upgrade date.
- Downgrading takes effect at the end of the current billing cycle.
- Unused generations do not roll over to the next month.
- If downgrading causes generation limit to be exceeded: Generations are blocked until the next billing cycle when the new lower limit applies.

## 7. Cancellation Policy

- Users can cancel at any time.
- Access continues until the end of the current billing period.
- No partial refunds for unused time: No partial refunds for unused time. Access continues until end of current billing period.
- Data after cancellation: Generated outputs are not stored server-side. No user data is retained after account closure.

## 8. Enterprise / Custom Plans

- For teams requiring limits beyond the Business tier.
- Scope may include custom generation limits, dedicated support, and SLA guarantees.
- Contact: [ENTERPRISE_CONTACT_EMAIL]
- Custom DPA available for enterprise clients: Yes — available on request

Implementation context:

- No authentication layer is currently implemented in the active codebase.
- No database is present in the active generation path.
