import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IPersonListing {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

interface IPersonDetail {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

type TPersonCount = {
  data: IPersonListing[];
  totalCount: number;
}

const getAll = async(page=1, filter=""): Promise<TPersonCount | Error> => {
  try {
    const relativeUrl = `/pessoas?_page=${page}_limit=${Environment.ROW_LIMIT}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if(data){
      return {
        data, 
        totalCount: Number(headers["x-total-count"] || Environment.ROW_LIMIT),
      };
    }

    return new Error("Erro ao listar os registros");

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao listar os registros");
  }
};

const getById = async(): Promise<any> => {};
const create = async(): Promise<any> => {};
const updateById = async(): Promise<any> => {};
const deleteById = async(): Promise<any> => {};

export const PeopleServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};