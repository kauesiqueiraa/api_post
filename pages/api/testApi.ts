import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = 'http://vagas.grupotecnotextil.com:9002/rest/ZWS_SQG';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // const formData = req.body;
        console.log('Dados da Requisição:', req.body);
        
        try {
            const response = await axios.post(url, req.body, {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 100000,
            });
            console.log("Resposta da API: ", response.data);
            res.status(response.status).json(response.data);
            res.status(200).json(response.data);
        } catch (error: any) {
            console.log("Erro: ", error.message);
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Metodo ${req.method} não permitido`);
    }
}