import axios from "axios";

export const uploadImage = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('image', file);

    const apiKey = '95cc94eb13f16880f374d9c97a2c8060';
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
    );

    return data.data.display_url; 
};