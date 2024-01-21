"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // Variables
  const faqsCard = document.querySelector(".faqs-card");
  const faqsList = document.querySelector(".faqs-list");
  const faqsItems = document.querySelectorAll(".faqs-item");
  const faqsItemHeaders = document.querySelectorAll(".faqs-item-header");

  // Functions
  const displayActiveIcon = (activeIcon, inactiveIcon) => {
    activeIcon.style.display = "block";
    inactiveIcon.style.display = "none";
  };

  const closefaqsItems = () => {
    faqsItems.forEach((faqsItem) => {
      const closeHeight = faqsItem.querySelector(".faqs-item-header").scrollHeight;
      faqsItem.style.maxHeight = `${closeHeight}px`;
      faqsItem.dataset.openfaqsList = false;
      displayActiveIcon(
        faqsItem.querySelector(".plus-icon"),
        faqsItem.querySelector(".minus-icon")
      );
    });
  };

  closefaqsItems();

  // faqs Item Click Event
  faqsList.addEventListener("click", (event) => {
    const faqsItemHeader = event.target.closest(".faqs-item-header");
    if (faqsItemHeader) {
      const targetfaqsItem = faqsItemHeader.closest(".faqs-item");
      if (targetfaqsItem.dataset.openfaqsList === "false") {
        closefaqsItems();
        targetfaqsItem.style.maxHeight = `${targetfaqsItem.scrollHeight}px`;
        targetfaqsItem.dataset.openfaqsList = true;
        displayActiveIcon(
          targetfaqsItem.querySelector(".minus-icon"),
          targetfaqsItem.querySelector(".plus-icon")
        );
      } else {
        closefaqsItems();
      }
    }
  });

  // faqs Item Keydown Event
  faqsList.addEventListener("keydown", (event) => {
    const faqsItemHeader = event.target.closest(".faqs-item-header");
    if (faqsItemHeader && event.keyCode === 13) {
      const faqsItem = faqsItemHeader.closest(".faqs-item");
      if (faqsItem.dataset.openfaqsList === "false") {
        closefaqsItems();
        faqsItem.style.maxHeight = `${faqsItem.scrollHeight}px`;
        faqsItem.dataset.openfaqsList = true;
        displayActiveIcon(
          faqsItem.querySelector(".minus-icon"),
          faqsItem.querySelector(".plus-icon")
        );
      } else {
        closefaqsItems();
      }
    }
  });

  // Resize Observer
  let initialfaqsCardWidth = faqsCard.offsetWidth;

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width } = entry.contentRect;
      if (initialfaqsCardWidth !== width) {
        faqsItems.forEach((faqsItem) => {
          const faqsItemHeader = faqsItem.querySelector(".faqs-item-header");
          faqsItem.style.maxHeight =
            faqsItem.dataset.openfaqsList === "false"
              ? `${faqsItemHeader.offsetHeight}px`
              : `${faqsItem.scrollHeight}px`;
        });
      }
    }
  });

  resizeObserver.observe(faqsCard);

});
