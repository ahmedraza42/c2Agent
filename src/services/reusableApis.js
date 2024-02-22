import API_CALLS from "./constants";

// export const uploadImage = async (imageArray) => {
//   // const editType = filename.split(".").pop();
//   // console.log({editType})
//     var dataa = new FormData();
//     // console.log(key)
//     if(imageArray?.length>0){
//       imageArray.forEach((element) => {
//         dataa.append(element.key, element);
//       });
//     }
//     // dataa.append(key, {
//     //   uri: uri,
//     //   type: 'image/'+editType,
//     //   // type: "image/jpeg",
//     //   name: filename,
//     // });
//     console.log(dataa)
//     let data = dataa;
//     try {
//       const res = await API_CALLS.uploads(data);
//       console.log({res})
//       if (res.status == true) {
//         return res
//       } else {
//         console.log("response", res);
//         throw respose;
//       }
//     } catch (error) {
//       console.log("error uploadImage", error);
//       return error || "Please try again"
//     } 
// };

export const uploadImage = async (type, filename, uri, key,base64) => {
    var dataa = new FormData();
        dataa.append(key, {
      uri: base64==null?uri:base64,
      type: type,
      name: filename,
    });
    console.log(dataa)
    let data = dataa;
    try {
      const res = await API_CALLS.uploads(data);
      console.log({res})
      if (res.status == true) {
        return res
      } else {
        console.log("response", res);
        throw respose;
      }
    } catch (error) {
      console.log("error uploadImage", error);
      return "Please try again"
    } 
};
export const uploadProfileImage = async (type, filename, uri,key,baseimage) => {

    var dataa = new FormData();
    console.log(key)
    dataa.append(key, {
      uri: baseimage,
      type: type,
      name: filename,
    });
    console.log(dataa)
    let data = dataa;
    try {
      const res = await API_CALLS.profilePicture(data);
      console.log({res})
      if (res.status == true) {
        return res
      } else {
        console.log("response", res);
        throw respose;
      }
    } catch (error) {
      console.log("error uploadImage", error);
      return "Something went wrong"
    } 
};