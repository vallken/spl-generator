export function formatDateToIndonesian(dateString: string): {
  withDays: string;
  noDays: string;
} {
  if (!dateString) return { withDays: "", noDays: "" };

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const dates = new Date(dateString);

  const day = days[dates.getDay()];
  const date = dates.getDate();
  const month = months[dates.getMonth()];
  const year = dates.getFullYear();

  const withDays = `${day}, ${date} ${month} ${year}`;
  const noDays = `${date} ${month} ${year}`;

  return {
    withDays,
    noDays,
  };
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}
