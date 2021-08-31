package com.prodoc.payload.response;

import lombok.Data;

@Data
public class Response {

    String message;
    String status;
    Object data;

    public Response(String status,String message){
        this.setStatus(status);
        this.setMessage(message);
    }
    public Response(String status,String message,Object object){
        this.setStatus(status);
        this.setMessage(message);
        this.setData(object);
    }

}
