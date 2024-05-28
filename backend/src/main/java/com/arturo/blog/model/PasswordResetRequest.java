package com.arturo.blog.model;

import lombok.Data;

@Data
public class PasswordResetRequest {

    private String forgottoken;

    private String password;

    public String getToken(){
        return forgottoken;
    }

    public void setToken(String forgottoken) {
        this.forgottoken = forgottoken;
    }

    public String getNewPassword() {
        return password;
    }

    public void setNewPassword(String password) {
        this.password = password;
    }
}
