import request from "@/lib/request/request";

export function getPageInfo(data) {
  return request({
    url: "/getPageInfo",
    method: "post",
    data,
  });
}

export function getImageResult(data) {
  return request({
    url: "/getImage",
    method: "post",
    data,
    responseType: 'blob',
  });
}

export function getTextResult(data) {
    return request({
      url: "/getText",
      method: "post",
      data,
    });
  }

  export function testApi(data) {
    return request({
      url: "/testApi",
      method: "post",
      data,
    });
  }