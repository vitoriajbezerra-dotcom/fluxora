"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Factory,
  PackageCheck,
  Search,
  TrendingUp,
} from "lucide-react";

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

export default function Home() {
  function enviarFormulario(event) {
    event.preventDefault();

    alert(
      "Solicitação enviada! A equipe da Fluxora entrará em contato em breve."
    );

    event.target.reset();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <Factory size={22} />
            </div>

            <span className="text-2xl font-bold">
              Flux<span className="text-cyan-400">ora</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#beneficios" className="transition hover:text-cyan-400">
              Benefícios
            </a>

            <a href="#funcionalidades" className="transition hover:text-cyan-400">
              Funcionalidades
            </a>

            <a href="#contato" className="transition hover:text-cyan-400">
              Contato
            </a>
          </nav>

          <Button
            asChild
            className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"
          >
            <Link href="/demo">
              Ver demonstração
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
          
          <div className="fluxora-entrada">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <TrendingUp size={16} />
              Gestão inteligente para indústrias
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Sua matéria-prima sob controle.
              <span className="text-cyan-400"> Sua produção em movimento.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A Fluxora ajuda indústrias a acompanhar estoques, identificar
              materiais críticos e tomar decisões antes que a falta de matéria-prima
              afete a produção.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              >
                <Link href="/demo">
                  Experimentar demonstração
                  <ArrowRight />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white"
              >
                <a href="#contato">Falar com especialista</a>
              </Button>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="fluxora-entrada-atrasada">
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-cyan-500/10">
              
              <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="font-semibold">Visão geral do estoque</p>
                  <p className="text-sm text-slate-400">
                    Atualização em tempo real
                  </p>
                </div>

                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-800 p-4">
                  <p className="text-sm text-slate-400">Materiais</p>
                  <strong className="mt-2 block text-3xl">128</strong>
                </div>

                <div className="rounded-2xl bg-slate-800 p-4">
                  <p className="text-sm text-slate-400">Estoque normal</p>
                  <strong className="mt-2 block text-3xl text-emerald-400">
                    94
                  </strong>
                </div>

                <div className="rounded-2xl bg-slate-800 p-4">
                  <p className="text-sm text-slate-400">Estoque baixo</p>
                  <strong className="mt-2 block text-3xl text-amber-400">
                    25
                  </strong>
                </div>

                <div className="rounded-2xl bg-slate-800 p-4">
                  <p className="text-sm text-slate-400">Sem estoque</p>
                  <strong className="mt-2 block text-3xl text-red-400">
                    9
                  </strong>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-800 p-5">
                <div className="mb-4 flex justify-between">
                  <span className="text-sm text-slate-300">
                    Distribuição por categoria
                  </span>

                  <BarChart3 className="text-cyan-400" size={20} />
                </div>

                <div className="flex h-40 items-end gap-5">
                  <div className="h-[70%] flex-1 rounded-t-lg bg-cyan-500" />
                  <div className="h-[95%] flex-1 rounded-t-lg bg-cyan-400" />
                  <div className="h-[55%] flex-1 rounded-t-lg bg-cyan-600" />
                  <div className="h-[80%] flex-1 rounded-t-lg bg-cyan-300" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="bg-slate-50 py-24 text-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 font-semibold text-cyan-600">
              Mais controle, menos imprevistos
            </p>

            <h2 className="text-4xl font-bold">
              Informação certa para manter sua indústria em movimento
            </h2>

            <p className="mt-4 text-slate-600">
              Visualize informações importantes do estoque de forma simples,
              rápida e organizada.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            
            <Card className="transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                  <Boxes />
                </div>

                <CardTitle>Estoque organizado</CardTitle>
                <CardDescription>
                  Centralize matérias-primas e acompanhe seus saldos em um único
                  ambiente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <PackageCheck />
                </div>

                <CardTitle>Identificação de riscos</CardTitle>
                <CardDescription>
                  Encontre rapidamente materiais com estoque baixo ou sem saldo.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <BarChart3 />
                </div>

                <CardTitle>Decisões com dados</CardTitle>
                <CardDescription>
                  Indicadores e gráficos ajudam sua equipe a entender o cenário do
                  estoque.
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section id="funcionalidades" className="bg-white py-24 text-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="grid items-center gap-16 lg:grid-cols-2">
            
            <div>
              <p className="font-semibold text-cyan-600">Recursos da plataforma</p>

              <h2 className="mt-3 text-4xl font-bold">
                O estoque da sua indústria sem complicação
              </h2>

              <p className="mt-5 text-lg text-slate-600">
                A Fluxora transforma informações de estoque em uma visão simples
                para sua equipe.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Cadastro de materiais</h3>
                    <p className="text-slate-600">
                      Organize código, categoria, unidade e estoque mínimo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Movimentações de estoque</h3>
                    <p className="text-slate-600">
                      Simule entradas e saídas de matérias-primas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Busca inteligente</h3>
                    <p className="text-slate-600">
                      Encontre materiais por código ou nome.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Indicadores visuais</h3>
                    <p className="text-slate-600">
                      Acompanhe situações críticas rapidamente.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl">
              
              <div className="mb-8 flex items-center gap-3">
                <Search className="text-cyan-400" />
                <div>
                  <p className="font-semibold">Localize qualquer material</p>
                  <p className="text-sm text-slate-400">
                    Busca rápida por código ou descrição
                  </p>
                </div>
              </div>

              <div className="space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4">
                  <div>
                    <p className="font-semibold">Chapa de aço</p>
                    <p className="text-sm text-slate-400">MP-001 · Metais</p>
                  </div>
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 text-sm text-amber-300">
                    Estoque baixo
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4">
                  <div>
                    <p className="font-semibold">Papel kraft</p>
                    <p className="text-sm text-slate-400">
                      MP-010 · Embalagens
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-sm text-emerald-300">
                    Normal
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4">
                  <div>
                    <p className="font-semibold">Cobre</p>
                    <p className="text-sm text-slate-400">MP-003 · Metais</p>
                  </div>
                  <span className="rounded-full bg-red-400/20 px-3 py-1 text-sm text-red-300">
                    Sem estoque
                  </span>
                </div>

              </div>

              <Button
                asChild
                className="mt-7 w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              >
                <Link href="/demo">
                  Acessar demonstração completa
                  <ArrowRight />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="bg-slate-100 py-24 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          
          <div>
            <p className="font-semibold text-cyan-600">Fale com a Fluxora</p>

            <h2 className="mt-3 text-4xl font-bold">
              Quer melhorar o controle da sua operação?
            </h2>

            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Preencha o formulário e simule uma solicitação de contato com nosso
              time.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Solicite um contato</CardTitle>
              <CardDescription>
                Conte um pouco sobre sua empresa.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={enviarFormulario} className="space-y-5">

                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    className="mt-2"
                    placeholder="Digite seu nome"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-2"
                    placeholder="nome@empresa.com.br"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    className="mt-2"
                    placeholder="Nome da empresa"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="interesse">Área de interesse</Label>

                  <select
                    id="interesse"
                    required
                    className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-cyan-500"
                  >
                    <option value="">Selecione</option>
                    <option>Gestão de estoque</option>
                    <option>Controle de matéria-prima</option>
                    <option>Indicadores e relatórios</option>
                    <option>Gestão industrial</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                >
                  Solicitar contato
                </Button>

              </form>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-slate-400 md:flex-row md:items-center md:justify-between">
          
          <div>
            <p className="text-lg font-bold text-white">
              Flux<span className="text-cyan-400">ora</span>
            </p>

            <p className="mt-1 text-sm">
              Tecnologia para uma indústria mais eficiente.
            </p>
          </div>

          <div className="flex gap-5 text-sm">
            <a href="#beneficios" className="hover:text-white">
              Benefícios
            </a>

            <a href="#funcionalidades" className="hover:text-white">
              Recursos
            </a>

            <Link href="/demo" className="hover:text-white">
              Demonstração
            </Link>
          </div>

        </div>
      </footer>

      <style jsx global>{`
        @keyframes fluxoraEntrada {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fluxora-entrada {
          animation: fluxoraEntrada 0.7s ease forwards;
        }

        .fluxora-entrada-atrasada {
          opacity: 0;
          animation: fluxoraEntrada 0.7s ease 0.2s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .fluxora-entrada,
          .fluxora-entrada-atrasada {
            animation: none;
            opacity: 1;
          }

          * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </main>
  );
}