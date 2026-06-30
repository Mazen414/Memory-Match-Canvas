// Unique String Hash Generator Engine
function generatePlayerId(name) {
  const cleanName = name.trim().substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, "P") || "PLY";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const timeCode = Date.now().toString().slice(-4);
  return `${cleanName}-${randomNumber}-${timeCode}`;
}