import axios from "axios";
const BASE_URL = "https://voicespireexeapi.azurewebsites.net";

export default axios.create({
  baseURL: BASE_URL,
});
export const axiosOne = axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getVoiceList = async (
  currentPage,
  PageSize,
  sortType,
  isApproved
) => {
  const response = await axiosOne.get(
    `/api/VoiceDetails/${currentPage},${PageSize},${sortType},${isApproved}/GetPage`
  );
  console.log(response.data.results);

  const valuesArray = Object.values(response.data.results);
  return valuesArray;
};

// export const getPostedProjects = async (currentPage, pageSize, sortType) => {
//   const response = await axiosOne.get(
//     `/api/VoiceProjects/GetListProjectToManagement/${currentPage},${pageSize},${sortType}`
//   );
//   console.log(response.data.results);

//   const valuesArray = Object.values(response.data.results);
//   return valuesArray;
// };

export const getProjects = async (
  currentPage,
  PageSize,
  sortType,
  projectType,
  WaitApprove,
  NotApproved,
  Apply,
  Processing,
  Done,
  WaitToAccept,
  Denied
) => {
  const response = await axiosOne.get(
    `/api/VoiceProjects/SearchByFilterForManager/${currentPage},${PageSize},${sortType},${projectType},${WaitApprove},${NotApproved},${Apply},${Processing},${Done},${WaitToAccept},${Denied},`
  );
  const valuesArray = Object.values(response.data.results);
  return valuesArray;
};

export const getVoiceListAndSearch = async (
  currentPage,
  PageSize,
  sortType,
  isApproved,
  inputSearch
) => {
  const response = await axiosOne.get(
    `/api/VoiceDetails/${currentPage},${PageSize},${sortType},${isApproved}/GetPage?search=${inputSearch}`
  );
  console.log(response.data.results);

  const valuesArray = Object.values(response.data.results);
  return valuesArray;
};

export const getVoice = async (sellerId) => {
  const response = await axiosOne.get(`/api/VoiceDetails/${sellerId}`);

  // const valuesArray = Object.values(response.data);
  // return valuesArray;
  return response.data;
};

export const voicesFilter = async (
  currentPage,
  PageSize,
  isApproved,
  inputName,
  inputMinPrice,
  inputMaxPrice,
  inputTone,
  inputRegion,
  inputGender,
  inputType,
  inputProp,
  inputRate
) => {
  const response = await axiosOne.get(
    `/api/VoiceDetails/${currentPage},${PageSize},${isApproved}/SearchByFilter?search=${inputName}&fromPrice=${inputMinPrice}&toPrice=${inputMaxPrice}&tone=${inputTone}&region=${inputRegion}&gender=${inputGender}&property=${inputProp}&type=${inputType}&rate=${inputRate}`
  );
  console.log(response.data.results);

  const valuesArray = Object.values(response.data.results);
  return valuesArray;
};

export const getPaymentInfo = async (projectId) => {
  const response = await axiosOne.get(
    `/api/VoiceProjects/GetPaymentInformation/${projectId}`
  );
  return response.data;
};

export const getProjectApprovalDetail = async (projectId) => {
  const response = await axiosOne.get(
    `/api/VoiceProjects/GetByID/${projectId}`
  );
  return response.data;
};

export const approveProject = async (projectId) => {
  const response = await axiosOne.put(
    `/api/VoiceProjects/ApproveProject/${projectId}`
  );
  return response.data;
};

export const notApproveProject = async (projectId) => {
  const response = await axiosOne.put(
    `/api/VoiceProjects/NotApprovedProject/${projectId}`
  );
  return response.data;
};

export const sendVoiceProject = async (
  BuyerId,
  voiceSellerId,
  title,
  description,
  duration,
  deadline,
  linkDocDemo,
  linkDocMain,
  linkThumbnail
) => {
  const response = await axiosOne.post(
    `/api/Buyers/SendVoiceProject/${BuyerId},${voiceSellerId},${title},${description},${duration},${deadline}`,
    { linkDocDemo, linkDocMain, linkThumbnail }
  );
  return response.data;
};

export const uploadVoiceProject = async (
  BuyerId,
  title,
  description,
  price,
  duration,
  numberOfEdit,
  deadline,
  inputRequest,
  inputVoiceProperty,
  inputTextLength,
  inputVoiceGender,
  inputVoiceTone,
  inputVoiceRegion,
  inputVoiceLocal,
  inputVoiceInspirational,
  inputVoiceStress,
  inputVoicePronuonce,
  inputVoiceSpeed,
  linkDocDemo,
  linkDocMain,
  linkThumbnail
) => {
  const response = await axiosOne.post(
    `/api/Buyers/UploadVoiceProject/${BuyerId},${title},${description},${price},${duration},${numberOfEdit},${deadline}?request=${inputRequest}&voiceProperty=${inputVoiceProperty}&textLength=${inputTextLength}&voiceGender=${inputVoiceGender}&voiceTone=${inputVoiceTone}&voiceRegion=${inputVoiceRegion}&voiceLocal=${inputVoiceLocal}&voiceInspirational=${inputVoiceInspirational}&voiceStress=${inputVoiceStress}&voicePronuonce=${inputVoicePronuonce}&voiceSpeed=${inputVoiceSpeed}`,
    { linkDocDemo, linkDocMain, linkThumbnail }
  );
  return response.data;
};
