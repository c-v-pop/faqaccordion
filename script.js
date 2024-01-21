"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // Variables
  const faqsContainer = document.querySelector(".faqs-container");
  const faqsList = document.querySelector(".faqs-list");
  const faqsItems = document.querySelectorAll(".faqs-item");
  const faqsItemHeaders = document.querySelectorAll(".faqs-item-header");

  // Functions
  const toggleActiveIcon = (activeIcon, inactiveIcon) => {
    activeIcon.style.display = "block";
    inactiveIcon.style.display = "none";
  };

  const closeFaqsItems = () => {
    faqsItems.forEach((faqsItem) => {
      const headerHeight = faqsItem.querySelector(".faqs-item-header").scrollHeight;
      faqsItem.style.maxHeight = `${headerHeight}px`;
      faqsItem.dataset.openFaqsList = false;
      toggleActiveIcon(
        faqsItem.querySelector(".plus-icon"),
        faqsItem.querySelector(".minus-icon")
      );
    });
  };

  closeFaqsItems();

  // Faqs Item Click Event
  faqsList.addEventListener("click", (event) => {
    const faqsItemHeader = event.target.closest(".faqs-item-header");
    if (faqsItemHeader) {
      const targetFaqsItem = faqsItemHeader.closest(".faqs-item");
      if (targetFaqsItem.dataset.openFaqsList === "false") {
        closeFaqsItems();
        targetFaqsItem.style.maxHeight = `${targetFaqsItem.scrollHeight}px`;
        targetFaqsItem.dataset.openFaqsList = true;
        toggleActiveIcon(
          targetFaqsItem.querySelector(".minus-icon"),
          targetFaqsItem.querySelector(".plus-icon")
        );
      } else {
        closeFaqsItems();
      }
    }
  });

  // Faqs Item Keydown Event
  faqsList.addEventListener("keydown", (event) => {
    const faqsItemHeader = event.target.closest(".faqs-item-header");
    if (faqsItemHeader && event.keyCode === 13) {
      const faqsItem = faqsItemHeader.closest(".faqs-item");
      if (faqsItem.dataset.openFaqsList === "false") {
        closeFaqsItems();
        faqsItem.style.maxHeight = `${faqsItem.scrollHeight}px`;
        faqsItem.dataset.openFaqsList = true;
        toggleActiveIcon(
          faqsItem.querySelector(".minus-icon"),
          faqsItem.querySelector(".plus-icon")
        );
      } else {
        closeFaqsItems();
      }
    }
  });

  // Resize Observer
  let initialFaqsContainerWidth = faqsContainer.offsetWidth;

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width } = entry.contentRect;
      if (initialFaqsContainerWidth !== width) {
        faqsItems.forEach((faqsItem) => {
          const faqsItemHeader = faqsItem.querySelector(".faqs-item-header");
          faqsItem.style.maxHeight =
            faqsItem.dataset.openFaqsList === "false"
              ? `${faqsItemHeader.offsetHeight}px`
              : `${faqsItem.scrollHeight}px`;
        });
      }
    }
  });

  resizeObserver.observe(faqsContainer);

});
