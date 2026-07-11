// FareLuxe AI prototype interactions

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("plannerModal");
  const closeModalButton = document.getElementById("closeModal");
  const continueButton = document.getElementById("continueButton");
  const plannerButtons = document.querySelectorAll(".open-planner");

  const travelSearch = document.getElementById("travelSearch");
  const departureInput = document.getElementById("departure");
  const destinationInput = document.getElementById("destination");
  const travelDateInput = document.getElementById("travelDate");

  const tabs = document.querySelectorAll(".tab");
  const packageButtons = document.querySelectorAll(".select-package");

  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const messages = document.getElementById("messages");

  // Prevent users from choosing a past date
  if (travelDateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    travelDateInput.min = `${year}-${month}-${day}`;
  }

  // Open planner modal
  function openModal() {
    if (!modal) return;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  // Close planner modal
  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  plannerButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  if (continueButton) {
    continueButton.addEventListener("click", closeModal);
  }

  // Close modal by tapping the dark background
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Search tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("active");
      });

      tab.classList.add("active");
    });
  });

  // Demonstration travel search
  if (travelSearch) {
    travelSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      const departure = departureInput.value.trim();
      const destination = destinationInput.value.trim();
      const travelDate = travelDateInput.value;

      if (!departure || !destination || !travelDate) {
        alert("Please complete your departure, destination and travel date.");
        return;
      }

      const packageSection = document.getElementById("packages");

      if (packageSection) {
        packageSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      setTimeout(() => {
        alert(
          `Prototype search created for ${departure} to ${destination}. ` +
          "The packages shown are demonstration results only."
        );
      }, 500);
    });
  }

  // Demonstration package selection
  packageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const packageCard = button.closest(".package-card");
      const packageName =
        packageCard?.querySelector("h3")?.textContent || "FareLuxe package";

      alert(
        `${packageName} selected. ` +
        "This prototype does not make a real booking or charge a payment."
      );
    });
  });

  // Add a message to the concierge chat
  function addMessage(text, messageType) {
    const message = document.createElement("div");

    message.className = `message ${messageType}`;
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  // Select a demonstration AI response
  function createDemoReply(userText) {
    const text = userText.toLowerCase();

    if (
      text.includes("budget") ||
      text.includes("$") ||
      text.includes("usd")
    ) {
      return (
        "Thank you. What departure city, travel dates, number of " +
        "travelers and preferred hotel category should I consider?"
      );
    }

    if (
      text.includes("anniversary") ||
      text.includes("honeymoon") ||
      text.includes("birthday")
    ) {
      return (
        "That sounds like a special journey. Would you prefer romantic " +
        "dining, spa experiences, private transfers or a room upgrade?"
      );
    }

    if (
      text.includes("wheelchair") ||
      text.includes("accessible") ||
      text.includes("accessibility")
    ) {
      return (
        "I’ll prioritize accessible flights, transportation and hotel " +
        "rooms. Please describe any specific mobility requirements."
      );
    }

    if (
      text.includes("child") ||
      text.includes("children") ||
      text.includes("family") ||
      text.includes("kids")
    ) {
      return (
        "I’ll look for family-friendly flight times, larger rooms and " +
        "age-appropriate activities. What are the children’s ages?"
      );
    }

    if (
      text.includes("vegetarian") ||
      text.includes("vegan") ||
      text.includes("allergy") ||
      text.includes("diet")
    ) {
      return (
        "I’ll include your dietary requirements when suggesting flights, " +
        "hotels and restaurants. Please tell me any allergies as well."
      );
    }

    if (
      text.includes("business") ||
      text.includes("first class") ||
      text.includes("premium")
    ) {
      return (
        "Excellent. I’ll prioritize premium cabins, lounge access and " +
        "luxury hotels. Are direct flights important to you?"
      );
    }

    return (
      "Thank you. In the live version, I’ll use those preferences to " +
      "search current flights, hotels and personalized experiences. " +
      "What dates and approximate total budget should I consider?"
    );
  }

  // Concierge chat form
  if (chatForm && chatInput && messages) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const userText = chatInput.value.trim();

      if (!userText) return;

      addMessage(userText, "user-message");
      chatInput.value = "";
      chatInput.disabled = true;

      setTimeout(() => {
        const reply = createDemoReply(userText);

        addMessage(reply, "ai-message");
        chatInput.disabled = false;
        chatInput.focus();
      }, 700);
    });
  }
});
