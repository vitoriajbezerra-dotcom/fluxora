"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Boxes,
  Factory,
  Package,
  PackageCheck,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

import {
  materiaisIniciais,
  descobrirSituacao,
} from "@/lib/materiais";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const categorias = [
  "Metais",
  "Plásticos",
  "Têxteis",
  "Embalagens",
];

const chartConfigCategorias = {
  quantidade: {
    label: "Materiais",
    color: "#22d3ee",
  },
};

const chartConfigSituacoes = {
  normal: {
    label: "Normal",
    color: "#10b981",
  },

  baixo: {
    label: "Estoque baixo",
    color: "#f59e0b",
  },

  semEstoque: {
    label: "Sem estoque",
    color: "#ef4444",
  },
};


export default function Demo() {

  const [materiais, setMateriais] = useState(materiaisIniciais);

  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [situacao, setSituacao] = useState("Todas");

  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [movimentoAberto, setMovimentoAberto] = useState(false);

  const [materialMovimento, setMaterialMovimento] = useState(null);
  const [tipoMovimento, setTipoMovimento] = useState("entrada");
  const [quantidadeMovimento, setQuantidadeMovimento] = useState("");

  const [erroMovimento, setErroMovimento] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");


  const [novoMaterial, setNovoMaterial] = useState({
    codigo: "",
    material: "",
    categoria: "",
    unidade: "",
    quantidade: "",
    minimo: "",
  });


  // ========================================
  // INDICADORES
  // ========================================

  const indicadores = useMemo(() => {

    let normal = 0;
    let baixo = 0;
    let semEstoque = 0;

    materiais.forEach((material) => {

      const status = descobrirSituacao(material);

      if (status === "Normal") {
        normal++;
      }

      if (status === "Estoque baixo") {
        baixo++;
      }

      if (status === "Sem estoque") {
        semEstoque++;
      }

    });

    return {
      total: materiais.length,
      normal,
      baixo,
      semEstoque,
    };

  }, [materiais]);


  // ========================================
  // FILTROS
  // ========================================

  const materiaisFiltrados = useMemo(() => {

    const textoBusca = busca.toLowerCase().trim();

    return materiais.filter((material) => {

      const correspondeBusca =
        material.material.toLowerCase().includes(textoBusca) ||
        material.codigo.toLowerCase().includes(textoBusca);

      const correspondeCategoria =
        categoria === "Todas" ||
        material.categoria === categoria;

      const statusMaterial = descobrirSituacao(material);

      const correspondeSituacao =
        situacao === "Todas" ||
        statusMaterial === situacao;

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeSituacao
      );

    });

  }, [materiais, busca, categoria, situacao]);


  // ========================================
  // GRÁFICO DE CATEGORIAS
  // ========================================

  const dadosCategorias = useMemo(() => {

    return categorias.map((nomeCategoria) => {

      const quantidade = materiais.filter(
        (material) => material.categoria === nomeCategoria
      ).length;

      return {
        categoria: nomeCategoria,
        quantidade,
      };

    });

  }, [materiais]);


  // ========================================
  // GRÁFICO DE SITUAÇÕES
  // ========================================

  const dadosSituacoes = useMemo(() => {

    return [
      {
        nome: "Normal",
        quantidade: indicadores.normal,
        cor: "#10b981",
      },

      {
        nome: "Estoque baixo",
        quantidade: indicadores.baixo,
        cor: "#f59e0b",
      },

      {
        nome: "Sem estoque",
        quantidade: indicadores.semEstoque,
        cor: "#ef4444",
      },
    ];

  }, [indicadores]);


  // ========================================
  // LIMPAR FILTROS
  // ========================================

  function limparFiltros() {

    setBusca("");
    setCategoria("Todas");
    setSituacao("Todas");

  }


  // ========================================
  // CADASTRAR MATERIAL
  // ========================================

  function cadastrarMaterial(event) {

    event.preventDefault();

    setErroCadastro("");


    if (
      !novoMaterial.codigo.trim() ||
      !novoMaterial.material.trim() ||
      !novoMaterial.categoria ||
      !novoMaterial.unidade.trim() ||
      novoMaterial.quantidade === "" ||
      novoMaterial.minimo === ""
    ) {

      setErroCadastro("Preencha todos os campos.");

      return;

    }


    const quantidade = Number(novoMaterial.quantidade);
    const minimo = Number(novoMaterial.minimo);


    if (quantidade < 0 || minimo < 0) {

      setErroCadastro(
        "Quantidade e estoque mínimo não podem ser negativos."
      );

      return;

    }


    const codigoJaExiste = materiais.some(
      (material) =>
        material.codigo.toLowerCase() ===
        novoMaterial.codigo.trim().toLowerCase()
    );


    if (codigoJaExiste) {

      setErroCadastro("Já existe um material com esse código.");

      return;

    }


    const materialCriado = {

      id: Date.now(),

      codigo: novoMaterial.codigo
        .trim()
        .toUpperCase(),

      material: novoMaterial.material.trim(),

      categoria: novoMaterial.categoria,

      unidade: novoMaterial.unidade.trim(),

      quantidade,

      minimo,

    };


    setMateriais((materiaisAtuais) => [
      ...materiaisAtuais,
      materialCriado,
    ]);


    setNovoMaterial({
      codigo: "",
      material: "",
      categoria: "",
      unidade: "",
      quantidade: "",
      minimo: "",
    });


    setCadastroAberto(false);

  }


  // ========================================
  // ABRIR MOVIMENTAÇÃO
  // ========================================

  function abrirMovimentacao(material) {

    setMaterialMovimento(material);

    setTipoMovimento("entrada");

    setQuantidadeMovimento("");

    setErroMovimento("");

    setMovimentoAberto(true);

  }


  // ========================================
  // REGISTRAR MOVIMENTAÇÃO
  // ========================================

  function registrarMovimentacao(event) {

    event.preventDefault();

    setErroMovimento("");


    const quantidade = Number(quantidadeMovimento);


    if (!quantidade || quantidade <= 0) {

      setErroMovimento(
        "A quantidade da movimentação deve ser maior que zero."
      );

      return;

    }


    if (
      tipoMovimento === "saida" &&
      quantidade > materialMovimento.quantidade
    ) {

      setErroMovimento(
        "A saída não pode ser maior que o saldo disponível."
      );

      return;

    }


    setMateriais((materiaisAtuais) => {

      return materiaisAtuais.map((material) => {

        if (material.id !== materialMovimento.id) {
          return material;
        }


        const novaQuantidade =
          tipoMovimento === "entrada"
            ? material.quantidade + quantidade
            : material.quantidade - quantidade;


        return {
          ...material,
          quantidade: novaQuantidade,
        };

      });

    });


    setMovimentoAberto(false);

    setMaterialMovimento(null);

    setQuantidadeMovimento("");

  }


  // ========================================
  // BADGE STATUS
  // ========================================

  function mostrarStatus(material) {

    const status = descobrirSituacao(material);


    if (status === "Normal") {

      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          Normal
        </Badge>
      );

    }


    if (status === "Estoque baixo") {

      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          Estoque baixo
        </Badge>
      );

    }


    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Sem estoque
      </Badge>
    );

  }


  return (

    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}

      <header className="border-b bg-slate-950 text-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <Factory size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Flux<span className="text-cyan-400">ora</span>
              </h1>

              <p className="text-xs text-slate-400">
                Controle de matéria-prima
              </p>
            </div>

          </div>


          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs text-amber-300">
              Ambiente demonstrativo · dados fictícios
            </span>

            <Button
              asChild
              variant="outline"
              className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white"
            >
              <Link href="/">
                <ArrowLeft />
                Voltar ao site
              </Link>
            </Button>

          </div>

        </div>

      </header>


      <div className="mx-auto max-w-7xl px-6 py-10">


        {/* TÍTULO */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="mb-2 font-semibold text-cyan-700">
              Visão geral
            </p>

            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
              Controle de estoque
            </h2>

            <p className="mt-2 text-slate-600">
              Acompanhe matérias-primas, níveis de estoque e movimentações.
            </p>

          </div>


          {/* CADASTRAR */}

          <Dialog
            open={cadastroAberto}
            onOpenChange={setCadastroAberto}
          >

            <DialogTrigger asChild>

              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus />
                Cadastrar material
              </Button>

            </DialogTrigger>


            <DialogContent className="sm:max-w-xl">

              <DialogHeader>

                <DialogTitle>
                  Cadastrar matéria-prima
                </DialogTitle>

                <DialogDescription>
                  Preencha as informações do novo material.
                </DialogDescription>

              </DialogHeader>


              <form
                onSubmit={cadastrarMaterial}
                className="space-y-4"
              >

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <Label htmlFor="codigo">
                      Código
                    </Label>

                    <Input
                      id="codigo"
                      className="mt-2"
                      placeholder="MP-013"
                      value={novoMaterial.codigo}
                      onChange={(event) =>
                        setNovoMaterial({
                          ...novoMaterial,
                          codigo: event.target.value,
                        })
                      }
                    />
                  </div>


                  <div>
                    <Label htmlFor="nomeMaterial">
                      Material
                    </Label>

                    <Input
                      id="nomeMaterial"
                      className="mt-2"
                      placeholder="Ex: Borracha industrial"
                      value={novoMaterial.material}
                      onChange={(event) =>
                        setNovoMaterial({
                          ...novoMaterial,
                          material: event.target.value,
                        })
                      }
                    />
                  </div>


                  <div>

                    <Label htmlFor="categoria">
                      Categoria
                    </Label>

                    <select
                      id="categoria"
                      className="mt-2 h-10 w-full rounded-md border bg-white px-3 text-sm"
                      value={novoMaterial.categoria}
                      onChange={(event) =>
                        setNovoMaterial({
                          ...novoMaterial,
                          categoria: event.target.value,
                        })
                      }
                    >

                      <option value="">
                        Selecione
                      </option>

                      {categorias.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}

                    </select>

                  </div>


                  <div>

                    <Label htmlFor="unidade">
                      Unidade
                    </Label>

                    <Input
                      id="unidade"
                      className="mt-2"
                      placeholder="kg, un, m..."
                      value={novoMaterial.unidade}
                      onChange={(event) =>
                        setNovoMaterial({
                          ...novoMaterial,
                          unidade: event.target.value,
                        })
                      }
                    />

                  </div>


                  <div>

                    <Label htmlFor="quantidade">
                      Quantidade disponível
                    </Label>

                    <Input
                      id="quantidade"
                      type="number"
                      min="0"
                      className="mt-2"
                      value={novoMaterial.quantidade}
                      onChange={(event) =>
                        setNovoMaterial({
                          ...novoMaterial,
                          quantidade: event.target.value,
                        })
                      }
                    />

                  </div>


                  <div>

                    <Label htmlFor="minimo">
                      Estoque mínimo
                    </Label>

                    <Input
                      id="minimo"
                      type="number"
                      min="0"
                      className="mt-2"
                      value={novoMaterial.minimo}
                      onChange={(event) =>
                        setNovoMaterial({
                          ...novoMaterial,
                          minimo: event.target.value,
                        })
                      }
                    />

                  </div>

                </div>


                {erroCadastro && (

                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {erroCadastro}
                  </p>

                )}


                <DialogFooter>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setCadastroAberto(false)
                    }
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    Cadastrar
                  </Button>

                </DialogFooter>

              </form>

            </DialogContent>

          </Dialog>

        </div>


        {/* INDICADORES */}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <Card>

            <CardContent className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-slate-500">
                  Total de materiais
                </p>

                <strong className="mt-2 block text-3xl text-slate-950">
                  {indicadores.total}
                </strong>

              </div>

              <div className="rounded-xl bg-cyan-100 p-3 text-cyan-700">
                <Boxes />
              </div>

            </CardContent>

          </Card>


          <Card>

            <CardContent className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-slate-500">
                  Estoque normal
                </p>

                <strong className="mt-2 block text-3xl text-emerald-600">
                  {indicadores.normal}
                </strong>

              </div>

              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <PackageCheck />
              </div>

            </CardContent>

          </Card>


          <Card>

            <CardContent className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-slate-500">
                  Estoque baixo
                </p>

                <strong className="mt-2 block text-3xl text-amber-600">
                  {indicadores.baixo}
                </strong>

              </div>

              <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                <AlertTriangle />
              </div>

            </CardContent>

          </Card>


          <Card>

            <CardContent className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-slate-500">
                  Sem estoque
                </p>

                <strong className="mt-2 block text-3xl text-red-600">
                  {indicadores.semEstoque}
                </strong>

              </div>

              <div className="rounded-xl bg-red-100 p-3 text-red-700">
                <Package />
              </div>

            </CardContent>

          </Card>

        </section>


        {/* GRÁFICOS */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          <Card>

            <CardHeader>

              <CardTitle>
                Materiais por categoria
              </CardTitle>

              <CardDescription>
                Quantidade cadastrada em cada categoria.
              </CardDescription>

            </CardHeader>


            <CardContent>

              <ChartContainer
                config={chartConfigCategorias}
                className="h-[280px] w-full"
              >

                <BarChart data={dadosCategorias}>

                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="categoria"
                    tickLine={false}
                    axisLine={false}
                  />

                  <ChartTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />

                  <Bar
                    dataKey="quantidade"
                    fill="#22d3ee"
                    radius={8}
                  />

                </BarChart>

              </ChartContainer>

            </CardContent>

          </Card>


          <Card>

            <CardHeader>

              <CardTitle>
                Situação do estoque
              </CardTitle>

              <CardDescription>
                Distribuição dos materiais por status.
              </CardDescription>

            </CardHeader>


            <CardContent>

              <ChartContainer
                config={chartConfigSituacoes}
                className="mx-auto h-[280px] w-full"
              >

                <PieChart>

                  <ChartTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />

                  <Pie
                    data={dadosSituacoes}
                    dataKey="quantidade"
                    nameKey="nome"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                  >

                    {dadosSituacoes.map((item) => (

                      <Cell
                        key={item.nome}
                        fill={item.cor}
                      />

                    ))}

                  </Pie>

                </PieChart>

              </ChartContainer>


              <div className="mt-3 flex flex-wrap justify-center gap-5 text-sm">

                <span className="flex items-center gap-2">

                  <span className="h-3 w-3 rounded-full bg-emerald-500" />

                  Normal

                </span>


                <span className="flex items-center gap-2">

                  <span className="h-3 w-3 rounded-full bg-amber-500" />

                  Estoque baixo

                </span>


                <span className="flex items-center gap-2">

                  <span className="h-3 w-3 rounded-full bg-red-500" />

                  Sem estoque

                </span>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* TABELA */}

        <Card className="mt-8">

          <CardHeader>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div>

                <CardTitle>
                  Matérias-primas
                </CardTitle>

                <CardDescription>
                  Consulte e movimente os materiais cadastrados.
                </CardDescription>

              </div>

              <p className="text-sm text-slate-500">
                {materiaisFiltrados.length} resultado(s)
              </p>

            </div>

          </CardHeader>


          <CardContent>

            {/* FILTROS */}

            <div className="mb-6 grid gap-3 lg:grid-cols-[2fr_1fr_1fr_auto]">

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  className="pl-10"
                  placeholder="Buscar por nome ou código..."
                  value={busca}
                  onChange={(event) =>
                    setBusca(event.target.value)
                  }
                />

              </div>


              <div className="relative">

                <SlidersHorizontal
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                />

                <select
                  className="h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm"
                  value={categoria}
                  onChange={(event) =>
                    setCategoria(event.target.value)
                  }
                >

                  <option value="Todas">
                    Todas as categorias
                  </option>

                  {categorias.map((item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  ))}

                </select>

              </div>


              <select
                className="h-10 w-full rounded-md border bg-white px-3 text-sm"
                value={situacao}
                onChange={(event) =>
                  setSituacao(event.target.value)
                }
              >

                <option value="Todas">
                  Todas as situações
                </option>

                <option value="Normal">
                  Normal
                </option>

                <option value="Estoque baixo">
                  Estoque baixo
                </option>

                <option value="Sem estoque">
                  Sem estoque
                </option>

              </select>


              <Button
                variant="outline"
                onClick={limparFiltros}
              >
                <X />
                Limpar
              </Button>

            </div>


            {/* TABELA RESPONSIVA */}

            <div className="overflow-x-auto rounded-xl border">

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>
                      Código
                    </TableHead>

                    <TableHead>
                      Material
                    </TableHead>

                    <TableHead>
                      Categoria
                    </TableHead>

                    <TableHead>
                      Unidade
                    </TableHead>

                    <TableHead>
                      Disponível
                    </TableHead>

                    <TableHead>
                      Estoque mínimo
                    </TableHead>

                    <TableHead>
                      Situação
                    </TableHead>

                    <TableHead className="text-right">
                      Ações
                    </TableHead>

                  </TableRow>

                </TableHeader>


                <TableBody>

                  {materiaisFiltrados.length === 0 ? (

                    <TableRow>

                      <TableCell
                        colSpan={8}
                        className="h-32 text-center"
                      >

                        <div className="flex flex-col items-center gap-2 text-slate-500">

                          <Search size={30} />

                          <p className="font-medium">
                            Nenhum material encontrado
                          </p>

                          <p className="text-sm">
                            Tente alterar ou limpar os filtros.
                          </p>

                        </div>

                      </TableCell>

                    </TableRow>

                  ) : (

                    materiaisFiltrados.map((material) => (

                      <TableRow key={material.id}>

                        <TableCell className="font-medium">
                          {material.codigo}
                        </TableCell>

                        <TableCell>
                          {material.material}
                        </TableCell>

                        <TableCell>
                          {material.categoria}
                        </TableCell>

                        <TableCell>
                          {material.unidade}
                        </TableCell>

                        <TableCell className="font-semibold">
                          {material.quantidade}
                        </TableCell>

                        <TableCell>
                          {material.minimo}
                        </TableCell>

                        <TableCell>
                          {mostrarStatus(material)}
                        </TableCell>

                        <TableCell className="text-right">

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              abrirMovimentacao(material)
                            }
                          >
                            Movimentar
                          </Button>

                        </TableCell>

                      </TableRow>

                    ))

                  )}

                </TableBody>

              </Table>

            </div>

          </CardContent>

        </Card>

      </div>


      {/* DIALOG MOVIMENTAÇÃO */}

      <Dialog
        open={movimentoAberto}
        onOpenChange={setMovimentoAberto}
      >

        <DialogContent className="sm:max-w-md">

          <DialogHeader>

            <DialogTitle>
              Movimentar estoque
            </DialogTitle>

            <DialogDescription>
              Registre uma entrada ou saída de material.
            </DialogDescription>

          </DialogHeader>


          {materialMovimento && (

            <form
              onSubmit={registrarMovimentacao}
              className="space-y-5"
            >

              <div className="rounded-xl bg-slate-100 p-4">

                <p className="font-semibold text-slate-950">
                  {materialMovimento.material}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {materialMovimento.codigo}
                </p>

                <p className="mt-3 text-sm">
                  Saldo disponível:
                  <strong className="ml-2">
                    {materialMovimento.quantidade}
                    {" "}
                    {materialMovimento.unidade}
                  </strong>
                </p>

              </div>


              <div>

                <Label>
                  Tipo de movimentação
                </Label>

                <div className="mt-2 grid grid-cols-2 gap-3">

                  <Button
                    type="button"
                    variant={
                      tipoMovimento === "entrada"
                        ? "default"
                        : "outline"
                    }
                    className={
                      tipoMovimento === "entrada"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : ""
                    }
                    onClick={() =>
                      setTipoMovimento("entrada")
                    }
                  >
                    <ArrowUp />
                    Entrada
                  </Button>


                  <Button
                    type="button"
                    variant={
                      tipoMovimento === "saida"
                        ? "default"
                        : "outline"
                    }
                    className={
                      tipoMovimento === "saida"
                        ? "bg-red-600 hover:bg-red-700"
                        : ""
                    }
                    onClick={() =>
                      setTipoMovimento("saida")
                    }
                  >
                    <ArrowDown />
                    Saída
                  </Button>

                </div>

              </div>


              <div>

                <Label htmlFor="quantidadeMovimento">
                  Quantidade
                </Label>

                <Input
                  id="quantidadeMovimento"
                  className="mt-2"
                  type="number"
                  min="1"
                  placeholder="Digite a quantidade"
                  value={quantidadeMovimento}
                  onChange={(event) =>
                    setQuantidadeMovimento(
                      event.target.value
                    )
                  }
                />

              </div>


              {erroMovimento && (

                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {erroMovimento}
                </p>

              )}


              <DialogFooter>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setMovimentoAberto(false)
                  }
                >
                  Cancelar
                </Button>


                <Button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Confirmar movimentação
                </Button>

              </DialogFooter>

            </form>

          )}

        </DialogContent>

      </Dialog>

    </main>

  );

}