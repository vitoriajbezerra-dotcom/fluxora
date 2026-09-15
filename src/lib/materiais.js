export const materiaisIniciais = [
  {
    id: 1,
    codigo: "MP-001",
    material: "Chapa de aço",
    categoria: "Metais",
    unidade: "kg",
    quantidade: 150,
    minimo: 200,
  },
  {
    id: 2,
    codigo: "MP-002",
    material: "Alumínio",
    categoria: "Metais",
    unidade: "kg",
    quantidade: 320,
    minimo: 150,
  },
  {
    id: 3,
    codigo: "MP-003",
    material: "Cobre",
    categoria: "Metais",
    unidade: "kg",
    quantidade: 0,
    minimo: 80,
  },

  {
    id: 4,
    codigo: "MP-004",
    material: "Resina ABS",
    categoria: "Plásticos",
    unidade: "kg",
    quantidade: 180,
    minimo: 100,
  },
  {
    id: 5,
    codigo: "MP-005",
    material: "Polietileno",
    categoria: "Plásticos",
    unidade: "kg",
    quantidade: 45,
    minimo: 100,
  },
  {
    id: 6,
    codigo: "MP-006",
    material: "PVC industrial",
    categoria: "Plásticos",
    unidade: "kg",
    quantidade: 0,
    minimo: 70,
  },

  {
    id: 7,
    codigo: "MP-007",
    material: "Tecido de algodão",
    categoria: "Têxteis",
    unidade: "m",
    quantidade: 500,
    minimo: 250,
  },
  {
    id: 8,
    codigo: "MP-008",
    material: "Poliéster",
    categoria: "Têxteis",
    unidade: "m",
    quantidade: 120,
    minimo: 180,
  },
  {
    id: 9,
    codigo: "MP-009",
    material: "Nylon",
    categoria: "Têxteis",
    unidade: "m",
    quantidade: 230,
    minimo: 200,
  },

  {
    id: 10,
    codigo: "MP-010",
    material: "Papel kraft",
    categoria: "Embalagens",
    unidade: "un",
    quantidade: 900,
    minimo: 500,
  },
  {
    id: 11,
    codigo: "MP-011",
    material: "Caixa de papelão",
    categoria: "Embalagens",
    unidade: "un",
    quantidade: 160,
    minimo: 300,
  },
  {
    id: 12,
    codigo: "MP-012",
    material: "Filme stretch",
    categoria: "Embalagens",
    unidade: "rolo",
    quantidade: 0,
    minimo: 50,
  },
];

export function descobrirSituacao(material) {
  if (material.quantidade === 0) {
    return "Sem estoque";
  }

  if (material.quantidade < material.minimo) {
    return "Estoque baixo";
  }

  return "Normal";
}