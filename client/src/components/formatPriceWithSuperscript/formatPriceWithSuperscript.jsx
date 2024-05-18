export function formatPriceWithSuperscript(price) {
    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  
    // Separar os valores inteiros e os centavos
    const [reais, centavos] = formattedPrice.replace('R$', '').trim().split(',');
  
    return {
      reais,
      centavos,
    };
  }
  