# Forms backend: Google Sheets via Apps Script

## Current public behavior (11 November 2026)

On-site submission is restored, with the specific gap from the October incident (below) fixed. `EnquiryForm.astro` now:

1. Validates the required fields.
2. Checks a hidden honeypot field; if a bot filled it, shows a fake success message and does nothing further (no network call, no mailto).
3. If `PUBLIC_FORMS_ENDPOINT` is unset, skips straight to the honest `mailto:` handoff (unchanged from October) — this keeps local/dev working with no endpoint configured.
4. Otherwise, POSTs the form data with `fetch()` directly to the Apps Script endpoint (no hidden iframe) and reads the JSON response.
5. Shows a real success message and fires the completion analytics event **only** if the response is `ok` and the body is `{ "result": "success" }`.
6. On any failure — network error, non-OK status, unexpected response — falls back to the exact same honest `mailto:` handoff, with a message explaining the automatic attempt didn't go through.

The reason this is a real fix and not a repeat of the October mistake: the October implementation used a **hidden iframe**, which cannot read its own cross-origin response at all — it can only guess "probably worked" from whether the iframe loaded. `fetch()` can actually read the response (or catch a thrown network/CORS error), so success is only ever shown when genuinely confirmed, and a CORS failure now visibly falls back instead of silently lying.

**Still needs verification from you before this is fully trustworthy in production:**

1. Confirm the Apps Script deployment is still set to **Execute as: Me** / **Who has access: Anyone** (not stale — see the Troubleshooting section below; this was the suspected cause of the original 403s).
2. Submit a real test enquiry on the live site and confirm both (a) the on-site success message appears (not the mailto fallback) and (b) a new row actually lands in the Sheet. If you see the mailto fallback instead, the deployment likely still has a CORS/access issue — re-check step 1 before assuming the code is wrong.
3. Delete any test rows from the Sheet afterward.

The backend itself is unchanged: a single endpoint configured in `config/forms.ts` (`PUBLIC_FORMS_ENDPOINT`), a **Google Apps Script Web App** bound to a Google Sheet, where each confirmed submission becomes a new row. The setup below is retained for reference/redeployment.

## 1. Create the sheet

1. Create a new Google Sheet (or reuse an existing one dedicated to this).
2. Rename the first tab `Submissions`.
3. Add a header row:

   ```
   Timestamp | FormType | Name | Email | Interest | Message | PageUrl
   ```

## 2. Add the Apps Script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete any starter code and paste:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");
     var p = e.parameter;

     sheet.appendRow([
       new Date(),
       p.formType || "",
       p.name || "",
       p.email || "",
       p.interest || "",
       p.message || "",
       p.pageUrl || ""
     ]);

     return ContentService
       .createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Save the project (name it something like "SkillUp Enquiry Forms").

## 3. Deploy as a Web App

1. **Deploy → New deployment**.
2. Type: **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone** (required — the form posts from a visitor's browser with no Google login; "Anyone with a Google account" will silently reject public submissions).
5. Click **Deploy**, authorize the requested permissions (it needs to edit the sheet), and copy the resulting URL — it ends in `/exec`.

## 4. Wire it into the site

Give me that `/exec` URL and I'll either:
- Set it as the `PUBLIC_FORMS_ENDPOINT` repository variable in GitHub (**Settings → Secrets and variables → Actions → Variables**) for the production build, and/or
- Add it to a local `.env` file (`PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec`) for local dev/testing.

The endpoint URL isn't a secret (it's visible in the page source as the form's `action` attribute anyway), so it's fine as a plain repo **variable**, not a **secret**.

## Troubleshooting: 403 on submission (verified issue, 2026-09)

Browser testing returned **403 Forbidden** on the `script.googleusercontent.com/macros/echo?...` response redirect. The founder subsequently confirmed that test rows did reach the Sheet, so the write may succeed even while the browser receives an error. The hidden-iframe implementation couldn't distinguish that case from a failed write and displayed “Thanks” in both cases — that missing per-submission confirmation is why the form fell back to the email handoff in October, and why the November fix (above) switched to `fetch()`, which can actually tell the two cases apart.

This almost always means the deployment's access setting isn't actually "Anyone," or the deployment is stale. To fix:

1. Open the script (**Extensions → Apps Script** from the Sheet).
2. **Deploy → Manage deployments**.
3. Click the pencil/edit icon on the active deployment.
4. Confirm **Execute as: Me** and **Who has access: Anyone** (not "Anyone with a Google account," not "Only myself") — if it's wrong, fix it and select **Version: New version** before saving, since editing settings on an old version doesn't take effect otherwise.
5. Re-test by opening `/contact/` locally (or the live site) and submitting the form, then check the Sheet for the new row.

If it's already set to "Anyone" and still 403s, the deployment may need to be recreated from scratch (**Deploy → New deployment**) rather than edited — this generates a new `/exec` URL, which you'd need to send over again to update `PUBLIC_FORMS_ENDPOINT`.

## Notes

- **Redeploy after editing the script.** Apps Script Web Apps are versioned — editing `doPost` and clicking Save does *not* update the live `/exec` URL. Use **Deploy → Manage deployments → Edit → New version** to push script changes live.
- **Spam:** `EnquiryForm.astro` has a hidden honeypot field (`company`) again — a bot that fills it gets a fake success message and triggers no network call or mailto. Real visitors never see or fill it, so it can't discard a legitimate enquiry. If spam still gets through, the next layer would be a check inside `doPost` itself (e.g. reject rows where `company` is non-empty), not a client-only fix.
- **Delivery confirmation is now real, not assumed.** `fetch()` only shows success after reading `{ "result": "success" }` back from Apps Script; any other response (including a CORS-blocked fetch) falls back to the honest mailto handoff instead of guessing. Do not revert to a hidden-iframe transport — that's the specific thing that broke in October.
- **One sheet, one script, all form types.** Every enquiry type (program, workshop, corporate, and the self-paced waitlist) writes to the same `Submissions` tab with a different `FormType` value — filter/sort in the Sheet rather than maintaining several scripts.
