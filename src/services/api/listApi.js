import { get, post } from "../../utils/Apiwrapper";

export const assetList = async (data) => {
  const config = {
    params: data,
  };
  return await get(`/assets`, config);
};

export const getDetail = async (data) => {
  // const config = {
  //   data: data,
  // };
  return await get(`/assets/${data?.id}`);
};

export const getDetailHistory = async (data) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7); // 7 days ago

  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  return await get(`/assets/${data?.id}/history?interval=d1&start=${startTime}&end=${endTime}`);
};

