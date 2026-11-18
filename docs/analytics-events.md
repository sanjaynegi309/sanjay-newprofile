# Conversion analytics events

Updated 5 October 2026.

Google Analytics loads only after the visitor chooses **Accept** in the existing consent banner. Declining leaves analytics unloaded. Events that occur before consent are not queued or replayed.

| Event | Trigger | Non-personal parameters |
| --- | --- | --- |
| `primary_cta_click` | Main homepage, navigation, About, Contact, or team-training CTA | Visible CTA label and destination path |
| `program_view` | A rendered `/programs/{slug}/` detail page after consent | `program_slug`, page path |
| `lesson_completion` | First correct completion of “Would you trust this AI answer?” during a page view | Fixed lesson identifier |
| `enquiry_start` | First input interaction with an enquiry form | Enquiry type and page path |
| `enquiry_completion` | Reserved for a future backend-confirmed saved enquiry | Not currently emitted |

`enquiry_completion` deliberately does not fire for the current email handoff. Opening or clicking a prefilled email does not prove the visitor sent it or that SkillUp received it.

Analytics strips query strings, hashes, and `mailto:` contents. It does not send names, email addresses, free-text messages, selected-interest text, or prefilled email bodies. External HTTP links are reduced to origin and pathname.

Existing operational events remain available for registration and legacy CTA reporting. They should be interpreted as clicks unless the destination provides its own confirmed conversion data.
