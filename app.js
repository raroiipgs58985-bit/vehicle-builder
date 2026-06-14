let currentPlatform = null;
let installedModules = {};

const platformSelect = document.getElementById("platformSelect");
const vehicleName = document.getElementById("vehicleName");
const vehicleDesc = document.getElementById("vehicleDesc");
const statsGrid = document.getElementById("statsGrid");
const slotsBox = document.getElementById("slots");
const moduleGrid = document.getElementById("moduleGrid");
const resultText = document.getElementById("resultText");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");

function init() {
  PLATFORMS.forEach(platform => {
    const option = document.createElement("option");
    option.value = platform.id;
    option.textContent = platform.name;
    platformSelect.appendChild(option);
  });

  currentPlatform = PLATFORMS[0];

  platformSelect.addEventListener("change", () => {
    currentPlatform = PLATFORMS.find(p => p.id === platformSelect.value);
    installedModules = {};
    render();
  });

  searchInput.addEventListener("input", renderModules);

  resetBtn.addEventListener("click", () => {
    installedModules = {};
    render();
  });

  render();
}

function render() {
  renderPlatform();
  renderSlots();
  renderModules();
  renderResult();
}

function renderPlatform() {
  vehicleName.textContent = currentPlatform.name;
  vehicleDesc.textContent = currentPlatform.description;

  statsGrid.innerHTML = "";

  const stats = [
    ["Шасси", currentPlatform.chassis],
    ["Кузов", currentPlatform.body],
    ["Кабина", currentPlatform.cabin],
    ["Двигатель", currentPlatform.engine],
    ["Броня", currentPlatform.armor],
    ["База", currentPlatform.cost.toLocaleString("ru-RU")]
  ];

  stats.forEach(([label, value]) => {
    const div = document.createElement("div");
    div.className = "stat";
    div.innerHTML = `<span>${label}</span>${value}`;
    statsGrid.appendChild(div);
  });
}

function renderSlots() {
  slotsBox.innerHTML = "";

  currentPlatform.slots.forEach(slot => {
    const div = document.createElement("div");
    div.className = "slot";

    const installed = installedModules[slot.id];

    div.innerHTML = `
      <div class="slot-title">${slot.name} / ${slot.type}</div>
      <div class="slot-content">${installed ? installed.name : "Пусто"}</div>
    `;

    if (installed) {
      const btn = document.createElement("button");
      btn.textContent = "Снять";
      btn.onclick = () => {
        delete installedModules[slot.id];
        render();
      };
      div.appendChild(btn);
    }

    slotsBox.appendChild(div);
  });
}

function renderModules() {
  moduleGrid.innerHTML = "";

  const search = searchInput.value.toLowerCase();

  MODULES
    .filter(module => {
      const text = `${module.name} ${module.tags.join(" ")}`.toLowerCase();
      return text.includes(search);
    })
    .forEach(module => {
      const div = document.createElement("div");
      div.className = "module";

      div.innerHTML = `
        <h3>${module.name}</h3>
        <small>${module.type} • ${module.cost.toLocaleString("ru-RU")}</small>
      `;

      div.onclick = () => chooseSlotForModule(module);

      moduleGrid.appendChild(div);
    });
}

function chooseSlotForModule(module) {
  const suitableSlots = currentPlatform.slots.filter(slot => {
    return slot.type === module.type || slot.type === "universal";
  });

  if (suitableSlots.length === 0) {
    alert("Нет подходящих слотов для этого модуля");
    return;
  }

  const slotNames = suitableSlots.map((slot, index) => {
    return `${index + 1}. ${slot.name}`;
  }).join("\n");

  const choice = prompt(`Куда установить модуль "${module.name}"?\n\n${slotNames}`);

  const index = Number(choice) - 1;

  if (index < 0 || index >= suitableSlots.length || Number.isNaN(index)) {
    return;
  }

  const slot = suitableSlots[index];
  installedModules[slot.id] = module;

  render();
}

function renderResult() {
  const modules = Object.entries(installedModules).map(([slotId, module]) => {
    const slot = currentPlatform.slots.find(s => s.id === slotId);
    return `${slot.name}: ${module.name}`;
  });

  const modulesCost = Object.values(installedModules)
    .reduce((sum, module) => sum + module.cost, 0);

  const totalCost = currentPlatform.cost + modulesCost;

  resultText.textContent =
`Название: ${currentPlatform.name}

Шасси: ${currentPlatform.chassis}
Кузов: ${currentPlatform.body}
Кабина: ${currentPlatform.cabin}
Двигатель: ${currentPlatform.engine}
Броня: ${currentPlatform.armor}

Базовые модули:
${currentPlatform.baseModules.join(", ")}

Установленные модули:
${modules.length ? modules.join("\n") : "Нет"}

Стоимость:
${totalCost.toLocaleString("ru-RU")}`;
}

init();
