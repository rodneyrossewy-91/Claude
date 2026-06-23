const photoCache = new Map();

const fetchPhoto = async (query) => {
  if (photoCache.has(query)) return photoCache.get(query);
  const promise = fetch(`/api/photos?query=${encodeURIComponent(query)}&per_page=1`)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => data?.photos?.[0] || null)
    .catch(() => null);
  photoCache.set(query, promise);
  return promise;
};

window.fillPhotoPlaceholders = (root = document) => {
  root.querySelectorAll("[data-photo-query]").forEach(async (el) => {
    const query = el.getAttribute("data-photo-query");
    const alt = el.getAttribute("aria-label") || el.getAttribute("data-photo-alt") || "";
    const photo = await fetchPhoto(query);
    if (!photo) return;

    const img = document.createElement("img");
    img.src = photo.src.large;
    img.alt = alt;
    img.loading = "lazy";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";

    el.removeAttribute("role");
    el.removeAttribute("data-photo-query");
    el.innerHTML = "";
    el.style.background = "none";
    el.appendChild(img);
  });
};

document.addEventListener("DOMContentLoaded", () => window.fillPhotoPlaceholders());
