export function getDeadline(hour = 18, minutes = 30) {
  const now = new Date();
  const deadlineToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minutes,
  );
  const deadlineTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    hour,
    minutes,
  );

  if (now < deadlineToday) {
    return deadlineToday;
  } else {
    return deadlineTomorrow;
  }
}
