import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    // nome: "Igor testess89",
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

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

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
        setError(error.message);
    }
};

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Teste API</h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-center">
          <div>
            <label htmlFor="nome" className="text-lg font-medium text-black text-left">Nome Completo:</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black" 
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </form>
        {response && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <h2 className="text-lg font-bold mb-2">Resposta:</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <h2 className="text-lg font-bold mb-2">Erro:</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
      </div>
      
    </main>
  );
}
