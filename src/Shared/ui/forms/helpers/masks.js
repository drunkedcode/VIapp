// Funciones de máscara — solo Brasil
export const masks = {
    // E-mail: sin formato, solo se valida
    email: (value) => value,
    name: (value) => value,
    // CPF: 000.000.000-00
    cpf: (value) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length <= 3)
            return clean;
        if (clean.length <= 6)
            return `${clean.slice(0, 3)}.${clean.slice(3)}`;
        if (clean.length <= 9)
            return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
        return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
    },
    // CNPJ: 00.000.000/0000-00
    cnpj: (value) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length <= 2)
            return clean;
        if (clean.length <= 5)
            return `${clean.slice(0, 2)}.${clean.slice(2)}`;
        if (clean.length <= 8)
            return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5)}`;
        if (clean.length <= 12)
            return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8)}`;
        return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8, 12)}-${clean.slice(12, 14)}`;
    },
    // CEP: 00000-000
    cep: (value) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length <= 5)
            return clean;
        return `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
    },
    // Teléfono: (00) 00000-0000
    phone: (value) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length <= 2)
            return clean;
        if (clean.length <= 7)
            return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
        return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
    },
    // MONEDA BRASIL: 0,00 hasta 000.000.000,00
    money: (value) => {
        const clean = value.replace(/\D/g, "");
        if (!clean)
            return "";
        const numberValue = Number(clean) / 100;
        return numberValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    },
    // FECHA: 00/00/0000
    date: (value) => {
        const clean = value.replace(/\D/g, "");
        if (clean.length <= 2)
            return clean;
        if (clean.length <= 4)
            return `${clean.slice(0, 2)}/${clean.slice(2)}`;
        return `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4, 8)}`;
    },
    // PLACA MERCOSUL: ABC-1D23
    plate: (value) => {
        const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (clean.length <= 3)
            return clean;
        return `${clean.slice(0, 3)}-${clean.slice(3, 7)}`;
    },
    // RENAVAM: solo dígitos, hasta 11
    renavam: (value) => {
        const clean = value.replace(/\D/g, "");
        return clean.slice(0, 11);
    },
    // AÑO: 4 dígitos
    year: (value) => {
        const clean = value.replace(/\D/g, "");
        return clean.slice(0, 4);
    },
    // Solo números — quita todo lo que no sea dígito (para enviar al backend)
    raw: (value) => value.replace(/\D/g, ""),
    // ESPECIAL: Limpia la placa SIN perder letras
    rawPlate: (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
};
// Mapa: qué función de limpieza usar para cada tipo de máscara.
export const cleaners = {
    email: (value) => value.trim(),
    name: (value) => value.replace(/\s{2,}/g, " ").replace(/^\s+/, ""),
    cpf: (value) => value.replace(/\D/g, "").slice(0, 11),
    cnpj: (value) => value.replace(/\D/g, "").slice(0, 14),
    cep: (value) => value.replace(/\D/g, "").slice(0, 8),
    phone: (value) => value.replace(/\D/g, "").slice(0, 11),
    money: masks.raw,
    date: (value) => value.replace(/\D/g, "").slice(0, 8),
    renavam: masks.raw,
    year: masks.raw,
    raw: masks.raw,
    plate: masks.rawPlate,
    rawPlate: masks.rawPlate,
};
