import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/userInterface";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useIndex() {
  const [cep, setCEP] = useState(""),
    [erro, setErro] = useState(""),
    [buscaFeita, setBuscaFeita] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState([] as UserShortInterface[]),
    [diaristasRestantes, setDiaristasRestantes] = useState(0),
    cepValido = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]);

  async function buscarProfissionais(cep: string) {
    setBuscaFeita(false);
    setCarregando(true);
    setErro("");

    try {
      const { data } = await ApiService.get<{
        diaristas: UserShortInterface[];
        quantidade_diaristas: number;
      }>("api/diaristas-cidade?cep=" + cep.replace(/\D/g, ""));

      setDiaristas(data.diaristas);
      setDiaristasRestantes(data.quantidade_diaristas);

      setBuscaFeita(true);
      setCarregando(false);
    } catch (error) {
      setErro("Nenhuma diarista encontrada...");
      setCarregando(false);
    }

    setBuscaFeita(true);
  }

  return {
    cep,
    setCEP,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
  };
}
