const PLATFORMS = [
  {
    id: "trudyaga",
    name: "Трудяга",
    description: "Созданный для колонистов универсальный модульный транспорт.",
    chassis: "Колёсное вездеходное",
    body: "Закрытый кузов",
    cabin: "Закрытая кабина",
    engine: "ЭПБ-3",
    armor: "Керамит",
    cost: 900000,
    slots: [
      { id: "turret", name: "Башня", type: "weapon" },
      { id: "hull1", name: "Корпусной узел 1", type: "universal" },
      { id: "hull2", name: "Корпусной узел 2", type: "universal" },
      { id: "module1", name: "Модульный отсек 1", type: "module" },
      { id: "module2", name: "Модульный отсек 2", type: "module" }
    ],
    baseModules: ["Сенсоры", "СЖО", "Транспортный отсек"]
  }
];

const MODULES = [
  {
    id: "mg_turret",
    name: "Пулемётная турель",
    type: "weapon",
    cost: 25000,
    tags: ["турель", "пулемёт"]
  },
  {
    id: "cargo",
    name: "Грузовой отсек",
    type: "module",
    cost: 40000,
    tags: ["логистика"]
  },
  {
    id: "sensors_plus",
    name: "Усиленные сенсоры",
    type: "universal",
    cost: 35000,
    tags: ["сенсоры"]
  },
  {
    id: "medbay",
    name: "Медицинский отсек",
    type: "module",
    cost: 60000,
    tags: ["медицина"]
  }
];
