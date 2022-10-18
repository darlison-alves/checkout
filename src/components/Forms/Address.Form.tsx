import { useEffect, useState } from "react";
import { BsFillHouseFill } from "react-icons/bs";
import { IAddress } from "../../interfaces/address.interface";
import { handleCompleteAddressAPI } from "../../utils/address.util";
import { statesOption } from "../../utils/optionsData";
import { validateMaskedInput } from "../../utils/validateMaskedInput";
import { Input } from "../Input/Input";
import { MaskedInput } from "../InputMask/InputMask";

export interface IAddressProps {
  errors: Array<string>;
  setErrors: Function
  onChange: Function;
  initiValues: IAddress;
}

export const AddressForm = ({ errors = [], setErrors = (currState: string) => { }, onChange = () => {}, initiValues = {} }: IAddressProps) => {

  const [address, setAddress] = useState<IAddress>({  });
  
  const [isCepDefined, setIsCepDefined] = useState(false);

  const checkForErrors = (error: string) => {
    return errors.find((err) => err === error) ? true : false;
  };

  useEffect(() => {
    onChange(address)
  }, [address])

  useEffect(() => {
    if (Object.keys(initiValues).length) {
      setAddress(old => ({ ...old, ...initiValues }))
      setIsCepDefined(true);
    }
  }, [initiValues])

  const handleAutoCompleteAddress = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(old => ({ ...old, cep: e.target.value }))

    if (validateMaskedInput(e.target.value)) {
      setErrors((currState: Array<string>) => {
        return currState.filter((err) => err !== "cep");
      });
    } else {
      setErrors((currState: Array<string>) => [...currState, "cep"]);
    }

    if (e.target.value.includes("_")) return;

    try {
      const response = await handleCompleteAddressAPI(e.target.value)

      setAddress(old => ({
        ...old,
        logradouro: response.logradouro,
        cep: response.cep,
        bairro: response.bairro,
        cidade: response.localidade,
        codeIBGE: response.ibge,
        estado: response.uf        
      }));
      // setComplement(response.data.complemento)
      // setDistrict(response.bairro);
      // setCity(response.localidade);
      // setState(response.uf);
      // setCodeIBGE(response.ibge);

      setIsCepDefined(true);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "Estado") {
      setErrors((currState:Array<string> ) => {
        return currState.filter((err) => err !== "state");
      });
    } else {
      setErrors((currState: Array<string>) => [...currState, "state"]);
    }
    setAddress(old => ({ ...old, estado: e.target.value }));
  };

  return (
    <div>
      <div className="md:max-w-[252px] w-full">
        <MaskedInput
          error={checkForErrors("cep")}
          hasIcon={true}
          icon={
            <BsFillHouseFill
              className="absolute top-[14px] left-[12px]"
              color="#92979A"
              size={20}
            />
          }
          mask="99999-999"
          placeholder="00000-000"
          onChange={handleAutoCompleteAddress}
          value={address.cep}
          type="text"
          focusPlaceholder="CEP"
        />
      </div>

      { isCepDefined && (
        <div className="my-3">
          <div className="flex md:flex-row flex-col gap-3 md:gap-4">
            <div className="md:max-w-[515px] w-full">
              <Input
                placeholder="Endereço (ex: rua joaquina dos santos)"
                type="text"
                onChange={(e) => setAddress(old => ({ ...old, logradouro: e.target.value }))}
                value={address.logradouro}
                focusPlaceholder="Endereço"
              />
            </div>

            <div className="md:max-w-[270px] w-full">
              <Input
                placeholder="Número"
                type="text"
                onChange={(e) => setAddress(old => ({ ...old, numero: e.target.value }))}
                value={address.numero}
                focusPlaceholder="Número"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 my-3 gap-4">
            <Input
              placeholder="Complemento"
              type="text"
              onChange={(e) => setAddress(old => ({ ...old, complemento: e.target.value }))}
              value={address.complemento}
              focusPlaceholder="Complemento"
              required={false}
            />
            <Input
              placeholder="Bairro"
              type="text"
              onChange={(e) => setAddress(old => ({ ...old, bairro: e.target.value }))}
              value={address.bairro}
              focusPlaceholder="Bairro"
            />
          </div>

          <div className="grid md:grid-cols-2 my-3 gap-4">
            <Input
              placeholder="Cidade"
              type="text"
              onChange={(e) => setAddress(old => ({ ...old, cidade: e.target.value }))}
              value={address.cidade}
              focusPlaceholder="Cidade"
            />
            <select
              value={address.estado}
              onChange={getSelectValue}
              className={`px-3 py-3 text-base font-semibold text-secondary border rounded-[4px] w-full placeholder:text-secondary transition-colors placeholder:text-base focus:outline-none focus:ring-2  
          ${checkForErrors("state")
                  ? "border-red-700 focus:ring-red-700"
                  : "border-[#CED4DA] focus:ring-primary"
                }`}
            >
              <option value="Estado">Estado</option>
              {statesOption.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
      </div>
  )
}
