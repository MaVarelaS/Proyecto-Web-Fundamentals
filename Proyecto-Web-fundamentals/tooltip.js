document.addEventListener("DOMContentLoaded", function () {
  const tooltipDemo = document.querySelector(".tooltip-demo");
  let tooltipElement;
  let tooltipTimeout;

  tooltipDemo.addEventListener("mouseover", function (event) {
    const tooltipContent = event.target.dataset.tooltip;

    if (!tooltipContent) return;

    tooltipTimeout = setTimeout(function () {
      if (!tooltipElement) {
        tooltipElement = document.createElement("div");
        tooltipElement.className = "tooltip";
        document.body.append(tooltipElement);
      }

      tooltipElement.innerHTML = tooltipContent;
      tooltipElement.classList.add("show");

      const coords = event.target.getBoundingClientRect();
      tooltipElement.style.left = `${
        coords.left +
        window.scrollX +
        coords.width / 2 -
        tooltipElement.offsetWidth / 2
      }px`;
      tooltipElement.style.top = `${
        coords.top + window.scrollY - tooltipElement.offsetHeight - 5
      }px`;
    }, 300); // Retraso de 300ms antes de mostrar el tooltip
  });

  tooltipDemo.addEventListener("mouseout", function () {
    clearTimeout(tooltipTimeout);
    if (tooltipElement) {
      tooltipElement.classList.remove("show");
    }
  });
});
