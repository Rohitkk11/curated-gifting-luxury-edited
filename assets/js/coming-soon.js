(() => {
  const dialog = document.createElement("dialog");
  dialog.className = "coming-soon-dialog";
  dialog.setAttribute("aria-labelledby", "coming-soon-title");
  dialog.innerHTML = `
    <div class="coming-soon-content">
      <div class="coming-soon-icon" aria-hidden="true">🪔</div>
      <h2 id="coming-soon-title"></h2>
      <p class="coming-soon-message"></p>
      <p class="coming-soon-timer">This notice will close automatically in 20 seconds.</p>
      <button class="btn coming-soon-close" type="button">Close</button>
    </div>
  `;
  document.body.appendChild(dialog);

  let closeTimer;

  dialog.querySelector(".coming-soon-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => clearTimeout(closeTimer));

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-coming-soon]");
    if (!trigger) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const occasion = trigger.dataset.comingSoon;
    dialog.querySelector("#coming-soon-title").textContent = `${occasion} is coming soon`;
    dialog.querySelector(".coming-soon-message").textContent = `Our ${occasion} collection is being prepared. Please check back soon.`;

    clearTimeout(closeTimer);
    if (!dialog.open) dialog.showModal();
    closeTimer = setTimeout(() => dialog.close(), 20000);
  }, true);
})();
