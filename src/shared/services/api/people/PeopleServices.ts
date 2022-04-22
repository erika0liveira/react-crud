import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IPersonListing {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

export interface IPersonDetail {
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
    const relativeUrl = `/people?_page=${page}&_limit=${Environment.ROW_LIMIT}&fullName_like=${filter}`;
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

const getById = async(id:number): Promise<IPersonDetail | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if(data){
      return data;
    }

    return new Error("Erro ao consultar o registro");

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao consultar o registro");
  }  
};

const create = async(personData: Omit<IPersonDetail, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPersonDetail>("/people", personData);

    if(data){
      return data.id;
    }

    return new Error("Erro ao criar registro");

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao criar registro");
  }  
};

const updateById = async(id: number, personData: IPersonDetail): Promise<void | Error> => {
  try {
    await Api.put(`/people/${id}`, personData);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao atualizar o registro");
  }  
};

const deleteById = async(id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/people/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao deletar o registro");
  }  
};

export const PeopleServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};