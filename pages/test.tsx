import { useState } from "react";

export default function TestPage() {
    const [formData, setFormData] = useState({
        nome: "Igor testess89",
        end: "RUA TESTE 152",
        compl: "CASA",
        bairro: "CENTRO",
        cidade: "TRES PONTAS",
        uf: "MG",
        cep: "37190000",
        fone: "3532659100",
        rg: "MG14454995",
        cic: "08947874843",
        sexo: "M",
        estciv: "C",
        dtnasc: "19880516",
        dtcad: "20240805",
        pretsal: 15000,
        situac: "001",
        email: "francisco.mudrik@tecnotextil.net",
        cargo: "TI",
        indicacao: "",
        redacao: "SEM COMENTARIOS",
        declexm: "1",
        decok: "Ok",
        pai: "",
        mae: "",
        qtdfilho: 1
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResponse(null);

        try {
            const res = await fetch("/api/testApi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Erro ao enviar dados");
            }
            setResponse(data);
        } catch (error: any) {
            setError(error);
        }
    };

    return (
        <div className="p-8">

        </div>
    )
}