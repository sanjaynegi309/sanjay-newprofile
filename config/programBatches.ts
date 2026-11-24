// To update availability or destinations, change only each batch's `status` and `checkoutUrl` below.
export type BatchStatus = "open" | "few_left" | "full";

export const programBatches = {
  cohort: {
    preworkOpens: "Sat 12 Dec 2026"
  },
  batches: [
    {
      id: "batch-1",
      label: "Batch 1",
      name: "Weekday Early Morning",
      days: "Monday, Wednesday, Friday",
      time: "6:00 AM – 7:00 AM IST",
      starts: "Mon 4 Jan 2027",
      startsIso: "2027-01-04",
      status: "open" as BatchStatus,
      checkoutUrl: "https://learn.sanjaynegi.in/l/56c8a3681b"
    },
    {
      id: "batch-2",
      label: "Batch 2",
      name: "Weekday Morning",
      days: "Tuesday, Thursday",
      time: "8:00 AM – 9:30 AM IST",
      starts: "Tue 5 Jan 2027",
      startsIso: "2027-01-05",
      status: "open" as BatchStatus,
      checkoutUrl: "https://learn.sanjaynegi.in/l/ac2c09880f"
    },
    {
      id: "batch-3",
      label: "Batch 3",
      name: "Weekend Morning",
      days: "Saturday, Sunday",
      time: "8:00 AM – 9:30 AM IST",
      starts: "Sat 2 Jan 2027",
      startsIso: "2027-01-02",
      status: "open" as BatchStatus,
      checkoutUrl: "https://learn.sanjaynegi.in/web/checkout/6afd228779901d1204871d43"
    }
  ],
  waitlistUrl: "https://learn.sanjaynegi.in/l/adff39aacd"
} as const;
