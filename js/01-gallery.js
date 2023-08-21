import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
let lightbox;

createGalleryMarkup();

gallery.addEventListener("click", onSelectImage);

function createGalleryMarkup() {
  const galleryMarkup = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class = "gallery__item">
            <a class = "gallery__link" href = "${original}">
                <img
                    class = "gallery__image"
                    src = "${preview}"
                    data-source = "${original}"
                    alt = "${description}"
                >
            </a>
        </li>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", galleryMarkup);
}

function createBasicLightbox(imageRef) {
  return basicLightbox.create(
    `<img width = "800" height = "600" src = "${imageRef}">`,

    {
      onShow: () => {
        document.addEventListener("keydown", onEscKeyPress);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );
}

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    lightbox.close();
  }
}

function onSelectImage(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const selectedImageUrl = event.target.dataset.source;
  lightbox = createBasicLightbox(selectedImageUrl);
  lightbox.show();
}
