package com.sigid.logistica.data.model

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id")
    val id: String,
    
    @SerializedName("nombre")
    val nombre: String,
    
    @SerializedName("email")
    val email: String,
    
    @SerializedName("rol")
    val rol: String
)

data class LoginRequest(
    @SerializedName("email")
    val email: String,
    
    @SerializedName("password")
    val password: String
)

data class RegisterRequest(
    @SerializedName("nombre")
    val nombre: String,
    
    @SerializedName("email")
    val email: String,
    
    @SerializedName("password")
    val password: String,
    
    @SerializedName("rol")
    val rol: String = "empleado"
)

data class AuthResponse(
    @SerializedName("success")
    val success: Boolean,
    
    @SerializedName("token")
    val token: String?,
    
    @SerializedName("user")
    val user: User?,
    
    @SerializedName("message")
    val message: String?
)
