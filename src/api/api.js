import axios from "axios";
const token = window.localStorage.getItem("access_token");
export const search = async (query, type) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/${type}/search`,
    {
      params: {
        q: query,
      },
    }
  );
  return data.data;
};

export const registerUser = async (payload) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}` + "/auth/register",
    payload
  );
  return data.data;
};

export const loginUser = async (payload) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}` + "/auth/login",
    payload
  );
  return data.data;
};
export const getUserById = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/user/find/${id}`
  );
  return data.data;
};
export const updateUser = async (payload, id) => {
  const data = await axios.put(
    `${process.env.REACT_APP_API_URL}` + `/user/update/${id}`,
    payload
  );
  return data.data;
};

export const getFollowers = async (type, id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/user/followers/${id}`,
    {
      params: {
        type: type,
      },
    }
  );
  return data.data;
};
export const getAllArtist = async (params) => {
  const data = await axios.get(`${process.env.REACT_APP_API_URL}` + "/artist", {
    params: {
      ...params,
    },
  });
  return data.data;
};

export const getArtist = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/artist/find/${id}`
  );
  return data.data;
};

export const getArtistAlbums = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/albums/findByArtist/${id}`
  );
  return data.data;
};

export const getArtistTracks = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/track/findByArtist/${id}`
  );
  return data.data;
};

export const getAlbums = async (params) => {
  const data = await axios.get(`${process.env.REACT_APP_API_URL}` + "/album", {
    params: {
      ...params,
    },
  });
  return data.data;
};

export const getTracks = async (params) => {
  const data = await axios.get(`${process.env.REACT_APP_API_URL}` + `/track`, {
    params: {
      ...params,
    },
  });
  return data.data;
};

export const updateTracks = async (payload, id) => {
  const data = await axios.put(
    `${process.env.REACT_APP_API_URL}` + `/track/update/${id}`,
    payload
  );
  return data.data;
};

export const createPlaylist = async (payload) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}` + "/playlist/create",
    payload
  );
  return data.data;
};

export const getPlaylists = async (params) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/playlist`,
    {
      params: {
        ...params,
      },
    }
  );
  return data.data;
};
export const getPlaylistById = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/playlist/find/${id}`
  );
  return data.data;
};

export const updatePlaylist = async (payload, id) => {
  const data = await axios.put(
    `${process.env.REACT_APP_API_URL}` + `/playlist/update/${id}`,
    payload
  );
  return data.data;
};

export const createConversation = async (payload) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}` + `/conversation/create`,
    payload
  );
  return data.data;
};

export const getConversations = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/conversation/${id}`
  );
  return data.data;
};

export const getAllMessages = async (id) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}` + `/message/${id}`
  );
  return data.data;
};

export const createMessage = async (payload) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}` + `/message/create`,
    payload
  );
  return data.data;
};
