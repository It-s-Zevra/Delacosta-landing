export const WHATSAPP_NUMBER = "56983975096";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  generic: "Hola Delacosta Studio, me gustaría más información.",
  cart: "Hola Delacosta Studio, quisiera coordinar un pedido.",
  product: (name: string, price: string) =>
    `Hola Delacosta Studio, me interesa la pieza *${name}* (${price}). ¿Está disponible?`,
  comingSoon: (name: string) =>
    `Hola Delacosta Studio, quisiera saber cuándo estará disponible *${name}*. Avísenme cuando salga.`,
  contact: (data: {
    nombre: string;
    email: string;
    whatsapp?: string;
    tipo: string;
    pedido?: string;
    mensaje: string;
  }) =>
    [
      "Hola Delacosta Studio, les escribo desde la web:",
      "",
      `*Nombre:* ${data.nombre}`,
      `*Email:* ${data.email}`,
      data.whatsapp ? `*WhatsApp:* ${data.whatsapp}` : null,
      `*Tipo de consulta:* ${data.tipo}`,
      data.pedido ? `*N° de pedido:* ${data.pedido}` : null,
      "",
      "*Mensaje:*",
      data.mensaje,
    ]
      .filter(Boolean)
      .join("\n"),
};
