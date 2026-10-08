"use client";

import { useEffect } from "react";

import { APARTMENTS, buildApartmentSlug } from "@/data/apartments";
import { SITE_URL } from "@/lib/site";

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/):
 * expone herramientas del sitio a agentes de IA que operan en el navegador
 * mediante document.modelContext.registerTool(). No-op si el navegador
 * no implementa la API.
 */

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
};

type WebMCPModelContext = {
  registerTool: (
    tool: WebMCPTool,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

/**
 * Feature-detect: las builds actuales exponen la API en document.modelContext;
 * las builds antiguas de Chrome la exponen en navigator.modelContext.
 */
function getModelContext(): WebMCPModelContext | undefined {
  const doc = document as Document & { modelContext?: WebMCPModelContext };
  if (doc.modelContext) return doc.modelContext;
  const nav = navigator as Navigator & { modelContext?: WebMCPModelContext };
  return nav.modelContext;
}

function publicApartments() {
  return APARTMENTS.filter((a) => !a.isComingSoon).map((a) => {
    const slug = buildApartmentSlug(a);
    const tourId = a.type.replace("Tipo ", "").toLowerCase();
    return {
      tipo: a.type,
      dormitorios: a.bedrooms,
      banos: a.baths,
      areaM2: a.sqm,
      precioPreventa: a.price,
      estilo: a.area,
      caracteristicas: a.features,
      url: `${SITE_URL}/departamentos/${slug}`,
      tourVirtual360: `${SITE_URL}/vision360/${tourId}`,
    };
  });
}

export default function WebMCPTools() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();
    const register = (tool: WebMCPTool) =>
      modelContext.registerTool(tool, { signal: controller.signal }).catch(() => {
        /* el agente puede no soportar la herramienta; ignorar */
      });

    void register({
      name: "torres_titanium_listar_departamentos",
      description:
        "Lista los tipos de departamento en construcción del proyecto Torres Titanium (Huancayo, Perú) con dormitorios, área, precio referencial y enlaces.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      execute: async () => ({
        proyecto: "Torres Titanium",
        entrega: "2027",
        nota: "Precios referenciales publicados, sujetos a disponibilidad.",
        departamentos: publicApartments(),
      }),
    });

    void register({
      name: "torres_titanium_detalle_departamento",
      description:
        "Devuelve área, precio publicado y características de un tipo de departamento de Torres Titanium (ej.: 'Tipo A', 'A', 'a').",
      inputSchema: {
        type: "object",
        properties: {
          tipo: {
            type: "string",
            description: "Tipo de departamento: A, B, C, D o G",
          },
        },
        required: ["tipo"],
        additionalProperties: false,
      },
      execute: async (args) => {
        const tipo = String(args.tipo ?? "").trim();
        const normalizado = tipo.toLowerCase().replace(/^tipo\s*/, "");
        const apartment = publicApartments().find(
          (a) =>
            a.tipo.toLowerCase().replace("tipo ", "") === normalizado ||
            a.tipo.toLowerCase() === `tipo ${normalizado}`,
        );
        return apartment ?? { error: `Tipo '${tipo}' no encontrado o próximamente.` };
      },
    });

    void register({
      name: "torres_titanium_contacto_ventas",
      description:
        "Datos de contacto del equipo de ventas de Torres Titanium: WhatsApp, email, horario, dirección y Libro de Reclamaciones.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      execute: async () => ({
        telefonoWhatsApp: "+51 981 407 634",
        email: "holdingreynagaredes@gmail.com",
        horario: "Lun–Sáb 8:30–13:30 y 15:00–18:30",
        direccion: "Av. San Agustín 154, San Carlos, Huancayo, Perú",
        libroDeReclamaciones: `${SITE_URL}/libro-de-reclamaciones`,
        nota:
          "Enviar el formulario web no formaliza una reserva ni realiza un cobro: solo solicita atención, cotización o información.",
      }),
    });

    return () => controller.abort();
  }, []);

  return null;
}
