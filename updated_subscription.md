# Subscription Pricing — Analysis & Decision Log

## 1. Original Pricing Model (Why It Broke)

### Structure

| Tier     | Price        | Generations/Month | Max Images/Request | Custom Prompt |
| -------- | ------------ | ----------------- | ------------------ | ------------- |
| Starter  | ₹499/month   | 30                | 3                  | ✅ Yes        |
| Pro      | ₹1,299/month | 100               | 3                  | ✅ Yes        |
| Business | ₹2,999/month | 300               | 3                  | ✅ Yes        |

### Why the Business Tier Breaks at Worst Case

Every generation request can produce up to 3 images.  
Gemini API cost: **~₹3.70 per image** (gemini-2.5-flash-image, $0.039/image at ₹92.66/USD).

| Tier     | Max Images    | API Cost | Revenue | Profit    | Margin           |
| -------- | ------------- | -------- | ------- | --------- | ---------------- |
| Starter  | 30 × 3 = 90   | ₹333     | ₹499    | ₹166      | 33% ✅           |
| Pro      | 100 × 3 = 300 | ₹1,110   | ₹1,299  | ₹189      | 14.5% ⚠️         |
| Business | 300 × 3 = 900 | ₹3,330   | ₹2,999  | **-₹331** | **-11% 🔴 LOSS** |

### Root Cause

The Business tier allowed 300 generations × 3 images = 900 images/month.  
At ₹3.70/image, API cost alone hit ₹3,330 — exceeding the ₹2,999 subscription price.  
A single power user on Business could actively cost the platform money every month.

### Additional Risk Factors Not Accounted For

- Google API price increases → margins compress further
- Vercel hosting scales with traffic → additional cost per heavy user
- Payment processing fee (~2% via Razorpay) → not yet deducted
- GST registration requirement for Indian SaaS → operational overhead

---

## 2. Revised Pricing Model (How It Becomes Profitable)

### Key Changes Made

1. **Starter** — removed custom prompt and capped images at 1 per request
2. **Pro** — kept 3 images/request (1 initial + 2 via generate button), kept custom prompt, raised price to ₹1,500
3. **Business** — reduced generation limit from 300 → 200/month, raised price to ₹3,500

### Updated Structure

| Tier     | Price        | Generations/Month | Max Images/Request | Custom Prompt |
| -------- | ------------ | ----------------- | ------------------ | ------------- |
| Starter  | ₹499/month   | 30                | 1                  | ❌ No         |
| Pro      | ₹1,500/month | 100               | 3                  | ✅ Yes        |
| Business | ₹3,500/month | 200               | 3                  | ✅ Yes        |

### Worst Case Analysis (Every User Maxes Out)

| Tier     | Max Images    | API Cost | Revenue | Profit | Margin |
| -------- | ------------- | -------- | ------- | ------ | ------ |
| Starter  | 30 × 1 = 30   | ₹111     | ₹499    | ₹388   | 77% ✅ |
| Pro      | 100 × 3 = 300 | ₹1,110   | ₹1,500  | ₹390   | 26% ✅ |
| Business | 200 × 3 = 600 | ₹2,220   | ₹3,500  | ₹1,280 | 36% ✅ |

All three tiers remain profitable even when every user exhausts their full monthly limit.

### Realistic Case (60% usage, avg 1.5 images/request)

| Tier     | Realistic Images | API Cost | Revenue | Profit | Margin |
| -------- | ---------------- | -------- | ------- | ------ | ------ |
| Starter  | ~18 images       | ₹67      | ₹499    | ₹432   | 87% ✅ |
| Pro      | ~180 images      | ₹666     | ₹1,500  | ₹834   | 56% ✅ |
| Business | ~360 images      | ₹1,332   | ₹3,500  | ₹2,168 | 62% ✅ |

---

## 3. GST & Payment Processing — Should You Factor These In?

### GST (18%)

| Consideration               | Detail                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Who pays GST?               | The **user** pays 18% GST on top of your subscription price                                                  |
| Does it affect your profit? | **No** — GST is collected from users and deposited directly to the government. It is pass-through.           |
| Catch                       | You **must be GST registered** to collect and remit GST legally in India                                     |
| Input Tax Credit (ITC)      | Once registered, you can claim ITC on your own business expenses (e.g. Vercel, API costs if billed in India) |

> GST does not reduce your margin — but skipping registration is a legal risk.

---

### Payment Processing Fee (Razorpay ~2%)

This **does** reduce your actual profit and must be factored in.

| Tier     | Revenue | Razorpay Fee (~2%) | Net Revenue After Fee | Profit (Worst Case) | Profit (Realistic) |
| -------- | ------- | ------------------ | --------------------- | ------------------- | ------------------ |
| Starter  | ₹499    | ~₹10               | ₹489                  | ₹378                | ₹422               |
| Pro      | ₹1,500  | ~₹30               | ₹1,470                | ₹360                | ₹804               |
| Business | ₹3,500  | ~₹70               | ₹3,430                | ₹1,210              | ₹2,098             |

> Margins remain healthy even after processing fees. No structural changes needed.

---

## 4. Final Verified Tier Structure (Ready for PRICING.md and SUBSCRIPTION.md)

| Feature                  | Starter | Pro            | Business  |
| ------------------------ | ------- | -------------- | --------- |
| Monthly Price            | ₹499    | ₹1,500         | ₹3,500    |
| Annual Price (per month) | ₹399    | ₹1,199         | ₹2,799    |
| Generations/Month        | 30      | 100            | 200       |
| Max Images/Request       | 1       | 3              | 3         |
| Custom Prompt            | ❌      | ✅             | ✅        |
| Priority Processing      | ❌      | ✅             | ✅        |
| API Access               | ❌      | ❌             | ✅        |
| Team Members             | 1       | 3              | 10        |
| Custom DPA               | ❌      | ❌             | ✅        |
| Support                  | Email   | Priority Email | Dedicated |
| Worst-Case Margin        | 77%     | 26%            | 36%       |
| Realistic Margin         | 87%     | 56%            | 62%       |

> Note: All prices are exclusive of 18% GST applicable for Indian users.  
> Payment processing fee (~2%) is absorbed into platform margin and not charged separately to users.  
> API cost reference: ₹3.70/image (gemini-2.5-flash-image at ₹92.66/USD, April 2026).
